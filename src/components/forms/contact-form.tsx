"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FadeInUp } from '@/components/animations/fade-in-up';
import emailjs from '@emailjs/browser';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'podcast-editing',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Try client-side EmailJS first
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
      
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          project_type: formData.projectType,
          to_name: 'Hridesh'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      
      console.log('EmailJS Success:', result);
      setSubmitStatus('success');
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        projectType: 'podcast-editing',
      });
      
    } catch (error: any) {
      console.error('Client-side EmailJS failed, trying server-side...', error);
      
      // Fallback to server-side API if client-side fails
      try {
        const response = await fetch('/api/test-emailjs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            project_type: formData.projectType
          }),
        });
        
        const result = await response.json();
        
        if (result.success) {
          console.log('Server-side EmailJS Success:', result);
          setSubmitStatus('success');
          
          // Reset form after success
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            projectType: 'podcast-editing',
          });
        } else {
          throw new Error(result.message);
        }
      } catch (serverError: any) {
        console.error('Both client and server EmailJS failed:', serverError);
        console.error('Error details:', {
          message: error.message,
          text: error.text,
          status: error.status
        });
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
      
      // Reset status after a delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const inputStyles = "w-full px-4 py-3 border bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition duration-200";
  const labelStyles = "block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1";
  const errorStyles = "text-red-500 text-xs mt-1";

  return (
    <FadeInUp>
      <form onSubmit={handleSubmit} className="space-y-6">
        {submitStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg text-green-700 dark:text-green-400"
          >
            Thank you for your message! I'll get back to you as soon as possible.
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg text-red-700 dark:text-red-400"
          >
            There was an error sending your message. Please try again or contact me directly via email.
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelStyles}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${inputStyles} ${formErrors.name ? 'border-red-500' : ''}`}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {formErrors.name && <p className={errorStyles}>{formErrors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className={labelStyles}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${inputStyles} ${formErrors.email ? 'border-red-500' : ''}`}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {formErrors.email && <p className={errorStyles}>{formErrors.email}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className={labelStyles}>Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputStyles}
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="projectType" className={labelStyles}>Project Type</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={inputStyles}
            disabled={isSubmitting}
          >
            <option value="podcast-editing">Podcast Editing</option>
            <option value="podcast-launch">Podcast Launch</option>
            <option value="video-editing">Video Editing</option>
            <option value="audio-restoration">Audio Restoration</option>
            <option value="distribution">Distribution & Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className={labelStyles}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`${inputStyles} ${formErrors.message ? 'border-red-500' : ''}`}
            placeholder="Tell me about your project and how I can help..."
            disabled={isSubmitting}
          />
          {formErrors.message && <p className={errorStyles}>{formErrors.message}</p>}
        </div>
        
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8"
            isAnimated
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </div>
      </form>
    </FadeInUp>
  );
};
