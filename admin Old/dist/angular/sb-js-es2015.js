(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sb-js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/sb/sb.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/sb/sb.js ***!
  \********************************************************************/
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
    comments: {
        lineComment: '\'',
    },
    brackets: [
        ['(', ')'], ['[', ']'],
        ['If', 'EndIf'],
        ['While', 'EndWhile'],
        ['For', 'EndFor'],
        ['Sub', 'EndSub']
    ],
    autoClosingPairs: [
        { open: '"', close: '"', notIn: ['string', 'comment'] },
        { open: '(', close: ')', notIn: ['string', 'comment'] },
        { open: '[', close: ']', notIn: ['string', 'comment'] },
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.sb',
    ignoreCase: true,
    brackets: [
        { token: 'delimiter.array', open: '[', close: ']' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        // Special bracket statement pairs
        { token: 'keyword.tag-if', open: 'If', close: 'EndIf' },
        { token: 'keyword.tag-while', open: 'While', close: 'EndWhile' },
        { token: 'keyword.tag-for', open: 'For', close: 'EndFor' },
        { token: 'keyword.tag-sub', open: 'Sub', close: 'EndSub' },
    ],
    keywords: [
        'Else', 'ElseIf', 'EndFor', 'EndIf', 'EndSub', 'EndWhile',
        'For', 'Goto', 'If', 'Step', 'Sub', 'Then', 'To', 'While'
    ],
    tagwords: [
        'If', 'Sub', 'While', 'For'
    ],
    operators: ['>', '<', '<>', '<=', '>=', 'And', 'Or', '+', '-', '*', '/', '='],
    // we include these common regular expressions
    identifier: /[a-zA-Z_][\w]*/,
    symbols: /[=><:+\-*\/%\.,]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // whitespace
            { include: '@whitespace' },
            // classes
            [/(@identifier)(?=[.])/, 'type'],
            // identifiers, tagwords, and keywords
            [/@identifier/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@operators': 'operator',
                        '@default': 'variable.name'
                    }
                }],
            // methods, properties, and events
            [/([.])(@identifier)/, {
                    cases: {
                        '$2': ['delimiter', 'type.member'],
                        '@default': ''
                    }
                }],
            // numbers
            [/\d*\.\d+/, 'number.float'],
            [/\d+/, 'number'],
            // delimiters and operators
            [/[()\[\]]/, '@brackets'],
            [/@symbols/, {
                    cases: {
                        '@operators': 'operator',
                        '@default': 'delimiter'
                    }
                }],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/(\').*$/, 'comment']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"C?/, 'string', '@pop']
        ],
    },
};


/***/ })

}]);
//# sourceMappingURL=sb-js-es2015.js.map