(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["python-js"], {
  /***/
  "./node_modules/monaco-editor/esm/vs/basic-languages/python/python.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/monaco-editor/esm/vs/basic-languages/python/python.js ***!
    \****************************************************************************/

  /*! exports provided: conf, language */

  /***/
  function node_modulesMonacoEditorEsmVsBasicLanguagesPythonPythonJs(module, __webpack_exports__, __webpack_require__) {
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
    // Allow for running under nodejs/requirejs in tests


    var _monaco = typeof monaco === 'undefined' ? self.monaco : monaco;

    var conf = {
      comments: {
        lineComment: '#',
        blockComment: ['\'\'\'', '\'\'\'']
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
        close: '"',
        notIn: ['string']
      }, {
        open: '\'',
        close: '\'',
        notIn: ['string', 'comment']
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
      }],
      onEnterRules: [{
        beforeText: new RegExp("^\\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\\s*$"),
        action: {
          indentAction: _monaco.languages.IndentAction.Indent
        }
      }],
      folding: {
        offSide: true,
        markers: {
          start: new RegExp("^\\s*#region\\b"),
          end: new RegExp("^\\s*#endregion\\b")
        }
      }
    };
    var language = {
      defaultToken: '',
      tokenPostfix: '.python',
      keywords: ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print', 'raise', 'return', 'self', 'try', 'while', 'with', 'yield', 'int', 'float', 'long', 'complex', 'hex', 'abs', 'all', 'any', 'apply', 'basestring', 'bin', 'bool', 'buffer', 'bytearray', 'callable', 'chr', 'classmethod', 'cmp', 'coerce', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'execfile', 'file', 'filter', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'id', 'input', 'intern', 'isinstance', 'issubclass', 'iter', 'len', 'locals', 'list', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'reversed', 'range', 'raw_input', 'reduce', 'reload', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'unichr', 'unicode', 'vars', 'xrange', 'zip', 'True', 'False', '__dict__', '__methods__', '__members__', '__class__', '__bases__', '__name__', '__mro__', '__subclasses__', '__init__', '__import__'],
      brackets: [{
        open: '{',
        close: '}',
        token: 'delimiter.curly'
      }, {
        open: '[',
        close: ']',
        token: 'delimiter.bracket'
      }, {
        open: '(',
        close: ')',
        token: 'delimiter.parenthesis'
      }],
      tokenizer: {
        root: [{
          include: '@whitespace'
        }, {
          include: '@numbers'
        }, {
          include: '@strings'
        }, [/[,:;]/, 'delimiter'], [/[{}\[\]()]/, '@brackets'], [/@[a-zA-Z]\w*/, 'tag'], [/[a-zA-Z]\w*/, {
          cases: {
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }]],
        // Deal with white space, including single and multi-line comments
        whitespace: [[/\s+/, 'white'], [/(^#.*$)/, 'comment'], [/'''/, 'string', '@endDocString'], [/"""/, 'string', '@endDblDocString']],
        endDocString: [[/[^']+/, 'string'], [/\\'/, 'string'], [/'''/, 'string', '@popall'], [/'/, 'string']],
        endDblDocString: [[/[^"]+/, 'string'], [/\\"/, 'string'], [/"""/, 'string', '@popall'], [/"/, 'string']],
        // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
        numbers: [[/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'], [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']],
        // Recognize strings, including those broken across lines with \ (but not without)
        strings: [[/'$/, 'string.escape', '@popall'], [/'/, 'string.escape', '@stringBody'], [/"$/, 'string.escape', '@popall'], [/"/, 'string.escape', '@dblStringBody']],
        stringBody: [[/[^\\']+$/, 'string', '@popall'], [/[^\\']+/, 'string'], [/\\./, 'string'], [/'/, 'string.escape', '@popall'], [/\\$/, 'string']],
        dblStringBody: [[/[^\\"]+$/, 'string', '@popall'], [/[^\\"]+/, 'string'], [/\\./, 'string'], [/"/, 'string.escape', '@popall'], [/\\$/, 'string']]
      }
    };
    /***/
  }
}]);
//# sourceMappingURL=python-js-es5.js.map