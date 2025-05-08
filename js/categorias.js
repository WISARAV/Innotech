document.addEventListener('DOMContentLoaded', function () {
    const categorias = document.querySelectorAll('.category-item');
    const modal = document.getElementById('modal');
    const modalImages = document.getElementById('modal-images');
    const closeModal = document.querySelector('.close');
  
    const imagenesPorCategoria = {
      "🖥 Laptops Gaming": ["/Img/acer1.png", "/Img/asus2.png"],
      "🧰 Accesorios":     ["/Img/audifonosgaming.png", "/Img/teclado.png"],
      "📱 Tablets":       ["/Img/hp1.png", "/Img/hp2.png"],
      "🔋 Power Banks":   ["/Img/setupoferta1.png", "/Img/ultabook1.png"],
      "🎧 Auriculares":    ["/Img/lenovo1.png", "/Img/lenovo2.png"]
    };
    
    // Crear un contenedor general si aún no lo tienes
    const galeria = document.createElement('div');
    galeria.style.display       = 'flex';
    galeria.style.flexWrap      = 'wrap';
    galeria.style.justifyContent= 'center';
    galeria.style.gap           = '20px';
    galeria.style.padding       = '20px';
    
    for (const categoria in imagenesPorCategoria) {
      imagenesPorCategoria[categoria].forEach(src => {
        const img = document.createElement("img");
        img.src = src;
    
        // Ajustes de tamaño más contenidos
        img.style.maxWidth = "150px";   // antes 200px
        img.style.height   = "auto";
    
        // Centramos cada bloque de imagen automáticamente
        img.style.display = "block";
        img.style.margin  = "10px auto"; 
    
        galeria.appendChild(img);
      });
    }
    
    document.body.appendChild(galeria);
    
    
    categorias.forEach(categoria => {
      categoria.addEventListener('click', () => {
        const nombre = categoria.textContent.trim();
        const imagenes = imagenesPorCategoria[nombre] || [];
  
        modalImages.innerHTML = imagenes.map(src => `<img src="${src}" alt="${nombre}">`).join('');
        modal.style.display = 'block';
      });
    });
  
    closeModal.onclick = () => {
      modal.style.display = 'none';
    };
  
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  });
  