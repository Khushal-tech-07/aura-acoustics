import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Acoustic Product Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmittedMessage(null);

    try {
      const res = await api.submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject,
        message: formData.message.trim()
      });

      setSubmittedMessage(`Thank you, ${res.name}. Your inquiry has been logged in our system and an acoustic consultant will respond to ${res.email} within 24 hours.`);
      setFormData({
        name: '',
        email: '',
        subject: 'Acoustic Product Inquiry',
        message: ''
      });
      setErrors({});
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to submit contact form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-2xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <span>Acoustic Concierge</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Direct Studio Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Consult with Our Acoustic Engineers
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Whether you need bespoke room acoustics analysis, custom home theatre integration, or technical advice regarding our reference loudspeakers, our sound architects are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk'] mb-1">
            Send an Acoustic Inquiry
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            All messages are directly routed to our engineering laboratory database in San Francisco.
          </p>

          {submittedMessage ? (
            <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-600/40 space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Inquiry Successfully Logged
              </h3>
              <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                {submittedMessage}
              </p>
              <button
                type="button"
                onClick={() => setSubmittedMessage(null)}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="p-3 text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded-lg">
                  {errors.form}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Julian Hayes"
                    className={`w-full bg-[#080C14] border ${
                      errors.name ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="julian@example.com"
                    className={`w-full bg-[#080C14] border ${
                      errors.email ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Acoustic Product Inquiry">Product Technical Specifications</option>
                  <option value="Custom Dolby Atmos Installation">Custom Architectural & Home Theatre Installation</option>
                  <option value="Nearfield Studio Consultation">Nearfield Studio & Mastering Consultation</option>
                  <option value="Order Tracking & Freight">Order Tracking & White-Glove Freight Delivery</option>
                  <option value="5-Year Master Warranty Claim">Master Warranty Registration & Service</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Detailed Message *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your listening space, room dimensions, equipment chain, or any acoustic questions..."
                  className={`w-full bg-[#080C14] border ${
                    errors.message ? 'border-red-500' : 'border-slate-700'
                  } rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                />
                {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting to Database...' : 'Transmit Message to Sound Lab'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Details & Google Maps Embed Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Channels */}
          <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
              Atelier & Laboratory Contacts
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">AURA ACOUSTICS Headquarters & Lab</div>
                  <div className="text-slate-400">420 Harrison Street, Suite 300</div>
                  <div className="text-slate-400">San Francisco, CA 94105, USA</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Direct Lab Hotline: </span>
                  <strong className="text-white font-mono">+1 (415) 890-AURA</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Electronic Mail: </span>
                  <strong className="text-white font-mono">engineering@aura-acoustics.io</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Listening Room Hours: </span>
                  <span className="text-white">Mon – Fri, 9:00 AM – 6:00 PM PST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed Placeholder */}
          <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-[#080C14] flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>San Francisco Acoustic District</span>
              </div>
              <span className="text-[11px] font-mono text-blue-400">37.788° N, 122.395° W</span>
            </div>

            {/* Stylized Dark Map Embed Placeholder Canvas */}
            <div className="relative aspect-[16/9] w-full bg-[#080C16] flex items-center justify-center p-6 text-center select-none overflow-hidden">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Simulated Map Streets & Waterfront */}
              <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 400 200">
                <path d="M 0 50 Q 150 70 400 30" fill="none" stroke="#2563eb" strokeWidth="2" />
                <path d="M 50 0 L 120 200" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 180 0 L 220 200" fill="none" stroke="#475569" strokeWidth="1.5" />
                <path d="M 310 0 L 280 200" fill="none" stroke="#475569" strokeWidth="1.5" />
                <circle cx="210" cy="90" r="40" fill="#1e293b" opacity="0.4" />
              </svg>

              {/* Pin marker */}
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 border-2 border-white shadow-xl shadow-blue-500/50 flex items-center justify-center text-white animate-pulse">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-1.5 backdrop-blur-md">
                  <div className="text-xs font-bold text-white">AURA ACOUSTICS Lab</div>
                  <div className="text-[10px] text-slate-400">420 Harrison St, San Francisco</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
