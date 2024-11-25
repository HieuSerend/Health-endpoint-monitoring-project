const fetch = require('node-fetch');
require('dotenv').config();
const VCB_URL = process.env.VCB_URL;

const getCurrencyPrices = async (req, res) => {
    try {
        const response = await fetch(VCB_URL);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching currency prices:", error);
        res.status(500).send("Error fetching currency prices");
    }
};

module.exports = { getCurrencyPrices };