class languageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`assets/languages/${lang}.json`);
            if (!response.ok) throw new Error('Translation file not found');
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    async initialize() {
        // Load both language files at start
        await Promise.all([
            this.loadTranslations('en'),
            this.loadTranslations('es')
        ]);

        // Set up the language toggle button
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Initial language setup
        this.updateContent();
    }

    async toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
        document.documentElement.lang = this.currentLang;
        this.updateContent();
    }

    updateContent() {
        const content = this.translations[this.currentLang];
        if (!content) return;

        // Update title
        document.querySelector('.title').textContent = content.title;

        // Update about section
        document.querySelector('#about h2').textContent = content.about.heading;
        document.querySelector('#about p').textContent = content.about.content;

        // Update projects section
        document.querySelector('#projects h2').textContent = content.projects.heading;
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            const projectKey = `project${index + 1}`;
            if (content.projects[projectKey]) {
                card.querySelector('h3').textContent = content.projects[projectKey].title;
                card.querySelector('p').textContent = content.projects[projectKey].description;
            }
        });

        // Update skills section
        document.querySelector('#skills h2').textContent = content.skills.heading;

        // Update contact section
        document.querySelector('#contact h2').textContent = content.contact.heading;
    }
}