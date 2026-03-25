const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("form-message");
const togglePasswordButton = document.getElementById("toggle-password");

togglePasswordButton.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePasswordButton.textContent = isPassword ? "Hide" : "Show";
  togglePasswordButton.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  message.className = "message";

  if (!email || !password) {
    message.textContent = "Please enter both email and password.";
    message.classList.add("error");
    return;
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    message.textContent = "Please enter a valid email address.";
    message.classList.add("error");
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters long.";
    message.classList.add("error");
    return;
  }

  // Replace this with your backend API call.
  message.textContent = "Login request accepted. Connect this form to your server API.";
  message.classList.add("success");
});
