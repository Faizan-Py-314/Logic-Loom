// Tokyo Night theme for Prism (react-syntax-highlighter)
// Colors: https://github.com/enkia/tokyo-night-vscode-theme
const bg = '#1a1b26';
const fg = '#c0caf5';
const comment = '#565f89';
const keyword = '#bb9af7';
const string = '#9ece6a';
const function_ = '#7aa2f7';
const number = '#ff9e64';
const operator = '#89ddff';
const purple = '#bb9af7';
const red = '#f7768e';
const yellow = '#e0af68';
const cyan = '#7dcfff';

export default {
  'code[class*="language-"]': {
    background: bg,
    color: fg,
    fontFamily: '"Fira Code", "Source Code Pro", Menlo, Consolas, monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.6',
    tabSize: 2,
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    background: bg,
    color: fg,
    fontFamily: '"Fira Code", "Source Code Pro", Menlo, Consolas, monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.6',
    tabSize: 2,
    padding: '1rem 1.25rem',
    margin: '1rem 0',
    overflow: 'visible',
    maxHeight: 'none',
    borderRadius: '0.75rem',
  },
  'div[class*="language-"]': {
    background: bg,
    color: fg,
    overflow: 'visible',
    maxHeight: 'none',
  },
  'comment': { color: comment, fontStyle: 'italic' },
  'prolog': { color: comment },
  'cdata': { color: comment },
  'doctype': { color: fg },
  'punctuation': { color: fg },
  'entity': { color: fg },
  'attr-name': { color: yellow },
  'class-name': { color: yellow },
  'boolean': { color: number },
  'constant': { color: number },
  'number': { color: number },
  'atrule': { color: yellow },
  'keyword': { color: keyword },
  'property': { color: red },
  'tag': { color: red },
  'symbol': { color: red },
  'deleted': { color: red },
  'important': { color: red },
  'selector': { color: string },
  'string': { color: string },
  'char': { color: string },
  'builtin': { color: cyan },
  'inserted': { color: string },
  'regex': { color: string },
  'attr-value': { color: string },
  'variable': { color: fg },
  'operator': { color: operator },
  'function': { color: function_ },
  'url': { color: cyan },
  'bold': { fontWeight: 'bold' },
  'italic': { fontStyle: 'italic' },
};
