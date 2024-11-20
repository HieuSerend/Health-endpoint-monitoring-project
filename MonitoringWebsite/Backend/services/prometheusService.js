const client = require('prom-client');
const fetch = require('node-fetch');
require('dotenv').config();

// Initialize Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const requestCounter = new client.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests',
});

const responseTimeHistogram = new client.Histogram({
    name: 'node_request_duration_seconds',
    help: 'Histogram for the duration in seconds.',
    buckets: [1, 2, 5, 6, 10],
});

// Function to record metrics
const recordMetrics = (startTime) => {
    const duration = (new Date() - startTime) / 1000; // convert to seconds
    responseTimeHistogram.observe(duration);
    requestCounter.inc();
};

// Middleware for collecting metrics on each request
const metricsMiddleware = async (req, res, next) => {
    if (req.path === '/gold-prices') {
        const startTime = new Date();
        res.on('finish', () => recordMetrics(startTime));
    }
    next();
};

// Expose metrics endpoint for Prometheus
const startMetricsServer = (app) => {
    app.use(metricsMiddleware);

    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    });
};

module.exports = { startMetricsServer };
