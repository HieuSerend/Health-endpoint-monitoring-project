const express = require('express');
const { startMetricsServer } = require('./services/prometheusService');
const goldApiRoutes = require('./routes/goldApiRoutes');
const currencyApiRoutes = require('./routes/currencyApiRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001;
const HOST_NAME = process.env.HOST_NAME || 'localhost';

// Start Prometheus metrics collection
startMetricsServer(app);

// Use API routes
app.use('/api', goldApiRoutes);
app.use('/api', currencyApiRoutes);

app.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});
