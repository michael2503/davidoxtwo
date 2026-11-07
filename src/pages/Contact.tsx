import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Twitter,
  Github,
  Facebook,
} from 'lucide-react';
import { submitContactMessage } from '../services/contactService.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  email: z
    .string()
    .email('Please enter a valid corporate or personal email address')
    .max(100, 'Email must not exceed 100 characters'),
  phone: z
    .string()
    .max(30, 'Phone number must not exceed 30 characters')
    .optional()
    .or(z.literal('')),
  companyName: z
    .string()
    .max(120, 'Company name must not exceed 120 characters')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(150, 'Subject must not exceed 150 characters'),
  service: z
    .string()
    .min(2, 'Please select a service of interest'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(4000, 'Message must not exceed 4000 characters'),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialService = searchParams.get('service') || 'Web Application Development';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      subject: '',
      service: initialService,
      message: '',
    },
  });

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setValue('service', serviceParam);
      setValue('subject', `Enquiry regarding ${serviceParam}`);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormInputs) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitContactMessage({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        companyName: data.companyName || '',
        subject: data.subject,
        service: data.service,
        message: data.message,
      });

      setIsSubmittedSuccessfully(true);
      toast.success('Your message has been received successfully! Our team will get back to you shortly.');

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback if canvas is unavailable
      }

      reset();
    } catch (err: any) {
      console.error('Contact submission error:', err);
      const errText =
        err?.message || 'We could not submit your message at this time. Please check your network or try again.';
      setErrorMessage(errText);
      toast.error('Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Page Header */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0D6EFD] border border-blue-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0D6EFD]" />
              Connect With Davidox Limited
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071B3A] tracking-tight font-heading leading-tight">
              Let&apos;s Talk About Your Next Project
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Have an upcoming initiative or want to explore how our enterprise IT solutions can accelerate your operations? Reach out to our technical team today.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#071B3A] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-blue-900/60">
              <div className="absolute top-0 right-0 w-52 h-52 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                    Reach Out Directly
                  </span>
                  <h2 className="text-2xl font-bold font-heading text-white mt-1">
                    Corporate Contact Details
                  </h2>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Our solution architects are available for consultations, technical audits, and RFP reviews.
                </p>

                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400">Email Address</div>
                      <a
                        href="mailto:info@davidoxlimited.com"
                        className="text-sm sm:text-base font-bold text-white hover:text-blue-300 transition-colors"
                      >
                        info@davidoxlimited.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400">Phone Support</div>
                      <a
                        href="tel:+2348003284369"
                        className="text-sm sm:text-base font-bold text-white hover:text-blue-300 transition-colors"
                      >
                        +234 (0) 800 328 4369
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400">Office Location</div>
                      <div className="text-sm text-white font-medium">
                        Plot 14B Tech Horizon Boulevard, Victoria Island, Lagos
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/20">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400">Business Hours</div>
                      <div className="text-sm text-white font-medium">
                        Monday – Friday: 8:00 AM – 6:00 PM (WAT / GMT)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60">
                  <div className="text-xs text-slate-400 mb-3">Connect on Social Channels</div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0D6EFD] text-white flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0D6EFD] text-white flex items-center justify-center transition-colors"
                      aria-label="Twitter / X"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0D6EFD] text-white flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0D6EFD] text-white flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#071B3A]">Guaranteed Rapid SLA Response</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every enquiry is routed directly to a dedicated solution engineer within 24 business hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm relative">
            {isSubmittedSuccessfully ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-[#071B3A] font-heading">
                  Enquiry Received Successfully!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
                  Thank you for contacting Davidox Limited. Your message has been received successfully.
                  Our team will review your enquiry and get back to you shortly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSubmittedSuccessfully(false)}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-[#0D6EFD] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Submit Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div>
                  <h2 className="text-2xl font-bold text-[#071B3A] font-heading">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Fill out the form below and our team will get back to you promptly.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Submission Failed</p>
                      <p className="text-xs mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="e.g. Michael Omotosho"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="e.g. client@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
                        errors.email
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="e.g. +234 800 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      {...register('companyName')}
                      placeholder="e.g. Apex Global Ltd"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.companyName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('subject')}
                      placeholder="e.g. Enterprise Cloud Migration"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
                        errors.subject
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Service of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('service')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-colors focus:outline-none ${
                        errors.service
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100'
                      }`}
                    >
                      <option value="">-- Select a Service --</option>
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="General IT Advisory & Partnership">
                        General IT Advisory & Partnership
                      </option>
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    {...register('message')}
                    placeholder="Tell us about your project requirements, timeline, target goals, or any current infrastructure challenges..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none resize-y ${
                      errors.message
                        ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:border-[#0D6EFD] focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-[#0D6EFD] hover:bg-blue-700 shadow-md hover:shadow-lg transition-all text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message to Davidox Limited...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-3">
                    Your information is protected under enterprise confidentiality. We never share client records with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
