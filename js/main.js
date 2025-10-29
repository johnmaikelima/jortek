// ==================== MOBILE MENU TOGGLE ====================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== PARTNERS CAROUSEL ====================
const partnersTrack = document.getElementById('partnersTrack');

if (partnersTrack) {
    // Real partner logos from parceiros folder
    const partnerLogos = [
        'parceiros/IMG-20250603-WA0035.jpg',
        'parceiros/IMG-20250603-WA0036.jpg',
        'parceiros/IMG-20250603-WA0037.jpg',
        'parceiros/IMG-20250603-WA0038.jpg',
        'parceiros/IMG-20250603-WA0039.jpg',
        'parceiros/IMG-20250603-WA0040.jpg',
        'parceiros/IMG-20250603-WA0041.jpg',
        'parceiros/IMG-20250603-WA0042.jpg',
        'parceiros/images-5.jpg'
    ];

    // Create partner logo elements
    const createPartnerLogos = () => {
        let logosHTML = '';
        
        // Duplicate logos for infinite scroll effect
        for (let i = 0; i < 2; i++) {
            partnerLogos.forEach((logo, index) => {
                logosHTML += `
                    <div class="partner-logo">
                        <img src="${logo}" alt="Parceiro ${index + 1}" loading="lazy">
                    </div>
                `;
            });
        }
        
        partnersTrack.innerHTML = logosHTML;
    };

    createPartnerLogos();

    // Pause animation on hover
    partnersTrack.addEventListener('mouseenter', () => {
        partnersTrack.style.animationPlayState = 'paused';
    });

    partnersTrack.addEventListener('mouseleave', () => {
        partnersTrack.style.animationPlayState = 'running';
    });
}

// ==================== FORM SUBMISSIONS ====================
// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (in production, this would send to a server)
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// Careers Form
const careersForm = document.getElementById('careersForm');
if (careersForm) {
    careersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(careersForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (in production, this would send to a server)
        alert('Currículo enviado com sucesso! Analisaremos sua candidatura e retornaremos em breve.');
        careersForm.reset();
    });
}

// Tracking Form
const trackingForm = document.getElementById('trackingForm');
const trackingResult = document.getElementById('trackingResult');

if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const codigo = document.getElementById('codigo').value;
        
        if (codigo.trim() === '') {
            alert('Por favor, insira um código de rastreamento válido.');
            return;
        }
        
        // Show tracking result (in production, this would fetch real data)
        trackingResult.style.display = 'block';
        trackingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Simulate loading real data
        const timelineItems = trackingResult.querySelectorAll('.timeline-item');
        const dates = trackingResult.querySelectorAll('.timeline-date');
        
        // Generate random dates for demo
        const now = new Date();
        dates.forEach((dateEl, index) => {
            if (index < 3) {
                const date = new Date(now - (3 - index) * 24 * 60 * 60 * 1000);
                dateEl.textContent = date.toLocaleString('pt-BR');
            }
        });
    });
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .city-card, .benefit-card, .value-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #003580 0%, #0056D2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(0, 53, 128, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 8px 24px rgba(0, 53, 128, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 16px rgba(0, 53, 128, 0.3)';
    });
};

createScrollToTopButton();

// ==================== BRAZIL MAP INTERACTIVITY ====================
document.addEventListener('DOMContentLoaded', function() {
    // Support both cidades.html and index.html map IDs
    const mapObject = document.getElementById('brazilMapSVG') || document.getElementById('homeMapSVG');
    
    if (mapObject) {
        mapObject.addEventListener('load', function() {
            try {
                const svgDoc = mapObject.contentDocument;
                if (!svgDoc) return;
                
                const states = svgDoc.querySelectorAll('path[id^="BR-"]');
                
                // Create tooltip if it doesn't exist
                let tooltip = document.getElementById('mapTooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.id = 'mapTooltip';
                    tooltip.className = 'map-tooltip';
                    document.body.appendChild(tooltip);
                }
                
                states.forEach(state => {
                    const stateId = state.id;
                    const stateName = state.getAttribute('title');
                    
                    // Define coverage type and colors
                    let coverageType = 'Sem Cobertura';
                    let fillColor = '#90C695';
                    let hoverColor = '#7AB57F';
                    
                    if (['BR-AC', 'BR-RO', 'BR-SP'].includes(stateId)) {
                        coverageType = 'Cobertura Total';
                        fillColor = '#003580';
                        hoverColor = '#0056D2';
                    } else if (['BR-MT', 'BR-MS'].includes(stateId)) {
                        coverageType = 'Cobertura Parcial';
                        fillColor = '#0056D2';
                        hoverColor = '#0070FF';
                    }
                    
                    // Set initial color
                    state.style.fill = fillColor;
                    state.style.cursor = 'pointer';
                    state.style.transition = 'all 0.3s ease';
                    
                    // Mouse enter
                    state.addEventListener('mouseenter', function(e) {
                        state.style.fill = hoverColor;
                        tooltip.textContent = `${stateName} - ${coverageType}`;
                        tooltip.style.display = 'block';
                        tooltip.style.opacity = '1';
                        updateTooltipPosition(e);
                    });
                    
                    // Mouse move
                    state.addEventListener('mousemove', function(e) {
                        updateTooltipPosition(e);
                    });
                    
                    function updateTooltipPosition(e) {
                        // Get the actual mouse position in the viewport
                        let x = e.clientX;
                        let y = e.clientY;
                        
                        // If the event is from inside the SVG, we need to adjust
                        if (e.target.ownerSVGElement) {
                            const rect = mapObject.getBoundingClientRect();
                            x = rect.left + e.offsetX;
                            y = rect.top + e.offsetY;
                        }
                        
                        tooltip.style.left = (x + 15) + 'px';
                        tooltip.style.top = (y + 15) + 'px';
                    }
                    
                    // Mouse leave
                    state.addEventListener('mouseleave', function() {
                        state.style.fill = fillColor;
                        tooltip.style.display = 'none';
                        tooltip.style.opacity = '0';
                    });
                    
                    // Click event for active/partial states
                    if (['BR-AC', 'BR-RO', 'BR-SP', 'BR-MT', 'BR-MS'].includes(stateId)) {
                        state.addEventListener('click', function() {
                            // Scroll to units section
                            const unitsSection = document.querySelector('.units-grid');
                            if (unitsSection) {
                                unitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Erro ao carregar mapa:', error);
            }
        });
    }
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== WHATSAPP FLOATING BUTTON ====================
document.addEventListener('DOMContentLoaded', function() {
    // Create WhatsApp floating button HTML
    const whatsappHTML = `
        <div class="whatsapp-float" id="whatsappFloat">
            <div class="whatsapp-button" id="whatsappButton">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.396 5.194 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.407 1.407-5.247-0.292-0.507c-1.224-2.162-1.87-4.588-1.87-7.07 0-7.444 6.056-13.5 13.5-13.5s13.5 6.056 13.5 13.5-6.056 13.5-13.5 13.5zM21.803 18.537c-0.397-0.199-2.348-1.158-2.713-1.29-0.365-0.132-0.63-0.199-0.895 0.199s-1.028 1.29-1.26 1.555-0.464 0.298-0.861 0.099-1.68-0.619-3.199-1.973c-1.182-1.054-1.98-2.356-2.212-2.753s-0.025-0.611 0.174-0.809c0.179-0.178 0.397-0.464 0.596-0.696s0.265-0.397 0.397-0.662 0.066-0.497-0.033-0.696-0.895-2.155-1.227-2.951c-0.323-0.776-0.651-0.671-0.895-0.684-0.232-0.012-0.497-0.015-0.762-0.015s-0.696 0.099-1.061 0.497-1.39 1.357-1.39 3.313 1.423 3.842 1.621 4.108 2.799 4.276 6.781 5.996c0.948 0.411 1.688 0.656 2.265 0.839 0.954 0.303 1.821 0.26 2.507 0.158 0.765-0.114 2.348-0.96 2.68-1.887s0.332-1.723 0.232-1.887-0.365-0.265-0.762-0.464z" fill="currentColor"/>
                </svg>
            </div>
            <div class="whatsapp-popup" id="whatsappPopup">
                <div class="whatsapp-popup-header">
                    <h4>Fale com um atendente</h4>
                    <button class="whatsapp-close" id="whatsappClose">&times;</button>
                </div>
                <div class="whatsapp-popup-body">
                    <div class="whatsapp-attendant" id="whatsappAttendant">
                        <div class="attendant-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div class="attendant-info">
                            <strong>SAC Jortek</strong>
                            <span>Atendimento ao Cliente</span>
                        </div>
                        <div class="attendant-status">
                            <span class="status-dot"></span>
                            Online
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);
    
    // Get elements
    const whatsappButton = document.getElementById('whatsappButton');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const whatsappClose = document.getElementById('whatsappClose');
    const whatsappAttendant = document.getElementById('whatsappAttendant');
    
    // Toggle popup
    whatsappButton.addEventListener('click', () => {
        whatsappPopup.classList.toggle('show');
    });
    
    // Close popup
    whatsappClose.addEventListener('click', (e) => {
        e.stopPropagation();
        whatsappPopup.classList.remove('show');
    });
    
    // Click on attendant
    whatsappAttendant.addEventListener('click', () => {
        const phone = '5511992235520';
        const message = encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços da Jortek Express.');
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        const whatsappFloat = document.getElementById('whatsappFloat');
        if (!whatsappFloat.contains(e.target)) {
            whatsappPopup.classList.remove('show');
        }
    });
});
