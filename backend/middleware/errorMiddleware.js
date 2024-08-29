const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400
    message = 'Resource not found'
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
// The errorMiddleware.js file exports two middleware functions: notFound and errorHandler. The notFound function is an Express middleware that returns a 404 status code and an error message. The errorHandler function is an Express error handler that returns a 500 status code and an error message with the stack trace. The error handler is used to catch any errors that occur during the request processing pipeline and return a consistent error response to the client.
// The errorMiddleware.js file is imported in the server.js file and added to the Express app as middleware. This ensures that any errors that occur during the request processing pipeline are caught and handled by the error middleware.
