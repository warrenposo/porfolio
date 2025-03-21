
import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import TransitionWrapper from '@/components/TransitionWrapper';

const Contact: React.FC = () => {
  return (
    <>
      <Navbar />
      <TransitionWrapper>
        <main className="pt-24 pb-16">
          {/* Header */}
          <section className="section-padding bg-secondary/30">
            <div className="container-custom">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full mb-3">
                  Contact
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Get in Touch</h1>
                <p className="text-muted-foreground text-lg">
                  Have a project in mind or want to discuss potential opportunities? I'd love to hear from you. Use the form below or reach out directly through any of my contact channels.
                </p>
              </div>
            </div>
          </section>
          
          {/* Contact Info & Form */}
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="order-2 lg:order-1">
                  <h2 className="text-2xl font-bold font-display mb-6">Send a Message</h2>
                  <ContactForm />
                </div>
                
                <div className="order-1 lg:order-2">
                  <h2 className="text-2xl font-bold font-display mb-6">Contact Information</h2>
                  
                  <div className="space-y-8">
                    <div className="glass-card p-6 flex items-start">
                      <div className="p-3 bg-secondary rounded-lg mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <a href="mailto:warrenokumu98@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                          warrenokumu98@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="glass-card p-6 flex items-start">
                      <div className="p-3 bg-secondary rounded-lg mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Phone</h3>
                        <a href="tel:+254707168578" className="text-muted-foreground hover:text-primary transition-colors">
                          +254 707 168 578
                        </a>
                      </div>
                    </div>
                    
                    <div className="glass-card p-6 flex items-start">
                      <div className="p-3 bg-secondary rounded-lg mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                    
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-semibold mb-4">Social Profiles</h3>
                      <div className="flex gap-4">
                        <a 
                          href="https://github.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-secondary text-primary hover:bg-secondary/80 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        <a 
                          href="https://linkedin.com/in/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-secondary text-primary hover:bg-secondary/80 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Map or CTA Section */}
          <section className="section-padding bg-primary text-primary-foreground">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Let's Work Together</h2>
                <p className="text-primary-foreground/80 mb-8">
                  I'm currently available for freelance projects, full-time positions, and consulting opportunities. If you have a project that you want to get started, think you need my help with something, or just want to say hello, then get in touch.
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="mailto:warrenokumu98@gmail.com" 
                    className="px-6 py-3 rounded-full bg-white text-primary font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail size={18} /> Email Me
                  </a>
                  <a 
                    href="tel:+254707168578" 
                    className="px-6 py-3 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone size={18} /> Call Me
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </TransitionWrapper>
    </>
  );
};

export default Contact;
