
document.addEventListener('DOMContentLoaded', function() {
   
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarNav = document.getElementById('navbarNav');
            if (navbarNav.classList.contains('show')) {
                navbarNav.classList.remove('show');
            } else {
                navbarNav.classList.add('show');
            }
        });
    }
    
   
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
   
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
   
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
    
  
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    
    // Función para obtener un número aleatorio
    function getRandomNumber() {
        return Math.floor(Math.random() * hex.length);
    }
    
   
    function getRandomColor() {
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hex[getRandomNumber()];
        }
        return hexColor;
    }
    
    
    function isLightColor(color) {
        // Convertir color hexadecimal a RGB
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        
        // Calcular la luminosidad perceptiva
        // Fórmula: 0,299*R + 0,587*G + 0,114*B
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
       
        return brightness > 128;
    }
    
    
    const colorChangerContainer = document.createElement('div');
    colorChangerContainer.className = 'container mt-4 mb-4 text-center';
    colorChangerContainer.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2 class="mb-0">Cambiador de Color</h2>
        </div>
        <div class="card-body">
          <h3>Color de fondo: <span class="color-value">#ffffff</span></h3>
          <button class="btn btn-primary mt-2" id="colorBtn">Cambiar Color</button>
        </div>
      </div>
    `;
    
   
    const headerSection = document.querySelector('.header-section');
    if (headerSection) {
        headerSection.parentNode.insertBefore(colorChangerContainer, headerSection.nextSibling);
    }
    
    // Obtener el botón y el elemento que muestra el valor del color
    const colorBtn = document.getElementById('colorBtn');
    const colorValue = document.querySelector('.color-value');
    
   
    colorBtn.addEventListener('click', function() {
        // Generar un color aleatorio
        const newColor = getRandomColor();
        
       
        document.body.style.backgroundColor = newColor;
        colorValue.textContent = newColor;
        
     
        if (isLightColor(newColor)) {
            document.body.style.color = '#333333';
        } else {
            document.body.style.color = '#ffffff';
        }
        
        
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });
    
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
           
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
           
            console.log('Suscripción al newsletter:', email);
            
            // Mostrar un mensaje de confirmación
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            
            // Limpiar el formulario
            newsletterForm.reset();
        });
    }
    
   
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
