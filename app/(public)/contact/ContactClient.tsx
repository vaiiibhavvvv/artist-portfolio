'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Phone, Mail, MessageCircle, CheckCircle, Send } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const contactDetails = [
  {
    icon: MapPin,
    label: 'Studio Address',
    value: '123 Art District, Studio Lane\nNew York, NY 10001',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (123) 456-7890',
    href: 'tel:+11234567890',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@arianasilva.art',
    href: 'mailto:hello@arianasilva.art',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (123) 456-7890',
    href: 'https://wa.me/1234567890',
  },
]

function FormField({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#4E342E] mb-1.5 tracking-wide">{label}</label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        reset()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-[#4E342E]/15 bg-[#f8f5f0] text-[#4E342E] placeholder-[#6D4C41]/40 focus:outline-none focus:border-[#FF8C42] focus:ring-1 focus:ring-[#FF8C42]/20 transition-all duration-300 text-sm'

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#2C1A16]">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 40%, #FF8C42 0%, transparent 55%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#FF8C42] text-xs tracking-widest uppercase mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-elegant text-white/60 text-xl italic"
          >
            Every great artwork begins with a conversation
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-12 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <Reveal>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#4E342E]/5">
              <h2 className="font-display text-3xl font-bold text-[#4E342E] mb-2">Send a Message</h2>
              <p className="text-[#6D4C41]/60 text-sm mb-8">I typically respond within 24 hours</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4E342E] to-[#FF8C42] flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={36} className="text-white" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-[#4E342E] mb-2">Message Sent!</h3>
                    <p className="text-[#6D4C41]/70 mb-6">Thank you for reaching out. I&apos;ll get back to you shortly.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-[#4E342E]/20 text-[#4E342E] text-sm hover:bg-[#f8f5f0] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Your Name *" error={errors.name?.message}>
                        <input
                          {...register('name')}
                          placeholder="Ariana Silva"
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Email Address *" error={errors.email?.message}>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <FormField label="Phone Number (optional)" error={errors.phone?.message}>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className={inputClass}
                      />
                    </FormField>

                    <FormField label="Your Message *" error={errors.message?.message}>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="Tell me about your project, commission idea, or question..."
                        className={`${inputClass} resize-none`}
                      />
                    </FormField>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white text-sm tracking-wide transition-all duration-300 disabled:opacity-70"
                      style={{
                        background: 'linear-gradient(135deg, #4E342E, #FF8C42)',
                        boxShadow: '0 4px 20px rgba(255, 140, 66, 0.3)',
                      }}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Right side */}
          <div className="space-y-6">
            {/* Contact details */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#4E342E]/5">
                <h3 className="font-display text-xl font-bold text-[#4E342E] mb-6">Contact Details</h3>
                <div className="space-y-5">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FF8C42]/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[#FF8C42]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6D4C41]/50 uppercase tracking-widest mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[#4E342E] text-sm hover:text-[#FF8C42] transition-colors whitespace-pre-line">
                            {value}
                          </a>
                        ) : (
                          <p className="text-[#4E342E] text-sm whitespace-pre-line">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden h-72 shadow-sm border border-[#4E342E]/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.697403441436724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1647881629842!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Social */}
            <Reveal delay={0.3}>
              <div className="bg-gradient-to-br from-[#4E342E] to-[#3E2723] rounded-3xl p-8">
                <h3 className="font-display text-white text-xl font-bold mb-2">Follow the Journey</h3>
                <p className="text-white/60 text-sm mb-5">See works-in-progress, exhibitions, and studio life</p>
                <div className="flex gap-3">
                  {['Instagram', 'Facebook', 'YouTube'].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="flex-1 py-2 text-center text-xs text-white/70 hover:text-[#FF8C42] border border-white/15 hover:border-[#FF8C42]/50 rounded-xl transition-all duration-300"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
