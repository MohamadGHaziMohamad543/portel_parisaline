(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pascal-js"], {
  /***/
  "./node_modules/monaco-editor/esm/vs/basic-languages/pascal/pascal.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/monaco-editor/esm/vs/basic-languages/pascal/pascal.js ***!
    \****************************************************************************/

  /*! exports provided: conf, language */

  /***/
  function node_modulesMonacoEditorEsmVsBasicLanguagesPascalPascalJs(module, __webpack_exports__, __webpack_require__) {
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
        blockComment: ['{', '}']
      },
      brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
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
        open: '<',
        close: '>'
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
        open: '<',
        close: '>'
      }, {
        open: '\'',
        close: '\''
      }],
      folding: {
        markers: {
          start: new RegExp("^\\s*\\{\\$REGION(\\s\\'.*\\')?\\}"),
          end: new RegExp("^\\s*\\{\\$ENDREGION\\}")
        }
      }
    };
    var language = {
      defaultToken: '',
      tokenPostfix: '.pascal',
      ignoreCase: true,
      brackets: [{
        open: '{',
        close: '}',
        token: 'delimiter.curly'
      }, {
        open: '[',
        close: ']',
        token: 'delimiter.square'
      }, {
        open: '(',
        close: ')',
        token: 'delimiter.parenthesis'
      }, {
        open: '<',
        close: '>',
        token: 'delimiter.angle'
      }],
      keywords: ['absolute', 'abstract', 'all', 'and_then', 'array', 'as', 'asm', 'attribute', 'begin', 'bindable', 'case', 'class', 'const', 'contains', 'default', 'div', 'else', 'end', 'except', 'exports', 'external', 'far', 'file', 'finalization', 'finally', 'forward', 'generic', 'goto', 'if', 'implements', 'import', 'in', 'index', 'inherited', 'initialization', 'interrupt', 'is', 'label', 'library', 'mod', 'module', 'name', 'near', 'not', 'object', 'of', 'on', 'only', 'operator', 'or_else', 'otherwise', 'override', 'package', 'packed', 'pow', 'private', 'program', 'protected', 'public', 'published', 'interface', 'implementation', 'qualified', 'read', 'record', 'resident', 'requires', 'resourcestring', 'restricted', 'segment', 'set', 'shl', 'shr', 'specialize', 'stored', 'then', 'threadvar', 'to', 'try', 'type', 'unit', 'uses', 'var', 'view', 'virtual', 'dynamic', 'overload', 'reintroduce', 'with', 'write', 'xor', 'true', 'false', 'procedure', 'function', 'constructor', 'destructor', 'property', 'break', 'continue', 'exit', 'abort', 'while', 'do', 'for', 'raise', 'repeat', 'until'],
      typeKeywords: ['boolean', 'double', 'byte', 'integer', 'shortint', 'char', 'longint', 'float', 'string'],
      operators: ['=', '>', '<', '<=', '>=', '<>', ':', ':=', 'and', 'or', '+', '-', '*', '/', '@', '&', '^', '%'],
      // we include these common regular expressions
      symbols: /[=><:@\^&|+\-*\/\^%]+/,
      // The main tokenizer for our languages
      tokenizer: {
        root: [// identifiers and keywords
        [/[a-zA-Z_][\w]*/, {
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
        }], // numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'], [/\$[0-9a-fA-F]{1,16}/, 'number.hex'], [/\d+/, 'number'], // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'], // strings
        [/'([^'\\]|\\.)*$/, 'string.invalid'], [/'/, 'string', '@string'], // characters
        [/'[^\\']'/, 'string'], [/'/, 'string.invalid'], [/\#\d+/, 'string']],
        comment: [[/[^\*\}]+/, 'comment'], //[/\(\*/,    'comment', '@push' ],    // nested comment  not allowed :-(
        [/\}/, 'comment', '@pop'], [/[\{]/, 'comment']],
        string: [[/[^\\']+/, 'string'], [/\\./, 'string.escape.invalid'], [/'/, {
          token: 'string.quote',
          bracket: '@close',
          next: '@pop'
        }]],
        whitespace: [[/[ \t\r\n]+/, 'white'], [/\{/, 'comment', '@comment'], [/\/\/.*$/, 'comment']]
      }
    };
    /***/
  }
}]);
//# sourceMappingURL=pascal-js-es5.js.map