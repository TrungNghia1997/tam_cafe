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

// ==========================================
// 19. HIỆU ỨNG LÁ TẰM RƠI TỰ NHIÊN (MULBERRY LEAVES EFFECT)
// ==========================================
(function initMulberryLeaves() {
    const canvas = document.getElementById('mulberry-leaves-canvas');
    const toggleBtn = document.getElementById('leavesToggleBtn');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let leaves = [];
    let animationFrameId = null;
    let lastTime = performance.now();
    let isRunning = true;

    // Check user preference from localStorage or prefers-reduced-motion
    const savedState = localStorage.getItem('tam_leaves_active');
    const systemReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (savedState === 'false' || (savedState === null && systemReducedMotion)) {
        isRunning = false;
        if (toggleBtn) {
            toggleBtn.classList.add('leaves-paused');
            toggleBtn.setAttribute('aria-pressed', 'false');
        }
    }

    // Interactive mouse / touch breeze tracking
    const mouseBreeze = {
        x: -9999,
        y: -9999,
        vx: 0,
        vy: 0,
        lastX: -9999,
        lastY: -9999,
        lastMoveTime: 0,
        active: false
    };

    // Scroll breeze tracking
    let lastScrollY = window.scrollY;
    let scrollDraft = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        scrollDraft += delta * 0.05;
        // Clamp scroll draft
        scrollDraft = Math.max(-8, Math.min(8, scrollDraft));
        lastScrollY = currentScrollY;
    }, { passive: true });

    function handlePointerMove(clientX, clientY) {
        const now = performance.now();
        const dt = Math.max(now - mouseBreeze.lastMoveTime, 16);

        if (mouseBreeze.lastX !== -9999) {
            mouseBreeze.vx = ((clientX - mouseBreeze.lastX) / dt) * 16;
            mouseBreeze.vy = ((clientY - mouseBreeze.lastY) / dt) * 16;
        }

        mouseBreeze.x = clientX;
        mouseBreeze.y = clientY;
        mouseBreeze.lastX = clientX;
        mouseBreeze.lastY = clientY;
        mouseBreeze.lastMoveTime = now;
        mouseBreeze.active = true;
    }

    window.addEventListener('mousemove', (e) => {
        handlePointerMove(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouseBreeze.active = false;
        mouseBreeze.vx = 0;
        mouseBreeze.vy = 0;
    });

    // Resize handling with High-DPI support
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    // Leaf Palettes: Màu lá dâu tằm tươi non, xanh ngọc trà, điểm xuyết ánh sáng tự nhiên
    const LEAF_PALETTES = [
        {
            // Lá dâu tươi chuẩn (vừa hái)
            top1: '#3a7243', top2: '#579c61', top3: '#7bb779',
            back1: '#84b689', back2: '#a4d3a8',
            vein: 'rgba(26, 60, 31, 0.4)',
            stem: '#4a673c'
        },
        {
            // Búp lá tằm non (xanh mạ non mềm)
            top1: '#4a7d45', top2: '#68a156', top3: '#88c26f',
            back1: '#91c085', back2: '#b5dda2',
            vein: 'rgba(38, 70, 31, 0.38)',
            stem: '#536d39'
        },
        {
            // Lá trà ngọc bích (hài hòa với tone hồng metallic của website)
            top1: '#366d58', top2: '#4f9278', top3: '#72b69a',
            back1: '#82b9a4', back2: '#a7d9c6',
            vein: 'rgba(25, 60, 48, 0.4)',
            stem: '#3e6252'
        },
        {
            // Lá bánh tẻ đậm đà
            top1: '#2f6037', top2: '#46804f', top3: '#629e6c',
            back1: '#75a67c', back2: '#93c299',
            vein: 'rgba(20, 50, 25, 0.42)',
            stem: '#3f5934'
        }
    ];

    // Mulberry Leaf Class
    class MulberryLeaf {
        constructor(isInitial = false) {
            this.reset(isInitial);
        }

        reset(isInitial = false) {
            // Depth layer (z: 0.25 = xa/mờ nhẹ, 1.0 = gần/rõ nét)
            this.z = 0.25 + Math.random() * 0.75;

            // Kích thước tỉ lệ theo độ sâu trường ảnh (depth of field)
            this.baseSize = 16 + this.z * 18 + (Math.random() * 6 - 3); // 20px - 40px
            this.aspectRatio = 1.25 + (Math.random() * 0.25 - 0.1);
            this.width = this.baseSize;
            this.height = this.baseSize * this.aspectRatio;

            // Hình thái lá: 0 = Lá dâu tằm cổ điển (tim tròn), 1 = Búp tằm thon, 2 = Lá xẻ thùy nhẹ
            this.type = Math.floor(Math.random() * 3);
            this.palette = LEAF_PALETTES[Math.floor(Math.random() * LEAF_PALETTES.length)];

            // Tọa độ khởi tạo
            this.x = Math.random() * (width + 120) - 60;
            this.y = isInitial ? Math.random() * (height + 100) - 50 : -(Math.random() * 100 + 40);

            // Vận tốc rơi tự nhiên (khí động học: lá gần rơi nhanh hơn một chút, lá xa bồng bềnh hơn)
            this.baseSpeedY = (0.75 + this.z * 1.1) * (0.85 + Math.random() * 0.3);
            this.speedY = this.baseSpeedY;

            // Chuyển động lượn sóng ngang (Swaying / Pendulum flutter)
            this.swayAngle = Math.random() * Math.PI * 2;
            this.swaySpeed = 0.016 + (1.1 - this.z) * 0.014 + Math.random() * 0.008;
            this.swayAmplitude = (22 + this.z * 32) * (0.8 + Math.random() * 0.4);

            // Chuyển động xoay 3D (Pitch = nhào lộn lật mặt trước/sau, Roll = chao nghiêng 2 bên)
            this.pitch = Math.random() * Math.PI * 2;
            this.pitchSpeed = (0.012 + Math.random() * 0.02) * (Math.random() < 0.5 ? 1 : -1);

            this.roll = Math.random() * Math.PI * 2;
            this.rollSpeed = 0.015 + Math.random() * 0.02;

            // Góc nghiêng 2D theo chiều trôi gió
            this.rotationZ = (Math.random() - 0.5) * 0.5;
            this.targetRotationZ = 0;

            // Lực gió tương tác (chuột / cuộn)
            this.windPushX = 0;
            this.windPushY = 0;

            // Độ trong suốt tự nhiên, hài hòa với nền sáng
            this.opacity = 0.45 + this.z * 0.45;
        }

        update(dtRatio, time, globalWind) {
            // 1. Cập nhật nhịp đong đưa (Sway)
            this.swayAngle += this.swaySpeed * dtRatio;
            const swaySin = Math.sin(this.swayAngle);
            const swayCos = Math.cos(this.swayAngle);

            // Vận tốc ngang từ nhịp đong đưa
            const swayVelocityX = swayCos * this.swayAmplitude * 0.038;

            // Đệm không khí (Aerodynamic Cushioning):
            // Khi lá đong đưa ra điểm cực đại ở hai bên, diện tích cản gió tăng -> tốc độ rơi chậm lại!
            // Khi lá bổ nhào qua giữa, tốc độ rơi tăng nhẹ -> tạo nhịp điệu bồng bềnh sống động như thật.
            const liftFactor = 1 - 0.42 * Math.abs(swaySin);
            this.speedY = this.baseSpeedY * liftFactor;

            // 2. Cập nhật góc xoay 3D
            this.pitch += this.pitchSpeed * dtRatio;
            this.roll += this.rollSpeed * dtRatio;

            // Thân lá tự động nghiêng theo hướng lướt ngang
            this.targetRotationZ = (swayVelocityX + globalWind.x * 0.6) * 0.28;
            this.rotationZ += (this.targetRotationZ - this.rotationZ) * 0.06 * dtRatio;

            // 3. Tương tác với làn gió từ con trỏ chuột
            if (mouseBreeze.active) {
                const dx = this.x - mouseBreeze.x;
                const dy = this.y - mouseBreeze.y;
                const distSq = dx * dx + dy * dy;
                const influenceRadius = 150;

                if (distSq < influenceRadius * influenceRadius && distSq > 4) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / influenceRadius) * 2.5;

                    this.windPushX += (dx / dist) * force + mouseBreeze.vx * 0.09;
                    this.windPushY += (dy / dist) * force * 0.4 + mouseBreeze.vy * 0.09;

                    // Gió làm lá chao liệng mạnh hơn khi chạm nhẹ
                    this.pitchSpeed += (Math.random() - 0.5) * 0.03;
                }
            }

            // Tiêu tán lực đẩy tương tác mượt mà
            this.windPushX *= Math.pow(0.92, dtRatio);
            this.windPushY *= Math.pow(0.92, dtRatio);

            // 4. Cập nhật vị trí
            const totalSpeedX = (swayVelocityX + globalWind.x * this.z + this.windPushX) * dtRatio;
            const totalSpeedY = (this.speedY + globalWind.y + scrollDraft * 0.4 + this.windPushY) * dtRatio;

            this.x += totalSpeedX;
            this.y += totalSpeedY;

            // 5. Tái sinh lá khi trôi khỏi màn hình
            if (this.y > height + 60 || this.x < -120 || this.x > width + 120) {
                this.reset(false);
            }
        }

        draw(targetCtx) {
            targetCtx.save();
            targetCtx.translate(this.x, this.y);

            // Nghiêng theo phương di chuyển
            targetCtx.rotate(this.rotationZ);

            // Mô phỏng 3D perspective khi lật mặt:
            // cos(pitch) co giãn trục dọc, khi âm là đang lật mặt dưới của lá
            const cosPitch = Math.cos(this.pitch);
            const absPitch = Math.abs(cosPitch);

            // Tránh vẽ khi mép lá phẳng hoàn toàn vuông góc mắt nhìn (mỏng như sợi chỉ)
            if (absPitch < 0.035) {
                targetCtx.restore();
                return;
            }

            const isFacingUp = cosPitch > 0;
            const scaleX = 1 - 0.16 * Math.sin(this.roll);
            const scaleY = cosPitch;

            targetCtx.scale(scaleX, scaleY);
            targetCtx.globalAlpha = this.opacity;

            const w = this.width;
            const h = this.height;

            // Gradient màu sắc hữu cơ: mặt trên xanh ngọc mượt mà, mặt dưới xanh phấn mờ dịu
            const grad = targetCtx.createLinearGradient(0, h * 0.45, 0, -h * 0.5);
            if (isFacingUp) {
                grad.addColorStop(0, this.palette.top1);
                grad.addColorStop(0.55, this.palette.top2);
                grad.addColorStop(1, this.palette.top3);
            } else {
                grad.addColorStop(0, this.palette.back1);
                grad.addColorStop(1, this.palette.back2);
            }

            // --- 1. Vẽ cuống lá (Petiole) ---
            targetCtx.beginPath();
            targetCtx.moveTo(0, h * 0.42);
            targetCtx.quadraticCurveTo(w * 0.06, h * 0.53, 0, h * 0.6);
            targetCtx.strokeStyle = this.palette.stem;
            targetCtx.lineWidth = Math.max(1, w * 0.055);
            targetCtx.lineCap = 'round';
            targetCtx.stroke();

            // --- 2. Vẽ phiến lá dâu tằm (Mulberry Leaf Blade) ---
            targetCtx.beginPath();
            targetCtx.moveTo(0, -h * 0.5); // Đỉnh lá nhọn

            if (this.type === 0) {
                // Kiểu 1: Lá dâu tằm bánh tẻ cổ điển (hình tim tròn, chóp nhọn duyên dáng)
                // Cạnh trái:
                targetCtx.bezierCurveTo(-w * 0.32, -h * 0.42, -w * 0.58, -h * 0.16, -w * 0.55, h * 0.12);
                targetCtx.bezierCurveTo(-w * 0.52, h * 0.36, -w * 0.22, h * 0.47, 0, h * 0.42);
                // Cạnh phải:
                targetCtx.bezierCurveTo(w * 0.22, h * 0.47, w * 0.52, h * 0.36, w * 0.55, h * 0.12);
                targetCtx.bezierCurveTo(w * 0.58, -h * 0.16, w * 0.32, -h * 0.42, 0, -h * 0.5);
            } else if (this.type === 1) {
                // Kiểu 2: Búp tằm non thon thả (đường cong mềm mại, nhẹ bẫng)
                // Cạnh trái:
                targetCtx.bezierCurveTo(-w * 0.26, -h * 0.45, -w * 0.48, -h * 0.18, -w * 0.44, h * 0.15);
                targetCtx.bezierCurveTo(-w * 0.4, h * 0.38, -w * 0.16, h * 0.48, 0, h * 0.44);
                // Cạnh phải:
                targetCtx.bezierCurveTo(w * 0.16, h * 0.48, w * 0.4, h * 0.38, w * 0.44, h * 0.15);
                targetCtx.bezierCurveTo(w * 0.48, -h * 0.18, w * 0.26, -h * 0.45, 0, -h * 0.5);
            } else {
                // Kiểu 3: Lá dâu tằm xẻ thùy mềm đặc trưng của loài dâu tằm
                // Cạnh trái có khía lượn nhẹ:
                targetCtx.bezierCurveTo(-w * 0.3, -h * 0.42, -w * 0.46, -h * 0.2, -w * 0.42, -h * 0.04);
                targetCtx.bezierCurveTo(-w * 0.56, h * 0.12, -w * 0.5, h * 0.32, -w * 0.2, h * 0.44);
                targetCtx.lineTo(0, h * 0.42);
                // Cạnh phải:
                targetCtx.bezierCurveTo(w * 0.2, h * 0.44, w * 0.5, h * 0.32, w * 0.56, h * 0.12);
                targetCtx.bezierCurveTo(w * 0.42, -h * 0.04, w * 0.46, -h * 0.2, w * 0.3, -h * 0.42);
                targetCtx.lineTo(0, -h * 0.5);
            }

            targetCtx.closePath();
            targetCtx.fillStyle = grad;
            targetCtx.fill();

            // Viền sáng mềm tinh tế phản chiếu ánh sáng tự nhiên
            targetCtx.strokeStyle = isFacingUp ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.16)';
            targetCtx.lineWidth = 0.8;
            targetCtx.stroke();

            // --- 3. Hệ gân lá dâu tằm (Venation) ---
            if (this.baseSize > 17) {
                targetCtx.strokeStyle = isFacingUp ? this.palette.vein : 'rgba(40, 80, 48, 0.25)';
                targetCtx.lineWidth = Math.max(0.65, w * 0.035);

                // Gân chính (Midrib) nối từ cuống uốn lượn tới chóp
                targetCtx.beginPath();
                targetCtx.moveTo(0, h * 0.42);
                targetCtx.quadraticCurveTo(-w * 0.02, 0, 0, -h * 0.46);
                targetCtx.stroke();

                // Các nhánh gân phụ (Secondary veins) tỏa nghiêng đối xứng
                targetCtx.lineWidth = Math.max(0.45, w * 0.022);
                const veinLevels = [
                    { y: h * 0.28, reachX: w * 0.38, reachY: h * 0.16 },
                    { y: h * 0.12, reachX: w * 0.42, reachY: -h * 0.04 },
                    { y: -h * 0.06, reachX: w * 0.38, reachY: -h * 0.22 },
                    { y: -h * 0.22, reachX: w * 0.24, reachY: -h * 0.36 }
                ];

                targetCtx.beginPath();
                for (let i = 0; i < veinLevels.length; i++) {
                    const vl = veinLevels[i];
                    // Nhánh trái
                    targetCtx.moveTo(0, vl.y);
                    targetCtx.quadraticCurveTo(-vl.reachX * 0.4, vl.y - h * 0.04, -vl.reachX, vl.reachY);
                    // Nhánh phải
                    targetCtx.moveTo(0, vl.y);
                    targetCtx.quadraticCurveTo(vl.reachX * 0.4, vl.y - h * 0.04, vl.reachX, vl.reachY);
                }
                targetCtx.stroke();
            }

            targetCtx.restore();
        }
    }

    // Khởi tạo danh sách lá dựa theo độ phân giải màn hình
    function initLeaves() {
        resizeCanvas();
        leaves = [];
        // Màn hình di động dùng 16 lá, desktop dùng 28 lá để vừa thoáng đãng vừa thanh tao
        const count = width < 768 ? 16 : 28;
        for (let i = 0; i < count; i++) {
            leaves.push(new MulberryLeaf(true));
        }
    }

    // Animation Loop với Delta-Time mượt mà
    function animate(currentTime) {
        if (!isRunning) return;

        const deltaTime = Math.min(currentTime - lastTime, 50); // Giới hạn tối đa 50ms chống giật khi tab lag
        const dtRatio = deltaTime / 16.67;
        lastTime = currentTime;

        // Xóa khung hình trước
        ctx.clearRect(0, 0, width, height);

        // Tính toán làn gió môi trường dao động đa tần số (Natural Ambient Wind)
        const globalWind = {
            x: Math.sin(currentTime * 0.0007) * 0.75 + Math.cos(currentTime * 0.0019) * 0.35,
            y: 0.15 + Math.sin(currentTime * 0.0012) * 0.1
        };

        // Giảm dần cuộn gió
        scrollDraft *= Math.pow(0.94, dtRatio);

        // Giảm dần vận tốc gió chuột
        if (mouseBreeze.active) {
            mouseBreeze.vx *= Math.pow(0.9, dtRatio);
            mouseBreeze.vy *= Math.pow(0.9, dtRatio);
            if (Math.abs(mouseBreeze.vx) < 0.01 && Math.abs(mouseBreeze.vy) < 0.01) {
                mouseBreeze.active = false;
            }
        }

        // Cập nhật và vẽ từng chiếc lá
        for (let i = 0; i < leaves.length; i++) {
            const leaf = leaves[i];
            leaf.update(dtRatio, currentTime, globalWind);
            leaf.draw(ctx);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!isRunning) {
            isRunning = true;
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(animate);
            if (toggleBtn) {
                toggleBtn.classList.remove('leaves-paused');
                toggleBtn.setAttribute('aria-pressed', 'true');
            }
            localStorage.setItem('tam_leaves_active', 'true');
        }
    }

    function stopAnimation() {
        if (isRunning) {
            isRunning = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            ctx.clearRect(0, 0, width, height);
            if (toggleBtn) {
                toggleBtn.classList.add('leaves-paused');
                toggleBtn.setAttribute('aria-pressed', 'false');
            }
            localStorage.setItem('tam_leaves_active', 'false');
        }
    }

    // Toggle button handler
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isRunning) {
                stopAnimation();
            } else {
                startAnimation();
            }
        });
    }

    // Tự động tạm dừng khi chuyển tab để tiết kiệm 100% pin & tài nguyên CPU
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (isRunning && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        } else {
            if (isRunning && !animationFrameId) {
                lastTime = performance.now();
                animationFrameId = requestAnimationFrame(animate);
            }
        }
    });

    // Resize listener
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
        }, 150);
    });

    // Khởi chạy
    initLeaves();
    if (isRunning) {
        animationFrameId = requestAnimationFrame(animate);
    }
})();