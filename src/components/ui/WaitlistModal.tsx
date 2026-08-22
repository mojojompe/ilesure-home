import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, User, Mail, Phone, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { PillButton } from './PillButton';
import type { WaitlistFormData } from '../../api/waitlist';
import { submitToWaitlist } from '../../api/waitlist';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  role: 'user' | 'renter';
}

const initialForm: FormData = { fullName: '', email: '', phone: '', university: '', role: 'user' };

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [apiError, setApiError] = useState('');

  // SECURITY-FIX TODO (H-L3): This is client-side validation only and is trivially bypassed.
  // The waitlist submission endpoint (API_ENDPOINTS.waitlist.join) MUST also be validated,
  // sanitized, and rate-limited / CAPTCHA-protected SERVER-SIDE to stop spam, bot flooding,
  // and malformed/oversized payloads. The backend team owns the server-side hardening; do NOT
  // treat the checks below as sufficient. (Endpoint URL intentionally left unchanged.)
  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = 'Your name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    // DECISION: the phone <input> is marked `required` but was not checked in JS, so no inline
    // error ever showed. Validate it here to match the markup. Kept lenient (non-empty + at least
    // 7 digits) to avoid rejecting valid +234 / international formats.
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if ((form.phone.replace(/\D/g, '').length) < 7) {
      e.phone = 'Enter a valid phone number';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError('');

    try {
      const data: WaitlistFormData = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        university: form.university.trim(),
        role: form.role,
      } as WaitlistFormData;

      const response = await submitToWaitlist(data);

      if (response.success) {
        setSuccess(true);
      } else {
        setApiError(response.error?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setApiError('Unable to connect. Please check your internet connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm(initialForm); setSuccess(false); setErrors({}); }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brown-dark/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-4xl bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row min-h-[500px]"
              onClick={e => e.stopPropagation()}
            >
              {/* Left Column - Brand & Image */}
              <div className="hidden md:flex md:w-[45%] relative bg-brown flex-col p-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mustard/20 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h2 
                      className="text-4xl font-black text-white leading-tight mb-4 tracking-tighter"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Your sure home <br />
                      <span className="text-mustard">awaits.</span>
                    </h2>
                    <p className="text-cream-300 text-sm leading-relaxed">
                      Join thousands of Nigerian Users discovering verified housing, safe roommate matching, and zero phantom fees.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <img 
                      src="/illustrations/generated/impact_launch.png" 
                      alt="Waitlist Illustration" 
                      className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full md:w-[55%] bg-cream-50 relative flex flex-col max-h-[90vh] md:max-h-none overflow-y-auto overflow-x-hidden">
                
                {/* ── Mobile Header ── */}
                <div className="md:hidden relative bg-brown px-6 pt-8 pb-14 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-mustard/20 to-transparent pointer-events-none" />
                  
                  {/* Mobile Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
                    aria-label="Close modal"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>

                  <div className="relative z-10 w-2/3">
                    <h2 
                      className="text-3xl font-black text-white leading-tight mb-2 tracking-tighter"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Your sure home <br />
                      <span className="text-mustard">awaits.</span>
                    </h2>
                    <p className="text-cream-300 text-xs">
                      Join thousands getting early access.
                    </p>
                  </div>
                  
                  {/* Mobile Illustration peeking out */}
                  <img 
                    src="/illustrations/generated/impact_launch.png" 
                    alt="" 
                    className="absolute -bottom-4 -right-4 w-36 h-auto drop-shadow-xl"
                  />
                </div>

                {/* ── Desktop Close Row ── */}
                <div className="hidden md:flex items-center justify-end px-8 pt-8 pb-4">
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full bg-white border border-cream-200 flex items-center justify-center text-brown-light hover:text-brown hover:bg-cream-100 transition-colors shadow-sm"
                    aria-label="Close modal"
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Form Container */}
                <div className="px-6 md:px-8 pt-8 pb-8 md:pb-8 flex-grow flex flex-col justify-center bg-cream-50 rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative z-10 shadow-[0_-10px_40px_rgba(92,51,23,0.08)] md:shadow-none">
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        className="flex flex-col items-center text-center py-10 gap-6"
                      >
                        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center shadow-inner">
                          <CheckCircle size={56} className="text-green-500" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-brown" style={{ fontFamily: 'Georgia, serif' }}>You're on the list!</h3>
                          <p className="text-brown-light text-base mt-3 max-w-sm">
                            We'll notify you at <span className="font-semibold text-mustard">{form.email}</span> when iléSure launches.
                          </p>
                          <p className="text-brown text-sm mt-4 mb-2">
                            You can join us on our WhatsApp Channels for more updates:
                          </p>
                          <a 
                            href={form.role === 'user' ? "https://whatsapp.com/channel/0029VbDMd21AzNbuTNsKjs3k" : "https://whatsapp.com/channel/0029VbD6phnKbYMEgHVSgq2y"}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-mustard font-bold underline"
                          >
                            Follow the iléSure {form.role === 'user' ? 'Updates' : 'Renters'} channel
                          </a>
                        </div>
                        <PillButton variant="mustard" size="md" onClick={handleClose} className="mt-4 px-10">
                          Close
                        </PillButton>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 w-full max-w-sm mx-auto"
                      >
                        <div className="hidden md:block mb-2 text-center">
                          <h3 className="text-2xl font-bold text-brown mb-2" style={{ fontFamily: 'Georgia, serif' }}>Get Early Access</h3>
                          <p className="text-sm text-brown-light">Be the first to know when we go live.</p>
                        </div>

                        {/* Role Selector */}
                        <div className="flex gap-2 p-1 bg-cream-200 rounded-xl mb-2">
                          <button
                            type="button"
                            onClick={() => handleChange('role', 'user')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${form.role === 'user' ? 'bg-white text-brown shadow-sm' : 'text-brown-light hover:text-brown'}`}
                          >
                            I am looking for a home
                          </button>
                          <button
                            type="button"
                            onClick={() => handleChange('role', 'renter')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${form.role === 'renter' ? 'bg-white text-brown shadow-sm' : 'text-brown-light hover:text-brown'}`}
                          >
                            I want to list a home
                          </button>
                        </div>

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-brown uppercase tracking-widest pl-1">Full Name</label>
                          <div className="relative group">
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light group-focus-within:text-mustard transition-colors" strokeWidth={2} />
                            <input
                              type="text"
                              value={form.fullName}
                              onChange={e => handleChange('fullName', e.target.value)}
                              placeholder="e.g. Adaeze Okonkwo"
                              className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-sm text-brown placeholder-brown-light/50 outline-none border transition-all focus:border-mustard focus:ring-4 focus:ring-mustard/10 shadow-sm ${errors.fullName ? 'border-red-400' : 'border-cream-200 hover:border-cream-300'}`}
                            />
                          </div>
                          {errors.fullName && <span className="text-xs text-red-500 pl-1">{errors.fullName}</span>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-brown uppercase tracking-widest pl-1">Email Address</label>
                          <div className="relative group">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light group-focus-within:text-mustard transition-colors" strokeWidth={2} />
                            <input
                              type="email"
                              value={form.email}
                              onChange={e => handleChange('email', e.target.value)}
                              placeholder="you@example.com"
                              className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-sm text-brown placeholder-brown-light/50 outline-none border transition-all focus:border-mustard focus:ring-4 focus:ring-mustard/10 shadow-sm ${errors.email ? 'border-red-400' : 'border-cream-200 hover:border-cream-300'}`}
                            />
                          </div>
                          {errors.email && <span className="text-xs text-red-500 pl-1">{errors.email}</span>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Phone (optional) */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-brown uppercase tracking-widest pl-1">Phone Number</label>
                            <div className="relative group">
                              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light group-focus-within:text-mustard transition-colors" strokeWidth={2} />
                              <input
                                type="tel"
                                value={form.phone}
                                required
                                onChange={e => handleChange('phone', e.target.value)}
                                placeholder="+234..."
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-white shadow-sm text-sm text-brown placeholder-brown-light/50 outline-none border transition-all focus:border-mustard focus:ring-4 focus:ring-mustard/10 ${errors.phone ? 'border-red-400' : 'border-cream-200 hover:border-cream-300'}`}
                              />
                            </div>
                            {errors.phone && <span className="text-xs text-red-500 pl-1">{errors.phone}</span>}
                          </div>

                          {/* University / Location */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-brown uppercase tracking-widest pl-1 flex items-center gap-1.5">
                              University/Location <span className="text-[9px] text-brown-light/70 normal-case tracking-normal font-normal">(Optional)</span>
                            </label>
                            <div className="relative group">
                              <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light group-focus-within:text-mustard transition-colors" strokeWidth={2} />
                              <input
                                type="text"
                                value={form.university}
                                onChange={e => handleChange('university', e.target.value)}
                                placeholder="e.g. LCU or Lagos"
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-sm text-brown placeholder-brown-light/50 outline-none border transition-all focus:border-mustard focus:ring-4 focus:ring-mustard/10 shadow-sm ${errors.university ? 'border-red-400' : 'border-cream-200 hover:border-cream-300'}`}
                              />
                            </div>
                            {errors.university && <span className="text-xs text-red-500 pl-1">{errors.university}</span>}
                          </div>
                        </div>

                        {apiError && (
                          <div className="flex items-center gap-2 p-3 mt-1 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-100">
                            <AlertCircle size={14} className="flex-shrink-0" />
                            <span>{apiError}</span>
                          </div>
                        )}

                        <PillButton
                          type="submit"
                          variant="mustard"
                          size="lg"
                          fullWidth
                          disabled={submitting}
                          className="mt-4 shadow-xl shadow-mustard/20"
                          icon={submitting ? <Loader2 size={18} className="animate-spin" /> : undefined}
                        >
                          {submitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
                        </PillButton>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
