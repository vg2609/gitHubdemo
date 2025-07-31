// Registration Page Logic
if (window.location.pathname.includes("index.html")) {
  document.querySelector("form").addEventListener("submit", register);

  function register(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("error");

    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(user => user.email === email)) {
      error.textContent = "Email already exists.";
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  }
}

// Login Page Logic
if (window.location.pathname.includes("login.html")) {
  document.querySelector("form").addEventListener("submit", login);

  function login(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      error.textContent = "Invalid username or password.";
    }
  }
}

// Dashboard Page Logic
if (window.location.pathname.includes("dashboard.html")) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("welcome").textContent = `Welcome, ${user.username}!`;
  }

  window.logout = function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  };
}
