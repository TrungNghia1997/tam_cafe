// ==========================================
// TẰM LANDING PAGE - JAVASCRIPT
// ==========================================

// ===== 1. Smooth Scroll Behavior =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 2. Manifesto Character Animation on Scroll =====
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const manifestoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chars = entry.target.querySelectorAll('.manifesto-char');
            chars.forEach((char, index) => {
                setTimeout(() => {
                    char.style.animation = `manifestoChar 0.5s ease-out forwards`;
                }, index * 30);
            });
            manifestoObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const manifestoTitle = document.querySelector('.manifesto-title');
if (manifestoTitle) {
    manifestoObserver.observe(manifestoTitle);
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes manifestoChar {
        0% {
            opacity: 0;
            transform: translateY(10px) rotateX(90deg);
            color: var(--charcoal);
        }
        50% {
            color: var(--metallic-pink);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            color: var(--charcoal);
        }
    }
`;
document.head.appendChild(style);

// ===== 3. Menu Cards Intersection Observer =====
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animationPlayState = 'running';
            }, index * 100);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.menu-card').forEach(card => {
    card.style.animationPlayState = 'paused';
    menuObserver.observe(card);
});

// ===== 4. Drink Cards Hover Animation =====
const drinkCards = document.querySelectorAll('.drink-card');
drinkCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== 5. CTA Button Enhanced Interaction =====
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(196, 133, 158, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Scroll to the special menu section
        const target = document.querySelector('#menu');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== 6. Navbar Background Change on Scroll =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(196, 133, 158, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.7)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== 7. Parallax Effect for Hero Section =====
const heroGlow = document.querySelector('.hero-glow');

window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.5;
        if (heroGlow) {
            heroGlow.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
        }
    }
});

window.addEventListener('mousemove', (e) => {
    if (heroGlow && window.scrollY < window.innerHeight) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;

        heroGlow.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
});

// ===== 8. Social Bubbles Interactive Animation =====
const socialBubbles = document.querySelectorAll('.social-bubble');
socialBubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 35px rgba(196, 133, 158, 0.4)';
    });

    bubble.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 0 rgba(196, 133, 158, 0)';
    });
});

// ===== 9. Enhanced Scroll Animation for Section Elements =====
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.menu-card, .drink-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    scrollObserver.observe(element);
});

// ===== 10. Product Icon Float Animation with Varied Timing =====
const productIcons = document.querySelectorAll('.product-icon');
productIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
});

// ===== 11. Drink Icon Staggered Float Animation =====
const drinkIcons = document.querySelectorAll('.drink-icon');
drinkIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.4}s`;
});

// ===== 12. Interactive Menu Card Tilt Effect =====
const menuCards = document.querySelectorAll('.menu-card');
menuCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angleX = (e.clientY - centerY) / 10;
        const angleY = (centerX - e.clientX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ===== 13. CTA Button Glow Follow Mouse =====
if (ctaButton) {
    ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const buttonGlow = ctaButton.querySelector('.button-glow');
        if (buttonGlow) {
            buttonGlow.style.left = `${x}px`;
            buttonGlow.style.top = `${y}px`;
        }
    });
}

// ===== 14. Glass Liquid Animation Enhancement =====
const glassLiquid = document.querySelector('.glass-liquid');
if (glassLiquid) {
    // Responsive animation intensity based on scroll
    window.addEventListener('scroll', () => {
        const intensity = Math.min(window.scrollY / 500, 1);
        glassLiquid.style.animationDuration = `${3 - intensity}s`;
    });
}

// ===== 15. Footer Shimmer Line Animation =====
const footerShimmer = document.createElement('style');
footerShimmer.textContent = `
    @keyframes shimmerIntense {
        0% {
            left: -100%;
            box-shadow: 0 0 20px rgba(196, 133, 158, 0);
        }
        50% {
            box-shadow: 0 0 20px rgba(196, 133, 158, 0.5);
        }
        100% {
            left: 100%;
            box-shadow: 0 0 20px rgba(196, 133, 158, 0);
        }
    }
`;
document.head.appendChild(footerShimmer);

// ===== 16. Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
});

// Initial body opacity for fade-in effect
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';

// ===== 17. Accessibility: Reduced Motion Support =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.body.style.scrollBehavior = 'auto';

    // Remove animations
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });

    // Remove transitions
    document.querySelectorAll('[style*="transition"]').forEach(el => {
        el.style.transition = 'none';
    });
}

// ===== 18. Console Welcome Message =====
console.log(
    '%c🌸 Welcome to TẰM 🌸',
    'font-size: 24px; font-weight: bold; color: #C4859E; text-shadow: 0 2px 4px rgba(0,0,0,0.1);'
);
console.log(
    '%cHương vị thuần khiết từ tương lai\n%cTrà Ngon Đậm Vị',
    'font-size: 14px; color: #3D3D3D; font-style: italic;',
    'font-size: 12px; color: #C4859E;'
);