import React, { useState } from 'react';
import { PageRoute } from '../types';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare,
  Building,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactPageProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceCategory: 'Autonomous AI Agents',
    budgetRange: '$15,000 - $30,000',
    timeline: 'Within 3-4 Weeks',
    projectDescription: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Who owns the intellectual property (IP) and deliverables?',
      answer: 'You retain 100% full commercial ownership of all deliverables upon completion—including vector source files, Figma libraries, video master timelines, Python/TypeScript agent microservices, and custom system instruction configurations.'
    },
    {
      question: 'How do you prevent hallucinations in critical business workflows?',
      answer: 'I engineer deterministic validation harnesses using JSON schema contracts, type validation invariants, and continuous evaluation benchmarks. Cognitive outputs must satisfy rigorous validation rules before triggering downstream database mutations or API calls.'
    },
    {
      question: 'Why choose an AI Generalist over a traditional multi-team agency?',
      answer: 'Traditional agencies introduce handoff friction: the strategist writes a deck, the designer creates mockups without understanding LLM limits, and developers struggle to implement. An AI Generalist synthesizes the entire stack, eliminating miscommunication and delivering 5x to 10x faster.'
    },
    {
      question: 'What is the typical onboarding and kickoff timeline?',
      answer: 'Following our initial 45-minute discovery consultation and scope confirmation, client engagements typically kick off within 3 to 5 business days with immediate preliminary deliverables in week one.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectDescription) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      serviceCategory: 'Autonomous AI Agents',
      budgetRange: '$15,000 - $30,000',
      timeline: 'Within 3-4 Weeks',
      projectDescription: ''
    });
    setSubmitted(false);
  };

  return (
    <div id="contact-page-container" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Direct Client Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Let's Architect Your AI Solution.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have a business challenge that requires autonomous agents, brand identity, rapid vibe coding, or promotional storytelling video? Share your requirements below to schedule a technical discovery consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Left Column: Direct Info & Quick Schedule */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-950 font-heading">
                Direct Engagement Details
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Direct Email</div>
                    <a href="mailto:contact@aivisionworks.com" className="text-blue-600 hover:underline text-xs sm:text-sm">
                      contact@aivisionworks.com
                    </a>
                    <div className="text-[11px] text-slate-400 mt-0.5">Average response under 12 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Location & Availability</div>
                    <div className="text-slate-600 text-xs sm:text-sm">San Francisco, California</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Global Remote Engagements (PST / EST / CET)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Current Status</div>
                    <div className="text-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Accepting 2 Selected Q3/Q4 Clients
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Quality Guarantee */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Confidentiality & NDA First</span>
                </div>
                <p>
                  All client architecture discussions and proprietary business data are treated with strict confidentiality under standard mutual non-disclosure agreements.
                </p>
              </div>
            </div>

            {/* Quick Process Card */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white space-y-4 shadow-xl">
              <h4 className="text-base font-bold text-white font-heading">
                Discovery Session Format
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                During our initial 45-minute technical discovery session, we review your operational bottlenecks, evaluate API feasibility, and draft an architectural blueprint with concrete cost and time estimates.
              </p>
              <div className="text-xs text-blue-400 font-semibold flex items-center gap-1 pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Zero obligation · Pure technical clarity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-heading">
                    Inquiry Received Successfully
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. I have received your project details regarding <strong className="text-slate-900">{formData.serviceCategory}</strong> and will reply within 12 business hours to schedule your discovery session.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto text-left space-y-1">
                    <div><span className="font-bold">Contact:</span> {formData.email}</div>
                    {formData.company && <div><span className="font-bold">Company:</span> {formData.company}</div>}
                    <div><span className="font-bold">Estimated Window:</span> {formData.timeline}</div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950 font-heading mb-1">
                      Project Consultation Form
                    </h3>
                    <p className="text-xs text-slate-500">
                      Please provide context about your organization and technical goals.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Company or Venture
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. FinPulse Labs, Stealth AI Startup"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  {/* Primary Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Primary AI Solution Required *
                    </label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    >
                      <option>Autonomous AI Agents</option>
                      <option>Vibe Coding & Full-Stack Web App</option>
                      <option>Brand Identity & Vector Logo</option>
                      <option>Promotional & Storytelling Video</option>
                      <option>Digital Art & Keynote Poster Series</option>
                      <option>High-CTR YouTube Packaging & Thumbnails</option>
                      <option>Prompt Architecture & Enterprise Advisory</option>
                    </select>
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Target Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option>$5,000 - $15,000</option>
                        <option>$15,000 - $30,000</option>
                        <option>$30,000 - $60,000</option>
                        <option>$60,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Desired Launch Window
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option>Immediate (Within 1-2 Weeks)</option>
                        <option>Within 3-4 Weeks</option>
                        <option>Q3 / Q4 Strategic Initiative</option>
                        <option>Flexible / Exploring Feasibility</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Describe the Real-World Problem You Wish to Solve *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      placeholder="Share details on your operational bottleneck, target audience, existing systems, or desired deliverables..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry & Request Discovery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-slate-200 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-950 font-heading">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers regarding IP ownership, reliability, process, and deliverables.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
