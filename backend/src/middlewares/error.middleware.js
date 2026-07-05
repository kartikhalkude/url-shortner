export default function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const status =
    err.status || (String(statusCode).startsWith("4") ? "fail" : "error");

  res.status(statusCode).json({
    status,
    message,
  });
}
