
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
   
    console.log("EmailJS cargado:", typeof emailjs !== 'undefined');
    
    
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para validar el formulario
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '') {
            showError('Por favor, introduce tu nombre completo');
            return false;
        }
        
        if (email === '' || !isValidEmail(email)) {
            showError('Por favor, introduce una dirección de correo electrónico válida');
            return false;
        }
        
        if (subject === '') {
            showError('Por favor, introduce el asunto de tu mensaje');
            return false;
        }
        
        if (message === '') {
            showError('Por favor, escribe tu mensaje');
            return false;
        }
        
        return true;
    }
    
   
    function showError(message) {
        console.error("Error:", message);
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
       
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
    
   
    function showSuccess() {
        console.log("Éxito: Mensaje enviado");
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    // Manejar el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Formulario enviado");
            
            // Validar el formulario
            if (!validateForm()) {
                console.log("Validación fallida");
                return;
            }
            
            // Mostrar animación de carga
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            submitButton.disabled = true;
            
            // Recopilar los datos del formulario para EmailJS
            const templateParams = {
                from_name: document.getElementById('name').value.trim(),
                from_email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            console.log("Parámetros de la plantilla:", templateParams);
            
            // Enviar email usando EmailJS (con verificación completa)
            console.log("Intentando enviar email con EmailJS...");
            console.log("Service ID:", 'service_7teu3zw');
            console.log("Template ID:", 'template_ivl8khr');
            
            try {
                emailjs.send('service_7teu3zw', 'template_ivl8khr', templateParams)
                    .then(function(response) {
                        console.log("EmailJS respuesta exitosa:", response);
                        // Éxito: mostrar mensaje y resetear formulario
                        showSuccess();
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error("EmailJS error:", error);
                        // Error: mostrar mensaje de error detallado
                        showError('Error al enviar el mensaje: ' + (error.text || JSON.stringify(error)));
                    })
                    .finally(function() {
                        // Restaurar el botón de envío
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                    });
            } catch (e) {
                console.error("Error al intentar usar EmailJS:", e);
                showError('Error crítico al enviar: ' + e.message);
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    } else {
        console.error("No se encontró el formulario de contacto");
    }
});
