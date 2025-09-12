'use client'
import { useState } from 'react'

export default function I18nDemo() {
    const [language, setLanguage] = useState('en')

    // Simple translations object
    const translations = {
        en: {
            title: 'Welcome to i18n Demo',
            greeting: 'Hello World!',
            description: 'This is a simple internationalization example.',
            button: 'Click me',
            language: 'Language'
        },
        es: {
            title: 'Bienvenido a la Demo i18n',
            greeting: '¡Hola Mundo!',
            description: 'Este es un ejemplo simple de internacionalización.',
            button: 'Haz clic',
            language: 'Idioma'
        },
        fr: {
            title: 'Bienvenue à la démo i18n',
            greeting: 'Bonjour le monde!',
            description: 'Ceci est un exemple simple d\'internationalisation.',
            button: 'Cliquez ici',
            language: 'Langue'
        }
    }

    const t = translations[language]
    debugger

    return (
        <div className="container mt-4">
            <h1>{t.title}</h1>
            
            {/* Language Switcher */}
            <div className="mb-3">
                <label className="form-label">{t.language}:</label>
                <select 
                    className="form-select" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                </select>
            </div>

            {/* Content */}
            <div className="card">
                <div className="card-body">
                    <h2>{t.greeting}</h2>
                    <p>{t.description}</p>
                    <button className="btn btn-primary">
                        {t.button}
                    </button>
                </div>
            </div>

            {/* Current Language Display */}
            <div className="mt-3">
                <small className="text-muted">
                    Current language: <strong>{language.toUpperCase()}</strong>
                </small>
            </div>
        </div>
    )
}



