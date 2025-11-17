function errorHandler(err, req, res, next) {
  console.error(err && err.stack ? err.stack : err);
  const status = err.status || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal Server Error'
  };
  if (err.details) payload.details = err.details;
  res.status(status).json(payload);
}

module.exports = errorHandler;
