(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["restructuredtext-js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/restructuredtext/restructuredtext.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/restructuredtext/restructuredtext.js ***!
  \************************************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var conf = {
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '<', close: '>', notIn: ['string'] }
    ],
    surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '`', close: '`' },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*<!--\\s*#?region\\b.*-->"),
            end: new RegExp("^\\s*<!--\\s*#?endregion\\b.*-->")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.rst',
    control: /[\\`*_\[\]{}()#+\-\.!]/,
    escapes: /\\(?:@control)/,
    empty: [
        'area', 'base', 'basefont', 'br', 'col', 'frame',
        'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param'
    ],
    alphanumerics: /[A-Za-z0-9]/,
    alphanumericsplus: /[A-Za-z0-9-_+:.]/,
    simpleRefNameWithoutBq: /(?:@alphanumerics@alphanumericsplus*@alphanumerics)+|(?:@alphanumerics+)/,
    simpleRefName: /(?:`@simpleRefNameWithoutBq`|@simpleRefNameWithoutBq)/,
    phrase: /@simpleRefName(?:\s@simpleRefName)*/,
    citationName: /[A-Za-z][A-Za-z0-9-_.]*/,
    blockLiteralStart: /(?:[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]|[\s])/,
    precedingChars: /(?:[ -:/'"<([{])/,
    followingChars: /(?:[ -.,:;!?/'")\]}>]|$)/,
    punctuation: /(=|-|~|`|#|"|\^|\+|\*|:|\.|'|_|\+)/,
    tokenizer: {
        root: [
            //sections
            [/^(@punctuation{3,}$){1,1}?/, 'keyword'],
            //line-blocks
            //No rules on it
            //bullet-lists
            [/^\s*([\*\-+‣•]|[a-zA-Z0-9]+\.|\([a-zA-Z0-9]+\)|[a-zA-Z0-9]+\))\s/, 'keyword'],
            //literal-blocks
            [/([ ]::)\s*$/, 'keyword', '@blankLineOfLiteralBlocks'],
            [/(::)\s*$/, 'keyword', '@blankLineOfLiteralBlocks'],
            { include: '@tables' },
            { include: '@explicitMarkupBlocks' },
            { include: '@inlineMarkup' },
        ],
        explicitMarkupBlocks: [
            //citations
            { include: '@citations' },
            //footnotes
            { include: '@footnotes' },
            //directives
            [/^(\.\.\s)(@simpleRefName)(::\s)(.*)$/, [{ token: '', next: 'subsequentLines' }, 'keyword', '', '']],
            //hyperlink-targets
            [/^(\.\.)(\s+)(_)(@simpleRefName)(:)(\s+)(.*)/, [{ token: '', next: 'hyperlinks' }, '', '', 'string.link', '', '', 'string.link']],
            //anonymous-hyperlinks
            [/^((?:(?:\.\.)(?:\s+))?)(__)(:)(\s+)(.*)/, [{ token: '', next: 'subsequentLines' }, '', '', '', 'string.link']],
            [/^(__\s+)(.+)/, ['', 'string.link']],
            //substitution-definitions
            [/^(\.\.)( \|)([^| ]+[^|]*[^| ]*)(\| )(@simpleRefName)(:: .*)/, [{ token: '', next: 'subsequentLines' }, '', 'string.link', '', 'keyword', ''], '@rawBlocks'],
            [/(\|)([^| ]+[^|]*[^| ]*)(\|_{0,2})/, ['', 'string.link', '']],
            //comments
            [/^(\.\.)([ ].*)$/, [{ token: '', next: '@comments' }, 'comment']],
        ],
        inlineMarkup: [
            { include: '@citationsReference' },
            { include: '@footnotesReference' },
            //hyperlink-references
            [/(@simpleRefName)(_{1,2})/, ['string.link', '']],
            //embedded-uris-and-aliases
            [/(`)([^<`]+\s+)(<)(.*)(>)(`)(_)/, ['', 'string.link', '', 'string.link', '', '', '']],
            //emphasis
            [/\*\*([^\\*]|\*(?!\*))+\*\*/, 'strong'],
            [/\*[^*]+\*/, 'emphasis'],
            //inline-literals
            [/(``)((?:[^`]|\`(?!`))+)(``)/, ['', 'keyword', '']],
            [/(__\s+)(.+)/, ['', 'keyword']],
            //interpreted-text
            [/(:)((?:@simpleRefNameWithoutBq)?)(:`)([^`]+)(`)/, ['', 'keyword', '', '', '']],
            [/(`)([^`]+)(`:)((?:@simpleRefNameWithoutBq)?)(:)/, ['', '', '', 'keyword', '']],
            [/(`)([^`]+)(`)/, ''],
            //inline-internal-targets
            [/(_`)(@phrase)(`)/, ['', 'string.link', '']],
        ],
        citations: [
            [/^(\.\.\s+\[)((?:@citationName))(\]\s+)(.*)/, [{ token: '', next: '@subsequentLines' }, 'string.link', '', '']],
        ],
        citationsReference: [
            [/(\[)(@citationName)(\]_)/, ['', 'string.link', '']],
        ],
        footnotes: [
            [/^(\.\.\s+\[)((?:[0-9]+))(\]\s+.*)/, [{ token: '', next: '@subsequentLines' }, 'string.link', '']],
            [/^(\.\.\s+\[)((?:#@simpleRefName?))(\]\s+)(.*)/, [{ token: '', next: '@subsequentLines' }, 'string.link', '', '']],
            [/^(\.\.\s+\[)((?:\*))(\]\s+)(.*)/, [{ token: '', next: '@subsequentLines' }, 'string.link', '', '']],
        ],
        footnotesReference: [
            [/(\[)([0-9]+)(\])(_)/, ['', 'string.link', '', '']],
            [/(\[)(#@simpleRefName?)(\])(_)/, ['', 'string.link', '', '']],
            [/(\[)(\*)(\])(_)/, ['', 'string.link', '', '']]
        ],
        blankLineOfLiteralBlocks: [
            [/^$/, '', '@subsequentLinesOfLiteralBlocks'],
            [/^.*$/, '', '@pop'],
        ],
        subsequentLinesOfLiteralBlocks: [
            [/(@blockLiteralStart+)(.*)/, ['keyword', '']],
            [/^(?!blockLiteralStart)/, '', '@popall']
        ],
        subsequentLines: [
            [/^[\s]+.*/, ''],
            [/^(?!\s)/, '', '@pop'],
        ],
        hyperlinks: [
            [/^[\s]+.*/, 'string.link'],
            [/^(?!\s)/, '', '@pop'],
        ],
        comments: [
            [/^[\s]+.*/, 'comment'],
            [/^(?!\s)/, '', '@pop'],
        ],
        tables: [
            [/\+-[+-]+/, 'keyword'],
            [/\+=[+=]+/, 'keyword'],
        ],
    }
};


/***/ })

}]);
//# sourceMappingURL=restructuredtext-js-es2015.js.map