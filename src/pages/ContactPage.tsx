import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle, Send } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="container-custom py-12 sm:py-16 max-w-2xl">
      <SEOHead
        title="Contact & Support — UnitFlow"
        description="Get in touch with the UnitFlow team to suggest new units, report a calculation inquiry, or submit feedback."
        canonicalPath="/contact"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact & Support', url: '/contact' },
        ]}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Contact &amp; Feedback
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Have an idea for a new unit conversion or feedback on precision? Reach out below.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">Message Received</h2>
            <p className="text-sm text-gray-600">
              Thank you for contacting UnitFlow! We typically review feedback and update conversions
              within 24-48 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
                setSubject('');
                setMessage('');
              }}
              className="btn-secondary text-sm mt-4"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Your Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input-base text-sm"
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Unit request, formula correction, feedback"
                className="input-base text-sm"
              />
            </div>

            <div>
              <label htmlFor="contact-msg" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Message
              </label>
              <textarea
                id="contact-msg"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your note or question here..."
                className="input-base text-sm resize-y"
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-sm font-semibold">
              <Send className="w-4 h-4 mr-1.5" />
              Send Message
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        UnitFlow respects your privacy. We never share or sell contact details.
      </div>
    </div>
  );
}
