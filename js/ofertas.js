document.addEventListener('DOMContentLoaded', () => {
    // Hover visual para cards de producto
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      card.addEventListener('mouseover', () => {
        card.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';
      });
      card.addEventListener('mouseout', () => {
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      });
    });
  
    // Mostrar alerta cuando se haga clic en un cupón
    const btnCupon = document.querySelector('.btn-cupon');
    if (btnCupon) {
      btnCupon.addEventListener('click', (e) => {
        e.preventDefault();
        alert('¡Cupón TECH30 aplicado con éxito!');
      });
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const filtros = document.querySelectorAll('.filter-option');
    const productos = document.querySelectorAll('.product-card');
  
    filtros.forEach(filtro => {
      filtro.addEventListener('change', () => {
        aplicarFiltros();
      });
    });
  
    function aplicarFiltros() {
      const marcasSeleccionadas = Array.from(document.querySelectorAll('.filter-option[data-type="marca"]:checked')).map(cb => cb.value.toLowerCase());
      const enviosSeleccionados = Array.from(document.querySelectorAll('.filter-option[data-type="envio"]:checked')).map(cb => cb.value.toLowerCase());
  
      productos.forEach(producto => {
        const marca = producto.getAttribute('data-marca').toLowerCase();
        const envio = producto.getAttribute('data-envio').toLowerCase();
  
        const cumpleMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(marca);
        const cumpleEnvio = enviosSeleccionados.length === 0 || enviosSeleccionados.includes(envio);
  
        if (cumpleMarca && cumpleEnvio) {
          producto.style.display = 'block';
        } else {
          producto.style.display = 'none';
        }
      });
    }
  });
  