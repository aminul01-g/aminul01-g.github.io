
import { PortableTextBlock, PortableTextSpan } from '../data/blog';

export function calculateReadingTime(blocks: PortableTextBlock[] | undefined): string {
    if (!blocks) return '1 min read';

    let wordCount = 0;

    blocks.forEach((block) => {
        if (block._type === 'block' && block.children) {
            block.children.forEach((child: PortableTextSpan) => {
                if (child.text) {
                    wordCount += child.text.split(/\s+/).length;
                }
            });
        }
    });

    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
}
