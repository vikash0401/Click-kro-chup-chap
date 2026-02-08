let currentPage = 0;
const pages = document.querySelectorAll(".page");

function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
  startTyping(pages[currentPage]);
}

function playMusic() {
  document.getElementById("bg-music").play();
}

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