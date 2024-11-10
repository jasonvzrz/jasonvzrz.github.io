class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;

        try {
            // Load initial translations
            await this.loadTranslations('en');
            await this.loadTranslations('es');
            this.initialized = true;
            
            // Set initial language
            const savedLang = localStorage.getItem('preferred-language');
            if (savedLang) {
                await this.setLanguage(savedLang);
            }
        } catch (error) {
            console.error('Error initializing language manager:', error);
        }
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`../assets/languages/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Error loading ${lang} translations:`, error);
        }
    }

    async setLanguage(lang) {
        if (!this.translations[lang]) {
            await this.loadTranslations(lang);
        }

        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateContent();
            document.documentElement.lang = lang;
            localStorage.setItem('preferred-language', lang);
        }
    }

    updateContent() {
        const t = this.translations[this.currentLang];
        if (!t) return;

        // Update title
        document.querySelector('.title').textContent = t.title;

        // Update about section
        document.querySelector('#about h2').textContent = t.about.heading;
        document.querySelector('#about p').textContent = t.about.content;

        // Update projects section
        document.querySelector('#projects h2').textContent = t.projects.heading;
        const projectCards = document.querySelectorAll('.project-card');
        projectCards[0].querySelector('h3').textContent = t.projects.project1.title;
        projectCards[0].querySelector('p').textContent = t.projects.project1.description;
        projectCards[1].querySelector('h3').textContent = t.projects.project2.title;
        projectCards[1].querySelector('p').textContent = t.projects.project2.description;
        projectCards[2].querySelector('h3').textContent = t.projects.project3.title;
        projectCards[2].querySelector('p').textContent = t.projects.project3.description;

        // Update skills section
        document.querySelector('#skills h2').textContent = t.skills.heading;
        const skillElements = document.querySelectorAll('.skill');
        t.skills.items.forEach((skill, index) => {
            if (skillElements[index]) {
                skillElements[index].textContent = skill;
            }
        });

        // Update contact section
        document.querySelector('#contact h2').textContent = t.contact.heading;
        const contactLinks = document.querySelectorAll('.contact-links a');
        contactLinks[0].textContent = t.contact.email;
        contactLinks[1].textContent = t.contact.github;
        contactLinks[2].textContent = t.contact.linkedin;
    }

    async toggleLanguage() {
        const nextLang = this.currentLang === 'en' ? 'es' : 'en';
        await this.setLanguage(nextLang);
    }
}

// Initialize and export the language manager
const languageManager = new LanguageManager();
export default languageManager;

// scripts/functions.js
import languageManager from './language.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize language manager
    await languageManager.init();

    // Set up language toggle button
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', () => {
        languageManager.toggleLanguage();
    });

});