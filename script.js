const startDate = new Date("2025-06-26T12:00:00");
const calendar = document.getElementById("calendar");
const tiktokList = document.getElementById("tiktok-list");
const selectedDate = document.getElementById("selected-date");
const linksContainer = document.getElementById("links");

const generateCalendar = () => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    for (let i = 1; i <= last.getDate(); i++) {
        const day = document.createElement("div");
        day.className = "day";
        day.textContent = i;
        day.onclick = () => loadTikToks(i);
        calendar.appendChild(day);
    }
};

const loadTikToks = (day) => {
    fetch("tiktok-data.json")
        .then(res => res.json())
        .then(data => {
            const key = day.toString().padStart(2, "0");
            const tiktoks = data[key] || [];
            selectedDate.textContent = `${day} giugno/luglio`;
            linksContainer.innerHTML = "";
            tiktoks.forEach(link => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = link;
                a.textContent = link;
                a.target = "_blank";
                li.appendChild(a);
                linksContainer.appendChild(li);
            });
            tiktokList.classList.remove("hidden");
        });
};

const updateTimer = () => {
    const now = new Date();
    const diff = now - startDate;
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("timer").textContent = 
        `${days} giorni, ${hours} ore, ${minutes} minuti, ${seconds} secondi`;
};

generateCalendar();
setInterval(updateTimer, 1000);
