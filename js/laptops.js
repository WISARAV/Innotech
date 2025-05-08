document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const locationIcon = document.getElementById('location-icon');
    const shoppingIcon = document.getElementById('shopping-icon');
    const accountIcon  = document.getElementById('account-icon');
  
    const locationModal = document.getElementById('location-modal');
    const paymentModal  = document.getElementById('payment-modal');
    const categoryModal = document.getElementById('modal');
    const modalImages   = document.getElementById('modal-images');
  
    // Cierre de modales
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
  
    // 1. Geolocalización con Leaflet
    locationIcon.addEventListener('click', () => {
      locationModal.style.display = 'block';
      if (!navigator.geolocation) {
        document.getElementById('map-container').innerHTML = '<p>Geolocalización no soportada.</p>';
        return;
      }
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        const map = L.map('leaflet-map').setView([latitude, longitude], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([latitude, longitude]).addTo(map)
          .bindPopup('Estás aquí').openPopup();
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
  
    // 4. Modal de Categorías
    const categorias = document.querySelectorAll('.category-item');
    const imagesMap = {
      '🖥 Laptops Gaming': ['/Img/laptop1.jpg', '/Img/laptop2.jpg'],
      '🧰 Accesorios':        ['/Img/accesorio1.jpg', '/Img/accesorio2.jpg'],
      '📱 Tablets':           ['/Img/tablet1.jpg', '/Img/tablet2.jpg'],
      '🔋 Power Banks':       ['/Img/power1.jpg', '/Img/power2.jpg'],
      '🎧 Auriculares':       ['/Img/auricular1.jpg', '/Img/auricular2.jpg']
    };
  
    categorias.forEach(cat => {
      cat.addEventListener('click', () => {
        const imgs = imagesMap[cat.textContent.trim()] || [];
        modalImages.innerHTML = imgs.map(src => `<img src="${src}" alt="">`).join('');
        categoryModal.style.display = 'block';
      });
    });
  });
  