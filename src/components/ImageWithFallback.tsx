import React from 'react';

type Props = {
  src: string;
  alt: string;
  webp?: string;
  avif?: string;
  className?: string;
  [key: string]: any;
};

const ImageWithFallback: React.FC<Props> = ({ src, alt, webp, avif, className = '', ...rest }) => (
  <picture>
    {avif && <source srcSet={avif} type="image/avif" />}
    {webp && <source srcSet={webp} type="image/webp" />}
    <img src={src} alt={alt} className={className} loading="lazy" {...rest} />
  </picture>
);

export default ImageWithFallback;
