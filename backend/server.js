const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const contactRoute = require('./routes/contact');

const app = express();
const port = Number(process.env.PORT) || 5050;
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
// Render sits behind a proxy/load balancer, so Express must trust it for rate limiting and IP detection.
app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed by CORS.'));
    }
  })
);

app.use(express.json({ limit: '1mb' }));

app.use('/api/contact', contactRoute);

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    return res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.message === 'Origin not allowed by CORS.') {
    return res.status(403).json({ success: false, message: error.message });
  }

  console.error('Server error:', error);

  return res.status(500).json({
    success: false,
    message: 'Something unexpected happened on the server.'
  });
});

app.listen(port, () => {
  console.log(`Portfolio server listening on http://localhost:${port}`);
});
