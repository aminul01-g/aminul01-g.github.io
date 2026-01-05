
import os
from PIL import Image

def optimize_images(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                print(f"Optimizing {file_path}...")
                
                try:
                    img = Image.open(file_path)
                    
                    # Resize if too large (max width 1200px)
                    max_width = 1200
                    if img.width > max_width:
                        ratio = max_width / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        print(f"Resized image to {max_width}x{new_height}")

                    # Convert to WebP
                    webp_path = os.path.splitext(file_path)[0] + '.webp'
                    img.save(webp_path, 'WEBP', quality=75)
                    
                    print(f"Saved optimized image to {webp_path}")
                except Exception as e:
                    print(f"Failed to optimize {file_path}: {e}")

if __name__ == "__main__":
    optimize_images('/home/aminul/Documents/p/project/portfolio/aminul01-g.github.io/public/images')
