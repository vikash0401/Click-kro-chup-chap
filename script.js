/* PAGE SYSTEM */
let currentPage = 0;
const pages = document.querySelectorAll(".page");

/* 🎵 MUSIC CONTROL */
const music = document.getElementById("bg-music");
let musicStarted = false;

music.volume = 0; // start silent

function fadeInMusic() {
  let volume = 0;
  const fade = setInterval(() => {
    if (volume < 1) {
      volume += 0.05;
      music.volume = Math.min(volume, 1);
    } else {
      clearInterval(fade);
    }
  }, 100);
}

function nextPage() {
  if (!musicStarted) {
    music.play().then(() => {
      musicStarted = true;
      fadeInMusic();
      document.getElementById("musicToggle").textContent = "⏸";
    }).catch(() => {});
  }

  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
  startTyping(pages[currentPage]);
}

/* ⏯ MUSIC TOGGLE */
function toggleMusic() {
  const btn = document.getElementById("musicToggle");
  if (music.paused) {
    music.play();
    btn.textContent = "⏸";
  } else {
    music.pause();
    btn.textContent = "▶️";
  }
}

/* 🌙 Night Mode */
function toggleMode() {
  document.body.classList.toggle("night");
  const btn = document.getElementById("modeToggle");
  btn.textContent = document.body.classList.contains("night") ? "☀️" : "🌙";
}

/* ✍️ TYPEWRITER */
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

/* 🌸 SAKURA PETALS */
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
