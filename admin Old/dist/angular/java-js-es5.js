(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["java-js"], {
  /***/
  "./node_modules/monaco-editor/esm/vs/basic-languages/java/java.js":
  /*!************************************************************************!*\
    !*** ./node_modules/monaco-editor/esm/vs/basic-languages/java/java.js ***!
    \************************************************************************/

  /*! exports provided: conf, language */

  /***/
  function node_modulesMonacoEditorEsmVsBasicLanguagesJavaJavaJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "conf", function () {
      return conf;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "language", function () {
      return language;
    });
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/


    var conf = {
      // the default separators except `@$`
      wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      },
      brackets: [['{', '}'], ['[', ']'], ['(', ')']],
      autoClosingPairs: [{
        open: '{',
        close: '}'
      }, {
        open: '[',
        close: ']'
      }, {
        open: '(',
        close: ')'
      }, {
        open: '"',
        close: '"'
      }, {
        open: '\'',
        close: '\''
      }],
      surroundingPairs: [{
        open: '{',
        close: '}'
      }, {
        open: '[',
        close: ']'
      }, {
        open: '(',
        close: ')'
      }, {
        open: '"',
        close: '"'
      }, {
        open: '\'',
        close: '\''
      }, {
        open: '<',
        close: '>'
      }],
      folding: {
        markers: {
          start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
          end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")
        }
      }
    };
    var language = {
      defaultToken: '',
      tokenPostfix: '.java',
      keywords: ['abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default', 'goto', 'package', 'synchronized', 'boolean', 'do', 'if', 'private', 'this', 'break', 'double', 'implements', 'protected', 'throw', 'byte', 'else', 'import', 'public', 'throws', 'case', 'enum', 'instanceof', 'return', 'transient', 'catch', 'extends', 'int', 'short', 'try', 'char', 'final', 'interface', 'static', 'void', 'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while', 'true', 'false'],
      operators: ['=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='],
      // we include these common regular expressions
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      digits: /\d+(_+\d+)*/,
      octaldigits: /[0-7]+(_+[0-7]+)*/,
      binarydigits: /[0-1]+(_+[0-1]+)*/,
      hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
      // The main tokenizer for our languages
      tokenizer: {
        root: [// identifiers and keywords
        [/[a-zA-Z_$][\w$]*/, {
          cases: {
            '@keywords': {
              token: 'keyword.$0'
            },
            '@default': 'identifier'
          }
        }], // whitespace
        {
          include: '@whitespace'
        }, // delimiters and operators
        [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
          cases: {
            '@operators': 'delimiter',
            '@default': ''
          }
        }], // @ annotations.
        [/@\s*[a-zA-Z_\$][\w\$]*/, 'annotation'], // numbers
        [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'], [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'], [/0[xX](@hexdigits)[Ll]?/, 'number.hex'], [/0(@octaldigits)[Ll]?/, 'number.octal'], [/0[bB](@binarydigits)[Ll]?/, 'number.binary'], [/(@digits)[fFdD]/, 'number.float'], [/(@digits)[lL]?/, 'number'], // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'], // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, 'string', '@string'], // characters
        [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
        whitespace: [[/[ \t\r\n]+/, ''], [/\/\*\*(?!\/)/, 'comment.doc', '@javadoc'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
        comment: [[/[^\/*]+/, 'comment'], // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
        // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
        [/\*\//, 'comment', '@pop'], [/[\/*]/, 'comment']],
        //Identical copy of comment above, except for the addition of .doc
        javadoc: [[/[^\/*]+/, 'comment.doc'], // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
        [/\/\*/, 'comment.doc.invalid'], [/\*\//, 'comment.doc', '@pop'], [/[\/*]/, 'comment.doc']],
        string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, 'string', '@pop']]
      }
    };
    /***/
  }
}]);
//# sourceMappingURL=java-js-es5.js.map