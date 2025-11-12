// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.error('❌ Error:', {
    message: err.message,
    statusCode: err.statusCode,
    timestamp: new Date().toISOString(),
  });

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = { errorHandler };
