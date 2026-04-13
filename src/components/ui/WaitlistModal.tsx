import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, User, Mail, Phone, GraduationCap, Loader2 } from 'lucide-react';
import { PillButton } from './PillButton';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;

}

interface FormData {
  name: string;
  email: string;
  phone: string;
  university: string;
}

const initialForm: FormData = { name: '', email: '', phone: '', university: '' };

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Your name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.university.trim()) e.university = 'Please enter your university';
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
    // Simulate API call
    await new Promise(r => setTimeout(r, 1600));
    setSubmitting(false);
    setSuccess(true);
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
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md bg-white rounded-clay-lg shadow-clay-lg relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full bg-mustard-grad" />

              {/* Header */}
              <div className="flex items-start justify-between px-7 pt-6 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-brown">Join the Waitlist</h2>
                  <p className="text-sm text-brown-light mt-1">
                    Be first to know when iléSure goes live.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-brown-light hover:text-brown hover:bg-cream-dark transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Body */}
              <div className="px-7 pb-7">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="flex flex-col items-center text-center py-8 gap-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle size={44} className="text-green-500" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brown">You're on the list!</h3>
                        <p className="text-brown-light text-sm mt-2 max-w-xs">
                          We'll notify you at <span className="font-semibold text-mustard">{form.email}</span> when iléSure launches. Spread the word!
                        </p>
                      </div>
                      <PillButton variant="mustard" size="sm" onClick={handleClose} className="mt-2">
                        Close
                      </PillButton>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 mt-2"
                    >
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-brown uppercase tracking-wide">Full Name</label>
                        <div className="relative">
                          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light" strokeWidth={2} />
                          <input
                            type="text"
                            value={form.name}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="e.g. Adaeze Okonkwo"
                            className={`w-full pl-10 pr-4 py-3 rounded-clay-sm bg-cream text-sm text-brown placeholder-brown-light/60 outline-none border transition-all focus:border-mustard focus:ring-2 focus:ring-mustard/20 ${errors.name ? 'border-red-400' : 'border-cream-200'}`}
                          />
                        </div>
                        {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-brown uppercase tracking-wide">Email Address</label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light" strokeWidth={2} />
                          <input
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            placeholder="you@example.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-clay-sm bg-cream text-sm text-brown placeholder-brown-light/60 outline-none border transition-all focus:border-mustard focus:ring-2 focus:ring-mustard/20 ${errors.email ? 'border-red-400' : 'border-cream-200'}`}
                          />
                        </div>
                        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                      </div>

                      {/* Phone (optional) */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-brown uppercase tracking-wide">Phone Number <span className="text-brown-light font-normal normal-case">(optional)</span></label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light" strokeWidth={2} />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                            placeholder="+234 800 000 0000"
                            className="w-full pl-10 pr-4 py-3 rounded-clay-sm bg-cream border border-cream-200 text-sm text-brown placeholder-brown-light/60 outline-none transition-all focus:border-mustard focus:ring-2 focus:ring-mustard/20"
                          />
                        </div>
                      </div>

                      {/* University */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-brown uppercase tracking-wide">University / Institution</label>
                        <div className="relative">
                          <GraduationCap size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light" strokeWidth={2} />
                          <input
                            type="text"
                            value={form.university}
                            onChange={e => handleChange('university', e.target.value)}
                            placeholder="e.g. Lead City University"
                            className={`w-full pl-10 pr-4 py-3 rounded-clay-sm bg-cream text-sm text-brown placeholder-brown-light/60 outline-none border transition-all focus:border-mustard focus:ring-2 focus:ring-mustard/20 ${errors.university ? 'border-red-400' : 'border-cream-200'}`}
                          />
                        </div>
                        {errors.university && <span className="text-xs text-red-500">{errors.university}</span>}
                      </div>

                      <PillButton
                        type="submit"
                        variant="mustard"
                        size="md"
                        fullWidth
                        disabled={submitting}
                        className="mt-2"
                        icon={submitting ? <Loader2 size={16} className="animate-spin" /> : undefined}
                      >
                        {submitting ? 'Joining Waitlist...' : 'Join Early Access Waitlist'}
                      </PillButton>

                      <p className="text-center text-xs text-brown-light">
                        No spam. We only send launch updates.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
