import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import emailjs from 'emailjs-com';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function openInNewTab(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function sendEmail(form) {
  const serviceId = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAIL_JS_USER_ID;

  if (!serviceId || !templateId || !userId) {
    const missing = [];
    if (!serviceId) missing.push('VITE_EMAIL_JS_SERVICE_ID');
    if (!templateId) missing.push('VITE_EMAIL_JS_TEMPLATE_ID');
    if (!userId) missing.push('VITE_EMAIL_JS_USER_ID');
    return Promise.reject(
      new Error(
        `Missing EmailJS configuration: ${missing.join(', ')}. Please verify your .env file or environment variables.`
      )
    );
  }

  const formElement = form?.target || form;
  return emailjs.sendForm(serviceId, templateId, formElement, userId);
}