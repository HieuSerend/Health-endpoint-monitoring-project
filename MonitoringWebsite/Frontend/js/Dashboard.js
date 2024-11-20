import { fetchData, calculatePercentage } from './utils.js';

document.addEventListener("DOMContentLoaded", async () => {
    const apiData = await fetchData("/metrics");
    if (!apiData || apiData.status !== "success") return;

    const { total_apis, up, down } = apiData.data;

    // Hiển thị số lượng API up và down
    document.getElementById("total-apis").textContent = total_apis;
    document.getElementById("up-apis").textContent = up;
    document.getElementById("down-apis").textContent = down;

    // Hiển thị phần trăm uptime
    const uptimePercent = calculatePercentage(up, total_apis);
    const uptimeBar = document.getElementById("uptime-bar");
    uptimeBar.style.width = `${uptimePercent}%`;
    uptimeBar.textContent = `${uptimePercent}%`;
});
