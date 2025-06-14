"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FadeInUp } from '@/components/animations/fade-in-up';
import emailjs from '@emailjs/browser';
import { cn } from '@/lib/utils';

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
  const [isMobile, setIsMobile] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to form on mobile when there's an error
  useEffect(() => {
    if (Object.keys(formErrors).length > 0 && isMobile && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [formErrors, isMobile]);

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

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
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

  // Enhanced styles with mobile-specific improvements
  const inputStyles = cn(
    "w-full px-4 py-3 border bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg",
    "focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition duration-200",
    isMobile && "text-base py-4" // Larger text and padding on mobile for better touch targets
  );
  
  const labelStyles = cn(
    "block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1",
    isMobile && "text-base mb-2" // Larger labels on mobile
  );
  
  const errorStyles = "text-red-500 text-xs mt-1";

  return (
    <FadeInUp>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {submitStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg",
              "text-green-700 dark:text-green-400",
              isMobile && "p-5 text-base"
            )}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Thank you for your message! I'll get back to you as soon as possible.
            </div>
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg",
              "text-red-700 dark:text-red-400",
              isMobile && "p-5 text-base"
            )}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              There was an error sending your message. Please try again or contact me directly via email.
            </div>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className={cn(focusedField === 'name' && "relative z-10")}>
            <label htmlFor="name" className={labelStyles}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              className={cn(
                inputStyles,
                formErrors.name ? 'border-red-500' : '',
                focusedField === 'name' && 'ring-2 ring-primary-500'
              )}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {formErrors.name && <p className={errorStyles}>{formErrors.name}</p>}
          </div>
          
          <div className={cn(focusedField === 'email' && "relative z-10")}>
            <label htmlFor="email" className={labelStyles}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className={cn(
                inputStyles,
                formErrors.email ? 'border-red-500' : '',
                focusedField === 'email' && 'ring-2 ring-primary-500'
              )}
              placeholder="Your email address"
              disabled={isSubmitting}
            />
            {formErrors.email && <p className={errorStyles}>{formErrors.email}</p>}
          </div>
        </div>
        
        <div className={cn(focusedField === 'subject' && "relative z-10")}>
          <label htmlFor="subject" className={labelStyles}>Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => handleFocus('subject')}
            onBlur={handleBlur}
            className={cn(
              inputStyles, 
              focusedField === 'subject' && 'ring-2 ring-primary-500'
            )}
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
        </div>
        
        <div className={cn(focusedField === 'projectType' && "relative z-10")}>
          <label htmlFor="projectType" className={labelStyles}>Project Type</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            onFocus={() => handleFocus('projectType')}
            onBlur={handleBlur}
            className={cn(
              inputStyles,
              "appearance-none bg-no-repeat",
              "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%3E%3Cpath%20fill%3D%22%23444444%22%20d%3D%22M10.3%203.3L6%207.6%201.7%203.3c-.4-.4-1-.4-1.4%200s-.4%201%200%201.4l5%205c.2.2.4.3.7.3s.5-.1.7-.3l5-5c.4-.4.4-1%200-1.4s-1-.4-1.4%200z%22%2F%3E%3C%2Fsvg%3E')]",
              "dark:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%3E%3Cpath%20fill%3D%22%23aaaaaa%22%20d%3D%22M10.3%203.3L6%207.6%201.7%203.3c-.4-.4-1-.4-1.4%200s-.4%201%200%201.4l5%205c.2.2.4.3.7.3s.5-.1.7-.3l5-5c.4-.4.4-1%200-1.4s-1-.4-1.4%200z%22%2F%3E%3C%2Fsvg%3E')]",
              "bg-[position:right_1rem_center] bg-[size:1.5em]",
              focusedField === 'projectType' && 'ring-2 ring-primary-500'
            )}
            disabled={isSubmitting}
          >
            <option value="podcast-editing">Podcast Editing</option>
            <option value="video-editing">Video Editing</option>
            <option value="audio-restoration">Audio Restoration</option>
            <option value="content-strategy">Content Strategy</option>
            <option value="equipment-setup">Equipment Setup</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className={cn(focusedField === 'message' && "relative z-10")}>
          <label htmlFor="message" className={labelStyles}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            className={cn(
              inputStyles, 
              "min-h-[120px] md:min-h-[150px]",
              formErrors.message ? 'border-red-500' : '',
              focusedField === 'message' && 'ring-2 ring-primary-500'
            )}
            placeholder="Tell me about your project"
            disabled={isSubmitting}
          ></textarea>
          {formErrors.message && <p className={errorStyles}>{formErrors.message}</p>}
        </div>

        <Button 
          type="submit" 
          variant="default" 
          size={isMobile ? "lg" : "default"}
          className={cn(
            "w-full md:w-auto",
            isMobile && "py-4 text-base min-h-[56px]" // Larger button on mobile
          )}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </FadeInUp>
  );
};
