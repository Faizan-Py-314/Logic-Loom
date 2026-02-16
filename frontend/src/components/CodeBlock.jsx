import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import tokyoNight from '../styles/tokyoNight';

const CodeBlock = ({ language, children }) => {
    const [copied, setCopied] = useState(false);
    const codeString = String(children).replace(/\n$/, '');
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // fallback for older browsers
      }
    };
  
    return (
      <div className="relative group my-4 code-block-wrapper max-w-[min(50rem,95vw)]">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 px-3 py-1.5 text-xs font-mono rounded-lg bg-neon-purple/20 border border-neon-purple/40  text-neon-purple hover:bg-neon-purple/30 hover:border-neon-purple/60 transition opacity-80 group-hover:opacity-100"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <SyntaxHighlighter
          style={tokyoNight}
          language={language}
          PreTag="div"
            customStyle={{
            margin: 0,
            padding: '1rem 1.25rem 1rem 1.25rem',
            paddingRight: '4rem',
            borderRadius: '0.75rem',
            fontSize: '0.9rem',
            background: '#1a1b26',
            border: '1px solid rgba(167, 139, 250, 0.25)',
            maxHeight: 'none',
            overflow: 'visible',
          }}
          codeTagProps={{ style: { fontFamily: 'Source Code Pro, Fira Code, monospace' } }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  };

export default CodeBlock