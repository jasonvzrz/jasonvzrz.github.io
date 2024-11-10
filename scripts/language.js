document.addEventListener('DOMContentLoaded', () => {
    // Existing code remains...

    // Language switching functionality
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'en';

    const translations = {
        en: {
            title: 'Software Developer',
            about: 'About',
            aboutContent: 'Computer Science Engineering student. Software developer. Advanced proficiency in office software and other tools. Very passionate about frontend.',
            projects: 'Projects',
            skills: 'Skills',
            contact: 'Contact'
        },
        es: {
            title: 'Desarrollador de Software',
            about: 'Sobre mí',
            aboutContent: 'Estudiante de Ingeniería en Ciencias de la Computación. Desarrollador de software. Dominio avanzado de software de oficina y otras herramientas. Apasionado por el frontend.',
            projects: 'Proyectos',
            skills: 'Habilidades',
            contact: 'Contacto'
        }
    };

    function updateLanguage(lang) {
        document.querySelector('.title').textContent = translations[lang].title;
        document.querySelector('#about h2').textContent = translations[lang].about;
        document.querySelector('#about p').textContent = translations[lang].aboutContent;
        document.querySelector('#projects h2').textContent = translations[lang].projects;
        document.querySelector('#skills h2').textContent = translations[lang].skills;
        document.querySelector('#contact h2').textContent = translations[lang].contact;
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateLanguage(currentLang);
        document.documentElement.lang = currentLang;
    });
});