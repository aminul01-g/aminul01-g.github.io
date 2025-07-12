import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  priority?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  fallbackSrc = '/images/placeholder.png',
  priority = false
}: ImageWithFallbackProps): React.ReactElement {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
    onError?.();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      )}
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${hasError ? 'hidden' : ''}`}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        aria-hidden={hasError}
      />
      {/* Screen reader text for loading state */}
      {isLoading && (
        <span className="sr-only">Loading image: {alt}</span>
      )}
      {/* Screen reader text for error state */}
      {hasError && (
        <span className="sr-only">Failed to load image: {alt}</span>
      )}
    </div>
  );
}