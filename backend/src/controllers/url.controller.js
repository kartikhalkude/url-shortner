import Url from "../models/url.model.js";
import {
  createShortUrl,
  deleteUrl,
  getAnalytics,
  getUrls,
  redirectToOriginalUrl,
  updateURL,
} from "../services/url.service.js";

export async function createUrl(req, res, next) {
  try {
    const url = await createShortUrl(req.body, req.user._id);

    res.status(201).json({
      message: "URL created scuccessfully",
      url,
    });
  } catch (error) {
    next(error);
  }
}

export async function redirectUrl(req, res, next) {
  try {
    const shortId = req.params.shortId;
    const url = await redirectToOriginalUrl(shortId);
    res.redirect(url);
  } catch (error) {
    next(error);
  }
}

export async function getUserUrls(req, res, next) {
  try {
    const owner = req.user.id;
    const urls = await getUrls(owner);
    res.status(200).json({
      urls,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUsersUrl(req, res, next) {
  try {
    await deleteUrl(req.params.id, req.user._id);
    res.status(200).json({
      success: true,
      message: "URL Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserURL(req, res, next) {
  try {
    const url = await updateURL(req.params.id, req.user._id, req.body);
    res.status(200).json({
      success: true,
      url,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUrlAnalytics(req, res,next) {
  try {
    const url = await getAnalytics(req.params.shortId);
    res.status(200).json({
      success: true,
      url,
    });
  } catch (error) {
    next(error);
  }
}
