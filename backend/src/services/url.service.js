import Url from "../models/url.model.js";
import AppError from "../utils/AppError.js";
import { nanoid } from "nanoid";

export async function createShortUrl(data, userId) {
  const { originalUrl, customAlias } = data;

  const shortId = customAlias || nanoid(7);
  const existingUrl = await Url.findOne({ shortId });

  if (existingUrl) {
    throw new AppError(409, "Short URL already exists");
  }

  const newUrl = await Url.create({
    originalUrl,
    shortId,
    customAlias: customAlias || undefined,
    owner: userId,
  });
  return newUrl;
}

export async function redirectToOriginalUrl(shortId) {
  const url = await Url.findOne({ shortId });
  if (!url) {
    throw new AppError(404, "URL not found");
  }
  if (!url.isActive) {
    throw new AppError(404, "URL is inactive");
  }
  if (url.expiresAt && url.expiresAt < new Date()) {
    url.isActive = false;
    await url.save();
    throw new AppError(410, "URL has expired");
  }
  await Url.updateOne({ _id: url._id }, { $inc: { clicks: 1 } });
  return url.originalUrl;
}

export async function getAllUsersUrls(owner, query) {
  let { page = 1, limit = 10, search = "", sort = "-createdAt" } = query;

  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const filter = { owner };

  if (search) {
    filter.$or = [
      { originalUrl: { $regex: search, $options: "i" } },
      {shortId:{$regex:search,$options:"i"}}
    ];
  }

  const totalUrls = await Url.countDocuments(filter);
const urls = await Url.find(filter).sort(sort).skip(skip).limit(limit);

  if (urls.length === 0) {
    throw new AppError(404, "URL not found");
  }
  return {
    urls,
    pagination:{
      totalUrls,
    totalPages: Math.ceil(totalUrls / limit),
    currentPage: page,
    limit,
    }
  };
}

export async function deleteUrl(urlId, owner) {
  const url = await Url.findOneAndDelete({
    _id: urlId,
    owner,
  });
  if (!url) {
    throw new AppError(404, "Url Not Found");
  }

  return url;
}

export async function updateURL(urlId, owner, newUrl) {
  const updateData = {};
  if (newUrl.originalUrl !== undefined) {
    updateData.originalUrl = newUrl.originalUrl;
  }
  if (newUrl.isActive !== undefined) {
    updateData.isActive = newUrl.isActive;
  }
  if (newUrl.customAlias) {
    updateData.customAlias = newUrl.customAlias;
    updateData.shortId = newUrl.customAlias;

    const existingUrl = await Url.findOne({
      shortId: newUrl.customAlias,
      _id: { $ne: urlId },
    });
    if (existingUrl) {
      throw new AppError(409, "Short URL already exists");
    }
  }

  const url = await Url.findOneAndUpdate(
    {
      _id: urlId,
      owner,
    },
    {
      $set: updateData,
    },
    {
      returnDocument: "after",
    },
  );
  if (!url) {
    throw new AppError(404, "URL Not Found");
  }
  return url;
}

export async function getAnalytics(shortId) {
  const url = await Url.findOne({ shortId });

  if (!url) {
    throw new AppError(404, "URL not found");
  }
  const { originalUrl, clicks, createdAt } = url;
  return {
    originalUrl,
    shortId,
    clicks,
    createdAt,
  };
}
