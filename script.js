// ==========================================================================
// TẰM - THÊU HƯƠNG DỆT VỊ
// Kịch Bản Tương Tác Giao Diện Mộc Mạc & Hiệu Ứng Lá Dâu Tằm, Tơ Vàng Rơi
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. Điều Hướng Cuộn Mượt (Smooth Scroll với Offset Navbar) =====
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbarWrapper ? navbarWrapper.offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 2. Thanh Điều Hướng Đổi Bóng Khi Cuộn =====
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbarWrapper?.classList.add('navbar-scrolled');
        } else {
            navbarWrapper?.classList.remove('navbar-scrolled');
        }

        // Cập nhật mục Menu đang xem (Active Nav Link)
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPosition >= top && scrollPosition < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                correspondingLink?.classList.add('active');
            }
        });
    }, { passive: true });

    // ===== 3. Bộ Lọc Thực Đơn (Menu Tabs Filtering) =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.drink-item-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            const filterValue = this.getAttribute('data-filter');

            menuCards.forEach((card, index) => {
                const cardCat = card.getAttribute('data-category');
                const isMatch = filterValue === 'all' || cardCat === filterValue;

                if (isMatch) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 40);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== 4. Nút "Thưởng Vị" Tự Động Điền Vào Form Đặt Chỗ =====
    const orderButtons = document.querySelectorAll('.btn-order-item');
    const custNoteTextarea = document.getElementById('custNote');
    const contactSection = document.getElementById('contact');

    orderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            if (custNoteTextarea) {
                const currentVal = custNoteTextarea.value.trim();
                custNoteTextarea.value = currentVal ? `${currentVal}\n• Muốn chuẩn bị trước: ${itemName}` : `Muốn chuẩn bị trước: ${itemName}`;
            }

            if (contactSection) {
                const navHeight = navbarWrapper ? navbarWrapper.offsetHeight : 70;
                const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                custNoteTextarea?.focus();
            }
        });
    });

    // ===== 5. Xử Lý Form Đặt Bàn / Nhắn Gửi =====
    const reservationForm = document.getElementById('reservationForm');
    const formSuccessMsg = document.getElementById('formSuccessMsg');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.btn-submit-craft');
            const originalContent = submitBtn ? submitBtn.innerHTML : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Đang gửi đến Tằm...</span>';
            }

            setTimeout(() => {
                if (formSuccessMsg) {
                    formSuccessMsg.style.display = 'block';
                    formSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                reservationForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                }
            }, 600);
        });
    }

    // ===== 6. Lời Chào Mộc Mạc Trong Console =====
    console.log(
        '%c🍃 TẰM - THÊU HƯƠNG DỆT VỊ 🍃',
        'font-size: 22px; font-weight: bold; color: #7B5F4A; font-family: serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);'
    );
    console.log(
        '%cChắt chiu từng giọt mộc, dệt trọn vị đất trời.\nChào mừng bạn đến với Quán Trà & Cà Phê Mộc Tằm.',
        'font-size: 13px; color: #432C1E; font-style: italic;'
    );
});


// ==========================================================================
// 7. HIỆU ỨNG LÁ DÂU TẰM & SỢI TƠ VÀNG (MULBERRY LEAVES & GOLDEN SILK)
// ==========================================================================
(function initMulberrySilkCanvas() {
    const canvas = document.getElementById('mulberry-leaves-canvas');
    const toggleBtn = document.getElementById('leavesToggleBtn');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let leaves = [];
    let silkWisps = [];
    let animationFrameId = null;
    let lastTime = performance.now();
    let isRunning = true;

    // Kiểm tra cài đặt lưu trữ hoặc thiết bị thích giảm chuyển động
    const savedState = localStorage.getItem('tam_leaves_active');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (savedState === 'false' || (savedState === null && prefersReducedMotion)) {
        isRunning = false;
        if (toggleBtn) {
            toggleBtn.classList.add('leaves-paused');
            toggleBtn.setAttribute('aria-pressed', 'false');
        }
    }

    // Bảng màu lá dâu tằm mộc mạc dân dã
    const LEAF_PALETTES = [
        {
            // Lá dâu mùa hạ đậm màu
            top1: '#2E4C26', top2: '#416B36', top3: '#5C8A50',
            back1: '#749867', back2: '#91B584',
            vein: 'rgba(25, 45, 20, 0.45)',
            stem: '#3F5934'
        },
        {
            // Búp dâu tằm non mơn mởn
            top1: '#3D5E30', top2: '#578246', top3: '#78A865',
            back1: '#8EBA7C', back2: '#A8D296',
            vein: 'rgba(30, 50, 25, 0.38)',
            stem: '#4A693D'
        },
        {
            // Lá ngả hổ phách mùa nắng vàng
            top1: '#4A5B2E', top2: '#6D7C3F', top3: '#939E58',
            back1: '#9EA86E', back2: '#B8C28D',
            vein: 'rgba(50, 50, 20, 0.35)',
            stem: '#5C6338'
        }
    ];

    // Tương tác gió từ chuột và cuộn trang
    const mouseBreeze = {
        x: -9999, y: -9999,
        vx: 0, vy: 0,
        lastX: -9999, lastY: -9999,
        lastTime: 0, active: false
    };

    let lastScrollY = window.scrollY;
    let scrollDraft = 0;

    window.addEventListener('scroll', () => {
        const curY = window.scrollY;
        const delta = curY - lastScrollY;
        scrollDraft += delta * 0.04;
        scrollDraft = Math.max(-6, Math.min(6, scrollDraft));
        lastScrollY = curY;
    }, { passive: true });

    function handlePointer(clientX, clientY) {
        const now = performance.now();
        const dt = Math.max(now - mouseBreeze.lastTime, 16);

        if (mouseBreeze.lastX !== -9999) {
            mouseBreeze.vx = ((clientX - mouseBreeze.lastX) / dt) * 16;
            mouseBreeze.vy = ((clientY - mouseBreeze.lastY) / dt) * 16;
        }

        mouseBreeze.x = clientX;
        mouseBreeze.y = clientY;
        mouseBreeze.lastX = clientX;
        mouseBreeze.lastY = clientY;
        mouseBreeze.lastTime = now;
        mouseBreeze.active = true;
    }

    window.addEventListener('mousemove', e => handlePointer(e.clientX, e.clientY), { passive: true });
    window.addEventListener('touchmove', e => {
        if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.resetTransform?.();
        ctx.scale(dpr, dpr);
    }

    // ----------------------------------------------------
    // Lớp Lá Dâu Tằm (Mulberry Leaf)
    // ----------------------------------------------------
    class MulberryLeaf {
        constructor(isInitial = false) {
            this.reset(isInitial);
        }

        reset(isInitial = false) {
            this.z = 0.3 + Math.random() * 0.7; // Độ sâu xa/gần
            this.baseSize = 16 + this.z * 18 + (Math.random() * 6 - 3);
            this.aspectRatio = 1.25 + (Math.random() * 0.25 - 0.1);
            this.width = this.baseSize;
            this.height = this.baseSize * this.aspectRatio;

            this.type = Math.floor(Math.random() * 3);
            this.palette = LEAF_PALETTES[Math.floor(Math.random() * LEAF_PALETTES.length)];

            this.x = Math.random() * (width + 100) - 50;
            this.y = isInitial ? Math.random() * (height + 80) - 40 : -(Math.random() * 90 + 35);

            this.baseSpeedY = (0.7 + this.z * 1.05) * (0.85 + Math.random() * 0.3);
            this.speedY = this.baseSpeedY;

            this.swayAngle = Math.random() * Math.PI * 2;
            this.swaySpeed = 0.015 + (1.1 - this.z) * 0.013 + Math.random() * 0.007;
            this.swayAmplitude = (20 + this.z * 28) * (0.8 + Math.random() * 0.4);

            this.pitch = Math.random() * Math.PI * 2;
            this.pitchSpeed = (0.012 + Math.random() * 0.018) * (Math.random() < 0.5 ? 1 : -1);

            this.roll = Math.random() * Math.PI * 2;
            this.rollSpeed = 0.015 + Math.random() * 0.02;

            this.rotationZ = (Math.random() - 0.5) * 0.4;
            this.targetRotationZ = 0;

            this.windPushX = 0;
            this.windPushY = 0;
            this.opacity = 0.45 + this.z * 0.48;
        }

        update(dtRatio, globalWind) {
            this.swayAngle += this.swaySpeed * dtRatio;
            const swaySin = Math.sin(this.swayAngle);
            const swayCos = Math.cos(this.swayAngle);
            const swayVelocityX = swayCos * this.swayAmplitude * 0.036;

            const lift = 1 - 0.4 * Math.abs(swaySin);
            this.speedY = this.baseSpeedY * lift;

            this.pitch += this.pitchSpeed * dtRatio;
            this.roll += this.rollSpeed * dtRatio;

            this.targetRotationZ = (swayVelocityX + globalWind.x * 0.5) * 0.26;
            this.rotationZ += (this.targetRotationZ - this.rotationZ) * 0.06 * dtRatio;

            if (mouseBreeze.active) {
                const dx = this.x - mouseBreeze.x;
                const dy = this.y - mouseBreeze.y;
                const distSq = dx * dx + dy * dy;
                const radius = 140;

                if (distSq < radius * radius && distSq > 4) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / radius) * 2.2;
                    this.windPushX += (dx / dist) * force + mouseBreeze.vx * 0.08;
                    this.windPushY += (dy / dist) * force * 0.35 + mouseBreeze.vy * 0.08;
                    this.pitchSpeed += (Math.random() - 0.5) * 0.025;
                }
            }

            this.windPushX *= Math.pow(0.92, dtRatio);
            this.windPushY *= Math.pow(0.92, dtRatio);

            const totalSpeedX = (swayVelocityX + globalWind.x * this.z + this.windPushX) * dtRatio;
            const totalSpeedY = (this.speedY + globalWind.y + scrollDraft * 0.35 + this.windPushY) * dtRatio;

            this.x += totalSpeedX;
            this.y += totalSpeedY;

            if (this.y > height + 60 || this.x < -100 || this.x > width + 100) {
                this.reset(false);
            }
        }

        draw(targetCtx) {
            targetCtx.save();
            targetCtx.translate(this.x, this.y);
            targetCtx.rotate(this.rotationZ);

            const cosPitch = Math.cos(this.pitch);
            if (Math.abs(cosPitch) < 0.04) {
                targetCtx.restore();
                return;
            }

            const isFacingUp = cosPitch > 0;
            const scaleX = 1 - 0.15 * Math.sin(this.roll);
            const scaleY = cosPitch;

            targetCtx.scale(scaleX, scaleY);
            targetCtx.globalAlpha = this.opacity;

            const w = this.width;
            const h = this.height;

            const grad = targetCtx.createLinearGradient(0, h * 0.45, 0, -h * 0.5);
            if (isFacingUp) {
                grad.addColorStop(0, this.palette.top1);
                grad.addColorStop(0.55, this.palette.top2);
                grad.addColorStop(1, this.palette.top3);
            } else {
                grad.addColorStop(0, this.palette.back1);
                grad.addColorStop(1, this.palette.back2);
            }

            // 1. Cuống lá
            targetCtx.beginPath();
            targetCtx.moveTo(0, h * 0.42);
            targetCtx.quadraticCurveTo(w * 0.06, h * 0.52, 0, h * 0.6);
            targetCtx.strokeStyle = this.palette.stem;
            targetCtx.lineWidth = Math.max(1, w * 0.05);
            targetCtx.lineCap = 'round';
            targetCtx.stroke();

            // 2. Phiến lá dâu tằm
            targetCtx.beginPath();
            targetCtx.moveTo(0, -h * 0.5);

            if (this.type === 0) {
                // Lá dâu bánh tẻ tim tròn
                targetCtx.bezierCurveTo(-w * 0.32, -h * 0.42, -w * 0.58, -h * 0.16, -w * 0.55, h * 0.12);
                targetCtx.bezierCurveTo(-w * 0.52, h * 0.36, -w * 0.22, h * 0.47, 0, h * 0.42);
                targetCtx.bezierCurveTo(w * 0.22, h * 0.47, w * 0.52, h * 0.36, w * 0.55, h * 0.12);
                targetCtx.bezierCurveTo(w * 0.58, -h * 0.16, w * 0.32, -h * 0.42, 0, -h * 0.5);
            } else if (this.type === 1) {
                // Búp tằm non thon thả
                targetCtx.bezierCurveTo(-w * 0.26, -h * 0.45, -w * 0.48, -h * 0.18, -w * 0.44, h * 0.15);
                targetCtx.bezierCurveTo(-w * 0.4, h * 0.38, -w * 0.16, h * 0.48, 0, h * 0.44);
                targetCtx.bezierCurveTo(w * 0.16, h * 0.48, w * 0.4, h * 0.38, w * 0.44, h * 0.15);
                targetCtx.bezierCurveTo(w * 0.48, -h * 0.18, w * 0.26, -h * 0.45, 0, -h * 0.5);
            } else {
                // Lá dâu tằm khía lượn
                targetCtx.bezierCurveTo(-w * 0.3, -h * 0.42, -w * 0.46, -h * 0.2, -w * 0.42, -h * 0.04);
                targetCtx.bezierCurveTo(-w * 0.56, h * 0.12, -w * 0.5, h * 0.32, -w * 0.2, h * 0.44);
                targetCtx.lineTo(0, h * 0.42);
                targetCtx.bezierCurveTo(w * 0.2, h * 0.44, w * 0.5, h * 0.32, w * 0.56, h * 0.12);
                targetCtx.bezierCurveTo(w * 0.42, -h * 0.04, w * 0.46, -h * 0.2, w * 0.3, -h * 0.42);
                targetCtx.lineTo(0, -h * 0.5);
            }

            targetCtx.closePath();
            targetCtx.fillStyle = grad;
            targetCtx.fill();

            // 3. Gân lá
            if (this.baseSize > 17) {
                targetCtx.strokeStyle = isFacingUp ? this.palette.vein : 'rgba(35, 65, 30, 0.25)';
                targetCtx.lineWidth = Math.max(0.6, w * 0.03);

                targetCtx.beginPath();
                targetCtx.moveTo(0, h * 0.42);
                targetCtx.quadraticCurveTo(-w * 0.02, 0, 0, -h * 0.45);
                targetCtx.stroke();
            }

            targetCtx.restore();
        }
    }

    // ----------------------------------------------------
    // Lớp Sợi Tơ Vàng (Golden Silk Wisps - Thêu Hương Dệt Vị)
    // ----------------------------------------------------
    class GoldenSilkWisp {
        constructor(isInitial = false) {
            this.reset(isInitial);
        }

        reset(isInitial = false) {
            this.x = Math.random() * width;
            this.y = isInitial ? Math.random() * height : -(Math.random() * 50 + 20);
            this.length = 40 + Math.random() * 50;
            this.speedY = 0.5 + Math.random() * 0.6;
            this.speedX = (Math.random() - 0.4) * 0.6;
            this.opacity = 0.25 + Math.random() * 0.45;
            this.waveAngle = Math.random() * Math.PI * 2;
            this.waveSpeed = 0.02 + Math.random() * 0.02;
            this.curvature = 10 + Math.random() * 15;
        }

        update(dtRatio, globalWind) {
            this.waveAngle += this.waveSpeed * dtRatio;
            this.x += (this.speedX + globalWind.x * 0.6) * dtRatio;
            this.y += (this.speedY + globalWind.y * 0.5) * dtRatio;

            if (this.y > height + 80 || this.x < -80 || this.x > width + 80) {
                this.reset(false);
            }
        }

        draw(targetCtx) {
            targetCtx.save();
            targetCtx.globalAlpha = this.opacity;
            targetCtx.strokeStyle = 'rgba(216, 170, 75, 0.75)'; // Màu tơ tằm óng vàng
            targetCtx.lineWidth = 1;
            targetCtx.lineCap = 'round';

            const wave = Math.sin(this.waveAngle) * this.curvature;

            targetCtx.beginPath();
            targetCtx.moveTo(this.x, this.y);
            targetCtx.bezierCurveTo(
                this.x + wave, this.y + this.length * 0.35,
                this.x - wave, this.y + this.length * 0.7,
                this.x + wave * 0.5, this.y + this.length
            );
            targetCtx.stroke();
            targetCtx.restore();
        }
    }

    function initElements() {
        resizeCanvas();
        leaves = [];
        silkWisps = [];

        const leafCount = width < 768 ? 14 : 24;
        for (let i = 0; i < leafCount; i++) {
            leaves.push(new MulberryLeaf(true));
        }

        const silkCount = width < 768 ? 6 : 10;
        for (let i = 0; i < silkCount; i++) {
            silkWisps.push(new GoldenSilkWisp(true));
        }
    }

    function animate(currentTime) {
        if (!isRunning) return;

        const deltaTime = Math.min(currentTime - lastTime, 50);
        const dtRatio = deltaTime / 16.67;
        lastTime = currentTime;

        ctx.clearRect(0, 0, width, height);

        const globalWind = {
            x: Math.sin(currentTime * 0.0007) * 0.65 + Math.cos(currentTime * 0.0018) * 0.3,
            y: 0.15 + Math.sin(currentTime * 0.0012) * 0.08
        };

        scrollDraft *= Math.pow(0.94, dtRatio);

        if (mouseBreeze.active) {
            mouseBreeze.vx *= Math.pow(0.9, dtRatio);
            mouseBreeze.vy *= Math.pow(0.9, dtRatio);
            if (Math.abs(mouseBreeze.vx) < 0.01 && Math.abs(mouseBreeze.vy) < 0.01) {
                mouseBreeze.active = false;
            }
        }

        // Vẽ các sợi tơ vàng
        for (let i = 0; i < silkWisps.length; i++) {
            silkWisps[i].update(dtRatio, globalWind);
            silkWisps[i].draw(ctx);
        }

        // Vẽ lá dâu tằm
        for (let i = 0; i < leaves.length; i++) {
            leaves[i].update(dtRatio, globalWind);
            leaves[i].draw(ctx);
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

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isRunning) stopAnimation();
            else startAnimation();
        });
    }

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

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
        }, 150);
    });

    initElements();
    if (isRunning) {
        animationFrameId = requestAnimationFrame(animate);
    }
})();