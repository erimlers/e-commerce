export function notFound(req, res, next) {
  const error = new Error(`Bulunamadı: ${req.method} ${req.path}`);
  error.status = 404;
  next(error);
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }

  const status = err.status || err.statusCode || 500;
  const payload = {
    error: {
      message: status === 500 ? "Sunucu hatası" : err.message,
    },
  };

  if (process.env.NODE_ENV === "development" && status === 500) {
    payload.error.detail = err.message;
  }

  res.status(status).json(payload);
}
