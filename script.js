// ========== Page Loader ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 400);
    }
});

// ========== Hamburger Menu ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// WhatsApp Masking
const whatsappInput = document.getElementById('whatsapp');

if (whatsappInput) {
    whatsappInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
        if (!x[2]) {
            e.target.value = x[1];
        } else {
            e.target.value = !x[3] ? `(${x[1]}) ${x[2]}` : `(${x[1]}) ${x[2]} ${x[3]}${x[4] ? '-' + x[4] : ''}`;
        }
    });
}

// Form Submission Handling
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(leadForm);
        const data = Object.fromEntries(formData.entries());

        // Visual Feedback
        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Simulate API Call
        setTimeout(() => {
            // Success State
            submitBtn.style.backgroundColor = '#25D366'; // WhatsApp Green
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sucesso! Redirecionando...';

            // Format message for WhatsApp
            const message = `Olá Dr. Fellipe, gostaria de falar sobre o meu caso:%0A%0A*Nome:* ${data.nome}%0A*WhatsApp:* ${data.whatsapp}%0A*Tempo de Contribuição:* ${data.tempo}%0A*Benefício:* ${data.beneficio}%0A*Caso:* ${data.caso}`;

            // Redirect to WhatsApp Link
            const whatsappLink = `https://wa.me/5531992552080?text=${message}`;

            setTimeout(() => {
                window.location.href = whatsappLink;

                // Reset form after redirect (if user comes back)
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.innerText = originalText;
                    leadForm.reset();
                }, 1000);
            }, 1000);

        }, 1500);
    });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Service Cards Toggle Description
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        // Toggle only this card
        card.classList.toggle('active');

        // Optional: Close other cards if one is opened
        /*
        document.querySelectorAll('.service-card').forEach(otherCard => {
            if (otherCard !== card) otherCard.classList.remove('active');
        });
        */
    });
});
// Scroll Reveal Animation with IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));
