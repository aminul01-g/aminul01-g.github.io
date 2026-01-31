# Optimized Images Directory

This directory should contain optimized versions of images used throughout the website.

## Required Images:

- `profile.webp` / `profile.avif` - Profile picture optimized versions
- `github-profile.webp` / `github-profile.avif` - GitHub profile image optimized versions

## How to add optimized images:

1. Convert your original images to WebP and AVIF formats
2. Place them in this directory
3. Update the ImageWithFallback components to reference these optimized versions

## Tools for image optimization:

- Use online converters like CloudConvert
- Use command-line tools like `cwebp` and `avifenc`
- Use build tools like `sharp` or `imagemin`
