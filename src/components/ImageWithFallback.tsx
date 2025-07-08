import React, { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  webp?: string;
  avif?: string;
  className?: string;
};

const ImageWithFallback: React.FC<Props> = ({ src, alt, webp, avif, className = '', ...rest }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <picture>
      {!imgError && avif && <source srcSet={avif} type="image/avif" />}
      {!imgError && webp && <source srcSet={webp} type="image/webp" />}
      <img
        src={imgError ? src : src}
        alt={alt}
        className={className}
        loading="lazy"
        onError={() => setImgError(true)}
        {...rest}
      />
    </picture>
  );
};

export default ImageWithFallback;
