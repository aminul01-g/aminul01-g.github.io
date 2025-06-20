/* General Styling & Variables */
:root {
    --primary-color: #0ea5e9; /* A vibrant sky blue */
    --secondary-color: #334155; /* A cool, dark gray */
    --background-color: #0f172a; /* A deep navy blue */
    --card-background: #1e293b; /* A slightly lighter navy */
    --text-color: #e2e8f0; /* A soft, off-white */
    --text-muted: #94a3b8; /* A muted gray for subtext */
    --font-family: 'Inter', sans-serif;
    --container-width: 1200px;
}

/* Base and Reset */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.7;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 1.5rem;
}

h1, h2, h3 {
    color: #fff;
    margin-bottom: 1rem;
    letter-spacing: -0.5px;
}

h1 { font-size: 3.5rem; font-weight: 800; }
h2 { font-size: 2.5rem; font-weight: 700; margin-top: 4rem; text-align: center; }
h3 { font-size: 1.5rem; font-weight: 700; }

section {
    padding: 5rem 0;
}

/* Header and Navigation */
.site-header {
    background-color: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--secondary-color);
    position: sticky;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 1.25rem;
}

.logo svg {
    margin-right: 0.75rem;
}

.nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
}

.nav-links a:hover {
    background-color: var(--secondary-color);
    color: #fff;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 0.8rem 1.75rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
}

.btn-primary {
    background-color: var(--primary-color);
    color: #fff;
}
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

.btn-secondary {
    background-color: var(--secondary-color);
    color: var(--text-color);
}
.btn-secondary:hover {
    background-color: #475569;
    transform: translateY(-2px);
}

/* Hero Section */
.hero {
    text-align: center;
    padding: 7rem 1rem;
}
.hero .tagline {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}
.hero .subtext {
    max-width: 650px;
    margin: 0 auto 2.5rem auto;
    color: var(--text-muted);
    font-size: 1.1rem;
}
.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

/* Projects Section */
.project-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-top: 3rem;
}

.project-card {
    background-color: var(--card-background);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--secondary-color);
}
.project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.project-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-bottom: 1px solid var(--secondary-color);
}
.card-content {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
.card-content h3 { margin-bottom: 0.5rem; }
.card-content p { color: var(--text-muted); margin-bottom: 1.5rem; flex-grow: 1; }
.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}
.tech-stack span {
    background-color: var(--secondary-color);
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
}
.card-links {
    display: flex;
    gap: 1.5rem;
}
.card-links a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

/* About Section */
.about-content {
    max-width: 800px;
    margin: 2rem auto 0 auto;
    background-color: var(--card-background);
    padding: 3rem;
    border-radius: 12px;
    text-align: left;
}
.about-content p {
    margin-bottom: 1rem;
    color: var(--text-muted);
    font-size: 1.1rem;
}
.about-content h3 {
    margin-top: 2.5rem;
    text-align: center;
}
.skills-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
}
.skills-grid span {
    background-color: var(--secondary-color);
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-weight: 500;
}

/* Contact Section */
.contact { text-align: center; }
.contact p { color: var(--text-muted); margin-bottom: 2rem; }
.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--secondary-color);
    background-color: var(--card-background);
    color: var(--text-color);
    font-family: var(--font-family);
    font-size: 1rem;
    transition: border-color 0.2s;
}
.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

/* Footer */
.site-footer {
    text-align: center;
    padding: 2.5rem;
    margin-top: 4rem;
    border-top: 1px solid var(--secondary-color);
    color: var(--text-muted);
}

/* Responsive Design for Tablet and Mobile */
@media (max-width: 992px) {
    .project-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2.1rem; }
    .nav-links {
        display: none; /* Simplifies mobile view, can be replaced with a hamburger menu */
    }
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    .btn {
        width: 80%;
        text-align: center;
    }
}
