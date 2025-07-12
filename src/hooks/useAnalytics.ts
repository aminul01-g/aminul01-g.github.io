import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export const useAnalytics = (): {
  trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  trackPageView: (pagePath: string, pageTitle?: string) => void;
  trackProjectView: (projectTitle: string) => void;
  trackBlogView: (postTitle: string) => void;
  trackDownload: (fileType: string) => void;
  trackContact: (method: string) => void;
  trackThemeToggle: (theme: string) => void;
} => {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-QCPHW6FQ6F', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  };

  const trackProjectView = (projectTitle: string) => {
    trackEvent('project_view', 'engagement', projectTitle);
  };

  const trackBlogView = (postTitle: string) => {
    trackEvent('blog_view', 'engagement', postTitle);
  };

  const trackDownload = (fileType: string) => {
    trackEvent('download', 'engagement', fileType);
  };

  const trackContact = (method: string) => {
    trackEvent('contact', 'engagement', method);
  };

  const trackThemeToggle = (theme: string) => {
    trackEvent('theme_toggle', 'preferences', theme);
  };

  return {
    trackEvent,
    trackPageView,
    trackProjectView,
    trackBlogView,
    trackDownload,
    trackContact,
    trackThemeToggle,
  };
};

export const usePageTracking = (pagePath: string, pageTitle?: string): void => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pagePath, pageTitle);
  }, [pagePath, pageTitle, trackPageView]);
};
