'use client';

import { useState, useEffect } from 'react';
import type { Locale } from '@/i18n/config';
import { defaultLocale } from '@/i18n/config';

type Messages = Record<string, any>;

export function useTranslations() {
  const [messages, setMessages] = useState<Messages>({});
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Get locale from localStorage
        const stored = localStorage.getItem('locale') as Locale;
        const currentLocale = stored || defaultLocale;
        setLocale(currentLocale);

        // Load messages
        const msgs = await import(`@/i18n/messages/${currentLocale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        const msgs = await import('@/i18n/messages/en.json');
        setMessages(msgs.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Simple parameter replacement
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, param) => {
        return params[param]?.toString() || `{${param}}`;
      });
    }

    return value;
  };

  return { t, locale, isLoading };
}
