(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["account-account-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/confirm/confirm.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/confirm/confirm.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"account-pages mt-5 mb-5\">\n  <div class=\"container\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8 col-lg-6 col-xl-5\">\n        <div class=\"card bg-pattern\">\n          <div class=\"card-body p-4\">\n            <!-- Logo -->\n            <div class=\"text-center w-75 m-auto\">\n              <a routerLink=\"/account/login\">\n                <img src=\"assets/images/logo-dark.png\" alt=\"\" height=\"22\" />\n              </a>\n            </div>\n\n            <div class=\"mt-3 text-center\">\n              <svg version=\"1.1\" xmlns:x=\"&ns_extend;\" xmlns:i=\"&ns_ai;\" xmlns:graph=\"&ns_graphs;\"\n                xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                viewBox=\"0 0 98 98\" style=\"height: 120px;\" xml:space=\"preserve\">\n                <style type=\"text/css\">\n                  .st0 {\n                    fill: #FFFFFF;\n                  }\n\n                  .st1 {\n                    fill: #1abc9c;\n                  }\n\n                  .st2 {\n                    fill: #FFFFFF;\n                    stroke: #1abc9c;\n                    stroke-width: 2;\n                    stroke-miterlimit: 10;\n                  }\n\n                  .st3 {\n                    fill: none;\n                    stroke: #FFFFFF;\n                    stroke-width: 2;\n                    stroke-linecap: round;\n                    stroke-miterlimit: 10;\n                  }\n                </style>\n                <g i:extraneous=\"self\">\n                  <circle id=\"XMLID_50_\" class=\"st0\" cx=\"49\" cy=\"49\" r=\"49\" />\n                  <g id=\"XMLID_4_\">\n                    <path id=\"XMLID_49_\" class=\"st1\"\n                      d=\"M77.3,42.7V77c0,0.6-0.4,1-1,1H21.7c-0.5,0-1-0.5-1-1V42.7c0-0.3,0.1-0.6,0.4-0.8l27.3-21.7\n                                                        c0.3-0.3,0.8-0.3,1.2,0l27.3,21.7C77.1,42.1,77.3,42.4,77.3,42.7z\" />\n                    <path id=\"XMLID_48_\" class=\"st2\" d=\"M66.5,69.5h-35c-1.1,0-2-0.9-2-2V26.8c0-1.1,0.9-2,2-2h35c1.1,0,2,0.9,2,2v40.7\n                                                        C68.5,68.6,67.6,69.5,66.5,69.5z\" />\n                    <path id=\"XMLID_47_\" class=\"st1\" d=\"M62.9,33.4H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7\n                                                        c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,33,63.4,33.4,62.9,33.4z\" />\n                    <path id=\"XMLID_46_\" class=\"st1\" d=\"M62.9,40.3H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7\n                                                        c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,39.9,63.4,40.3,62.9,40.3z\" />\n                    <path id=\"XMLID_45_\" class=\"st1\" d=\"M62.9,47.2H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7\n                                                        c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,46.8,63.4,47.2,62.9,47.2z\" />\n                    <path id=\"XMLID_44_\" class=\"st1\" d=\"M62.9,54.1H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7\n                                                        c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,53.7,63.4,54.1,62.9,54.1z\" />\n                    <path id=\"XMLID_43_\" class=\"st2\" d=\"M41.6,40.1h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7\n                                                        C42.6,39.7,42.2,40.1,41.6,40.1z\" />\n                    <path id=\"XMLID_42_\" class=\"st2\" d=\"M41.6,54.2h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7\n                                                        C42.6,53.8,42.2,54.2,41.6,54.2z\" />\n                    <path id=\"XMLID_41_\" class=\"st1\"\n                      d=\"M23.4,46.2l25,17.8c0.3,0.2,0.7,0.2,1.1,0l26.8-19.8l-3.3,30.9H27.7L23.4,46.2z\" />\n                    <path id=\"XMLID_40_\" class=\"st3\" d=\"M74.9,45.2L49.5,63.5c-0.3,0.2-0.7,0.2-1.1,0L23.2,45.2\" />\n                  </g>\n                </g>\n              </svg>\n\n              <h4 class=\"text-dark-50 text-center mt-4 font-weight-bold\">Please check your email</h4>\n              <p class=\"text-muted mb-4\">\n                A email has been send to <b>youremail@domain.com</b>.\n                Please check for an email from company and click on the included link to\n                reset your password.\n              </p>\n            </div>\n\n            <div class=\"form-group mb-0 text-center mt-3\">\n              <a routerLink=\"/account/login\" class=\"btn btn-primary\"><i class=\"mdi mdi-home mr-1\"></i>\n                Back to Home</a>\n            </div>\n\n          </div> <!-- end card-body-->\n        </div>\n        <!-- end card-->\n\n      </div> <!-- end col -->\n    </div>\n    <!-- end row -->\n  </div>\n  <!-- end container -->\n</div>\n<!-- end page -->\n\n<footer class=\"footer footer-alt\">\n  2015 - 2019 &copy; UBold theme by <a href=\"\" class=\"text-white-50\">Coderthemes</a> \n</footer>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/login/login.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/login/login.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"account-pages mt-5 mb-5\">\n  <div class=\"container\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8 col-lg-6 col-xl-5\">\n        <div class=\"card bg-pattern\">\n          <div class=\"card-body p-4\">\n            <!-- Logo -->\n            <div class=\"text-center w-75 m-auto\">\n              <a routerLink=\"/\">\n                <img src=\"assets/lo.png\" alt=\"\" style=\"width: 280px;height: auto;\" height=\"22\">\n              </a>\n              <p class=\"text-muted mb-4 mt-3\">Enter your email address and password to access admin panel.</p>\n            </div>\n\n            <form class=\"needs-validation\" name=\"loginForm\" [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n\n              <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n\n              <div class=\"form-group mb-3\">\n                <label for=\"email\">Email</label>\n\n                <input type=\"email\" formControlName=\"email\" class=\"form-control\" \n                  [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\" id=\"email\" placeholder=\"email\" />\n\n                <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.email.errors.required\">Email is required</div>\n                  <div *ngIf=\"f.email.errors.email\">Email must be a valid email address</div>\n                </div>\n              </div>\n\n              <div class=\"form-group mb-3\">\n                <label for=\"password\">Password</label>\n\n                <input type=\"password\" formControlName=\"password\" class=\"form-control\"\n                  [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" value=\"a514286_+\" id=\"password\" placeholder=\"Password\" />\n\n                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                </div>\n              </div>\n\n              <div class=\"form-group mb-0 text-center\">\n                <button class=\"btn btn-primary btn-block\" type=\"submit\">Log In</button>\n              </div>\n            </form>\n          </div> <!-- end card-body -->\n        </div>\n        <!-- end card -->\n\n        <div class=\"row mt-3\">\n          <div class=\"col-12 text-center\">\n\n          </div> <!-- end col -->\n        </div>\n        <!-- end row -->\n\n      </div> <!-- end col -->\n    </div>\n    <!-- end row -->\n  </div>\n  <!-- end container -->\n</div>\n<!-- end page -->\n\n<footer class=\"footer footer-alt\">\n  2019 - 2020 &copy; Parisaline by <a href=\"\" class=\"text-white-50\">Parisaline</a> \n</footer>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/passwordreset/passwordreset.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/passwordreset/passwordreset.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"account-pages mt-5 mb-5\">\n  <div class=\"container\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8 col-lg-6 col-xl-5\">\n        <div class=\"card bg-pattern\">\n          <div class=\"card-body p-4\">\n            <!-- Logo -->\n            <div class=\"text-center w-75 m-auto\">\n              <a routerLink=\"/account/login\">\n                <img src=\"assets/images/logo-dark.png\" alt=\"\" height=\"22\" />\n              </a>\n              <p class=\"text-muted mb-4 mt-3\">Enter your email address and we'll send you an email with instructions to\n                reset your password.</p>\n            </div>\n\n\n            <form class=\"needs-validation\" name=\"resetForm\" [formGroup]=\"resetForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n\n              <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n\n              <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n              <ngb-alert type=\"success\" *ngIf=\"success\" [dismissible]=\"false\">{{ success }}</ngb-alert>\n\n              <div class=\"form-group mb-3\" *ngIf=\"!success\">\n                <label for=\"email\">Email</label>\n\n                <input type=\"email\" formControlName=\"email\" class=\"form-control\"\n                  [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\" id=\"email\" placeholder=\"Email\" />\n\n                <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.email.errors.required\">Email is required</div>\n                  <div *ngIf=\"f.email.errors.email\">Email must be a valid email address</div>\n                </div>\n              </div>\n\n              <div class=\"form-group mb-0 text-center\" *ngIf=\"!success\">\n                <button class=\"btn btn-primary btn-block\" type=\"submit\">Submit</button>\n              </div>\n            </form>\n\n          </div> <!-- end card-body-->\n        </div>\n        <!-- end card -->\n\n        <div class=\"row mt-3\">\n          <div class=\"col-12 text-center\">\n            <p class=\"text-white-50\">Back to <a routerLink=\"/account/login\" class=\"text-white ml-1\"><b>Log In</b></a></p>\n          </div> <!-- end col -->\n        </div>\n        <!-- end row -->\n\n      </div> <!-- end col -->\n    </div>\n    <!-- end row -->\n  </div>\n  <!-- end container -->\n</div>\n<!-- end page -->\n\n<footer class=\"footer footer-alt\">\n  2015 - 2019 &copy; UBold theme by <a href=\"\" class=\"text-white-50\">Coderthemes</a> \n</footer>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/signup/signup.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/signup/signup.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"account-pages mt-5 mb-5\">\n  <div class=\"container\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8 col-lg-6 col-xl-5\">\n        <div class=\"card\">\n          <div class=\"card-body p-4\">\n            <!-- Logo-->\n            <div class=\"text-center w-75 m-auto\">\n              <a routerLink=\"/account/login\">\n                <img src=\"assets/images/logo-dark.png\" alt=\"\" height=\"22\" />\n              </a>\n              <p class=\"text-muted mb-4 mt-3\">Don't have an account? Create your own account, it takes less than a minute</p>\n            </div>\n\n            <form class=\"needs-validation\" name=\"signupForm\" [formGroup]=\"signupForm\"\n              novalidate>\n\n              <app-ui-preloader [display]=\"loading\"></app-ui-preloader>\n\n              <ngb-alert type=\"danger\" *ngIf=\"error\" [dismissible]=\"false\">{{ error }}</ngb-alert>\n\n              <div class=\"form-group mb-3\">\n                <label for=\"name\">Your name</label>\n\n                <input type=\"text\" formControlName=\"name\" class=\"form-control\"\n                  [ngClass]=\"{ 'is-invalid': submitted && f.name.errors }\" id=\"name\" placeholder=\"Enter your name\" />\n\n                <div *ngIf=\"submitted && f.name.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.name.errors.required\">Name is required</div>\n                </div>\n              </div>\n\n              <div class=\"form-group mb-3\">\n                <label for=\"email\">Email</label>\n\n                <input type=\"email\" formControlName=\"email\" class=\"form-control\"\n                  [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\" id=\"email\" placeholder=\"Email\" />\n\n                <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.email.errors.required\">Email is required</div>\n                  <div *ngIf=\"f.email.errors.email\">Email must be a valid email address</div>\n                </div>\n              </div>\n\n              <div class=\"form-group mb-3\">\n                <label for=\"password\">Password</label>\n\n                <input type=\"password\" formControlName=\"password\" class=\"form-control\"\n                  [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" id=\"password\" placeholder=\"Password\" />\n\n                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                </div>\n              </div>\n\n              <div class=\"form-group mb-0 text-center\">\n                <button class=\"btn btn-success btn-block\" type=\"submit\">Sign Up</button>\n              </div>\n            </form>\n          </div> <!-- end card-body -->\n        </div>\n        <!-- end card -->\n\n        <div class=\"row mt-3\">\n          <div class=\"col-12 text-center\">\n            <p class=\"text-white-50\">Already have account? <a routerLink=\"/account/login\" class=\"text-white ml-1\"><b>Log\n                  In</b></a></p>\n          </div> <!-- end col-->\n        </div>\n        <!-- end row -->\n\n      </div> <!-- end col -->\n    </div>\n    <!-- end row -->\n  </div>\n  <!-- end container -->\n</div>\n<!-- end page -->\n\n<footer class=\"footer footer-alt\">\n  2015 - 2019 &copy; UBold theme by <a href=\"\" class=\"text-white-50\">Coderthemes</a> \n</footer>");

/***/ }),

/***/ "./src/app/account/account-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/account/account-routing.module.ts ***!
  \***************************************************/
/*! exports provided: AccountRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountRoutingModule", function() { return AccountRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



const routes = [
    { path: 'auth', loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./auth/auth.module */ "./src/app/account/auth/auth.module.ts")).then(m => m.AuthModule) },
];
let AccountRoutingModule = class AccountRoutingModule {
};
AccountRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AccountRoutingModule);



/***/ }),

/***/ "./src/app/account/account.module.ts":
/*!*******************************************!*\
  !*** ./src/app/account/account.module.ts ***!
  \*******************************************/
/*! exports provided: AccountModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountModule", function() { return AccountModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _account_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./account-routing.module */ "./src/app/account/account-routing.module.ts");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/auth.module */ "./src/app/account/auth/auth.module.ts");





let AccountModule = class AccountModule {
};
AccountModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _account_routing_module__WEBPACK_IMPORTED_MODULE_3__["AccountRoutingModule"],
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_4__["AuthModule"]
        ]
    })
], AccountModule);



/***/ }),

/***/ "./src/app/account/auth/auth-routing.ts":
/*!**********************************************!*\
  !*** ./src/app/account/auth/auth-routing.ts ***!
  \**********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/account/auth/login/login.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signup/signup.component */ "./src/app/account/auth/signup/signup.component.ts");
/* harmony import */ var _confirm_confirm_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./confirm/confirm.component */ "./src/app/account/auth/confirm/confirm.component.ts");
/* harmony import */ var _passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./passwordreset/passwordreset.component */ "./src/app/account/auth/passwordreset/passwordreset.component.ts");







const routes = [
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    },
    {
        path: 'signup',
        component: _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__["SignupComponent"]
    },
    {
        path: 'confirm',
        component: _confirm_confirm_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmComponent"]
    },
    {
        path: 'reset-password',
        component: _passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_6__["PasswordresetComponent"]
    },
];
let AuthRoutingModule = class AuthRoutingModule {
};
AuthRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AuthRoutingModule);



/***/ }),

/***/ "./src/app/account/auth/auth.module.ts":
/*!*********************************************!*\
  !*** ./src/app/account/auth/auth.module.ts ***!
  \*********************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _shared_ui_ui_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/ui/ui.module */ "./src/app/shared/ui/ui.module.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/account/auth/login/login.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./signup/signup.component */ "./src/app/account/auth/signup/signup.component.ts");
/* harmony import */ var _auth_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth-routing */ "./src/app/account/auth/auth-routing.ts");
/* harmony import */ var _confirm_confirm_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./confirm/confirm.component */ "./src/app/account/auth/confirm/confirm.component.ts");
/* harmony import */ var _passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./passwordreset/passwordreset.component */ "./src/app/account/auth/passwordreset/passwordreset.component.ts");











let AuthModule = class AuthModule {
};
AuthModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"], _signup_signup_component__WEBPACK_IMPORTED_MODULE_7__["SignupComponent"], _confirm_confirm_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmComponent"], _passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_10__["PasswordresetComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbAlertModule"],
            _shared_ui_ui_module__WEBPACK_IMPORTED_MODULE_5__["UIModule"],
            _auth_routing__WEBPACK_IMPORTED_MODULE_8__["AuthRoutingModule"]
        ]
    })
], AuthModule);



/***/ }),

/***/ "./src/app/account/auth/confirm/confirm.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/account/auth/confirm/confirm.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjY291bnQvYXV0aC9jb25maXJtL2NvbmZpcm0uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/account/auth/confirm/confirm.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/account/auth/confirm/confirm.component.ts ***!
  \***********************************************************/
/*! exports provided: ConfirmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmComponent", function() { return ConfirmComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ConfirmComponent = class ConfirmComponent {
    constructor() { }
    ngOnInit() {
    }
    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }
};
ConfirmComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-confirm',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./confirm.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/confirm/confirm.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./confirm.component.scss */ "./src/app/account/auth/confirm/confirm.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ConfirmComponent);



/***/ }),

/***/ "./src/app/account/auth/login/login.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/account/auth/login/login.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjY291bnQvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/account/auth/login/login.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/account/auth/login/login.component.ts ***!
  \*******************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/services/auth.service */ "./src/app/core/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let LoginComponent = class LoginComponent {
    constructor(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.submitted = false;
        this.error = '';
        this.loading = false;
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        // tslint:disable-next-line: no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.loginForm.get("email").setValue("");
        this.loginForm.get("password").setValue("");
    }
    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    /**
     * On submit form
     */
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(data => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.error = error;
            this.loading = false;
        });
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/login/login.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.scss */ "./src/app/account/auth/login/login.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
        _core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
], LoginComponent);



/***/ }),

/***/ "./src/app/account/auth/passwordreset/passwordreset.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/account/auth/passwordreset/passwordreset.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjY291bnQvYXV0aC9wYXNzd29yZHJlc2V0L3Bhc3N3b3JkcmVzZXQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/account/auth/passwordreset/passwordreset.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/account/auth/passwordreset/passwordreset.component.ts ***!
  \***********************************************************************/
/*! exports provided: PasswordresetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordresetComponent", function() { return PasswordresetComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let PasswordresetComponent = class PasswordresetComponent {
    constructor(formBuilder, route, router) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.submitted = false;
        this.error = '';
        this.success = '';
        this.loading = false;
    }
    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
        });
    }
    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }
    // convenience getter for easy access to form fields
    get f() { return this.resetForm.controls; }
    /**
     * On submit form
     */
    onSubmit() {
        this.success = '';
        this.submitted = true;
        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        }
        this.loading = true;
        console.log(this.resetForm.value);
        setTimeout(() => {
            this.loading = false;
            this.success = 'We have sent you an email containing a link to reset your password';
        }, 1000);
    }
};
PasswordresetComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
PasswordresetComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-passwordreset',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./passwordreset.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/passwordreset/passwordreset.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./passwordreset.component.scss */ "./src/app/account/auth/passwordreset/passwordreset.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], PasswordresetComponent);



/***/ }),

/***/ "./src/app/account/auth/signup/signup.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/account/auth/signup/signup.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjY291bnQvYXV0aC9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/account/auth/signup/signup.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/account/auth/signup/signup.component.ts ***!
  \*********************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let SignupComponent = class SignupComponent {
    constructor(formBuilder, route, router) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.submitted = false;
        this.error = '';
        this.loading = false;
    }
    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    }
    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }
    // convenience getter for easy access to form fields
    get f() { return this.signupForm.controls; }
};
SignupComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
SignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-signup',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./signup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/auth/signup/signup.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./signup.component.scss */ "./src/app/account/auth/signup/signup.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], SignupComponent);



/***/ })

}]);
//# sourceMappingURL=account-account-module-es2015.js.map