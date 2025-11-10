// middleware/logger.js
module.exports = function logger(req, res, next) {
    const start = new Date().toISOString();
    console.log(`[${start}] ${req.method} ${req.url}`);
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        console.log('Body:', req.body);
    }

    res.on('finish', () => {
        console.log(`→ ${req.method} ${req.url} - ${res.statusCode}`);
    });

    next();
};
