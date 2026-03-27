import React, { useEffect, useRef } from 'react';

export default function Comments(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent multiple injections in React 18 Strict Mode
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // Set all Giscus parameters as data-attributes
    script.setAttribute('data-repo', 'aminul01-g/aminul01-g.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOLqQqXg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOLqQqXs4CbqQq');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(script);
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div ref={ref} className="giscus" />
    </div>
  );
}
