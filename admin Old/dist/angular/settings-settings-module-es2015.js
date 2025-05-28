(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

/***/ "./node_modules/ngx-editor/fesm2015/ngx-editor.js":
/*!********************************************************!*\
  !*** ./node_modules/ngx-editor/fesm2015/ngx-editor.js ***!
  \********************************************************/
/*! exports provided: NgxEditorModule, MaxLengthValidator, ɵc, ɵb, ɵe, ɵf, ɵa, ɵd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxEditorModule", function() { return NgxEditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxLengthValidator", function() { return MaxLengthValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return CommandExecutorService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return MessageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return NgxEditorMessageComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return NgxEditorToolbarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return NgxEditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return NgxGrippieComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * enable or disable toolbar based on configuration
 *
 * @param {?} value toolbar item
 * @param {?} toolbar toolbar configuration object
 * @return {?}
 */
function canEnableToolbarOptions(value, toolbar) {
    if (value) {
        if (toolbar['length'] === 0) {
            return true;
        }
        else {
            /** @type {?} */
            const found = toolbar.filter(array => {
                return array.indexOf(value) !== -1;
            });
            return found.length ? true : false;
        }
    }
    else {
        return false;
    }
}
/**
 * set editor configuration
 *
 * @param {?} value configuration via [config] property
 * @param {?} ngxEditorConfig default editor configuration
 * @param {?} input direct configuration inputs via directives
 * @return {?}
 */
function getEditorConfiguration(value, ngxEditorConfig, input) {
    for (const i in ngxEditorConfig) {
        if (i) {
            if (input[i] !== undefined) {
                value[i] = input[i];
            }
            if (!value.hasOwnProperty(i)) {
                value[i] = ngxEditorConfig[i];
            }
        }
    }
    return value;
}
/**
 * return vertical if the element is the resizer property is set to basic
 *
 * @param {?} resizer type of resizer, either basic or stack
 * @return {?}
 */
function canResize(resizer) {
    if (resizer === 'basic') {
        return 'vertical';
    }
    return false;
}
/**
 * save selection when the editor is focussed out
 * @return {?}
 */
function saveSelection() {
    if (window.getSelection) {
        /** @type {?} */
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    }
    else if (document.getSelection && document.createRange) {
        return document.createRange();
    }
    return null;
}
/**
 * restore selection when the editor is focussed in
 *
 * @param {?} range saved selection when the editor is focussed out
 * @return {?}
 */
function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            /** @type {?} */
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
        }
        else if (document.getSelection && range.select) {
            range.select();
            return true;
        }
    }
    else {
        return false;
    }
}

var Utils = /*#__PURE__*/Object.freeze({
    canEnableToolbarOptions: canEnableToolbarOptions,
    getEditorConfiguration: getEditorConfiguration,
    canResize: canResize,
    saveSelection: saveSelection,
    restoreSelection: restoreSelection
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CommandExecutorService {
    /**
     *
     * @param {?} _http HTTP Client for making http requests
     */
    constructor(_http) {
        this._http = _http;
        /**
         * saves the selection from the editor when focussed out
         */
        this.savedSelection = undefined;
    }
    /**
     * executes command from the toolbar
     *
     * @param {?} command command to be executed
     * @return {?}
     */
    execute(command) {
        if (!this.savedSelection && command !== 'enableObjectResizing') {
            throw new Error('Range out of Editor');
        }
        if (command === 'enableObjectResizing') {
            document.execCommand('enableObjectResizing', true);
        }
        if (command === 'blockquote') {
            document.execCommand('formatBlock', false, 'blockquote');
        }
        if (command === 'removeBlockquote') {
            document.execCommand('formatBlock', false, 'div');
        }
        document.execCommand(command, false, null);
    }
    /**
     * inserts image in the editor
     *
     * @param {?} imageURI url of the image to be inserted
     * @return {?}
     */
    insertImage(imageURI) {
        if (this.savedSelection) {
            if (imageURI) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    /** @type {?} */
                    const inserted = document.execCommand('insertImage', false, imageURI);
                    if (!inserted) {
                        throw new Error('Invalid URL');
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * inserts image in the editor
     *
     * @param {?} videParams url of the image to be inserted
     * @return {?}
     */
    insertVideo(videParams) {
        if (this.savedSelection) {
            if (videParams) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isYoutubeLink(videParams.videoUrl)) {
                        /** @type {?} */
                        const youtubeURL = '<iframe width="' + videParams.width + '" height="' + videParams.height + '"'
                            + 'src="' + videParams.videoUrl + '"></iframe>';
                        this.insertHtml(youtubeURL);
                    }
                    else if (this.checkTagSupportInBrowser('video')) {
                        if (this.isValidURL(videParams.videoUrl)) {
                            /** @type {?} */
                            const videoSrc = '<video width="' + videParams.width + '" height="' + videParams.height + '"'
                                + ' controls="true"><source src="' + videParams.videoUrl + '"></video>';
                            this.insertHtml(videoSrc);
                        }
                        else {
                            throw new Error('Invalid video URL');
                        }
                    }
                    else {
                        throw new Error('Unable to insert video');
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * checks the input url is a valid youtube URL or not
     *
     * @param {?} url Youtue URL
     * @return {?}
     */
    isYoutubeLink(url) {
        /** @type {?} */
        const ytRegExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
        return ytRegExp.test(url);
    }
    /**
     * check whether the string is a valid url or not
     * @param {?} url url
     * @return {?}
     */
    isValidURL(url) {
        /** @type {?} */
        const urlRegExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return urlRegExp.test(url);
    }
    /**
     * uploads image to the server
     *
     * @param {?} file file that has to be uploaded
     * @param {?} endPoint enpoint to which the image has to be uploaded
     * @return {?}
     */
    uploadImage(file, endPoint) {
        if (!endPoint) {
            throw new Error('Image Endpoint isn`t provided or invalid');
        }
        /** @type {?} */
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
            /** @type {?} */
            const req = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpRequest"]('POST', endPoint, formData, {
                reportProgress: true
            });
            return this._http.request(req);
        }
        else {
            throw new Error('Invalid Image');
        }
    }
    /**
     * inserts link in the editor
     *
     * @param {?} params parameters that holds the information for the link
     * @return {?}
     */
    createLink(params) {
        if (this.savedSelection) {
            /**
                   * check whether the saved selection contains a range or plain selection
                   */
            if (params.urlNewTab) {
                /** @type {?} */
                const newUrl = '<a href="' + params.urlLink + '" target="_blank">' + params.urlText + '</a>';
                if (document.getSelection().type !== 'Range') {
                    /** @type {?} */
                    const restored = restoreSelection(this.savedSelection);
                    if (restored) {
                        this.insertHtml(newUrl);
                    }
                }
                else {
                    throw new Error('Only new links can be inserted. You cannot edit URL`s');
                }
            }
            else {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    document.execCommand('createLink', false, params.urlLink);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    insertColor(color, where) {
        if (this.savedSelection) {
            /** @type {?} */
            const restored = restoreSelection(this.savedSelection);
            if (restored && this.checkSelection()) {
                if (where === 'textColor') {
                    document.execCommand('foreColor', false, color);
                }
                else {
                    document.execCommand('hiliteColor', false, color);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * set font size for text
     *
     * @param {?} fontSize font-size to be set
     * @return {?}
     */
    setFontSize(fontSize) {
        if (this.savedSelection && this.checkSelection()) {
            /** @type {?} */
            const deletedValue = this.deleteAndGetElement();
            if (deletedValue) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isNumeric(fontSize)) {
                        /** @type {?} */
                        const fontPx = '<span style="font-size: ' + fontSize + 'px;">' + deletedValue + '</span>';
                        this.insertHtml(fontPx);
                    }
                    else {
                        /** @type {?} */
                        const fontPx = '<span style="font-size: ' + fontSize + ';">' + deletedValue + '</span>';
                        this.insertHtml(fontPx);
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * set font name/family for text
     *
     * @param {?} fontName font-family to be set
     * @return {?}
     */
    setFontName(fontName) {
        if (this.savedSelection && this.checkSelection()) {
            /** @type {?} */
            const deletedValue = this.deleteAndGetElement();
            if (deletedValue) {
                /** @type {?} */
                const restored = restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isNumeric(fontName)) {
                        /** @type {?} */
                        const fontFamily = '<span style="font-family: ' + fontName + 'px;">' + deletedValue + '</span>';
                        this.insertHtml(fontFamily);
                    }
                    else {
                        /** @type {?} */
                        const fontFamily = '<span style="font-family: ' + fontName + ';">' + deletedValue + '</span>';
                        this.insertHtml(fontFamily);
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    }
    /**
     * insert HTML
     * @param {?} html
     * @return {?}
     */
    insertHtml(html) {
        /** @type {?} */
        const isHTMLInserted = document.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    }
    /**
     * check whether the value is a number or string
     * if number return true
     * else return false
     * @param {?} value
     * @return {?}
     */
    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }
    /**
     * delete the text at selected range and return the value
     * @return {?}
     */
    deleteAndGetElement() {
        /** @type {?} */
        let slectedText;
        if (this.savedSelection) {
            slectedText = this.savedSelection.toString();
            this.savedSelection.deleteContents();
            return slectedText;
        }
        return false;
    }
    /**
     * check any slection is made or not
     * @return {?}
     */
    checkSelection() {
        /** @type {?} */
        const slectedText = this.savedSelection.toString();
        if (slectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    }
    /**
     * check tag is supported by browser or not
     *
     * @param {?} tag HTML tag
     * @return {?}
     */
    checkTagSupportInBrowser(tag) {
        return !(document.createElement(tag) instanceof HTMLUnknownElement);
    }
}
CommandExecutorService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
];
/** @nocollapse */
CommandExecutorService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * time in which the message has to be cleared
  @type {?} */
const DURATION = 7000;
class MessageService {
    constructor() {
        /**
         * variable to hold the user message
         */
        this.message = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /**
     * returns the message sent by the editor
     * @return {?}
     */
    getMessage() {
        return this.message.asObservable();
    }
    /**
     * sends message to the editor
     *
     * @param {?} message message to be sent
     * @return {?}
     */
    sendMessage(message) {
        this.message.next(message);
        this.clearMessageIn(DURATION);
    }
    /**
     * a short interval to clear message
     *
     * @param {?} milliseconds time in seconds in which the message has to be cleared
     * @return {?}
     */
    clearMessageIn(milliseconds) {
        setTimeout(() => {
            this.message.next(undefined);
        }, milliseconds);
    }
}
MessageService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
];
/** @nocollapse */
MessageService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * toolbar default configuration
  @type {?} */
const ngxEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    imageEndPoint: '',
    toolbar: [
        ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
        ['fontName', 'fontSize', 'color'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
        ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
        ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
        ['link', 'unlink', 'image', 'video']
    ]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxEditorComponent {
    /**
     * @param {?} _messageService service to send message to the editor message component
     * @param {?} _commandExecutor executes command from the toolbar
     * @param {?} _renderer access and manipulate the dom element
     */
    constructor(_messageService, _commandExecutor, _renderer) {
        this._messageService = _messageService;
        this._commandExecutor = _commandExecutor;
        this._renderer = _renderer;
        /**
         * The editor can be resized vertically.
         *
         * `basic` resizer enables the html5 reszier. Check here https://www.w3schools.com/cssref/css3_pr_resize.asp
         *
         * `stack` resizer enable a resizer that looks like as if in https://stackoverflow.com
         */
        this.resizer = 'stack';
        /**
         * The config property is a JSON object
         *
         * All avaibale inputs inputs can be provided in the configuration as JSON
         * inputs provided directly are considered as top priority
         */
        this.config = ngxEditorConfig;
        /**
         * emits `blur` event when focused out from the textarea
         */
        this.blur = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * emits `focus` event when focused in to the textarea
         */
        this.focus = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.Utils = Utils;
    }
    /**
     * events
     * @return {?}
     */
    onTextAreaFocus() {
        this.focus.emit('focus');
    }
    /**
     * focus the text area when the editor is focussed
     * @return {?}
     */
    onEditorFocus() {
        this.textArea.nativeElement.focus();
    }
    /**
     * Executed from the contenteditable section while the input property changes
     * @param {?} innerHTML
     * @return {?}
     */
    onContentChange(innerHTML) {
        if (typeof this.onChange === 'function') {
            this.onChange(innerHTML);
            this.togglePlaceholder(innerHTML);
        }
    }
    /**
     * @return {?}
     */
    onTextAreaBlur() {
        /** save selection if focussed out */
        this._commandExecutor.savedSelection = saveSelection();
        if (typeof this.onTouched === 'function') {
            this.onTouched();
        }
        this.blur.emit('blur');
    }
    /**
     * resizing text area
     *
     * @param {?} offsetY vertical height of the eidtable portion of the editor
     * @return {?}
     */
    resizeTextArea(offsetY) {
        /** @type {?} */
        let newHeight = parseInt(this.height, 10);
        newHeight += offsetY;
        this.height = newHeight + 'px';
        this.textArea.nativeElement.style.height = this.height;
    }
    /**
     * editor actions, i.e., executes command from toolbar
     *
     * @param {?} commandName name of the command to be executed
     * @return {?}
     */
    executeCommand(commandName) {
        try {
            this._commandExecutor.execute(commandName);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
    }
    /**
     * Write a new value to the element.
     *
     * @param {?} value value to be executed when there is a change in contenteditable
     * @return {?}
     */
    writeValue(value) {
        this.togglePlaceholder(value);
        if (value === null || value === undefined || value === '' || value === '<br>') {
            value = null;
        }
        this.refreshView(value);
    }
    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * refresh view/HTML of the editor
     *
     * @param {?} value html string from the editor
     * @return {?}
     */
    refreshView(value) {
        /** @type {?} */
        const normalizedValue = value === null ? '' : value;
        this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
    }
    /**
     * toggles placeholder based on input string
     *
     * @param {?} value A HTML string from the editor
     * @return {?}
     */
    togglePlaceholder(value) {
        if (!value || value === '<br>' || value === '') {
            this._renderer.addClass(this.ngxWrapper.nativeElement, 'show-placeholder');
        }
        else {
            this._renderer.removeClass(this.ngxWrapper.nativeElement, 'show-placeholder');
        }
    }
    /**
     * returns a json containing input params
     * @return {?}
     */
    getCollectiveParams() {
        return {
            editable: this.editable,
            spellcheck: this.spellcheck,
            placeholder: this.placeholder,
            translate: this.translate,
            height: this.height,
            minHeight: this.minHeight,
            width: this.width,
            minWidth: this.minWidth,
            enableToolbar: this.enableToolbar,
            showToolbar: this.showToolbar,
            imageEndPoint: this.imageEndPoint,
            toolbar: this.toolbar
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /**
             * set configuartion
             */
        this.config = this.Utils.getEditorConfiguration(this.config, ngxEditorConfig, this.getCollectiveParams());
        this.height = this.height || this.textArea.nativeElement.offsetHeight;
        this.executeCommand('enableObjectResizing');
    }
}
NgxEditorComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'app-ngx-editor',
                template: "<div class=\"ngx-editor\" id=\"ngxEditor\" [style.width]=\"config['width']\" [style.minWidth]=\"config['minWidth']\" tabindex=\"0\"\n  (focus)=\"onEditorFocus()\">\n\n  <app-ngx-editor-toolbar [config]=\"config\" (execute)=\"executeCommand($event)\"></app-ngx-editor-toolbar>\n\n  <!-- text area -->\n  <div class=\"ngx-wrapper\" #ngxWrapper>\n    <div class=\"ngx-editor-textarea\" [attr.contenteditable]=\"config['editable']\" (input)=\"onContentChange($event.target.innerHTML)\"\n      [attr.translate]=\"config['translate']\" [attr.spellcheck]=\"config['spellcheck']\" [style.height]=\"config['height']\"\n      [style.minHeight]=\"config['minHeight']\" [style.resize]=\"Utils?.canResize(resizer)\" (focus)=\"onTextAreaFocus()\"\n      (blur)=\"onTextAreaBlur()\" #ngxTextArea></div>\n\n    <span class=\"ngx-editor-placeholder\">{{ placeholder || config['placeholder'] }}</span>\n  </div>\n\n  <app-ngx-editor-message></app-ngx-editor-message>\n  <app-ngx-grippie *ngIf=\"resizer === 'stack'\"></app-ngx-grippie>\n\n</div>\n",
                providers: [{
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(() => NgxEditorComponent),
                        multi: true
                    }],
                styles: [".ngx-editor{position:relative}.ngx-editor ::ng-deep [contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#868e96;opacity:1}.ngx-editor .ngx-wrapper{position:relative}.ngx-editor .ngx-wrapper .ngx-editor-textarea{min-height:5rem;padding:.5rem .8rem 1rem;border:1px solid #ddd;background-color:transparent;overflow-x:hidden;overflow-y:auto;z-index:2;position:relative}.ngx-editor .ngx-wrapper .ngx-editor-textarea.focus,.ngx-editor .ngx-wrapper .ngx-editor-textarea:focus{outline:0}.ngx-editor .ngx-wrapper .ngx-editor-textarea ::ng-deep blockquote{margin-left:1rem;border-left:.2em solid #dfe2e5;padding-left:.5rem}.ngx-editor .ngx-wrapper ::ng-deep p{margin-bottom:0}.ngx-editor .ngx-wrapper .ngx-editor-placeholder{display:none;position:absolute;top:0;padding:.5rem .8rem 1rem .9rem;z-index:1;color:#6c757d;opacity:1}.ngx-editor .ngx-wrapper.show-placeholder .ngx-editor-placeholder{display:block}"]
            }] }
];
/** @nocollapse */
NgxEditorComponent.ctorParameters = () => [
    { type: MessageService },
    { type: CommandExecutorService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
];
NgxEditorComponent.propDecorators = {
    editable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    spellcheck: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    translate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    height: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    minHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    width: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    minWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    toolbar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    resizer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    showToolbar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    enableToolbar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    imageEndPoint: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    blur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    focus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    textArea: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['ngxTextArea',] }],
    ngxWrapper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['ngxWrapper',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxGrippieComponent {
    /**
     * Constructor
     *
     * @param {?} _editorComponent Editor component
     */
    constructor(_editorComponent) {
        this._editorComponent = _editorComponent;
        /**
         * previous value befor resizing the editor
         */
        this.oldY = 0;
        /**
         * set to true on mousedown event
         */
        this.grabber = false;
    }
    /**
     *
     * @param {?} event Mouseevent
     *
     * Update the height of the editor when the grabber is dragged
     * @return {?}
     */
    onMouseMove(event) {
        if (!this.grabber) {
            return;
        }
        this._editorComponent.resizeTextArea(event.clientY - this.oldY);
        this.oldY = event.clientY;
    }
    /**
     *
     * @param {?} event Mouseevent
     *
     * set the grabber to false on mouse up action
     * @return {?}
     */
    onMouseUp(event) {
        this.grabber = false;
    }
    /**
     * @param {?} event
     * @param {?=} resizer
     * @return {?}
     */
    onResize(event, resizer) {
        this.grabber = true;
        this.oldY = event.clientY;
        event.preventDefault();
    }
}
NgxGrippieComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'app-ngx-grippie',
                template: "<div class=\"ngx-editor-grippie\">\n  <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" viewBox=\"651.6 235 26 5\"\n    width=\"26\" height=\"5\">\n    <g id=\"sprites\">\n      <path d=\" M 651.6 235 L 653.6 235 L 653.6 237 L 651.6 237 M 654.6 238 L 656.6 238 L 656.6 240 L 654.6 240 M 660.6 238 L 662.6 238 L 662.6 240 L 660.6 240 M 666.6 238 L 668.6 238 L 668.6 240 L 666.6 240 M 672.6 238 L 674.6 238 L 674.6 240 L 672.6 240 M 657.6 235 L 659.6 235 L 659.6 237 L 657.6 237 M 663.6 235 L 665.6 235 L 665.6 237 L 663.6 237 M 669.6 235 L 671.6 235 L 671.6 237 L 669.6 237 M 675.6 235 L 677.6 235 L 677.6 237 L 675.6 237\"\n        fill=\"rgb(147,153,159)\" />\n    </g>\n  </svg>\n</div>\n",
                styles: [".ngx-editor-grippie{height:9px;background-color:#f1f1f1;position:relative;text-align:center;cursor:s-resize;border:1px solid #ddd;border-top:transparent}.ngx-editor-grippie svg{position:absolute;top:1.5px;width:50%;right:25%}"]
            }] }
];
/** @nocollapse */
NgxGrippieComponent.ctorParameters = () => [
    { type: NgxEditorComponent }
];
NgxGrippieComponent.propDecorators = {
    onMouseMove: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mousemove', ['$event'],] }],
    onMouseUp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mouseup', ['$event'],] }],
    onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['mousedown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxEditorMessageComponent {
    /**
     * @param {?} _messageService service to send message to the editor
     */
    constructor(_messageService) {
        this._messageService = _messageService;
        /**
         * property that holds the message to be displayed on the editor
         */
        this.ngxMessage = undefined;
        this._messageService.getMessage().subscribe((message) => this.ngxMessage = message);
    }
    /**
     * clears editor message
     * @return {?}
     */
    clearMessage() {
        this.ngxMessage = undefined;
    }
}
NgxEditorMessageComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'app-ngx-editor-message',
                template: "<div class=\"ngx-editor-message\" *ngIf=\"ngxMessage\" (dblclick)=\"clearMessage()\">\n  {{ ngxMessage }}\n</div>\n",
                styles: [".ngx-editor-message{font-size:80%;background-color:#f1f1f1;border:1px solid #ddd;border-top:transparent;padding:0 .5rem .1rem;transition:.5s ease-in}"]
            }] }
];
/** @nocollapse */
NgxEditorMessageComponent.ctorParameters = () => [
    { type: MessageService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxEditorToolbarComponent {
    /**
     * @param {?} _popOverConfig
     * @param {?} _formBuilder
     * @param {?} _messageService
     * @param {?} _commandExecutorService
     */
    constructor(_popOverConfig, _formBuilder, _messageService, _commandExecutorService) {
        this._popOverConfig = _popOverConfig;
        this._formBuilder = _formBuilder;
        this._messageService = _messageService;
        this._commandExecutorService = _commandExecutorService;
        /**
         * set to false when image is being uploaded
         */
        this.uploadComplete = true;
        /**
         * upload percentage
         */
        this.updloadPercentage = 0;
        /**
         * set to true when the image is being uploaded
         */
        this.isUploading = false;
        /**
         * which tab to active for color insetion
         */
        this.selectedColorTab = 'textColor';
        /**
         * font family name
         */
        this.fontName = '';
        /**
         * font size
         */
        this.fontSize = '';
        /**
         * hex color code
         */
        this.hexColor = '';
        /**
         * show/hide image uploader
         */
        this.isImageUploader = false;
        /**
         * Emits an event when a toolbar button is clicked
         */
        this.execute = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._popOverConfig.outsideClick = true;
        this._popOverConfig.placement = 'bottom';
        this._popOverConfig.container = 'body';
    }
    /**
     * enable or diable toolbar based on configuration
     *
     * @param {?} value name of the toolbar buttons
     * @return {?}
     */
    canEnableToolbarOptions(value) {
        return canEnableToolbarOptions(value, this.config['toolbar']);
    }
    /**
     * triggers command from the toolbar to be executed and emits an event
     *
     * @param {?} command name of the command to be executed
     * @return {?}
     */
    triggerCommand(command) {
        this.execute.emit(command);
    }
    /**
     * create URL insert form
     * @return {?}
     */
    buildUrlForm() {
        this.urlForm = this._formBuilder.group({
            urlLink: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            urlText: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            urlNewTab: [true]
        });
    }
    /**
     * inserts link in the editor
     * @return {?}
     */
    insertLink() {
        try {
            this._commandExecutorService.createLink(this.urlForm.value);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        /** reset form to default */
        this.buildUrlForm();
        /** close inset URL pop up */
        this.urlPopover.hide();
    }
    /**
     * create insert image form
     * @return {?}
     */
    buildImageForm() {
        this.imageForm = this._formBuilder.group({
            imageUrl: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]]
        });
    }
    /**
     * create insert image form
     * @return {?}
     */
    buildVideoForm() {
        this.videoForm = this._formBuilder.group({
            videoUrl: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            height: [''],
            width: ['']
        });
    }
    /**
     * Executed when file is selected
     *
     * @param {?} e onChange event
     * @return {?}
     */
    onFileChange(e) {
        this.uploadComplete = false;
        this.isUploading = true;
        if (e.target.files.length > 0) {
            /** @type {?} */
            const file = e.target.files[0];
            try {
                this._commandExecutorService.uploadImage(file, this.config.imageEndPoint).subscribe(event => {
                    if (event.type) {
                        this.updloadPercentage = Math.round(100 * event.loaded / event.total);
                    }
                    if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
                        try {
                            this._commandExecutorService.insertImage(event.body.url);
                        }
                        catch (error) {
                            this._messageService.sendMessage(error.message);
                        }
                        this.uploadComplete = true;
                        this.isUploading = false;
                    }
                });
            }
            catch (error) {
                this._messageService.sendMessage(error.message);
                this.uploadComplete = true;
                this.isUploading = false;
            }
        }
    }
    /**
     * insert image in the editor
     * @return {?}
     */
    insertImage() {
        try {
            this._commandExecutorService.insertImage(this.imageForm.value.imageUrl);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        /** reset form to default */
        this.buildImageForm();
        /** close inset URL pop up */
        this.imagePopover.hide();
    }
    /**
     * insert image in the editor
     * @return {?}
     */
    insertVideo() {
        try {
            this._commandExecutorService.insertVideo(this.videoForm.value);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        /** reset form to default */
        this.buildVideoForm();
        /** close inset URL pop up */
        this.videoPopover.hide();
    }
    /**
     * inser text/background color
     * @param {?} color
     * @param {?} where
     * @return {?}
     */
    insertColor(color, where) {
        try {
            this._commandExecutorService.insertColor(color, where);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        this.colorPopover.hide();
    }
    /**
     * set font size
     * @param {?} fontSize
     * @return {?}
     */
    setFontSize(fontSize) {
        try {
            this._commandExecutorService.setFontSize(fontSize);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        this.fontSizePopover.hide();
    }
    /**
     * set font Name/family
     * @param {?} fontName
     * @return {?}
     */
    setFontName(fontName) {
        try {
            this._commandExecutorService.setFontName(fontName);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
        this.fontSizePopover.hide();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildUrlForm();
        this.buildImageForm();
        this.buildVideoForm();
    }
}
NgxEditorToolbarComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'app-ngx-editor-toolbar',
                template: "<div class=\"ngx-toolbar\" *ngIf=\"config['showToolbar']\">\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('bold')\" (click)=\"triggerCommand('bold')\"\n      title=\"Bold\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-bold\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('italic')\" (click)=\"triggerCommand('italic')\"\n      title=\"Italic\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-italic\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('underline')\" (click)=\"triggerCommand('underline')\"\n      title=\"Underline\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-underline\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('strikeThrough')\" (click)=\"triggerCommand('strikeThrough')\"\n      title=\"Strikethrough\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-strikethrough\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('superscript')\" (click)=\"triggerCommand('superscript')\"\n      title=\"Superscript\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-superscript\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('subscript')\" (click)=\"triggerCommand('subscript')\"\n      title=\"Subscript\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-subscript\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('fontName')\" (click)=\"fontName = ''\"\n      title=\"Font Family\" [popover]=\"fontNameTemplate\" #fontNamePopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-font\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('fontSize')\" (click)=\"fontSize = ''\"\n      title=\"Font Size\" [popover]=\"fontSizeTemplate\" #fontSizePopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-text-height\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('color')\" (click)=\"hexColor = ''\"\n      title=\"Color Picker\" [popover]=\"insertColorTemplate\" #colorPopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-tint\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyLeft')\" (click)=\"triggerCommand('justifyLeft')\"\n      title=\"Justify Left\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-left\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyCenter')\" (click)=\"triggerCommand('justifyCenter')\"\n      title=\"Justify Center\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-center\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyRight')\" (click)=\"triggerCommand('justifyRight')\"\n      title=\"Justify Right\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-right\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('justifyFull')\" (click)=\"triggerCommand('justifyFull')\"\n      title=\"Justify\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-align-justify\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('indent')\" (click)=\"triggerCommand('indent')\"\n      title=\"Indent\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-indent\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('outdent')\" (click)=\"triggerCommand('outdent')\"\n      title=\"Outdent\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-outdent\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('cut')\" (click)=\"triggerCommand('cut')\"\n      title=\"Cut\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-scissors\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('copy')\" (click)=\"triggerCommand('copy')\"\n      title=\"Copy\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-files-o\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('delete')\" (click)=\"triggerCommand('delete')\"\n      title=\"Delete\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('removeFormat')\" (click)=\"triggerCommand('removeFormat')\"\n      title=\"Clear Formatting\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-eraser\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('undo')\" (click)=\"triggerCommand('undo')\"\n      title=\"Undo\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-undo\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('redo')\" (click)=\"triggerCommand('redo')\"\n      title=\"Redo\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('paragraph')\" (click)=\"triggerCommand('insertParagraph')\"\n      title=\"Paragraph\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-paragraph\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('blockquote')\" (click)=\"triggerCommand('blockquote')\"\n      title=\"Blockquote\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-quote-left\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('removeBlockquote')\" (click)=\"triggerCommand('removeBlockquote')\"\n      title=\"Remove Blockquote\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-quote-right\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('horizontalLine')\" (click)=\"triggerCommand('insertHorizontalRule')\"\n      title=\"Horizontal Line\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('unorderedList')\" (click)=\"triggerCommand('insertUnorderedList')\"\n      title=\"Unordered List\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('orderedList')\" (click)=\"triggerCommand('insertOrderedList')\"\n      title=\"Ordered List\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-list-ol\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"ngx-toolbar-set\">\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('link')\" (click)=\"buildUrlForm()\"\n      [popover]=\"insertLinkTemplate\" title=\"Insert Link\" #urlPopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-link\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('unlink')\" (click)=\"triggerCommand('unlink')\"\n      title=\"Unlink\" [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-chain-broken\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('image')\" (click)=\"buildImageForm()\"\n      title=\"Insert Image\" [popover]=\"insertImageTemplate\" #imagePopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-picture-o\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"ngx-editor-button\" *ngIf=\"canEnableToolbarOptions('video')\" (click)=\"buildVideoForm()\"\n      title=\"Insert Video\" [popover]=\"insertVideoTemplate\" #videoPopover=\"bs-popover\" containerClass=\"ngxePopover\"\n      [disabled]=\"!config['enableToolbar']\">\n      <i class=\"fa fa-youtube-play\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n</div>\n\n<!-- URL Popover template -->\n<ng-template #insertLinkTemplate>\n  <div class=\"ngxe-popover extra-gt\">\n    <form [formGroup]=\"urlForm\" (ngSubmit)=\"urlForm.valid && insertLink()\" autocomplete=\"off\">\n      <div class=\"form-group\">\n        <label for=\"urlInput\" class=\"small\">URL</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"URLInput\" placeholder=\"URL\" formControlName=\"urlLink\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"urlTextInput\" class=\"small\">Text</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"urlTextInput\" placeholder=\"Text\" formControlName=\"urlText\"\n          required>\n      </div>\n      <div class=\"form-check\">\n        <input type=\"checkbox\" class=\"form-check-input\" id=\"urlNewTab\" formControlName=\"urlNewTab\">\n        <label class=\"form-check-label\" for=\"urlNewTab\">Open in new tab</label>\n      </div>\n      <button type=\"submit\" class=\"btn-primary btn-sm btn\">Submit</button>\n    </form>\n  </div>\n</ng-template>\n\n<!-- Image Uploader Popover template -->\n<ng-template #insertImageTemplate>\n  <div class=\"ngxe-popover imgc-ctnr\">\n    <div class=\"imgc-topbar btn-ctnr\">\n      <button type=\"button\" class=\"btn\" [ngClass]=\"{active: isImageUploader}\" (click)=\"isImageUploader = true\">\n        <i class=\"fa fa-upload\"></i>\n      </button>\n      <button type=\"button\" class=\"btn\" [ngClass]=\"{active: !isImageUploader}\" (click)=\"isImageUploader = false\">\n        <i class=\"fa fa-link\"></i>\n      </button>\n    </div>\n    <div class=\"imgc-ctnt is-image\">\n      <div *ngIf=\"isImageUploader; else insertImageLink\"> </div>\n      <div *ngIf=\"!isImageUploader; else imageUploder\"> </div>\n      <ng-template #imageUploder>\n        <div class=\"ngx-insert-img-ph\">\n          <p *ngIf=\"uploadComplete\">Choose Image</p>\n          <p *ngIf=\"!uploadComplete\">\n            <span>Uploading Image</span>\n            <br>\n            <span>{{ updloadPercentage }} %</span>\n          </p>\n          <div class=\"ngxe-img-upl-frm\">\n            <input type=\"file\" (change)=\"onFileChange($event)\" accept=\"image/*\" [disabled]=\"isUploading\" [style.cursor]=\"isUploading ? 'not-allowed': 'allowed'\">\n          </div>\n        </div>\n      </ng-template>\n      <ng-template #insertImageLink>\n        <form class=\"extra-gt\" [formGroup]=\"imageForm\" (ngSubmit)=\"imageForm.valid && insertImage()\" autocomplete=\"off\">\n          <div class=\"form-group\">\n            <label for=\"imageURLInput\" class=\"small\">URL</label>\n            <input type=\"text\" class=\"form-control-sm\" id=\"imageURLInput\" placeholder=\"URL\" formControlName=\"imageUrl\"\n              required>\n          </div>\n          <button type=\"submit\" class=\"btn-primary btn-sm btn\">Submit</button>\n        </form>\n      </ng-template>\n      <div class=\"progress\" *ngIf=\"!uploadComplete\">\n        <div class=\"progress-bar progress-bar-striped progress-bar-animated bg-success\" [ngClass]=\"{'bg-danger': updloadPercentage<20, 'bg-warning': updloadPercentage<50, 'bg-success': updloadPercentage>=100}\"\n          [style.width.%]=\"updloadPercentage\"></div>\n      </div>\n    </div>\n  </div>\n</ng-template>\n\n\n<!-- Insert Video Popover template -->\n<ng-template #insertVideoTemplate>\n  <div class=\"ngxe-popover imgc-ctnr\">\n    <div class=\"imgc-topbar btn-ctnr\">\n      <button type=\"button\" class=\"btn active\">\n        <i class=\"fa fa-link\"></i>\n      </button>\n    </div>\n    <div class=\"imgc-ctnt is-image\">\n      <form class=\"extra-gt\" [formGroup]=\"videoForm\" (ngSubmit)=\"videoForm.valid && insertVideo()\" autocomplete=\"off\">\n        <div class=\"form-group\">\n          <label for=\"videoURLInput\" class=\"small\">URL</label>\n          <input type=\"text\" class=\"form-control-sm\" id=\"videoURLInput\" placeholder=\"URL\" formControlName=\"videoUrl\"\n            required>\n        </div>\n        <div class=\"row form-group\">\n          <div class=\"col\">\n            <input type=\"text\" class=\"form-control-sm\" formControlName=\"height\" placeholder=\"height (px)\" pattern=\"[0-9]\">\n          </div>\n          <div class=\"col\">\n            <input type=\"text\" class=\"form-control-sm\" formControlName=\"width\" placeholder=\"width (px)\" pattern=\"[0-9]\">\n          </div>\n          <label class=\"small\">Height/Width</label>\n        </div>\n        <button type=\"submit\" class=\"btn-primary btn-sm btn\">Submit</button>\n      </form>\n    </div>\n  </div>\n</ng-template>\n\n<!-- Insert color template -->\n<ng-template #insertColorTemplate>\n  <div class=\"ngxe-popover imgc-ctnr\">\n    <div class=\"imgc-topbar two-tabs\">\n      <span (click)=\"selectedColorTab ='textColor'\" [ngClass]=\"{active: selectedColorTab ==='textColor'}\">Text</span>\n      <span (click)=\"selectedColorTab ='backgroundColor'\" [ngClass]=\"{active: selectedColorTab ==='backgroundColor'}\">Background</span>\n    </div>\n    <div class=\"imgc-ctnt is-color extra-gt1\">\n      <form autocomplete=\"off\">\n        <div class=\"form-group\">\n          <label for=\"hexInput\" class=\"small\">Hex Color</label>\n          <input type=\"text\" class=\"form-control-sm\" id=\"hexInput\" name=\"hexInput\" maxlength=\"7\" placeholder=\"HEX Color\"\n            [(ngModel)]=\"hexColor\" required>\n        </div>\n        <button type=\"button\" class=\"btn-primary btn-sm btn\" (click)=\"insertColor(hexColor, selectedColorTab)\">Submit</button>\n      </form>\n    </div>\n  </div>\n</ng-template>\n\n<!-- font size template -->\n<ng-template #fontSizeTemplate>\n  <div class=\"ngxe-popover extra-gt1\">\n    <form autocomplete=\"off\">\n      <div class=\"form-group\">\n        <label for=\"fontSize\" class=\"small\">Font Size</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"fontSize\" name=\"fontSize\" placeholder=\"Font size in px/rem\"\n          [(ngModel)]=\"fontSize\" required>\n      </div>\n      <button type=\"button\" class=\"btn-primary btn-sm btn\" (click)=\"setFontSize(fontSize)\">Submit</button>\n    </form>\n  </div>\n</ng-template>\n\n<!-- font family/name template -->\n<ng-template #fontNameTemplate>\n  <div class=\"ngxe-popover extra-gt1\">\n    <form autocomplete=\"off\">\n      <div class=\"form-group\">\n        <label for=\"fontSize\" class=\"small\">Font Size</label>\n        <input type=\"text\" class=\"form-control-sm\" id=\"fontSize\" name=\"fontName\" placeholder=\"Ex: 'Times New Roman', Times, serif\"\n          [(ngModel)]=\"fontName\" required>\n      </div>\n      <button type=\"button\" class=\"btn-primary btn-sm btn\" (click)=\"setFontName(fontName)\">Submit</button>\n    </form>\n  </div>\n</ng-template>\n",
                providers: [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["PopoverConfig"]],
                styles: ["::ng-deep .ngxePopover.popover{position:absolute;top:0;left:0;z-index:1060;display:block;max-width:276px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem}::ng-deep .ngxePopover.popover .arrow{position:absolute;display:block;width:1rem;height:.5rem;margin:0 .3rem}::ng-deep .ngxePopover.popover .arrow::after,::ng-deep .ngxePopover.popover .arrow::before{position:absolute;display:block;content:\"\";border-color:transparent;border-style:solid}::ng-deep .ngxePopover.popover .popover-header{padding:.5rem .75rem;margin-bottom:0;font-size:1rem;color:inherit;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}::ng-deep .ngxePopover.popover .popover-header:empty{display:none}::ng-deep .ngxePopover.popover .popover-body{padding:.5rem .75rem;color:#212529}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top],::ng-deep .ngxePopover.popover.bs-popover-top{margin-bottom:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow,::ng-deep .ngxePopover.popover.bs-popover-top .arrow{bottom:calc((.5rem + 1px) * -1)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::before{border-width:.5rem .5rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::before{bottom:0;border-top-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=top] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-top .arrow::after{bottom:1px;border-top-color:#fff}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right],::ng-deep .ngxePopover.popover.bs-popover-right{margin-left:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow,::ng-deep .ngxePopover.popover.bs-popover-right .arrow{left:calc((.5rem + 1px) * -1);width:.5rem;height:1rem;margin:.3rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::before{border-width:.5rem .5rem .5rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::before{left:0;border-right-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=right] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-right .arrow::after{left:1px;border-right-color:#fff}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom],::ng-deep .ngxePopover.popover.bs-popover-bottom{margin-top:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow{left:45%!important;top:calc((.5rem + 1px) * -1)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::before{border-width:0 .5rem .5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::before{top:0;border-bottom-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-bottom .arrow::after{top:1px;border-bottom-color:#fff}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=bottom] .popover-header::before,::ng-deep .ngxePopover.popover.bs-popover-bottom .popover-header::before{position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-.5rem;content:\"\";border-bottom:1px solid #f7f7f7}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left],::ng-deep .ngxePopover.popover.bs-popover-left{margin-right:.5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow,::ng-deep .ngxePopover.popover.bs-popover-left .arrow{right:calc((.5rem + 1px) * -1);width:.5rem;height:1rem;margin:.3rem 0}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::before{border-width:.5rem 0 .5rem .5rem}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::before,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::before{right:0;border-left-color:rgba(0,0,0,.25)}::ng-deep .ngxePopover.popover.bs-popover-auto[x-placement^=left] .arrow::after,::ng-deep .ngxePopover.popover.bs-popover-left .arrow::after{right:1px;border-left-color:#fff}::ng-deep .ngxePopover .btn{display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}::ng-deep .ngxePopover .btn.btn-sm{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}::ng-deep .ngxePopover .btn:active,::ng-deep .ngxePopover .btn:focus{outline:0;box-shadow:none}::ng-deep .ngxePopover .btn.btn-primary{color:#fff;background-color:#007bff;border-color:#007bff}::ng-deep .ngxePopover .btn.btn-primary:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}::ng-deep .ngxePopover .btn:not(:disabled):not(.disabled){cursor:pointer}::ng-deep .ngxePopover form .form-group{margin-bottom:1rem}::ng-deep .ngxePopover form .form-group input{overflow:visible}::ng-deep .ngxePopover form .form-group .form-control-sm{width:100%;outline:0;border:none;border-bottom:1px solid #bdbdbd;border-radius:0;margin-bottom:1px;padding:.25rem .5rem;font-size:.875rem;line-height:1.5}::ng-deep .ngxePopover form .form-group.row{display:flex;flex-wrap:wrap;margin-left:0;margin-right:0}::ng-deep .ngxePopover form .form-group.row .col{flex-basis:0;flex-grow:1;max-width:100%;padding:0}::ng-deep .ngxePopover form .form-group.row .col:first-child{padding-right:15px}::ng-deep .ngxePopover form .form-check{position:relative;display:block;padding-left:1.25rem}::ng-deep .ngxePopover form .form-check .form-check-input{position:absolute;margin-top:.3rem;margin-left:-1.25rem}.ngx-toolbar{display:flex;flex-wrap:wrap;background-color:#f5f5f5;font-size:.8rem;padding:.2rem .2rem 0;border:1px solid #ddd}.ngx-toolbar .ngx-toolbar-set{display:flex;border-radius:5px;background-color:#fff;margin-right:.2rem;margin-bottom:.2rem}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button{background-color:transparent;padding:.4rem;min-width:2.5rem;border:1px solid #ddd;border-right:transparent}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button.focus,.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:focus{outline:0}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:last-child{border-right:1px solid #ddd;border-top-right-radius:5px;border-bottom-right-radius:5px}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:first-child{border-top-left-radius:5px;border-bottom-left-radius:5px}.ngx-toolbar .ngx-toolbar-set .ngx-editor-button:disabled{background-color:#f5f5f5;pointer-events:none;cursor:not-allowed}::ng-deep .popover{border-top-right-radius:0;border-top-left-radius:0}::ng-deep .ngxe-popover{min-width:15rem;white-space:nowrap}::ng-deep .ngxe-popover .extra-gt,::ng-deep .ngxe-popover.extra-gt{padding-top:.5rem!important}::ng-deep .ngxe-popover .extra-gt1,::ng-deep .ngxe-popover.extra-gt1{padding-top:.75rem!important}::ng-deep .ngxe-popover .extra-gt2,::ng-deep .ngxe-popover.extra-gt2{padding-top:1rem!important}::ng-deep .ngxe-popover .form-group label{display:none;margin:0}::ng-deep .ngxe-popover .form-group .form-control-sm{width:100%;outline:0;border:none;border-bottom:1px solid #bdbdbd;border-radius:0;margin-bottom:1px;padding-left:0;padding-right:0}::ng-deep .ngxe-popover .form-group .form-control-sm:active,::ng-deep .ngxe-popover .form-group .form-control-sm:focus{border-bottom:2px solid #1e88e5;box-shadow:none;margin-bottom:0}::ng-deep .ngxe-popover .form-group .form-control-sm.ng-dirty.ng-invalid:not(.ng-pristine){border-bottom:2px solid red}::ng-deep .ngxe-popover .form-check{margin-bottom:1rem}::ng-deep .ngxe-popover .btn:focus{box-shadow:none!important}::ng-deep .ngxe-popover.imgc-ctnr{margin:-.5rem -.75rem}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar{box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 1px 1px rgba(0,0,0,.16);border-bottom:0}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.btn-ctnr button{background-color:transparent;border-radius:0}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.btn-ctnr button:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.btn-ctnr button.active{color:#007bff;transition:.2s}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.two-tabs span{width:50%;display:inline-flex;justify-content:center;padding:.4rem 0;margin:0 -1px 2px}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.two-tabs span:hover{cursor:pointer}::ng-deep .ngxe-popover.imgc-ctnr .imgc-topbar.two-tabs span.active{margin-bottom:-2px;border-bottom:2px solid #007bff;color:#007bff}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt{padding:.5rem}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .progress{height:.5rem;margin:.5rem -.5rem -.6rem}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image p{margin:0}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph{border:2px dashed #bdbdbd;padding:1.8rem 0;position:relative;letter-spacing:1px;text-align:center}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph:hover{background:#ebebeb}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph .ngxe-img-upl-frm{opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;z-index:2147483640;overflow:hidden;margin:0;padding:0;width:100%}::ng-deep .ngxe-popover.imgc-ctnr .imgc-ctnt.is-image .ngx-insert-img-ph .ngxe-img-upl-frm input{cursor:pointer;position:absolute;right:0;top:0;bottom:0;margin:0}"]
            }] }
];
/** @nocollapse */
NgxEditorToolbarComponent.ctorParameters = () => [
    { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["PopoverConfig"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: MessageService },
    { type: CommandExecutorService }
];
NgxEditorToolbarComponent.propDecorators = {
    config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    urlPopover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['urlPopover',] }],
    imagePopover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['imagePopover',] }],
    videoPopover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['videoPopover',] }],
    fontSizePopover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['fontSizePopover',] }],
    colorPopover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['colorPopover',] }],
    execute: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxEditorModule {
}
NgxEditorModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["PopoverModule"].forRoot()],
                declarations: [NgxEditorComponent, NgxGrippieComponent, NgxEditorMessageComponent, NgxEditorToolbarComponent],
                exports: [NgxEditorComponent],
                providers: [CommandExecutorService, MessageService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} maxlength
 * @param {?=} options
 * @return {?}
 */
function MaxLengthValidator(maxlength, options) {
    return (control) => {
        /** @type {?} */
        const parsedDocument = new DOMParser().parseFromString(control.value, 'text/html');
        /** @type {?} */
        let innerText = parsedDocument.body.innerText || '';
        // replace all linebreaks
        if (options.excludeLineBreaks) {
            innerText = innerText.replace(/(\r\n\t|\n|\r\t)/gm, '');
        }
        // concat multiple whitespaces into a single whitespace
        if (options.concatWhiteSpaces) {
            innerText = innerText.replace(/(\s\s+)/gm, ' ');
        }
        // remove all whitespaces
        if (options.excludeWhiteSpaces) {
            innerText = innerText.replace(/(\s)/gm, '');
        }
        if (innerText.length > maxlength) {
            return {
                ngxEditor: {
                    allowedLength: maxlength,
                    textLength: innerText.length
                }
            };
        }
        return null;
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVkaXRvci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWVkaXRvci9hcHAvbmd4LWVkaXRvci9jb21tb24vdXRpbHMvbmd4LWVkaXRvci51dGlscy50cyIsIm5nOi8vbmd4LWVkaXRvci9hcHAvbmd4LWVkaXRvci9jb21tb24vc2VydmljZXMvY29tbWFuZC1leGVjdXRvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZWRpdG9yL2FwcC9uZ3gtZWRpdG9yL2NvbW1vbi9zZXJ2aWNlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJuZzovL25neC1lZGl0b3IvYXBwL25neC1lZGl0b3IvY29tbW9uL25neC1lZGl0b3IuZGVmYXVsdHMudHMiLCJuZzovL25neC1lZGl0b3IvYXBwL25neC1lZGl0b3Ivbmd4LWVkaXRvci5jb21wb25lbnQudHMiLCJuZzovL25neC1lZGl0b3IvYXBwL25neC1lZGl0b3Ivbmd4LWdyaXBwaWUvbmd4LWdyaXBwaWUuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZWRpdG9yL2FwcC9uZ3gtZWRpdG9yL25neC1lZGl0b3ItbWVzc2FnZS9uZ3gtZWRpdG9yLW1lc3NhZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZWRpdG9yL2FwcC9uZ3gtZWRpdG9yL25neC1lZGl0b3ItdG9vbGJhci9uZ3gtZWRpdG9yLXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZWRpdG9yL2FwcC9uZ3gtZWRpdG9yL25neC1lZGl0b3IubW9kdWxlLnRzIiwibmc6Ly9uZ3gtZWRpdG9yL2FwcC9uZ3gtZWRpdG9yL3ZhbGlkYXRvcnMvbWF4bGVuZ3RoLXZhbGlkYXRvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGVuYWJsZSBvciBkaXNhYmxlIHRvb2xiYXIgYmFzZWQgb24gY29uZmlndXJhdGlvblxuICpcbiAqIEBwYXJhbSB2YWx1ZSB0b29sYmFyIGl0ZW1cbiAqIEBwYXJhbSB0b29sYmFyIHRvb2xiYXIgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbkVuYWJsZVRvb2xiYXJPcHRpb25zKHZhbHVlOiBzdHJpbmcsIHRvb2xiYXI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAodmFsdWUpIHtcbiAgICBpZiAodG9vbGJhclsnbGVuZ3RoJ10gPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmb3VuZCA9IHRvb2xiYXIuZmlsdGVyKGFycmF5ID0+IHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZm91bmQubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBzZXQgZWRpdG9yIGNvbmZpZ3VyYXRpb25cbiAqXG4gKiBAcGFyYW0gdmFsdWUgY29uZmlndXJhdGlvbiB2aWEgW2NvbmZpZ10gcHJvcGVydHlcbiAqIEBwYXJhbSBuZ3hFZGl0b3JDb25maWcgZGVmYXVsdCBlZGl0b3IgY29uZmlndXJhdGlvblxuICogQHBhcmFtIGlucHV0IGRpcmVjdCBjb25maWd1cmF0aW9uIGlucHV0cyB2aWEgZGlyZWN0aXZlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWRpdG9yQ29uZmlndXJhdGlvbih2YWx1ZTogYW55LCBuZ3hFZGl0b3JDb25maWc6IGFueSwgaW5wdXQ6IGFueSk6IGFueSB7XG4gIGZvciAoY29uc3QgaSBpbiBuZ3hFZGl0b3JDb25maWcpIHtcbiAgICBpZiAoaSkge1xuICAgICAgaWYgKGlucHV0W2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWVbaV0gPSBpbnB1dFtpXTtcbiAgICAgIH1cbiAgICAgIGlmICghdmFsdWUuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFsdWVbaV0gPSBuZ3hFZGl0b3JDb25maWdbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIHJldHVybiB2ZXJ0aWNhbCBpZiB0aGUgZWxlbWVudCBpcyB0aGUgcmVzaXplciBwcm9wZXJ0eSBpcyBzZXQgdG8gYmFzaWNcbiAqXG4gKiBAcGFyYW0gcmVzaXplciB0eXBlIG9mIHJlc2l6ZXIsIGVpdGhlciBiYXNpYyBvciBzdGFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuUmVzaXplKHJlc2l6ZXI6IHN0cmluZyk6IGFueSB7XG4gIGlmIChyZXNpemVyID09PSAnYmFzaWMnKSB7XG4gICAgcmV0dXJuICd2ZXJ0aWNhbCc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHNhdmUgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdmVTZWxlY3Rpb24oKTogYW55IHtcbiAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICByZXR1cm4gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldFNlbGVjdGlvbiAmJiBkb2N1bWVudC5jcmVhdGVSYW5nZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIHJlc3RvcmUgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCBpblxuICpcbiAqIEBwYXJhbSByYW5nZSBzYXZlZCBzZWxlY3Rpb24gd2hlbiB0aGUgZWRpdG9yIGlzIGZvY3Vzc2VkIG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVNlbGVjdGlvbihyYW5nZSk6IGJvb2xlYW4ge1xuICBpZiAocmFuZ2UpIHtcbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0U2VsZWN0aW9uICYmIHJhbmdlLnNlbGVjdCkge1xuICAgICAgcmFuZ2Uuc2VsZWN0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4uL3V0aWxzL25neC1lZGl0b3IudXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tbWFuZEV4ZWN1dG9yU2VydmljZSB7XG4gIC8qKiBzYXZlcyB0aGUgc2VsZWN0aW9uIGZyb20gdGhlIGVkaXRvciB3aGVuIGZvY3Vzc2VkIG91dCAqL1xuICBzYXZlZFNlbGVjdGlvbjogYW55ID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gX2h0dHAgSFRUUCBDbGllbnQgZm9yIG1ha2luZyBodHRwIHJlcXVlc3RzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICAvKipcbiAgICogZXhlY3V0ZXMgY29tbWFuZCBmcm9tIHRoZSB0b29sYmFyXG4gICAqXG4gICAqIEBwYXJhbSBjb21tYW5kIGNvbW1hbmQgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGV4ZWN1dGUoY29tbWFuZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNhdmVkU2VsZWN0aW9uICYmIGNvbW1hbmQgIT09ICdlbmFibGVPYmplY3RSZXNpemluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugb3V0IG9mIEVkaXRvcicpO1xuICAgIH1cblxuICAgIGlmIChjb21tYW5kID09PSAnZW5hYmxlT2JqZWN0UmVzaXppbmcnKSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZW5hYmxlT2JqZWN0UmVzaXppbmcnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoY29tbWFuZCA9PT0gJ2Jsb2NrcXVvdGUnKSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ2Jsb2NrcXVvdGUnKTtcbiAgICB9XG5cbiAgICBpZiAoY29tbWFuZCA9PT0gJ3JlbW92ZUJsb2NrcXVvdGUnKSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ2RpdicpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGNvbW1hbmQsIGZhbHNlLCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbnNlcnRzIGltYWdlIGluIHRoZSBlZGl0b3JcbiAgICpcbiAgICogQHBhcmFtIGltYWdlVVJJIHVybCBvZiB0aGUgaW1hZ2UgdG8gYmUgaW5zZXJ0ZWRcbiAgICovXG4gIGluc2VydEltYWdlKGltYWdlVVJJOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKGltYWdlVVJJKSB7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkID0gVXRpbHMucmVzdG9yZVNlbGVjdGlvbih0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgaWYgKHJlc3RvcmVkKSB7XG4gICAgICAgICAgY29uc3QgaW5zZXJ0ZWQgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SW1hZ2UnLCBmYWxzZSwgaW1hZ2VVUkkpO1xuICAgICAgICAgIGlmICghaW5zZXJ0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBVUkwnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBvdXQgb2YgdGhlIGVkaXRvcicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICogaW5zZXJ0cyBpbWFnZSBpbiB0aGUgZWRpdG9yXG4gKlxuICogQHBhcmFtIHZpZGVQYXJhbXMgdXJsIG9mIHRoZSBpbWFnZSB0byBiZSBpbnNlcnRlZFxuICovXG4gIGluc2VydFZpZGVvKHZpZGVQYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICBpZiAodmlkZVBhcmFtcykge1xuICAgICAgICBjb25zdCByZXN0b3JlZCA9IFV0aWxzLnJlc3RvcmVTZWxlY3Rpb24odGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgICAgIGlmICh0aGlzLmlzWW91dHViZUxpbmsodmlkZVBhcmFtcy52aWRlb1VybCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHlvdXR1YmVVUkwgPSAnPGlmcmFtZSB3aWR0aD1cIicgKyB2aWRlUGFyYW1zLndpZHRoICsgJ1wiIGhlaWdodD1cIicgKyB2aWRlUGFyYW1zLmhlaWdodCArICdcIidcbiAgICAgICAgICAgICAgKyAnc3JjPVwiJyArIHZpZGVQYXJhbXMudmlkZW9VcmwgKyAnXCI+PC9pZnJhbWU+JztcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0SHRtbCh5b3V0dWJlVVJMKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tUYWdTdXBwb3J0SW5Ccm93c2VyKCd2aWRlbycpKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRVUkwodmlkZVBhcmFtcy52aWRlb1VybCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdmlkZW9TcmMgPSAnPHZpZGVvIHdpZHRoPVwiJyArIHZpZGVQYXJhbXMud2lkdGggKyAnXCIgaGVpZ2h0PVwiJyArIHZpZGVQYXJhbXMuaGVpZ2h0ICsgJ1wiJ1xuICAgICAgICAgICAgICAgICsgJyBjb250cm9scz1cInRydWVcIj48c291cmNlIHNyYz1cIicgKyB2aWRlUGFyYW1zLnZpZGVvVXJsICsgJ1wiPjwvdmlkZW8+JztcbiAgICAgICAgICAgICAgdGhpcy5pbnNlcnRIdG1sKHZpZGVvU3JjKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2aWRlbyBVUkwnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBpbnNlcnQgdmlkZW8nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBvdXQgb2YgdGhlIGVkaXRvcicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja3MgdGhlIGlucHV0IHVybCBpcyBhIHZhbGlkIHlvdXR1YmUgVVJMIG9yIG5vdFxuICAgKlxuICAgKiBAcGFyYW0gdXJsIFlvdXR1ZSBVUkxcbiAgICovXG4gIHByaXZhdGUgaXNZb3V0dWJlTGluayh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHl0UmVnRXhwID0gL14oaHR0cChzKT86XFwvXFwvKT8oKHcpezN9Lik/eW91dHUoYmV8LmJlKT8oXFwuY29tKT9cXC8uKy87XG4gICAgcmV0dXJuIHl0UmVnRXhwLnRlc3QodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayB3aGV0aGVyIHRoZSBzdHJpbmcgaXMgYSB2YWxpZCB1cmwgb3Igbm90XG4gICAqIEBwYXJhbSB1cmwgdXJsXG4gICAqL1xuICBwcml2YXRlIGlzVmFsaWRVUkwodXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmxSZWdFeHAgPSAvKGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3Kik/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiUhXFwtXFwvXSkpPy87XG4gICAgcmV0dXJuIHVybFJlZ0V4cC50ZXN0KHVybCk7XG4gIH1cblxuICAvKipcbiAgICogdXBsb2FkcyBpbWFnZSB0byB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSBmaWxlIGZpbGUgdGhhdCBoYXMgdG8gYmUgdXBsb2FkZWRcbiAgICogQHBhcmFtIGVuZFBvaW50IGVucG9pbnQgdG8gd2hpY2ggdGhlIGltYWdlIGhhcyB0byBiZSB1cGxvYWRlZFxuICAgKi9cbiAgdXBsb2FkSW1hZ2UoZmlsZTogRmlsZSwgZW5kUG9pbnQ6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCFlbmRQb2ludCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBFbmRwb2ludCBpc25gdCBwcm92aWRlZCBvciBpbnZhbGlkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICBpZiAoZmlsZSkge1xuXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KCdQT1NUJywgZW5kUG9pbnQsIGZvcm1EYXRhLCB7XG4gICAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucmVxdWVzdChyZXEpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBJbWFnZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpbnNlcnRzIGxpbmsgaW4gdGhlIGVkaXRvclxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIHBhcmFtZXRlcnMgdGhhdCBob2xkcyB0aGUgaW5mb3JtYXRpb24gZm9yIHRoZSBsaW5rXG4gICAqL1xuICBjcmVhdGVMaW5rKHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2F2ZWRTZWxlY3Rpb24pIHtcbiAgICAgIC8qKlxuICAgICAgICogY2hlY2sgd2hldGhlciB0aGUgc2F2ZWQgc2VsZWN0aW9uIGNvbnRhaW5zIGEgcmFuZ2Ugb3IgcGxhaW4gc2VsZWN0aW9uXG4gICAgICAgKi9cbiAgICAgIGlmIChwYXJhbXMudXJsTmV3VGFiKSB7XG4gICAgICAgIGNvbnN0IG5ld1VybCA9ICc8YSBocmVmPVwiJyArIHBhcmFtcy51cmxMaW5rICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBwYXJhbXMudXJsVGV4dCArICc8L2E+JztcblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkudHlwZSAhPT0gJ1JhbmdlJykge1xuICAgICAgICAgIGNvbnN0IHJlc3RvcmVkID0gVXRpbHMucmVzdG9yZVNlbGVjdGlvbih0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgICBpZiAocmVzdG9yZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0SHRtbChuZXdVcmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09ubHkgbmV3IGxpbmtzIGNhbiBiZSBpbnNlcnRlZC4gWW91IGNhbm5vdCBlZGl0IFVSTGBzJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkID0gVXRpbHMucmVzdG9yZVNlbGVjdGlvbih0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgaWYgKHJlc3RvcmVkKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgcGFyYW1zLnVybExpbmspO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugb3V0IG9mIHRoZSBlZGl0b3InKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0IGNvbG9yIGVpdGhlciBmb250IG9yIGJhY2tncm91bmRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yIGNvbG9yIHRvIGJlIGluc2VydGVkXG4gICAqIEBwYXJhbSB3aGVyZSB3aGVyZSB0aGUgY29sb3IgaGFzIHRvIGJlIGluc2VydGVkIGVpdGhlciB0ZXh0L2JhY2tncm91bmRcbiAgICovXG4gIGluc2VydENvbG9yKGNvbG9yOiBzdHJpbmcsIHdoZXJlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgY29uc3QgcmVzdG9yZWQgPSBVdGlscy5yZXN0b3JlU2VsZWN0aW9uKHRoaXMuc2F2ZWRTZWxlY3Rpb24pO1xuICAgICAgaWYgKHJlc3RvcmVkICYmIHRoaXMuY2hlY2tTZWxlY3Rpb24oKSkge1xuICAgICAgICBpZiAod2hlcmUgPT09ICd0ZXh0Q29sb3InKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2ZvcmVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2hpbGl0ZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmdlIG91dCBvZiB0aGUgZWRpdG9yJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNldCBmb250IHNpemUgZm9yIHRleHRcbiAgICpcbiAgICogQHBhcmFtIGZvbnRTaXplIGZvbnQtc2l6ZSB0byBiZSBzZXRcbiAgICovXG4gIHNldEZvbnRTaXplKGZvbnRTaXplOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbiAmJiB0aGlzLmNoZWNrU2VsZWN0aW9uKCkpIHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRWYWx1ZSA9IHRoaXMuZGVsZXRlQW5kR2V0RWxlbWVudCgpO1xuXG4gICAgICBpZiAoZGVsZXRlZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkID0gVXRpbHMucmVzdG9yZVNlbGVjdGlvbih0aGlzLnNhdmVkU2VsZWN0aW9uKTtcblxuICAgICAgICBpZiAocmVzdG9yZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc051bWVyaWMoZm9udFNpemUpKSB7XG4gICAgICAgICAgICBjb25zdCBmb250UHggPSAnPHNwYW4gc3R5bGU9XCJmb250LXNpemU6ICcgKyBmb250U2l6ZSArICdweDtcIj4nICsgZGVsZXRlZFZhbHVlICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRIdG1sKGZvbnRQeCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRQeCA9ICc8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogJyArIGZvbnRTaXplICsgJztcIj4nICsgZGVsZXRlZFZhbHVlICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRIdG1sKGZvbnRQeCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugb3V0IG9mIHRoZSBlZGl0b3InKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2V0IGZvbnQgbmFtZS9mYW1pbHkgZm9yIHRleHRcbiAgICpcbiAgICogQHBhcmFtIGZvbnROYW1lIGZvbnQtZmFtaWx5IHRvIGJlIHNldFxuICAgKi9cbiAgc2V0Rm9udE5hbWUoZm9udE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uICYmIHRoaXMuY2hlY2tTZWxlY3Rpb24oKSkge1xuICAgICAgY29uc3QgZGVsZXRlZFZhbHVlID0gdGhpcy5kZWxldGVBbmRHZXRFbGVtZW50KCk7XG5cbiAgICAgIGlmIChkZWxldGVkVmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVzdG9yZWQgPSBVdGlscy5yZXN0b3JlU2VsZWN0aW9uKHRoaXMuc2F2ZWRTZWxlY3Rpb24pO1xuXG4gICAgICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyhmb250TmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAnPHNwYW4gc3R5bGU9XCJmb250LWZhbWlseTogJyArIGZvbnROYW1lICsgJ3B4O1wiPicgKyBkZWxldGVkVmFsdWUgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICB0aGlzLmluc2VydEh0bWwoZm9udEZhbWlseSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAnPHNwYW4gc3R5bGU9XCJmb250LWZhbWlseTogJyArIGZvbnROYW1lICsgJztcIj4nICsgZGVsZXRlZFZhbHVlICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRIdG1sKGZvbnRGYW1pbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmdlIG91dCBvZiB0aGUgZWRpdG9yJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIGluc2VydCBIVE1MICovXG4gIHByaXZhdGUgaW5zZXJ0SHRtbChodG1sOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpc0hUTUxJbnNlcnRlZCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xuXG4gICAgaWYgKCFpc0hUTUxJbnNlcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGVyZm9ybSB0aGUgb3BlcmF0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGEgbnVtYmVyIG9yIHN0cmluZ1xuICAgKiBpZiBudW1iZXIgcmV0dXJuIHRydWVcbiAgICogZWxzZSByZXR1cm4gZmFsc2VcbiAgICovXG4gIHByaXZhdGUgaXNOdW1lcmljKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL14tezAsMX1cXGQrJC8udGVzdCh2YWx1ZSk7XG4gIH1cblxuICAvKiogZGVsZXRlIHRoZSB0ZXh0IGF0IHNlbGVjdGVkIHJhbmdlIGFuZCByZXR1cm4gdGhlIHZhbHVlICovXG4gIHByaXZhdGUgZGVsZXRlQW5kR2V0RWxlbWVudCgpOiBhbnkge1xuICAgIGxldCBzbGVjdGVkVGV4dDtcblxuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICBzbGVjdGVkVGV4dCA9IHRoaXMuc2F2ZWRTZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24uZGVsZXRlQ29udGVudHMoKTtcbiAgICAgIHJldHVybiBzbGVjdGVkVGV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogY2hlY2sgYW55IHNsZWN0aW9uIGlzIG1hZGUgb3Igbm90ICovXG4gIHByaXZhdGUgY2hlY2tTZWxlY3Rpb24oKTogYW55IHtcbiAgICBjb25zdCBzbGVjdGVkVGV4dCA9IHRoaXMuc2F2ZWRTZWxlY3Rpb24udG9TdHJpbmcoKTtcblxuICAgIGlmIChzbGVjdGVkVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gU2VsZWN0aW9uIE1hZGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayB0YWcgaXMgc3VwcG9ydGVkIGJ5IGJyb3dzZXIgb3Igbm90XG4gICAqXG4gICAqIEBwYXJhbSB0YWcgSFRNTCB0YWdcbiAgICovXG4gIHByaXZhdGUgY2hlY2tUYWdTdXBwb3J0SW5Ccm93c2VyKHRhZzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpIGluc3RhbmNlb2YgSFRNTFVua25vd25FbGVtZW50KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cblxuLyoqIHRpbWUgaW4gd2hpY2ggdGhlIG1lc3NhZ2UgaGFzIHRvIGJlIGNsZWFyZWQgKi9cbmNvbnN0IERVUkFUSU9OID0gNzAwMDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcbiAgLyoqIHZhcmlhYmxlIHRvIGhvbGQgdGhlIHVzZXIgbWVzc2FnZSAqL1xuICBwcml2YXRlIG1lc3NhZ2U6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKiogcmV0dXJucyB0aGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBlZGl0b3IgKi9cbiAgZ2V0TWVzc2FnZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogc2VuZHMgbWVzc2FnZSB0byB0aGUgZWRpdG9yXG4gICAqXG4gICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgc2VudFxuICAgKi9cbiAgc2VuZE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5tZXNzYWdlLm5leHQobWVzc2FnZSk7XG4gICAgdGhpcy5jbGVhck1lc3NhZ2VJbihEVVJBVElPTik7XG4gIH1cblxuICAvKipcbiAgICogYSBzaG9ydCBpbnRlcnZhbCB0byBjbGVhciBtZXNzYWdlXG4gICAqXG4gICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgdGltZSBpbiBzZWNvbmRzIGluIHdoaWNoIHRoZSBtZXNzYWdlIGhhcyB0byBiZSBjbGVhcmVkXG4gICAqL1xuICBwcml2YXRlIGNsZWFyTWVzc2FnZUluKG1pbGxpc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1lc3NhZ2UubmV4dCh1bmRlZmluZWQpO1xuICAgIH0sIG1pbGxpc2Vjb25kcyk7XG4gIH1cbn1cbiIsIi8qKlxuICogdG9vbGJhciBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG5neEVkaXRvckNvbmZpZyA9IHtcbiAgZWRpdGFibGU6IHRydWUsXG4gIHNwZWxsY2hlY2s6IHRydWUsXG4gIGhlaWdodDogJ2F1dG8nLFxuICBtaW5IZWlnaHQ6ICcwJyxcbiAgd2lkdGg6ICdhdXRvJyxcbiAgbWluV2lkdGg6ICcwJyxcbiAgdHJhbnNsYXRlOiAneWVzJyxcbiAgZW5hYmxlVG9vbGJhcjogdHJ1ZSxcbiAgc2hvd1Rvb2xiYXI6IHRydWUsXG4gIHBsYWNlaG9sZGVyOiAnRW50ZXIgdGV4dCBoZXJlLi4uJyxcbiAgaW1hZ2VFbmRQb2ludDogJycsXG4gIHRvb2xiYXI6IFtcbiAgICBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2VUaHJvdWdoJywgJ3N1cGVyc2NyaXB0JywgJ3N1YnNjcmlwdCddLFxuICAgIFsnZm9udE5hbWUnLCAnZm9udFNpemUnLCAnY29sb3InXSxcbiAgICBbJ2p1c3RpZnlMZWZ0JywgJ2p1c3RpZnlDZW50ZXInLCAnanVzdGlmeVJpZ2h0JywgJ2p1c3RpZnlGdWxsJywgJ2luZGVudCcsICdvdXRkZW50J10sXG4gICAgWydjdXQnLCAnY29weScsICdkZWxldGUnLCAncmVtb3ZlRm9ybWF0JywgJ3VuZG8nLCAncmVkbyddLFxuICAgIFsncGFyYWdyYXBoJywgJ2Jsb2NrcXVvdGUnLCAncmVtb3ZlQmxvY2txdW90ZScsICdob3Jpem9udGFsTGluZScsICdvcmRlcmVkTGlzdCcsICd1bm9yZGVyZWRMaXN0J10sXG4gICAgWydsaW5rJywgJ3VubGluaycsICdpbWFnZScsICd2aWRlbyddXG4gIF1cbn07XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiwgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ29tbWFuZEV4ZWN1dG9yU2VydmljZSB9IGZyb20gJy4vY29tbW9uL3NlcnZpY2VzL2NvbW1hbmQtZXhlY3V0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4vY29tbW9uL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZSc7XG5cbmltcG9ydCB7IG5neEVkaXRvckNvbmZpZyB9IGZyb20gJy4vY29tbW9uL25neC1lZGl0b3IuZGVmYXVsdHMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMvbmd4LWVkaXRvci51dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1uZ3gtZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZWRpdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hFZGl0b3JDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dXG59KVxuXG5leHBvcnQgY2xhc3MgTmd4RWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBTcGVjaWZpZXMgd2VhdGhlciB0aGUgdGV4dGFyZWEgdG8gYmUgZWRpdGFibGUgb3Igbm90ICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xuICAvKiogVGhlIHNwZWxsY2hlY2sgcHJvcGVydHkgc3BlY2lmaWVzIHdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgdG8gaGF2ZSBpdHMgc3BlbGxpbmcgYW5kIGdyYW1tYXIgY2hlY2tlZCBvciBub3QuICovXG4gIEBJbnB1dCgpIHNwZWxsY2hlY2s6IGJvb2xlYW47XG4gIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIHRleHRBcmVhICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdHJhbnNsYXRlIHByb3BlcnR5IHNwZWNpZmllcyB3aGV0aGVyIHRoZSBjb250ZW50IG9mIGFuIGVsZW1lbnQgc2hvdWxkIGJlIHRyYW5zbGF0ZWQgb3Igbm90LlxuICAgKlxuICAgKiBDaGVjayBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL3RhZ3MvYXR0X2dsb2JhbF90cmFuc2xhdGUuYXNwIGZvciBtb3JlIGluZm9ybWF0aW9uIGFuZCBicm93c2VyIHN1cHBvcnRcbiAgICovXG4gIEBJbnB1dCgpIHRyYW5zbGF0ZTogc3RyaW5nO1xuICAvKiogU2V0cyBoZWlnaHQgb2YgdGhlIGVkaXRvciAqL1xuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcbiAgLyoqIFNldHMgbWluaW11bSBoZWlnaHQgZm9yIHRoZSBlZGl0b3IgKi9cbiAgQElucHV0KCkgbWluSGVpZ2h0OiBzdHJpbmc7XG4gIC8qKiBTZXRzIFdpZHRoIG9mIHRoZSBlZGl0b3IgKi9cbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcbiAgLyoqIFNldHMgbWluaW11bSB3aWR0aCBvZiB0aGUgZWRpdG9yICovXG4gIEBJbnB1dCgpIG1pbldpZHRoOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUb29sYmFyIGFjY2VwdHMgYW4gYXJyYXkgd2hpY2ggc3BlY2lmaWVzIHRoZSBvcHRpb25zIHRvIGJlIGVuYWJsZWQgZm9yIHRoZSB0b29sYmFyXG4gICAqXG4gICAqIENoZWNrIG5neEVkaXRvckNvbmZpZyBmb3IgdG9vbGJhciBjb25maWd1cmF0aW9uXG4gICAqXG4gICAqIFBhc3NpbmcgYW4gZW1wdHkgYXJyYXkgd2lsbCBlbmFibGUgYWxsIHRvb2xiYXJcbiAgICovXG4gIEBJbnB1dCgpIHRvb2xiYXI6IE9iamVjdDtcbiAgLyoqXG4gICAqIFRoZSBlZGl0b3IgY2FuIGJlIHJlc2l6ZWQgdmVydGljYWxseS5cbiAgICpcbiAgICogYGJhc2ljYCByZXNpemVyIGVuYWJsZXMgdGhlIGh0bWw1IHJlc3ppZXIuIENoZWNrIGhlcmUgaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9jc3NyZWYvY3NzM19wcl9yZXNpemUuYXNwXG4gICAqXG4gICAqIGBzdGFja2AgcmVzaXplciBlbmFibGUgYSByZXNpemVyIHRoYXQgbG9va3MgbGlrZSBhcyBpZiBpbiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tXG4gICAqL1xuICBASW5wdXQoKSByZXNpemVyID0gJ3N0YWNrJztcbiAgLyoqXG4gICAqIFRoZSBjb25maWcgcHJvcGVydHkgaXMgYSBKU09OIG9iamVjdFxuICAgKlxuICAgKiBBbGwgYXZhaWJhbGUgaW5wdXRzIGlucHV0cyBjYW4gYmUgcHJvdmlkZWQgaW4gdGhlIGNvbmZpZ3VyYXRpb24gYXMgSlNPTlxuICAgKiBpbnB1dHMgcHJvdmlkZWQgZGlyZWN0bHkgYXJlIGNvbnNpZGVyZWQgYXMgdG9wIHByaW9yaXR5XG4gICAqL1xuICBASW5wdXQoKSBjb25maWcgPSBuZ3hFZGl0b3JDb25maWc7XG4gIC8qKiBXZWF0aGVyIHRvIHNob3cgb3IgaGlkZSB0b29sYmFyICovXG4gIEBJbnB1dCgpIHNob3dUb29sYmFyOiBib29sZWFuO1xuICAvKiogV2VhdGhlciB0byBlbmFibGUgb3IgZGlzYWJsZSB0aGUgdG9vbGJhciAqL1xuICBASW5wdXQoKSBlbmFibGVUb29sYmFyOiBib29sZWFuO1xuICAvKiogRW5kcG9pbnQgZm9yIHdoaWNoIHRoZSBpbWFnZSB0byBiZSB1cGxvYWRlZCAqL1xuICBASW5wdXQoKSBpbWFnZUVuZFBvaW50OiBzdHJpbmc7XG5cbiAgLyoqIGVtaXRzIGBibHVyYCBldmVudCB3aGVuIGZvY3VzZWQgb3V0IGZyb20gdGhlIHRleHRhcmVhICovXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvKiogZW1pdHMgYGZvY3VzYCBldmVudCB3aGVuIGZvY3VzZWQgaW4gdG8gdGhlIHRleHRhcmVhICovXG4gIEBPdXRwdXQoKSBmb2N1czogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBAVmlld0NoaWxkKCduZ3hUZXh0QXJlYScpIHRleHRBcmVhOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ25neFdyYXBwZXInKSBuZ3hXcmFwcGVyOiBhbnk7XG5cbiAgVXRpbHM6IGFueSA9IFV0aWxzO1xuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQHBhcmFtIF9tZXNzYWdlU2VydmljZSBzZXJ2aWNlIHRvIHNlbmQgbWVzc2FnZSB0byB0aGUgZWRpdG9yIG1lc3NhZ2UgY29tcG9uZW50XG4gICAqIEBwYXJhbSBfY29tbWFuZEV4ZWN1dG9yIGV4ZWN1dGVzIGNvbW1hbmQgZnJvbSB0aGUgdG9vbGJhclxuICAgKiBAcGFyYW0gX3JlbmRlcmVyIGFjY2VzcyBhbmQgbWFuaXB1bGF0ZSB0aGUgZG9tIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcbiAgICBwcml2YXRlIF9jb21tYW5kRXhlY3V0b3I6IENvbW1hbmRFeGVjdXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgLyoqXG4gICAqIGV2ZW50c1xuICAgKi9cbiAgb25UZXh0QXJlYUZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXMuZW1pdCgnZm9jdXMnKTtcbiAgfVxuXG4gIC8qKiBmb2N1cyB0aGUgdGV4dCBhcmVhIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCAqL1xuICBvbkVkaXRvckZvY3VzKCkge1xuICAgIHRoaXMudGV4dEFyZWEubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVkIGZyb20gdGhlIGNvbnRlbnRlZGl0YWJsZSBzZWN0aW9uIHdoaWxlIHRoZSBpbnB1dCBwcm9wZXJ0eSBjaGFuZ2VzXG4gICAqIEBwYXJhbSBodG1sIGh0bWwgc3RyaW5nIGZyb20gY29udGVudGVkaXRhYmxlXG4gICAqL1xuICBvbkNvbnRlbnRDaGFuZ2UoaW5uZXJIVE1MOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoaW5uZXJIVE1MKTtcbiAgICAgIHRoaXMudG9nZ2xlUGxhY2Vob2xkZXIoaW5uZXJIVE1MKTtcbiAgICB9XG4gIH1cblxuICBvblRleHRBcmVhQmx1cigpOiB2b2lkIHtcbiAgICAvKiogc2F2ZSBzZWxlY3Rpb24gaWYgZm9jdXNzZWQgb3V0ICovXG4gICAgdGhpcy5fY29tbWFuZEV4ZWN1dG9yLnNhdmVkU2VsZWN0aW9uID0gVXRpbHMuc2F2ZVNlbGVjdGlvbigpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uVG91Y2hlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG4gICAgdGhpcy5ibHVyLmVtaXQoJ2JsdXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNpemluZyB0ZXh0IGFyZWFcbiAgICpcbiAgICogQHBhcmFtIG9mZnNldFkgdmVydGljYWwgaGVpZ2h0IG9mIHRoZSBlaWR0YWJsZSBwb3J0aW9uIG9mIHRoZSBlZGl0b3JcbiAgICovXG4gIHJlc2l6ZVRleHRBcmVhKG9mZnNldFk6IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBuZXdIZWlnaHQgPSBwYXJzZUludCh0aGlzLmhlaWdodCwgMTApO1xuICAgIG5ld0hlaWdodCArPSBvZmZzZXRZO1xuICAgIHRoaXMuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgJ3B4JztcbiAgICB0aGlzLnRleHRBcmVhLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogZWRpdG9yIGFjdGlvbnMsIGkuZS4sIGV4ZWN1dGVzIGNvbW1hbmQgZnJvbSB0b29sYmFyXG4gICAqXG4gICAqIEBwYXJhbSBjb21tYW5kTmFtZSBuYW1lIG9mIHRoZSBjb21tYW5kIHRvIGJlIGV4ZWN1dGVkXG4gICAqL1xuICBleGVjdXRlQ29tbWFuZChjb21tYW5kTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2NvbW1hbmRFeGVjdXRvci5leGVjdXRlKGNvbW1hbmROYW1lKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2Uuc2VuZE1lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlIGEgbmV3IHZhbHVlIHRvIHRoZSBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdmFsdWUgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVyZSBpcyBhIGNoYW5nZSBpbiBjb250ZW50ZWRpdGFibGVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlUGxhY2Vob2xkZXIodmFsdWUpO1xuXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAnPGJyPicpIHtcbiAgICAgIHZhbHVlID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hWaWV3KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICAgKiB3aGVuIHRoZSBjb250cm9sIHJlY2VpdmVzIGEgY2hhbmdlIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0gZm4gYSBmdW5jdGlvblxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gICAqIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXMgYSB0b3VjaCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIGZuIGEgZnVuY3Rpb25cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlZnJlc2ggdmlldy9IVE1MIG9mIHRoZSBlZGl0b3JcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIGh0bWwgc3RyaW5nIGZyb20gdGhlIGVkaXRvclxuICAgKi9cbiAgcmVmcmVzaFZpZXcodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IHZhbHVlID09PSBudWxsID8gJycgOiB2YWx1ZTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnRleHRBcmVhLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCBub3JtYWxpemVkVmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRvZ2dsZXMgcGxhY2Vob2xkZXIgYmFzZWQgb24gaW5wdXQgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSBBIEhUTUwgc3RyaW5nIGZyb20gdGhlIGVkaXRvclxuICAgKi9cbiAgdG9nZ2xlUGxhY2Vob2xkZXIodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT09ICc8YnI+JyB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMubmd4V3JhcHBlci5uYXRpdmVFbGVtZW50LCAnc2hvdy1wbGFjZWhvbGRlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLm5neFdyYXBwZXIubmF0aXZlRWxlbWVudCwgJ3Nob3ctcGxhY2Vob2xkZXInKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhIGpzb24gY29udGFpbmluZyBpbnB1dCBwYXJhbXNcbiAgICovXG4gIGdldENvbGxlY3RpdmVQYXJhbXMoKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgZWRpdGFibGU6IHRoaXMuZWRpdGFibGUsXG4gICAgICBzcGVsbGNoZWNrOiB0aGlzLnNwZWxsY2hlY2ssXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgIHRyYW5zbGF0ZTogdGhpcy50cmFuc2xhdGUsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgbWluSGVpZ2h0OiB0aGlzLm1pbkhlaWdodCxcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgbWluV2lkdGg6IHRoaXMubWluV2lkdGgsXG4gICAgICBlbmFibGVUb29sYmFyOiB0aGlzLmVuYWJsZVRvb2xiYXIsXG4gICAgICBzaG93VG9vbGJhcjogdGhpcy5zaG93VG9vbGJhcixcbiAgICAgIGltYWdlRW5kUG9pbnQ6IHRoaXMuaW1hZ2VFbmRQb2ludCxcbiAgICAgIHRvb2xiYXI6IHRoaXMudG9vbGJhclxuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvKipcbiAgICAgKiBzZXQgY29uZmlndWFydGlvblxuICAgICAqL1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5VdGlscy5nZXRFZGl0b3JDb25maWd1cmF0aW9uKHRoaXMuY29uZmlnLCBuZ3hFZGl0b3JDb25maWcsIHRoaXMuZ2V0Q29sbGVjdGl2ZVBhcmFtcygpKTtcblxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgfHwgdGhpcy50ZXh0QXJlYS5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmQoJ2VuYWJsZU9iamVjdFJlc2l6aW5nJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuLi9uZ3gtZWRpdG9yLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1uZ3gtZ3JpcHBpZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZ3JpcHBpZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1ncmlwcGllLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hHcmlwcGllQ29tcG9uZW50IHtcbiAgLyoqIGhlaWdodCBvZiB0aGUgZWRpdG9yICovXG4gIGhlaWdodDogbnVtYmVyO1xuICAvKiogcHJldmlvdXMgdmFsdWUgYmVmb3IgcmVzaXppbmcgdGhlIGVkaXRvciAqL1xuICBvbGRZID0gMDtcbiAgLyoqIHNldCB0byB0cnVlIG9uIG1vdXNlZG93biBldmVudCAqL1xuICBncmFiYmVyID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSBfZWRpdG9yQ29tcG9uZW50IEVkaXRvciBjb21wb25lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VkaXRvckNvbXBvbmVudDogTmd4RWRpdG9yQ29tcG9uZW50KSB7IH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IE1vdXNlZXZlbnRcbiAgICpcbiAgICogVXBkYXRlIHRoZSBoZWlnaHQgb2YgdGhlIGVkaXRvciB3aGVuIHRoZSBncmFiYmVyIGlzIGRyYWdnZWRcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNlbW92ZScsIFsnJGV2ZW50J10pIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmdyYWJiZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9lZGl0b3JDb21wb25lbnQucmVzaXplVGV4dEFyZWEoZXZlbnQuY2xpZW50WSAtIHRoaXMub2xkWSk7XG4gICAgdGhpcy5vbGRZID0gZXZlbnQuY2xpZW50WTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgTW91c2VldmVudFxuICAgKlxuICAgKiBzZXQgdGhlIGdyYWJiZXIgdG8gZmFsc2Ugb24gbW91c2UgdXAgYWN0aW9uXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZXVwJywgWyckZXZlbnQnXSkgb25Nb3VzZVVwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5ncmFiYmVyID0gZmFsc2U7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBvblJlc2l6ZShldmVudDogTW91c2VFdmVudCwgcmVzaXplcj86IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5ncmFiYmVyID0gdHJ1ZTtcbiAgICB0aGlzLm9sZFkgPSBldmVudC5jbGllbnRZO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1uZ3gtZWRpdG9yLW1lc3NhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWVkaXRvci1tZXNzYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWVkaXRvci1tZXNzYWdlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hFZGl0b3JNZXNzYWdlQ29tcG9uZW50IHtcbiAgLyoqIHByb3BlcnR5IHRoYXQgaG9sZHMgdGhlIG1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkIG9uIHRoZSBlZGl0b3IgKi9cbiAgbmd4TWVzc2FnZSA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQHBhcmFtIF9tZXNzYWdlU2VydmljZSBzZXJ2aWNlIHRvIHNlbmQgbWVzc2FnZSB0byB0aGUgZWRpdG9yXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UpIHtcbiAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5nZXRNZXNzYWdlKCkuc3Vic2NyaWJlKChtZXNzYWdlOiBzdHJpbmcpID0+IHRoaXMubmd4TWVzc2FnZSA9IG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFycyBlZGl0b3IgbWVzc2FnZVxuICAgKi9cbiAgY2xlYXJNZXNzYWdlKCk6IHZvaWQge1xuICAgIHRoaXMubmd4TWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJ25neC1ib290c3RyYXAnO1xuaW1wb3J0IHsgQ29tbWFuZEV4ZWN1dG9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy9jb21tYW5kLWV4ZWN1dG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4uL2NvbW1vbi91dGlscy9uZ3gtZWRpdG9yLnV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW5neC1lZGl0b3ItdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZWRpdG9yLXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZWRpdG9yLXRvb2xiYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbUG9wb3ZlckNvbmZpZ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hFZGl0b3JUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIGhvbGRzIHZhbHVlcyBvZiB0aGUgaW5zZXJ0IGxpbmsgZm9ybSAqL1xuICB1cmxGb3JtOiBGb3JtR3JvdXA7XG4gIC8qKiBob2xkcyB2YWx1ZXMgb2YgdGhlIGluc2VydCBpbWFnZSBmb3JtICovXG4gIGltYWdlRm9ybTogRm9ybUdyb3VwO1xuICAvKiogaG9sZHMgdmFsdWVzIG9mIHRoZSBpbnNlcnQgdmlkZW8gZm9ybSAqL1xuICB2aWRlb0Zvcm06IEZvcm1Hcm91cDtcbiAgLyoqIHNldCB0byBmYWxzZSB3aGVuIGltYWdlIGlzIGJlaW5nIHVwbG9hZGVkICovXG4gIHVwbG9hZENvbXBsZXRlID0gdHJ1ZTtcbiAgLyoqIHVwbG9hZCBwZXJjZW50YWdlICovXG4gIHVwZGxvYWRQZXJjZW50YWdlID0gMDtcbiAgLyoqIHNldCB0byB0cnVlIHdoZW4gdGhlIGltYWdlIGlzIGJlaW5nIHVwbG9hZGVkICovXG4gIGlzVXBsb2FkaW5nID0gZmFsc2U7XG4gIC8qKiB3aGljaCB0YWIgdG8gYWN0aXZlIGZvciBjb2xvciBpbnNldGlvbiAqL1xuICBzZWxlY3RlZENvbG9yVGFiID0gJ3RleHRDb2xvcic7XG4gIC8qKiBmb250IGZhbWlseSBuYW1lICovXG4gIGZvbnROYW1lID0gJyc7XG4gIC8qKiBmb250IHNpemUgKi9cbiAgZm9udFNpemUgPSAnJztcbiAgLyoqIGhleCBjb2xvciBjb2RlICovXG4gIGhleENvbG9yID0gJyc7XG4gIC8qKiBzaG93L2hpZGUgaW1hZ2UgdXBsb2FkZXIgKi9cbiAgaXNJbWFnZVVwbG9hZGVyID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVkaXRvciBjb25maWd1cmF0aW9uXG4gICAqL1xuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQFZpZXdDaGlsZCgndXJsUG9wb3ZlcicpIHVybFBvcG92ZXI7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlUG9wb3ZlcicpIGltYWdlUG9wb3ZlcjtcbiAgQFZpZXdDaGlsZCgndmlkZW9Qb3BvdmVyJykgdmlkZW9Qb3BvdmVyO1xuICBAVmlld0NoaWxkKCdmb250U2l6ZVBvcG92ZXInKSBmb250U2l6ZVBvcG92ZXI7XG4gIEBWaWV3Q2hpbGQoJ2NvbG9yUG9wb3ZlcicpIGNvbG9yUG9wb3ZlcjtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSB0b29sYmFyIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgZXhlY3V0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb3BPdmVyQ29uZmlnOiBQb3BvdmVyQ29uZmlnLFxuICAgIHByaXZhdGUgX2Zvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY29tbWFuZEV4ZWN1dG9yU2VydmljZTogQ29tbWFuZEV4ZWN1dG9yU2VydmljZSkge1xuICAgIHRoaXMuX3BvcE92ZXJDb25maWcub3V0c2lkZUNsaWNrID0gdHJ1ZTtcbiAgICB0aGlzLl9wb3BPdmVyQ29uZmlnLnBsYWNlbWVudCA9ICdib3R0b20nO1xuICAgIHRoaXMuX3BvcE92ZXJDb25maWcuY29udGFpbmVyID0gJ2JvZHknO1xuICB9XG5cbiAgLyoqXG4gICAqIGVuYWJsZSBvciBkaWFibGUgdG9vbGJhciBiYXNlZCBvbiBjb25maWd1cmF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSBuYW1lIG9mIHRoZSB0b29sYmFyIGJ1dHRvbnNcbiAgICovXG4gIGNhbkVuYWJsZVRvb2xiYXJPcHRpb25zKHZhbHVlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFV0aWxzLmNhbkVuYWJsZVRvb2xiYXJPcHRpb25zKHZhbHVlLCB0aGlzLmNvbmZpZ1sndG9vbGJhciddKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0cmlnZ2VycyBjb21tYW5kIGZyb20gdGhlIHRvb2xiYXIgdG8gYmUgZXhlY3V0ZWQgYW5kIGVtaXRzIGFuIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSBjb21tYW5kIG5hbWUgb2YgdGhlIGNvbW1hbmQgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIHRyaWdnZXJDb21tYW5kKGNvbW1hbmQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZXhlY3V0ZS5lbWl0KGNvbW1hbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBVUkwgaW5zZXJ0IGZvcm1cbiAgICovXG4gIGJ1aWxkVXJsRm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLnVybEZvcm0gPSB0aGlzLl9mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICB1cmxMaW5rOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXG4gICAgICB1cmxUZXh0OiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXG4gICAgICB1cmxOZXdUYWI6IFt0cnVlXVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGluc2VydHMgbGluayBpbiB0aGUgZWRpdG9yXG4gICAqL1xuICBpbnNlcnRMaW5rKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9jb21tYW5kRXhlY3V0b3JTZXJ2aWNlLmNyZWF0ZUxpbmsodGhpcy51cmxGb3JtLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2Uuc2VuZE1lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqIHJlc2V0IGZvcm0gdG8gZGVmYXVsdCAqL1xuICAgIHRoaXMuYnVpbGRVcmxGb3JtKCk7XG4gICAgLyoqIGNsb3NlIGluc2V0IFVSTCBwb3AgdXAgKi9cbiAgICB0aGlzLnVybFBvcG92ZXIuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBpbnNlcnQgaW1hZ2UgZm9ybVxuICAgKi9cbiAgYnVpbGRJbWFnZUZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5pbWFnZUZvcm0gPSB0aGlzLl9mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBpbWFnZVVybDogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIGluc2VydCBpbWFnZSBmb3JtXG4gICAqL1xuICBidWlsZFZpZGVvRm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZGVvRm9ybSA9IHRoaXMuX2Zvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHZpZGVvVXJsOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXG4gICAgICBoZWlnaHQ6IFsnJ10sXG4gICAgICB3aWR0aDogWycnXVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVkIHdoZW4gZmlsZSBpcyBzZWxlY3RlZFxuICAgKlxuICAgKiBAcGFyYW0gZSBvbkNoYW5nZSBldmVudFxuICAgKi9cbiAgb25GaWxlQ2hhbmdlKGUpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZENvbXBsZXRlID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IHRydWU7XG5cbiAgICBpZiAoZS50YXJnZXQuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9jb21tYW5kRXhlY3V0b3JTZXJ2aWNlLnVwbG9hZEltYWdlKGZpbGUsIHRoaXMuY29uZmlnLmltYWdlRW5kUG9pbnQpLnN1YnNjcmliZShldmVudCA9PiB7XG5cbiAgICAgICAgICBpZiAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgdGhpcy51cGRsb2FkUGVyY2VudGFnZSA9IE1hdGgucm91bmQoMTAwICogZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdGhpcy5fY29tbWFuZEV4ZWN1dG9yU2VydmljZS5pbnNlcnRJbWFnZShldmVudC5ib2R5LnVybCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5zZW5kTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBsb2FkQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5zZW5kTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy51cGxvYWRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogaW5zZXJ0IGltYWdlIGluIHRoZSBlZGl0b3IgKi9cbiAgaW5zZXJ0SW1hZ2UoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2NvbW1hbmRFeGVjdXRvclNlcnZpY2UuaW5zZXJ0SW1hZ2UodGhpcy5pbWFnZUZvcm0udmFsdWUuaW1hZ2VVcmwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5zZW5kTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKiogcmVzZXQgZm9ybSB0byBkZWZhdWx0ICovXG4gICAgdGhpcy5idWlsZEltYWdlRm9ybSgpO1xuICAgIC8qKiBjbG9zZSBpbnNldCBVUkwgcG9wIHVwICovXG4gICAgdGhpcy5pbWFnZVBvcG92ZXIuaGlkZSgpO1xuICB9XG5cbiAgLyoqIGluc2VydCBpbWFnZSBpbiB0aGUgZWRpdG9yICovXG4gIGluc2VydFZpZGVvKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9jb21tYW5kRXhlY3V0b3JTZXJ2aWNlLmluc2VydFZpZGVvKHRoaXMudmlkZW9Gb3JtLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2Uuc2VuZE1lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqIHJlc2V0IGZvcm0gdG8gZGVmYXVsdCAqL1xuICAgIHRoaXMuYnVpbGRWaWRlb0Zvcm0oKTtcbiAgICAvKiogY2xvc2UgaW5zZXQgVVJMIHBvcCB1cCAqL1xuICAgIHRoaXMudmlkZW9Qb3BvdmVyLmhpZGUoKTtcbiAgfVxuXG4gIC8qKiBpbnNlciB0ZXh0L2JhY2tncm91bmQgY29sb3IgKi9cbiAgaW5zZXJ0Q29sb3IoY29sb3I6IHN0cmluZywgd2hlcmU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9jb21tYW5kRXhlY3V0b3JTZXJ2aWNlLmluc2VydENvbG9yKGNvbG9yLCB3aGVyZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLnNlbmRNZXNzYWdlKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHRoaXMuY29sb3JQb3BvdmVyLmhpZGUoKTtcbiAgfVxuXG4gIC8qKiBzZXQgZm9udCBzaXplICovXG4gIHNldEZvbnRTaXplKGZvbnRTaXplOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fY29tbWFuZEV4ZWN1dG9yU2VydmljZS5zZXRGb250U2l6ZShmb250U2l6ZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLnNlbmRNZXNzYWdlKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHRoaXMuZm9udFNpemVQb3BvdmVyLmhpZGUoKTtcbiAgfVxuXG4gIC8qKiBzZXQgZm9udCBOYW1lL2ZhbWlseSAqL1xuICBzZXRGb250TmFtZShmb250TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2NvbW1hbmRFeGVjdXRvclNlcnZpY2Uuc2V0Rm9udE5hbWUoZm9udE5hbWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5zZW5kTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICB0aGlzLmZvbnRTaXplUG9wb3Zlci5oaWRlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmJ1aWxkVXJsRm9ybSgpO1xuICAgIHRoaXMuYnVpbGRJbWFnZUZvcm0oKTtcbiAgICB0aGlzLmJ1aWxkVmlkZW9Gb3JtKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUG9wb3Zlck1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAnO1xuaW1wb3J0IHsgTmd4RWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hHcmlwcGllQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZ3JpcHBpZS9uZ3gtZ3JpcHBpZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4RWRpdG9yTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWVkaXRvci1tZXNzYWdlL25neC1lZGl0b3ItbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4RWRpdG9yVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWVkaXRvci10b29sYmFyL25neC1lZGl0b3ItdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuL2NvbW1vbi9zZXJ2aWNlcy9tZXNzYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbWFuZEV4ZWN1dG9yU2VydmljZSB9IGZyb20gJy4vY29tbW9uL3NlcnZpY2VzL2NvbW1hbmQtZXhlY3V0b3Iuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBQb3BvdmVyTW9kdWxlLmZvclJvb3QoKV0sXG4gIGRlY2xhcmF0aW9uczogW05neEVkaXRvckNvbXBvbmVudCwgTmd4R3JpcHBpZUNvbXBvbmVudCwgTmd4RWRpdG9yTWVzc2FnZUNvbXBvbmVudCwgTmd4RWRpdG9yVG9vbGJhckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOZ3hFZGl0b3JDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtDb21tYW5kRXhlY3V0b3JTZXJ2aWNlLCBNZXNzYWdlU2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hFZGl0b3JNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmludGVyZmFjZSBJTWF4TGVuZ3RoVmFsaWRhdG9yT3B0aW9ucyB7XG4gIGV4Y2x1ZGVMaW5lQnJlYWtzPzogYm9vbGVhbjtcbiAgY29uY2F0V2hpdGVTcGFjZXM/OiBib29sZWFuO1xuICBleGNsdWRlV2hpdGVTcGFjZXM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTWF4TGVuZ3RoVmFsaWRhdG9yKG1heGxlbmd0aDogbnVtYmVyLCBvcHRpb25zPzogSU1heExlbmd0aFZhbGlkYXRvck9wdGlvbnMpIHtcbiAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCA9PiB7XG4gICAgY29uc3QgcGFyc2VkRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGNvbnRyb2wudmFsdWUsICd0ZXh0L2h0bWwnKTtcbiAgICBsZXQgaW5uZXJUZXh0ID0gcGFyc2VkRG9jdW1lbnQuYm9keS5pbm5lclRleHQgfHwgJyc7XG5cbiAgICAvLyByZXBsYWNlIGFsbCBsaW5lYnJlYWtzXG4gICAgaWYgKG9wdGlvbnMuZXhjbHVkZUxpbmVCcmVha3MpIHtcbiAgICAgIGlubmVyVGV4dCA9IGlubmVyVGV4dC5yZXBsYWNlKC8oXFxyXFxuXFx0fFxcbnxcXHJcXHQpL2dtLCAnJyk7XG4gICAgfVxuXG4gICAgLy8gY29uY2F0IG11bHRpcGxlIHdoaXRlc3BhY2VzIGludG8gYSBzaW5nbGUgd2hpdGVzcGFjZVxuICAgIGlmIChvcHRpb25zLmNvbmNhdFdoaXRlU3BhY2VzKSB7XG4gICAgICBpbm5lclRleHQgPSBpbm5lclRleHQucmVwbGFjZSgvKFxcc1xccyspL2dtLCAnICcpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBhbGwgd2hpdGVzcGFjZXNcbiAgICBpZiAob3B0aW9ucy5leGNsdWRlV2hpdGVTcGFjZXMpIHtcbiAgICAgIGlubmVyVGV4dCA9IGlubmVyVGV4dC5yZXBsYWNlKC8oXFxzKS9nbSwgJycpO1xuICAgIH1cblxuICAgIGlmIChpbm5lclRleHQubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZ3hFZGl0b3I6IHtcbiAgICAgICAgICBhbGxvd2VkTGVuZ3RoOiBtYXhsZW5ndGgsXG4gICAgICAgICAgdGV4dExlbmd0aDogaW5uZXJUZXh0Lmxlbmd0aFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbn1cbiJdLCJuYW1lcyI6WyJVdGlscy5yZXN0b3JlU2VsZWN0aW9uIiwiVXRpbHMuc2F2ZVNlbGVjdGlvbiIsIlV0aWxzLmNhbkVuYWJsZVRvb2xiYXJPcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxpQ0FBd0MsS0FBYSxFQUFFLE9BQVk7SUFDakUsSUFBSSxLQUFLLEVBQUU7UUFDVCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNOztZQUNMLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDaEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQztZQUVILE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7Q0FDRjs7Ozs7Ozs7O0FBU0QsZ0NBQXVDLEtBQVUsRUFBRSxlQUFvQixFQUFFLEtBQVU7SUFDakYsS0FBSyxNQUFNLENBQUMsSUFBSSxlQUFlLEVBQUU7UUFDL0IsSUFBSSxDQUFDLEVBQUU7WUFDTCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDNUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQztDQUNkOzs7Ozs7O0FBT0QsbUJBQTBCLE9BQWU7SUFDdkMsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1FBQ3ZCLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7QUFLRDtJQUNFLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTs7UUFDdkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xDLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDeEQsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDL0I7SUFDRCxPQUFPLElBQUksQ0FBQztDQUNiOzs7Ozs7O0FBT0QsMEJBQWlDLEtBQUs7SUFDcEMsSUFBSSxLQUFLLEVBQUU7UUFDVCxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1lBQ3ZCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEQsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2YsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO1NBQU07UUFDTCxPQUFPLEtBQUssQ0FBQztLQUNkO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7O0FDMUZEOzs7OztJQWFFLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7Ozs7OEJBTmYsU0FBUztLQU1XOzs7Ozs7O0lBTzFDLE9BQU8sQ0FBQyxPQUFlO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sS0FBSyxzQkFBc0IsRUFBRTtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDeEM7UUFFRCxJQUFJLE9BQU8sS0FBSyxzQkFBc0IsRUFBRTtZQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxPQUFPLEtBQUssWUFBWSxFQUFFO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMxRDtRQUVELElBQUksT0FBTyxLQUFLLGtCQUFrQixFQUFFO1lBQ2xDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNuRDtRQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1Qzs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxRQUFnQjtRQUMxQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxRQUFRLEVBQUU7O2dCQUNaLE1BQU0sUUFBUSxHQUFHQSxnQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdELElBQUksUUFBUSxFQUFFOztvQkFDWixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDaEM7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7S0FDRjs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxVQUFlO1FBQ3pCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLFVBQVUsRUFBRTs7Z0JBQ2QsTUFBTSxRQUFRLEdBQUdBLGdCQUFzQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxRQUFRLEVBQUU7b0JBQ1osSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTs7d0JBQzNDLE1BQU0sVUFBVSxHQUFHLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRzs4QkFDNUYsT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDO3dCQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM3Qjt5QkFBTSxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFFakQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTs7NEJBQ3hDLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRztrQ0FDekYsZ0NBQWdDLEdBQUcsVUFBVSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7NEJBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQzNCOzZCQUFNOzRCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt5QkFDdEM7cUJBRUY7eUJBQU07d0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3FCQUMzQztpQkFDRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUM1QztLQUNGOzs7Ozs7O0lBT08sYUFBYSxDQUFDLEdBQVc7O1FBQy9CLE1BQU0sUUFBUSxHQUFHLHVEQUF1RCxDQUFDO1FBQ3pFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztJQU9wQixVQUFVLENBQUMsR0FBVzs7UUFDNUIsTUFBTSxTQUFTLEdBQUcsNkVBQTZFLENBQUM7UUFDaEcsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFTN0IsV0FBVyxDQUFDLElBQVUsRUFBRSxRQUFnQjtRQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQzdEOztRQUVELE1BQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFFMUMsSUFBSSxJQUFJLEVBQUU7WUFFUixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFFOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7Z0JBQ3RELGNBQWMsRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFaEM7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEM7S0FDRjs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxNQUFXO1FBQ3BCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTs7OztZQUl2QixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7O2dCQUNwQixNQUFNLE1BQU0sR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFFN0YsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTs7b0JBQzVDLE1BQU0sUUFBUSxHQUFHQSxnQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzdELElBQUksUUFBUSxFQUFFO3dCQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3pCO2lCQUNGO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztpQkFDMUU7YUFDRjtpQkFBTTs7Z0JBQ0wsTUFBTSxRQUFRLEdBQUdBLGdCQUFzQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxRQUFRLEVBQUU7b0JBQ1osUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0Q7YUFDRjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7S0FDRjs7Ozs7Ozs7SUFRRCxXQUFXLENBQUMsS0FBYSxFQUFFLEtBQWE7UUFDdEMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFOztZQUN2QixNQUFNLFFBQVEsR0FBR0EsZ0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdELElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxLQUFLLEtBQUssV0FBVyxFQUFFO29CQUN6QixRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2pEO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDbkQ7YUFDRjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7S0FDRjs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxRQUFnQjtRQUMxQixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFOztZQUNoRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUVoRCxJQUFJLFlBQVksRUFBRTs7Z0JBQ2hCLE1BQU0sUUFBUSxHQUFHQSxnQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTdELElBQUksUUFBUSxFQUFFO29CQUNaLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTs7d0JBQzVCLE1BQU0sTUFBTSxHQUFHLDBCQUEwQixHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQzt3QkFDMUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDekI7eUJBQU07O3dCQUNMLE1BQU0sTUFBTSxHQUFHLDBCQUEwQixHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQzt3QkFDeEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDekI7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7S0FDRjs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxRQUFnQjtRQUMxQixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFOztZQUNoRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUVoRCxJQUFJLFlBQVksRUFBRTs7Z0JBQ2hCLE1BQU0sUUFBUSxHQUFHQSxnQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTdELElBQUksUUFBUSxFQUFFO29CQUNaLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTs7d0JBQzVCLE1BQU0sVUFBVSxHQUFHLDRCQUE0QixHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQzt3QkFDaEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDN0I7eUJBQU07O3dCQUNMLE1BQU0sVUFBVSxHQUFHLDRCQUE0QixHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQzt3QkFDOUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDN0I7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7S0FDRjs7Ozs7O0lBR08sVUFBVSxDQUFDLElBQVk7O1FBQzdCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUNwRDs7Ozs7Ozs7O0lBUUssU0FBUyxDQUFDLEtBQVU7UUFDMUIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFJM0IsbUJBQW1COztRQUN6QixJQUFJLFdBQVcsQ0FBQztRQUVoQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNyQyxPQUFPLFdBQVcsQ0FBQztTQUNwQjtRQUVELE9BQU8sS0FBSyxDQUFDOzs7Ozs7SUFJUCxjQUFjOztRQUNwQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRW5ELElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxJQUFJLENBQUM7Ozs7Ozs7O0lBUU4sd0JBQXdCLENBQUMsR0FBVztRQUMxQyxPQUFPLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxrQkFBa0IsQ0FBQyxDQUFDOzs7O1lBclN2RSxVQUFVOzs7O1lBSEYsVUFBVTs7Ozs7OztBQ0RuQjs7O0FBS0EsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBR3RCO0lBSUU7Ozs7dUJBRm1DLElBQUksT0FBTyxFQUFFO0tBRS9COzs7OztJQUdqQixVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3BDOzs7Ozs7O0lBT0QsV0FBVyxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQjs7Ozs7OztJQU9PLGNBQWMsQ0FBQyxZQUFvQjtRQUN6QyxVQUFVLENBQUM7WUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QixFQUFFLFlBQVksQ0FBQyxDQUFDOzs7O1lBOUJwQixVQUFVOzs7Ozs7Ozs7Ozs7QUNKWCxNQUFhLGVBQWUsR0FBRztJQUM3QixRQUFRLEVBQUUsSUFBSTtJQUNkLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsU0FBUyxFQUFFLEdBQUc7SUFDZCxLQUFLLEVBQUUsTUFBTTtJQUNiLFFBQVEsRUFBRSxHQUFHO0lBQ2IsU0FBUyxFQUFFLEtBQUs7SUFDaEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsV0FBVyxFQUFFLElBQUk7SUFDakIsV0FBVyxFQUFFLG9CQUFvQjtJQUNqQyxhQUFhLEVBQUUsRUFBRTtJQUNqQixPQUFPLEVBQUU7UUFDUCxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDO1FBQzVFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUM7UUFDakMsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUNwRixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3pELENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO1FBQ2pHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO0tBQ3JDO0NBQ0YsQ0FBQzs7Ozs7O0FDdkJGOzs7Ozs7SUE0RkUsWUFDVSxpQkFDQSxrQkFDQTtRQUZBLG9CQUFlLEdBQWYsZUFBZTtRQUNmLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDaEIsY0FBUyxHQUFULFNBQVM7Ozs7Ozs7O3VCQXBDQSxPQUFPOzs7Ozs7O3NCQU9SLGVBQWU7Ozs7b0JBU00sSUFBSSxZQUFZLEVBQVU7Ozs7cUJBRXpCLElBQUksWUFBWSxFQUFVO3FCQUtyRCxLQUFLO0tBYWlCOzs7OztJQUtuQyxlQUFlO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBR0QsYUFBYTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3JDOzs7Ozs7SUFNRCxlQUFlLENBQUMsU0FBaUI7UUFDL0IsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25DO0tBQ0Y7Ozs7SUFFRCxjQUFjOztRQUVaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUdDLGFBQW1CLEVBQUUsQ0FBQztRQUU3RCxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDeEI7Ozs7Ozs7SUFPRCxjQUFjLENBQUMsT0FBZTs7UUFDNUIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUMsU0FBUyxJQUFJLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3hEOzs7Ozs7O0lBT0QsY0FBYyxDQUFDLFdBQW1CO1FBQ2hDLElBQUk7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7S0FDRjs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QixJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7WUFDN0UsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNkO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7SUFRRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0tBQ3BCOzs7Ozs7OztJQVFELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDckI7Ozs7Ozs7SUFPRCxXQUFXLENBQUMsS0FBYTs7UUFDdkIsTUFBTSxlQUFlLEdBQUcsS0FBSyxLQUFLLElBQUksR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztLQUN2Rjs7Ozs7OztJQU9ELGlCQUFpQixDQUFDLEtBQVU7UUFDMUIsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUM1RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUMvRTtLQUNGOzs7OztJQUtELG1CQUFtQjtRQUNqQixPQUFPO1lBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztLQUNIOzs7O0lBRUQsUUFBUTs7OztRQUlOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBRTFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFFdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0tBQzdDOzs7WUF0T0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGloQ0FBMEM7Z0JBRTFDLFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzt3QkFDakQsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQzs7YUFDSDs7OztZQWRRLGNBQWM7WUFEZCxzQkFBc0I7WUFKZixTQUFTOzs7dUJBdUJ0QixLQUFLO3lCQUVMLEtBQUs7MEJBRUwsS0FBSzt3QkFNTCxLQUFLO3FCQUVMLEtBQUs7d0JBRUwsS0FBSztvQkFFTCxLQUFLO3VCQUVMLEtBQUs7c0JBUUwsS0FBSztzQkFRTCxLQUFLO3FCQU9MLEtBQUs7MEJBRUwsS0FBSzs0QkFFTCxLQUFLOzRCQUVMLEtBQUs7bUJBR0wsTUFBTTtvQkFFTixNQUFNO3VCQUVOLFNBQVMsU0FBQyxhQUFhO3lCQUN2QixTQUFTLFNBQUMsWUFBWTs7Ozs7OztBQ2hGekI7Ozs7OztJQXNCRSxZQUFvQixnQkFBb0M7UUFBcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjs7OztvQkFUakQsQ0FBQzs7Ozt1QkFFRSxLQUFLO0tBTzhDOzs7Ozs7OztJQVFiLFdBQVcsQ0FBQyxLQUFpQjtRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztLQUMzQjs7Ozs7Ozs7SUFRNkMsU0FBUyxDQUFDLEtBQWlCO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7Ozs7SUFFc0MsUUFBUSxDQUFDLEtBQWlCLEVBQUUsT0FBa0I7UUFDbkYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN4Qjs7O1lBbERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiwrdkJBQTJDOzthQUU1Qzs7OztZQU5RLGtCQUFrQjs7OzBCQTZCeEIsWUFBWSxTQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDO3dCQWU3QyxZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7dUJBSTNDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7QUNqRHZDOzs7O0lBaUJFLFlBQW9CLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjs7OzswQkFMdEMsU0FBUztRQU1wQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQWUsS0FBSyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQzdGOzs7OztJQUtELFlBQVk7UUFDVixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztLQUM3Qjs7O1lBdEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQywrSEFBa0Q7O2FBRW5EOzs7O1lBTlEsY0FBYzs7Ozs7OztBQ0Z2Qjs7Ozs7OztJQXFERSxZQUFvQixjQUE2QixFQUN2QyxjQUNBLGlCQUNBO1FBSFUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDdkMsaUJBQVksR0FBWixZQUFZO1FBQ1osb0JBQWUsR0FBZixlQUFlO1FBQ2YsNEJBQXVCLEdBQXZCLHVCQUF1Qjs7Ozs4QkFqQ2hCLElBQUk7Ozs7aUNBRUQsQ0FBQzs7OzsyQkFFUCxLQUFLOzs7O2dDQUVBLFdBQVc7Ozs7d0JBRW5CLEVBQUU7Ozs7d0JBRUYsRUFBRTs7Ozt3QkFFRixFQUFFOzs7OytCQUVLLEtBQUs7Ozs7dUJBY21CLElBQUksWUFBWSxFQUFVO1FBTWxFLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0tBQ3hDOzs7Ozs7O0lBT0QsdUJBQXVCLENBQUMsS0FBSztRQUMzQixPQUFPQyx1QkFBNkIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7O0lBT0QsY0FBYyxDQUFDLE9BQWU7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBS0QsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDckMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDbEIsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUk7WUFDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0Q7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDs7UUFHRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7O1FBRXBCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7Ozs7O0lBS0QsY0FBYztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDdkMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDLENBQUMsQ0FBQztLQUNKOzs7OztJQUtELGNBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDWixDQUFDLENBQUM7S0FDSjs7Ozs7OztJQU9ELFlBQVksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztZQUM3QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQixJQUFJO2dCQUNGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUs7b0JBRXZGLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDZCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3ZFO29CQUVELElBQUksS0FBSyxZQUFZLFlBQVksRUFBRTt3QkFDakMsSUFBSTs0QkFDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQzFEO3dCQUFDLE9BQU8sS0FBSyxFQUFFOzRCQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDakQ7d0JBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7d0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO3FCQUMxQjtpQkFDRixDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQzFCO1NBQ0Y7S0FDRjs7Ozs7SUFHRCxXQUFXO1FBQ1QsSUFBSTtZQUNGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDs7UUFHRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBRXRCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDMUI7Ozs7O0lBR0QsV0FBVztRQUNULElBQUk7WUFDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDs7UUFHRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBRXRCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDMUI7Ozs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBYSxFQUFFLEtBQWE7UUFDdEMsSUFBSTtZQUNGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzFCOzs7Ozs7SUFHRCxXQUFXLENBQUMsUUFBZ0I7UUFDMUIsSUFBSTtZQUNGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDN0I7Ozs7OztJQUdELFdBQVcsQ0FBQyxRQUFnQjtRQUMxQixJQUFJO1lBQ0YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM3Qjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7O1lBN05GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxneGdCQUFrRDtnQkFFbEQsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDOzthQUMzQjs7OztZQVZRLGFBQWE7WUFGYixXQUFXO1lBSVgsY0FBYztZQURkLHNCQUFzQjs7O3FCQXNDNUIsS0FBSzt5QkFDTCxTQUFTLFNBQUMsWUFBWTsyQkFDdEIsU0FBUyxTQUFDLGNBQWM7MkJBQ3hCLFNBQVMsU0FBQyxjQUFjOzhCQUN4QixTQUFTLFNBQUMsaUJBQWlCOzJCQUMzQixTQUFTLFNBQUMsY0FBYztzQkFJeEIsTUFBTTs7Ozs7OztBQ25EVDs7O1lBWUMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNsRixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztnQkFDN0csT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQzdCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQzthQUNwRDs7Ozs7Ozs7Ozs7O0FDVEQsNEJBQW1DLFNBQWlCLEVBQUUsT0FBb0M7SUFDeEYsT0FBTyxDQUFDLE9BQXdCOztRQUM5QixNQUFNLGNBQWMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDOztRQUNuRixJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7O1FBR3BELElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFO1lBQzdCLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEOztRQUdELElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFO1lBQzdCLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqRDs7UUFHRCxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtZQUM5QixTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFO1lBQ2hDLE9BQU87Z0JBQ0wsU0FBUyxFQUFFO29CQUNULGFBQWEsRUFBRSxTQUFTO29CQUN4QixVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU07aUJBQzdCO2FBQ0YsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYixDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7OyJ9

/***/ }),

/***/ "./node_modules/ngx-mask/fesm2015/ngx-mask.js":
/*!****************************************************!*\
  !*** ./node_modules/ngx-mask/fesm2015/ngx-mask.js ***!
  \****************************************************/
/*! exports provided: INITIAL_CONFIG, MaskDirective, MaskPipe, MaskService, NEW_CONFIG, NgxMaskModule, _configFactory, config, initialConfig, withoutValidation, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_CONFIG", function() { return INITIAL_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskDirective", function() { return MaskDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskPipe", function() { return MaskPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskService", function() { return MaskService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_CONFIG", function() { return NEW_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxMaskModule", function() { return NgxMaskModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_configFactory", function() { return _configFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialConfig", function() { return initialConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withoutValidation", function() { return withoutValidation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return MaskApplierService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");





const config = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('config');
const NEW_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NEW_CONFIG');
const INITIAL_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('INITIAL_CONFIG');
const initialConfig = {
    suffix: '',
    prefix: '',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    dropSpecialCharacters: true,
    hiddenInput: undefined,
    shownMaskExpression: '',
    validation: true,
    // tslint:disable-next-line: quotemark
    specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true,
        },
        X: {
            pattern: new RegExp('\\d'),
            symbol: '*',
        },
        A: {
            pattern: new RegExp('[a-zA-Z0-9]'),
        },
        S: {
            pattern: new RegExp('[a-zA-Z]'),
        },
        d: {
            pattern: new RegExp('\\d'),
        },
        m: {
            pattern: new RegExp('\\d'),
        },
        M: {
            pattern: new RegExp('\\d'),
        },
        H: {
            pattern: new RegExp('\\d'),
        },
        h: {
            pattern: new RegExp('\\d'),
        },
        s: {
            pattern: new RegExp('\\d'),
        },
    },
};
const withoutValidation = [
    'percent',
    'Hh:m0:s0',
    'Hh:m0',
    'Hh',
    'm0:s0',
    's0',
    'm0',
    'separator',
    'dot_separator',
    'comma_separator',
    'd0/M0/0000',
    'd0/M0',
    'd0',
    'M0',
];

var Separators;
(function (Separators) {
    Separators["SEPARATOR"] = "separator";
    Separators["COMMA_SEPARATOR"] = "comma_separator";
    Separators["DOT_SEPARATOR"] = "dot_separator";
})(Separators || (Separators = {}));
let MaskApplierService = class MaskApplierService {
    constructor(_config) {
        this._config = _config;
        this.maskExpression = '';
        this.actualValue = '';
        this.shownMaskExpression = '';
        this.separator = (str, char, decimalChar, precision) => {
            str += '';
            const x = str.split(decimalChar);
            const decimals = x.length > 1 ? `${decimalChar}${x[1]}` : '';
            let res = x[0];
            const rgx = /(\d+)(\d{3})/;
            while (rgx.test(res)) {
                res = res.replace(rgx, '$1' + char + '$2');
            }
            if (precision === undefined) {
                return res + decimals;
            }
            else if (precision === 0) {
                return res;
            }
            return res + decimals.substr(0, precision + 1);
        };
        this.percentage = (str) => {
            return Number(str) >= 0 && Number(str) <= 100;
        };
        this.getPrecision = (maskExpression) => {
            const x = maskExpression.split('.');
            if (x.length > 1) {
                return Number(x[x.length - 1]);
            }
            return Infinity;
        };
        this.checkInputPrecision = (inputValue, precision, decimalMarker) => {
            if (precision < Infinity) {
                let precisionRegEx;
                if (decimalMarker === '.') {
                    precisionRegEx = new RegExp(`\\.\\d{${precision}}.*$`);
                }
                else {
                    precisionRegEx = new RegExp(`,\\d{${precision}}.*$`);
                }
                const precisionMatch = inputValue.match(precisionRegEx);
                if (precisionMatch && precisionMatch[0].length - 1 > precision) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                else if (precision === 0 && inputValue.endsWith(decimalMarker)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
            }
            return inputValue;
        };
        this._shift = new Set();
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = this._config.specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.suffix = this._config.suffix;
        this.hiddenInput = this._config.hiddenInput;
        this.showMaskTyped = this._config.showMaskTyped;
        this.validation = this._config.validation;
    }
    // tslint:disable-next-line:no-any
    applyMaskWithPattern(inputValue, maskAndPattern) {
        const [mask, customPattern] = maskAndPattern;
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    }
    applyMask(inputValue, maskExpression, position = 0, cb = () => { }) {
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        let cursor = 0;
        let result = ``;
        let multi = false;
        let backspaceShift = false;
        let shift = 1;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        const inputArray = inputValue.toString().split('');
        if (maskExpression === 'IP') {
            this.ipError = !!(inputArray.filter((i) => i === '.').length < 3 && inputArray.length < 7);
            maskExpression = '099.099.099.099';
        }
        if (maskExpression.startsWith('percent')) {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                inputValue = this._checkInput(inputValue);
                const precision = this.getPrecision(maskExpression);
                inputValue = this.checkInputPrecision(inputValue, precision, '.');
            }
            if (this.percentage(inputValue)) {
                result = inputValue;
            }
            else {
                result = inputValue.substring(0, inputValue.length - 1);
            }
        }
        else if (maskExpression.startsWith(Separators.SEPARATOR) ||
            maskExpression.startsWith(Separators.DOT_SEPARATOR) ||
            maskExpression.startsWith(Separators.COMMA_SEPARATOR)) {
            if (inputValue.match('[wа-яА-Я]') ||
                inputValue.match('[ЁёА-я]') ||
                inputValue.match('[a-z]|[A-Z]') ||
                inputValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\[\]:";<>.?\/]/)) {
                inputValue = this._checkInput(inputValue);
            }
            const precision = this.getPrecision(maskExpression);
            let strForSep;
            if (maskExpression.startsWith(Separators.SEPARATOR)) {
                if (inputValue.includes(',') &&
                    inputValue.endsWith(',') &&
                    inputValue.indexOf(',') !== inputValue.lastIndexOf(',')) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                inputValue = inputValue.replace('.', ' ');
            }
            if (maskExpression.startsWith(Separators.DOT_SEPARATOR)) {
                if (inputValue.indexOf('.') !== -1 &&
                    inputValue.indexOf('.') === inputValue.lastIndexOf('.') &&
                    (inputValue.indexOf('.') > 3 || inputValue.length < 6)) {
                    inputValue = inputValue.replace('.', ',');
                }
                inputValue =
                    inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== ','
                        ? inputValue.slice(1, inputValue.length)
                        : inputValue;
            }
            if (maskExpression.startsWith(Separators.COMMA_SEPARATOR)) {
                inputValue =
                    inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== '.'
                        ? inputValue.slice(1, inputValue.length)
                        : inputValue;
            }
            if (maskExpression.startsWith(Separators.SEPARATOR)) {
                if (inputValue.match(/[@#!$%^&*()_+|~=`{}\[\]:.";<>?\/]/)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                inputValue = this.checkInputPrecision(inputValue, precision, ',');
                strForSep = inputValue.replace(/\s/g, '');
                result = this.separator(strForSep, ' ', ',', precision);
            }
            else if (maskExpression.startsWith(Separators.DOT_SEPARATOR)) {
                if (inputValue.match(/[@#!$%^&*()_+|~=`{}\[\]:\s";<>?\/]/)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                inputValue = this.checkInputPrecision(inputValue, precision, ',');
                strForSep = inputValue.replace(/\./g, '');
                result = this.separator(strForSep, '.', ',', precision);
            }
            else if (maskExpression.startsWith(Separators.COMMA_SEPARATOR)) {
                strForSep = inputValue.replace(/,/g, '');
                result = this.separator(strForSep, ',', '.', precision);
            }
            const commaShift = result.indexOf(',') - inputValue.indexOf(',');
            const shiftStep = result.length - inputValue.length;
            if (shiftStep > 0 && result[position] !== ',') {
                backspaceShift = true;
                let _shift = 0;
                do {
                    this._shift.add(position + _shift);
                    _shift++;
                } while (_shift < shiftStep);
            }
            else if ((commaShift !== 0 && position > 0 && !(result.indexOf(',') >= position && position > 3)) ||
                (!(result.indexOf('.') >= position && position > 3) && shiftStep <= 0)) {
                this._shift.clear();
                backspaceShift = true;
                shift = shiftStep;
                position += shiftStep;
                this._shift.add(position);
            }
            else {
                this._shift.clear();
            }
        }
        else {
            for (
            // tslint:disable-next-line
            let i = 0, inputSymbol = inputArray[0]; i < inputArray.length; i++, inputSymbol = inputArray[i]) {
                if (cursor === maskExpression.length) {
                    break;
                }
                if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                    result += inputSymbol;
                    cursor += 2;
                }
                else if (maskExpression[cursor + 1] === '*' &&
                    multi &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                    multi = false;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) &&
                    maskExpression[cursor + 1] === '*') {
                    result += inputSymbol;
                    multi = true;
                }
                else if (maskExpression[cursor + 1] === '?' &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) ||
                    (this.hiddenInput &&
                        this.maskAvailablePatterns[maskExpression[cursor]] &&
                        this.maskAvailablePatterns[maskExpression[cursor]].symbol === inputSymbol)) {
                    if (maskExpression[cursor] === 'H') {
                        if (Number(inputSymbol) > 2) {
                            cursor += 1;
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'h') {
                        if (result === '2' && Number(inputSymbol) > 3) {
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputSymbol) > 3) {
                            cursor += 1;
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor - 1] === 'd') {
                        if (Number(inputValue.slice(cursor - 1, cursor + 1)) > 31) {
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'M') {
                        if (Number(inputSymbol) > 1) {
                            cursor += 1;
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor - 1] === 'M') {
                        if (Number(inputValue.slice(cursor - 1, cursor + 1)) > 12) {
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                    result += maskExpression[cursor];
                    cursor++;
                    const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor))
                        ? inputArray.length
                        : cursor;
                    this._shift.add(shiftStep + this.prefix.length || 0);
                    i--;
                }
                else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1 &&
                    this.maskAvailablePatterns[maskExpression[cursor]] &&
                    this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                    cursor++;
                    i--;
                }
                else if (this.maskExpression[cursor + 1] === '*' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.maskExpression[cursor + 1] === '?' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
            }
        }
        if (result.length + 1 === maskExpression.length &&
            this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        let newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        cb(this._shift.has(position) ? shift : 0, backspaceShift);
        if (shift < 0) {
            this._shift.clear();
        }
        let res = this.suffix ? `${this.prefix}${result}${this.suffix}` : `${this.prefix}${result}`;
        if (result.length === 0) {
            res = `${this.prefix}${result}`;
        }
        return res;
    }
    _findSpecialChar(inputSymbol) {
        return this.maskSpecialCharacters.find((val) => val === inputSymbol);
    }
    _checkSymbolMask(inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
        return (this.maskAvailablePatterns[maskSymbol] &&
            this.maskAvailablePatterns[maskSymbol].pattern &&
            this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol));
    }
    _checkInput(str) {
        return str
            .split('')
            .filter((i) => i.match('\\d') || i === '.' || i === ',')
            .join('');
    }
};
MaskApplierService = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(config)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object])
], MaskApplierService);

let MaskService = class MaskService extends MaskApplierService {
    constructor(
    // tslint:disable-next-line
    document, _config, _elementRef, _renderer) {
        super(_config);
        this.document = document;
        this._config = _config;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.validation = true;
        this.maskExpression = '';
        this.isNumberValue = false;
        this.showMaskTyped = false;
        this.maskIsShown = '';
        this.selStart = null;
        this.selEnd = null;
        // tslint:disable-next-line
        this.onChange = (_) => { };
        this._formElement = this._elementRef.nativeElement;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    applyMask(inputValue, maskExpression, position = 0, cb = () => { }) {
        if (!maskExpression) {
            return inputValue;
        }
        this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
        if (this.maskExpression === 'IP' && this.showMaskTyped) {
            this.maskIsShown = this.showMaskInInput(inputValue || '#');
        }
        if (!inputValue && this.showMaskTyped) {
            this.formControlResult(this.prefix);
            return this.prefix + this.maskIsShown;
        }
        const getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
        let newInputValue = '';
        if (this.hiddenInput !== undefined) {
            let actualResult = this.actualValue.split('');
            inputValue !== '' && actualResult.length
                ? typeof this.selStart === 'number' && typeof this.selEnd === 'number'
                    ? inputValue.length > actualResult.length
                        ? actualResult.splice(this.selStart, 0, getSymbol)
                        : inputValue.length < actualResult.length
                            ? actualResult.length - inputValue.length === 1
                                ? actualResult.splice(this.selStart - 1, 1)
                                : actualResult.splice(this.selStart, this.selEnd - this.selStart)
                            : null
                    : null
                : (actualResult = []);
            newInputValue = this.actualValue.length ? this.shiftTypedSymbols(actualResult.join('')) : inputValue;
        }
        newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;
        const result = super.applyMask(newInputValue, maskExpression, position, cb);
        this.actualValue = this.getActualValue(result);
        if ((this.maskExpression.startsWith(Separators.SEPARATOR) ||
            this.maskExpression.startsWith(Separators.DOT_SEPARATOR)) &&
            this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((item) => item !== ',');
        }
        if (this.maskExpression.startsWith(Separators.COMMA_SEPARATOR) && this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((item) => item !== '.');
        }
        this.formControlResult(result);
        if (!this.showMaskTyped) {
            if (this.hiddenInput) {
                return result && result.length ? this.hideInput(result, this.maskExpression) : result;
            }
            return result;
        }
        const resLen = result.length;
        const prefNmask = this.prefix + this.maskIsShown;
        return result + (this.maskExpression === 'IP' ? prefNmask : prefNmask.slice(resLen));
    }
    applyValueChanges(position = 0, cb = () => { }) {
        this._formElement.value = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    }
    hideInput(inputValue, maskExpression) {
        return inputValue
            .split('')
            .map((curr, index) => {
            if (this.maskAvailablePatterns &&
                this.maskAvailablePatterns[maskExpression[index]] &&
                this.maskAvailablePatterns[maskExpression[index]].symbol) {
                return this.maskAvailablePatterns[maskExpression[index]].symbol;
            }
            return curr;
        })
            .join('');
    }
    // this function is not necessary, it checks result against maskExpression
    getActualValue(res) {
        const compare = res
            .split('')
            .filter((symbol, i) => this._checkSymbolMask(symbol, this.maskExpression[i]) ||
            (this.maskSpecialCharacters.includes(this.maskExpression[i]) && symbol === this.maskExpression[i]));
        if (compare.join('') === res) {
            return compare.join('');
        }
        return res;
    }
    shiftTypedSymbols(inputValue) {
        let symbolToReplace = '';
        const newInputValue = (inputValue &&
            inputValue.split('').map((currSymbol, index) => {
                if (this.maskSpecialCharacters.includes(inputValue[index + 1]) &&
                    inputValue[index + 1] !== this.maskExpression[index + 1]) {
                    symbolToReplace = currSymbol;
                    return inputValue[index + 1];
                }
                if (symbolToReplace.length) {
                    const replaceSymbol = symbolToReplace;
                    symbolToReplace = '';
                    return replaceSymbol;
                }
                return currSymbol;
            })) ||
            [];
        return newInputValue.join('');
    }
    showMaskInInput(inputVal) {
        if (this.showMaskTyped && !!this.shownMaskExpression) {
            if (this.maskExpression.length !== this.shownMaskExpression.length) {
                throw new Error('Mask expression must match mask placeholder length');
            }
            else {
                return this.shownMaskExpression;
            }
        }
        else if (this.showMaskTyped) {
            if (inputVal) {
                return this._checkForIp(inputVal);
            }
            return this.maskExpression.replace(/\w/g, '_');
        }
        return '';
    }
    clearIfNotMatchFn() {
        if (this.clearIfNotMatch &&
            this.prefix.length + this.maskExpression.length + this.suffix.length !== this._formElement.value.length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    }
    set formElementProperty([name, value]) {
        this._renderer.setProperty(this._formElement, name, value);
    }
    checkSpecialCharAmount(mask) {
        const chars = mask.split('').filter((item) => this._findSpecialChar(item));
        return chars.length;
    }
    // tslint:disable-next-line: cyclomatic-complexity
    _checkForIp(inputVal) {
        if (inputVal === '#') {
            return '_._._._';
        }
        const arr = [];
        for (let i = 0; i < inputVal.length; i++) {
            if (inputVal[i].match('\\d')) {
                arr.push(inputVal[i]);
            }
        }
        if (arr.length <= 3) {
            return '_._._';
        }
        if (arr.length > 3 && arr.length <= 6) {
            return '_._';
        }
        if (arr.length > 6 && arr.length <= 9) {
            return '_';
        }
        if (arr.length > 9 && arr.length <= 12) {
            return '';
        }
        return '';
    }
    formControlResult(inputValue) {
        if (Array.isArray(this.dropSpecialCharacters)) {
            this.onChange(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters));
        }
        else if (this.dropSpecialCharacters) {
            this.onChange(this._checkSymbols(inputValue));
        }
        else {
            this.onChange(this._removeSuffix(this._removePrefix(inputValue)));
        }
    }
    _removeMask(value, specialCharactersForRemove) {
        return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    }
    _removePrefix(value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    }
    _removeSuffix(value) {
        if (!this.suffix) {
            return value;
        }
        return value ? value.replace(this.suffix, '') : value;
    }
    _regExpForRemove(specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((item) => `\\${item}`).join('|'), 'gi');
    }
    _checkSymbols(result) {
        // TODO should simplify this code
        let separatorValue = this.testFn(Separators.SEPARATOR, this.maskExpression);
        if (separatorValue && this.isNumberValue) {
            // tslint:disable-next-line:max-line-length
            return result === ''
                ? result
                : result === ','
                    ? null
                    : Number(this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters).replace(',', '.'));
        }
        separatorValue = this.testFn(Separators.DOT_SEPARATOR, this.maskExpression);
        if (separatorValue && this.isNumberValue) {
            // tslint:disable-next-line:max-line-length
            return result === ''
                ? result
                : result === ','
                    ? null
                    : Number(this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters).replace(',', '.'));
        }
        separatorValue = this.testFn(Separators.COMMA_SEPARATOR, this.maskExpression);
        if (separatorValue && this.isNumberValue) {
            // tslint:disable-next-line:max-line-length
            return result === ''
                ? result
                : result === '.'
                    ? null
                    : Number(this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters));
        }
        if (this.isNumberValue) {
            return result === ''
                ? result
                : Number(this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters));
        }
        else if (this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters).indexOf(',') !== -1) {
            return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters).replace(',', '.');
        }
        else {
            return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
        }
    }
    // TODO should think about helpers
    testFn(baseSeparator, maskExpretion) {
        const matcher = maskExpretion.match(new RegExp(`^${baseSeparator}\\.([^d]*)`));
        return matcher ? Number(matcher[1]) : null;
    }
};
MaskService = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(config)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object, Object, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
], MaskService);

var MaskDirective_1;
let MaskDirective = MaskDirective_1 = class MaskDirective {
    constructor(
    // tslint:disable-next-line
    document, _maskService) {
        this.document = document;
        this._maskService = _maskService;
        this.maskExpression = '';
        this.specialCharacters = [];
        this.patterns = {};
        this.prefix = '';
        this.suffix = '';
        this.dropSpecialCharacters = null;
        this.hiddenInput = null;
        this.showMaskTyped = null;
        this.shownMaskExpression = null;
        this.showTemplate = null;
        this.clearIfNotMatch = null;
        this.validation = null;
        this._position = null;
        // tslint:disable-next-line
        this.onChange = (_) => { };
        this.onTouch = () => { };
    }
    ngOnChanges(changes) {
        // tslint:disable-next-line:max-line-length
        const { maskExpression, specialCharacters, patterns, prefix, suffix, dropSpecialCharacters, hiddenInput, showMaskTyped, shownMaskExpression, showTemplate, clearIfNotMatch, validation, } = changes;
        if (maskExpression) {
            this._maskValue = changes.maskExpression.currentValue || '';
        }
        if (specialCharacters) {
            if (!specialCharacters.currentValue ||
                !Array.isArray(specialCharacters.currentValue) ||
                (Array.isArray(specialCharacters.currentValue) && !specialCharacters.currentValue.length)) {
                return;
            }
            this._maskService.maskSpecialCharacters = changes.specialCharacters.currentValue || '';
        }
        if (patterns) {
            this._maskService.maskAvailablePatterns = patterns.currentValue;
        }
        if (prefix) {
            this._maskService.prefix = prefix.currentValue;
        }
        if (suffix) {
            this._maskService.suffix = suffix.currentValue;
        }
        if (dropSpecialCharacters) {
            this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
        }
        if (hiddenInput) {
            this._maskService.hiddenInput = hiddenInput.currentValue;
        }
        if (showMaskTyped) {
            this._maskService.showMaskTyped = showMaskTyped.currentValue;
        }
        if (shownMaskExpression) {
            this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
        }
        if (showTemplate) {
            this._maskService.showTemplate = showTemplate.currentValue;
        }
        if (clearIfNotMatch) {
            this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
        }
        if (validation) {
            this._maskService.validation = validation.currentValue;
        }
        this._applyMask();
    }
    // tslint:disable-next-line: cyclomatic-complexity
    validate({ value }) {
        if (!this._maskService.validation) {
            return null;
        }
        if (this._maskService.ipError) {
            return { 'Mask error': true };
        }
        if (this._maskValue.startsWith('dot_separator') ||
            this._maskValue.startsWith('comma_separator') ||
            this._maskValue.startsWith('separator')) {
            return null;
        }
        if (withoutValidation.includes(this._maskValue)) {
            return null;
        }
        if (this._maskService.clearIfNotMatch) {
            return null;
        }
        if (value && value.toString().length >= 1) {
            let counterOfOpt = 0;
            for (const key in this._maskService.maskAvailablePatterns) {
                if (this._maskService.maskAvailablePatterns[key].optional &&
                    this._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this._maskValue.indexOf(key) !== this._maskValue.lastIndexOf(key)) {
                        const opt = this._maskValue
                            .split('')
                            .filter((i) => i === key)
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this._maskValue.indexOf(key) !== -1 &&
                        value.toString().length >= this._maskValue.indexOf(key)) {
                        return null;
                    }
                    if (counterOfOpt === this._maskValue.length) {
                        return null;
                    }
                }
            }
            if (this._maskValue.indexOf('*') === 1 ||
                this._maskValue.indexOf('?') === 1 ||
                this._maskValue.indexOf('{') === 1) {
                return null;
            }
            else if ((this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*')) ||
                (this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?'))) {
                return { 'Mask error': true };
            }
            if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
                const length = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length) {
                    return { 'Mask error': true };
                }
            }
        }
        return null;
    }
    onInput(e) {
        const el = e.target;
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        const position = el.selectionStart === 1
            ? el.selectionStart + this._maskService.prefix.length
            : el.selectionStart;
        let caretShift = 0;
        let backspaceShift = false;
        this._maskService.applyValueChanges(position, (shift, _backspaceShift) => {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        });
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        const positionToApply = this._position
            ? this._inputValue.length + position + caretShift
            : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
        el.setSelectionRange(positionToApply, positionToApply);
        this._position = null;
    }
    onBlur() {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    }
    onFocus(e) {
        const el = e.target;
        const posStart = 0;
        const posEnd = 0;
        if (el !== null &&
            el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            e.keyCode !== 38)
            if (this._maskService.showMaskTyped) {
                // ) {
                //     return;
                // }
                this._maskService.maskIsShown = this._maskService.showMaskInInput();
                if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
                    el.focus();
                    el.setSelectionRange(posStart, posEnd);
                }
                else if (el.setSelectionRange && this._maskService.maskIsShown !== el.value) {
                    el.focus();
                    el.setSelectionRange(posStart, posEnd);
                }
            }
        const nextValue = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
        if (el.value !== nextValue) {
            el.value = nextValue;
        }
        /** fix of cursor position with prefix when mouse click occur */
        if ((el.selectionStart || el.selectionEnd) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
    }
    a(e) {
        this._code = e.code ? e.code : e.key;
        const el = e.target;
        this._maskService.selStart = el.selectionStart;
        this._maskService.selEnd = el.selectionEnd;
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8) {
            // if (e.keyCode === 37) {
            //     el.selectionStart = (el.selectionEnd as number) - 1;
            // }
            if (e.keyCode === 8 && el.value.length === 0) {
                el.selectionStart = el.selectionEnd;
            }
            if (e.keyCode === 8 && el.value.length === 0) {
                el.selectionStart = el.selectionEnd;
            }
            if (el.selectionStart <= this._maskService.prefix.length &&
                el.selectionEnd <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            const cursorStart = el.selectionStart;
            // this.onFocus(e);
            if (e.keyCode === 8 &&
                !el.readOnly &&
                cursorStart === 0 &&
                el.selectionEnd === el.value.length &&
                el.value.length !== 0) {
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
                this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
            }
        }
    }
    onPaste() {
        this._position = Number.MAX_SAFE_INTEGER;
    }
    /** It writes the value in the input */
    writeValue(inputValue) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__awaiter"])(this, void 0, void 0, function* () {
            if (inputValue === undefined) {
                inputValue = '';
            }
            if (typeof inputValue === 'number') {
                inputValue = String(inputValue);
                inputValue = this._maskValue.startsWith('dot_separator') ? inputValue.replace('.', ',') : inputValue;
                this._maskService.isNumberValue = true;
            }
            (inputValue && this._maskService.maskExpression) ||
                (this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped))
                ? (this._maskService.formElementProperty = [
                    'value',
                    this._maskService.applyMask(inputValue, this._maskService.maskExpression),
                ])
                : (this._maskService.formElementProperty = ['value', inputValue]);
            this._inputValue = inputValue;
        });
    }
    // tslint:disable-next-line
    registerOnChange(fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    }
    // tslint:disable-next-line
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /** It disables the input element */
    setDisabledState(isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    }
    _repeatPatternSymbols(maskExp) {
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((accum, currval, index) => {
                this._start = currval === '{' ? index : this._start;
                if (currval !== '}') {
                    return this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                this._end = index;
                const repeatNumber = Number(maskExp.slice(this._start + 1, this._end));
                const repaceWith = new Array(repeatNumber + 1).join(maskExp[this._start - 1]);
                return accum + repaceWith;
            }, '')) ||
            maskExp);
    }
    // tslint:disable-next-line:no-any
    _applyMask() {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('mask'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", String)
], MaskDirective.prototype, "maskExpression", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "specialCharacters", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "patterns", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "prefix", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "suffix", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "dropSpecialCharacters", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "hiddenInput", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "showMaskTyped", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "shownMaskExpression", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "showTemplate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "clearIfNotMatch", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Object)
], MaskDirective.prototype, "validation", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('input', ['$event']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:returntype", void 0)
], MaskDirective.prototype, "onInput", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('blur'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:returntype", void 0)
], MaskDirective.prototype, "onBlur", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:returntype", void 0)
], MaskDirective.prototype, "onFocus", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keydown', ['$event']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:returntype", void 0)
], MaskDirective.prototype, "a", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('paste'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:returntype", void 0)
], MaskDirective.prototype, "onPaste", null);
MaskDirective = MaskDirective_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
        selector: '[mask]',
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(() => MaskDirective_1),
                multi: true,
            },
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(() => MaskDirective_1),
                multi: true,
            },
            MaskService,
        ],
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [Object, MaskService])
], MaskDirective);

let MaskPipe = class MaskPipe {
    constructor(_maskService) {
        this._maskService = _maskService;
    }
    transform(value, mask) {
        if (!value && typeof value !== 'number') {
            return '';
        }
        if (typeof mask === 'string') {
            return this._maskService.applyMask(`${value}`, mask);
        }
        return this._maskService.applyMaskWithPattern(`${value}`, mask);
    }
};
MaskPipe = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
        name: 'mask',
        pure: true,
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__metadata"])("design:paramtypes", [MaskApplierService])
], MaskPipe);

var NgxMaskModule_1;
let NgxMaskModule = NgxMaskModule_1 = class NgxMaskModule {
    static forRoot(configValue) {
        return {
            ngModule: NgxMaskModule_1,
            providers: [
                {
                    provide: NEW_CONFIG,
                    useValue: configValue,
                },
                {
                    provide: INITIAL_CONFIG,
                    useValue: initialConfig,
                },
                {
                    provide: config,
                    useFactory: _configFactory,
                    deps: [INITIAL_CONFIG, NEW_CONFIG],
                },
                MaskApplierService,
            ],
        };
    }
    static forChild(_configValue) {
        return {
            ngModule: NgxMaskModule_1,
        };
    }
};
NgxMaskModule = NgxMaskModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        exports: [MaskDirective, MaskPipe],
        declarations: [MaskDirective, MaskPipe],
    })
], NgxMaskModule);
/**
 * @internal
 */
function _configFactory(initConfig, configValue) {
    return configValue instanceof Function ? Object.assign({}, initConfig, configValue()) : Object.assign({}, initConfig, configValue);
}


//# sourceMappingURL=ngx-mask.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/barcodes/barcodes.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/barcodes/barcodes.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  <app-page-title title=\"Barcodes\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card-box ribbon-box\">\n        <div class=\"ribbon ribbon-primary float-left\">\n          <i class=\"fe-mail mr-1\"></i> Barcodes\n        </div>\n        <h5 class=\"text-whaite float-leftmt-0\"></h5>\n        <div class=\"ribbon-content\">\n          <h4 class=\"header-title\">Barcodes</h4>\n          <div class=\"byttondiv\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"showModelMemberships(BarcodesModel)\"><i class=\"mdi mdi-plus\"></i>ADD</button>\n          </div>\n          <div class=\"table-responsive mt-3\">\n            <table class=\"table table-dark table-borderless mb-0\">\n              <thead>\n                <tr>\n                  <th>Barcodes Name</th>\n                  <th>Product Type</th>\n                  <th>Product Name</th>\n                  <th>GTIN</th>\n                  <th>Control</th>\n                  <th>PCSUN</th>\n                  <th>SN</th>\n                  <th>DG</th>\n                  <th>#</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let Barcode of Barcodes\">\n                  <th>{{Barcode.name}}</th>\n                  <th>{{Barcode.productType}}</th>\n                  <th>{{Barcode.productsName}}</th>\n                  <th>{{Barcode.GTIN}}</th>\n                  <th>{{Barcode.Control}}</th>\n                  <th>{{Barcode.PCSUN}}</th>\n                  <th>{{Barcode.SN}}</th>\n                  <th>{{Barcode.DG}}</th>\n                  <td>\n                    <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"showModelMemberships(BarcodesModel,Barcode.id)\"><i class=\"fas fa-edit\"></i> </button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #BarcodesModel role=\"document\" let-modal=\"close\">\n    <form class=\"needs-validation\" name=\"formBarcodes\" [formGroup]=\"formBarcodes\" (ngSubmit)=\"Save()\"\n    novalidate>\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Barcodes Name</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.name.errors }\" formControlName=\"name\" placeholder=\"Barcodes Name\">\n            <div *ngIf=\"submitted && f.name.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.name.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">productType</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.productType.errors }\" formControlName=\"productType\" placeholder=\"Product Type\">\n            <div *ngIf=\"submitted && f.productType.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.productType.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Product Name</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.productsName.errors }\" formControlName=\"productsName\" placeholder=\"Product Name\">\n            <div *ngIf=\"submitted && f.productsName.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.productsName.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">GTIN</label>\n            <input type=\"number\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.GTIN.errors }\" formControlName=\"GTIN\" placeholder=\"GTIN\">\n            <div *ngIf=\"submitted && f.GTIN.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.GTIN.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Control</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.Control.errors }\" formControlName=\"Control\" placeholder=\"Control\">\n            <div *ngIf=\"submitted && f.Control.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.Control.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">PCSUN</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.PCSUN.errors }\" formControlName=\"PCSUN\" placeholder=\"PCS/UN\">\n            <div *ngIf=\"submitted && f.PCSUN.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.PCSUN.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">SN</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.SN.errors }\" formControlName=\"SN\" placeholder=\"SN\">\n            <div *ngIf=\"submitted && f.SN.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.SN.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">DG</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.DG.errors }\" formControlName=\"DG\" placeholder=\"DG\">\n            <div *ngIf=\"submitted && f.DG.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.DG.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Page Style</label>\n            <app-keditor formControlName=\"Contents\" (getEditor)=\"getEditor($event)\" IDEDIT=\"Contents\" VALUEEDIT=\"{{valueNotes}}\" id=\"Contents\"></app-keditor>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\">\n        Cancel </button>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n    </form>\n\n  </ng-template>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/barnd-setting/barnd-setting.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/barnd-setting/barnd-setting.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n<app-page-title title=\"Global Values\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n<a class=\"btn btn-light\" (click)=\"showModalAdd(modaladd)\">Add a new Component</a>\n<div class=\"row card-box ribbon-box\" *ngFor=\"let br of BrandSetting\" style=\"    margin: 0;padding: 2px;margin-top: 10px;\">\n  <div class=\"col-lg-12\">\n    <div class=\"ribbon-box\">\n      <div class=\"ribbon ribbon-blue float-left\">\n       {{br.type==0?'TEXT':br.type==1?'Color':br.type==2?'Code JS' :br.type==3?'File':br.type==4?'Code HTML':''}}\n      </div>\n      <a class=\"text-whaite float-right mt-0\">[{{br.key}}]</a>\n      <div class=\"ribbon-content\" *ngIf=\"br.type==3\">\n        <input type=\"file\" style=\"display: none;\" #fileInput (change)=\"onFileSelected($event,br.key)\">\n        <div class=\"boxUpploader\" (click)=\"fileInput.click()\" *ngIf=\"!br.value && !br.temp && (!br.uploading || br.uploading==-1)\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" height=\"100px\" width=\"100px\" version=\"1.1\" id=\"Capa_1\" viewBox=\"0 0 184.69 184.69\" xml:space=\"preserve\">\n            <g>\n              <g>\n                <g>\n                  <path style=\"fill:#373b94;\"\n                    d=\"M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813     C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834     C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538     c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392     c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094     c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168     c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391     v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z\" />\n                </g>\n                <g>\n                  <path style=\"fill:#373b94;\"\n                    d=\"M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078     c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045     L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227     c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036     C104.91,91.608,107.183,91.608,108.586,90.201z\" />\n                </g>\n              </g>\n            </g>\n          </svg>\n        </div>\n        <div class=\"boxUpploader \" *ngIf=\"!br.value && br.temp && br.uploading && br.uploading==-1\">\n          <img src=\"{{PathStatic+'/'+br.temp}}\" style=\"    width: 70%;height: 70%; object-fit: contain;\">\n          <div class=\"boxViewer\">\n            <a class=\"btn btn-danger\">\n              <i class=\"fa fa-trash\" style=\"color:#ffff;\" (click)=\"RemoveFile(br.key)\"></i>\n            </a>\n          </div>\n        </div>\n        <div class=\"boxUpploader \" *ngIf=\"br.value && !br.temp && !br.uploading\">\n          <img src=\"{{PathStatic+'/'+br.value}}\" style=\"    width: 70%;height: 70%; object-fit: contain;\">\n          <div class=\"boxViewer\">\n            <a class=\"btn btn-danger\">\n              <i class=\"fa fa-trash\" style=\"color:#ffff;\" (click)=\"RemoveFileStatic(br.key)\"></i>\n            </a>\n          </div>\n        </div>\n        <div class=\"boxUpploader \" *ngIf=\"!br.value && !br.temp && br.uploading && br.uploading!=-1\">\n          <progress value=\"{{br.uploading}}\" max=\"100\"></progress>\n        </div>\n      </div>\n      <div class=\"ribbon-content\" *ngIf=\"br.type==0\" style=\"padding: 10px;padding-left: 0;\">\n        <input class=\"form-control\" placeholder=\"write here ..\" value=\"{{br.value}}\" (keypress)=\"chnageText($event,br.key)\">\n      </div>\n      <div class=\"ribbon-content\" *ngIf=\"br.type==1\" style=\"padding: 10px;padding-left: 0;\">\n        <input type=\"color\" class=\"form-control\" (change)=\"chnageText($event,br.key)\" value=\"{{br.value}}\" style=\"width: 100px;\">\n      </div>\n      <div class=\"ribbon-content\" *ngIf=\"br.type==2 || br.type==4\" style=\"padding: 10px;padding-left: 0;\">\n        <app-codeeditor [typeCode]=\"br.type==2?'javascript':'html'\" (codeChanged)=\"ChangeValue($event,br.key)\" [initialCode]=\"br.value\"></app-codeeditor>\n      </div>\n      <a class=\"btn btn-success float-right\" style=\"color: #fff;\" *ngIf=\"br.temp\" (click)=\"save(br.key)\">save</a>\n    </div>\n  </div>\n</div>\n<div style=\"height: 200px;\"></div>\n<ng-template #modaladd role=\"document\" let-modal=\"close\">\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Add a new Component</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\"  (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"form-group\">\n          <label class=\"\">Key</label>\n          <input class=\"form-control\" #keyvalue type=\"text\" id=\"compKey\">\n        </div>\n      </div>\n      <div class=\"col-md-12\">\n        <div class=\"form-group\">\n          <label class=\"\">Type</label>\n          <select class=\"form-control\" #typeselect id=\"comptype\">\n            <option value=\"0\">Text</option>\n            <option value=\"1\">Color</option>\n            <option value=\"2\">Code JS</option>\n            <option value=\"4\">Code HTML</option>\n            <option value=\"3\">file</option>\n          </select>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"addNewComp(typeselect.value,keyvalue.value)\"> Add </button>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"modal('Cross click')\">cancel</button>\n  </div>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/case-stage/case-stage.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/case-stage/case-stage.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  <app-page-title title=\"Case Stages\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card-box ribbon-box\">\n        <div class=\"ribbon ribbon-primary float-left\">\n          <i class=\"fe-mail mr-1\"></i> Case Stages\n        </div>\n        <h5 class=\"text-whaite float-leftmt-0\"></h5>\n        <div class=\"ribbon-content\">\n          <h4 class=\"header-title\">Case Stages</h4>\n          <div class=\"byttondiv\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"showModelMemberships(BarcodesModel)\"><i class=\"mdi mdi-plus\"></i>ADD</button>\n          </div>\n          <div class=\"table-responsive mt-3\">\n            <table class=\"table table-dark table-borderless mb-0\">\n              <thead>\n                <tr>\n                  <th>Stage Name</th>\n                  <th>Stage Number</th>\n                  <th>Stage Color</th>\n                  <th>Stage type</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let Stage of Stages\">\n                  <th>{{Stage.nameStage}}</th>\n                  <th>{{Stage.numberStage}}</th>\n                  <th>{{Stage.type==0?'External':'Internal'}}</th>\n                  <th><div style=\"width: 75px;height: 30px;text-align: center;\" [ngStyle]=\"{'background-color':true === 'true' ? Stage.color : Stage.color }\"></div></th>\n                  <td>\n                    <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"showModelMemberships(BarcodesModel,Stage.id)\"><i class=\"fas fa-edit\"></i> </button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #BarcodesModel role=\"document\" let-modal=\"close\">\n    <form class=\"needs-validation\" name=\"formBarcodes\" [formGroup]=\"formBarcodes\" (ngSubmit)=\"Save()\"\n    novalidate>\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Stage Name</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameStage.errors }\" formControlName=\"nameStage\" placeholder=\"Stage Name\">\n            <div *ngIf=\"submitted && f.nameStage.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.nameStage.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Stage Number</label>\n            <input type=\"number\" class=\"form-control\"  formControlName=\"numberStage\" placeholder=\"Stage Number\">\n          </div>\n        </div>\n        <div class=\"col-md-8\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Stage Type</label>\n            <ng-select  formControlName=\"type\"  bindLabel=\"nameType\" bindValue=\"id\" [items]=\"StageType\" ></ng-select>\n          </div>\n        </div>\n        <div class=\"col-md-8\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Stage Color</label>\n            <input type=\"color\" class=\"form-control\"  formControlName=\"color\" placeholder=\"Stage Coor\">\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Sort</label>\n            <input type=\"number\" class=\"form-control\"  formControlName=\"sort\" placeholder=\"Sort\">\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Show</label>\n            <input type=\"checkbox\" class=\"form-control\"  formControlName=\"ShowStage\" placeholder=\"Show\">\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\">\n        Cancel </button>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n    </form>\n\n  </ng-template>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/city/city.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/city/city.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"CITIES\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <div class=\"row\">\n      <div class=\"col-md-8\" >\n          <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-blue float-left\">\n              <i class=\"mdi mdi-home-city-outline mr-1\"></i> CITIES</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <label>{{trans.city.card1_title1}}</label>\n              <button _ngcontent-ogl-c10=\"\" (click)=\"add(modalCity)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> ADD</button>\n              <div class=\"table-responsive\" style=\"text-align: center;\">\n                <table class=\"table table-dark table-borderless mb-0\">\n                  <thead>\n                    <tr>\n                     \n                      <th>Flag</th>\n                      <th>{{trans.city.countryId}}</th>\n                      <th>{{trans.city.cityName}}</th>\n                      <th>{{trans.city.status}}</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let count of city\">\n                      <th><flag-icon country=\"{{getCodeCountry(count.countryId)}}\" style=\"font-size: 26px;\"></flag-icon></th>\n                      <th>{{getCNameCountry(count.countryId)}}</th>\n                      <th>{{count.cityName}}</th>\n                      <td><ui-switch defaultBoColor=\"#dfdfdf\" color=\"#00b19d\" (change)=\"onChangeStatus($event,count.id)\"  [checked]=\"status(count.status)\"></ui-switch></td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"edit(count.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-file-export\"></i> </button>\n                        <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(modalCity,count.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> \n            </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\" *ngIf=\"cityId!=-1\">\n        <div class=\"card-box ribbon-box\">\n          <div class=\"ribbon ribbon-blue float-left\">\n            CITY LANGUAGES</div>\n          <h5 class=\"text-whaite float-leftmt-0\"></h5>\n          <div class=\"ribbon-content\">\n            <button _ngcontent-ogl-c10=\"\" (click)=\"addName(modalCityName)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> <i class=\"fas fa-key\"></i></button>\n            <label>{{trans.cityName.card1_title1}}</label>\n            <div class=\"table-responsive\" style=\"text-align: center;\">\n              <table class=\"table table-dark table-borderless mb-0\">\n                <thead>\n                  <tr>\n                    <th>{{trans.cityName.langCode}}</th>\n                    <th>{{trans.cityName.cityName}}</th>\n                    <th>#</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let counName of cityName\">\n                    <td>{{getCodeLang(counName.langId)}}</td>\n                    <td>{{counName.cityName}}</td>\n                    <td>\n                      <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteName(modalCityName,counName.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div> \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n\n</div>\n\n<ng-template #modalCity role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formCity\" [formGroup]=\"formCity\" (ngSubmit)=\"onSubmit()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.city.countryId}}</label>\n      <ng-select   formControlName=\"countryId\"  bindLabel=\"countryName\" bindValue=\"id\" [items]=\"country\" >\n        <ng-template ng-label-tmp let-item=\"item\">\n          <flag-icon country=\"{{item.code}}\" ></flag-icon>\n          <b>{{item.countryName}}</b>\n       </ng-template>\n       <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\n        <flag-icon country=\"{{item.code}}\" ></flag-icon>\n        <b>{{item.countryName}}</b>\n    </ng-template>\n      </ng-select>\n      <div *ngIf=\"submitted && f.countryId.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.countryId.errors.required\">{{trans.city.countryId}}</div>\n      </div>\n    </div>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">City Name</label>\n      <input type=\"cityName\" formControlName=\"cityName\" (change)=\"onChange($event)\"  class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.cityName.errors }\" id=\"cityName\"  />\n      <div *ngIf=\"submitted && f.cityName.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.cityName.errors.required\">City Name</div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n\n<ng-template #modalCityName role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formCityName\" [formGroup]=\"formCityName\" (ngSubmit)=\"onSubmitName()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleFormName}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"errorName\" [dismissible]=\"false\">{{ errorName }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Language</label>\n\n       <ng-select   formControlName=\"langId\"  bindLabel=\"langCode\" bindValue=\"id\" [items]=\"Language\" ></ng-select>\n      <div *ngIf=\"submitted && fn.langId.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.langId.errors.required\">Language</div>\n      </div>\n    </div>\n   \n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.cityName.cityName}}</label>\n\n      <input type=\"cityName\" formControlName=\"cityName\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.cityName.errors }\" id=\"cityName\"  />\n\n      <div *ngIf=\"submitted && f.cityName.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.cityName.errors.required\">{{trans.cityName.currencyName}}</div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/country/country.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/country/country.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"COUNTRIES\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <div class=\"row\">\n      <div class=\"col-md-8\" >\n          <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-blue float-left\">\n              <i class=\"mdi mdi-city\"></i> COUNTRIES </div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <button _ngcontent-ogl-c10=\"\" (click)=\"add(modalCountry)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> ADD</button>\n              <div class=\"table-responsive\" style=\"text-align: center;\">\n                <table class=\"table table-dark table-borderless mb-0\">\n                  <thead>\n                    <tr>\n                      <th>{{trans.country.Code}}</th>\n                      <th>Flag</th>\n                      <th>{{trans.country.status}}</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let count of country\">\n                      <th>{{count.code}}</th>\n                      <th><flag-icon country=\"{{count.code}}\" style=\"font-size: 26px;\"></flag-icon></th>\n                      <td><ui-switch defaultBoColor=\"#dfdfdf\" color=\"#00b19d\" (change)=\"onChangeStatus($event,count.id)\"  [checked]=\"status(count.status)\"></ui-switch></td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"edit(count.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-file-export\"></i> </button>\n                        <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(modalCountry,count.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> \n            </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\" *ngIf=\"countryId!=-1\">\n        <div class=\"card-box ribbon-box\">\n          <div class=\"ribbon ribbon-blue float-left\">\n            <i class=\"mdi mdi-coin mr-1\"></i> COUNTRY LANGUAGES</div>\n          <h5 class=\"text-whaite float-leftmt-0\"></h5>\n          <div class=\"ribbon-content\">\n            <button _ngcontent-ogl-c10=\"\" (click)=\"addName(modalCountryName)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> <i class=\"fas fa-key\"></i></button>\n            <label>{{trans.countryName.card1_title1}}</label>\n            <div class=\"table-responsive\" style=\"text-align: center;\">\n              <table class=\"table table-dark table-borderless mb-0\">\n                <thead>\n                  <tr>\n                    <th>{{trans.countryName.langCode}}</th>\n                    <th>{{trans.countryName.countryName}}</th>\n                    <th>#</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let counName of countryName\">\n                    <td>{{getCodeLang(counName.langId)}}</td>\n                    <td>{{counName.countryName}}</td>\n                    <td>\n                      <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteName(modalCountryName,counName.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div> \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n\n</div>\n\n<ng-template #modalCountry role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formCountry\" [formGroup]=\"formCountry\" (ngSubmit)=\"onSubmit()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n   <div class=\"row\">\n     <div class=\"col-md-6\">\n      <div class=\"form-group mb-3\">\n        <label for=\"name\">{{trans.country.Code}}</label>\n        <ng-select   formControlName=\"code\"  bindLabel=\"nameCountry\" bindValue=\"code\" (change)=\"onChange($event)\" [items]=\"countryArray\" ></ng-select>\n        <div *ngIf=\"submitted && f.code.errors\" class=\"invalid-feedback\">code\n          <div *ngIf=\"f.code.errors.required\">{{trans.country.Code}}</div>\n        </div>\n      </div>\n     </div>\n     <div class=\"col-md-6\" style=\"text-align: center;\">\n      <flag-icon country=\"{{f.code.value}}\" style=\"font-size: 70px;\"></flag-icon>\n     </div>\n   </div>\n\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n\n<ng-template #modalCountryName role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formCountryName\" [formGroup]=\"formCountryName\" (ngSubmit)=\"onSubmitName()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleFormName}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"errorName\" [dismissible]=\"false\">{{ errorName }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Language</label>\n\n       <ng-select   formControlName=\"langId\"  bindLabel=\"langCode\" bindValue=\"id\" [items]=\"Language\" ></ng-select>\n      <div *ngIf=\"submitted && fn.langId.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.langId.errors.required\">Language</div>\n      </div>\n    </div>\n   \n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Country Name</label>\n\n      <input type=\"countryName\" formControlName=\"countryName\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.countryName.errors }\" id=\"countryName\"  />\n\n      <div *ngIf=\"submitted && f.countryName.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.countryName.errors.required\">Country Name</div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/currency/currency.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/currency/currency.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"CURRENCIES\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <div class=\"row\">\n      <div class=\"col-md-8\" >\n          <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-blue float-left\">\n              CURRENCIES</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <label>{{trans.currency.card1_title1}}</label>\n              <button _ngcontent-ogl-c10=\"\" (click)=\"add(modalCurrency)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> ADD</button>\n              <button _ngcontent-ogl-c10=\"\" (click)=\"updateCurrency()\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\" style=\"float: right;\"><i _ngcontent-ogl-c10=\"\" class=\" mdi mdi-autorenew\"></i></button>\n              <div class=\"table-responsive\" style=\"text-align: center;\">\n                <table class=\"table table-dark table-borderless mb-0\">\n                  <thead>\n                    <tr>\n                      <th>Currency Code</th>\n                      <th>{{trans.currency.symbol}}</th>\n                      <th>{{trans.currency.exchangeRate}}</th>\n                      <th>{{trans.currency.lastUpdated}}</th>\n                      <th>{{trans.currency.status}}</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let currenc of currency\">\n                      <th>{{currenc.currencyCode}}</th>\n                      <th>{{currenc.symbol}}</th>\n                      <th>{{currenc.exchangeRate}}</th>\n                      <th>{{currenc.updatedAt|date:'yyyy-MM-dd hh:ss'}}</th>\n                      <td><ui-switch defaultBoColor=\"#dfdfdf\" color=\"#00b19d\" (change)=\"onChangeStatus($event,currenc.id)\"  [checked]=\"status(currenc.status)\"></ui-switch></td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"edit(currenc.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-file-export\"></i> </button>\n                        <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(modalCurrency,currenc.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> \n            </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\" *ngIf=\"currencyId!=-1\">\n        <div class=\"card-box ribbon-box\">\n          <div class=\"ribbon ribbon-blue float-left\">\n            <i class=\"mdi mdi-coin mr-1\"></i> CURRENCY LANGUAGES</div>\n          <h5 class=\"text-whaite float-leftmt-0\"></h5>\n          <div class=\"ribbon-content\">\n            <button _ngcontent-ogl-c10=\"\" (click)=\"addName(modalCurrencyName)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> <i class=\"fas fa-key\"></i></button>\n            <label>{{trans.currencyName.card1_title1}}</label>\n            <div class=\"table-responsive\" style=\"text-align: center;\">\n              <table class=\"table table-dark table-borderless mb-0\">\n                <thead>\n                  <tr>\n                    <th>{{trans.currencyName.langCode}}</th>\n                    <th>Currency Name</th>\n                    <th>#</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let currenName of currencyName\">\n                    <td>{{getCodeLang(currenName.langId)}}</td>\n                    <td>{{currenName.currencyName}}</td>\n                    <td>\n                      <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteName(modalCurrencyName,currenName.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div> \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n\n</div>\n\n<ng-template #modalCurrency role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formCurrency\" [formGroup]=\"formCurrency\" (ngSubmit)=\"onSubmit()\"\n  novalidate>\n    <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">{{titleForm}}</h4>\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n\n      <div class=\"form-group mb-3\">\n        <label for=\"name\">Currency Code</label>\n        <ng-select   formControlName=\"currencyCode\" (ngModelChange)=\"changeCurrunce($event)\"  bindLabel=\"code\" bindValue=\"code\" [items]=\"listArray\" >\n        </ng-select>\n        <div *ngIf=\"submitted && f.currencyCode.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"f.currencyCode.errors.required\">Currency Code</div>\n        </div>\n      </div>\n      <div class=\"form-group mb-3\">\n        <label for=\"name\">{{trans.currency.symbol}}</label>\n        <input type=\"symbol\" formControlName=\"symbol\" disabled class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.symbol.errors }\" id=\"symbol\"  />\n        <div *ngIf=\"submitted && f.symbol.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"f.symbol.errors.required\">{{trans.currency.symbol}}</div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n        <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">Save Changes</button>\n    </div>\n  </form>\n</ng-template>\n\n<ng-template #modalCurrencyName role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formCurrencyName\" [formGroup]=\"formCurrencyName\" (ngSubmit)=\"onSubmitName()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleFormName}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"errorName\" [dismissible]=\"false\">{{ errorName }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Language Code</label>\n\n       <ng-select   formControlName=\"langId\"  bindLabel=\"langCode\" bindValue=\"id\" [items]=\"Language\" ></ng-select>\n      <div *ngIf=\"submitted && fn.langId.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.langId.errors.required\">Language Code</div>\n      </div>\n    </div>\n   \n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Currency Name</label>\n\n      <input type=\"currencyName\" formControlName=\"currencyName\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.currencyName.errors }\" id=\"currencyName\"  />\n\n      <div *ngIf=\"submitted && f.currencyName.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.currencyName.errors.required\">Currency Name</div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/email-model/email-model.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/email-model/email-model.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"EMAIL MODEL\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <div class=\"row\">\n      <div class=\"col-md-6\" >\n          <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-blue float-left\">\n              <i class=\"fas fa-mail-bulk mr-1\"></i> EMAIL MODEL</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <button _ngcontent-ogl-c10=\"\" (click)=\"add(emailModal)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i>ADD MODEL</button>\n              <div class=\"table-responsive\" style=\"text-align: center;\">\n                <table class=\"table table-dark table-borderless mb-0\">\n                  <thead>\n                    <tr>\n                      <th>Model Name</th>\n                      <th>Status</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let email of email_model\">\n                      <td>{{email.nameModel}}</td>\n                      <td><ui-switch defaultBoColor=\"#dfdfdf\" color=\"#00b19d\" (change)=\"onChangeStatus($event,email.id)\" [checked]=\"status(email.status)\"></ui-switch></td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"edit(email.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-edit\"></i> </button>\n                        <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(emailModal,email.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> \n            </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\" *ngIf=\"email_modelId!=-1\">\n        <div class=\"card-box ribbon-box\">\n          <div class=\"ribbon ribbon-blue float-left\">\n            <i class=\"fas fa-language mr-1\"></i>Email Content</div>\n          <h5 class=\"text-whaite float-leftmt-0\"></h5>\n          <div class=\"ribbon-content\">\n            <button _ngcontent-ogl-c10=\"\" (click)=\"addContent(content_email_models)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> <i class=\"fas fa-key\"></i></button>\n            <div class=\"table-responsive\" style=\"text-align: center;\">\n              <table class=\"table table-dark table-borderless mb-0\">\n                <thead>\n                  <tr>\n                    <th>{{trans.contentEmailModel.langId}}</th>\n                    <th>{{trans.contentEmailModel.subject}}</th>\n                    <th>#</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let contentEmails of content_email_model\">\n                    <td>{{getCodeLang(contentEmails.langId)}}</td>\n                    <td>{{contentEmails.subject}}</td>\n                    <td>\n                      <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteContent(content_email_models,contentEmails.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"editContent(content_email_models,contentEmails.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-edit\"></i> </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div> \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n\n</div>\n\n<ng-template #emailModal role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formEmail_model\" [formGroup]=\"formEmail_model\" (ngSubmit)=\"onSubmit()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Model Name</label>\n\n      <input type=\"nameModel\" formControlName=\"nameModel\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameModel.errors }\" id=\"nameModel\"  />\n\n      <div *ngIf=\"submitted && f.nameModel.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.nameModel.errors.required\">Model Name</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n\n<ng-template #content_email_models role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formcontent_email_model\" [formGroup]=\"formcontent_email_model\" (ngSubmit)=\"onSubmitContent()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loadingContent\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleFormContent}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <ngb-alert type=\"danger\" *ngIf=\"errorContent\" [dismissible]=\"false\">{{ errorContent }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.contentEmailModel.langId}}</label>\n       <ng-select   formControlName=\"langId\"  bindLabel=\"langCode\" bindValue=\"id\" [items]=\"Language\" ></ng-select>\n      <div *ngIf=\"submittedContent && fn.langId.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.langId.errors.required\">{{trans.contentEmailModel.langId}}</div>\n      </div>\n    </div>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Subject</label>\n      <input type=\"subject\" formControlName=\"subject\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && fn.subject.errors }\" id=\"subject\"  />\n      <div *ngIf=\"submittedContent && fn.subject.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.subject.errors.required\">{{trans.contentEmailModel.subject}}</div>\n      </div>\n    </div>\n    <div class=\"form-group mb-3\" *ngIf=\"ngEditContent\">\n      <label for=\"name\">Text</label>\n      <app-keditor formControlName=\"content_model\" (getEditor)=\"getEditor($event)\" IDEDIT=\"content_model\" VALUEEDIT=\"{{valueNotes}}\" id=\"content_model\"  ></app-keditor>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/function-prosess/function-prosess.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/function-prosess/function-prosess.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  <app-page-title title=\"Functions\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card-box ribbon-box\">\n        <div class=\"ribbon ribbon-primary float-left\">\n          <i class=\"fe-mail mr-1\"></i> Functions\n        </div>\n        <h5 class=\"text-whaite float-leftmt-0\"></h5>\n        <div class=\"ribbon-content\">\n          <h4 class=\"header-title\">Functions</h4>\n          <div class=\"byttondiv\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"showModelMemberships(BarcodesModel)\"><i class=\"mdi mdi-plus\"></i>ADD</button>\n          </div>\n          <div class=\"table-responsive mt-3\">\n            <table class=\"table table-dark table-borderless mb-0\">\n              <thead>\n                <tr>\n                  <th>Function Name</th>\n                  <th>Function Type</th>\n                  <th>#</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let Fun of Func\">\n                  <th>{{Fun.nameFun}}</th>\n                  <th>{{Fun.typeFun===0?'Change Stage':(Fun.typeFun===1?'Send Emai':'Send WhatsApp')}}</th>\n                  <td>\n                    <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"showModelMemberships(BarcodesModel,Fun.id)\"><i class=\"fas fa-edit\"></i> </button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #BarcodesModel role=\"document\" let-modal=\"close\">\n    <form class=\"needs-validation\" name=\"formBarcodes\" [formGroup]=\"formBarcodes\" (ngSubmit)=\"Save()\"\n    novalidate>\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Function Name</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameFun.errors }\" formControlName=\"nameFun\" placeholder=\"Function Name\">\n            <div *ngIf=\"submitted && f.nameFun.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.nameFun.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Function Type</label>\n            <ng-select  formControlName=\"typeFun\"  bindLabel=\"nameType\" bindValue=\"id\" [items]=\"typeFun\" ></ng-select>\n          </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"f.typeFun.value===0\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Stage</label>\n            <ng-select  formControlName=\"numberStatus\"  bindLabel=\"nameStage\" bindValue=\"id\" [items]=\"Stages\" ></ng-select>\n          </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"f.typeFun.value===1\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Type User</label>\n            <ng-select  formControlName=\"typeUser\"  bindLabel=\"nameType\" bindValue=\"id\" [items]=\"typeUsers\" (change)=\"GetUsers()\" ></ng-select>\n          </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"f.typeFun.value===1\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">User</label>\n            <ng-select  formControlName=\"idUser\"  bindLabel=\"userName\" bindValue=\"id\" [items]=\"Users\" ></ng-select>\n          </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"f.typeFun.value===1\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Email Content</label>\n            <app-keditor formControlName=\"emailContent\" (getEditor)=\"getEditor($event)\" IDEDIT=\"emailContent\" VALUEEDIT=\"{{valueNotes}}\" id=\"emailContent\"  ></app-keditor>\n          </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"f.typeFun.value===3\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Type User</label>\n            <ng-select  formControlName=\"typeUser\"  bindLabel=\"nameType\" bindValue=\"id\" [items]=\"typeUsers\" (change)=\"GetUsers(true)\" ></ng-select>\n          </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"f.typeFun.value===3\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">User</label>\n            <ng-select  formControlName=\"idUser\"  bindLabel=\"userName\" bindValue=\"id\" [items]=\"Users\" ></ng-select>\n          </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"f.typeFun.value===3\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Content</label>\n            <textarea formControlName=\"emailContent\" class=\"form-control\"></textarea>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\">\n        Cancel </button>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n    </form>\n\n  </ng-template>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/general/general.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/general/general.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  <app-page-title title=\"GENERAL\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n \n  <form>\n   <!-- <flag-icon country=\"fr\" squared></flag-icon> --> \n    <div class=\"row card-box ribbon-box\">\n      <div class=\"col-lg-4\" >\n          <div class=\"ribbon-box\">\n              <div class=\"ribbon ribbon-blue float-left\">\n                <i class=\"fas fa-language mr-1\"></i> LANGUAGE</div>\n              <h5 class=\"text-whaite float-leftmt-0\"></h5>\n              <div class=\"ribbon-content\">\n                <label>DEFAULT LANGUAGE</label>\n                <ng-select [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"languageModel\"  bindLabel=\"langName\" bindValue=\"id\" [items]=\"Language\"  ></ng-select>\n              </div>\n          </div>\n      </div>\n      <div class=\"col-lg-4\" >\n        <div class=\" ribbon-box\">\n            <div class=\"ribbon ribbon-success float-left\">\n              <i class=\"fas fa-dollar-sign mr-1\"></i> CURRENCY</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <label>DEFAULT CURRENCY</label>\n              <ng-select [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"currencModel\" [items]=\"currency\" bindValue=\"id\"  bindLabel=\"currencyName\"></ng-select>\n            </div>\n        </div>\n      </div>\n      \n      <div class=\"col-lg-4\" >\n        <div class=\" ribbon-box\">\n            <div class=\"ribbon ribbon-success float-left\">\n              <i class=\"fe-mail mr-1\"></i> EMAIL</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <div class=\"form-group mb-3\">\n                <label for=\"simpleinput\">DEFAULT EMAIL</label>\n                <input type=\"text\" id=\"email\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"emailModel\" class=\"form-control\">\n            </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-12\" >\n        <div class=\" ribbon-box\">\n            <div class=\"ribbon ribbon-success float-left\">\n              <i class=\"far fa-address-card mr-1\"></i>COMPANY ADDRESS</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <div class=\"form-group mb-3\">\n                <label for=\"simpleinput\">ADDRESS</label>\n                <textarea type=\"text\" id=\"companyAddress\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"companyAddress\" class=\"form-control\">\n                  </textarea>\n            </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-md-12\">\n        <button (click)=\"BtnSaveGenral()\"  class=\"btn btn-success waves-effect\" type=\"button\">Save</button>\n      </div>\n    </div>\n\n    <div class=\"row card-box ribbon-box\">\n      <div class=\"col-lg-4\" >\n          <div class=\"ribbon-box\">\n              <div class=\"ribbon ribbon-blue float-left\">\n                <i class=\"fas fa-language mr-1\"></i> Pakges </div>\n              <h5 class=\"text-whaite float-leftmt-0\"></h5>\n              <div class=\"ribbon-content\">\n                <label>Content</label>\n                <app-keditor  (getEditor)=\"getEditor($event)\" IDEDIT=\"content_model\" VALUEEDIT=\"{{valueNotes}}\" id=\"content_model\"  ></app-keditor>\n              </div>\n          </div>\n      </div>\n      <div class=\"col-md-12 mt-3\">\n        <button (click)=\"savePortFlio()\"  class=\"btn btn-success waves-effect\" type=\"button\">Save</button>\n      </div>\n    </div>\n    SPF\n    <div class=\"row\">\n      <div class=\"col-lg-6\" >\n        <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-primary float-left\">\n              <i class=\"fe-mail mr-1\"></i> SOCIAL MEDIA LINKS</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <h4 class=\"header-title\">PRIMARY LINKS</h4>\n              <div class=\"byttondiv\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"OpenSocial(msocial,0)\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> ADD</button>\n              </div>\n              <div class=\"table-responsive\">\n                <table class=\"table mb-0\" style=\"text-align: center;border: 1px solid #dee2e6;\">\n                  <thead>\n                    <tr>\n                      <th>{{trans.general.card4_sl_name}}</th>\n                      <th>{{trans.general.card4_sl_link}}</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let social of socialMedia\">\n                      <td>{{social.name}}</td>\n                      <td>{{social.link}}</td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"OpenSocial(msocial,1,social.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-edit\"></i> </button>\n                        <button type=\"button\" class=\"btn btn-danger\" (click)=\"OpenSocial(msocial,2,social.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> <!-- end table-responsive-->\n      \n            </div>\n        </div>\n      </div>\n\n      <div class=\"col-lg-6\" >\n        <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-primary float-left\">\n              <i class=\"fe-mail mr-1\"></i> KEYWORDS</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <h4 class=\"header-title\">SEO KEYWORDS</h4>\n              <div class=\"byttondiv\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"OpenSeo(seo,0)\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i>ADD</button>\n              </div>\n              <div class=\"table-responsive\">\n                <table class=\"table table-dark table-borderless mb-0\">\n                  <thead>\n                    <tr>\n                   \n                      <th>NAME</th>\n                      <th>DESCRIPTION</th>\n                      <th>KEYWORDS</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let fseo of a_seo\">\n                      <th scope=\"row\">{{fseo.name}}</th>\n                      <td>{{fseo.description}}</td>\n                      <td>{{fseo.key_words}}</td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"OpenSeo(seo,1,fseo.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-edit\"></i> </button>\n                        <button type=\"button\" class=\"btn btn-danger\" (click)=\"OpenSeo(seo,2,fseo.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> \n      \n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-6\" >\n        <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-primary float-left\">\n              <i class=\"fe-mail mr-1\"></i> SHIPPING ADDRESS </div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <h4 class=\"header-title\">DEFAULT ADDRESS</h4>\n              <app-shipping-address USERTYPE=\"1\" ID=\"1\"></app-shipping-address>\n      \n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-6\" >\n        <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-primary float-left\">\n              <i class=\"fe-mail mr-1\"></i> PAYMENT ADDRESS</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <h4 class=\"header-title\">DEFAULT ADDRESS</h4>\n              <app-payment-address USERTYPE=\"1\" ID=\"1\"></app-payment-address>\n      \n            </div>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<ng-template #msocial role=\"document\" let-modal=\"close\">\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{sl_title}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n          <div class=\"form-group\">\n              <label for=\"field-1\" class=\"control-label\">{{trans.general.card4_sl_name}}</label>\n              <input type=\"sl_name\" class=\"form-control\" [formControl]=\"sl_name\"  placeholder=\"name link\">\n          </div>\n      </div>\n      <div class=\"col-md-12\">\n          <div class=\"form-group\">\n              <label for=\"field-2\" class=\"control-label\">{{trans.general.card4_sl_link}}</label>\n              <input type=\"sl_link\" class=\"form-control\" [formControl]=\"sl_link\"  placeholder=\"http://facebook.com\">\n          </div>\n      </div>\n  </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\"> {{trans.general.modalsocial_btn_cancel}} </button>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"BtnSaveSocial()\">{{trans.general.modalsocial_btn_save}}</button>\n  </div>\n</ng-template>\n\n<ng-template #seo role=\"document\" let-modal=\"close\">\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{sl_title}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n          <div class=\"form-group\">\n              <label for=\"field-1\" class=\"control-label\">NAME</label>\n              <input type=\"sl_name\" class=\"form-control\" [formControl]=\"seo_name\"  placeholder=\"NAME\">\n          </div>\n      </div>\n      <div class=\"col-md-12\">\n          <div class=\"form-group\">\n              <label for=\"field-2\" class=\"control-label\">DESCRIPTION</label>\n              <input type=\"sl_link\" class=\"form-control\" [formControl]=\"seo_description\"  placeholder=\"DESCRIPTION\">\n          </div>\n      </div>\n      <div class=\"col-md-12\">\n        <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">KEYWORDS</label>\n            <input type=\"sl_link\" class=\"form-control\" [formControl]=\"seo_key_words\"  placeholder=\"KEYWORDS\">\n        </div>\n    </div>\n  </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\"> {{trans.general.modalseo_btn_cancel}} </button>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"BtnSaveSeo()\">{{trans.general.modalseo_btn_save}}</button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/info-users/info-users.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/info-users/info-users.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/languages/languages.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/languages/languages.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"LANGUAGES\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\" mb-2 animated bounceInRight\">\n    <div class=\"row\">\n      <div class=\"col-md-6\" >\n          <div class=\" ribbon-box\">\n            <div class=\"ribbon ribbon-blue float-left\">\n              <i class=\"fas fa-language mr-1\"></i> LANGUAGES</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <label>{{trans.Language.card1_title1}}</label>\n              <button _ngcontent-ogl-c10=\"\" (click)=\"addLanguage(languageModal)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> <i class=\"fas fa-language\"></i></button>\n              <div class=\"table-responsive\" style=\"text-align: center;\">\n                <table class=\"table table-dark table-borderless mb-0\">\n                  <thead>\n                    <tr>\n                      <th>{{trans.Language.langCode}}</th>\n                      <th>{{trans.Language.direction}}</th>\n                      <th>{{trans.Language.active}}</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let lang of language\">\n                      <td>{{lang.langCode}}</td>\n                      <td>{{lang.direction}}</td>\n                      <td><ui-switch *ngIf=\"lang.id != 1\" defaultBoColor=\"#dfdfdf\" color=\"#00b19d\" (change)=\"onChangecheck($event,lang.id)\" [checked]=\"status(lang.status)\"></ui-switch></td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"geLanguage_classifier(lang.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-file-export\"></i> </button>\n                        <button *ngIf=\"lang.id!=1\" type=\"button\" class=\"btn btn-danger\" (click)=\"deleteLanguage(languageModal,lang.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> \n            </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\" *ngIf=\"langId!=-1\">\n        <div class=\" ribbon-box\">\n          <div class=\"ribbon ribbon-blue float-left\" style=\"text-transform: uppercase;\">\n            <i class=\"fas fa-language mr-1\" ></i> languages Translator </div>\n          <h5 class=\"text-whaite float-leftmt-0\"></h5>\n          <div class=\"ribbon-content\">\n            <button _ngcontent-ogl-c10=\"\" (click)=\"addLanguage_classifier(classifierModal)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> <i class=\"fas fa-key\"></i></button>\n            <label>{{trans.language_classifier.card1_title1}}</label>\n            <div class=\"table-responsive\" style=\"text-align: center;\">\n              <table class=\"table table-dark table-borderless mb-0\">\n                <thead>\n                  <tr>\n                    <th>{{trans.Language.langCode}}</th>\n                    <th>{{trans.language_classifier.langName}}</th>\n                    <th>#</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let lang_class of language_classifier\">\n                    <td>{{lang_class.langCode}}</td>\n                    <td>{{lang_class.langName}}</td>\n                    <td>\n                      <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteLanguage_classifie(classifierModal,lang_class.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div> \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n\n</div>\n\n<ng-template #languageModal role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formLanguage\" [formGroup]=\"formLanguage\" (ngSubmit)=\"onSubmitLanguage()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.Language.langCode}}</label>\n      \n      <select formControlName=\"langCode\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.langCode.errors }\" id=\"langCode\" >\n        <option value=\"{{langA.code|uppercase }}\" *ngFor=\"let langA of langArray\" >{{langA.name}}</option>\n      </select>\n      <div *ngIf=\"submitted && f.langCode.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.langCode.errors.required\">{{trans.Language.langCode}}</div>\n      </div>\n    </div>\n\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.Language.direction}}</label>\n\n      <select formControlName=\"direction\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.direction.errors }\" id=\"direction\" >\n        <option value=\"LTR\">LTR</option>\n        <option value=\"RLT\">RLT</option>\n      </select>\n\n      <div *ngIf=\"submitted && f.direction.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.direction.errors.required\">{{trans.Language.direction}}</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n\n<ng-template #classifierModal role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formLanguageclassifier\" [formGroup]=\"formLanguageclassifier\" (ngSubmit)=\"onSubmitLanguageclassifier()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">languages Translator</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.Language.langCode}}</label>\n      <select formControlName=\"langCode\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.langCode.errors }\" id=\"langCode\" >\n        <option value=\"{{lang.langCode|uppercase }}\" *ngFor=\"let lang of language\" >{{lang.langCode}}</option>\n      </select>\n      <div *ngIf=\"submitted && f.langCode.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.langCode.errors.required\">{{trans.Language.langCode}}</div>\n      </div>\n    </div>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.language_classifier.langName}}</label>\n\n      <input type=\"langName\" formControlName=\"langName\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.langName.errors }\" id=\"langName\"  />\n\n      <div *ngIf=\"submitted && f.langCode.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.langCode.errors.required\">{{trans.Language.langCode}}</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/memberships/memberships.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/memberships/memberships.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  <app-page-title title=\"Memberships\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card-box ribbon-box\">\n        <div class=\"ribbon ribbon-primary float-left\">\n          <i class=\"fe-mail mr-1\"></i> Memberships\n        </div>\n        <h5 class=\"text-whaite float-leftmt-0\"></h5>\n        <div class=\"ribbon-content\">\n          <h4 class=\"header-title\">Memberships</h4>\n          <div class=\"byttondiv\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"showModelMemberships(MembershipModel)\"><i\n                _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i>ADD</button>\n          </div>\n          <div class=\"table-responsive mt-3\">\n            <table class=\"table table-dark table-borderless mb-0\">\n              <thead>\n                <tr>\n                  <th>Membership Name</th>\n                  <th>Percentage</th>\n                  <th>#</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let Membership of Memberships\">\n                  <th>{{Membership.nameMembership}}</th>\n                  <th>{{Membership.percentage}} %</th>\n                  <td>\n                    <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"showModelMemberships(MembershipModel,Membership.id)\"><i class=\"fas fa-edit\"></i> </button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #MembershipModel role=\"document\" let-modal=\"close\">\n    <form class=\"needs-validation\" name=\"formMemberships\" [formGroup]=\"formMemberships\" (ngSubmit)=\"Save()\"\n    novalidate>\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n        </div>\n        <div class=\"col-md-8\">\n          <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Membership Name</label>\n            <input type=\"nameMembership\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameMembership.errors }\" formControlName=\"nameMembership\" placeholder=\"Membership Name\">\n            <div *ngIf=\"submitted && f.nameMembership.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.nameMembership.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Percentage</label>\n            <input type=\"percentage\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.percentage.errors }\" formControlName=\"percentage\" placeholder=\"Percentage\"><strong style=\"    position: absolute;\n            top: 39px;\n            right: 44px;\">%</strong>\n            <div *ngIf=\"submitted && f.percentage.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.percentage.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\">\n        Cancel </button>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n    </form>\n\n  </ng-template>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/notification/notification.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/notification/notification.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"NOTIFICATIONS\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <div class=\"ribbon ribbon-blue float-left\">\n      <i class=\"fe-alert-circle mr-1\"></i> NOTIFICATION DETAILS</div>\n    <h5 class=\"text-whaite float-leftmt-0\"></h5>\n    <div class=\"ribbon-content\">\n      <div class=\"table-responsive\" style=\"text-align: center;\">\n        <table class=\"table table-striped mb-0 \">\n          <thead>\n            <tr>\n              <th>Notices Type</th>\n              <th>User Type</th>\n              <th>User Name</th>\n              <th>Information</th>\n              <th>Date</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let notiR of allNotiFi\">\n              <td>{{getTypeNotfi(notiR.typeNotices)}}</td>\n              <td>{{getTypeUser(notiR.typeUser)}}</td>\n              <td>{{notiR.name}}</td>\n              <td>{{notiR.content[0].information}}</td>\n              <td>{{getDate(notiR.createdAt) }}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div> \n    </div>\n  </div>\n</div>\n    ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/pricestrategy/pricestrategy.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/pricestrategy/pricestrategy.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  <app-page-title title=\"Price Strategy\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card-box ribbon-box\">\n        <div class=\"ribbon ribbon-primary float-left\">\n          <i class=\"fe-mail mr-1\"></i> Price Strategy\n        </div>\n        <h5 class=\"text-whaite float-leftmt-0\"></h5>\n        <div class=\"ribbon-content\">\n          <h4 class=\"header-title\">Price Strategy</h4>\n          <div class=\"byttondiv\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"showPricestrategyModel(PricestrategyModel)\"><i\n                _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i>ADD</button>\n          </div>\n          <div class=\"table-responsive mt-3\">\n            <table class=\"table table-dark table-borderless mb-0\">\n              <thead>\n                <tr>\n                  <th>Strategy Name</th>\n                  <th>Type</th>\n                  <th>Country</th>\n                  <th>City</th>\n                  <th>Doctor</th>\n                  <th>#</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let Price of Pricestrategy\">\n                  <th>{{Price.nameStrategy}}</th>\n                  <th>{{Price.type==1?'Country And City':'Doctors'}}</th>\n                   <th>\n                    <main *ngIf=\"!Price.countryName\">All</main>\n                    <main *ngIf=\"Price.countryName\">{{Price.countryName}}</main>\n                   </th>\n                  <th>\n                    <main *ngIf=\"!Price.cityName\">All</main>\n                    <main *ngIf=\"Price.cityName\">{{Price.cityName}}</main>\n                    \n                  </th>\n                  <th>\n                   <main *ngIf=\"Price.logo\"> <img src=\"{{imageUrl+'/'+Price.logo}}\" style=\"width: 30px;height: 30px;border-radius: 50%;margin-right: 11px;\">{{Price.nameDoctor}}</main>\n                   <main *ngIf=\"!Price.logo\">All</main>\n                  </th>\n                  <td>\n                    <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"showPricestrategyModel(PricestrategyModel,Price.id)\"><i class=\"fas fa-edit\"></i> </button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #PricestrategyModel role=\"document\" let-modal=\"close\">\n    <form class=\"needs-validation\" name=\"formPricestrategy\" [formGroup]=\"formPricestrategy\" (ngSubmit)=\"Save()\" novalidate>\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Strategy Name</label>\n            <input type=\"nameStrategy\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameStrategy.errors }\" formControlName=\"nameStrategy\" placeholder=\"Strategy Name\">\n            <div *ngIf=\"submitted && f.nameStrategy.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.nameStrategy.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Strategy Title</label>\n            <input type=\"titleStrategy\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.titleStrategy.errors }\" formControlName=\"titleStrategy\" placeholder=\"Strategy Title\">\n            <div *ngIf=\"submitted && f.titleStrategy.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.titleStrategy.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Type</label>\n            <select class=\"form-control\" (ngModelChange)=\"onChangeType()\"  [ngClass]=\"{ 'is-invalid': submitted && f.type.errors }\" formControlName=\"type\">\n              <option value=\"1\" selected>Country And City</option>\n              <option value=\"2\">Doctor</option>\n            </select>\n            <div *ngIf=\"submitted && f.type.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.type.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">COUNTRY</label>\n            <ng-select   formControlName=\"countryId\" (ngModelChange)=\"onChange()\"  bindLabel=\"countryName\" bindValue=\"id\" [items]=\"country\" [ngClass]=\"{ 'is-invalid': submitted && f.countryId.errors }\">\n              <ng-template ng-label-tmp let-item=\"item\">\n                <flag-icon country=\"{{item.code}}\" ></flag-icon>\n                <b>{{item.countryName}}</b>\n             </ng-template>\n             <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\n              <flag-icon country=\"{{item.code}}\" ></flag-icon>\n              <b>{{item.countryName}}</b>\n          </ng-template>\n            </ng-select>\n        \n            <div *ngIf=\"submitted && f.countryId.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.countryId.errors.required\">COUNTRY</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">CITY</label>\n            <ng-select  formControlName=\"cityId\"  bindLabel=\"cityName\" bindValue=\"id\" [items]=\"city\" [ngClass]=\"{ 'is-invalid': submitted && f.cityId.errors }\"></ng-select>\n            <div *ngIf=\"submitted && f.cityId.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.cityId.errors.required\">CITY</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Doctors</label>\n            <ng-select   formControlName=\"doctorId\"  bindLabel=\"nameDoctor\" bindValue=\"id\" [items]=\"doctors\" [ngClass]=\"{ 'is-invalid': submitted && f.doctorId.errors }\">\n                <ng-template ng-label-tmp let-item=\"item\">\n                  <img src=\"{{(item.id==-1?'':imageUrl+'/')+item.logo}}\" style=\"width: 20px; height: 20px; border-radius: 50%;margin-right: 10px;\">\n                  <b>{{item.nameDoctor}}</b>\n              </ng-template>\n              <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\">\n                  <img src=\"{{(item.id==-1?'':imageUrl+'/')+item.logo}}\" style=\"width: 30px; height: 30px; border-radius: 50%;margin-right: 10px;\">\n                  <b>{{item.nameDoctor}}</b>\n              </ng-template>\n            </ng-select>\n        \n            <div *ngIf=\"submitted && f.countryId.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.countryId.errors.required\">COUNTRY</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">From</label>\n            <input type=\"number\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.form.errors }\" formControlName=\"form\">\n            <div *ngIf=\"submitted && f.form.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.form.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">TO</label>\n            <input type=\"number\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.to.errors }\" formControlName=\"to\">\n            <div *ngIf=\"submitted && f.to.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.to.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-8\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Price</label>\n            <input type=\"number\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.Price.errors }\" formControlName=\"Price\">\n            <div *ngIf=\"submitted && f.Price.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.Price.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Currency</label>\n            <ng-select  formControlName=\"currencyId\" [items]=\"currency\" bindValue=\"id\"  bindLabel=\"currencyName\" [ngClass]=\"{ 'is-invalid': submitted && f.currencyId.errors }\"></ng-select>\n            <div *ngIf=\"submitted && f.currencyId.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.currencyId.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\"> Cancel </button>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n    </form>\n\n  </ng-template>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/shipping-company/shipping-company.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/shipping-company/shipping-company.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"SHIPPING SETTINGS\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <button _ngcontent-eot-c23=\"\" type=\"button\" class=\"btn btn-outline-success\" (click)=\"AddCompany(shippingCompanyModal)\"><i class=\"fe-truck \"></i>  ADD NEW  </button>\n    <div class=\"row\">\n      <div class=\"col-lg-4\" >\n        <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-primary float-left\">\n              <i class=\"fe-truck \"></i> SHIPPING COMPANIES</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <div class=\"table-responsive\">\n                <table class=\"table table-borderless mb-0\">\n                    <thead class=\"thead-light\">\n                        <tr>\n                            <th>Name</th>\n                            <th>Status</th>\n                            <th>#</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let sc of shippingCompany \">\n                          <th>{{sc.shippingName}}</th>\n                          <th><ui-switch defaultBoColor=\"#dfdfdf\" color=\"#00b19d\" (change)=\"onChangeStatus($event,sc.id)\"   [checked]=\"getStatus(sc.status)\"></ui-switch></th>\n                            <th>\n                                <button _ngcontent-eot-c23=\"\" type=\"button\" class=\"btn btn-outline-warning\" (click)=\"getAllParam(sc.id)\"> <i class=\"icon-paper-clip\"></i> </button>\n                            </th>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-6\">\n        <div class=\"card-box ribbon-box\" *ngIf=\"shippingParam\">\n            <div class=\"ribbon ribbon-primary float-left\">\n              <i class=\"mdi mdi-folder-key-network\"></i> Param</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n           <hr>\n            <button style=\"float: right;\"  type=\"button\" class=\"btn btn-outline-success\" (click)=\"AddParam(shippingParamModal)\">Add <i class=\"icon-key\"></i> </button>\n            <div class=\"ribbon-content\">\n              <div class=\"table-responsive\">\n                <table class=\"table table-borderless mb-0\">\n                    <thead class=\"thead-light\">\n                        <tr>\n                            <th>key</th>\n                            <th>Value</th>\n                            <th>#</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr  *ngFor=\"let param of shippingParam \">\n                          <th>{{param.key}}</th>\n                          <th>{{param.value}}</th>\n                            <td>\n                                <button type=\"button\" class=\"btn btn-outline-warning\" (click)=\"EditParam(shippingParamModal,param.id) \" style=\"margin-right: 10px;\">Edit <i class=\"mdi mdi-content-save-edit-outline\"></i> </button>\n                                <button  type=\"button\" class=\"btn btn-outline-danger\" (click)=\"DeleteParam(shippingParamModal,param.id) \" style=\"margin-right: 10px;\">Delete <i class=\"fas fa-minus-circle\"></i> </button>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n\n</div>\n<ng-template #shippingCompanyModal role=\"document\" let-modal=\"close\">\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">ADD SHIPPING COMPANY</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n          <div class=\"form-group\">\n              <label for=\"field-1\" class=\"control-label\">Shipping Name</label>\n              <input type=\"shippingName\" class=\"form-control\" [formControl]=\"shippingName\"  placeholder=\"Shipping Name\">\n          </div>\n      </div>\n  </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\"> Cancel </button>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"createCompany()\">Save</button>\n  </div>\n</ng-template>\n<ng-template #shippingParamModal role=\"document\" let-modal=\"close\">\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">ADD KEY</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n          <div class=\"form-group\">\n              <label for=\"field-1\" class=\"control-label\">Shipping key</label>\n              <input type=\"shippingName\" class=\"form-control\" [formControl]=\"key\"  placeholder=\"Shipping key\">\n          </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Shipping Value</label>\n            <input type=\"shippingName\" class=\"form-control\" [formControl]=\"value\"  placeholder=\"Shipping Value\">\n        </div>\n    </div>\n  </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\"> Cancel </button>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"submitParam()\">Save</button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/sms-model/sms-model.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/sms-model/sms-model.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"container-fluid\">\n  \n  <app-page-title title=\"SMS MODEL\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <div class=\"row\">\n      <div class=\"col-md-6\" >\n          <div class=\"card-box ribbon-box\">\n            <div class=\"ribbon ribbon-blue float-left\">\n              <i class=\"fas fa-mail-bulk mr-1\"></i> SMS MODEL</div>\n            <h5 class=\"text-whaite float-leftmt-0\"></h5>\n            <div class=\"ribbon-content\">\n              <button _ngcontent-ogl-c10=\"\" (click)=\"add(smsModal)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> ADD</button>\n              <div class=\"table-responsive\" style=\"text-align: center;\">\n                <table class=\"table table-dark table-borderless mb-0\">\n                  <thead>\n                    <tr>\n                      <th>{{trans.smsModel.nameModel}}</th>\n                      <th>{{trans.smsModel.status}}</th>\n                      <th>#</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let sms of sms_model\">\n                      <td>{{sms.nameModel}}</td>\n                      <td><ui-switch defaultBoColor=\"#dfdfdf\" color=\"#00b19d\" (change)=\"onChangeStatus($event,sms.id)\" [checked]=\"status(sms.status)\"></ui-switch></td>\n                      <td>\n                        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"edit(sms.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-edit\"></i> </button>\n                        <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete(smsModal,sms.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div> \n            </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\" *ngIf=\"smsModelId!=-1\">\n        <div class=\"card-box ribbon-box\">\n          <div class=\"ribbon ribbon-blue float-left\">\n            <i class=\"fas fa-language mr-1\"></i> SMS CONTENT</div>\n          <h5 class=\"text-whaite float-leftmt-0\"></h5>\n          <div class=\"ribbon-content\">\n            <button _ngcontent-ogl-c10=\"\" (click)=\"addContent(contentSmsModal)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> <i class=\"fas fa-key\"></i></button>\n            <div class=\"table-responsive\" style=\"text-align: center;\">\n              <table class=\"table table-dark table-borderless mb-0\">\n                <thead>\n                  <tr>\n                    <th>{{trans.contentSmsModel.langId}}</th>\n                    <th>#</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let contentsms of content_sms_model\">\n                    <td>{{getCodeLang(contentsms.langId)}}</td>\n                    <td>\n                      <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteContent(contentSmsModal,contentsms.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n                      <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"editContent(contentSmsModal,contentsms.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-edit\"></i> </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div> \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n\n</div>\n\n<ng-template #smsModal role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formSms_model\" [formGroup]=\"formSms_model\" (ngSubmit)=\"onSubmit()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n    <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.smsModel.nameModel}}</label>\n\n      <input type=\"nameModel\" formControlName=\"nameModel\"   class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameModel.errors }\" id=\"nameModel\"  />\n\n      <div *ngIf=\"submitted && f.nameModel.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.nameModel.errors.required\">{{trans.smsModel.nameModel}}</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n\n<ng-template #contentSmsModal role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formcontent_Sms_model\" [formGroup]=\"formcontent_Sms_model\" (ngSubmit)=\"onSubmitContent()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loadingContent\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleFormContent}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <ngb-alert type=\"danger\" *ngIf=\"errorContent\" [dismissible]=\"false\">{{ errorContent }}</ngb-alert>\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">{{trans.contentSmsModel.langId}}</label>\n       <ng-select   formControlName=\"langId\"  bindLabel=\"langCode\" bindValue=\"id\" [items]=\"Language\" ></ng-select>\n      <div *ngIf=\"submittedContent && fn.langId.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"fn.langId.errors.required\">{{trans.contentSmsModel.langId}}</div>\n      </div>\n    </div>\n    <div class=\"form-group mb-3\" *ngIf=\"ngEditContent\">\n      <label for=\"name\">Text</label>\n      <textarea formControlName=\"content_model\"   class=\"form-control\"></textarea>\n  \n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/submtion-text/submtion-text.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/submtion-text/submtion-text.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  <app-page-title title=\" Submtion Text\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card-box ribbon-box\">\n        <div class=\"ribbon ribbon-primary float-left\">\n          <i class=\"fe-mail mr-1\"></i> Submtion Text\n        </div>\n        <h5 class=\"text-whaite float-leftmt-0\"></h5>\n        <div class=\"ribbon-content\">\n          <h4 class=\"header-title\"> Submtion Text</h4>\n          <div class=\"byttondiv\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"showModelMemberships(BarcodesModel)\"><i class=\"mdi mdi-plus\"></i>ADD</button>\n          </div>\n          <div class=\"table-responsive mt-3\">\n            <table class=\"table table-dark table-borderless mb-0\">\n              <thead>\n                <tr>\n                  <th>Submtion Name</th>\n                  <th>shourt Content</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let Submtio of Submtion\">\n                  <th>{{Submtio.nameKey}}</th>\n                  <th>{{Submtio.shurtContent}}</th>\n                  <td>\n                    <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"showModelMemberships(BarcodesModel,Submtio.id)\"><i class=\"fas fa-edit\"></i> </button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #BarcodesModel role=\"document\" let-modal=\"close\">\n    <form class=\"needs-validation\" name=\"formBarcodes\" [formGroup]=\"formBarcodes\" (ngSubmit)=\"Save()\"\n    novalidate>\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-1\" class=\"control-label\">Name Key</label>\n            <input type=\"text\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.nameKey.errors }\" formControlName=\"nameKey\" placeholder=\"Name Key\">\n            <div *ngIf=\"submitted && f.nameKey.errors\" class=\"invalid-feedback\">\n              <div *ngIf=\"f.nameKey.errors.required\">Error</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group\">\n            <label for=\"field-2\" class=\"control-label\">Shurt Content</label>\n            <input type=\"text\" class=\"form-control\"  formControlName=\"shurtContent\" placeholder=\"Shurt Content\">\n          </div>\n        </div>\n        <div class=\"col-md-12\">\n          <div class=\"form-group mb-3\">\n            <label for=\"name\">Content</label>\n            <app-keditor  (getEditor)=\"getEditor($event)\" IDEDIT=\"Content\" VALUEEDIT=\"{{valueNotes}}\" id=\"Content\"  ></app-keditor>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\">\n        Cancel </button>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n    </form>\n\n  </ng-template>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/users/users.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/users/users.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  \n  <app-page-title title=\"USERS\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n\n  <div class=\"card-box mb-2 animated bounceInRight\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <button _ngcontent-ogl-c10=\"\" (click)=\"addUser(userModal)\" class=\"btn btn-success btn-rounded mb-3\" type=\"button\"><i _ngcontent-ogl-c10=\"\" class=\"mdi mdi-plus\"></i> ADD</button>\n      </div>\n    </div>\n    <div class=\"table-responsive\">\n      <table class=\"table \">\n        <thead>\n          <tr>\n            <th>Photo</th>\n            <th>Name</th>\n            <th>Phone Number</th>\n            <th>Email</th>\n            <th>Role</th>\n            <th>#</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let user of users\">\n            <th scope=\"row\"><img src=\"{{url+'/'+user.photo}}\" class=\"imageuser\"></th>\n            <th scope=\"row\">{{user.first_name+' '+user.last_name}}</th>\n            <td>{{user.telephone_number}}</td>\n            <td>{{user.email}}</td>\n            <td>{{user.role==1?'ADMIN':'limited'}}</td>\n            <td>\n              <button type=\"button\" class=\"btn btn-primary\" style=\"margin-right: 2px;\" (click)=\"editUser(userModal,user.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-edit\"></i> </button>\n              <button type=\"button\" class=\"btn btn-danger\" style=\"margin-right: 2px;\" (click)=\"removeUser(userModal,user.id)\"><i _ngcontent-ogl-c10=\"\" class=\"fas fa-minus-circle\"></i> </button>\n              <button type=\"button\" *ngIf=\"user.role==2\" (click)=\"OpenPermission(permissionModal,user.id)\" class=\"btn btn-outline-warning\"><i class=\"mdi mdi-shield-key\"></i></button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div> \n  </div>\n  \n\n</div>\n<ng-template #userModal role=\"document\" let-modal=\"close\">\n  <form class=\"needs-validation\" name=\"formUser\" [formGroup]=\"formUser\" (ngSubmit)=\"onSubmit()\"\n  novalidate>\n  <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{titleForm}}</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n   \n\n    <div class=\"col-lg-12\">\n      \n      <div class=\"img-container\">\n        <image-cropper \n        [imageBase64]=\"imageChangedEvent\" \n        [maintainAspectRatio]=\"true\" \n        [aspectRatio]=\"20 / 20\"\n        [resizeToWidth]=\"256\" \n        [cropperMinWidth]=\"300\"\n        [cropperMinHeight]=\"300\"\n        format=\"png\" \n        (imageCropped)=\"imageCropped($event)\" style=\"height: 139px;\" ></image-cropper>\n\n\n      </div>\n    </div>\n    <div class=\"form-group mb-3\" *ngIf=\"ControllerPhoto\">\n      <label>{{trans.users.choose_photo}} </label>\n      <div class=\"input-group\">\n          <div class=\"custom-file\">\n            <input type=\"file\" class=\"custom-file-input\" accept=\"image/x-png,image/gif,image/jpeg\"  (change)=\"onFileSelect($event)\" >\n            <label class=\"custom-file-label\" for=\"inputGroupFile04\">{{trans.users.choose_photo}} </label>\n          </div>\n      </div>\n    </div>\n    <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">First Name</label>\n\n      <input type=\"text\" formControlName=\"first_name\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.first_name.errors }\" id=\"first_name\" placeholder=\"Enter your first name\" />\n\n      <div *ngIf=\"submitted && f.first_name.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.first_name.errors.required\">First Name</div>\n      </div>\n    </div>\n\n    <div class=\"form-group mb-3\">\n      <label for=\"name\">Last Name</label>\n\n      <input type=\"text\" formControlName=\"last_name\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.last_name.errors }\" id=\"last_name\" placeholder=\"Enter your last name\" />\n\n      <div *ngIf=\"submitted && f.last_name.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.last_name.errors.required\">Last Name</div>\n      </div>\n    </div>\n    <div class=\"form-group mb-3\">\n      <label for=\"email\">Role</label>\n\n     \n        <select formControlName=\"role\" class=\"form-control\"\n        [ngClass]=\"{ 'is-invalid': submitted && f.role.errors }\" id=\"role\">\n          <option value=\"1\" selected>{{trans.users.role_Admin}}</option>\n          <option value=\"2\">{{trans.users.role_limited}}</option>\n        </select>\n    </div>\n    <div class=\"form-group mb-3\">\n      <label for=\"email\">Email</label>\n\n      <input type=\"email\" formControlName=\"email\" class=\"form-control\"\n        [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\" id=\"email\" placeholder=\"Email\" />\n\n      <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.email.errors.required\">Email</div>\n        <div *ngIf=\"f.email.errors.email\">Email</div>\n      </div>\n    </div>\n\n   \n    <div class=\"form-group mb-3\">\n      <label for=\"phone\">Phone Number</label>\n\n      <ngx-intl-tel-input \n      [cssClass]=\"'form-control'\" \n      [preferredCountries]=\"preferredCountries\"\n      [enableAutoCountrySelect]=\"true\" \n      [enablePlaceholder]=\"true\" \n      [searchCountryFlag]=\"true\"\n      [searchCountryField]=\"[SearchCountryField.Iso2, SearchCountryField.Name]\"\n      [selectFirstCountry]=\"false\" \n      [selectedCountryISO]=\"CountryISO.Turkey\"\n      [tooltipField]=\"TooltipLabel.Name\" \n      [phoneValidation]=\"false\" \n      [separateDialCode]=\"separateDialCode\"\n      name=\"phone\" formControlName=\"telephone_number\"  [ngClass]=\"{ 'is-invalid': submitted && f.telephone_number.errors }\" >\n    </ngx-intl-tel-input>\n    <div *ngIf=\"submitted && f.telephone_number.errors\" class=\"invalid-feedback\">\n      <div *ngIf=\"f.telephone_number.errors.required\">{{trans.users.Password_is_required}}</div>\n    </div>\n    </div>\n    <div class=\"form-group mb-3\">\n      <label for=\"password\">Password</label>\n\n      <input type=\"password\" formControlName=\"password\" class=\"form-control\"\n        [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" id=\"password\" placeholder=\"Password\" />\n\n      <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n        <div *ngIf=\"f.password.errors.required\">{{trans.users.Password_is_required}}</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-light waves-effect\" (click)=\"modal('Cross click')\" >{{trans.users.btn_modal_close}}</button>\n      <button type=\"button\" class=\"btn btn-primary\" type=\"submit\">{{trans.users.btn_modal_save}}</button>\n  </div>\n</form>\n</ng-template>\n<ng-template #permissionModal role=\"document\" let-modal=\"close\">\n  <div class=\"modal-header\">\n      <h4 class=\"modal-title\" style=\"text-transform: uppercase;\">Permissions</h4>\n      <button type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"modal('Cross click')\">×</button>\n  </div>\n  <div class=\"modal-body\">\n    <app-permissions ID=\"{{ID}}\" USERTYPE=\"{{USERTYPE}}\"></app-permissions>\n  </div>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/whatsapp/whatsapp.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/whatsapp/whatsapp.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\">\n  <app-page-title title=\"PATIENTS\" [breadcrumbItems]=\"breadCrumbItems\"></app-page-title>\n  <a class=\"btn btn-outline-info\" (click)=\"logOut()\" *ngIf=\"status===1\">LogOut</a>\n  <div class=\"card\">\n    <div class=\"row\" style=\"text-align:center ;\">\n      <div class=\"col-md-12\" id=\"qrWahtsapp\" ></div>\n      <div class=\"col-md-4\" *ngIf=\"status===1\">\n        <div style=\"max-height: 55vh;\n        overflow: auto;\">\n          <div *ngFor=\"let cotac of Contacts\" style=\"    padding: 10px;\n          border: 1px dashed #cbc4c4;\n          text-align: left;\" (click)=\"getChats(cotac.id._serialized)\">\n            <a>{{cotac.name}}</a>\n            \n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-8\" *ngIf=\"status===1\">\n        <div style=\"max-height: 55vh;overflow: auto;\">\n                <p *ngFor=\"let chat of Chats\" [innerHTML]=\"chat.message\" style=\"padding: 10px;\n                font-size: 13px;\n                background: #f5f5f5;\n                margin-top: 10px;\">\n                </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>");

/***/ }),

/***/ "./src/app/core/services/email_model/email-model.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/core/services/email_model/email-model.service.ts ***!
  \******************************************************************/
/*! exports provided: EmailModelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailModelService", function() { return EmailModelService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let EmailModelService = class EmailModelService {
    constructor(http) {
        this.http = http;
        this.email_model = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    getll_email_model() {
        return this.email_model.asObservable();
    }
    getllContentById(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/getAllContent", { email_model_id: id });
    }
    getAll() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/getall", {}).subscribe(res => {
            this.email_model.next(res);
        });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/create", param);
    }
    delete(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/delete", param);
    }
    deactivate_or_activate(id, statu) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/deactivate_or_activate", { id: id, status: statu });
    }
    createContent(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/createContent", param);
    }
    deleteConent(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/deleteContent", { id: param['id'] });
    }
    updateContent(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/email_model/updateContent", param);
    }
};
EmailModelService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
EmailModelService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], EmailModelService);



/***/ }),

/***/ "./src/app/core/services/seo/seo.service.ts":
/*!**************************************************!*\
  !*** ./src/app/core/services/seo/seo.service.ts ***!
  \**************************************************/
/*! exports provided: SeoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeoService", function() { return SeoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let SeoService = class SeoService {
    constructor(http) {
        this.http = http;
        this.seo = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    setSeo() {
        return this.seo.asObservable();
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/seo/getAll", {}).subscribe(res => {
            this.seo.next(res);
        });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/seo/create", param);
    }
    update(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/seo/update", param);
    }
    delete(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/seo/delete", { id: id });
    }
};
SeoService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
SeoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], SeoService);



/***/ }),

/***/ "./src/app/core/services/sms_model/sms-model.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/core/services/sms_model/sms-model.service.ts ***!
  \**************************************************************/
/*! exports provided: SmsModelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmsModelService", function() { return SmsModelService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let SmsModelService = class SmsModelService {
    constructor(http) {
        this.http = http;
        this.email_model = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    getll_email_model() {
        return this.email_model.asObservable();
    }
    getllContentById(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/getAllContent", { sms_model_id: id });
    }
    getAll() {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/getall", {}).subscribe(res => {
            this.email_model.next(res);
        });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/create", param);
    }
    delete(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/delete", param);
    }
    deactivate_or_activate(id, statu) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/deactivate_or_activate", { id: id, status: statu });
    }
    createContent(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/createContent", param);
    }
    deleteConent(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/deleteContent", { id: param['id'] });
    }
    updateContent(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/sms_model/updateContent", param);
    }
};
SmsModelService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
SmsModelService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], SmsModelService);



/***/ }),

/***/ "./src/app/core/services/socialMedia/social-media.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/core/services/socialMedia/social-media.service.ts ***!
  \*******************************************************************/
/*! exports provided: SocialMediaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialMediaService", function() { return SocialMediaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let SocialMediaService = class SocialMediaService {
    constructor(http) {
        this.http = http;
        this.socialMedia = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    setSocialMedia() {
        return this.socialMedia.asObservable();
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/socialMedia/getAll", {}).subscribe(res => {
            this.socialMedia.next(res);
        });
    }
    create(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/socialMedia/create", param);
    }
    update(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/socialMedia/update", param);
    }
    delete(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/socialMedia/delete", { id: id });
    }
};
SocialMediaService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
SocialMediaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], SocialMediaService);



/***/ }),

/***/ "./src/app/core/services/users/users.service.ts":
/*!******************************************************!*\
  !*** ./src/app/core/services/users/users.service.ts ***!
  \******************************************************/
/*! exports provided: UsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersService", function() { return UsersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let UsersService = class UsersService {
    constructor(http) {
        this.http = http;
        this.Users = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    toFormData(formValue) {
        const formData = new FormData();
        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            formData.append(key, value);
        }
        return formData;
    }
    getUsers() {
        return this.Users.asObservable();
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/user/getall", {}).subscribe(res => {
            this.Users.next(res);
        });
    }
    getUserById(id) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/user/getbyid", { id: id });
    }
    addUser(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/user/create", param);
    }
    updateUser(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/user/update", param);
    }
    deleteUser(param) {
        return this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/user/delete", { id: param['id'] });
    }
};
UsersService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
UsersService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], UsersService);



/***/ }),

/***/ "./src/app/portals/settings/barcodes/barcodes.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/portals/settings/barcodes/barcodes.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvYmFyY29kZXMvYmFyY29kZXMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/portals/settings/barcodes/barcodes.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/portals/settings/barcodes/barcodes.component.ts ***!
  \*****************************************************************/
/*! exports provided: BarcodesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodesComponent", function() { return BarcodesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");







let BarcodesComponent = class BarcodesComponent {
    constructor(http, modelServices, formBuilder, tost) {
        this.http = http;
        this.modelServices = modelServices;
        this.formBuilder = formBuilder;
        this.tost = tost;
        this.Barcodes = [];
        this.error = '';
        this.titleForm = "";
        this.submitted = false;
        this.idStatic = 0;
        //set Validators formMembership
        this.formBarcodes = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            productType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            productsName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            GTIN: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            Control: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            PCSUN: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            SN: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            DG: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Barcodes', path: '/', active: true }];
    }
    ssnValidator(control) {
        if ((parseInt(control.value) || control.value == 0) && parseInt(control.value) <= 100 && parseInt(control.value) >= 0) {
            return null;
        }
        else {
            return { ssn: true };
        }
    }
    ngOnInit() {
        this.formBarcodes.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.formBarcodes.addControl('Contents', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.getAll();
    }
    getEditor(event) {
        this.editor = event;
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + "/barcodes/get", {}).subscribe(res => {
            this.Barcodes = res;
        });
    }
    get f() { return this.formBarcodes.controls; }
    showModelMemberships(model, idStatic = null) {
        this.submitted = false;
        if (idStatic) {
            this.formBarcodes.reset();
            this.titleForm = "Edit Barcodes";
            this.idStatic = idStatic;
            let mem = this.Barcodes.find(x => x.id == idStatic);
            this.formBarcodes.get("name").setValue(mem.name);
            this.formBarcodes.get("productType").setValue(mem.productType);
            this.formBarcodes.get("productsName").setValue(mem.productsName);
            this.formBarcodes.get("GTIN").setValue(mem.GTIN);
            this.formBarcodes.get("Control").setValue(mem.Control);
            this.formBarcodes.get("PCSUN").setValue(mem.PCSUN);
            this.formBarcodes.get("SN").setValue(mem.SN);
            this.formBarcodes.get("DG").setValue(mem.DG);
            this.formBarcodes.get("id").setValue(mem.id);
            this.valueNotes = mem.Contents;
        }
        else {
            this.titleForm = "Add Barcodes";
            this.idStatic = -1;
            this.formBarcodes.reset();
        }
        this.modelServices.open(model, { backdrop: 'static' });
    }
    create() {
        this.submitted = true;
        if (!this.formBarcodes.valid) {
            return;
        }
        this.formBarcodes.get('Contents').setValue(this.editor.getData());
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + '/barcodes/createAndUpdate', this.formBarcodes.value).subscribe(res => {
            if (res.message == 2000) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record added successfully", "successful");
            }
            else if (res.message == 2001) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record Updateded successfully", "successful");
            }
        });
    }
    Save() {
        this.create();
    }
};
BarcodesComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
BarcodesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-barcodes',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./barcodes.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/barcodes/barcodes.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./barcodes.component.scss */ "./src/app/portals/settings/barcodes/barcodes.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
], BarcodesComponent);



/***/ }),

/***/ "./src/app/portals/settings/barnd-setting/barnd-setting.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/portals/settings/barnd-setting/barnd-setting.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".boxUpploader {\n  width: 150px;\n  height: 150px;\n  border-radius: 10px;\n  border: 1px dashed #373b94;\n  cursor: pointer;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.boxUpploader:hover {\n  background-color: #d7d7d7;\n}\n\n.boxViewer {\n  width: 150px;\n  height: 150px;\n  position: absolute;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  background: #00000069;\n  border-radius: 12px;\n  opacity: 0;\n}\n\n.boxViewer:hover {\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWVyZ2hqamV5L0RvY3VtZW50cy9Qcm9qZWN0cy9QYXJpc2FsaW5lT2xkL2FkbWluL3NyYy9hcHAvcG9ydGFscy9zZXR0aW5ncy9iYXJuZC1zZXR0aW5nL2Jhcm5kLXNldHRpbmcuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvYmFybmQtc2V0dGluZy9iYXJuZC1zZXR0aW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDQ0o7O0FERUE7RUFDSSx5QkFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFVBQUE7QUNDSjs7QURFQTtFQUNJLFVBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvYmFybmQtc2V0dGluZy9iYXJuZC1zZXR0aW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJveFVwcGxvYWRlciB7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogMTUwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBib3JkZXI6IDFweCBkYXNoZWQgIzM3M2I5NDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYm94VXBwbG9hZGVyOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdkN2Q3O1xufVxuXG4uYm94Vmlld2Vye1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZDogIzAwMDAwMDY5O1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgb3BhY2l0eTowO1xufVxuXG4uYm94Vmlld2VyOmhvdmVye1xuICAgIG9wYWNpdHk6MTtcbn1cbiIsIi5ib3hVcHBsb2FkZXIge1xuICB3aWR0aDogMTUwcHg7XG4gIGhlaWdodDogMTUwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjMzczYjk0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYm94VXBwbG9hZGVyOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZDdkNztcbn1cblxuLmJveFZpZXdlciB7XG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogIzAwMDAwMDY5O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBvcGFjaXR5OiAwO1xufVxuXG4uYm94Vmlld2VyOmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/portals/settings/barnd-setting/barnd-setting.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/portals/settings/barnd-setting/barnd-setting.component.ts ***!
  \***************************************************************************/
/*! exports provided: BarndSettingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarndSettingComponent", function() { return BarndSettingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");





let BarndSettingComponent = class BarndSettingComponent {
    constructor(http, modalService) {
        this.http = http;
        this.modalService = modalService;
        this.PathStatic = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url;
        this.BrandSetting = [];
        this.oninitInput = (element) => {
        };
    }
    onFileSelected($element, key) {
        let formdata = new FormData();
        formdata.append('fileData', $element.target.files[0]);
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/fileManager/uploadFileToTemp", formdata, {
            reportProgress: true,
            observe: 'events'
        }).subscribe(resp => {
            if (resp.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Response) {
                console.log('Finshed Uploadded');
                this.BrandSetting.find(x => x.key == key).uploading = -1;
                this.BrandSetting.find(x => x.key == key).temp = resp.body.path;
            }
            if (resp.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].UploadProgress) {
                const percentDone = Math.round(100 * resp.loaded / resp.total);
                this.BrandSetting.find(x => x.key == key).uploading = percentDone;
            }
        });
    }
    RemoveFile(key) {
        this.BrandSetting.find(x => x.key == key).temp = undefined;
    }
    RemoveFileStatic(key) {
        this.BrandSetting.find(x => x.key == key).value = undefined;
    }
    ChangeValue(Code, key) {
        this.BrandSetting.find(x => x.key == key).temp = Code;
    }
    chnageText(element, key) {
        this.BrandSetting.find(x => x.key == key).temp = element.target.value;
    }
    ngOnInit() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/brandSettings/GetAll", {}).subscribe((result) => {
            if (result.error == 0) {
                this.BrandSetting = result.data;
            }
        });
    }
    showModalAdd(content) {
        this.modalService.open(content, { backdrop: 'static' });
    }
    addNewComp(type, key) {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/brandSettings/Create", { key: key, type: type }).subscribe((result) => {
            if (result.error == 0) {
                this.BrandSetting.push({ id: result.data.id, key: result.data.key, type: result.data.type });
                this.modalService.dismissAll();
            }
            else {
                alert(result.data);
            }
        });
    }
    save(key) {
        let comp = this.BrandSetting.find(x => x.key == key);
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url + "/brandSettings/Update", { id: comp.id, value: comp.temp }).subscribe((result) => {
            if (result.error == 0) {
                comp.value = comp.temp;
                comp.temp = undefined;
                comp.uploading = undefined;
            }
            else {
                alert(result.data);
            }
        });
    }
};
BarndSettingComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] }
];
BarndSettingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-barnd-setting',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./barnd-setting.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/barnd-setting/barnd-setting.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./barnd-setting.component.scss */ "./src/app/portals/settings/barnd-setting/barnd-setting.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
], BarndSettingComponent);



/***/ }),

/***/ "./src/app/portals/settings/case-stage/case-stage.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/portals/settings/case-stage/case-stage.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvY2FzZS1zdGFnZS9jYXNlLXN0YWdlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/case-stage/case-stage.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/portals/settings/case-stage/case-stage.component.ts ***!
  \*********************************************************************/
/*! exports provided: CaseStageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaseStageComponent", function() { return CaseStageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");







let CaseStageComponent = class CaseStageComponent {
    constructor(http, modelServices, formBuilder, tost) {
        this.http = http;
        this.modelServices = modelServices;
        this.formBuilder = formBuilder;
        this.tost = tost;
        this.Stages = [];
        this.StageType = [
            { nameType: 'Internal', id: 1 },
            { nameType: 'External', id: 0 },
        ];
        this.error = '';
        this.titleForm = "";
        this.submitted = false;
        this.idStatic = 0;
        //set Validators formMembership
        this.formBarcodes = this.formBuilder.group({
            nameStage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            numberStage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            color: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            type: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            sort: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            ShowStage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Case Stages', path: '/', active: true }];
    }
    ssnValidator(control) {
        if ((parseInt(control.value) || control.value == 0) && parseInt(control.value) <= 100 && parseInt(control.value) >= 0) {
            return null;
        }
        else {
            return { ssn: true };
        }
    }
    ngOnInit() {
        this.formBarcodes.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.getAll();
    }
    getEditor(event) {
        this.editor = event;
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + "/caseStages/get", {}).subscribe(res => {
            this.Stages = res;
        });
    }
    get f() { return this.formBarcodes.controls; }
    showModelMemberships(model, idStatic = null) {
        this.submitted = false;
        if (idStatic) {
            this.formBarcodes.reset();
            this.titleForm = "Edit Barcodes";
            this.idStatic = idStatic;
            let mem = this.Stages.find(x => x.id == idStatic);
            this.formBarcodes.get("nameStage").setValue(mem.nameStage);
            this.formBarcodes.get("numberStage").setValue(mem.numberStage);
            this.formBarcodes.get("type").setValue(mem.type);
            this.formBarcodes.get("color").setValue(mem.color);
            this.formBarcodes.get("sort").setValue(mem.sort);
            this.formBarcodes.get("ShowStage").setValue(mem.ShowStage);
            this.formBarcodes.get("id").setValue(mem.id);
            this.valueNotes = mem.Contents;
        }
        else {
            this.titleForm = "Add Stage";
            this.idStatic = -1;
            this.formBarcodes.reset();
        }
        this.modelServices.open(model, { backdrop: 'static' });
    }
    create() {
        this.submitted = true;
        if (!this.formBarcodes.valid) {
            return;
        }
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + '/caseStages/createAndUpdate', this.formBarcodes.value).subscribe(res => {
            if (res.message == 2000) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record added successfully", "successful");
            }
            else if (res.message == 2001) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record Updateded successfully", "successful");
            }
        });
    }
    Save() {
        this.create();
    }
};
CaseStageComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
CaseStageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-case-stage',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./case-stage.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/case-stage/case-stage.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./case-stage.component.scss */ "./src/app/portals/settings/case-stage/case-stage.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
], CaseStageComponent);



/***/ }),

/***/ "./src/app/portals/settings/city/city.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/portals/settings/city/city.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvY2l0eS9jaXR5LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/city/city.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/portals/settings/city/city.component.ts ***!
  \*********************************************************/
/*! exports provided: CityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CityComponent", function() { return CityComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_city_city_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/city/city.service */ "./src/app/core/services/city/city.service.ts");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/language/language.service */ "./src/app/core/services/language/language.service.ts");
/* harmony import */ var src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/country/country.service */ "./src/app/core/services/country/country.service.ts");









let CityComponent = class CityComponent {
    constructor(transs, CityService, formBuilder, modalService, toastr, lang, CountryService) {
        this.transs = transs;
        this.CityService = CityService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.lang = lang;
        this.CountryService = CountryService;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "ADD CITIES";
        this.typeForm = 0;
        this.cityId = -1;
        this.submittedName = false;
        this.errorName = '';
        this.loadingName = false;
        this.titleFormName = "Add cityName";
        this.typeFormName = 0;
    }
    get f() { return this.formCity.controls; }
    get fn() { return this.formCityName.controls; }
    ngOnInit() {
        //CITIES
        this.getCountry();
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "SETTINGS", path: '/', active: true }, { label: "CITIES", path: '/', active: true }];
        });
        this.City = this.CityService.set().subscribe(res => {
            this.city = res;
        });
        this.CityService.getAll();
        //Form validators 
        this.formCity = this.formBuilder.group({
            countryId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            cityName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.formCity.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        //Form validators 
        this.formCityName = this.formBuilder.group({
            cityName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            langId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.formCityName.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        this.formCityName.addControl('cityId', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
    }
    getLang() {
        this.lang.getAllLanguageAndClassfier().subscribe(res => {
            this.Language = res;
        });
    }
    getCodeLang(id) {
        if (this.Language.find(x => x.id == id) == undefined) {
            return this.trans.cityName.thislanguageitisstop;
        }
        else {
            return this.Language.find(x => x.id == id).langCode;
        }
    }
    getCountry() {
        this.CountryService.getAllAndName().subscribe(res => {
            this.country = res;
        });
    }
    getCodeCountry(id) {
        if (this.country != undefined) {
            if (this.country.find(x => x.id == id) != undefined) {
                return this.country.find(x => x.id == id).code;
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    }
    getCNameCountry(id) {
        if (this.country != undefined) {
            if (this.country.find(x => x.id == id) != undefined) {
                return this.country.find(x => x.id == id).countryName;
            }
            else {
                return "stop";
            }
        }
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
        this.City.unsubscribe();
    }
    status(status) {
        if (status == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    ChangeStatus(event, id) {
        if (event) {
            return this.CityService.deactivate_or_activate(id, 1);
        }
        else {
            return this.CityService.deactivate_or_activate(id, 0);
        }
    }
    onChangeStatus($event, id) {
        this.ChangeStatus($event, id).subscribe(res => {
            if ($event) {
                this.toastr.success(this.trans.city.TheCityHasBeenActivated, "successfull", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.warning(this.trans.city.CityHasBeenDeactivated, "warning", {
                    timeOut: 3000
                });
            }
        }, err => {
            if (err = 2010) {
                this.toastr.warning(this.trans.city.YouMustHaveAtLeastOneName, "warning", {
                    timeOut: 3000
                });
                this.CityService.getAll();
            }
            else {
                this.toastr.error(this.trans.city.UnknownError, "error", {
                    timeOut: 3000
                });
            }
        });
    }
    putValueForm(id) {
        this.formCity.get('id').setValue(this.city.find(x => x.id == id).id);
        this.formCity.get('cityName').setValue(this.city.find(x => x.id == id).cityName);
    }
    disableForm() {
        this.formCity.disable({ onlySelf: true });
    }
    enableForm() {
        this.formCity.enable({ onlySelf: true });
    }
    add(content) {
        this.getCountry();
        this.enableForm();
        this.formCity.reset();
        this.typeForm = 0;
        this.titleForm = "ADD CITY";
        this.modalService.open(content, { backdrop: 'static' });
    }
    edit(id) {
        this.getLang();
        this.cityId = id;
        this.titleForm = "EDIT CITY";
        this.getAllName();
    }
    delete(content, id) {
        this.formCity.reset();
        this.putValueForm(id);
        this.disableForm();
        this.typeForm = 2;
        this.titleForm = "DELETE CITY";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.CityService.create(param);
        }
        else {
            return this.CityService.delete(this.formCity.get('id').value);
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.formCity.invalid) {
            return;
        }
        this.loading = true;
        this.submit(this.formCity.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.city.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.city.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.CityService.getAll();
            this.loading = false;
            this.submitted = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error("Record has been successfully added", "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.city.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.city.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChange(event) {
        // this.formCity.get('code').setValue(this.formCity.get('code').value.toLowerCase())
    }
    //Name
    putValueFormName(id) {
        this.formCityName.get('id').setValue(this.cityName.find(x => x.id == id).id);
        this.formCityName.get('cityName').setValue(this.cityName.find(x => x.id == id).cityName);
        this.formCityName.get('cityId').setValue(this.cityName.find(x => x.id == id).cityId);
        this.formCityName.get('langId').setValue(this.cityName.find(x => x.id == id).langId);
    }
    disableFormName() {
        this.formCityName.disable({ onlySelf: true });
    }
    enableFormName() {
        this.formCityName.enable({ onlySelf: true });
    }
    addName(content) {
        if (this.cityId != -1) {
            this.enableFormName();
            this.getLang();
            this.formCityName.reset();
            this.typeFormName = 0;
            this.titleFormName = "ADD LANGUAGE";
            this.modalService.open(content, { backdrop: 'static' });
            this.formCityName.get('cityId').setValue(this.cityId);
        }
    }
    getAllName() {
        this.CityService.getAllName(this.cityId).subscribe(res => {
            this.cityName = res;
        });
    }
    deleteName(content, id) {
        this.formCityName.reset();
        this.putValueFormName(id);
        this.disableFormName();
        this.typeFormName = 2;
        this.titleFormName = "DELETE LANGUAGE";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submitName(param) {
        if (this.typeFormName == 0) {
            return this.CityService.createName(param);
        }
        else {
            return this.CityService.deleteName(this.formCityName.get('id').value);
        }
    }
    onSubmitName() {
        this.submittedName = true;
        if (this.formCityName.invalid) {
            return;
        }
        this.loadingName = true;
        this.submitName(this.formCityName.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.cityName.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.cityName.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.getAllName();
            this.loadingName = false;
            this.submittedName = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.city.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.city.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.city.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChangeName(event) {
        this.formCityName.get('cityId').setValue(this.formCity.get('cityId').value.toUpperCase());
    }
};
CityComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"] },
    { type: _core_services_city_city_service__WEBPACK_IMPORTED_MODULE_2__["CityService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
    { type: src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"] },
    { type: src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_8__["CountryService"] }
];
CityComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-city',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./city.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/city/city.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./city.component.scss */ "./src/app/portals/settings/city/city.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"],
        _core_services_city_city_service__WEBPACK_IMPORTED_MODULE_2__["CityService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
        src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"],
        src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_8__["CountryService"]])
], CityComponent);



/***/ }),

/***/ "./src/app/portals/settings/country/country.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/portals/settings/country/country.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvY291bnRyeS9jb3VudHJ5LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/country/country.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/portals/settings/country/country.component.ts ***!
  \***************************************************************/
/*! exports provided: CountryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountryComponent", function() { return CountryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_country_country_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/country/country.service */ "./src/app/core/services/country/country.service.ts");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/language/language.service */ "./src/app/core/services/language/language.service.ts");








let CountryComponent = class CountryComponent {
    constructor(transs, CountryService, formBuilder, modalService, toastr, lang) {
        this.transs = transs;
        this.CountryService = CountryService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.lang = lang;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "ADD COUNTRY";
        this.typeForm = 0;
        this.countryId = -1;
        this.submittedName = false;
        this.errorName = '';
        this.loadingName = false;
        this.titleFormName = "ADD countryName";
        this.typeFormName = 0;
        this.countryArray = [
            { nameCountry: 'Afghanistan', code: 'AF' },
            { nameCountry: 'Åland Islands', code: 'AX' },
            { nameCountry: 'Albania', code: 'AL' },
            { nameCountry: 'Algeria', code: 'DZ' },
            { nameCountry: 'American Samoa', code: 'AS' },
            { nameCountry: 'AndorrA', code: 'AD' },
            { nameCountry: 'Angola', code: 'AO' },
            { nameCountry: 'Anguilla', code: 'AI' },
            { nameCountry: 'Antarctica', code: 'AQ' },
            { nameCountry: 'Antigua and Barbuda', code: 'AG' },
            { nameCountry: 'Argentina', code: 'AR' },
            { nameCountry: 'Armenia', code: 'AM' },
            { nameCountry: 'Aruba', code: 'AW' },
            { nameCountry: 'Australia', code: 'AU' },
            { nameCountry: 'Austria', code: 'AT' },
            { nameCountry: 'Azerbaijan', code: 'AZ' },
            { nameCountry: 'Bahamas', code: 'BS' },
            { nameCountry: 'Bahrain', code: 'BH' },
            { nameCountry: 'Bangladesh', code: 'BD' },
            { nameCountry: 'Barbados', code: 'BB' },
            { nameCountry: 'Belarus', code: 'BY' },
            { nameCountry: 'Belgium', code: 'BE' },
            { nameCountry: 'Belize', code: 'BZ' },
            { nameCountry: 'Benin', code: 'BJ' },
            { nameCountry: 'Bermuda', code: 'BM' },
            { nameCountry: 'Bhutan', code: 'BT' },
            { nameCountry: 'Bolivia', code: 'BO' },
            { nameCountry: 'Bosnia and Herzegovina', code: 'BA' },
            { nameCountry: 'Botswana', code: 'BW' },
            { nameCountry: 'Bouvet Island', code: 'BV' },
            { nameCountry: 'Brazil', code: 'BR' },
            { nameCountry: 'British Indian Ocean Territory', code: 'IO' },
            { nameCountry: 'Brunei Darussalam', code: 'BN' },
            { nameCountry: 'Bulgaria', code: 'BG' },
            { nameCountry: 'Burkina Faso', code: 'BF' },
            { nameCountry: 'Burundi', code: 'BI' },
            { nameCountry: 'Cambodia', code: 'KH' },
            { nameCountry: 'Cameroon', code: 'CM' },
            { nameCountry: 'Canada', code: 'CA' },
            { nameCountry: 'Cape Verde', code: 'CV' },
            { nameCountry: 'Cayman Islands', code: 'KY' },
            { nameCountry: 'Central African Republic', code: 'CF' },
            { nameCountry: 'Chad', code: 'TD' },
            { nameCountry: 'Chile', code: 'CL' },
            { nameCountry: 'China', code: 'CN' },
            { nameCountry: 'Christmas Island', code: 'CX' },
            { nameCountry: 'Cocos (Keeling) Islands', code: 'CC' },
            { nameCountry: 'Colombia', code: 'CO' },
            { nameCountry: 'Comoros', code: 'KM' },
            { nameCountry: 'Congo', code: 'CG' },
            { nameCountry: 'Congo, The Democratic Republic of the', code: 'CD' },
            { nameCountry: 'Cook Islands', code: 'CK' },
            { nameCountry: 'Costa Rica', code: 'CR' },
            { nameCountry: 'Cote D\'Ivoire', code: 'CI' },
            { nameCountry: 'Croatia', code: 'HR' },
            { nameCountry: 'Cuba', code: 'CU' },
            { nameCountry: 'Cyprus', code: 'CY' },
            { nameCountry: 'Czech Republic', code: 'CZ' },
            { nameCountry: 'Denmark', code: 'DK' },
            { nameCountry: 'Djibouti', code: 'DJ' },
            { nameCountry: 'Dominica', code: 'DM' },
            { nameCountry: 'Dominican Republic', code: 'DO' },
            { nameCountry: 'Ecuador', code: 'EC' },
            { nameCountry: 'Egypt', code: 'EG' },
            { nameCountry: 'El Salvador', code: 'SV' },
            { nameCountry: 'Equatorial Guinea', code: 'GQ' },
            { nameCountry: 'Eritrea', code: 'ER' },
            { nameCountry: 'Estonia', code: 'EE' },
            { nameCountry: 'Ethiopia', code: 'ET' },
            { nameCountry: 'Falkland Islands (Malvinas)', code: 'FK' },
            { nameCountry: 'Faroe Islands', code: 'FO' },
            { nameCountry: 'Fiji', code: 'FJ' },
            { nameCountry: 'Finland', code: 'FI' },
            { nameCountry: 'France', code: 'FR' },
            { nameCountry: 'French Guiana', code: 'GF' },
            { nameCountry: 'French Polynesia', code: 'PF' },
            { nameCountry: 'French Southern Territories', code: 'TF' },
            { nameCountry: 'Gabon', code: 'GA' },
            { nameCountry: 'Gambia', code: 'GM' },
            { nameCountry: 'Georgia', code: 'GE' },
            { nameCountry: 'Germany', code: 'DE' },
            { nameCountry: 'Ghana', code: 'GH' },
            { nameCountry: 'Gibraltar', code: 'GI' },
            { nameCountry: 'Greece', code: 'GR' },
            { nameCountry: 'Greenland', code: 'GL' },
            { nameCountry: 'Grenada', code: 'GD' },
            { nameCountry: 'Guadeloupe', code: 'GP' },
            { nameCountry: 'Guam', code: 'GU' },
            { nameCountry: 'Guatemala', code: 'GT' },
            { nameCountry: 'Guernsey', code: 'GG' },
            { nameCountry: 'Guinea', code: 'GN' },
            { nameCountry: 'Guinea-Bissau', code: 'GW' },
            { nameCountry: 'Guyana', code: 'GY' },
            { nameCountry: 'Haiti', code: 'HT' },
            { nameCountry: 'Heard Island and Mcdonald Islands', code: 'HM' },
            { nameCountry: 'Holy See (Vatican City State)', code: 'VA' },
            { nameCountry: 'Honduras', code: 'HN' },
            { nameCountry: 'Hong Kong', code: 'HK' },
            { nameCountry: 'Hungary', code: 'HU' },
            { nameCountry: 'Iceland', code: 'IS' },
            { nameCountry: 'India', code: 'IN' },
            { nameCountry: 'Indonesia', code: 'ID' },
            { nameCountry: 'Iran, Islamic Republic Of', code: 'IR' },
            { nameCountry: 'Iraq', code: 'IQ' },
            { nameCountry: 'Ireland', code: 'IE' },
            { nameCountry: 'Isle of Man', code: 'IM' },
            { nameCountry: 'Israel', code: 'IL' },
            { nameCountry: 'Italy', code: 'IT' },
            { nameCountry: 'Jamaica', code: 'JM' },
            { nameCountry: 'Japan', code: 'JP' },
            { nameCountry: 'Jersey', code: 'JE' },
            { nameCountry: 'Jordan', code: 'JO' },
            { nameCountry: 'Kazakhstan', code: 'KZ' },
            { nameCountry: 'Kenya', code: 'KE' },
            { nameCountry: 'Kiribati', code: 'KI' },
            { nameCountry: 'Korea, Democratic People\'S Republic of', code: 'KP' },
            { nameCountry: 'Korea, Republic of', code: 'KR' },
            { nameCountry: 'Kuwait', code: 'KW' },
            { nameCountry: 'Kyrgyzstan', code: 'KG' },
            { nameCountry: 'Lao People\'S Democratic Republic', code: 'LA' },
            { nameCountry: 'Latvia', code: 'LV' },
            { nameCountry: 'Lebanon', code: 'LB' },
            { nameCountry: 'Lesotho', code: 'LS' },
            { nameCountry: 'Liberia', code: 'LR' },
            { nameCountry: 'Libyan Arab Jamahiriya', code: 'LY' },
            { nameCountry: 'Liechtenstein', code: 'LI' },
            { nameCountry: 'Lithuania', code: 'LT' },
            { nameCountry: 'Luxembourg', code: 'LU' },
            { nameCountry: 'Macao', code: 'MO' },
            { nameCountry: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
            { nameCountry: 'Madagascar', code: 'MG' },
            { nameCountry: 'Malawi', code: 'MW' },
            { nameCountry: 'Malaysia', code: 'MY' },
            { nameCountry: 'Maldives', code: 'MV' },
            { nameCountry: 'Mali', code: 'ML' },
            { nameCountry: 'Malta', code: 'MT' },
            { nameCountry: 'Marshall Islands', code: 'MH' },
            { nameCountry: 'Martinique', code: 'MQ' },
            { nameCountry: 'Mauritania', code: 'MR' },
            { nameCountry: 'Mauritius', code: 'MU' },
            { nameCountry: 'Mayotte', code: 'YT' },
            { nameCountry: 'Mexico', code: 'MX' },
            { nameCountry: 'Micronesia, Federated States of', code: 'FM' },
            { nameCountry: 'Moldova, Republic of', code: 'MD' },
            { nameCountry: 'Monaco', code: 'MC' },
            { nameCountry: 'Mongolia', code: 'MN' },
            { nameCountry: 'Montserrat', code: 'MS' },
            { nameCountry: 'Morocco', code: 'MA' },
            { nameCountry: 'Mozambique', code: 'MZ' },
            { nameCountry: 'Myanmar', code: 'MM' },
            { nameCountry: 'Namibia', code: 'NA' },
            { nameCountry: 'Nauru', code: 'NR' },
            { nameCountry: 'Nepal', code: 'NP' },
            { nameCountry: 'Netherlands', code: 'NL' },
            { nameCountry: 'Netherlands Antilles', code: 'AN' },
            { nameCountry: 'New Caledonia', code: 'NC' },
            { nameCountry: 'New Zealand', code: 'NZ' },
            { nameCountry: 'Nicaragua', code: 'NI' },
            { nameCountry: 'Niger', code: 'NE' },
            { nameCountry: 'Nigeria', code: 'NG' },
            { nameCountry: 'Niue', code: 'NU' },
            { nameCountry: 'Norfolk Island', code: 'NF' },
            { nameCountry: 'Northern Mariana Islands', code: 'MP' },
            { nameCountry: 'Norway', code: 'NO' },
            { nameCountry: 'Oman', code: 'OM' },
            { nameCountry: 'Pakistan', code: 'PK' },
            { nameCountry: 'Palau', code: 'PW' },
            { nameCountry: 'Palestinian Territory, Occupied', code: 'PS' },
            { nameCountry: 'Panama', code: 'PA' },
            { nameCountry: 'Papua New Guinea', code: 'PG' },
            { nameCountry: 'Paraguay', code: 'PY' },
            { nameCountry: 'Peru', code: 'PE' },
            { nameCountry: 'Philippines', code: 'PH' },
            { nameCountry: 'Pitcairn', code: 'PN' },
            { nameCountry: 'Poland', code: 'PL' },
            { nameCountry: 'Portugal', code: 'PT' },
            { nameCountry: 'Puerto Rico', code: 'PR' },
            { nameCountry: 'Qatar', code: 'QA' },
            { nameCountry: 'Reunion', code: 'RE' },
            { nameCountry: 'Romania', code: 'RO' },
            { nameCountry: 'Russian Federation', code: 'RU' },
            { nameCountry: 'RWANDA', code: 'RW' },
            { nameCountry: 'Saint Helena', code: 'SH' },
            { nameCountry: 'Saint Kitts and Nevis', code: 'KN' },
            { nameCountry: 'Saint Lucia', code: 'LC' },
            { nameCountry: 'Saint Pierre and Miquelon', code: 'PM' },
            { nameCountry: 'Saint Vincent and the Grenadines', code: 'VC' },
            { nameCountry: 'Samoa', code: 'WS' },
            { nameCountry: 'San Marino', code: 'SM' },
            { nameCountry: 'Sao Tome and Principe', code: 'ST' },
            { nameCountry: 'Saudi Arabia', code: 'SA' },
            { nameCountry: 'Senegal', code: 'SN' },
            { nameCountry: 'Serbia and Montenegro', code: 'CS' },
            { nameCountry: 'Seychelles', code: 'SC' },
            { nameCountry: 'Sierra Leone', code: 'SL' },
            { nameCountry: 'Singapore', code: 'SG' },
            { nameCountry: 'Slovakia', code: 'SK' },
            { nameCountry: 'Slovenia', code: 'SI' },
            { nameCountry: 'Solomon Islands', code: 'SB' },
            { nameCountry: 'Somalia', code: 'SO' },
            { nameCountry: 'South Africa', code: 'ZA' },
            { nameCountry: 'South Georgia and the South Sandwich Islands', code: 'GS' },
            { nameCountry: 'Spain', code: 'ES' },
            { nameCountry: 'Sri Lanka', code: 'LK' },
            { nameCountry: 'Sudan', code: 'SD' },
            { nameCountry: 'Suriname', code: 'SR' },
            { nameCountry: 'Svalbard and Jan Mayen', code: 'SJ' },
            { nameCountry: 'Swaziland', code: 'SZ' },
            { nameCountry: 'Sweden', code: 'SE' },
            { nameCountry: 'Switzerland', code: 'CH' },
            { nameCountry: 'Syrian Arab Republic', code: 'SY' },
            { nameCountry: 'Taiwan, Province of China', code: 'TW' },
            { nameCountry: 'Tajikistan', code: 'TJ' },
            { nameCountry: 'Tanzania, United Republic of', code: 'TZ' },
            { nameCountry: 'Thailand', code: 'TH' },
            { nameCountry: 'Timor-Leste', code: 'TL' },
            { nameCountry: 'Togo', code: 'TG' },
            { nameCountry: 'Tokelau', code: 'TK' },
            { nameCountry: 'Tonga', code: 'TO' },
            { nameCountry: 'Trinidad and Tobago', code: 'TT' },
            { nameCountry: 'Tunisia', code: 'TN' },
            { nameCountry: 'Turkey', code: 'TR' },
            { nameCountry: 'Turkmenistan', code: 'TM' },
            { nameCountry: 'Turks and Caicos Islands', code: 'TC' },
            { nameCountry: 'Tuvalu', code: 'TV' },
            { nameCountry: 'Uganda', code: 'UG' },
            { nameCountry: 'Ukraine', code: 'UA' },
            { nameCountry: 'United Arab Emirates', code: 'AE' },
            { nameCountry: 'United Kingdom', code: 'GB' },
            { nameCountry: 'United States', code: 'US' },
            { nameCountry: 'United States Minor Outlying Islands', code: 'UM' },
            { nameCountry: 'Uruguay', code: 'UY' },
            { nameCountry: 'Uzbekistan', code: 'UZ' },
            { nameCountry: 'Vanuatu', code: 'VU' },
            { nameCountry: 'Venezuela', code: 'VE' },
            { nameCountry: 'Viet Nam', code: 'VN' },
            { nameCountry: 'Virgin Islands, British', code: 'VG' },
            { nameCountry: 'Virgin Islands, U.S.', code: 'VI' },
            { nameCountry: 'Wallis and Futuna', code: 'WF' },
            { nameCountry: 'Western Sahara', code: 'EH' },
            { nameCountry: 'Yemen', code: 'YE' },
            { nameCountry: 'Zambia', code: 'ZM' },
            { nameCountry: 'Zimbabwe', code: 'ZW' }
        ];
        for (var i = 0; i < this.countryArray.length; i++) {
            this.countryArray[i].code = this.countryArray[i].code.toLowerCase();
        }
    }
    get f() { return this.formCountry.controls; }
    get fn() { return this.formCountryName.controls; }
    ngOnInit() {
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "SETTINGS", path: '/', active: true }, { label: "COUNTRIES", path: '/', active: true }];
        });
        this.Country = this.CountryService.set().subscribe(res => {
            this.country = res;
        });
        this.CountryService.getAll();
        //Form validators 
        this.formCountry = this.formBuilder.group({
            code: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.formCountry.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        //Form validators 
        this.formCountryName = this.formBuilder.group({
            countryName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            langId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.formCountryName.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        this.formCountryName.addControl('countryId', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
    }
    getLang() {
        this.lang.getAllLanguageAndClassfier().subscribe(res => {
            this.Language = res;
        });
    }
    getCodeLang(id) {
        if (this.Language.find(x => x.id == id) == undefined) {
            return this.trans.countryName.thislanguageitisstop;
        }
        else {
            return this.Language.find(x => x.id == id).langCode;
        }
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
        this.Country.unsubscribe();
    }
    status(status) {
        if (status == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    ChangeStatus(event, id) {
        if (event) {
            return this.CountryService.deactivate_or_activate(id, 1);
        }
        else {
            return this.CountryService.deactivate_or_activate(id, 0);
        }
    }
    onChangeStatus($event, id) {
        this.ChangeStatus($event, id).subscribe(res => {
            if ($event) {
                this.toastr.success("Country has been activated", "successfull", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.warning("Country has been disabled", "warning", {
                    timeOut: 3000
                });
            }
        }, err => {
            if (err = 2010) {
                this.toastr.warning(this.trans.country.YouMustHaveAtLeastOneName, "warning", {
                    timeOut: 3000
                });
                this.CountryService.getAll();
            }
            else {
                this.toastr.error(this.trans.country.UnknownError, "error", {
                    timeOut: 3000
                });
            }
        });
    }
    putValueForm(id) {
        this.formCountry.get('id').setValue(this.country.find(x => x.id == id).id);
        this.formCountry.get('code').setValue(this.country.find(x => x.id == id).code);
    }
    disableForm() {
        this.formCountry.disable({ onlySelf: true });
    }
    enableForm() {
        this.formCountry.enable({ onlySelf: true });
    }
    add(content) {
        this.enableForm();
        this.formCountry.reset();
        this.typeForm = 0;
        this.titleForm = "ADD COUNTRY";
        this.modalService.open(content, { backdrop: 'static' });
    }
    edit(id) {
        this.getLang();
        this.countryId = id;
        this.getAllName();
    }
    delete(content, id) {
        this.formCountry.reset();
        this.putValueForm(id);
        this.disableForm();
        this.typeForm = 2;
        this.titleForm = this.trans.country.TitleForm_delete;
        this.modalService.open(content, { backdrop: 'static' });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.CountryService.create(param);
        }
        else {
            return this.CountryService.delete(this.formCountry.get('id').value);
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.formCountry.invalid) {
            return;
        }
        this.loading = true;
        this.submit(this.formCountry.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.country.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.country.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.CountryService.getAll();
            this.loading = false;
            this.submitted = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.country.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.country.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.country.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChange(event) {
        // this.formCountry.get('code').setValue(this.formCountry.get('code').value.toLowerCase())
    }
    //Name
    putValueFormName(id) {
        this.formCountryName.get('id').setValue(this.countryName.find(x => x.id == id).id);
        this.formCountryName.get('countryName').setValue(this.countryName.find(x => x.id == id).countryName);
        this.formCountryName.get('countryId').setValue(this.countryName.find(x => x.id == id).countryId);
        this.formCountryName.get('langId').setValue(this.countryName.find(x => x.id == id).langId);
    }
    disableFormName() {
        this.formCountryName.disable({ onlySelf: true });
    }
    enableFormName() {
        this.formCountryName.enable({ onlySelf: true });
    }
    addName(content) {
        if (this.countryId != -1) {
            this.enableFormName();
            this.getLang();
            this.formCountryName.reset();
            this.typeFormName = 0;
            this.titleFormName = "ADD LANGUAGE";
            this.modalService.open(content, { backdrop: 'static' });
            this.formCountryName.get('countryId').setValue(this.countryId);
        }
    }
    getAllName() {
        this.CountryService.getAllName(this.countryId).subscribe(res => {
            this.countryName = res;
        });
    }
    deleteName(content, id) {
        this.formCountryName.reset();
        this.putValueFormName(id);
        this.disableFormName();
        this.typeFormName = 2;
        this.titleFormName = this.trans.country.TitleForm_delete;
        this.modalService.open(content, { backdrop: 'static' });
    }
    submitName(param) {
        if (this.typeFormName == 0) {
            return this.CountryService.createName(param);
        }
        else {
            return this.CountryService.deleteName(this.formCountryName.get('id').value);
        }
    }
    onSubmitName() {
        this.submittedName = true;
        if (this.formCountryName.invalid) {
            return;
        }
        this.loadingName = true;
        this.submitName(this.formCountryName.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.countryName.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.countryName.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.getAllName();
            this.loadingName = false;
            this.submittedName = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.country.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.country.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.country.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChangeName(event) {
        this.formCountryName.get('countryId').setValue(this.formCountry.get('countryId').value.toUpperCase());
    }
};
CountryComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"] },
    { type: _core_services_country_country_service__WEBPACK_IMPORTED_MODULE_2__["CountryService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
    { type: src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"] }
];
CountryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-country',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./country.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/country/country.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./country.component.scss */ "./src/app/portals/settings/country/country.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"],
        _core_services_country_country_service__WEBPACK_IMPORTED_MODULE_2__["CountryService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
        src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"]])
], CountryComponent);



/***/ }),

/***/ "./src/app/portals/settings/currency/currency.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/portals/settings/currency/currency.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvY3VycmVuY3kvY3VycmVuY3kuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/portals/settings/currency/currency.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/portals/settings/currency/currency.component.ts ***!
  \*****************************************************************/
/*! exports provided: CurrencyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyComponent", function() { return CurrencyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/currency/currency.service */ "./src/app/core/services/currency/currency.service.ts");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/language/language.service */ "./src/app/core/services/language/language.service.ts");








let CurrencyComponent = class CurrencyComponent {
    constructor(transs, CurrencyService, formBuilder, modalService, toastr, lang) {
        this.transs = transs;
        this.CurrencyService = CurrencyService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.lang = lang;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "ADD CURRENCY";
        this.typeForm = 0;
        this.currencyId = -1;
        this.submittedName = false;
        this.errorName = '';
        this.loadingName = false;
        this.titleFormName = "Add currency";
        this.typeFormName = 0;
        this.listArray = [{ "symbol": "$", "name": "US Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "USD", "name_plural": "US dollars" }, { "symbol": "CA$", "name": "Canadian Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "CAD", "name_plural": "Canadian dollars" }, { "symbol": "€", "name": "Euro", "symbol_native": "€", "decimal_digits": 2, "rounding": 0, "code": "EUR", "name_plural": "euros" }, { "symbol": "AED", "name": "United Arab Emirates Dirham", "symbol_native": "د.إ.‏", "decimal_digits": 2, "rounding": 0, "code": "AED", "name_plural": "UAE dirhams" }, { "symbol": "Af", "name": "Afghan Afghani", "symbol_native": "؋", "decimal_digits": 0, "rounding": 0, "code": "AFN", "name_plural": "Afghan Afghanis" }, { "symbol": "ALL", "name": "Albanian Lek", "symbol_native": "Lek", "decimal_digits": 0, "rounding": 0, "code": "ALL", "name_plural": "Albanian lekë" }, { "symbol": "AMD", "name": "Armenian Dram", "symbol_native": "դր.", "decimal_digits": 0, "rounding": 0, "code": "AMD", "name_plural": "Armenian drams" }, { "symbol": "AR$", "name": "Argentine Peso", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "ARS", "name_plural": "Argentine pesos" }, { "symbol": "AU$", "name": "Australian Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "AUD", "name_plural": "Australian dollars" }, { "symbol": "man.", "name": "Azerbaijani Manat", "symbol_native": "ман.", "decimal_digits": 2, "rounding": 0, "code": "AZN", "name_plural": "Azerbaijani manats" }, { "symbol": "KM", "name": "Bosnia-Herzegovina Convertible Mark", "symbol_native": "KM", "decimal_digits": 2, "rounding": 0, "code": "BAM", "name_plural": "Bosnia-Herzegovina convertible marks" }, { "symbol": "Tk", "name": "Bangladeshi Taka", "symbol_native": "৳", "decimal_digits": 2, "rounding": 0, "code": "BDT", "name_plural": "Bangladeshi takas" }, { "symbol": "BGN", "name": "Bulgarian Lev", "symbol_native": "лв.", "decimal_digits": 2, "rounding": 0, "code": "BGN", "name_plural": "Bulgarian leva" }, { "symbol": "BD", "name": "Bahraini Dinar", "symbol_native": "د.ب.‏", "decimal_digits": 3, "rounding": 0, "code": "BHD", "name_plural": "Bahraini dinars" }, { "symbol": "FBu", "name": "Burundian Franc", "symbol_native": "FBu", "decimal_digits": 0, "rounding": 0, "code": "BIF", "name_plural": "Burundian francs" }, { "symbol": "BN$", "name": "Brunei Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "BND", "name_plural": "Brunei dollars" }, { "symbol": "Bs", "name": "Bolivian Boliviano", "symbol_native": "Bs", "decimal_digits": 2, "rounding": 0, "code": "BOB", "name_plural": "Bolivian bolivianos" }, { "symbol": "R$", "name": "Brazilian Real", "symbol_native": "R$", "decimal_digits": 2, "rounding": 0, "code": "BRL", "name_plural": "Brazilian reals" }, { "symbol": "BWP", "name": "Botswanan Pula", "symbol_native": "P", "decimal_digits": 2, "rounding": 0, "code": "BWP", "name_plural": "Botswanan pulas" }, { "symbol": "Br", "name": "Belarusian Ruble", "symbol_native": "руб.", "decimal_digits": 2, "rounding": 0, "code": "BYN", "name_plural": "Belarusian rubles" }, { "symbol": "BZ$", "name": "Belize Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "BZD", "name_plural": "Belize dollars" }, { "symbol": "CDF", "name": "Congolese Franc", "symbol_native": "FrCD", "decimal_digits": 2, "rounding": 0, "code": "CDF", "name_plural": "Congolese francs" }, { "symbol": "CHF", "name": "Swiss Franc", "symbol_native": "CHF", "decimal_digits": 2, "rounding": 0.05, "code": "CHF", "name_plural": "Swiss francs" }, { "symbol": "CL$", "name": "Chilean Peso", "symbol_native": "$", "decimal_digits": 0, "rounding": 0, "code": "CLP", "name_plural": "Chilean pesos" }, { "symbol": "CN¥", "name": "Chinese Yuan", "symbol_native": "CN¥", "decimal_digits": 2, "rounding": 0, "code": "CNY", "name_plural": "Chinese yuan" }, { "symbol": "CO$", "name": "Colombian Peso", "symbol_native": "$", "decimal_digits": 0, "rounding": 0, "code": "COP", "name_plural": "Colombian pesos" }, { "symbol": "₡", "name": "Costa Rican Colón", "symbol_native": "₡", "decimal_digits": 0, "rounding": 0, "code": "CRC", "name_plural": "Costa Rican colóns" }, { "symbol": "CV$", "name": "Cape Verdean Escudo", "symbol_native": "CV$", "decimal_digits": 2, "rounding": 0, "code": "CVE", "name_plural": "Cape Verdean escudos" }, { "symbol": "Kč", "name": "Czech Republic Koruna", "symbol_native": "Kč", "decimal_digits": 2, "rounding": 0, "code": "CZK", "name_plural": "Czech Republic korunas" }, { "symbol": "Fdj", "name": "Djiboutian Franc", "symbol_native": "Fdj", "decimal_digits": 0, "rounding": 0, "code": "DJF", "name_plural": "Djiboutian francs" }, { "symbol": "Dkr", "name": "Danish Krone", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "DKK", "name_plural": "Danish kroner" }, { "symbol": "RD$", "name": "Dominican Peso", "symbol_native": "RD$", "decimal_digits": 2, "rounding": 0, "code": "DOP", "name_plural": "Dominican pesos" }, { "symbol": "DA", "name": "Algerian Dinar", "symbol_native": "د.ج.‏", "decimal_digits": 2, "rounding": 0, "code": "DZD", "name_plural": "Algerian dinars" }, { "symbol": "Ekr", "name": "Estonian Kroon", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "EEK", "name_plural": "Estonian kroons" }, { "symbol": "EGP", "name": "Egyptian Pound", "symbol_native": "ج.م.‏", "decimal_digits": 2, "rounding": 0, "code": "EGP", "name_plural": "Egyptian pounds" }, { "symbol": "Nfk", "name": "Eritrean Nakfa", "symbol_native": "Nfk", "decimal_digits": 2, "rounding": 0, "code": "ERN", "name_plural": "Eritrean nakfas" }, { "symbol": "Br", "name": "Ethiopian Birr", "symbol_native": "Br", "decimal_digits": 2, "rounding": 0, "code": "ETB", "name_plural": "Ethiopian birrs" }, { "symbol": "£", "name": "British Pound Sterling", "symbol_native": "£", "decimal_digits": 2, "rounding": 0, "code": "GBP", "name_plural": "British pounds sterling" }, { "symbol": "GEL", "name": "Georgian Lari", "symbol_native": "GEL", "decimal_digits": 2, "rounding": 0, "code": "GEL", "name_plural": "Georgian laris" }, { "symbol": "GH₵", "name": "Ghanaian Cedi", "symbol_native": "GH₵", "decimal_digits": 2, "rounding": 0, "code": "GHS", "name_plural": "Ghanaian cedis" }, { "symbol": "FG", "name": "Guinean Franc", "symbol_native": "FG", "decimal_digits": 0, "rounding": 0, "code": "GNF", "name_plural": "Guinean francs" }, { "symbol": "GTQ", "name": "Guatemalan Quetzal", "symbol_native": "Q", "decimal_digits": 2, "rounding": 0, "code": "GTQ", "name_plural": "Guatemalan quetzals" }, { "symbol": "HK$", "name": "Hong Kong Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "HKD", "name_plural": "Hong Kong dollars" }, { "symbol": "HNL", "name": "Honduran Lempira", "symbol_native": "L", "decimal_digits": 2, "rounding": 0, "code": "HNL", "name_plural": "Honduran lempiras" }, { "symbol": "kn", "name": "Croatian Kuna", "symbol_native": "kn", "decimal_digits": 2, "rounding": 0, "code": "HRK", "name_plural": "Croatian kunas" }, { "symbol": "Ft", "name": "Hungarian Forint", "symbol_native": "Ft", "decimal_digits": 0, "rounding": 0, "code": "HUF", "name_plural": "Hungarian forints" }, { "symbol": "Rp", "name": "Indonesian Rupiah", "symbol_native": "Rp", "decimal_digits": 0, "rounding": 0, "code": "IDR", "name_plural": "Indonesian rupiahs" }, { "symbol": "₪", "name": "Israeli New Sheqel", "symbol_native": "₪", "decimal_digits": 2, "rounding": 0, "code": "ILS", "name_plural": "Israeli new sheqels" }, { "symbol": "Rs", "name": "Indian Rupee", "symbol_native": "টকা", "decimal_digits": 2, "rounding": 0, "code": "INR", "name_plural": "Indian rupees" }, { "symbol": "IQD", "name": "Iraqi Dinar", "symbol_native": "د.ع.‏", "decimal_digits": 0, "rounding": 0, "code": "IQD", "name_plural": "Iraqi dinars" }, { "symbol": "IRR", "name": "Iranian Rial", "symbol_native": "﷼", "decimal_digits": 0, "rounding": 0, "code": "IRR", "name_plural": "Iranian rials" }, { "symbol": "Ikr", "name": "Icelandic Króna", "symbol_native": "kr", "decimal_digits": 0, "rounding": 0, "code": "ISK", "name_plural": "Icelandic krónur" }, { "symbol": "J$", "name": "Jamaican Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "JMD", "name_plural": "Jamaican dollars" }, { "symbol": "JD", "name": "Jordanian Dinar", "symbol_native": "د.أ.‏", "decimal_digits": 3, "rounding": 0, "code": "JOD", "name_plural": "Jordanian dinars" }, { "symbol": "¥", "name": "Japanese Yen", "symbol_native": "￥", "decimal_digits": 0, "rounding": 0, "code": "JPY", "name_plural": "Japanese yen" }, { "symbol": "Ksh", "name": "Kenyan Shilling", "symbol_native": "Ksh", "decimal_digits": 2, "rounding": 0, "code": "KES", "name_plural": "Kenyan shillings" }, { "symbol": "KHR", "name": "Cambodian Riel", "symbol_native": "៛", "decimal_digits": 2, "rounding": 0, "code": "KHR", "name_plural": "Cambodian riels" }, { "symbol": "CF", "name": "Comorian Franc", "symbol_native": "FC", "decimal_digits": 0, "rounding": 0, "code": "KMF", "name_plural": "Comorian francs" }, { "symbol": "₩", "name": "South Korean Won", "symbol_native": "₩", "decimal_digits": 0, "rounding": 0, "code": "KRW", "name_plural": "South Korean won" }, { "symbol": "KD", "name": "Kuwaiti Dinar", "symbol_native": "د.ك.‏", "decimal_digits": 3, "rounding": 0, "code": "KWD", "name_plural": "Kuwaiti dinars" }, { "symbol": "KZT", "name": "Kazakhstani Tenge", "symbol_native": "тңг.", "decimal_digits": 2, "rounding": 0, "code": "KZT", "name_plural": "Kazakhstani tenges" }, { "symbol": "LB£", "name": "Lebanese Pound", "symbol_native": "ل.ل.‏", "decimal_digits": 0, "rounding": 0, "code": "LBP", "name_plural": "Lebanese pounds" }, { "symbol": "SLRs", "name": "Sri Lankan Rupee", "symbol_native": "SL Re", "decimal_digits": 2, "rounding": 0, "code": "LKR", "name_plural": "Sri Lankan rupees" }, { "symbol": "Lt", "name": "Lithuanian Litas", "symbol_native": "Lt", "decimal_digits": 2, "rounding": 0, "code": "LTL", "name_plural": "Lithuanian litai" }, { "symbol": "Ls", "name": "Latvian Lats", "symbol_native": "Ls", "decimal_digits": 2, "rounding": 0, "code": "LVL", "name_plural": "Latvian lati" }, { "symbol": "LD", "name": "Libyan Dinar", "symbol_native": "د.ل.‏", "decimal_digits": 3, "rounding": 0, "code": "LYD", "name_plural": "Libyan dinars" }, { "symbol": "MAD", "name": "Moroccan Dirham", "symbol_native": "د.م.‏", "decimal_digits": 2, "rounding": 0, "code": "MAD", "name_plural": "Moroccan dirhams" }, { "symbol": "MDL", "name": "Moldovan Leu", "symbol_native": "MDL", "decimal_digits": 2, "rounding": 0, "code": "MDL", "name_plural": "Moldovan lei" }, { "symbol": "MGA", "name": "Malagasy Ariary", "symbol_native": "MGA", "decimal_digits": 0, "rounding": 0, "code": "MGA", "name_plural": "Malagasy Ariaries" }, { "symbol": "MKD", "name": "Macedonian Denar", "symbol_native": "MKD", "decimal_digits": 2, "rounding": 0, "code": "MKD", "name_plural": "Macedonian denari" }, { "symbol": "MMK", "name": "Myanma Kyat", "symbol_native": "K", "decimal_digits": 0, "rounding": 0, "code": "MMK", "name_plural": "Myanma kyats" },
            { "symbol": "MOP$", "name": "Macanese Pataca", "symbol_native": "MOP$", "decimal_digits": 2, "rounding": 0, "code": "MOP", "name_plural": "Macanese patacas" }, { "symbol": "MURs", "name": "Mauritian Rupee", "symbol_native": "MURs", "decimal_digits": 0, "rounding": 0, "code": "MUR", "name_plural": "Mauritian rupees" }, { "symbol": "MX$", "name": "Mexican Peso", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "MXN", "name_plural": "Mexican pesos" }, { "symbol": "RM", "name": "Malaysian Ringgit", "symbol_native": "RM", "decimal_digits": 2, "rounding": 0, "code": "MYR", "name_plural": "Malaysian ringgits" }, { "symbol": "MTn", "name": "Mozambican Metical", "symbol_native": "MTn", "decimal_digits": 2, "rounding": 0, "code": "MZN", "name_plural": "Mozambican meticals" }, { "symbol": "N$", "name": "Namibian Dollar", "symbol_native": "N$", "decimal_digits": 2, "rounding": 0, "code": "NAD", "name_plural": "Namibian dollars" }, { "symbol": "₦", "name": "Nigerian Naira", "symbol_native": "₦", "decimal_digits": 2, "rounding": 0, "code": "NGN", "name_plural": "Nigerian nairas" }, { "symbol": "C$", "name": "Nicaraguan Córdoba", "symbol_native": "C$", "decimal_digits": 2, "rounding": 0, "code": "NIO", "name_plural": "Nicaraguan córdobas" }, { "symbol": "Nkr", "name": "Norwegian Krone", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "NOK", "name_plural": "Norwegian kroner" }, { "symbol": "NPRs", "name": "Nepalese Rupee", "symbol_native": "नेरू", "decimal_digits": 2, "rounding": 0, "code": "NPR", "name_plural": "Nepalese rupees" }, { "symbol": "NZ$", "name": "New Zealand Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "NZD", "name_plural": "New Zealand dollars" }, { "symbol": "OMR", "name": "Omani Rial", "symbol_native": "ر.ع.‏", "decimal_digits": 3, "rounding": 0, "code": "OMR", "name_plural": "Omani rials" }, { "symbol": "B/.", "name": "Panamanian Balboa", "symbol_native": "B/.", "decimal_digits": 2, "rounding": 0, "code": "PAB", "name_plural": "Panamanian balboas" }, { "symbol": "S/.", "name": "Peruvian Nuevo Sol", "symbol_native": "S/.", "decimal_digits": 2, "rounding": 0, "code": "PEN", "name_plural": "Peruvian nuevos soles" }, { "symbol": "₱", "name": "Philippine Peso", "symbol_native": "₱", "decimal_digits": 2, "rounding": 0, "code": "PHP", "name_plural": "Philippine pesos" }, { "symbol": "PKRs", "name": "Pakistani Rupee", "symbol_native": "₨", "decimal_digits": 0, "rounding": 0, "code": "PKR", "name_plural": "Pakistani rupees" }, { "symbol": "zł", "name": "Polish Zloty", "symbol_native": "zł", "decimal_digits": 2, "rounding": 0, "code": "PLN", "name_plural": "Polish zlotys" }, { "symbol": "₲", "name": "Paraguayan Guarani", "symbol_native": "₲", "decimal_digits": 0, "rounding": 0, "code": "PYG", "name_plural": "Paraguayan guaranis" }, { "symbol": "QR", "name": "Qatari Rial", "symbol_native": "ر.ق.‏", "decimal_digits": 2, "rounding": 0, "code": "QAR", "name_plural": "Qatari rials" }, { "symbol": "RON", "name": "Romanian Leu", "symbol_native": "RON", "decimal_digits": 2, "rounding": 0, "code": "RON", "name_plural": "Romanian lei" }, { "symbol": "din.", "name": "Serbian Dinar", "symbol_native": "дин.", "decimal_digits": 0, "rounding": 0, "code": "RSD", "name_plural": "Serbian dinars" }, { "symbol": "RUB", "name": "Russian Ruble", "symbol_native": "₽.", "decimal_digits": 2, "rounding": 0, "code": "RUB", "name_plural": "Russian rubles" }, { "symbol": "RWF", "name": "Rwandan Franc", "symbol_native": "FR", "decimal_digits": 0, "rounding": 0, "code": "RWF", "name_plural": "Rwandan francs" }, { "symbol": "SR", "name": "Saudi Riyal", "symbol_native": "ر.س.‏", "decimal_digits": 2, "rounding": 0, "code": "SAR", "name_plural": "Saudi riyals" }, { "symbol": "SDG", "name": "Sudanese Pound", "symbol_native": "SDG", "decimal_digits": 2, "rounding": 0, "code": "SDG", "name_plural": "Sudanese pounds" }, { "symbol": "Skr", "name": "Swedish Krona", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "SEK", "name_plural": "Swedish kronor" }, { "symbol": "S$", "name": "Singapore Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "SGD", "name_plural": "Singapore dollars" }, { "symbol": "Ssh", "name": "Somali Shilling", "symbol_native": "Ssh", "decimal_digits": 0, "rounding": 0, "code": "SOS", "name_plural": "Somali shillings" }, { "symbol": "SY£", "name": "Syrian Pound", "symbol_native": "ل.س.‏", "decimal_digits": 0, "rounding": 0, "code": "SYP", "name_plural": "Syrian pounds" }, { "symbol": "฿", "name": "Thai Baht", "symbol_native": "฿", "decimal_digits": 2, "rounding": 0, "code": "THB", "name_plural": "Thai baht" }, { "symbol": "DT", "name": "Tunisian Dinar", "symbol_native": "د.ت.‏", "decimal_digits": 3, "rounding": 0, "code": "TND", "name_plural": "Tunisian dinars" }, { "symbol": "T$", "name": "Tongan Paʻanga", "symbol_native": "T$", "decimal_digits": 2, "rounding": 0, "code": "TOP", "name_plural": "Tongan paʻanga" }, { "symbol": "TL", "name": "Turkish Lira", "symbol_native": "TL", "decimal_digits": 2, "rounding": 0, "code": "TRY", "name_plural": "Turkish Lira" }, { "symbol": "TT$", "name": "Trinidad and Tobago Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "TTD", "name_plural": "Trinidad and Tobago dollars" }, { "symbol": "NT$", "name": "New Taiwan Dollar", "symbol_native": "NT$", "decimal_digits": 2, "rounding": 0, "code": "TWD", "name_plural": "New Taiwan dollars" }, { "symbol": "TSh", "name": "Tanzanian Shilling", "symbol_native": "TSh", "decimal_digits": 0, "rounding": 0, "code": "TZS", "name_plural": "Tanzanian shillings" }, { "symbol": "₴", "name": "Ukrainian Hryvnia", "symbol_native": "₴", "decimal_digits": 2, "rounding": 0, "code": "UAH", "name_plural": "Ukrainian hryvnias" }, { "symbol": "USh", "name": "Ugandan Shilling", "symbol_native": "USh", "decimal_digits": 0, "rounding": 0, "code": "UGX", "name_plural": "Ugandan shillings" }, { "symbol": "$U", "name": "Uruguayan Peso", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "UYU", "name_plural": "Uruguayan pesos" }, { "symbol": "UZS", "name": "Uzbekistan Som", "symbol_native": "UZS", "decimal_digits": 0, "rounding": 0, "code": "UZS", "name_plural": "Uzbekistan som" }, { "symbol": "Bs.F.", "name": "Venezuelan Bolívar", "symbol_native": "Bs.F.", "decimal_digits": 2, "rounding": 0, "code": "VEF", "name_plural": "Venezuelan bolívars" }, { "symbol": "₫", "name": "Vietnamese Dong", "symbol_native": "₫", "decimal_digits": 0, "rounding": 0, "code": "VND", "name_plural": "Vietnamese dong" }, { "symbol": "FCFA", "name": "CFA Franc BEAC", "symbol_native": "FCFA", "decimal_digits": 0, "rounding": 0, "code": "XAF", "name_plural": "CFA francs BEAC" }, { "symbol": "CFA", "name": "CFA Franc BCEAO", "symbol_native": "CFA", "decimal_digits": 0, "rounding": 0, "code": "XOF", "name_plural": "CFA francs BCEAO" }, { "symbol": "YR", "name": "Yemeni Rial", "symbol_native": "ر.ي.‏", "decimal_digits": 0, "rounding": 0, "code": "YER", "name_plural": "Yemeni rials" }, { "symbol": "R", "name": "South African Rand", "symbol_native": "R", "decimal_digits": 2, "rounding": 0, "code": "ZAR", "name_plural": "South African rand" }, { "symbol": "ZK", "name": "Zambian Kwacha", "symbol_native": "ZK", "decimal_digits": 0, "rounding": 0, "code": "ZMK", "name_plural": "Zambian kwachas" }, { "symbol": "ZWL$", "name": "Zimbabwean Dollar", "symbol_native": "ZWL$", "decimal_digits": 0, "rounding": 0, "code": "ZWL", "name_plural": "Zimbabwean Dollar" }];
    }
    get f() { return this.formCurrency.controls; }
    get fn() { return this.formCurrencyName.controls; }
    ngOnInit() {
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "SETTINGS", path: '/', active: true }, { label: "CURRENCIES", path: '/', active: true }];
        });
        this.Currency = this.CurrencyService.set().subscribe(res => {
            this.currency = res;
        });
        this.CurrencyService.getAll();
        //Form validators 
        this.formCurrency = this.formBuilder.group({
            currencyCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            symbol: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.formCurrency.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        //Form validators 
        this.formCurrencyName = this.formBuilder.group({
            currencyName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            langId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.formCurrencyName.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        this.formCurrencyName.addControl('currencyId', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
    }
    changeCurrunce($event) {
        this.formCurrency.get("symbol").setValue(this.listArray.find(x => x.code == $event).symbol);
    }
    getLang() {
        this.lang.getAllLanguageAndClassfier().subscribe(res => {
            this.Language = res;
        });
    }
    getCodeLang(id) {
        return this.Language.find(x => x.id == id).langCode;
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
        this.Currency.unsubscribe();
    }
    status(status) {
        if (status == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    ChangeStatus(event, id) {
        if (event) {
            return this.CurrencyService.deactivate_or_activate(id, 1);
        }
        else {
            return this.CurrencyService.deactivate_or_activate(id, 0);
        }
    }
    updateCurrency() {
        this.CurrencyService.updateCurrency().subscribe(res => {
            this.CurrencyService.getAll();
        });
    }
    onChangeStatus($event, id) {
        this.ChangeStatus($event, id).subscribe(res => {
            if ($event) {
                this.toastr.success("The currency has been activated", "successfull", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.warning("The currency has been deactivated", "warning", {
                    timeOut: 3000
                });
            }
        }, err => {
            if (err = 2010) {
                this.toastr.warning(this.trans.currency.YouMustHaveAtLeastOneName, "warning", {
                    timeOut: 3000
                });
                this.CurrencyService.getAll();
            }
            else {
                this.toastr.error(this.trans.currency.UnknownError, "error", {
                    timeOut: 3000
                });
            }
        });
    }
    putValueForm(id) {
        this.formCurrency.get('id').setValue(this.currency.find(x => x.id == id).id);
        this.formCurrency.get('currencyCode').setValue(this.currency.find(x => x.id == id).currencyCode);
        this.formCurrency.get('symbol').setValue(this.currency.find(x => x.id == id).symbol);
    }
    disableForm() {
        this.formCurrency.disable({ onlySelf: true });
    }
    enableForm() {
        this.formCurrency.enable({ onlySelf: true });
    }
    add(content) {
        this.enableForm();
        this.formCurrency.reset();
        this.typeForm = 0;
        this.titleForm = "ADD CURRENCY";
        this.modalService.open(content, { backdrop: 'static' });
    }
    edit(id) {
        this.getLang();
        this.currencyId = id;
        this.getAllName();
    }
    delete(content, id) {
        this.formCurrency.reset();
        this.putValueForm(id);
        this.disableForm();
        this.typeForm = 2;
        this.titleForm = "DELETE CURRENCY";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.CurrencyService.create(param);
        }
        else {
            return this.CurrencyService.delete(this.formCurrency.get('id').value);
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.formCurrency.invalid) {
            return;
        }
        this.loading = true;
        this.submit(this.formCurrency.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.currency.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.currency.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.CurrencyService.getAll();
            this.loading = false;
            this.submitted = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.currency.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.currency.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.currency.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChange(event) {
        this.formCurrency.get('currencyCode').setValue(this.formCurrency.get('currencyCode').value.toUpperCase());
    }
    //Name
    putValueFormName(id) {
        this.formCurrencyName.get('id').setValue(this.currencyName.find(x => x.id == id).id);
        this.formCurrencyName.get('currencyName').setValue(this.currencyName.find(x => x.id == id).currencyName);
        this.formCurrencyName.get('currencyId').setValue(this.currencyName.find(x => x.id == id).currencyId);
        this.formCurrencyName.get('langId').setValue(this.currencyName.find(x => x.id == id).langId);
    }
    disableFormName() {
        this.formCurrencyName.disable({ onlySelf: true });
    }
    enableFormName() {
        this.formCurrencyName.enable({ onlySelf: true });
    }
    addName(content) {
        if (this.currencyId != -1) {
            this.enableFormName();
            this.getLang();
            this.formCurrencyName.reset();
            this.typeFormName = 0;
            this.titleFormName = "ADD LANGUAGE";
            this.modalService.open(content, { backdrop: 'static' });
            this.formCurrencyName.get('currencyId').setValue(this.currencyId);
        }
    }
    getAllName() {
        this.CurrencyService.getAllName(this.currencyId).subscribe(res => {
            this.currencyName = res;
        });
    }
    deleteName(content, id) {
        this.formCurrencyName.reset();
        this.putValueFormName(id);
        this.disableFormName();
        this.typeFormName = 2;
        this.titleFormName = "DELETE LANGUAGE";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submitName(param) {
        if (this.typeFormName == 0) {
            return this.CurrencyService.createName(param);
        }
        else {
            return this.CurrencyService.deleteName(this.formCurrencyName.get('id').value);
        }
    }
    onSubmitName() {
        this.submittedName = true;
        if (this.formCurrencyName.invalid) {
            return;
        }
        this.loadingName = true;
        this.submitName(this.formCurrencyName.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.currencyName.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.currencyName.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.getAllName();
            this.loadingName = false;
            this.submittedName = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.currency.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.currency.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.currency.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChangeName(event) {
        this.formCurrencyName.get('currencyCode').setValue(this.formCurrency.get('currencyCode').value.toUpperCase());
    }
};
CurrencyComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"] },
    { type: _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_2__["CurrencyService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
    { type: src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"] }
];
CurrencyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-currency',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./currency.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/currency/currency.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./currency.component.scss */ "./src/app/portals/settings/currency/currency.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"],
        _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_2__["CurrencyService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
        src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"]])
], CurrencyComponent);



/***/ }),

/***/ "./src/app/portals/settings/email-model/email-model.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/portals/settings/email-model/email-model.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvZW1haWwtbW9kZWwvZW1haWwtbW9kZWwuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/portals/settings/email-model/email-model.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/portals/settings/email-model/email-model.component.ts ***!
  \***********************************************************************/
/*! exports provided: EmailModelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailModelComponent", function() { return EmailModelComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_email_model_email_model_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/email_model/email-model.service */ "./src/app/core/services/email_model/email-model.service.ts");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/language/language.service */ "./src/app/core/services/language/language.service.ts");








let EmailModelComponent = class EmailModelComponent {
    constructor(transs, EmailModelService, formBuilder, modalService, toastr, lang) {
        this.transs = transs;
        this.EmailModelService = EmailModelService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.lang = lang;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "Add email_model";
        this.typeForm = 0;
        this.email_modelId = -1;
        this.submittedContent = false;
        this.errorContent = '';
        this.loadingContent = false;
        this.titleFormContent = "Add email_modelContent";
        this.typeFormContent = 0;
        this.ngEditContent = true;
    }
    get f() { return this.formEmail_model.controls; }
    get fn() { return this.formcontent_email_model.controls; }
    ngOnInit() {
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "SETTINGS", path: '/', active: true }, { label: "EMAIL MODEL", path: '/', active: true }];
        });
        this.Email_model = this.EmailModelService.getll_email_model().subscribe(res => {
            this.email_model = res;
        });
        this.EmailModelService.getAll();
        //Form validators 
        this.formEmail_model = this.formBuilder.group({
            nameModel: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
        this.formEmail_model.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        //Form validators 
        this.formcontent_email_model = this.formBuilder.group({
            langId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            subject: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
        this.formcontent_email_model.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        this.formcontent_email_model.addControl('email_model_id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        this.formcontent_email_model.addControl('content_model', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
    }
    editImage($event, type) {
    }
    getEditor(event) {
        this.editor = event;
    }
    getLang() {
        this.lang.getAllLanguageAndClassfier().subscribe(res => {
            this.Language = res;
        });
    }
    getCodeLang(id) {
        if (this.Language.find(x => x.id == id) == undefined) {
            return this.trans.contentEmailModel.thislanguageitisstop;
        }
        else {
            return this.Language.find(x => x.id == id).langCode;
        }
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
        this.Email_model.unsubscribe();
    }
    status(status) {
        if (status == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    ChangeStatus(event, id) {
        if (event) {
            return this.EmailModelService.deactivate_or_activate(id, 1);
        }
        else {
            return this.EmailModelService.deactivate_or_activate(id, 0);
        }
    }
    onChangeStatus($event, id) {
        this.ChangeStatus($event, id).subscribe(res => {
            if ($event) {
                this.toastr.success(this.trans.emailModel.TheEmail_modelHasBeenActivated, "successfull", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.warning(this.trans.emailModel.Email_modelHasBeenDeactivated, "warning", {
                    timeOut: 3000
                });
            }
        }, err => {
            if (err = 2010) {
                this.toastr.warning(this.trans.emailModel.YouMustHaveAtLeastOneName, "warning", {
                    timeOut: 3000
                });
                this.EmailModelService.getAll();
            }
            else {
                this.toastr.error(this.trans.emailModel.UnknownError, "error", {
                    timeOut: 3000
                });
            }
        });
    }
    putValueForm(id) {
        this.formEmail_model.get('id').setValue(this.email_model.find(x => x.id == id).id);
        this.formEmail_model.get('nameModel').setValue(this.email_model.find(x => x.id == id).nameModel);
    }
    disableForm() {
        this.formEmail_model.disable({ onlySelf: true });
    }
    enableForm() {
        this.formEmail_model.enable({ onlySelf: true });
    }
    add(content) {
        this.enableForm();
        this.formEmail_model.reset();
        this.typeForm = 0;
        this.titleForm = "ADD EMAIL MODEL";
        this.modalService.open(content, { backdrop: 'static' });
    }
    edit(id) {
        this.getLang();
        this.email_modelId = id;
        this.titleForm = "EDIT EMAIL MODEL";
        this.getAllContent();
    }
    delete(content, id) {
        this.formEmail_model.reset();
        this.putValueForm(id);
        this.disableForm();
        this.typeForm = 2;
        this.titleForm = "DELETE EMAIL MODEL";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.EmailModelService.create(param);
        }
        else {
            return this.EmailModelService.delete(this.formEmail_model.value);
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.formEmail_model.invalid) {
            return;
        }
        this.loading = true;
        this.submit(this.formEmail_model.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.emailModel.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.emailModel.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.EmailModelService.getAll();
            this.loading = false;
            this.submitted = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.emailModel.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.emailModel.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.emailModel.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChange(event) {
        // this.formEmail_model.get('code').setValue(this.formEmail_model.get('code').value.toLowerCase())
    }
    //Content
    putValueFormContent(id) {
        this.formcontent_email_model.get('id').setValue(this.content_email_model.find(x => x.id == id).id);
        this.formcontent_email_model.get('subject').setValue(this.content_email_model.find(x => x.id == id).subject);
        this.valueNotes = this.content_email_model.find(x => x.id == id).content_model;
        this.formcontent_email_model.get('email_model_id').setValue(this.content_email_model.find(x => x.id == id).email_model_id);
        this.formcontent_email_model.get('langId').setValue(this.content_email_model.find(x => x.id == id).langId);
    }
    disableFormContent() {
        this.formcontent_email_model.disable({ onlySelf: true });
        this.ngEditContent = false;
    }
    enableFormContent() {
        this.formcontent_email_model.enable({ onlySelf: true });
        this.ngEditContent = true;
    }
    addContent(content) {
        if (this.email_modelId != -1) {
            this.valueNotes = "";
            this.enableFormContent();
            this.getLang();
            this.formcontent_email_model.reset();
            this.typeFormContent = 0;
            this.titleFormContent = "ADD CONTENT";
            this.modalService.open(content, { backdrop: 'static', windowClass: 'modal-full ' });
            this.formcontent_email_model.get('email_model_id').setValue(this.email_modelId);
        }
    }
    editContent(content, id) {
        this.formcontent_email_model.reset();
        this.putValueFormContent(id);
        this.formcontent_email_model.get('langId').disable({ onlySelf: true });
        this.typeFormContent = 1;
        this.titleFormContent = this.trans.emailModel.TitleForm_update;
        this.modalService.open(content, { backdrop: 'static', windowClass: 'modal-full ' });
    }
    getAllContent() {
        this.EmailModelService.getllContentById(this.email_modelId).subscribe(res => {
            this.content_email_model = res;
        });
    }
    deleteContent(content, id) {
        this.formcontent_email_model.reset();
        this.putValueFormContent(id);
        this.disableFormContent();
        this.typeFormContent = 2;
        this.titleFormContent = this.trans.emailModel.TitleForm_delete;
        this.modalService.open(content, { backdrop: 'static' });
    }
    submitContent(param) {
        if (this.typeFormContent == 0) {
            return this.EmailModelService.createContent(param);
        }
        else if (this.typeFormContent == 2) {
            return this.EmailModelService.deleteConent(param);
        }
        else if (this.typeFormContent == 1) {
            return this.EmailModelService.updateContent(param);
        }
    }
    onSubmitContent() {
        this.submittedContent = true;
        if (this.formcontent_email_model.invalid) {
            return;
        }
        this.loadingContent = true;
        this.formcontent_email_model.get('content_model').setValue(this.editor.getData());
        this.submitContent(this.formcontent_email_model.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.contentEmailModel.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.contentEmailModel.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.getAllContent();
            this.loadingContent = false;
            this.submittedContent = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.emailModel.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.emailModel.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.emailModel.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loadingContent = false;
        });
    }
};
EmailModelComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"] },
    { type: _core_services_email_model_email_model_service__WEBPACK_IMPORTED_MODULE_2__["EmailModelService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
    { type: src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"] }
];
EmailModelComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-email-model',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./email-model.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/email-model/email-model.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./email-model.component.scss */ "./src/app/portals/settings/email-model/email-model.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"],
        _core_services_email_model_email_model_service__WEBPACK_IMPORTED_MODULE_2__["EmailModelService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
        src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"]])
], EmailModelComponent);



/***/ }),

/***/ "./src/app/portals/settings/function-prosess/function-prosess.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/portals/settings/function-prosess/function-prosess.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvZnVuY3Rpb24tcHJvc2Vzcy9mdW5jdGlvbi1wcm9zZXNzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/function-prosess/function-prosess.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/portals/settings/function-prosess/function-prosess.component.ts ***!
  \*********************************************************************************/
/*! exports provided: FunctionProsessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionProsessComponent", function() { return FunctionProsessComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");







let FunctionProsessComponent = class FunctionProsessComponent {
    constructor(http, modelServices, formBuilder, tost) {
        this.http = http;
        this.modelServices = modelServices;
        this.formBuilder = formBuilder;
        this.tost = tost;
        this.Func = [];
        this.typeFun = [
            { nameType: 'Change Stage', id: 0 },
            { nameType: 'Send Emai', id: 1 },
            { nameType: 'Send WhatsApp', id: 3 },
            { nameType: 'Script', id: 2 },
        ];
        this.error = '';
        this.titleForm = "";
        this.submitted = false;
        this.idStatic = 0;
        //get STage
        this.Stages = [];
        //users
        this.typeUsers = [
            { nameType: 'Doctor', id: 2 },
            { nameType: 'LAB', id: 3 },
            { nameType: 'coordinator', id: 4 },
            { nameType: 'Treatment Planners', id: 5 },
            { nameType: 'SuperVisor', id: 7 },
            { nameType: 'Accounntant', id: 9 }
        ];
        this.Users = [];
        //set Validators formMembership
        this.formBarcodes = this.formBuilder.group({
            nameFun: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            typeFun: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            numberStatus: [''],
            emailContent: [''],
            typeUser: [''],
            idUser: [''],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Functions', path: '/', active: true }];
    }
    ssnValidator(control) {
        if ((parseInt(control.value) || control.value == 0) && parseInt(control.value) <= 100 && parseInt(control.value) >= 0) {
            return null;
        }
        else {
            return { ssn: true };
        }
    }
    ngOnInit() {
        this.formBarcodes.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.getAll();
        this.getStage();
        this.GetUsers();
    }
    getEditor(event) {
        this.editor = event;
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + "/FUN/get", {}).subscribe(res => {
            console.log("Result Function Array");
            console.log(res);
            this.Func = res;
        });
    }
    get f() { return this.formBarcodes.controls; }
    showModelMemberships(model, idStatic = null) {
        this.submitted = false;
        if (idStatic) {
            this.formBarcodes.reset();
            this.titleForm = "Edit Function";
            this.idStatic = idStatic;
            let mem = this.Func.find(x => x.id == idStatic);
            this.formBarcodes.get("nameFun").setValue(mem.nameFun);
            this.formBarcodes.get("typeFun").setValue(mem.typeFun);
            this.formBarcodes.get("numberStatus").setValue(mem.numberStatus);
            this.formBarcodes.get("emailContent").setValue(mem.emailContent);
            this.formBarcodes.get("typeUser").setValue(mem.typeUser);
            this.formBarcodes.get("idUser").setValue(mem.idUser);
            this.formBarcodes.get("id").setValue(mem.id);
            this.valueNotes = mem.emailContent;
        }
        else {
            this.titleForm = "Add Function";
            this.idStatic = -1;
            this.formBarcodes.reset();
        }
        this.modelServices.open(model, { backdrop: 'static' });
    }
    create() {
        this.submitted = true;
        if (!this.formBarcodes.valid) {
            return;
        }
        if (this.formBarcodes.get('typeFun').value === 0) {
            this.formBarcodes.get('emailContent').setValue('');
            this.formBarcodes.get('typeUser').setValue(-1);
            this.formBarcodes.get('idUser').setValue(-1);
        }
        else if (this.formBarcodes.get('typeFun').value == 1) {
            this.formBarcodes.get('numberStatus').setValue(-1);
            this.formBarcodes.get('emailContent').setValue(this.editor.getData());
        }
        else if (this.formBarcodes.get('typeFun').value == 2) {
        }
        else if (this.formBarcodes.get('typeFun').value == 3) {
            this.formBarcodes.get('numberStatus').setValue(-1);
            this.formBarcodes.get('emailContent');
        }
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + '/FUN/createAndUpdate', this.formBarcodes.value).subscribe(res => {
            if (res.message == 2000) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record added successfully", "successful");
            }
            else if (res.message == 2001) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record Updateded successfully", "successful");
            }
        });
    }
    Save() {
        this.create();
    }
    getStage() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + "/caseStages/get", {}).subscribe(res => {
            this.Stages = res;
        });
    }
    GetUsers(type = false) {
        let linkSe = "";
        if (this.formBarcodes.get('typeUser').value == 2) {
            linkSe = '/TAS/GetD';
        }
        if (this.formBarcodes.get('typeUser').value == 3) {
            linkSe = "/TAS/GetL";
        }
        else if (this.formBarcodes.get('typeUser').value == 4) {
            linkSe = "/TAS/GetC";
        }
        else if (this.formBarcodes.get('typeUser').value == 5) {
            linkSe = "/TAS/GetT";
        }
        else if (this.formBarcodes.get('typeUser').value == 7) {
            linkSe = "/TAS/GetS";
        }
        else if (this.formBarcodes.get('typeUser').value == 9) {
            linkSe = "/TAS/GetA";
        }
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + "/PCS/" + linkSe, {}).subscribe(res => {
            if (type && this.formBarcodes.get('typeUser').value == 2) {
                this.Users = [{ id: -1, userName: "Doctor for this case" }];
            }
            else {
                this.Users = res.data;
            }
        });
    }
};
FunctionProsessComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
FunctionProsessComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-function-prosess',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./function-prosess.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/function-prosess/function-prosess.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./function-prosess.component.scss */ "./src/app/portals/settings/function-prosess/function-prosess.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
], FunctionProsessComponent);



/***/ }),

/***/ "./src/app/portals/settings/general/general.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/portals/settings/general/general.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".byttondiv {\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWVyZ2hqamV5L0RvY3VtZW50cy9Qcm9qZWN0cy9QYXJpc2FsaW5lT2xkL2FkbWluL3NyYy9hcHAvcG9ydGFscy9zZXR0aW5ncy9nZW5lcmFsL2dlbmVyYWwuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvZ2VuZXJhbC9nZW5lcmFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvZ2VuZXJhbC9nZW5lcmFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ5dHRvbmRpdntcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufSIsIi5ieXR0b25kaXYge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/portals/settings/general/general.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/portals/settings/general/general.component.ts ***!
  \***************************************************************/
/*! exports provided: GeneralComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralComponent", function() { return GeneralComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/language/language.service */ "./src/app/core/services/language/language.service.ts");
/* harmony import */ var src_app_core_services_seo_seo_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/seo/seo.service */ "./src/app/core/services/seo/seo.service.ts");
/* harmony import */ var src_app_core_services_socialMedia_social_media_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/socialMedia/social-media.service */ "./src/app/core/services/socialMedia/social-media.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core/services/currency/currency.service */ "./src/app/core/services/currency/currency.service.ts");
/* harmony import */ var src_app_core_services_general_general_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/general/general.service */ "./src/app/core/services/general/general.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");













let GeneralComponent = class GeneralComponent {
    constructor(currancyS, sl, toastr, modalService, transs, lang, seoS, http, generalService) {
        this.currancyS = currancyS;
        this.sl = sl;
        this.toastr = toastr;
        this.modalService = modalService;
        this.transs = transs;
        this.lang = lang;
        this.seoS = seoS;
        this.http = http;
        this.generalService = generalService;
        this.sl_name = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('');
        this.sl_link = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('');
        this.sl_title = "";
        this.a_seo = [];
        this.seo_name = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('');
        this.seo_description = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('');
        this.seo_key_words = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('');
        this.seo_title = "";
        this.languageModel = 1;
        this.currencModel = 1;
        this.emailModel = "";
        this.companyAddress = "";
        this.savePortFlio = () => {
            this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_11__["environment"].url + "/general/SPF", { PortFileo: this.editor.getData() }).subscribe(res => {
                if (res.message === 2001) {
                    this.toastr.success("Update Success", "successfull", {
                        timeOut: 3000
                    });
                }
            });
        };
        // this.a_seo.push({id:1,name:"KIVEN",description:"DISCRCTION",key_words:"this.seo_key_words.value"});
    }
    ngOnInit() {
        this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: 'SETTING', path: '/', active: true }, { label: 'GENERAL', path: '/', active: true }];
        // this.Language = [
        // {id: 1, name: 'Vilnius'},
        // {id: 2, name: 'Kaunas'},
        // {id: 3, name: 'Pavilnys', disabled: true},
        // {id: 4, name: 'Pabradė'},
        // {id: 5, name: 'Klaipėda'}];
        this.lang.getAllLanguageAndClassfier().subscribe(res => {
            this.Language = res;
        });
        //set DB Seo 
        this.seo = this.seoS.setSeo().subscribe(res => {
            this.a_seo = res;
        });
        this.seoS.getAll();
        //set DB Seo 
        this._socialMedia = this.sl.setSocialMedia().subscribe(res => {
            this.socialMedia = res;
        });
        this.sl.getAll();
        //set cararncy
        this.currency = [
            { id: 1, name: '$' },
            { id: 2, name: 'TL' }
        ];
        this.currancyS.getAllAndName().subscribe(res => {
            this.currency = res;
        });
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
        });
        this.generalService.getGeneral().subscribe(res => {
            this.currencModel = res.currencyId;
            this.languageModel = res.languageId;
            this.emailModel = res.email;
            this.companyAddress = res.companyAddress;
            this.valueNotes = res.PortFileo;
        });
    }
    getEditor(editor) {
        this.editor = editor;
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
        this.seo.unsubscribe();
    }
    //0:Add,1:Edit,2:Delete #social
    OpenSocial(content, type, id = -1) {
        this.sl_type = type;
        if (type == 0) {
            this.sl_title = this.trans.general.modal_title_Add_link;
            this.sl_name.setValue("");
            this.sl_link.setValue("");
            this.EditInputSocial(false);
            this.modalService.open(content, { backdrop: 'static' });
        }
        else if (type == 1) {
            this.sl_id = id;
            this.sl_title = this.trans.general.modal_title_edit_link;
            this.sl_name.setValue(this.socialMedia.find(x => x.id == id).name);
            this.sl_link.setValue(this.socialMedia.find(x => x.id == id).link);
            this.EditInputSocial(false);
            this.modalService.open(content, { backdrop: 'static' });
        }
        else if (type == 2) {
            this.sl_id = id;
            this.sl_title = this.trans.general.modal_title_remove_link;
            this.sl_name.setValue(this.socialMedia.find(x => x.id == id).name);
            this.sl_link.setValue(this.socialMedia.find(x => x.id == id).link);
            this.EditInputSocial();
            this.modalService.open(content, { backdrop: 'static' });
        }
    }
    EditInputSocial(on = true) {
        if (on) {
            this.sl_name.disable({ onlySelf: true });
            this.sl_link.disable({ onlySelf: true });
        }
        else {
            this.sl_name.enable({ onlySelf: true });
            this.sl_link.enable({ onlySelf: true });
        }
    }
    slsubmit(param = null) {
        if (this.sl_type == 0) {
            return this.sl.create(param);
        }
        else if (this.sl_type == 1) {
            return this.sl.update(param);
        }
        else if (this.sl_type == 2) {
            return this.sl.delete(this.sl_id);
        }
    }
    slsubSubmit(param = null) {
        this.slsubmit(param).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.general.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2001) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.general.updatedSuccessfully, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.general.deletedSuccessfully, "successfull", {
                    timeOut: 3000
                });
            }
            this.sl.getAll();
        });
    }
    BtnSaveSocial() {
        let param = { id: this.sl_id, name: this.sl_name.value, link: this.sl_link.value };
        this.slsubSubmit(param);
        this.modalService.dismissAll();
    }
    //0:Add,1:Edit,2:Delete #seo
    OpenSeo(content, type, id = -1) {
        this.seo_type = type;
        if (type == 0) {
            this.seo_title = this.trans.general.modalseo_title_Add_key_words;
            this.seo_name.setValue("");
            this.seo_description.setValue("");
            this.seo_key_words.setValue("");
            this.EditInputSocial(false);
            this.modalService.open(content, { backdrop: 'static' });
        }
        else if (type == 1) {
            this.seo_id = id;
            this.seo_title = this.trans.general.modalseo_title_edit_key_words;
            this.seo_name.setValue(this.a_seo.find(x => x.id == id).name);
            this.seo_description.setValue(this.a_seo.find(x => x.id == id).description);
            this.seo_key_words.setValue(this.a_seo.find(x => x.id == id).key_words);
            this.EditInputSocial(false);
            this.modalService.open(content, { backdrop: 'static' });
        }
        else if (type == 2) {
            this.seo_id = id;
            this.seo_title = this.trans.general.modalseo_title_remove_key_words;
            this.seo_name.setValue(this.a_seo.find(x => x.id == id).name);
            this.seo_description.setValue(this.a_seo.find(x => x.id == id).description);
            this.seo_key_words.setValue(this.a_seo.find(x => x.id == id).key_words);
            this.EditInputSocial();
            this.modalService.open(content, { backdrop: 'static' });
        }
    }
    EditInputSeo(on = true) {
        if (on) {
            this.seo_name.disable({ onlySelf: true });
            this.seo_description.disable({ onlySelf: true });
            this.seo_key_words.disable({ onlySelf: true });
        }
        else {
            this.seo_name.enable({ onlySelf: true });
            this.seo_description.enable({ onlySelf: true });
            this.seo_key_words.enable({ onlySelf: true });
        }
    }
    seosubmit(param = null) {
        if (this.seo_type == 0) {
            return this.seoS.create(param);
        }
        else if (this.seo_type == 1) {
            return this.seoS.update(param);
        }
        else if (this.seo_type == 2) {
            return this.seoS.delete(this.seo_id);
        }
    }
    soesubSubmit(param = null) {
        this.seosubmit(param).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.general.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2001) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.general.updatedSuccessfully, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.general.deletedSuccessfully, "successfull", {
                    timeOut: 3000
                });
            }
            this.seoS.getAll();
        });
    }
    BtnSaveSeo() {
        let param = { id: this.seo_id, name: this.seo_name.value, description: this.seo_description.value, key_words: this.seo_key_words.value };
        this.soesubSubmit(param);
        this.modalService.dismissAll();
    }
    BtnSaveGenral() {
        this.generalService.update({ languageId: this.languageModel, currencyId: this.currencModel, email: this.emailModel, companyAddress: this.companyAddress }).subscribe(res => {
            if (res.message == 2001)
                this.toastr.success("SuccessFuly", "Update SuccessFuly");
        }, err => {
            this.toastr.error("Error", "Error for Update");
        });
    }
};
GeneralComponent.ctorParameters = () => [
    { type: _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_9__["CurrencyService"] },
    { type: src_app_core_services_socialMedia_social_media_service__WEBPACK_IMPORTED_MODULE_7__["SocialMediaService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"] },
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_4__["TransService"] },
    { type: src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"] },
    { type: src_app_core_services_seo_seo_service__WEBPACK_IMPORTED_MODULE_6__["SeoService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"] },
    { type: src_app_core_services_general_general_service__WEBPACK_IMPORTED_MODULE_10__["GeneralService"] }
];
GeneralComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-general',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./general.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/general/general.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./general.component.scss */ "./src/app/portals/settings/general/general.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_9__["CurrencyService"],
        src_app_core_services_socialMedia_social_media_service__WEBPACK_IMPORTED_MODULE_7__["SocialMediaService"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
        src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_4__["TransService"],
        src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"],
        src_app_core_services_seo_seo_service__WEBPACK_IMPORTED_MODULE_6__["SeoService"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"],
        src_app_core_services_general_general_service__WEBPACK_IMPORTED_MODULE_10__["GeneralService"]])
], GeneralComponent);



/***/ }),

/***/ "./src/app/portals/settings/info-users/info-users.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/portals/settings/info-users/info-users.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvaW5mby11c2Vycy9pbmZvLXVzZXJzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/info-users/info-users.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/portals/settings/info-users/info-users.component.ts ***!
  \*********************************************************************/
/*! exports provided: InfoUsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoUsersComponent", function() { return InfoUsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var src_app_core_services_users_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/users/users.service */ "./src/app/core/services/users/users.service.ts");




let InfoUsersComponent = class InfoUsersComponent {
    constructor(usersService, auth) {
        this.usersService = usersService;
        this.auth = auth;
        this.userInforamtion = [];
    }
    ngOnInit() {
        this.usersService.getUserById(this.auth.user.id).subscribe(res => {
            alert(JSON.stringify(res));
        });
    }
};
InfoUsersComponent.ctorParameters = () => [
    { type: src_app_core_services_users_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"] },
    { type: src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"] }
];
InfoUsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-info-users',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./info-users.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/info-users/info-users.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./info-users.component.scss */ "./src/app/portals/settings/info-users/info-users.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_users_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"],
        src_app_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
], InfoUsersComponent);



/***/ }),

/***/ "./src/app/portals/settings/languages/languages.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/portals/settings/languages/languages.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvbGFuZ3VhZ2VzL2xhbmd1YWdlcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/portals/settings/languages/languages.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/portals/settings/languages/languages.component.ts ***!
  \*******************************************************************/
/*! exports provided: LanguagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguagesComponent", function() { return LanguagesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/language/language.service */ "./src/app/core/services/language/language.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var src_app_core_services_error_senderror_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/error/senderror.service */ "./src/app/core/services/error/senderror.service.ts");








let LanguagesComponent = class LanguagesComponent {
    constructor(formBuilder, s_Error, modalService, lang, toastr, transs) {
        this.formBuilder = formBuilder;
        this.s_Error = s_Error;
        this.modalService = modalService;
        this.lang = lang;
        this.toastr = toastr;
        this.transs = transs;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "ADD LANGUAGE";
        this.typeForm = 0;
        this.submittedLanguageclassifier = false;
        this.errorLanguageclassifier = '';
        this.loadingLanguageclassifier = false;
        this.titleFormLanguageclassifier = "Add Languageclassifier";
        this.typeFormLanguageclassifier = 0;
        this.langId = -1;
        this.langArray = [
            { "code": "ab", "name": "Abkhaz", "nativeName": "аҧсуа" },
            { "code": "aa", "name": "Afar", "nativeName": "Afaraf" },
            { "code": "af", "name": "Afrikaans", "nativeName": "Afrikaans" },
            { "code": "ak", "name": "Akan", "nativeName": "Akan" },
            { "code": "sq", "name": "Albanian", "nativeName": "Shqip" },
            { "code": "am", "name": "Amharic", "nativeName": "አማርኛ" },
            { "code": "ar", "name": "Arabic", "nativeName": "العربية" },
            { "code": "an", "name": "Aragonese", "nativeName": "Aragonés" },
            { "code": "hy", "name": "Armenian", "nativeName": "Հայերեն" },
            { "code": "as", "name": "Assamese", "nativeName": "অসমীয়া" },
            { "code": "av", "name": "Avaric", "nativeName": "авар мацӀ, магӀарул мацӀ" },
            { "code": "ae", "name": "Avestan", "nativeName": "avesta" },
            { "code": "ay", "name": "Aymara", "nativeName": "aymar aru" },
            { "code": "az", "name": "Azerbaijani", "nativeName": "azərbaycan dili" },
            { "code": "bm", "name": "Bambara", "nativeName": "bamanankan" },
            { "code": "ba", "name": "Bashkir", "nativeName": "башҡорт теле" },
            { "code": "eu", "name": "Basque", "nativeName": "euskara, euskera" },
            { "code": "be", "name": "Belarusian", "nativeName": "Беларуская" },
            { "code": "bn", "name": "Bengali", "nativeName": "বাংলা" },
            { "code": "bh", "name": "Bihari", "nativeName": "भोजपुरी" },
            { "code": "bi", "name": "Bislama", "nativeName": "Bislama" },
            { "code": "bs", "name": "Bosnian", "nativeName": "bosanski jezik" },
            { "code": "br", "name": "Breton", "nativeName": "brezhoneg" },
            { "code": "bg", "name": "Bulgarian", "nativeName": "български език" },
            { "code": "my", "name": "Burmese", "nativeName": "ဗမာစာ" },
            { "code": "ca", "name": "Catalan; Valencian", "nativeName": "Català" },
            { "code": "ch", "name": "Chamorro", "nativeName": "Chamoru" },
            { "code": "ce", "name": "Chechen", "nativeName": "нохчийн мотт" },
            { "code": "ny", "name": "Chichewa; Chewa; Nyanja", "nativeName": "chiCheŵa, chinyanja" },
            { "code": "zh", "name": "Chinese", "nativeName": "中文 (Zhōngwén), 汉语, 漢語" },
            { "code": "cv", "name": "Chuvash", "nativeName": "чӑваш чӗлхи" },
            { "code": "kw", "name": "Cornish", "nativeName": "Kernewek" },
            { "code": "co", "name": "Corsican", "nativeName": "corsu, lingua corsa" },
            { "code": "cr", "name": "Cree", "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ" },
            { "code": "hr", "name": "Croatian", "nativeName": "hrvatski" },
            { "code": "cs", "name": "Czech", "nativeName": "česky, čeština" },
            { "code": "da", "name": "Danish", "nativeName": "dansk" },
            { "code": "dv", "name": "Divehi; Dhivehi; Maldivian;", "nativeName": "ދިވެހި" },
            { "code": "nl", "name": "Dutch", "nativeName": "Nederlands, Vlaams" },
            { "code": "en", "name": "English", "nativeName": "English" },
            { "code": "eo", "name": "Esperanto", "nativeName": "Esperanto" },
            { "code": "et", "name": "Estonian", "nativeName": "eesti, eesti keel" },
            { "code": "ee", "name": "Ewe", "nativeName": "Eʋegbe" },
            { "code": "fo", "name": "Faroese", "nativeName": "føroyskt" },
            { "code": "fj", "name": "Fijian", "nativeName": "vosa Vakaviti" },
            { "code": "fi", "name": "Finnish", "nativeName": "suomi, suomen kieli" },
            { "code": "fr", "name": "French", "nativeName": "français, langue française" },
            { "code": "ff", "name": "Fula; Fulah; Pulaar; Pular", "nativeName": "Fulfulde, Pulaar, Pular" },
            { "code": "gl", "name": "Galician", "nativeName": "Galego" },
            { "code": "ka", "name": "Georgian", "nativeName": "ქართული" },
            { "code": "de", "name": "German", "nativeName": "Deutsch" },
            { "code": "el", "name": "Greek, Modern", "nativeName": "Ελληνικά" },
            { "code": "gn", "name": "Guaraní", "nativeName": "Avañeẽ" },
            { "code": "gu", "name": "Gujarati", "nativeName": "ગુજરાતી" },
            { "code": "ht", "name": "Haitian; Haitian Creole", "nativeName": "Kreyòl ayisyen" },
            { "code": "ha", "name": "Hausa", "nativeName": "Hausa, هَوُسَ" },
            { "code": "he", "name": "Hebrew (modern)", "nativeName": "עברית" },
            { "code": "hz", "name": "Herero", "nativeName": "Otjiherero" },
            { "code": "hi", "name": "Hindi", "nativeName": "हिन्दी, हिंदी" },
            { "code": "ho", "name": "Hiri Motu", "nativeName": "Hiri Motu" },
            { "code": "hu", "name": "Hungarian", "nativeName": "Magyar" },
            { "code": "ia", "name": "Interlingua", "nativeName": "Interlingua" },
            { "code": "id", "name": "Indonesian", "nativeName": "Bahasa Indonesia" },
            { "code": "ie", "name": "Interlingue", "nativeName": "Originally called Occidental; then Interlingue after WWII" },
            { "code": "ga", "name": "Irish", "nativeName": "Gaeilge" },
            { "code": "ig", "name": "Igbo", "nativeName": "Asụsụ Igbo" },
            { "code": "ik", "name": "Inupiaq", "nativeName": "Iñupiaq, Iñupiatun" },
            { "code": "io", "name": "Ido", "nativeName": "Ido" },
            { "code": "is", "name": "Icelandic", "nativeName": "Íslenska" },
            { "code": "it", "name": "Italian", "nativeName": "Italiano" },
            { "code": "iu", "name": "Inuktitut", "nativeName": "ᐃᓄᒃᑎᑐᑦ" },
            { "code": "ja", "name": "Japanese", "nativeName": "日本語 (にほんご／にっぽんご)" },
            { "code": "jv", "name": "Javanese", "nativeName": "basa Jawa" },
            { "code": "kl", "name": "Kalaallisut, Greenlandic", "nativeName": "kalaallisut, kalaallit oqaasii" },
            { "code": "kn", "name": "Kannada", "nativeName": "ಕನ್ನಡ" },
            { "code": "kr", "name": "Kanuri", "nativeName": "Kanuri" },
            { "code": "ks", "name": "Kashmiri", "nativeName": "कश्मीरी, كشميري‎" },
            { "code": "kk", "name": "Kazakh", "nativeName": "Қазақ тілі" },
            { "code": "km", "name": "Khmer", "nativeName": "ភាសាខ្មែរ" },
            { "code": "ki", "name": "Kikuyu, Gikuyu", "nativeName": "Gĩkũyũ" },
            { "code": "rw", "name": "Kinyarwanda", "nativeName": "Ikinyarwanda" },
            { "code": "ky", "name": "Kirghiz, Kyrgyz", "nativeName": "кыргыз тили" },
            { "code": "kv", "name": "Komi", "nativeName": "коми кыв" },
            { "code": "kg", "name": "Kongo", "nativeName": "KiKongo" },
            { "code": "ko", "name": "Korean", "nativeName": "한국어 (韓國語), 조선말 (朝鮮語)" },
            { "code": "ku", "name": "Kurdish", "nativeName": "Kurdî, كوردی‎" },
            { "code": "kj", "name": "Kwanyama, Kuanyama", "nativeName": "Kuanyama" },
            { "code": "la", "name": "Latin", "nativeName": "latine, lingua latina" },
            { "code": "lb", "name": "Luxembourgish, Letzeburgesch", "nativeName": "Lëtzebuergesch" },
            { "code": "lg", "name": "Luganda", "nativeName": "Luganda" },
            { "code": "li", "name": "Limburgish, Limburgan, Limburger", "nativeName": "Limburgs" },
            { "code": "ln", "name": "Lingala", "nativeName": "Lingála" },
            { "code": "lo", "name": "Lao", "nativeName": "ພາສາລາວ" },
            { "code": "lt", "name": "Lithuanian", "nativeName": "lietuvių kalba" },
            { "code": "lu", "name": "Luba-Katanga", "nativeName": "" },
            { "code": "lv", "name": "Latvian", "nativeName": "latviešu valoda" },
            { "code": "gv", "name": "Manx", "nativeName": "Gaelg, Gailck" },
            { "code": "mk", "name": "Macedonian", "nativeName": "македонски јазик" },
            { "code": "mg", "name": "Malagasy", "nativeName": "Malagasy fiteny" },
            { "code": "ms", "name": "Malay", "nativeName": "bahasa Melayu, بهاس ملايو‎" },
            { "code": "ml", "name": "Malayalam", "nativeName": "മലയാളം" },
            { "code": "mt", "name": "Maltese", "nativeName": "Malti" },
            { "code": "mi", "name": "Māori", "nativeName": "te reo Māori" },
            { "code": "mr", "name": "Marathi (Marāṭhī)", "nativeName": "मराठी" },
            { "code": "mh", "name": "Marshallese", "nativeName": "Kajin M̧ajeļ" },
            { "code": "mn", "name": "Mongolian", "nativeName": "монгол" },
            { "code": "na", "name": "Nauru", "nativeName": "Ekakairũ Naoero" },
            { "code": "nv", "name": "Navajo, Navaho", "nativeName": "Diné bizaad, Dinékʼehǰí" },
            { "code": "nb", "name": "Norwegian Bokmål", "nativeName": "Norsk bokmål" },
            { "code": "nd", "name": "North Ndebele", "nativeName": "isiNdebele" },
            { "code": "ne", "name": "Nepali", "nativeName": "नेपाली" },
            { "code": "ng", "name": "Ndonga", "nativeName": "Owambo" },
            { "code": "nn", "name": "Norwegian Nynorsk", "nativeName": "Norsk nynorsk" },
            { "code": "no", "name": "Norwegian", "nativeName": "Norsk" },
            { "code": "ii", "name": "Nuosu", "nativeName": "ꆈꌠ꒿ Nuosuhxop" },
            { "code": "nr", "name": "South Ndebele", "nativeName": "isiNdebele" },
            { "code": "oc", "name": "Occitan", "nativeName": "Occitan" },
            { "code": "oj", "name": "Ojibwe, Ojibwa", "nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ" },
            { "code": "cu", "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic", "nativeName": "ѩзыкъ словѣньскъ" },
            { "code": "om", "name": "Oromo", "nativeName": "Afaan Oromoo" },
            { "code": "or", "name": "Oriya", "nativeName": "ଓଡ଼ିଆ" },
            { "code": "os", "name": "Ossetian, Ossetic", "nativeName": "ирон æвзаг" },
            { "code": "pa", "name": "Panjabi, Punjabi", "nativeName": "ਪੰਜਾਬੀ, پنجابی‎" },
            { "code": "pi", "name": "Pāli", "nativeName": "पाऴि" },
            { "code": "fa", "name": "Persian", "nativeName": "فارسی" },
            { "code": "pl", "name": "Polish", "nativeName": "polski" },
            { "code": "ps", "name": "Pashto, Pushto", "nativeName": "پښتو" },
            { "code": "pt", "name": "Portuguese", "nativeName": "Português" },
            { "code": "qu", "name": "Quechua", "nativeName": "Runa Simi, Kichwa" },
            { "code": "rm", "name": "Romansh", "nativeName": "rumantsch grischun" },
            { "code": "rn", "name": "Kirundi", "nativeName": "kiRundi" },
            { "code": "ro", "name": "Romanian, Moldavian, Moldovan", "nativeName": "română" },
            { "code": "ru", "name": "Russian", "nativeName": "русский язык" },
            { "code": "sa", "name": "Sanskrit (Saṁskṛta)", "nativeName": "संस्कृतम्" },
            { "code": "sc", "name": "Sardinian", "nativeName": "sardu" },
            { "code": "sd", "name": "Sindhi", "nativeName": "सिन्धी, سنڌي، سندھی‎" },
            { "code": "se", "name": "Northern Sami", "nativeName": "Davvisámegiella" },
            { "code": "sm", "name": "Samoan", "nativeName": "gagana faa Samoa" },
            { "code": "sg", "name": "Sango", "nativeName": "yângâ tî sängö" },
            { "code": "sr", "name": "Serbian", "nativeName": "српски језик" },
            { "code": "gd", "name": "Scottish Gaelic; Gaelic", "nativeName": "Gàidhlig" },
            { "code": "sn", "name": "Shona", "nativeName": "chiShona" },
            { "code": "si", "name": "Sinhala, Sinhalese", "nativeName": "සිංහල" },
            { "code": "sk", "name": "Slovak", "nativeName": "slovenčina" },
            { "code": "sl", "name": "Slovene", "nativeName": "slovenščina" },
            { "code": "so", "name": "Somali", "nativeName": "Soomaaliga, af Soomaali" },
            { "code": "st", "name": "Southern Sotho", "nativeName": "Sesotho" },
            { "code": "es", "name": "Spanish; Castilian", "nativeName": "español, castellano" },
            { "code": "su", "name": "Sundanese", "nativeName": "Basa Sunda" },
            { "code": "sw", "name": "Swahili", "nativeName": "Kiswahili" },
            { "code": "ss", "name": "Swati", "nativeName": "SiSwati" },
            { "code": "sv", "name": "Swedish", "nativeName": "svenska" },
            { "code": "ta", "name": "Tamil", "nativeName": "தமிழ்" },
            { "code": "te", "name": "Telugu", "nativeName": "తెలుగు" },
            { "code": "tg", "name": "Tajik", "nativeName": "тоҷикӣ, toğikī, تاجیکی‎" },
            { "code": "th", "name": "Thai", "nativeName": "ไทย" },
            { "code": "ti", "name": "Tigrinya", "nativeName": "ትግርኛ" },
            { "code": "bo", "name": "Tibetan Standard, Tibetan, Central", "nativeName": "བོད་ཡིག" },
            { "code": "tk", "name": "Turkmen", "nativeName": "Türkmen, Түркмен" },
            { "code": "tl", "name": "Tagalog", "nativeName": "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔" },
            { "code": "tn", "name": "Tswana", "nativeName": "Setswana" },
            { "code": "to", "name": "Tonga (Tonga Islands)", "nativeName": "faka Tonga" },
            { "code": "tr", "name": "Turkish", "nativeName": "Türkçe" },
            { "code": "ts", "name": "Tsonga", "nativeName": "Xitsonga" },
            { "code": "tt", "name": "Tatar", "nativeName": "татарча, tatarça, تاتارچا‎" },
            { "code": "tw", "name": "Twi", "nativeName": "Twi" },
            { "code": "ty", "name": "Tahitian", "nativeName": "Reo Tahiti" },
            { "code": "ug", "name": "Uighur, Uyghur", "nativeName": "Uyƣurqə, ئۇيغۇرچە‎" },
            { "code": "uk", "name": "Ukrainian", "nativeName": "українська" },
            { "code": "ur", "name": "Urdu", "nativeName": "اردو" },
            { "code": "uz", "name": "Uzbek", "nativeName": "zbek, Ўзбек, أۇزبېك‎" },
            { "code": "ve", "name": "Venda", "nativeName": "Tshivenḓa" },
            { "code": "vi", "name": "Vietnamese", "nativeName": "Tiếng Việt" },
            { "code": "vo", "name": "Volapük", "nativeName": "Volapük" },
            { "code": "wa", "name": "Walloon", "nativeName": "Walon" },
            { "code": "cy", "name": "Welsh", "nativeName": "Cymraeg" },
            { "code": "wo", "name": "Wolof", "nativeName": "Wollof" },
            { "code": "fy", "name": "Western Frisian", "nativeName": "Frysk" },
            { "code": "xh", "name": "Xhosa", "nativeName": "isiXhosa" },
            { "code": "yi", "name": "Yiddish", "nativeName": "ייִדיש" },
            { "code": "yo", "name": "Yoruba", "nativeName": "Yorùbá" },
            { "code": "za", "name": "Zhuang, Chuang", "nativeName": "Saɯ cueŋƅ, Saw cuengh" }
        ];
        this.Trans = transs.trans.subscribe(res => {
            this.trans = res.key;
        });
    }
    ngOnInit() {
        //set Validators formLanguage
        this.formLanguage = this.formBuilder.group({
            langCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            direction: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
        });
        //set Validators formLanguage
        this.formLanguageclassifier = this.formBuilder.group({
            langName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            langCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
        });
        //set title root
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'LANGUAGES', path: '/', active: true }];
        this.getAllLanguage();
        this.formLanguage.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](-1));
        this.formLanguageclassifier.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](-1));
        this.formLanguageclassifier.addControl('langId', new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](""));
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
    }
    //Language
    getAllLanguage() {
        this.lang.getlanguage().subscribe(res => {
            this.language = res;
        });
        this.lang.getLanguageAll();
    }
    onChangecheck($event, id) {
        if ($event) {
            this.lang.deactivate_or_activate(id, 1).subscribe(res => {
                this.toastr.success(this.trans.Language.The_language_has_been_activated, "successfull", {
                    timeOut: 3000
                });
            });
        }
        else {
            this.lang.deactivate_or_activate(id, 0).subscribe(res => {
                this.toastr.warning(this.trans.Language.The_language_has_been_deactivated, "successfull", {
                    timeOut: 3000
                });
            });
        }
    }
    status(status) {
        if (status == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    onChange(C) {
        if (C == "C") {
            if (this.formLanguageclassifier.get('langCode').value.length >= 2) {
                this.formLanguageclassifier.get('langCode').setValue(this.formLanguageclassifier.get('langCode').value[0].toString() +
                    this.formLanguageclassifier.get('langCode').value[1].toString());
            }
            this.formLanguageclassifier.get('langCode').setValue(this.formLanguageclassifier.get('langCode').value.toUpperCase());
        }
        else {
            if (this.formLanguage.get('langCode').value.length >= 2) {
                this.formLanguage.get('langCode').setValue(this.formLanguage.get('langCode').value[0].toString() +
                    this.formLanguage.get('langCode').value[1].toString());
            }
            this.formLanguage.get('langCode').setValue(this.formLanguage.get('langCode').value.toUpperCase());
        }
    }
    onKeydown($event, C) {
        if (this.formLanguageclassifier.get('langCode').value != "" && this.formLanguageclassifier.get('langCode').value != null) {
            if (C == "C") {
                if (this.formLanguageclassifier.get('langCode').value.length >= 2) {
                    if ($event.key != 'Backspace') {
                        $event.preventDefault();
                    }
                }
            }
            else {
                if (this.formLanguage.get('langCode').value.length >= 2) {
                    if ($event.key != 'Backspace') {
                        $event.preventDefault();
                    }
                }
            }
        }
    }
    isValidator() {
        let langCode = this.formLanguage.get('langCode').value;
        if ((this.language.find(x => x.langCode == langCode) || langCode.length > 2 || langCode.length < 2) && this.typeForm == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    addLanguage(content) {
        this.enableController(null, true);
        this.typeForm = 0;
        this.titleForm = "ADD LANGUAGE";
        this.formLanguage.reset();
        this.modalService.open(content, { backdrop: 'static' });
        this.formLanguage.get('direction').setValue("LTR");
    }
    putValueController(id) {
        this.formLanguage.get('id').setValue(this.language.find(x => x.id == id).id);
        this.formLanguage.get('langCode').setValue(this.language.find(x => x.id == id).langCode);
        this.formLanguage.get('direction').setValue(this.language.find(x => x.id == id).direction);
    }
    deleteLanguage(content, id) {
        this.putValueController(id);
        this.disableController(null, true);
        this.typeForm = 2;
        this.titleForm = "DELETE LANGUAGE";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submitLanguage(param) {
        if (this.typeForm == 0) {
            return this.lang.create(param);
        }
        else if (this.typeForm == 2) {
            return this.lang.delete(param);
        }
    }
    disableController(namecontroller = "", All = false) {
        if (All) {
            this.formLanguage.disable({ onlySelf: true });
        }
        else {
            this.formLanguage.get(namecontroller).disable({ onlySelf: true });
        }
    }
    enableController(namecontroller = "", All = false) {
        if (All) {
            this.formLanguage.enable({ onlySelf: true });
        }
        else {
            this.formLanguage.get(namecontroller).enable({ onlySelf: true });
        }
    }
    onSubmitLanguage() {
        if (!this.isValidator()) {
            return;
        }
        this.loading = true;
        this.submitLanguage(this.formLanguage.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.Language.lang_added_successfully, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.Language.lang_deleted_successfully, "successfull", {
                    timeOut: 3000
                });
            }
            this.loading = false;
            this.lang.getLanguageAll();
            this.submitted = false;
            this.formLanguage.reset();
            this.modalService.dismissAll();
        }, (err) => {
            if (err.message == 1001) {
                this.toastr.error(this.trans.users.error_1001, "error", {
                    timeOut: 3000
                });
                this.submitted = false;
            }
            else if (err.message == 55555) {
                this.submitted = false;
                this.toastr.error(this.trans.public.error_55555, "error", {
                    timeOut: 3000
                });
                this.s_Error.sendErorr(err.message, err.error);
            }
            this.loading = false;
            this.submitted = false;
        });
    }
    //Language classifier 
    geLanguage_classifier(id) {
        this.lang.getlanguage_classifierById(id).subscribe(res => {
            this.language_classifier = res;
            this.langId = id;
        });
    }
    isValidatorLanguage_classifier() {
        let langCode = this.formLanguageclassifier.get('langCode').value;
        if (this.language_classifier.find(x => x.langCode == langCode) || (langCode.length > 2 || langCode.length < 2)) {
            if (this.typeFormLanguageclassifier != 2) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
    addLanguage_classifier(content) {
        this.enableController(null, true);
        this.typeFormLanguageclassifier = 0;
        this.titleFormLanguageclassifier = "ADD LANGUAGE";
        this.formLanguageclassifier.reset();
        this.formLanguageclassifier.get("langName").enable({ onlySelf: true });
        this.formLanguageclassifier.get("langCode").enable({ onlySelf: true });
        this.modalService.open(content, { backdrop: 'static' });
    }
    deleteLanguage_classifie(content, id) {
        this.formLanguageclassifier.get("langName").setValue(this.language_classifier.find(x => x.id == id).langName);
        this.formLanguageclassifier.get("langCode").setValue(this.language_classifier.find(x => x.id == id).langCode);
        this.formLanguageclassifier.get("id").setValue(id);
        this.formLanguageclassifier.get("langName").disable({ onlySelf: true });
        this.formLanguageclassifier.get("langCode").disable({ onlySelf: true });
        this.disableController(null, true);
        this.typeFormLanguageclassifier = 2;
        this.titleFormLanguageclassifier = this.trans.language_classifier.TitleForm_delete_Language;
        this.modalService.open(content, { backdrop: 'static' });
    }
    submitLanguageclassifier(param) {
        if (this.typeFormLanguageclassifier == 0) {
            return this.lang.language_classifierCreate(param);
        }
        else if (this.typeFormLanguageclassifier == 1) {
            return this.lang.language_classifierUpdate(param);
        }
        else if (this.typeFormLanguageclassifier == 2) {
            return this.lang.language_classifierDelete(param);
        }
    }
    onSubmitLanguageclassifier() {
        this.formLanguageclassifier.get("langId").setValue(this.langId);
        this.loadingLanguageclassifier = true;
        if (!this.isValidatorLanguage_classifier()) {
            this.toastr.warning("thie Name Exists", "Exists", {
                timeOut: 3000
            });
            return;
        }
        this.submitLanguageclassifier(this.formLanguageclassifier.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.language_classifier.lang_added_successfully, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.language_classifier.lang_deleted_successfully, "successfull", {
                    timeOut: 3000
                });
            }
            this.loadingLanguageclassifier = false;
            this.geLanguage_classifier(this.langId);
            this.submittedLanguageclassifier = false;
            this.formLanguageclassifier.reset();
            this.modalService.dismissAll();
        }, (err) => {
            if (err.message == 1001) {
                this.toastr.error(this.trans.users.error_1001, "error", {
                    timeOut: 3000
                });
                this.submitted = false;
            }
            else if (err.message == 55555) {
                this.submittedLanguageclassifier = false;
                this.toastr.error(this.trans.public.error_55555, "error", {
                    timeOut: 3000
                });
                this.s_Error.sendErorr(err.message, err.error);
            }
            this.loadingLanguageclassifier = false;
            this.submittedLanguageclassifier = false;
        });
    }
};
LanguagesComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
    { type: src_app_core_services_error_senderror_service__WEBPACK_IMPORTED_MODULE_7__["SenderrorService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"] },
    { type: src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_2__["LanguageService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_4__["TransService"] }
];
LanguagesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-languages',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./languages.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/languages/languages.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./languages.component.scss */ "./src/app/portals/settings/languages/languages.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
        src_app_core_services_error_senderror_service__WEBPACK_IMPORTED_MODULE_7__["SenderrorService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"], src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_2__["LanguageService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_4__["TransService"]])
], LanguagesComponent);



/***/ }),

/***/ "./src/app/portals/settings/memberships/memberships.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/portals/settings/memberships/memberships.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvbWVtYmVyc2hpcHMvbWVtYmVyc2hpcHMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/portals/settings/memberships/memberships.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/portals/settings/memberships/memberships.component.ts ***!
  \***********************************************************************/
/*! exports provided: MembershipsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MembershipsComponent", function() { return MembershipsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");







let MembershipsComponent = class MembershipsComponent {
    constructor(http, modelServices, formBuilder, tost) {
        this.http = http;
        this.modelServices = modelServices;
        this.formBuilder = formBuilder;
        this.tost = tost;
        this.Memberships = [];
        this.error = '';
        this.titleForm = "";
        this.submitted = false;
        this.idStatic = 0;
        //set Validators formMembership
        this.formMemberships = this.formBuilder.group({
            nameMembership: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            percentage: ['', this.ssnValidator],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Memberships', path: '/', active: true }];
    }
    ssnValidator(control) {
        if ((parseInt(control.value) || control.value == 0) && parseInt(control.value) <= 100 && parseInt(control.value) >= 0) {
            return null;
        }
        else {
            return { ssn: true };
        }
    }
    ngOnInit() {
        this.formMemberships.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.getAll();
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + "/memberships/getAll", {}).subscribe(res => {
            this.Memberships = res;
        });
    }
    get f() { return this.formMemberships.controls; }
    showModelMemberships(model, idStatic = null) {
        this.submitted = false;
        if (idStatic) {
            this.formMemberships.reset();
            this.titleForm = "Edit Membership";
            this.idStatic = idStatic;
            let mem = this.Memberships.find(x => x.id == idStatic);
            this.formMemberships.get("nameMembership").setValue(mem.nameMembership);
            this.formMemberships.get("percentage").setValue(mem.percentage);
            this.formMemberships.get("id").setValue(mem.id);
        }
        else {
            this.titleForm = "Add Membership";
            this.idStatic = -1;
            this.formMemberships.reset();
        }
        this.modelServices.open(model, { backdrop: 'static' });
    }
    create() {
        this.submitted = true;
        if (!this.formMemberships.valid) {
            return;
        }
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + '/memberships/create', this.formMemberships.value).subscribe(res => {
            if (res.message == 2000) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record added successfully", "successful");
            }
        });
    }
    Update() {
        this.submitted = true;
        if (!this.formMemberships.valid) {
            return;
        }
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + '/memberships/update', this.formMemberships.value).subscribe(res => {
            if (res.message == 2001) {
                this.tost.success("The record has been updated successfully", "successful");
                this.getAll();
                this.modelServices.dismissAll();
            }
        });
    }
    Save() {
        if (this.idStatic == -1) {
            this.create();
        }
        else {
            this.Update();
        }
    }
};
MembershipsComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
MembershipsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-memberships',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./memberships.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/memberships/memberships.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./memberships.component.scss */ "./src/app/portals/settings/memberships/memberships.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
], MembershipsComponent);



/***/ }),

/***/ "./src/app/portals/settings/notification/notification.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/portals/settings/notification/notification.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3Mvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/portals/settings/notification/notification.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/portals/settings/notification/notification.component.ts ***!
  \*************************************************************************/
/*! exports provided: NotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationComponent", function() { return NotificationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_core_services_notices_notices_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/notices/notices.service */ "./src/app/core/services/notices/notices.service.ts");



let NotificationComponent = class NotificationComponent {
    constructor(noti) {
        this.noti = noti;
        this.breadCrumbItems = [];
        this.allNotiFi = [];
    }
    ngOnInit() {
        this.getAllInformation();
        this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "SETTINGS", path: '/', active: true }, { label: "NOTIFICATIONS", path: '/', active: true }];
    }
    getAllInformation() {
        this.noti.getAll().subscribe(res => {
            this.allNotiFi = res;
            res.forEach(res => {
                if (typeof res.content == "string") {
                    res.content = JSON.parse(res.content);
                }
            });
        });
    }
    getTypeUser(typeUser) {
        if (typeUser == 1) {
            return "Admin";
        }
        else if (typeUser == 2) {
            return "Doctor";
        }
        else if (typeUser == 3) {
            return "Lab";
        }
        else if (typeUser == 4) {
            return "DentelCenter";
        }
        else if (typeUser == 5) {
            return "mediators";
        }
        else if (typeUser == 6) {
            return "webSite";
        }
        else {
            return typeUser;
        }
    }
    getTypeNotfi(type) {
        if (type == 1) {
            return "Insert";
        }
        else if (type == 2) {
            return "Update";
        }
        else if (type == 3) {
            return "Delete";
        }
        else if (type == 4) {
            return "disable";
        }
        else if (type == 5) {
            return "enabel";
        }
        else if (type == 6) {
            return "Login";
        }
        else if (type == 7) {
            return "Created";
        }
        else {
            return type;
        }
    }
    getDate(date) {
        let event = new Date(date);
        // return event.getFullYear()+"/"+event.getMonth()+"/"+event.getUTCDay()+" "+event.getHours()+":"+event.getMinutes()+":"+event.getSeconds();
        return event.toDateString() + " | " + event.getHours() + ":" + event.getMinutes() + ":" + event.getSeconds();
    }
};
NotificationComponent.ctorParameters = () => [
    { type: src_app_core_services_notices_notices_service__WEBPACK_IMPORTED_MODULE_2__["NoticesService"] }
];
NotificationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-notification',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./notification.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/notification/notification.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./notification.component.scss */ "./src/app/portals/settings/notification/notification.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_notices_notices_service__WEBPACK_IMPORTED_MODULE_2__["NoticesService"]])
], NotificationComponent);



/***/ }),

/***/ "./src/app/portals/settings/pricestrategy/pricestrategy.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/portals/settings/pricestrategy/pricestrategy.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3MvcHJpY2VzdHJhdGVneS9wcmljZXN0cmF0ZWd5LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/pricestrategy/pricestrategy.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/portals/settings/pricestrategy/pricestrategy.component.ts ***!
  \***************************************************************************/
/*! exports provided: PricestrategyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricestrategyComponent", function() { return PricestrategyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/city/city.service */ "./src/app/core/services/city/city.service.ts");
/* harmony import */ var src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/country/country.service */ "./src/app/core/services/country/country.service.ts");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core/services/currency/currency.service */ "./src/app/core/services/currency/currency.service.ts");










let PricestrategyComponent = class PricestrategyComponent {
    constructor(http, modelServices, formBuilder, tost, CountryService, CityService, currancyS) {
        this.http = http;
        this.modelServices = modelServices;
        this.formBuilder = formBuilder;
        this.tost = tost;
        this.CountryService = CountryService;
        this.CityService = CityService;
        this.currancyS = currancyS;
        this.imageUrl = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].url;
        this.currencModel = 1;
        this.Pricestrategy = [];
        this.doctors = [];
        this.error = '';
        this.titleForm = "";
        this.submitted = false;
        this.idStatic = 0;
        //set Validators formMembership
        this.formPricestrategy = this.formBuilder.group({
            nameStrategy: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            titleStrategy: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            countryId: ['', this.selectValidete],
            cityId: ['', this.selectValidete],
            doctorId: ['', this.selectValidete],
            form: ['', this.ssnValidator],
            to: ['', this.ssnValidator],
            type: ['', this.ssnValidator],
            Price: ['', this.ssnValidator],
            currencyId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Pricestrategy', path: '/', active: true }];
    }
    onChangeType() {
        if (this.formPricestrategy.get("type").value && this.formPricestrategy.get("type").value == 1) {
            this.formPricestrategy.get("doctorId").disable({ onlySelf: true });
            this.formPricestrategy.get("countryId").enable({ onlySelf: true });
            this.formPricestrategy.get("cityId").enable({ onlySelf: true });
            this.formPricestrategy.get("doctorId").setValue(-1);
        }
        else if (this.formPricestrategy.get("type").value && this.formPricestrategy.get("type").value == 2) {
            this.formPricestrategy.get("doctorId").enable({ onlySelf: true });
            this.formPricestrategy.get("countryId").disable({ onlySelf: true });
            this.formPricestrategy.get("cityId").disable({ onlySelf: true });
            this.formPricestrategy.get("countryId").setValue(-1);
            this.formPricestrategy.get("cityId").setValue(-1);
        }
    }
    selectValidete(control) {
        if (control.value == null || control.value == '') {
            return { ssn: true };
        }
        else {
            return null;
        }
    }
    ssnValidator(control) {
        if ((parseFloat(control.value) || control.value == 0)) {
            return null;
        }
        else {
            return { ssn: true };
        }
    }
    ngOnInit() {
        this.formPricestrategy.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.formPricestrategy.addControl('currencyCode', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.currancyS.getAllAndName().subscribe(res => {
            this.currency = res;
        });
        this.getCountry();
        this.getDoctors();
        this.getAll();
    }
    onChange() {
        if (this.formPricestrategy.get("countryId").value != undefined && this.formPricestrategy.get('countryId').value != "") {
            this.getCity(this.formPricestrategy.get("countryId").value);
        }
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].url + "/pricestrategy/getAll", {}).subscribe(res => {
            this.Pricestrategy = res.data;
        });
    }
    getCountry() {
        this.CountryService.getAllAndName().subscribe(res => {
            res.push({ "id": -1, "countryName": "All", "code": "qqq" });
            this.country = res;
        });
    }
    getCity(countryId, cityId = -1) {
        if (countryId == -1) {
            this.city = [{ "id": -1, "cityName": "ALL" }];
        }
        else {
            this.CityService.getAllAndNameById(countryId).subscribe(res => {
                res.push({ "id": -1, "cityName": "ALL" });
                this.city = res;
                this.formPricestrategy.get('cityId').setValue(cityId);
            });
        }
    }
    getDoctors() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].url + "/doctor/getAll", {}).subscribe(res => {
            res.push({ nameDoctor: 'ALL', id: -1, logo: 'https://cdn-icons-png.flaticon.com/128/5277/5277635.png' });
            this.doctors = res;
        });
    }
    get f() { return this.formPricestrategy.controls; }
    showPricestrategyModel(model, idStatic = null) {
        this.submitted = false;
        if (idStatic) {
            this.formPricestrategy.reset();
            this.titleForm = "Edit Price Strategy";
            this.idStatic = idStatic;
            let mem = this.Pricestrategy.find(x => x.id == idStatic);
            console.log(mem);
            this.formPricestrategy.get("nameStrategy").setValue(mem.nameStrategy);
            this.formPricestrategy.get("titleStrategy").setValue(mem.titleStrategy);
            this.formPricestrategy.get("countryId").setValue(mem.countryId);
            this.getCity(mem.countryId, mem.cityId);
            this.formPricestrategy.get("cityId").setValue(mem.cityId);
            this.formPricestrategy.get("doctorId").setValue(mem.doctorId);
            this.formPricestrategy.get("form").setValue(mem.form);
            this.formPricestrategy.get("to").setValue(mem.to);
            this.formPricestrategy.get("type").setValue(mem.type);
            this.formPricestrategy.get("id").setValue(mem.id);
            this.formPricestrategy.get("Price").setValue(mem.Price);
            this.formPricestrategy.get("currencyId").setValue(mem.currencyId);
            this.onChangeType();
        }
        else {
            this.titleForm = "Add Price Strategy";
            this.idStatic = -1;
            this.formPricestrategy.reset();
            this.formPricestrategy.get("type").setValue(1);
            this.formPricestrategy.get("doctorId").disable({ onlySelf: true });
            this.formPricestrategy.get("doctorId").setValue(-1);
            this.onChangeType();
        }
        this.modelServices.open(model, { backdrop: 'static' });
    }
    create() {
        this.submitted = true;
        if (!this.formPricestrategy.valid) {
            return;
        }
        this.formPricestrategy.get("currencyCode").setValue(this.currency.find(x => x.id == this.formPricestrategy.get("currencyId").value).symbol);
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].url + '/pricestrategy/create', this.formPricestrategy.getRawValue()).subscribe(res => {
            if (res.message == 2000) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record added successfully", "successful");
            }
        });
    }
    Update() {
        this.submitted = true;
        if (!this.formPricestrategy.valid) {
            return;
        }
        this.formPricestrategy.get("currencyCode").setValue(this.currency.find(x => x.id == this.formPricestrategy.get("currencyId").value).symbol);
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_8__["environment"].url + '/pricestrategy/update', this.formPricestrategy.value).subscribe(res => {
            if (res.message == 2001) {
                this.tost.success("The record has been updated successfully", "successful");
                this.getAll();
                this.modelServices.dismissAll();
            }
        });
    }
    Save() {
        if (this.idStatic == -1) {
            this.create();
        }
        else {
            this.Update();
        }
    }
};
PricestrategyComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
    { type: src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__["CountryService"] },
    { type: src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_6__["CityService"] },
    { type: _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_9__["CurrencyService"] }
];
PricestrategyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-pricestrategy',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./pricestrategy.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/pricestrategy/pricestrategy.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./pricestrategy.component.scss */ "./src/app/portals/settings/pricestrategy/pricestrategy.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
        src_app_core_services_country_country_service__WEBPACK_IMPORTED_MODULE_7__["CountryService"],
        src_app_core_services_city_city_service__WEBPACK_IMPORTED_MODULE_6__["CityService"],
        _core_services_currency_currency_service__WEBPACK_IMPORTED_MODULE_9__["CurrencyService"]])
], PricestrategyComponent);



/***/ }),

/***/ "./src/app/portals/settings/settings-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/portals/settings/settings-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: SettingsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsRoutingModule", function() { return SettingsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _users_users_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users/users.component */ "./src/app/portals/settings/users/users.component.ts");
/* harmony import */ var _general_general_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./general/general.component */ "./src/app/portals/settings/general/general.component.ts");
/* harmony import */ var _languages_languages_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/languages.component */ "./src/app/portals/settings/languages/languages.component.ts");
/* harmony import */ var _email_model_email_model_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./email-model/email-model.component */ "./src/app/portals/settings/email-model/email-model.component.ts");
/* harmony import */ var _currency_currency_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./currency/currency.component */ "./src/app/portals/settings/currency/currency.component.ts");
/* harmony import */ var _country_country_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./country/country.component */ "./src/app/portals/settings/country/country.component.ts");
/* harmony import */ var _city_city_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./city/city.component */ "./src/app/portals/settings/city/city.component.ts");
/* harmony import */ var _sms_model_sms_model_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sms-model/sms-model.component */ "./src/app/portals/settings/sms-model/sms-model.component.ts");
/* harmony import */ var _shipping_company_shipping_company_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shipping-company/shipping-company.component */ "./src/app/portals/settings/shipping-company/shipping-company.component.ts");
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./notification/notification.component */ "./src/app/portals/settings/notification/notification.component.ts");
/* harmony import */ var _info_users_info_users_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./info-users/info-users.component */ "./src/app/portals/settings/info-users/info-users.component.ts");
/* harmony import */ var _memberships_memberships_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./memberships/memberships.component */ "./src/app/portals/settings/memberships/memberships.component.ts");
/* harmony import */ var _pricestrategy_pricestrategy_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pricestrategy/pricestrategy.component */ "./src/app/portals/settings/pricestrategy/pricestrategy.component.ts");
/* harmony import */ var _barcodes_barcodes_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./barcodes/barcodes.component */ "./src/app/portals/settings/barcodes/barcodes.component.ts");
/* harmony import */ var _case_stage_case_stage_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./case-stage/case-stage.component */ "./src/app/portals/settings/case-stage/case-stage.component.ts");
/* harmony import */ var _function_prosess_function_prosess_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./function-prosess/function-prosess.component */ "./src/app/portals/settings/function-prosess/function-prosess.component.ts");
/* harmony import */ var _submtion_text_submtion_text_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./submtion-text/submtion-text.component */ "./src/app/portals/settings/submtion-text/submtion-text.component.ts");
/* harmony import */ var _whatsapp_whatsapp_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./whatsapp/whatsapp.component */ "./src/app/portals/settings/whatsapp/whatsapp.component.ts");
/* harmony import */ var _barnd_setting_barnd_setting_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./barnd-setting/barnd-setting.component */ "./src/app/portals/settings/barnd-setting/barnd-setting.component.ts");






















const routes = [
    {
        path: 'Users',
        component: _users_users_component__WEBPACK_IMPORTED_MODULE_3__["UsersComponent"]
    },
    {
        path: 'Memberships',
        component: _memberships_memberships_component__WEBPACK_IMPORTED_MODULE_14__["MembershipsComponent"]
    },
    {
        path: 'barcodes',
        component: _barcodes_barcodes_component__WEBPACK_IMPORTED_MODULE_16__["BarcodesComponent"]
    }, {
        path: 'caseStage',
        component: _case_stage_case_stage_component__WEBPACK_IMPORTED_MODULE_17__["CaseStageComponent"]
    }, {
        path: 'SubmtionText',
        component: _submtion_text_submtion_text_component__WEBPACK_IMPORTED_MODULE_19__["SubmtionTextComponent"]
    },
    {
        path: 'PricingStrategies',
        component: _pricestrategy_pricestrategy_component__WEBPACK_IMPORTED_MODULE_15__["PricestrategyComponent"]
    },
    {
        path: 'BrandSetting',
        component: _barnd_setting_barnd_setting_component__WEBPACK_IMPORTED_MODULE_21__["BarndSettingComponent"]
    },
    {
        path: 'General',
        component: _general_general_component__WEBPACK_IMPORTED_MODULE_4__["GeneralComponent"]
    },
    {
        path: 'Languages',
        component: _languages_languages_component__WEBPACK_IMPORTED_MODULE_5__["LanguagesComponent"]
    },
    {
        path: 'EmailModel',
        component: _email_model_email_model_component__WEBPACK_IMPORTED_MODULE_6__["EmailModelComponent"]
    },
    {
        path: 'Currency',
        component: _currency_currency_component__WEBPACK_IMPORTED_MODULE_7__["CurrencyComponent"]
    },
    {
        path: 'Country',
        component: _country_country_component__WEBPACK_IMPORTED_MODULE_8__["CountryComponent"]
    },
    {
        path: 'City',
        component: _city_city_component__WEBPACK_IMPORTED_MODULE_9__["CityComponent"]
    },
    {
        path: 'EmailModel',
        component: _city_city_component__WEBPACK_IMPORTED_MODULE_9__["CityComponent"]
    },
    {
        path: 'SmsModel',
        component: _sms_model_sms_model_component__WEBPACK_IMPORTED_MODULE_10__["SmsModelComponent"]
    },
    {
        path: 'ShippingCompany',
        component: _shipping_company_shipping_company_component__WEBPACK_IMPORTED_MODULE_11__["ShippingCompanyComponent"]
    },
    {
        path: 'notification',
        component: _notification_notification_component__WEBPACK_IMPORTED_MODULE_12__["NotificationComponent"]
    },
    {
        path: 'function',
        component: _function_prosess_function_prosess_component__WEBPACK_IMPORTED_MODULE_18__["FunctionProsessComponent"]
    },
    {
        path: 'infoUser',
        component: _info_users_info_users_component__WEBPACK_IMPORTED_MODULE_13__["InfoUsersComponent"]
    },
    {
        path: 'WP',
        component: _whatsapp_whatsapp_component__WEBPACK_IMPORTED_MODULE_20__["WhatsappComponent"]
    }
];
let SettingsRoutingModule = class SettingsRoutingModule {
};
SettingsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], SettingsRoutingModule);



/***/ }),

/***/ "./src/app/portals/settings/settings.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/portals/settings/settings.module.ts ***!
  \*****************************************************/
/*! exports provided: SettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-routing.module */ "./src/app/portals/settings/settings-routing.module.ts");
/* harmony import */ var _users_users_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users/users.component */ "./src/app/portals/settings/users/users.component.ts");
/* harmony import */ var _shared_ui_ui_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/ui/ui.module */ "./src/app/shared/ui/ui.module.ts");
/* harmony import */ var ngx_ui_switch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-ui-switch */ "./node_modules/ngx-ui-switch/ui-switch.es2015.js");
/* harmony import */ var _general_general_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./general/general.component */ "./src/app/portals/settings/general/general.component.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm2015/ng-select-ng-select.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-intl-tel-input */ "./node_modules/ngx-intl-tel-input/fesm2015/ngx-intl-tel-input.js");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/fesm2015/ngx-image-cropper.js");
/* harmony import */ var _languages_languages_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./languages/languages.component */ "./src/app/portals/settings/languages/languages.component.ts");
/* harmony import */ var _email_model_email_model_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./email-model/email-model.component */ "./src/app/portals/settings/email-model/email-model.component.ts");
/* harmony import */ var ngx_flag_icon_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-flag-icon-css */ "./node_modules/ngx-flag-icon-css/fesm2015/ngx-flag-icon-css.js");
/* harmony import */ var _currency_currency_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./currency/currency.component */ "./src/app/portals/settings/currency/currency.component.ts");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-mask */ "./node_modules/ngx-mask/fesm2015/ngx-mask.js");
/* harmony import */ var _country_country_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./country/country.component */ "./src/app/portals/settings/country/country.component.ts");
/* harmony import */ var _city_city_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./city/city.component */ "./src/app/portals/settings/city/city.component.ts");
/* harmony import */ var ngx_editor__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-editor */ "./node_modules/ngx-editor/fesm2015/ngx-editor.js");
/* harmony import */ var _sms_model_sms_model_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./sms-model/sms-model.component */ "./src/app/portals/settings/sms-model/sms-model.component.ts");
/* harmony import */ var _shared_common_common_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../shared/common/common.module */ "./src/app/shared/common/common.module.ts");
/* harmony import */ var _shipping_company_shipping_company_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./shipping-company/shipping-company.component */ "./src/app/portals/settings/shipping-company/shipping-company.component.ts");
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./notification/notification.component */ "./src/app/portals/settings/notification/notification.component.ts");
/* harmony import */ var _info_users_info_users_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./info-users/info-users.component */ "./src/app/portals/settings/info-users/info-users.component.ts");
/* harmony import */ var _memberships_memberships_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./memberships/memberships.component */ "./src/app/portals/settings/memberships/memberships.component.ts");
/* harmony import */ var _pricestrategy_pricestrategy_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./pricestrategy/pricestrategy.component */ "./src/app/portals/settings/pricestrategy/pricestrategy.component.ts");
/* harmony import */ var _barcodes_barcodes_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./barcodes/barcodes.component */ "./src/app/portals/settings/barcodes/barcodes.component.ts");
/* harmony import */ var _case_stage_case_stage_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./case-stage/case-stage.component */ "./src/app/portals/settings/case-stage/case-stage.component.ts");
/* harmony import */ var _function_prosess_function_prosess_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./function-prosess/function-prosess.component */ "./src/app/portals/settings/function-prosess/function-prosess.component.ts");
/* harmony import */ var _submtion_text_submtion_text_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./submtion-text/submtion-text.component */ "./src/app/portals/settings/submtion-text/submtion-text.component.ts");
/* harmony import */ var _whatsapp_whatsapp_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./whatsapp/whatsapp.component */ "./src/app/portals/settings/whatsapp/whatsapp.component.ts");
/* harmony import */ var _barnd_setting_barnd_setting_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./barnd-setting/barnd-setting.component */ "./src/app/portals/settings/barnd-setting/barnd-setting.component.ts");



































let SettingsModule = class SettingsModule {
};
SettingsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_users_users_component__WEBPACK_IMPORTED_MODULE_5__["UsersComponent"], _general_general_component__WEBPACK_IMPORTED_MODULE_8__["GeneralComponent"], _languages_languages_component__WEBPACK_IMPORTED_MODULE_14__["LanguagesComponent"], _email_model_email_model_component__WEBPACK_IMPORTED_MODULE_15__["EmailModelComponent"], _currency_currency_component__WEBPACK_IMPORTED_MODULE_17__["CurrencyComponent"], _country_country_component__WEBPACK_IMPORTED_MODULE_19__["CountryComponent"], _city_city_component__WEBPACK_IMPORTED_MODULE_20__["CityComponent"], _sms_model_sms_model_component__WEBPACK_IMPORTED_MODULE_22__["SmsModelComponent"], _shipping_company_shipping_company_component__WEBPACK_IMPORTED_MODULE_24__["ShippingCompanyComponent"], _notification_notification_component__WEBPACK_IMPORTED_MODULE_25__["NotificationComponent"], _info_users_info_users_component__WEBPACK_IMPORTED_MODULE_26__["InfoUsersComponent"], _memberships_memberships_component__WEBPACK_IMPORTED_MODULE_27__["MembershipsComponent"], _pricestrategy_pricestrategy_component__WEBPACK_IMPORTED_MODULE_28__["PricestrategyComponent"], _barcodes_barcodes_component__WEBPACK_IMPORTED_MODULE_29__["BarcodesComponent"], _case_stage_case_stage_component__WEBPACK_IMPORTED_MODULE_30__["CaseStageComponent"], _function_prosess_function_prosess_component__WEBPACK_IMPORTED_MODULE_31__["FunctionProsessComponent"], _submtion_text_submtion_text_component__WEBPACK_IMPORTED_MODULE_32__["SubmtionTextComponent"], _whatsapp_whatsapp_component__WEBPACK_IMPORTED_MODULE_33__["WhatsappComponent"], _barnd_setting_barnd_setting_component__WEBPACK_IMPORTED_MODULE_34__["BarndSettingComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _shared_ui_ui_module__WEBPACK_IMPORTED_MODULE_6__["UIModule"],
            _shared_common_common_module__WEBPACK_IMPORTED_MODULE_23__["CommonsModule"],
            _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__["NgSelectModule"],
            _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__["SettingsRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbAlertModule"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_11__["BsDropdownModule"].forRoot(),
            ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_12__["NgxIntlTelInputModule"],
            ngx_image_cropper__WEBPACK_IMPORTED_MODULE_13__["ImageCropperModule"],
            ngx_ui_switch__WEBPACK_IMPORTED_MODULE_7__["UiSwitchModule"],
            ngx_flag_icon_css__WEBPACK_IMPORTED_MODULE_16__["NgxFlagIconCssModule"],
            ngx_mask__WEBPACK_IMPORTED_MODULE_18__["NgxMaskModule"].forRoot(),
            ngx_editor__WEBPACK_IMPORTED_MODULE_21__["NgxEditorModule"]
        ]
    })
], SettingsModule);



/***/ }),

/***/ "./src/app/portals/settings/shipping-company/shipping-company.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/portals/settings/shipping-company/shipping-company.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3Mvc2hpcHBpbmctY29tcGFueS9zaGlwcGluZy1jb21wYW55LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/shipping-company/shipping-company.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/portals/settings/shipping-company/shipping-company.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ShippingCompanyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShippingCompanyComponent", function() { return ShippingCompanyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var src_app_core_services_shippingCompany_shipping_company_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/shippingCompany/shipping-company.service */ "./src/app/core/services/shippingCompany/shipping-company.service.ts");







let ShippingCompanyComponent = class ShippingCompanyComponent {
    constructor(toastr, modal, transs, shipp) {
        this.toastr = toastr;
        this.modal = modal;
        this.transs = transs;
        this.shipp = shipp;
        this.shippingName = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("");
        this.key = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("");
        this.value = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("");
        this.typeForm = 0;
        this.titleForm = "add Param";
        this.idParam = 0;
    }
    ngOnInit() {
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res;
            this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "SETTINGS", path: '/', active: true }, { label: "SHIPPING SETTINGS", path: '/', active: true }];
        });
        this.getAllCompany();
    }
    getAllCompany() {
        this.shipp.getAll().subscribe(res => {
            this.shippingCompany = res;
        });
    }
    AddCompany(content) {
        this.shippingName.setValue("");
        this.modal.open(content, { backdrop: 'static' });
    }
    getAllParam(shippingCompanyId) {
        this.shippingCompanyId = shippingCompanyId;
        this.shipp.getParamById(shippingCompanyId).subscribe(res => {
            this.shippingParam = res;
        });
    }
    createCompany() {
        if (this.shippingName.value == "") {
            this.toastr.warning("please input all filed ");
            return;
        }
        this.shipp.create({ shippingName: this.shippingName.value }).subscribe(res => {
            if (res.message == 2000) {
                this.toastr.success("this compaby created successfuly");
            }
            this.getAllCompany();
            this.modal.dismissAll();
        }, err => {
            if (err.message == 55555) {
                this.toastr.error("Unkniow Error ", "Error");
            }
            else if (err.message == 1001) {
                this.toastr.warning("this company is exsit please add other company ");
            }
        });
    }
    getStatus(status) {
        if (status == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    DeleteCompany(id) {
        this.shipp.delete(id).subscribe(res => {
            this.toastr.warning("this company dileted ", "Delete");
        });
    }
    onChangeStatus($event, id) {
        let status = 0;
        if ($event == true) {
            status = 1;
        }
        this.shipp.activeAndDeActivted(id, status).subscribe(res => {
            if ($event == 1) {
                this.toastr.success("this is activted");
            }
            else {
                this.toastr.warning("this is company is deactvited");
            }
            this.getAllCompany();
        }, err => {
            this.toastr.warning("this prossing is not compleated");
            this.getAllCompany();
        });
    }
    putValueControllerParam(id) {
        this.key.setValue(this.shippingParam.find(x => x.id == id).key);
        this.value.setValue(this.shippingParam.find(x => x.id == id).value);
    }
    clearParamValue() {
        this.key.setValue("");
        this.value.setValue("");
    }
    EnableParam() {
        this.key.enable({ onlySelf: true });
        this.value.enable({ onlySelf: true });
    }
    DisableParam() {
        this.key.disable({ onlySelf: true });
        this.value.disable({ onlySelf: true });
    }
    AddParam(content) {
        this.clearParamValue();
        this.EnableParam();
        this.typeForm = 0;
        this.idParam = -1;
        this.titleForm = "Add Param Form";
        this.modal.open(content, { backdrop: "static" });
    }
    EditParam(content, id) {
        this.putValueControllerParam(id);
        this.EnableParam();
        this.typeForm = 1;
        this.idParam = id;
        this.titleForm = "Edit Value Param ";
        this.modal.open(content, { backdrop: "static" });
    }
    DeleteParam(content, id) {
        this.putValueControllerParam(id);
        this.DisableParam();
        this.idParam = id;
        this.typeForm = 2;
        this.titleForm = "Delete Paramter ";
        this.modal.open(content, { backdrop: "static" });
    }
    Onsubmit(param) {
        if (this.typeForm == 0) {
            return this.shipp.createParam(param);
        }
        else if (this.typeForm == 1) {
            return this.shipp.updateParam(param);
        }
        else if (this.typeForm == 2) {
            return this.shipp.deleteParam(this.idParam);
        }
    }
    submitParam() {
        this.Onsubmit({ id: this.idParam, key: this.key.value, value: this.value.value, shippingCompanyId: this.shippingCompanyId }).subscribe((res) => {
            if (res.message == 2000) {
                this.toastr.success("this compaby created successfuly");
            }
            else if (res.message == 2001) {
                this.toastr.success("this compaby created update");
            }
            else if (res.message == 2002) {
                this.toastr.success("this compaby created Delete");
            }
            this.getAllParam(this.shippingCompanyId);
            this.modal.dismissAll();
        }, err => {
            if (err.message == 55555) {
                this.toastr.error("Unkniow Error ", "Error");
            }
            else if (err.message == 1001) {
                this.toastr.warning("this company is exsit please add other company ");
            }
        });
    }
};
ShippingCompanyComponent.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_5__["TransService"] },
    { type: src_app_core_services_shippingCompany_shipping_company_service__WEBPACK_IMPORTED_MODULE_6__["ShippingCompanyService"] }
];
ShippingCompanyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-shipping-company',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./shipping-company.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/shipping-company/shipping-company.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./shipping-company.component.scss */ "./src/app/portals/settings/shipping-company/shipping-company.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_5__["TransService"],
        src_app_core_services_shippingCompany_shipping_company_service__WEBPACK_IMPORTED_MODULE_6__["ShippingCompanyService"]])
], ShippingCompanyComponent);



/***/ }),

/***/ "./src/app/portals/settings/sms-model/sms-model.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/portals/settings/sms-model/sms-model.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3Mvc21zLW1vZGVsL3Ntcy1tb2RlbC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/portals/settings/sms-model/sms-model.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/portals/settings/sms-model/sms-model.component.ts ***!
  \*******************************************************************/
/*! exports provided: SmsModelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmsModelComponent", function() { return SmsModelComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_sms_model_sms_model_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/sms_model/sms-model.service */ "./src/app/core/services/sms_model/sms-model.service.ts");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/language/language.service */ "./src/app/core/services/language/language.service.ts");








let SmsModelComponent = class SmsModelComponent {
    constructor(transs, SmsModelService, formBuilder, modalService, toastr, lang) {
        this.transs = transs;
        this.SmsModelService = SmsModelService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.lang = lang;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "Add SMS MODEL";
        this.typeForm = 0;
        this.smsModelId = -1;
        this.submittedContent = false;
        this.errorContent = '';
        this.loadingContent = false;
        this.titleFormContent = "ADD CONTENT";
        this.typeFormContent = 0;
        this.ngEditContent = true;
    }
    get f() { return this.formSms_model.controls; }
    get fn() { return this.formcontent_Sms_model.controls; }
    ngOnInit() {
        this.Trans = this.transs.trans.subscribe(res => {
            this.trans = res.key;
            this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "SETTINGS", path: '/', active: true }, { label: "SMS MODEL", path: '/', active: true }];
        });
        this.Email_model = this.SmsModelService.getll_email_model().subscribe(res => {
            this.sms_model = res;
        });
        this.SmsModelService.getAll();
        //Form validators 
        this.formSms_model = this.formBuilder.group({
            nameModel: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
        this.formSms_model.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        //Form validators 
        this.formcontent_Sms_model = this.formBuilder.group({
            content_model: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            langId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.formcontent_Sms_model.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
        this.formcontent_Sms_model.addControl('sms_model_id', new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](""));
    }
    getLang() {
        this.lang.getAllLanguageAndClassfier().subscribe(res => {
            this.Language = res;
        });
    }
    getCodeLang(id) {
        if (this.Language.find(x => x.id == id) == undefined) {
            return this.trans.contentEmailModel.thislanguageitisstop;
        }
        else {
            return this.Language.find(x => x.id == id).langCode;
        }
    }
    ngOnDestroy() {
        this.Trans.unsubscribe();
        this.Email_model.unsubscribe();
    }
    status(status) {
        if (status == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    ChangeStatus(event, id) {
        if (event) {
            return this.SmsModelService.deactivate_or_activate(id, 1);
        }
        else {
            return this.SmsModelService.deactivate_or_activate(id, 0);
        }
    }
    onChangeStatus($event, id) {
        this.ChangeStatus($event, id).subscribe(res => {
            if ($event) {
                this.toastr.success(this.trans.emailModel.TheEmail_modelHasBeenActivated, "successfull", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.warning(this.trans.emailModel.Email_modelHasBeenDeactivated, "warning", {
                    timeOut: 3000
                });
            }
        }, err => {
            if (err = 2010) {
                this.toastr.warning(this.trans.emailModel.YouMustHaveAtLeastOneName, "warning", {
                    timeOut: 3000
                });
                this.SmsModelService.getAll();
            }
            else {
                this.toastr.error(this.trans.emailModel.UnknownError, "error", {
                    timeOut: 3000
                });
            }
        });
    }
    putValueForm(id) {
        this.formSms_model.get('id').setValue(this.sms_model.find(x => x.id == id).id);
        this.formSms_model.get('nameModel').setValue(this.sms_model.find(x => x.id == id).nameModel);
    }
    disableForm() {
        this.formSms_model.disable({ onlySelf: true });
    }
    enableForm() {
        this.formSms_model.enable({ onlySelf: true });
    }
    add(content) {
        this.enableForm();
        this.formSms_model.reset();
        this.typeForm = 0;
        this.titleForm = "ADD MODEL";
        this.modalService.open(content, { backdrop: 'static' });
    }
    edit(id) {
        this.getLang();
        this.smsModelId = id;
        this.titleForm = "EDIT MODEL";
        this.getAllContent();
    }
    delete(content, id) {
        this.formSms_model.reset();
        this.putValueForm(id);
        this.disableForm();
        this.typeForm = 2;
        this.titleForm = "DELETE MODEL";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.SmsModelService.create(param);
        }
        else {
            return this.SmsModelService.delete(this.formSms_model.value);
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.formSms_model.invalid) {
            return;
        }
        this.loading = true;
        this.submit(this.formSms_model.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.emailModel.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.emailModel.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.SmsModelService.getAll();
            this.loading = false;
            this.submitted = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.emailModel.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.emailModel.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.emailModel.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loading = false;
        });
    }
    onChange(event) {
        // this.formEmail_model.get('code').setValue(this.formEmail_model.get('code').value.toLowerCase())
    }
    //Content
    putValueFormContent(id) {
        this.formcontent_Sms_model.get('id').setValue(this.content_sms_model.find(x => x.id == id).id);
        this.formcontent_Sms_model.get('content_model').setValue(this.content_sms_model.find(x => x.id == id).content_model);
        this.formcontent_Sms_model.get('sms_model_id').setValue(this.content_sms_model.find(x => x.id == id).sms_model_id);
        this.formcontent_Sms_model.get('langId').setValue(this.content_sms_model.find(x => x.id == id).langId);
    }
    disableFormContent() {
        this.formcontent_Sms_model.disable({ onlySelf: true });
        this.ngEditContent = false;
    }
    enableFormContent() {
        this.formcontent_Sms_model.enable({ onlySelf: true });
        this.ngEditContent = true;
    }
    addContent(content) {
        if (this.smsModelId != -1) {
            this.enableFormContent();
            this.getLang();
            this.formcontent_Sms_model.reset();
            this.typeFormContent = 0;
            this.titleFormContent = "ADD CONTENT";
            this.modalService.open(content, { backdrop: 'static' });
            this.formcontent_Sms_model.get('sms_model_id').setValue(this.smsModelId);
        }
    }
    editContent(content, id) {
        this.formcontent_Sms_model.reset();
        this.putValueFormContent(id);
        this.formcontent_Sms_model.get('langId').disable({ onlySelf: true });
        this.typeFormContent = 1;
        this.titleFormContent = "EDIT CONTENT";
        this.modalService.open(content, { backdrop: 'static' });
    }
    getAllContent() {
        this.SmsModelService.getllContentById(this.smsModelId).subscribe(res => {
            this.content_sms_model = res;
        });
    }
    deleteContent(content, id) {
        this.formcontent_Sms_model.reset();
        this.putValueFormContent(id);
        this.disableFormContent();
        this.typeFormContent = 2;
        this.titleFormContent = "DELETE CONTENT";
        this.modalService.open(content, { backdrop: 'static' });
    }
    submitContent(param) {
        if (this.typeFormContent == 0) {
            return this.SmsModelService.createContent(param);
        }
        else if (this.typeFormContent == 2) {
            return this.SmsModelService.deleteConent(param);
        }
        else if (this.typeFormContent == 1) {
            return this.SmsModelService.updateContent(param);
        }
    }
    onSubmitContent() {
        this.submittedContent = true;
        if (this.formcontent_Sms_model.invalid) {
            return;
        }
        this.loadingContent = true;
        this.submitContent(this.formcontent_Sms_model.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.contentEmailModel.addSuccessfull, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2002 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.contentEmailModel.deletedSuccessfully, "Deleted", {
                    timeOut: 3000
                });
            }
            this.modalService.dismissAll();
            this.getAllContent();
            this.loadingContent = false;
            this.submittedContent = false;
        }, err => {
            ;
            if (err == 1001) //2002 it means this number is deleted successfully
             {
                this.toastr.error(this.trans.emailModel.SimilarRecordsCannotbeAdded, "error", {
                    timeOut: 3000
                });
            }
            else if (err == 2008) {
                this.toastr.error(this.trans.emailModel.TheCodeIsInvalid, "error", {
                    timeOut: 3000
                });
            }
            else {
                this.toastr.error(this.trans.emailModel.UnknownError, "error", {
                    timeOut: 3000
                });
            }
            this.loadingContent = false;
        });
    }
};
SmsModelComponent.ctorParameters = () => [
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"] },
    { type: _core_services_sms_model_sms_model_service__WEBPACK_IMPORTED_MODULE_2__["SmsModelService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
    { type: src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"] }
];
SmsModelComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-sms-model',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./sms-model.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/sms-model/sms-model.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./sms-model.component.scss */ "./src/app/portals/settings/sms-model/sms-model.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_3__["TransService"],
        _core_services_sms_model_sms_model_service__WEBPACK_IMPORTED_MODULE_2__["SmsModelService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
        src_app_core_services_language_language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"]])
], SmsModelComponent);



/***/ }),

/***/ "./src/app/portals/settings/submtion-text/submtion-text.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/portals/settings/submtion-text/submtion-text.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3Mvc3VibXRpb24tdGV4dC9zdWJtdGlvbi10ZXh0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/portals/settings/submtion-text/submtion-text.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/portals/settings/submtion-text/submtion-text.component.ts ***!
  \***************************************************************************/
/*! exports provided: SubmtionTextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmtionTextComponent", function() { return SubmtionTextComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");







let SubmtionTextComponent = class SubmtionTextComponent {
    constructor(http, modelServices, formBuilder, tost) {
        this.http = http;
        this.modelServices = modelServices;
        this.formBuilder = formBuilder;
        this.tost = tost;
        this.Submtion = [];
        this.StageType = [
            { nameType: 'Internal', id: 1 },
            { nameType: 'External', id: 0 },
        ];
        this.error = '';
        this.titleForm = "";
        this.submitted = false;
        this.idStatic = 0;
        //set Validators formMembership
        this.formBarcodes = this.formBuilder.group({
            nameKey: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            shurtContent: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Submtion Text', path: '/', active: true }];
    }
    ssnValidator(control) {
        if ((parseInt(control.value) || control.value == 0) && parseInt(control.value) <= 100 && parseInt(control.value) >= 0) {
            return null;
        }
        else {
            return { ssn: true };
        }
    }
    ngOnInit() {
        this.formBarcodes.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.formBarcodes.addControl('Content', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](-1));
        this.getAll();
    }
    getEditor(event) {
        this.editor = event;
    }
    getAll() {
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + "/SubmtionText/get", {}).subscribe(res => {
            this.Submtion = res;
        });
    }
    get f() { return this.formBarcodes.controls; }
    showModelMemberships(model, idStatic = null) {
        this.submitted = false;
        if (idStatic) {
            this.formBarcodes.reset();
            this.titleForm = "Edit Content";
            this.idStatic = idStatic;
            let mem = this.Submtion.find(x => x.id == idStatic);
            this.formBarcodes.get("nameKey").setValue(mem.nameKey);
            this.formBarcodes.get("shurtContent").setValue(mem.shurtContent);
            this.formBarcodes.get("id").setValue(mem.id);
            this.valueNotes = mem.Content;
        }
        else {
            this.titleForm = "Add Key";
            this.idStatic = -1;
            this.formBarcodes.reset();
        }
        this.modelServices.open(model, { backdrop: 'static' });
    }
    create() {
        this.submitted = true;
        if (!this.formBarcodes.valid) {
            return;
        }
        this.formBarcodes.get('Content').setValue(this.editor.getData());
        this.http.post(src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].url + '/SubmtionText/createAndUpdate', this.formBarcodes.value).subscribe(res => {
            if (res.message == 2000) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record added successfully", "successful");
            }
            else if (res.message == 2001) {
                this.getAll();
                this.modelServices.dismissAll();
                this.tost.success("Record Updateded successfully", "successful");
            }
        });
    }
    Save() {
        this.create();
    }
};
SubmtionTextComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
SubmtionTextComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-submtion-text',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./submtion-text.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/submtion-text/submtion-text.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./submtion-text.component.scss */ "./src/app/portals/settings/submtion-text/submtion-text.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
], SubmtionTextComponent);



/***/ }),

/***/ "./src/app/portals/settings/users/users.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/portals/settings/users/users.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".intl-tel-input {\n  width: 100%;\n}\n\n.cropper .ng-star-inserted {\n  min-width: 100px;\n  min-height: 100px;\n}\n\n.imageuser {\n  width: 60px;\n  border: 1px solid #6b6b6b;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWVyZ2hqamV5L0RvY3VtZW50cy9Qcm9qZWN0cy9QYXJpc2FsaW5lT2xkL2FkbWluL3NyYy9hcHAvcG9ydGFscy9zZXR0aW5ncy91c2Vycy91c2Vycy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcG9ydGFscy9zZXR0aW5ncy91c2Vycy91c2Vycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7QUNDSjs7QURDQTtFQUNJLGdCQUFBO0VBQ0EsaUJBQUE7QUNFSjs7QURBRTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtBQ0dKIiwiZmlsZSI6InNyYy9hcHAvcG9ydGFscy9zZXR0aW5ncy91c2Vycy91c2Vycy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbnRsLXRlbC1pbnB1dCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4uY3JvcHBlciAubmctc3Rhci1pbnNlcnRlZCB7XG4gICAgbWluLXdpZHRoOiAxMDBweDtcbiAgICBtaW4taGVpZ2h0OiAxMDBweDtcbiAgfVxuICAuaW1hZ2V1c2Vye1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICM2YjZiNmI7XG4gIH0iLCIuaW50bC10ZWwtaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNyb3BwZXIgLm5nLXN0YXItaW5zZXJ0ZWQge1xuICBtaW4td2lkdGg6IDEwMHB4O1xuICBtaW4taGVpZ2h0OiAxMDBweDtcbn1cblxuLmltYWdldXNlciB7XG4gIHdpZHRoOiA2MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjNmI2YjZiO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/portals/settings/users/users.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/portals/settings/users/users.component.ts ***!
  \***********************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var src_app_core_services_users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/users/users.service */ "./src/app/core/services/users/users.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/translation/trans.service */ "./src/app/core/services/translation/trans.service.ts");
/* harmony import */ var ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-intl-tel-input */ "./node_modules/ngx-intl-tel-input/fesm2015/ngx-intl-tel-input.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/fesm2015/ngx-image-cropper.js");
/* harmony import */ var src_app_core_services_error_senderror_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/error/senderror.service */ "./src/app/core/services/error/senderror.service.ts");
/* harmony import */ var src_app_core_services_other_imagebase64_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/other/imagebase64.service */ "./src/app/core/services/other/imagebase64.service.ts");













let UsersComponent = class UsersComponent {
    constructor(base64, s_Error, http, toastr, transs, formBuilder, modalService, usersService) {
        this.base64 = base64;
        this.s_Error = s_Error;
        this.http = http;
        this.toastr = toastr;
        this.transs = transs;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.usersService = usersService;
        this.USERTYPE = 1;
        this.ID = 1;
        this.url = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url;
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.separateDialCode = true;
        this.SearchCountryField = ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__["SearchCountryField"];
        this.TooltipLabel = ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__["TooltipLabel"];
        this.CountryISO = ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__["CountryISO"];
        this.preferredCountries = [ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__["CountryISO"].UnitedStates, ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__["CountryISO"].UnitedKingdom];
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.titleForm = "Add Users";
        this.typeForm = 0;
        this.ControllerPhoto = true;
        //observabel translation object
        this.preferredCountries = [ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__["CountryISO"].India, ngx_intl_tel_input__WEBPACK_IMPORTED_MODULE_7__["CountryISO"].Canada];
        transs.trans.subscribe(res => {
            this.trans = res.key;
        });
    }
    ngOnInit() {
        //Validate all field form
        this.formUser = this.formBuilder.group({
            role: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            first_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            telephone_number: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            last_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
        });
        //set title root
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'USERS', path: '/', active: true }];
        //get all users 
        this.usersService.getUsers().subscribe(res => {
            if (res) {
                this.users = res;
            }
        });
        //create controller image base64
        this.formUser.addControl('imagebase64', new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]("this.croppedImage"));
        this.formUser.addControl('id', new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](-1));
        this.usersService.getAll();
    }
    ngAfterViewInit() {
        this.formUser.controls.telephone_number.setValue('+919898989898');
    }
    // convenience getter for easy access to form fields
    get f() { return this.formUser.controls; }
    onFileSelect(event) {
        //check type image 
        let name = event.target.files[0].name;
        if (name.split('.')[name.split('.').length - 1].toUpperCase() == 'PNG' ||
            name.split('.')[name.split('.').length - 1].toUpperCase() == 'JPG' ||
            name.split('.')[name.split('.').length - 1].toUpperCase() == 'JPEG' ||
            name.split('.')[name.split('.').length - 1].toUpperCase() == 'TIF') {
            this.base64.convertImageToBase64(event.target.files[0]).subscribe(res => {
                this.imageChangedEvent = res;
            });
        }
        else {
            this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning", {
                timeOut: 3000
            });
        }
    }
    imageCropped(event) {
        this.croppedImage = event.base64;
    }
    /*
     Informtion Mode
     Add : 0
     Edit : 1
     Remove : 2
    */
    //Open Modal in (0) mode 
    addUser(content) {
        this.enableController(null, true);
        this.ControllerPhoto = true;
        this.typeForm = 0;
        this.titleForm = this.trans.users.TitleForm_add_Users;
        this.formUser.reset();
        this.modalService.open(content, { backdrop: 'static' });
        this.imageChangedEvent = '';
    }
    //Open Modal in (1) mode
    editUser(content, id) {
        this.putValueController(id);
        this.disableController('email');
        this.ControllerPhoto = true;
        this.typeForm = 1;
        this.titleForm = this.trans.users.TitleForm_edit_Users;
        this.modalService.open(content, { backdrop: 'static' });
        this.base64.convertImageUrlToBase64(this.url + '/' + this.users.find(x => x.id == id).photo).subscribe(res => {
            this.imageChangedEvent = res;
        });
    }
    //Open Modal in (2) mode
    removeUser(content, id) {
        this.loading = true;
        this.putValueController(id);
        this.disableController(null, true);
        this.ControllerPhoto = false;
        this.formUser.get('id').setValue(id);
        this.typeForm = 2;
        this.titleForm = this.trans.users.TitleForm_remove_Users;
        this.modalService.open(content, { backdrop: 'static' });
        this.base64.convertImageUrlToBase64(this.url + '/' + this.users.find(x => x.id == id).photo).subscribe(res => {
            this.imageChangedEvent = res;
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    }
    //this submit formUsers
    onSubmit() {
        this.submitted = true;
        if (this.formUser.invalid) {
            return;
        }
        this.formUser.get('imagebase64').setValue(this.croppedImage);
        this.loading = true;
        this.submit(this.formUser.value).subscribe(res => {
            if (res.message == 2000) //2000 it means this number is added successfully
             {
                this.toastr.success(this.trans.users.User_added_successfully, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2001) //2001 it means this number is updated successfully
             {
                this.toastr.success(this.trans.users.User_updated_successfully, "successfull", {
                    timeOut: 3000
                });
            }
            else if (res.message == 2002) //2001 it means this number is deleted successfully
             {
                this.toastr.success(this.trans.users.User_deleted_successfully, "successfull", {
                    timeOut: 3000
                });
            }
            this.loading = false;
            this.usersService.getAll();
            this.submitted = false;
            this.formUser.reset();
            this.modalService.dismissAll();
        }, (err) => {
            if (err.message == 1001) {
                this.toastr.error(this.trans.users.error_1001, "error", {
                    timeOut: 3000
                });
                this.submitted = false;
            }
            else if (err.message == 55555) {
                this.submitted = false;
                this.toastr.error(this.trans.public.error_55555, "error", {
                    timeOut: 3000
                });
                this.s_Error.sendErorr(err.message, err.error);
            }
            this.loading = false;
            this.submitted = false;
        });
    }
    submit(param) {
        if (this.typeForm == 0) {
            return this.usersService.addUser(param);
        }
        else if (this.typeForm == 1) {
            return this.usersService.updateUser(param);
        }
        else if (this.typeForm == 2) {
            return this.usersService.deleteUser(param);
        }
    }
    putValueController(id) {
        this.formUser.get('id').setValue(this.users.find(x => x.id == id).id);
        this.formUser.get('email').setValue(this.users.find(x => x.id == id).email);
        this.formUser.get('first_name').setValue(this.users.find(x => x.id == id).first_name);
        this.formUser.get('last_name').setValue(this.users.find(x => x.id == id).last_name);
        this.formUser.get('telephone_number').setValue(this.users.find(x => x.id == id).telephone_number.toString());
        this.formUser.get('role').setValue(this.users.find(x => x.id == id).role);
        this.formUser.get('password').setValue("dee234e90f63e76afc88087c98b6fa46");
    }
    OpenPermission(content, id) {
        this.ID = this.users.find(x => x.id == id).id;
        this.modalService.open(content, { backdrop: 'static', size: 'lg' });
    }
    disableController(namecontroller = "", All = false) {
        if (All) {
            this.formUser.disable({ onlySelf: true });
        }
        else {
            this.formUser.get(namecontroller).disable({ onlySelf: true });
        }
    }
    enableController(namecontroller = "", All = false) {
        if (All) {
            this.formUser.enable({ onlySelf: true });
        }
        else {
            this.formUser.get(namecontroller).enable({ onlySelf: true });
        }
    }
};
UsersComponent.ctorParameters = () => [
    { type: src_app_core_services_other_imagebase64_service__WEBPACK_IMPORTED_MODULE_12__["Imagebase64Service"] },
    { type: src_app_core_services_error_senderror_service__WEBPACK_IMPORTED_MODULE_11__["SenderrorService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClient"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] },
    { type: src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_6__["TransService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"] },
    { type: src_app_core_services_users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(ngx_image_cropper__WEBPACK_IMPORTED_MODULE_10__["ImageCropperComponent"], { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_image_cropper__WEBPACK_IMPORTED_MODULE_10__["ImageCropperComponent"])
], UsersComponent.prototype, "imageCropper", void 0);
UsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-users',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./users.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/users/users.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./users.component.scss */ "./src/app/portals/settings/users/users.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_services_other_imagebase64_service__WEBPACK_IMPORTED_MODULE_12__["Imagebase64Service"], src_app_core_services_error_senderror_service__WEBPACK_IMPORTED_MODULE_11__["SenderrorService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClient"], ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"], src_app_core_services_translation_trans_service__WEBPACK_IMPORTED_MODULE_6__["TransService"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"], src_app_core_services_users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"]])
], UsersComponent);



/***/ }),

/***/ "./src/app/portals/settings/whatsapp/whatsapp.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/portals/settings/whatsapp/whatsapp.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvcnRhbHMvc2V0dGluZ3Mvd2hhdHNhcHAvd2hhdHNhcHAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/portals/settings/whatsapp/whatsapp.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/portals/settings/whatsapp/whatsapp.component.ts ***!
  \*****************************************************************/
/*! exports provided: WhatsappComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappComponent", function() { return WhatsappComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



let WhatsappComponent = class WhatsappComponent {
    constructor(http) {
        this.http = http;
        this.resutlQr = "";
        this.Contacts = [];
        this.status = 0;
    }
    ngOnInit() {
        this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label: "Settings", path: '/', active: false }, { label: "Whatsapp", path: '/', active: false }];
        this.getQrCode();
    }
    getQrCode() {
        this.http.post("https://wap.parisaline.com/getQrCode", {}).subscribe(res => {
            if (res.status === 2) {
                this.status = 1;
                //this.getCotacts();
            }
            document.getElementById('qrWahtsapp').innerHTML = res.qr;
        });
    }
    getCotacts() {
        this.http.post("https://wap.parisaline.com/getContacts", {}).subscribe(res => {
            if (res.status === 200) {
                this.Contacts = res.data;
            }
        });
    }
    getChats(id) {
        this.http.post(`https://wap.parisaline.com/getChats?id=${id}`, { id: id }).subscribe(res => {
            if (res.status === 200) {
                this.Chats = res.message;
            }
        });
    }
    logOut() {
        this.http.post(`https://wap.parisaline.com/logOut`, {}).subscribe(res => {
            document.getElementById('qrWahtsapp').innerHTML = '';
            this.status = 0;
            this.getQrCode();
        });
    }
};
WhatsappComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
WhatsappComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-whatsapp',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./whatsapp.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/portals/settings/whatsapp/whatsapp.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./whatsapp.component.scss */ "./src/app/portals/settings/whatsapp/whatsapp.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], WhatsappComponent);



/***/ })

}]);
//# sourceMappingURL=settings-settings-module-es2015.js.map