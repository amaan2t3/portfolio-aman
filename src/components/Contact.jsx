import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phoneNumber = "923281923524";
    const text = `*New message from your portfolio!*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Message:*\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 scroll-mt-0 bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-brand-500">07.</span> Get In Touch
            <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Let's talk about everything!</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="p-3 glass rounded-full text-brand-500">
                    <MapPin size={24} />
                  </div>
                  <span>Pindora, Rawalpindi, Pakistan</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="p-3 glass rounded-full text-brand-500">
                    <Mail size={24} />
                  </div>
                  <a href="mailto:amaanullah9011@gmail.com" className="hover:text-brand-500 transition-colors">
                    amaanullah9011@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="p-3 glass rounded-full text-brand-500">
                    <Phone size={24} />
                  </div>
                  <a href="tel:03281923524" className="hover:text-brand-500 transition-colors">
                    0328 1923524
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="https://github.com/amaan2t3" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-slate-300 hover:text-brand-500 hover:border-brand-500/50 transition-all">
                  <FaGithub size={20} />
                </a>
                <a href="https://linkedin.com/in/amanullah-ibrahim-819335329" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-slate-300 hover:text-brand-500 hover:border-brand-500/50 transition-all">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    placeholder="[EMAIL_ADDRESS]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
                    placeholder="Hello Amanullah, I'd like to talk about..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-brand-500/50 box-glow disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
