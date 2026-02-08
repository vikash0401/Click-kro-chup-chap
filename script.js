/* PAGE SYSTEM */
let currentPage = 0;
const pages = document.querySelectorAll(".page");

function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
  startTyping(pages[currentPage]);
}

/* 🌙 Night Mode */
function toggleMode() {
  document.body.classList.toggle("night");
  const btn = document.getElementById("modeToggle");
  btn.textContent = document.body.classList.contains("night") ? "☀️" : "🌙";
}

/* 🎵 Music (continuous) */
let musicStarted = false;
function startMusic() {
  const music = document.getElementById("bg-music");
  if (!musicStarted) {
    music.play();
    musicStarted = true;
  }
}

/* ✍️ Typewriter */
function startTyping(page) {
  const elements = page.querySelectorAll(".typewriter");
  elements.forEach(el => {
    const text = el.dataset.text;
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);
  });
}

startTyping(pages[0]);

/* 🌸 Sakura Petals */
const canvas = document.getElementById("sakura");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let petals = [];
const petalCount = 30;

for (let i = 0; i < petalCount; i++) {
  petals.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 2,
    d: Math.random() * petalCount
  });
}

let angle = 0;
function drawPetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,183,197,0.8)";
  ctx.beginPath();

  petals.forEach(p => {
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  });

  ctx.fill();
  angle += 0.01;

  petals.forEach(p => {
    p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
    p.x += Math.sin(angle) * 2;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawPetals, 33);
