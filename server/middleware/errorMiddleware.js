const errorHandler = (err, req, res, next) => {
  console.error("ERROR STACK:", err); // 🔥 ADD THIS

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    stack: err.stack, // 🔥 TEMP ONLY
  });
};

export default errorHandler;
