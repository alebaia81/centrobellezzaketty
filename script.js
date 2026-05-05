// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Reviews Carousel Infinite Loop
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.reviews-track');
    if (track) {
        // Selezioniamo solo le card originali (non quelle già clonate se lo script dovesse ripartire)
        const cards = Array.from(track.children);
        
        // Cloniamo l'intero set per garantire il loop infinito senza buchi
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Nascondiamo i cloni agli screen reader
            track.appendChild(clone);
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    // Escludiamo la sezione recensioni dall'effetto fade-in perché ha già la sua animazione
    if (section.id === 'recensioni') return;
    
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Map Initialization
document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Coordinate per P.zza IV Novembre, 6A, Caorso (PC)
        const lat = 45.0485;
        const lng = 9.8710;
        
        const map = L.map('map', {
            scrollWheelZoom: false // Evita lo zoom accidentale durante lo scroll della pagina
        }).setView([lat, lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Icona personalizzata color oro (come il brand Ketty)
        const goldIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        L.marker([lat, lng], {icon: goldIcon}).addTo(map)
            .bindPopup('<strong>Ketty Centro di Bellezza</strong><br>Piazza IV Novembre, 6/A, 29012 Caorso PC')
            .openPopup();
    }
});

// WhatsApp Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const waForms = document.querySelectorAll('.wa-form');
    
    waForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita il ricaricamento della pagina
            
            // Validazione nativa dei campi (compresa la checkbox privacy)
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // Recupera i valori dai campi
            const name = this.querySelector('input[name="name"]').value.trim();
            const treatment = this.querySelector('select[name="treatment"]').value;
            
            // Numero di telefono fisso del centro (da sostituire con quello reale)
            const phoneNumber = "393534194037"; 
            
            // Costruisce il messaggio personalizzato
            let message = `Ciao Ketty! `;
            if(name) message += `Sono ${name}. `;
            message += `Vorrei regalarmi un momento di relax! \n\n`;
            message += `È possibile fissare un appuntamento per *${treatment}* questa settimana? Fatemi sapere quando avete un buco libero. Grazie mille!`;
            
            // Codifica l'URL e redireziona a WhatsApp
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
