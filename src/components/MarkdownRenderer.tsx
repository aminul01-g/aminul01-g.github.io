import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Interactive Components to embed
import Button from './Button';
import { InteractiveCounter } from './blog/InteractiveDemo';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const lang = match ? match[1] : '';

          // 1. Handle Interactive Components
          if (lang === 'interactive') {
             const componentName = String(children).trim();
             if (componentName === '<Counter />') {
               return <InteractiveCounter />;
             }
             if (componentName === '<Button />') {
                 return <Button variant="primary">Demo Button</Button>;
             }
             return <div className="text-red-500">Unknown component: {componentName}</div>;
          }

          // 2. Syntax Highlighting for standard code
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={lang}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
