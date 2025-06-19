import React from 'react';
import ContactForm from './ContactForm';

const ContactSection = () => (
    <section id="contact" className="py-16 sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-4">Get In Touch</h2>
        <p className="text-center text-slate-400 mb-12">Have a question or want to collaborate? Feel free to reach out.</p>
        <ContactForm />
    </section>
);
export default ContactSection;

