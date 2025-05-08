document.addEventListener("DOMContentLoaded", function () {
  // --- Manejo del formulario de contacto ---
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Simulación de envío
    alert("¡Gracias por contactarnos, " + name + "! Nos comunicaremos pronto.");
    form.reset();
  });

  // --- Mostrar/Ocultar carrito ---
  const carritoBtn = document.getElementById("img-carrito");
  const carritoDiv = document.getElementById("carrito");

  carritoBtn.addEventListener("click", function () {
    carritoDiv.classList.toggle("oculto");
  });

  // --- Abrir modal de ubicación ---
  const openLocationBtn = document.getElementById("open-location");
  const locationModal = document.getElementById("location-modal");

  if (openLocationBtn && locationModal) {
    openLocationBtn.addEventListener("click", function () {
      locationModal.style.display = "block";
    });
  }

  // --- Abrir modal de cuenta ---
  const openAccountBtn = document.getElementById("open-account");
  const accountModal = document.getElementById("account-modal");

  if (openAccountBtn && accountModal) {
    openAccountBtn.addEventListener("click", function () {
      accountModal.style.display = "block";
    });
  }

  // --- Abrir modal de pago con Yape ---
  const openShoppingBtn = document.getElementById("open-shopping");
  const shoppingModal = document.getElementById("shopping-modal");

  if (openShoppingBtn && shoppingModal) {
    openShoppingBtn.addEventListener("click", function () {
      shoppingModal.style.display = "block";
    });
  }

  // --- Cerrar todos los modales ---
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.closest(".modal").style.display = "none";
    });
  });

  // --- Cerrar modal de Yape desde su botón ---
  const closeYapeBtn = document.getElementById("close-shopping-modal");
  if (closeYapeBtn && shoppingModal) {
    closeYapeBtn.addEventListener("click", function () {
      shoppingModal.style.display = "none";
    });
  }
});
