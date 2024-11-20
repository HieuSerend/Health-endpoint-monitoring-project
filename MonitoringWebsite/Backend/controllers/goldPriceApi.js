const fetch = require('node-fetch');
require('dotenv').config();
const SJC_URL = process.env.SJC_URL;

const getGoldPrices = async (req, res) => {
    try {
        const response = await fetch(SJC_URL);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching gold prices:", error);
        res.status(500).send("Error fetching gold prices");
    }
};

module.exports = { getGoldPrices };
