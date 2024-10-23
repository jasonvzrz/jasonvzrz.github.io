document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for line accents
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.line-accent')?.style.transform = 'scaleY(1)';
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
});