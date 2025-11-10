// middleware/imagesHandler.js
const express = require('express');
const path = require('path');
const fs = require('fs');

function imagesMiddleware(app) {
  const imagesPath = path.join(__dirname, '..', 'public', 'images');
  app.use('/images', express.static(imagesPath));

  app.use('/images', (req, res) => {
    const file = path.join(imagesPath, req.path);
    if (!fs.existsSync(file)) {
      res.status(404).json({ error: 'Image not found', file: req.path });
    }
  });
}

module.exports = imagesMiddleware;
