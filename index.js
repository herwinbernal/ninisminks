// =========================
// GLOBAL VARIABLES
// =========================
let currentLang = localStorage.getItem("lang") || "en";

const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");
const langToggle = document.getElementById("langToggle");


// =========================
// INIT (runs once)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();
  updateLanguageUI();
  initMenu();
  initScrollEffect();
  initRevealObserver();

  if (langToggle) {
    langToggle.addEventListener("click", toggleLanguage);
  }
});


// =========================
// LANGUAGE SYSTEM
// =========================
function toggleLanguage() {
  currentLang = currentLang === "en" ? "es" : "en";
  localStorage.setItem("lang", currentLang);

  applyLanguage();
  updateLanguageUI();
}

function applyLanguage() {
  document.querySelectorAll("[data-en]").forEach(el => {
    const translation = el.getAttribute(`data-${currentLang}`);
    if (translation) {
      el.innerHTML = translation; // supports HTML inside elements
    }
  });
}

function updateLanguageUI() {
  const en = document.getElementById("en");
  const es = document.getElementById("es");

  if (!en || !es) return;

  en.style.opacity = currentLang === "en" ? "1" : "0.5";
  es.style.opacity = currentLang === "es" ? "1" : "0.5";
}


// =========================
// MENU TOGGLE (MOBILE)
// =========================
function initMenu() {
  if (!menuToggle) return;

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");

    // ✅ ADD THIS
    header.classList.toggle("menu-open");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      header.classList.remove("menu-open"); // ✅ ADD THIS
    });
  });
}


// =========================
// HEADER SCROLL EFFECT
// =========================
function initScrollEffect() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}


// =========================
// SCROLL REVEAL (INTERSECTION OBSERVER)
// =========================
function initRevealObserver() {
  const sections = document.querySelectorAll(".reveal-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}


// =========================
// EVENT LISTENERS
// =========================
if (langToggle) {
  langToggle.addEventListener("click", toggleLanguage);
}