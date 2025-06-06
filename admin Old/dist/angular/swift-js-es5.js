(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["swift-js"], {
  /***/
  "./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.js ***!
    \**************************************************************************/

  /*! exports provided: conf, language */

  /***/
  function node_modulesMonacoEditorEsmVsBasicLanguagesSwiftSwiftJs(module, __webpack_exports__, __webpack_require__) {
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
    /*!---------------------------------------------------------------------------------------------
     *  Copyright (C) David Owens II, owensd.io. All rights reserved.
     *--------------------------------------------------------------------------------------------*/


    var conf = {
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
      }, {
        open: '`',
        close: '`'
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
        open: '`',
        close: '`'
      }]
    };
    var language = {
      defaultToken: '',
      tokenPostfix: '.swift',
      // TODO(owensd): Support the full range of unicode valid identifiers.
      identifier: /[a-zA-Z_][\w$]*/,
      // TODO(owensd): Support the @availability macro properly.
      attributes: ['@autoclosure', '@noescape', '@noreturn', '@NSApplicationMain', '@NSCopying', '@NSManaged', '@objc', '@UIApplicationMain', '@noreturn', '@availability', '@IBAction', '@IBDesignable', '@IBInspectable', '@IBOutlet'],
      accessmodifiers: ['public', 'private', 'internal'],
      keywords: ['__COLUMN__', '__FILE__', '__FUNCTION__', '__LINE__', 'as', 'as!', 'as?', 'associativity', 'break', 'case', 'catch', 'class', 'continue', 'convenience', 'default', 'deinit', 'didSet', 'do', 'dynamic', 'dynamicType', 'else', 'enum', 'extension', 'fallthrough', 'final', 'for', 'func', 'get', 'guard', 'if', 'import', 'in', 'infix', 'init', 'inout', 'internal', 'is', 'lazy', 'left', 'let', 'mutating', 'nil', 'none', 'nonmutating', 'operator', 'optional', 'override', 'postfix', 'precedence', 'prefix', 'private', 'protocol', 'Protocol', 'public', 'repeat', 'required', 'return', 'right', 'self', 'Self', 'set', 'static', 'struct', 'subscript', 'super', 'switch', 'throw', 'throws', 'try', 'try!', 'Type', 'typealias', 'unowned', 'var', 'weak', 'where', 'while', 'willSet', 'FALSE', 'TRUE'],
      symbols: /[=(){}\[\].,:;@#\_&\-<>`?!+*\\\/]/,
      // Moved . to operatorstart so it can be a delimiter
      operatorstart: /[\/=\-+!*%<>&|^~?\u00A1-\u00A7\u00A9\u00AB\u00AC\u00AE\u00B0-\u00B1\u00B6\u00BB\u00BF\u00D7\u00F7\u2016-\u2017\u2020-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u23FF\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3030]/,
      operatorend: /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE00-\uFE0F\uFE20-\uFE2F\uE0100-\uE01EF]/,
      operators: /(@operatorstart)((@operatorstart)|(@operatorend))*/,
      // TODO(owensd): These are borrowed from C#; need to validate correctness for Swift.
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      tokenizer: {
        root: [{
          include: '@whitespace'
        }, {
          include: '@comment'
        }, {
          include: '@attribute'
        }, {
          include: '@literal'
        }, {
          include: '@keyword'
        }, {
          include: '@invokedmethod'
        }, {
          include: '@symbol'
        }],
        whitespace: [[/\s+/, 'white'], [/"""/, 'string.quote', '@endDblDocString']],
        endDblDocString: [[/[^"]+/, 'string'], [/\\"/, 'string'], [/"""/, 'string.quote', '@popall'], [/"/, 'string']],
        symbol: [[/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/[.]/, 'delimiter'], [/@operators/, 'operator'], [/@symbols/, 'operator']],
        comment: [[/\/\/\/.*$/, 'comment.doc'], [/\/\*\*/, 'comment.doc', '@commentdocbody'], [/\/\/.*$/, 'comment'], [/\/\*/, 'comment', '@commentbody']],
        commentdocbody: [[/\/\*/, 'comment', '@commentbody'], [/\*\//, 'comment.doc', '@pop'], [/\:[a-zA-Z]+\:/, 'comment.doc.param'], [/./, 'comment.doc']],
        commentbody: [[/\/\*/, 'comment', '@commentbody'], [/\*\//, 'comment', '@pop'], [/./, 'comment']],
        attribute: [[/\@@identifier/, {
          cases: {
            '@attributes': 'keyword.control',
            '@default': ''
          }
        }]],
        literal: [[/"/, {
          token: 'string.quote',
          next: '@stringlit'
        }], [/0[b]([01]_?)+/, 'number.binary'], [/0[o]([0-7]_?)+/, 'number.octal'], [/0[x]([0-9a-fA-F]_?)+([pP][\-+](\d_?)+)?/, 'number.hex'], [/(\d_?)*\.(\d_?)+([eE][\-+]?(\d_?)+)?/, 'number.float'], [/(\d_?)+/, 'number']],
        stringlit: [[/\\\(/, {
          token: 'operator',
          next: '@interpolatedexpression'
        }], [/@escapes/, 'string'], [/\\./, 'string.escape.invalid'], [/"/, {
          token: 'string.quote',
          next: '@pop'
        }], [/./, 'string']],
        interpolatedexpression: [[/\(/, {
          token: 'operator',
          next: '@interpolatedexpression'
        }], [/\)/, {
          token: 'operator',
          next: '@pop'
        }], {
          include: '@literal'
        }, {
          include: '@keyword'
        }, {
          include: '@symbol'
        }],
        keyword: [[/`/, {
          token: 'operator',
          next: '@escapedkeyword'
        }], [/@identifier/, {
          cases: {
            '@keywords': 'keyword',
            '[A-Z][\a-zA-Z0-9$]*': 'type.identifier',
            '@default': 'identifier'
          }
        }]],
        escapedkeyword: [[/`/, {
          token: 'operator',
          next: '@pop'
        }], [/./, 'identifier']],
        //		symbol: [
        //			[ /@symbols/, 'operator' ],
        //			[ /@operators/, 'operator' ]
        //		],
        invokedmethod: [[/([.])(@identifier)/, {
          cases: {
            '$2': ['delimeter', 'type.identifier'],
            '@default': ''
          }
        }]]
      }
    };
    /***/
  }
}]);
//# sourceMappingURL=swift-js-es5.js.map