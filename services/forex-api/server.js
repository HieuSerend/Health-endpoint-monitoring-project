require("dotenv").config();
const express = require("express");
const client = require("prom-client"); // Thêm thư viện Prometheus Client

const app = express();
const port = process.env.PORT || 8002;
const url = process.env.VIETCOMBANK_URL;

// Khởi tạo các metrics cho Prometheus
const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of requests to the /gold-prices endpoint",
  labelNames: ["method", "status"],
});

const requestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "status"],
  buckets: [0.1, 0.5, 1, 2, 5, 10], // Các ngưỡng thời gian
});

// Endpoint Prometheus /metrics
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    console.error("Error generating metrics:", error);
    res.status(500).send("Error generating metrics");
  }
});

// Endpoint /gold-prices
app.get("/currency-rates", async (req, res) => {
  const end = requestDuration.startTimer(); // Bắt đầu đo thời gian
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();

    // Cập nhật các metrics
    requestCounter.inc({ method: req.method, status: 200 });
    end({ method: req.method, status: 200 }); // Dừng đo thời gian với nhãn status 200

    res.status(200).send(data);
  } catch (error) {
    console.error("Error scraping data:", error);

    // Cập nhật metrics cho lỗi
    requestCounter.inc({ method: req.method, status: 500 });
    end({ method: req.method, status: 500 }); // Dừng đo thời gian với nhãn status 500

    res
      .status(500)
      .send({ message: "Error fetching data", error: error.message });
  }
});

// Bắt đầu server
app.listen(port, () => {
  console.log(
    `API runs on \x1b[34mhttp://localhost:${port}/currency-rates\x1b[0m`
  );
  console.log(
    `Prometheus metrics available on \x1b[34mhttp://localhost:${port}/metrics\x1b[0m`
  );
});
