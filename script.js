// DILL MAKMUR Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Smooth scrolling for navigation links
    setupSmoothScroll();

    // Form submission handler
    setupFormHandler();

    // Add scroll event listener for navbar
    setupNavbarScroll();

    // Mobile menu close on link click
    setupMobileMenu();
});

/**
 * Setup smooth scrolling for all anchor links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Setup form submission handler
 */
function setupFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[placeholder="Nama Anda"]').value;
            const email = this.querySelector('input[placeholder="Email Anda"]').value;
            const phone = this.querySelector('input[placeholder="No. Telepon/WhatsApp"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !phone || !message) {
                showAlert('Mohon isi semua field yang diperlukan!', 'danger');
                return;
            }
            
            // Validate email
            if (!isValidEmail(email)) {
                showAlert('Mohon masukkan email yang valid!', 'danger');
                return;
            }
            
            // Show success message
            showAlert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
    // Remove existing alert
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Setup navbar scroll effect
 */
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
}

/**
 * Setup mobile menu close on link click
 */
function setupMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarCollapse) return;
    
    document.querySelectorAll('.navbar-collapse a').forEach(link => {
        link.addEventListener('click', function() {
            // Close the mobile menu
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

/**
 * Contact via WhatsApp
 */
function contactViaWhatsApp() {
    const phone = '6287870032231';
    const message = 'Halo DILL MAKMUR, saya ingin bertanya tentang layanan Anda.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

window.contactViaWhatsApp = contactViaWhatsApp;