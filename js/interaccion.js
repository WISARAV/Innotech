document.addEventListener('DOMContentLoaded', () => {
  // Iconos
  const locationIcon = document.getElementById('location-icon');
  const shoppingIcon = document.getElementById('shopping-icon');
  const accountIcon  = document.getElementById('account-icon');

  // Modales
  const locationModal = document.getElementById('location-modal');
  const paymentModal  = document.getElementById('payment-modal');

  // Cierre dinámico de modales
  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.close).style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // 1. Ubicación (Mapa con Leaflet + OpenStreetMap)
  locationIcon.addEventListener('click', () => {
    locationModal.style.display = 'block';

    if (!navigator.geolocation) {
      document.getElementById('map-container').innerHTML = "<p>Geolocalización no soportada.</p>";
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      // Limpia el contenedor antes de crear el mapa
      document.getElementById('map-container').innerHTML = "<div id='leaflet-map' style='height: 100%;'></div>";

      const map = L.map('leaflet-map').setView([latitude, longitude], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map)
        .bindPopup("Estás aquí")
        .openPopup();

    }, err => {
      document.getElementById('map-container').innerHTML = `<p>Error: ${err.message}</p>`;
    });
  });

  // 2. Modal de Pago
  shoppingIcon.addEventListener('click', () => {
    paymentModal.style.display = 'block';
  });

  document.getElementById('btn-yape').addEventListener('click', () => {
    document.getElementById('yape-qr').style.display = 'block';
  });

  document.getElementById('card-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Pago con tarjeta procesado.');
    paymentModal.style.display = 'none';
  });

  // 3. Redirección al Login
  accountIcon.addEventListener('click', () => {
    window.location.href = '/Paginas/iniciarsesion.html';
  });
});
