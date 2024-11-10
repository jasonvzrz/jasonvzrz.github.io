document.addEventListener('DOMContentLoaded', () => {
    // Your existing intersection observer code
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.line-accent')?.style.transform = 'scaleY(1)';
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Dynamic line animation
    const moveLines = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        document.querySelectorAll('.curved-line').forEach(line => {
            const rect = line.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const angleX = (mouseX - centerX) * 0.01;
            const angleY = (mouseY - centerY) * 0.01;
            
            line.style.transform = `rotate3d(${angleY}, ${angleX}, 0, ${Math.sqrt(angleX * angleX + angleY * angleY)}deg)`;
        });
    };

    document.addEventListener('mousemove', moveLines);

    // Initialize language manager
    const languageManager = new LanguageManager();
    languageManager.initialize();
});
