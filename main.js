/* ── CONFIG — edit this section only ─────────────────── */
const CONFIG = {
  shortName: "CIWC",
  fullName: "Concordia International Weightlifting Club",

  channelId: "UC3EnVXpZZ2f3pTmMMZJzWLg",
  playlistId: "PLV42tu4VffDrEOQEEcd4ID1bu-QPQqk9e",

  links: {
    email: "ciwc2001@gmail.com",
    instagram: "https://www.instagram.com/concordiaweightlifting/",
    address: "5400 Av de Westbury, Montréal, QC H3W 2Y8",
    contactForm: "inquiry/"
  },

  schedule: [
    { day: "Monday",    time: "4:00 PM–8:00 PM",  location: "YMHA Gym" },
    { day: "Wednesday", time: "4:00 PM–8:00 PM",  location: "YMHA Gym" },
    { day: "Thursday",  time: "4:00 PM–8:00 PM",  location: "YMHA Gym" },
    { day: "Saturday",  time: "9:00 AM–12:00 PM", location: "YMHA Gym" }
  ],

  sponsors: [
    { name: "Jean Coutu",          note: "Queen Mary",        logo: "images/sponsor-jean-coutu.png" },
    { name: "TD Canada Trust",     note: "Queen Mary",        logo: "images/sponsor-td.png" },
    { name: "MNA Elisabeth Prass", note: "",                  logo: "images/sponsor-elisabeth-prass.png" },
    { name: "City of Montréal",    note: "Borough CDN–NDG",   logo: "images/sponsor-cdn-ndg.png" }
  ],

  quotes: [
    {
      text: "Perseverance, Sustained Effort, Ingenuity and Patience.",
      author: "Lionel St-Jean"
    },
    // {
    //   text: "If you are afraid - don't go. If you go - don't be afraid.",
    //   author: "John Margolis"
    // }
  ],

  quoteIntervalMs: 10000
};

/* ── Helpers ─────────────────────────────────────────── */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}

function safeText(el, val) {
  if (el && val != null) el.textContent = String(val);
}

function safeHref(el, href) {
  if (el && href) el.setAttribute("href", href);
}

function setExternal(el) {
  if (!el) return;
  el.target = "_blank";
  el.rel = "noopener noreferrer";
}

/* ── YouTube ─────────────────────────────────────────── */
function initYouTube() {
  const channelUrl = CONFIG.channelId
    ? `https://www.youtube.com/channel/${encodeURIComponent(CONFIG.channelId)}`
    : "#";

  $$("[data-channel-link]").forEach(a => { safeHref(a, channelUrl); setExternal(a); });

  const iframe = $("#playlist-player");
  if (!iframe || !CONFIG.playlistId) return;

  const params = new URLSearchParams({
    listType: "playlist",
    list: CONFIG.playlistId,
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });

  iframe.src = `https://www.youtube.com/embed?${params.toString()}`;
}

/* ── Schedule ────────────────────────────────────────── */
function initSchedule() {
  const tbody = $("#schedule-body");
  if (!tbody) return;

  tbody.innerHTML = CONFIG.schedule.map(row => `
    <tr>
      <td data-label="Day"><span>${escapeHtml(row.day)}</span></td>
      <td data-label="Time"><span>${escapeHtml(row.time)}</span></td>
      <td data-label="Location"><span>${escapeHtml(row.location)}</span></td>
    </tr>
  `).join("");
}

/* ── Sponsors ────────────────────────────────────────── */
function initSponsors() {
  const grid = $("#sponsor-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.sponsors.map(s => `
    <div class="sponsor-card">
      <img class="sponsor-logo" src="${escapeHtml(s.logo)}" alt="${escapeHtml(s.name)} logo"
           loading="lazy" onerror="this.style.display='none'">
      <p class="sponsor-name">${escapeHtml(s.name)}</p>
      ${s.note ? `<p class="sponsor-note">${escapeHtml(s.note)}</p>` : ""}
    </div>
  `).join("");
}

/* ── Contact ─────────────────────────────────────────── */
function initContact() {
  const emailEl = $("#email-link");
  if (emailEl && CONFIG.links.email) {
    safeHref(emailEl, `mailto:${CONFIG.links.email}`);
    safeText(emailEl, CONFIG.links.email);
  }

  const instaEl = $("#insta-link");
  if (instaEl && CONFIG.links.instagram) {
    safeHref(instaEl, CONFIG.links.instagram);
    setExternal(instaEl);
  }

  safeText($("#address-text"), CONFIG.links.address);
  $$("[data-inquiry-link]").forEach(a => safeHref(a, CONFIG.links.contactForm));
}

/* ── Mobile menu ─────────────────────────────────────── */
function initMobileMenu() {
  const btn = $("#menu-btn");
  const nav = $("#site-nav");
  if (!btn || !nav) return;

  const close = () => { nav.dataset.open = "false"; btn.setAttribute("aria-expanded", "false"); };
  const open  = () => { nav.dataset.open = "true";  btn.setAttribute("aria-expanded", "true"); };
  const toggle = () => (nav.dataset.open === "true" ? close() : open());

  btn.addEventListener("click", e => { e.preventDefault(); toggle(); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));

  document.addEventListener("click", e => {
    if (nav.dataset.open !== "true") return;
    if (!nav.contains(e.target) && !btn.contains(e.target)) close();
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 861px)").matches) close();
  });
}

/* ── Quote carousel ──────────────────────────────────── */
let currentQuote = 0;
let quoteTimer = null;

function renderQuote(index, animate) {
  const quotes = CONFIG.quotes;
  const textEl = $("#quote-text");
  const authorEl = $("#quote-author");
  const dotsEl = $("#quote-dots");
  if (!textEl || !authorEl || !dotsEl) return;

  if (animate) {
    textEl.style.opacity = "0";
    authorEl.style.opacity = "0";
    setTimeout(() => {
      textEl.textContent = quotes[index].text;
      authorEl.textContent = quotes[index].author;
      textEl.style.opacity = "1";
      authorEl.style.opacity = "1";
    }, 350);
  } else {
    textEl.textContent = quotes[index].text;
    authorEl.textContent = quotes[index].author;
  }

  dotsEl.innerHTML = "";
  quotes.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "quote-dot" + (i === index ? " active" : "");
    dot.setAttribute("aria-label", `Quote ${i + 1} of ${quotes.length}`);
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-selected", String(i === index));
    dot.addEventListener("click", () => goToQuote(i));
    dotsEl.appendChild(dot);
  });
}

function goToQuote(index) {
  currentQuote = (index + CONFIG.quotes.length) % CONFIG.quotes.length;
  renderQuote(currentQuote, true);
  resetQuoteTimer();
}

function moveQuote(dir) {
  goToQuote(currentQuote + dir);
}

function resetQuoteTimer() {
  clearInterval(quoteTimer);
  quoteTimer = setInterval(() => moveQuote(1), CONFIG.quoteIntervalMs);
}

function initQuotes() {
  if (!CONFIG.quotes || CONFIG.quotes.length === 0) return;
  renderQuote(0, false);
  resetQuoteTimer();

  const prev = $("#quote-prev");
  const next = $("#quote-next");
  if (prev) prev.addEventListener("click", () => moveQuote(-1));
  if (next) next.addEventListener("click", () => moveQuote(1));
}

/* ── Brand / hero text ───────────────────────────────── */
function initText() {
  safeText($("#brand-title"), CONFIG.shortName);
  safeText($("#brand-sub"), CONFIG.fullName);
  safeText($("#hero-title"), CONFIG.fullName);
  safeText($("#year"), new Date().getFullYear());
}

/* ── Boot ────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initText();
  initYouTube();
  initSchedule();
  initSponsors();
  initContact();
  initMobileMenu();
  initQuotes();
});