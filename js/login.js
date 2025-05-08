document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("login-message");
  
    if (email === "usuario@cgtech.com" && password === "123456") {
      message.style.color = "lightgreen";
      message.textContent = "Inicio de sesión exitoso.";
      setTimeout(() => {
        window.location.href = "../index.html"; // Redirige después de iniciar sesión
      }, 1500);
    } else {
      message.style.color = "red";
      message.textContent = "Correo o contraseña incorrectos.";
    }
  });
  