import MarkdownIt from "markdown-it";
import yaml from "js-yaml";
import markdownItFrontMatter from "markdown-it-front-matter";
import hljs from "highlight.js";
import katex from "katex";
import 'katex/dist/katex.min.css';

export default function renderMarkdown(markdown) {
    const md = new MarkdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (__) {}
            }
            return ''; // use external default escaping
          }
    });

    let frontMatter = null;
    md.use(markdownItFrontMatter, (fm) => {
        frontMatter = yaml.load(fm);
    });

    md.renderer.rules.math_block = function (tokens, idx) {
        return katex.renderToString(tokens[idx].content, {
          throwOnError: false,
          displayMode: true,
        });
      };

      md.inline.ruler.after('escape', 'math_inline', function(state, silent) {
        var startMathPos = state.pos;
        if (state.src[startMathPos] !== '$') { return false; }
        var endMathPos = state.src.indexOf('$', startMathPos + 1);
        if (endMathPos === -1) { return false; }
        if (!silent) {
          var token = state.push('math_inline', 'math', 0);
          token.markup  = state.src.slice(startMathPos, endMathPos + 1);
          token.content = state.src.slice(startMathPos + 1, endMathPos);
        }
        state.pos = endMathPos + 1;
        return true;
      });

      md.renderer.rules.math_inline = function(tokens, idx) {
        return katex.renderToString(tokens[idx].content, {
          throwOnError: false,
          displayMode: false,
        });
      };

      md.inline.ruler.after('escape', 'math_inline_double', function(state, silent) {
        var startMathPos = state.pos;
        if (state.src.substr(startMathPos, 2) !== '$$') { return false; }
        var endMathPos = state.src.indexOf('$$', startMathPos + 2);
        if (endMathPos === -1) { return false; }
        if (!silent) {
          var token = state.push('math_inline_double', 'math', 0);
          token.markup  = state.src.slice(startMathPos, endMathPos + 2);
          token.content = state.src.slice(startMathPos + 2, endMathPos);
        }
        state.pos = endMathPos + 2;
        return true;
      });

      md.renderer.rules.math_inline_double = function(tokens, idx) {
        return katex.renderToString(tokens[idx].content, {
          throwOnError: false,
          displayMode: true,
        });
      };

      return {
        html: md.render(markdown),
        frontMatter: frontMatter,
      };
}