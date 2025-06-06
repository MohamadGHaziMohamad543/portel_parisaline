(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["abap-js"], {
  /***/
  "./node_modules/monaco-editor/esm/vs/basic-languages/abap/abap.js":
  /*!************************************************************************!*\
    !*** ./node_modules/monaco-editor/esm/vs/basic-languages/abap/abap.js ***!
    \************************************************************************/

  /*! exports provided: conf, language */

  /***/
  function node_modulesMonacoEditorEsmVsBasicLanguagesAbapAbapJs(module, __webpack_exports__, __webpack_require__) {
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
      comments: {
        lineComment: '*'
      },
      brackets: [['[', ']'], ['(', ')']]
    };
    var abapKeywords = ['abstract', 'add', 'add-corresponding', 'adjacent', 'alias', 'aliases', 'all', 'append', 'appending', 'ascending', 'as', 'assert', 'assign', 'assigned', 'assigning', 'association', 'authority-check', 'back', 'begin', 'binary', 'block', 'bound', 'break-point', 'by', 'byte', 'class', 'call', 'cast', 'changing', 'check', 'class-data', 'class-method', 'class-methods', 'clear', 'close', 'cnt', 'collect', 'commit', 'cond', 'character', 'corresponding', 'communication', 'component', 'compute', 'concatenate', 'condense', 'constants', 'conv', 'count', 'controls', 'convert', 'create', 'currency', 'data', 'descending', 'default', 'define', 'deferred', 'delete', 'describe', 'detail', 'display', 'divide', 'divide-corresponding', 'display-mode', 'duplicates', 'deleting', 'editor-call', 'end', 'endexec', 'endfunction', 'ending', 'endmodule', 'end-of-definition', 'end-of-page', 'end-of-selection', 'end-test-injection', 'end-test-seam', 'exit-command', 'endclass', 'endmethod', 'endform', 'endinterface', 'endprovide', 'endselect', 'endtry', 'endwhile', 'enum', 'event', 'events', 'exec', 'exit', 'export', 'exporting', 'extract', 'exception', 'exceptions', 'field-symbols', 'field-groups', 'field', 'first', 'fetch', 'fields', 'format', 'frame', 'free', 'from', 'function', 'find', 'for', 'found', 'function-pool', 'generate', 'get', 'handle', 'hide', 'hashed', 'include', 'import', 'importing', 'index', 'infotypes', 'initial', 'initialization', 'id', 'is', 'in', 'interface', 'interfaces', 'init', 'input', 'insert', 'instance', 'into', 'key', 'left-justified', 'leave', 'like', 'line', 'line-count', 'line-size', 'load', 'local', 'log-point', 'length', 'left', 'leading', 'lower', 'matchcode', 'method', 'mesh', 'message', 'message-id', 'methods', 'modify', 'module', 'move', 'move-corresponding', 'multiply', 'multiply-corresponding', 'match', 'new', 'new-line', 'new-page', 'new-section', 'next', 'no', 'no-gap', 'no-gaps', 'no-sign', 'no-zero', 'non-unique', 'number', 'occurrence', 'object', 'obligatory', 'of', 'output', 'overlay', 'optional', 'others', 'occurrences', 'occurs', 'offset', 'options', 'pack', 'parameters', 'perform', 'places', 'position', 'print-control', 'private', 'program', 'protected', 'provide', 'public', 'put', 'radiobutton', 'raising', 'ranges', 'receive', 'receiving', 'redefinition', 'reduce', 'reference', 'refresh', 'regex', 'reject', 'results', 'requested', 'ref', 'replace', 'report', 'reserve', 'restore', 'result', 'return', 'returning', 'right-justified', 'rollback', 'read', 'read-only', 'rp-provide-from-last', 'run', 'scan', 'screen', 'scroll', 'search', 'select', 'select-options', 'selection-screen', 'stamp', 'source', 'subkey', 'separated', 'set', 'shift', 'single', 'skip', 'sort', 'sorted', 'split', 'standard', 'stamp', 'starting', 'start-of-selection', 'sum', 'subtract-corresponding', 'statics', 'step', 'stop', 'structure', 'submatches', 'submit', 'subtract', 'summary', 'supplied', 'suppress', 'section', 'syntax-check', 'syntax-trace', 'system-call', 'switch', 'tables', 'table', 'task', 'testing', 'test-seam', 'test-injection', 'then', 'time', 'times', 'title', 'titlebar', 'to', 'top-of-page', 'trailing', 'transfer', 'transformation', 'translate', 'transporting', 'types', 'type', 'type-pool', 'type-pools', 'unassign', 'unique', 'uline', 'unpack', 'update', 'upper', 'using', 'value', 'when', 'while', 'window', 'write', 'where', 'with', 'work', 'at', 'case', 'catch', 'continue', 'do', 'elseif', 'else', 'endat', 'endcase', 'enddo', 'endif', 'endloop', 'endon', 'if', 'loop', 'on', 'raise', 'try', 'abs', 'sign', 'ceil', 'floor', 'trunc', 'frac', 'acos', 'asin', 'atan', 'cos', 'sin', 'tan', 'cosh', 'sinh', 'tanh', 'exp', 'log', 'log10', 'sqrt', 'strlen', 'xstrlen', 'charlen', 'lines', 'numofchar', 'dbmaxlen', 'round', 'rescale', 'nmax', 'nmin', 'cmax', 'cmin', 'boolc', 'boolx', 'xsdbool', 'contains', 'contains_any_of', 'contains_any_not_of', 'matches', 'line_exists', 'ipow', 'char_off', 'count', 'count_any_of', 'count_any_not_of', 'distance', 'condense', 'concat_lines_of', 'escape', 'find', 'find_end', 'find_any_of', 'find_any_not_of', 'insert', 'match', 'repeat', 'replace', 'reverse', 'segment', 'shift_left', 'shift_right', 'substring', 'substring_after', 'substring_from', 'substring_before', 'substring_to', 'to_upper', 'to_lower', 'to_mixed', 'from_mixed', 'translate', 'bit-set', 'line_index', 'definition', 'implementation', 'public', 'inheriting', 'final'];
    var language = {
      defaultToken: 'invalid',
      ignoreCase: true,
      tokenPostfix: '.abap',
      keywords: abapKeywords,
      typeKeywords: ['abap_bool', 'string', 'xstring', 'any', 'clike', 'csequence', 'numeric', 'xsequence', 'c', 'n', 'i', 'p', 'f', 'd', 't', 'x'],
      operators: ['+', '-', '/', '*', '=', '<', '>', '<=', '>=', '<>', '><', '=<', '=>', 'EQ', 'NE', 'GE', 'LE', 'CS', 'CN', 'CA', 'CO', 'CP', 'NS', 'NA', 'NP'],
      symbols: /[=><!~?&+\-*\/\^%]+/,
      tokenizer: {
        root: [[/[a-z_$][\w$]*/, {
          cases: {
            '@typeKeywords': 'keyword',
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }], {
          include: '@whitespace'
        }, [/[:,.]/, 'delimiter'], [/[{}()\[\]]/, '@brackets'], [/@symbols/, {
          cases: {
            '@operators': 'operator',
            '@default': ''
          }
        }], [/'/, {
          token: 'string',
          bracket: '@open',
          next: '@stringquote'
        }], [/\|/, {
          token: 'string',
          bracket: '@open',
          next: '@stringtemplate'
        }], [/\d+/, 'number']],
        stringtemplate: [[/[^\\\|]+/, 'string'], [/\\\|/, 'string'], [/\|/, {
          token: 'string',
          bracket: '@close',
          next: '@pop'
        }]],
        stringquote: [[/[^\\']+/, 'string'], [/'/, {
          token: 'string',
          bracket: '@close',
          next: '@pop'
        }]],
        whitespace: [[/[ \t\r\n]+/, ''], [/^\*.*$/, 'comment'], [/\".*$/, 'comment']]
      }
    };
    /***/
  }
}]);
//# sourceMappingURL=abap-js-es5.js.map