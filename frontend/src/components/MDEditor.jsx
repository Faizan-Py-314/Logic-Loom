import React from 'react'
import ReactMarkdown from 'react-markdown';

const MDEditor = ({ value, onChange, placeholder = 'Write your markdown here...' }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label className="block text-[#c4b5fd] font-mono text-sm font-semibold mb-3">Markdown Content</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full flex-1 min-h-[480px] px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-xl text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple font-mono text-sm resize-y"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-[#c4b5fd] font-mono text-sm font-semibold mb-3">Live Preview</label>
        <div
          className="w-full flex-1 min-h-[480px] px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-xl text-[#e0e0ff] text-sm overflow-auto [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_p]:my-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_code]:bg-black/50 [&_code]:px-1 [&_pre]:bg-black/50 [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto"
        >
          <ReactMarkdown>{value || '*No content yet*'}</ReactMarkdown>
        </div>
      </div>
    </div>
  );

export default MDEditor
