import Url from "../models/url.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { nanoid } from "nanoid";

export async function createShortUrl(data, userId) {
  const { originalUrl, customAlias } = data;

  if (!originalUrl) {
    throw new AppError(404, "Please add original URL");
  }
  if (customAlias) {
    throw new AppError(409, "Alias already exists");
  }
  const shortId = customAlias || nanoid(7);
  const user = await User.findById(userId);
  const existingUrl = await Url.findOne({ shortId });

  if (existingUrl) {
    throw new AppError(409, "Short URL already exists");
  }

  const newUrl = await Url.create({
    originalUrl,
    shortId,
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
  url.clicks += 1;
  await url.save();
  return url.originalUrl;
}

export async function getUrls(owner) {
  const urls = await Url.find({ owner });
  if (!urls) {
    throw new AppError(404, "URL not found");
  }
  return urls;
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

export async function updateURL(userId, owner, newUrl) {
  const { originalUrl, customAlias, isActive } = newUrl;
  const url = await Url.findOneAndUpdate(
    {
      _id: userId,
      owner,
    },
    {
      $set: { originalUrl, shortId: customAlias, isActive },
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
  
  if(!url){
  throw new AppError(404,"URL not found")
  }
  const { originalUrl , clicks , createdAt} = url
  return {
   originalUrl,shortId,clicks,createdAt
  }
}