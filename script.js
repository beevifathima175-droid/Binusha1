document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Starry Sky Animation ---
    function createStars() {
        const sky = document.querySelector('.sky-background');
        const numStars = 150; // Adjust number of stars

        for (let i = 0; i < numStars; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            let size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${3 + Math.random() * 5}s`;
            sky.appendChild(star);
        }
    }

    // --- 2. Active Navigation Link on Scroll ---
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 150) { // 150px offset
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // --- 3. Fade-in Sections on Scroll ---
    function revealSections() {
        const allSections = document.querySelectorAll('.content-section');
        
        const revealSection = function(entries, observer) {
            const [entry] = entries;
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        };
        
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.15, // 15% of the section needs to be visible
        });
        
        allSections.forEach(function(section) {
            sectionObserver.observe(section);
        });
    }

    // Initialize all functions
    createStars();
    updateActiveNav();
    revealSections();
});