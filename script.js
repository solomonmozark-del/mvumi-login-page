const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const revealTargets = document.querySelectorAll("[data-reveal]");
const counters = document.querySelectorAll("[data-count]");
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("form-message");
const togglePasswordButton = document.getElementById("toggle-password");
const year = document.getElementById("year");
const rolePills = document.querySelectorAll(".role-pill");
const passwordStrength = document.querySelector(".password-strength");
let selectedRole = "superuser";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const formatCounter = (value, prefix = "") => {
  if (prefix === "$") return `${prefix}${Math.round(value).toLocaleString()}`;
  return `${Math.round(value).toLocaleString()}`;
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      const finalValue = Number(target.dataset.count || 0);
      const prefix = target.dataset.prefix || "";
      const duration = 1400;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        target.textContent = formatCounter(finalValue * eased, prefix);
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(target);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

if (togglePasswordButton && passwordInput) {
  togglePasswordButton.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePasswordButton.textContent = isPassword ? "Hide" : "Show";
    togglePasswordButton.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
  });
}

rolePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    selectedRole = pill.dataset.role || "superuser";
    rolePills.forEach((item) => item.classList.toggle("active", item === pill));
  });
});

const getPasswordLevel = (value) => {
  let score = 0;
  if (value.length >= 6) score += 1;
  if (value.length >= 10) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/\d/.test(value) || /[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(score, 4);
};

if (passwordInput && passwordStrength) {
  passwordInput.addEventListener("input", () => {
    const level = getPasswordLevel(passwordInput.value);
    passwordStrength.className = `password-strength level-${level}`;
  });
}

if (form && emailInput && passwordInput && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    message.className = "message";
    form.classList.remove("is-authenticating");

    if (!email || !password) {
      message.textContent = "Enter your admin email and password to request access.";
      message.classList.add("error");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      message.textContent = "Use a valid admin email address.";
      message.classList.add("error");
      return;
    }

    if (password.length < 6) {
      message.textContent = "Password must be at least 6 characters.";
      message.classList.add("error");
      return;
    }

    form.classList.add("is-authenticating");
    message.textContent = `Checking ${selectedRole} clearance…`;

    window.setTimeout(() => {
      form.classList.remove("is-authenticating");
      message.className = "message success";
      message.textContent = `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} gateway ready. Connect this shell to Clerk/Vercel for live authentication.`;
    }, 900);
  });
}

const heroVisual = document.querySelector(".hero-visual");
const phoneFrame = document.querySelector(".phone-frame");

if (heroVisual && phoneFrame && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    phoneFrame.style.transform = `rotateY(${x * -12 - 5}deg) rotateX(${y * 10 + 4}deg) translateY(-8px)`;
  });

  heroVisual.addEventListener("pointerleave", () => {
    phoneFrame.style.transform = "";
  });
}