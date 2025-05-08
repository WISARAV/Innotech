//BUSCAR PRODUCTOS
const botonBuscar = document.getElementById('BTN-SEARCH');
botonBuscar.addEventListener('click', buscarProducto);
document.getElementById('input-search')
        .addEventListener('keydown', e => (e.key === 'Enter') && buscarProducto());

function buscarProducto() {
    const consulta = document.querySelector('#input-search').value.trim().toLowerCase();
    // 2. Lista de productos
    const productos = document.querySelectorAll('.product-item');
    // 3. Secciones que quieres ocultar mientras se escribe (banners, etc.)
    const seccionesExtra = document.querySelectorAll('.promo-banner, .banner, .categories');
  
  
     // Mostrar u ocultar secciones extra
      
    seccionesExtra.forEach(seccion => {
      // Si el usuario está escribiendo algo, las ocultamos; si el input está vacío, las mostramos.
      seccion.classList.toggle('oculto', !!consulta);
    });
  
    let hayCoincidencias = false;
        
    //Filtrar productos
       
    productos.forEach(producto => {
      const titulo = producto.querySelector('.product-title').textContent.toLowerCase();
      const coincide =titulo.includes(consulta) || !consulta;
      producto.classList.toggle('oculto', !coincide);
      if (coincide) hayCoincidencias = true;
    });
  
        //Mensaje “No se encontraron resultados”
       
    const contenedorProductos = document.querySelector('.products');
    const mensajePrevio = document.getElementById('mensajeNoResultados');
  
    // Eliminamos cualquier mensaje existente
    if (mensajePrevio) mensajePrevio.remove();
  
    // Creamos un nuevo mensaje solo si no hubo coincidencias y el campo no está vacío
    if (!hayCoincidencias && consulta) {
      const aviso = document.createElement('p');
      aviso.id = 'mensajeNoResultados';
      aviso.textContent = 'No se encontraron resultados';
      aviso.style.cssText = 'text-align:center;margin-top:1rem;font-size:30px;height: 600px;align-content: center;';
      contenedorProductos.appendChild(aviso);
    }
  }
  
//CARRUSEL MOVIMIENTO INFINITO
const track = document.querySelector('.carousel-track');
const carousel = document.querySelector('.promo-carousel');
const slides = document.querySelectorAll('.carousel-track img');

let posicion = 0;
let intervaloAnimacion;
const espera = 4000; // tiempo que se detiene el carousel

// Función para mover el carrusel
function moverCarrusel() {
  const anchoImagenes = slides[0].offsetWidth; // Ancho de cada imagen (en píxeles)
  posicion * anchoImagenes; // Desplazamiento en porcentaje (100% por slide)
  
  track.style.animation = 'scroll-carousel 18s linear infinite';
}

// Inicia la animación automática
function reiniciarMovimiento() {
  intervaloAnimacion = setInterval(moverCarrusel, espera);
}

// Pausa la animación cuando el mouse está sobre el carrusel
carousel.addEventListener('mouseover', () => {
  track.style.animationPlayState = 'paused'; // Detiene el intervalo  
});

// Reanuda la animación cuando el mouse sale del carrusel
carousel.addEventListener('mouseout', () => {
    track.style.animationPlayState = 'running'; // Vuelve a iniciar el intervalo
});

// Inicia el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', () => {
});
reiniciarMovimiento();
  
// funcionalidad del carrito

document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartCount = document.getElementById('cartCount');
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Abrir/cerrar carrito
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    // Añadir al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const price = parseFloat(this.getAttribute('data-price'));
            const title = this.parentElement.querySelector('.product-title').textContent;
            const image = this.parentElement.parentElement.querySelector('.product-image').src;
            
            // Buscar si el producto ya está en el carrito
            const prodExistente = cart.find(item => item.id === id);
            
            if (prodExistente) {
                prodExistente.cantidad += 1;
            } else {
                cart.push({
                    id,
                    title,
                    price,
                    image,
                    cantidad: 1
                });
            }
            
            actualizarCarrito();
            
            // Animación
            cartCount.classList.add('added-animation');
            setTimeout(() => {
                cartCount.classList.remove('added-animation');
            }, 500);
        });
    });
    
    // Proceder al pago
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            mostrarConfirmacionPago();
        }
    });
    
    // Actualizar carrito
    function actualizarCarrito() {
        // Actualizar contador
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.textContent = totalItems;
        
        // Actualizar lista de productos
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío</p>';
            checkoutBtn.style.display = 'none';
        } else {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <span class="cart-item-price">$${(item.price * item.cantidad).toFixed(2)}</span>
                        <div>
                            <span>Cantidad: ${item.cantidad}</span>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItemElement);
            });
            checkoutBtn.style.display = 'block';
        }
        
        // Actualizar total
        const total = cart.reduce((sum, item) => sum + (item.price * item.cantidad), 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        
        // Animación del contador
        cartCount.classList.add('added');
        setTimeout(() => {
            cartCount.classList.remove('added');
        }, 200);
    }
    
    // Función para mostrar confirmación de pago
    function mostrarConfirmacionPago() {
        // Crear el modal de confirmación
        const confirmationModal = document.createElement('div');
        confirmationModal.className = 'confirmation-modal';
        confirmationModal.innerHTML = `
            <div class="confirmation-content">
                <h3>Pago realizado</h3>
                <p>¡Gracias por tu compra!</p>
                <button class="close-confirmation">Aceptar</button>
            </div>
        `;
        
        document.body.appendChild(confirmationModal);
        
        // Cerrar el modal de confirmación
        const closeButton = confirmationModal.querySelector('.close-confirmation');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(confirmationModal);
            // Vaciar el carrito después del pago
            cart.length = 0;
            actualizarCarrito();
            cartModal.style.display = 'none';
        });
    }
  });