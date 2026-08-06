import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import Button from '../../components/Button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you for contacting us! We will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="space-y-12 py-8">
      <div className="mx-5 md:mx-10 xl:mx-15 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold font-archivo text-primary">Get In Touch</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Have questions about your order, products, or need support? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="space-y-4">
            <div className="p-5 border border-secondary rounded-2xl bg-white flex items-start space-x-4">
              <div className="p-3 bg-secondary text-primary rounded-xl shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-primary text-base">Email Us</h3>
                <p className="text-gray-500 text-xs mt-0.5">Our team responds within 24 hours.</p>
                <p className="text-sm font-semibold text-primary mt-2">support@shopper.com</p>
              </div>
            </div>

            <div className="p-5 border border-secondary rounded-2xl bg-white flex items-start space-x-4">
              <div className="p-3 bg-secondary text-primary rounded-xl shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-bold text-primary text-base">Call Support</h3>
                <p className="text-gray-500 text-xs mt-0.5">Mon - Fri from 8am to 6pm</p>
                <p className="text-sm font-semibold text-primary mt-2">+234 (0) 703-274-6642</p>
              </div>
            </div>

            <div className="p-5 border border-secondary rounded-2xl bg-white flex items-start space-x-4">
              <div className="p-3 bg-secondary text-primary rounded-xl shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-primary text-base">Headquarters</h3>
                <p className="text-gray-500 text-xs mt-0.5">Visit our physical store or office.</p>
                <p className="text-sm font-semibold text-primary mt-2">Cephas ICT Hub, Ogbomoso, Nigeria</p>
              </div>
            </div>

            <div className="p-5 border border-secondary rounded-2xl bg-white flex items-start space-x-4">
              <div className="p-3 bg-secondary text-primary rounded-xl shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-bold text-primary text-base">Business Hours</h3>
                <p className="text-gray-500 text-xs mt-0.5">Customer service availability</p>
                <p className="text-sm font-semibold text-primary mt-2">Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 p-6 md:p-8 border border-secondary rounded-2xl bg-white space-y-6">
            <div>
              <h2 className="text-xl font-bold text-primary">Send Us a Message</h2>
              <p className="text-gray-500 text-xs mt-1">Fill out the form below and we will get back to you promptly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Order Inquiry / Product Feedback"
                  className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Message *</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today?"
                  className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none resize-none"
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="w-full py-3"
                rightIcon={<Send size={18} className="text-white" />}
                colors="bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Contact;