export const isAdmin = (req, res, next) => {
    if (!req.session.is_admin) {
        return res.status(401).json({
            message:
                'You are not authorized as Admin. Please speak to Admin for permission.',
        });
    }
    next();
};

// module.exports = isAdmin;
