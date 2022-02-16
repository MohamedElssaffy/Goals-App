const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  if (err.kind === 'ObjectId') {
    res.status(400).json({
      messsage: 'No item with this Id',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }

  res.status(statusCode).json({
    messsage: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
