const errorHandler = (err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || 'Something went wrong.';

    res.status(status).json({ message });

    next(err); //Prevent any other default error handler from taking over
};

module.exports = errorHandler;
