document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Ano Corrente no Rodapé
    // ==========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. FAQ Acordeão (Alternador de Abas)
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha outros itens ativos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = '0';
                }
            });
            
            // Alterna o item atual
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ==========================================
    // 3. Rolagem Suave Premium
    // ==========================================
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const time = Math.min(progress / duration, 1);
            
            // Easing function (easeInOutCubic)
            const ease = time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Aplica a todos os links internos de âncora
    document.querySelectorAll('.scroll-to-offer').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#offer', 1600); // 1.6 segundos para a rolagem ser fluida e premium
        });
    });

    // ==========================================
    // 4. Automação de 3 Fases de Oferta e Checkouts
    // ==========================================
    const CHECKOUT_PHASE1 = 'https://checkout.bravvius.com/17753885'; // Lançamento R$ 1.497 + Bônus (Até 30/07 23:59:59)
    const CHECKOUT_PHASE2 = 'https://checkout.bravvius.com/17753885'; // Último Dia com Desconto R$ 1.497 (Dia 31/07 até 23:59:59)
    const CHECKOUT_PHASE3 = 'https://checkout.bravvius.com/26288547'; // Valor Regular R$ 1.997 (A partir de 01/08)

    const datePhase1 = new Date('2026-07-30T23:59:59').getTime();
    const datePhase2 = new Date('2026-07-31T23:59:59').getTime();

    const updateCheckoutButtons = (url) => {
        if (!url) return;
        const checkoutBtns = document.querySelectorAll('.checkout-btn');
        checkoutBtns.forEach(btn => {
            if (btn.getAttribute('href') !== url) {
                btn.setAttribute('href', url);
            }
        });
    };

    const updateCountdown = () => {
        const boxP1 = document.getElementById('offer-box-phase1');
        const boxP2 = document.getElementById('offer-box-phase2');
        const boxP3 = document.getElementById('offer-box-phase3');

        // Se a página possuir as 3 caixas (ex: index.html principal), executa a alternância dinâmica por data.
        const isDynamicPage = boxP1 && boxP2 && boxP3;

        const now = new Date().getTime();

        if (isDynamicPage) {
            if (now <= datePhase1) {
                boxP1.style.display = 'block';
                boxP2.style.display = 'none';
                boxP3.style.display = 'none';
                updateCheckoutButtons(CHECKOUT_PHASE1);
            } else if (now <= datePhase2) {
                boxP1.style.display = 'none';
                boxP2.style.display = 'block';
                boxP3.style.display = 'none';
                updateCheckoutButtons(CHECKOUT_PHASE2);
            } else {
                boxP1.style.display = 'none';
                boxP2.style.display = 'none';
                boxP3.style.display = 'block';
                updateCheckoutButtons(CHECKOUT_PHASE3);
            }
        }

        // --- ATUALIZAÇÃO DOS TIMERS ---
        // Timer da Fase 1 (se a data já passou, mostra 00:00:00:00)
        const dist1 = Math.max(0, datePhase1 - now);
        const days1 = Math.floor(dist1 / (1000 * 60 * 60 * 24));
        const hours1 = Math.floor((dist1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes1 = Math.floor((dist1 % (1000 * 60 * 60)) / (1000 * 60));
        const seconds1 = Math.floor((dist1 % (1000 * 60)) / 1000);

        document.querySelectorAll('.days-p1').forEach(el => el.textContent = String(days1).padStart(2, '0'));
        document.querySelectorAll('.hours-p1').forEach(el => el.textContent = String(hours1).padStart(2, '0'));
        document.querySelectorAll('.minutes-p1').forEach(el => el.textContent = String(minutes1).padStart(2, '0'));
        document.querySelectorAll('.seconds-p1').forEach(el => el.textContent = String(seconds1).padStart(2, '0'));

        // Timer da Fase 2 (se a data já passou, mostra 00:00:00:00)
        const dist2 = Math.max(0, datePhase2 - now);
        const days2 = Math.floor(dist2 / (1000 * 60 * 60 * 24));
        const hours2 = Math.floor((dist2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes2 = Math.floor((dist2 % (1000 * 60 * 60)) / (1000 * 60));
        const seconds2 = Math.floor((dist2 % (1000 * 60)) / 1000);

        document.querySelectorAll('.days-p2').forEach(el => el.textContent = String(days2).padStart(2, '0'));
        document.querySelectorAll('.hours-p2').forEach(el => el.textContent = String(hours2).padStart(2, '0'));
        document.querySelectorAll('.minutes-p2').forEach(el => el.textContent = String(minutes2).padStart(2, '0'));
        document.querySelectorAll('.seconds-p2').forEach(el => el.textContent = String(seconds2).padStart(2, '0'));
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // 5. Inicialização do Swiper (Palestrantes)
    // ==========================================
    const isMobile = window.innerWidth < 992;
    const swiperOptions = {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: !isMobile, // Loop infinito apenas no desktop
        rewind: isMobile, // No mobile, volta ao início ao chegar no fim
        grabCursor: true,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2
        },
        speed: 800, 
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            992: { 
                slidesPerView: 3, 
                spaceBetween: 30,
            },
            1200: { slidesPerView: 4, spaceBetween: 30 }
        }
    };

    if (typeof Swiper !== 'undefined' && document.querySelector('.specialistsSlider')) {
        try {
            new Swiper('.specialistsSlider', swiperOptions);
        } catch (e) {
            console.error("Erro Swiper Palestrantes:", e);
        }
    }

    // Swiper dos Módulos da Jornada (Ativado Apenas no Mobile)
    let journeySwiper = null;
    function initJourneySwiper() {
        if (typeof Swiper === 'undefined' || !document.querySelector('.journeySlider')) return;
        const isMobileScreen = window.innerWidth < 992;
        if (isMobileScreen) {
            if (!journeySwiper) {
                journeySwiper = new Swiper('.journeySlider', {
                    slidesPerView: 1.15,
                    spaceBetween: 16,
                    grabCursor: true,
                    pagination: {
                        el: '.journey-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    breakpoints: {
                        576: { slidesPerView: 1.5, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 20 }
                    }
                });
            }
        } else {
            if (journeySwiper) {
                journeySwiper.destroy(true, true);
                journeySwiper = null;
            }
        }
    }

    initJourneySwiper();
    window.addEventListener('resize', initJourneySwiper);
});
