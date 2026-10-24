/* ── CONFIG — edit this section only ─────────────────── */
const CONFIG = {
  shortName: "CIWC",
  fullName: "Concordia International Weightlifting Club",
  siteUrl: "https://ciweightlifting.ca/",
  foundingYear: "2002",

  channelId: "UC3EnVXpZZ2f3pTmMMZJzWLg",
  playlistId: "PLV42tu4VffDrEOQEEcd4ID1bu-QPQqk9e",

  links: {
    email: "ciwc2001@gmail.com",
    instagram: "https://www.instagram.com/concordiaweightlifting/",
    contactForm: "inquiry/"
  },

  location: {
    name: "YMHA Gym",
    street: "5400 Av de Westbury",
    city: "Montréal",
    region: "QC",
    postalCode: "H3W 2Y8"
  },

  // Times are shown as written; `opens`/`closes` (24h) feed the search-engine data.
  schedule: [
    { day: "Monday",    time: "4:00 PM–8:00 PM",  opens: "16:00", closes: "20:00" },
    { day: "Wednesday", time: "4:00 PM–8:00 PM",  opens: "16:00", closes: "20:00" },
    { day: "Thursday",  time: "4:00 PM–8:00 PM",  opens: "16:00", closes: "20:00" },
    { day: "Saturday",  time: "9:00 AM–12:00 PM", opens: "09:00", closes: "12:00" }
  ],

  sponsors: [
    { name: "Jean Coutu",            note: "Queen Mary",      logo: "images/sponsor-jean-coutu.png" },
    { name: "TD Canada Trust",       note: "Queen Mary",      logo: "images/sponsor-td.png" },
    { name: "MNA Elisabeth Prass",   note: "",                logo: "images/sponsor-assemblee-nationale.png" },
    { name: "MNA Michelle Setlakwe", note: "",                logo: "images/sponsor-assemblee-nationale.png" },
    { name: "City of Montréal",      note: "Borough CDN–NDG", logo: "images/sponsor-cdn-ndg.png" }
  ],

  // Add more quotes to turn on the arrows, dots and auto-rotation.
  quotes: [
    { text: "Perseverance, Sustained Effort, Ingenuity and Patience.", author: "Lionel St-Jean" }
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

function fullAddress() {
  const l = CONFIG.location;
  return `${l.street}, ${l.city}, ${l.region} ${l.postalCode}`;
}

function mapsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;
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
    list: CONFIG.playlistId,
    rel: "0",
    playsinline: "1"
  });

  iframe.src = `https://www.youtube-nocookie.com/embed/videoseries?${params.toString()}`;
}

/* ── Schedule ────────────────────────────────────────── */
function initSchedule() {
  const tbody = $("#schedule-body");
  if (!tbody) return;

  tbody.innerHTML = CONFIG.schedule.map(row => `
    <tr>
      <th scope="row" class="sched-day">${escapeHtml(row.day)}</th>
      <td class="sched-time">${escapeHtml(row.time)}</td>
      <td class="sched-loc">${escapeHtml(row.location || CONFIG.location.name)}</td>
    </tr>
  `).join("");

  const locLink = $("#location-link");
  safeHref(locLink, mapsUrl());
  safeText($("#location-text"), `${CONFIG.location.name}, ${CONFIG.location.street}`);
}

/* ── Sponsors ────────────────────────────────────────── */
function initSponsors() {
  const grid = $("#sponsor-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.sponsors.map(s => `
    <div class="sponsor-card">
      <img class="sponsor-logo" src="${escapeHtml(s.logo)}" alt="${escapeHtml(s.name)} logo"
           width="64" height="64" loading="lazy" decoding="async">
      <p class="sponsor-name">${escapeHtml(s.name)}</p>
      ${s.note ? `<p class="sponsor-note">${escapeHtml(s.note)}</p>` : ""}
    </div>
  `).join("");

  $$(".sponsor-logo", grid).forEach(img =>
    img.addEventListener("error", () => { img.style.display = "none"; }, { once: true })
  );
}

/* ── Contact ─────────────────────────────────────────── */
function initContact() {
  const { email, instagram, contactForm } = CONFIG.links;

  if (email) {
    const emailEl = $("#email-link");
    safeHref(emailEl, `mailto:${email}`);
    safeText(emailEl, email);
    $$("[data-email-link]").forEach(a => safeHref(a, `mailto:${email}`));
    safeHref($("#sponsor-link"), `mailto:${email}?subject=${encodeURIComponent("Sponsoring CIWC")}`);
  }

  if (instagram) {
    [$("#insta-link"), ...$$("[data-insta-link]")].forEach(a => { safeHref(a, instagram); setExternal(a); });
  }

  safeText($("#address-text"), fullAddress());
  safeHref($("#address-link"), mapsUrl());
  $$("[data-inquiry-link]").forEach(a => safeHref(a, contactForm));
}

/* ── Structured data (helps search engines show hours/address) ── */
function initStructuredData() {
  const l = CONFIG.location;
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    name: CONFIG.fullName,
    alternateName: CONFIG.shortName,
    url: CONFIG.siteUrl,
    logo: new URL("images/icon-192.png", CONFIG.siteUrl).href,
    image: new URL("images/og-image.jpg", CONFIG.siteUrl).href,
    email: CONFIG.links.email,
    foundingDate: CONFIG.foundingYear,
    sport: "Olympic weightlifting",
    address: {
      "@type": "PostalAddress",
      streetAddress: l.street,
      addressLocality: l.city,
      addressRegion: l.region,
      postalCode: l.postalCode,
      addressCountry: "CA"
    },
    openingHoursSpecification: CONFIG.schedule
      .filter(s => s.opens && s.closes)
      .map(s => ({ "@type": "OpeningHoursSpecification", dayOfWeek: s.day, opens: s.opens, closes: s.closes })),
    sameAs: [
      CONFIG.links.instagram,
      CONFIG.channelId && `https://www.youtube.com/channel/${CONFIG.channelId}`
    ].filter(Boolean)
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
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

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.dataset.open === "true") { close(); btn.focus(); }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 861px)").matches) close();
  });
}

/* ── Quote carousel ──────────────────────────────────── */
let currentQuote = 0;
let quoteTimer = null;
let quotePaused = false;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function renderQuote(index, animate) {
  const quotes = CONFIG.quotes;
  const textEl = $("#quote-text");
  const authorEl = $("#quote-author");
  const dotsEl = $("#quote-dots");
  if (!textEl || !authorEl) return;

  const show = () => {
    textEl.textContent = quotes[index].text;
    authorEl.textContent = quotes[index].author;
    textEl.style.opacity = "1";
    authorEl.style.opacity = "1";
  };

  if (animate && !reduceMotion.matches) {
    textEl.style.opacity = "0";
    authorEl.style.opacity = "0";
    setTimeout(show, 350);
  } else {
    show();
  }

  if (!dotsEl || quotes.length < 2) return;
  dotsEl.innerHTML = "";
  quotes.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "quote-dot" + (i === index ? " active" : "");
    dot.setAttribute("aria-label", `Quote ${i + 1} of ${quotes.length}`);
    if (i === index) dot.setAttribute("aria-current", "true");
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
  if (reduceMotion.matches || quotePaused) return;
  quoteTimer = setInterval(() => moveQuote(1), CONFIG.quoteIntervalMs);
}

function initQuotes() {
  const quotes = CONFIG.quotes;
  if (!quotes || quotes.length === 0) return;
  renderQuote(0, false);

  // A single quote needs no controls or rotation.
  if (quotes.length < 2) return;

  const controls = $(".quote-controls");
  if (controls) controls.hidden = false;

  const prev = $("#quote-prev");
  const next = $("#quote-next");
  if (prev) prev.addEventListener("click", () => moveQuote(-1));
  if (next) next.addEventListener("click", () => moveQuote(1));

  // Pause rotation while the visitor is reading or using the controls.
  const panel = $(".quote-panel");
  if (panel) {
    const pause  = () => { quotePaused = true;  clearInterval(quoteTimer); };
    const resume = () => { quotePaused = false; resetQuoteTimer(); };
    panel.addEventListener("mouseenter", pause);
    panel.addEventListener("mouseleave", resume);
    panel.addEventListener("focusin", pause);
    panel.addEventListener("focusout", resume);
  }

  resetQuoteTimer();
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
  initStructuredData();
  initMobileMenu();
  initQuotes();
});
