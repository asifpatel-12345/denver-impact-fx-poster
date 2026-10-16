// ---------- Fire sparks / embers ----------
const canvas = document.getElementById("sparks");
const ctx = canvas.getContext("2d");
let W, H, sparks = [];

function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

function makeSpark() {
  return {
    x: W * (0.15 + Math.random() * 0.7),
    y: H * (0.7 + Math.random() * 0.25),
    r: Math.random() * 2 + 0.6,
    vx: (Math.random() - 0.5) * 0.7,
    vy: -(Math.random() * 1.4 + 0.4),
    life: 1,
    decay: Math.random() * 0.006 + 0.003,
  };
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  if (sparks.length < 90) sparks.push(makeSpark());
  sparks = sparks.filter((s) => s.life > 0);
  for (const s of sparks) {
    s.x += s.vx; s.y += s.vy; s.life -= s.decay;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,${160 + Math.random() * 60},40,${s.life})`;
    ctx.shadowColor = "#ffa62b";
    ctx.shadowBlur = 8;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(loop);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) loop();

// ---------- Mouse tilt on the can ----------
const poster = document.getElementById("poster");
const can = document.getElementById("can");
poster.addEventListener("mousemove", (e) => {
  const r = poster.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  can.style.transform = `translateX(-50%) perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 6}deg)`;
});
poster.addEventListener("mouseleave", () => {
  can.style.transform = "translateX(-50%)";
});
