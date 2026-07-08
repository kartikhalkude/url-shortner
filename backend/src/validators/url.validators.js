import { body } from "express-validator";

export const createUrlValidator = [
  body("originalUrl")
    .notEmpty()
    .withMessage("Original URL is required")
    .isURL()
    .withMessage("Please Enter a valid URL"),
  body("customAlias")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Alias must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Alias can be only contain letters ,numbers, '-' and '_"),
];

export const updateUrlValidator = [
  body("originalUrl")
    .optional()
    .isURL()
    .withMessage("Please Enter a valid URL"),
  body("customAlias")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Alias must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Alias can be only contain letters ,numbers, '-' and '_"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];
