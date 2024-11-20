import { fetchData } from './utils.js';

document.addEventListener("DOMContentLoaded", async () => {
    const apiData = await fetchData("/metrics");
    if (!apiData || apiData.status !== "success") return;

    const { response_times, uptime_percentages } = apiData.data;

    // Hiển thị response time
    const responseTimeContainer = document.getElementById("response-time");
    Object.entries(response_times).forEach(([api, time]) => {
        const div = document.createElement("div");
        div.textContent = `${api}: ${time}ms`;
        responseTimeContainer.appendChild(div);
    });

    // Hiển thị uptime percentages
    const uptimeContainer = document.getElementById("uptime-details");
    Object.entries(uptime_percentages).forEach(([api, uptime]) => {
        const div = document.createElement("div");
        div.classList.add("flex", "items-center", "mb-2");
        div.innerHTML = `
            <span class="w-1/4">${api}</span>
            <div class="bg-gray-200 h-4 rounded w-3/4 relative">
                <div class="bg-green-500 h-4 rounded absolute left-0 top-0" style="width: ${uptime}%;"></div>
            </div>
            <span class="w-1/4 text-right">${uptime}%</span>
        `;
        uptimeContainer.appendChild(div);
    });
});
