// ===== Game data (icons downloaded from Google Play into assets/icons) =====
const PLAY = "https://play.google.com/store/apps/details?id=";
const games = [
  { id: "com.peoplefun.wordsearch", name: "Wordscapes Search", cat: "puzzle", dl: "10M+", desc: "Relaxing word-search puzzles with themed packs and daily challenges.", featured: true },
  { id: "com.ludoluck.dice.game", name: "Ludo Luck", cat: "board", dl: "1M+", desc: "Classic Ludo with dice rolls, captures and fast matches with friends.", featured: true },
  { id: "com.mega.ludo", name: "Mega Ludo", cat: "board", dl: "1M+", desc: "Ludo rooms with voice chat — roll, race and talk with players live.", featured: true },
  { id: "com.mft.wild.lion.simulator.animal.hunting.game", name: "Lion Family Simulator", cat: "sim", dl: "500K+", desc: "Live as a wild lion — hunt, survive and raise your pride." },
  { id: "com.mft.ultimate.car.driving.racing.simulator.game", name: "Car Driving Simulator", cat: "sim", dl: "100K+", desc: "Open-road driving and racing with realistic car handling." },
  { id: "com.ludomatchdicegame", name: "Arrow Rescue: Tap Puzzle", cat: "puzzle", dl: "50K+", desc: "Tap arrows in the right order to clear the board." },
  { id: "com.mft.petrunner.catrun.minipet", name: "Pet Runner World", cat: "arcade", dl: "10K+", desc: "Endless runner with cute pets — dodge, jump and collect." },
  { id: "com.mft.lionfamily.animalsimulator.liongame", name: "Bus Simulator: Coach Drive", cat: "sim", dl: "10K+", desc: "Drive big coaches through city and highway routes." },
  { id: "com.mft.wordmatch.quizgame.spellinggame", name: "Wild Bear Journey", cat: "sim", dl: "5K+", desc: "Explore the wild as a bear in an open-world animal adventure." },
  { id: "com.mtg.zamanicdino.dinohuntingmtg", name: "Good & Bad Dragon 3D", cat: "arcade", dl: "1K+", desc: "Fly, fight and run as a dragon in a 3D action game." },
  { id: "com.dailysparkquotes", name: "Snow Race Master", cat: "arcade", dl: "500+", desc: "Roll giant snowballs, beat rivals and race to the finish." },
  { id: "com.busrushfevertrafficjamgame", name: "Bus Rush Fever Party", cat: "puzzle", dl: "500+", desc: "Sort passengers and clear the traffic jam." },
  { id: "com.mft.tile.puzzle.meatch.master.tripple", name: "Tiles Pairing Puzzle", cat: "puzzle", dl: "100+", desc: "Match three tiles to clear the board." },
  { id: "com.pizzaserveidletycoon", name: "Pizza Serve! Idle Tycoon", cat: "sim", dl: "100+", desc: "Bake, serve and grow your pizza empire." },
  { id: "com.wheeliemoto.ride3d.game", name: "Wheelie Moto Ride 3D", cat: "sim", dl: "New", desc: "Pull off wheelies and stunts on a 3D bike." },
  { id: "video", name: "Driving Doctor Learning", cat: "sim", dl: "Video", desc: "Driving-school learning game — gameplay video.", url: "#reel" },
];
const catName = { board: "Board", puzzle: "Puzzle", arcade: "Arcade", sim: "Simulation" };
const icon = g => `assets/icons/${g.id}.webp`;
const link = g => g.url || PLAY + g.id + "&hl=en";
const ext = g => (g.url ? "" : 'target="_blank" rel="noopener"');
const withIcons = games.filter(g => !g.url);

// ===== Featured =====
document.getElementById("featured").innerHTML = games.filter(g => g.featured).map(g => `
  <a class="feat reveal" href="${link(g)}" ${ext(g)}>
    <div class="bgimg" style="background-image:url('${icon(g)}')"></div>
    <img class="ico" src="${icon(g)}" alt="${g.name} icon" loading="lazy" />
    <span class="dl"><b>${g.dl}</b> downloads</span>
    <h3>${g.name}</h3>
    <p>${g.desc}</p>
    <span class="go"><span class="arr">→</span> View on Google Play</span>
  </a>`).join("");

// ===== Grid + filters =====
const grid = document.getElementById("grid");
document.getElementById("cnt-all").textContent = games.length;
function render(f = "all") {
  grid.innerHTML = games.filter(g => f === "all" || g.cat === f).map((g, i) => `
    <a class="game spot" href="${link(g)}" ${ext(g)} style="animation-delay:${i * 40}ms">
      ${g.url ? '<span class="vid"></span><span class="ph">▶</span>' : `<img src="${icon(g)}" alt="${g.name} icon" loading="lazy" />`}
      <div class="meta">
        <h4>${g.name}</h4>
        <span class="tag">${catName[g.cat]}</span>
        <div class="row"><span class="dl"><b>${g.dl}</b>${/\+$/.test(g.dl) ? " installs" : ""}</span><span class="arr">→</span></div>
      </div>
    </a>`).join("");
  bindSpot(grid.querySelectorAll(".spot"));
}
render();
document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  document.querySelectorAll("#filters button").forEach(x => x.classList.toggle("active", x === b));
  render(b.dataset.f);
});

// ===== Marquee =====
const item = g => `<div><img src="${icon(g)}" alt="" loading="lazy" />${g.name}<i>✦</i></div>`;
document.getElementById("track").innerHTML = (withIcons.map(item).join("")).repeat(2);

// ===== Hero orbit of icons =====
const spots = [
  [6, 18, 96, -12], [16, 62, 74, 10], [4, 78, 60, -6], [26, 8, 58, 8],
  [80, 14, 90, 10], [88, 52, 70, -10], [74, 78, 84, 6], [68, 6, 56, -8],
  [34, 84, 54, 12], [58, 88, 62, -14],
];
const orbit = document.getElementById("orbit");
orbit.innerHTML = spots.map(([x, y, s, r], i) => {
  const g = withIcons[i % withIcons.length];
  return `<img src="${icon(g)}" alt="" style="left:${x}%;top:${y}%;--s:${s}px;--rot:${r}deg;--d:${0.3 + i * 0.08}s;--o:${s > 70 ? 0.95 : 0.5}" data-depth="${s / 40}" />`;
}).join("");
const orbitImgs = [...orbit.querySelectorAll("img")];

// ===== Pointer effects: glow, parallax, spotlight, magnetic =====
const fine = matchMedia("(pointer: fine)").matches;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const glow = document.getElementById("glow");
if (fine && !reduce) {
  addEventListener("pointermove", e => {
    glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
    const cx = e.clientX / innerWidth - 0.5, cy = e.clientY / innerHeight - 0.5;
    orbitImgs.forEach(img => { const d = +img.dataset.depth; img.style.translate = `${cx * d * -14}px ${cy * d * -14}px`; });
  });
  document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
  document.querySelectorAll(".feat").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}
function bindSpot(els) {
  els.forEach(el => el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  }));
}
bindSpot(document.querySelectorAll(".bento .spot"));

// ===== Reveal + counters =====
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in");
  en.target.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, t0 = performance.now(), dur = 1400;
    const tick = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  io.unobserve(en.target);
}), { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + "ms"; io.observe(el); });

// ===== Mobile menu =====
const links = document.getElementById("links"), burger = document.getElementById("burger");
burger.onclick = () => { links.classList.toggle("open"); burger.classList.toggle("x"); };
links.querySelectorAll("a").forEach(a => (a.onclick = () => { links.classList.remove("open"); burger.classList.remove("x"); }));

document.getElementById("yr").textContent = new Date().getFullYear();
