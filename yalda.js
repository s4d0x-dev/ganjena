// yalda.js — Yalda Night celebration (pomegranate + book), persistent

(function () {
  // Create banner (if not already created)
  if (!document.getElementById("yalda-banner")) {
    const banner = document.createElement("div");
    banner.id = "yalda-banner";
    banner.innerHTML = "🍎🍉 یلدا همایونی باد 📖";
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(90deg, #8b0000, #b22222);
      color: #fff;
      text-align: center;
      font-size: 20px;
      font-family: sans-serif;
      padding: 12px;
      z-index: 9999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(banner);
  }

  // Function to create falling emojis
  function createEmoji() {
    const e = document.createElement("div");
    e.textContent = ["🍎", "🍉", "📖"][Math.floor(Math.random() * 3)];
    e.style.cssText = `
      position: fixed;
      top: -30px;
      left: ${Math.random() * 100}vw;
      font-size: 24px;
      pointer-events: none;
      animation: fall 4s linear forwards;
      z-index: 9998;
    `;
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 4000);
  }

  // Keep creating emojis every 500ms indefinitely
  setInterval(createEmoji, 300);

  // Add keyframes animation if not already added
  if (!document.getElementById("yalda-style")) {
    const style = document.createElement("style");
    style.id = "yalda-style";
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(110vh);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
})();
