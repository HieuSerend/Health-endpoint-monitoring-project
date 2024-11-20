const API_BASE_URL = "http://localhost:8001"; // Địa chỉ API backend

// Hàm fetch dữ liệu từ API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function calculatePercentage(part, total) {
    return total === 0 ? 0 : ((part / total) * 100).toFixed(2);
}

export { fetchData, calculatePercentage };

  