(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hubspot_calling_extensions_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hubspot/calling-extensions-sdk */ \"./node_modules/@hubspot/calling-extensions-sdk/index.js\");\n\n\n\nconst callback = () => {\n    const interactionApi = window.Five9.CrmSdk.interactionApi();\n    const customComponentsApi = window.Five9.CrmSdk.customComponentsApi();\n    const crmApi = window.Five9.CrmSdk.crmApi();\n  \n    const defaultSize = {\n      width: 400,\n      height: 600\n    };\n  \n    const state = {};\n  \n    const cti = new _hubspot_calling_extensions_sdk__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      debugMode: true,\n      eventHandlers: {\n        onReady: () => {\n          cti.initialized({\n            isLoggedIn: true,\n            sizeInfo: defaultSize\n          });\n        },\n        onDialNumber: (data, rawEvent) => {\n          const { phoneNumber } = data;\n          state.phoneNumber = phoneNumber;\n          window.setTimeout(\n            () =>\n              cti.outgoingCall({\n                createEngagement: true,\n                phoneNumber\n              }),\n            500\n          );\n        },\n        onEngagementCreated: (data, rawEvent) => {\n          const { engagementId } = data;\n          state.engagementId = engagementId;\n        },\n        onEndCall: () => {\n          window.setTimeout(() => {\n            cti.callEnded();\n          }, 500);\n        },\n        onVisibilityChanged: (data, rawEvent) => {\n        }\n      }\n    });\n\n    crmApi.registerApi({\n        getAdtConfig: function (params) {\n            var config = {\n                providerName: 'Demo CRM ADT adapter',\n                myCallsTodayEnabled: true,\n                myChatsTodayEnabled: false,\n                myEmailsTodayEnabled: false,\n                showContactInfo: false\n            };\n            console.log({\n                data: params\n            });\n            return Promise.resolve(config);\n        },\n        search: function (params) {\n            console.log({\n                data: params\n            });\n            var crmObjects = [{id: \"123\", label: \"Contact\", name: \"Joe\", isWho: true, isWhat: false, fields:[{displayName: \"Company\", value: \"ABC\"}]}];\n            return Promise.resolve({crmObjects: crmObjects, screenPopObject: crmObjects[0]}); \n\n        },\n        saveLog: function (params) {\n            console.log({\n                data: params\n            });\n        },\n        screenPop: function (params) {\n            console.log({\n                data: params\n            });\n        },\n        getTodayCallsCount: function (params) {\n            console.log({\n                data: params\n            });\n            return Promise.resolve(77);\n        },\n        getTodayChatsCount: function (params) {\n            console.log({\n                data: params\n            });\n            return Promise.resolve(77);;\n        },\n        getTodayEmailsCount: function (params) {\n            console.log({\n                data: params\n            });\n            return Promise.resolve(11);;\n        },\n        openMyCallsToday: function (params) {\n            console.log({\n                data: params\n            });\n        },\n        openMyChatsToday: function (params) {\n            console.log({\n                data: params\n            });\n        },\n        contactSelected: function (contactModel) {\n            console.log({\n                data: params\n            });\n        },\n        enableClickToDial: function (params) {\n            cti.initialized({\n                isLoggedIn: true\n            });\n            cti.userLoggedIn();\n        },\n        disableClickToDial: function (params) {\n            console.log({\n                data: params\n            });\n        },\n        _beforeCallFinished: function(params) {\n            console.log({\n                data: params\n            });\n          }\n    });\n\n    interactionApi.subscribe({\n        callStarted: function (params) {\n            console.log({\n                data: params.callData,\n                interactionId: params.callData.interactionId\n            });\n            cti.outgoingCall({\n                phoneNumber: params.callData.dnis,\n                createEngagement: \"true\",\n                data: params.callData\n            });\n        },\n\n        callFinished: function (params) {\n            console.log({\n                data: params\n            });\n            cti.callCompleted({\n                engagementId: state.engagementId,\n                hideWidget: true\n            });\n        },\n\n        callAccepted: function (params) {\n            console.log({\n                data: params\n            });\n            cti.callAnswered();\n        },\n\n        callRejected: function (params) {\n            console.log({\n                data: params\n            });\n            cti.callEnded({\n                data: params\n            });\n        },\n\n        callEnded: function (params) {\n            console.log({\n                data: params\n            });\n            cti.callEnded({\n              data: params\n            });\n        }\n    });\n\n    customComponentsApi.registerCustomComponents({template: `<adt-components>\n          <adt-component location=\"3rdPartyComp-li-call-tab\" label=\"3rdPartyComp-li-call-tab\" style=\"flex-direction: column\">\n            <adt-input value=\"Initial value\" id=\"aaa1\" name=\"input1\" label=\"Credit card1\" placeholder=\"this is placeholder1\"\n                       onchange=\"callTabInputCallback\"></adt-input>\n            <adt-btn-group label=\"Group of buttons\">\n                <!-- comments are ignored and styles are filtered by whitelisting -->\n                <adt-button name=\"button1\" label=\"Yes\" class=\"btnPrimary\" style=\"flex-grow: 1; justify-content: center;\"\n                            onclick=\"callTabYesCallback\">Yes</adt-button>\n                <adt-button name=\"button2\" label=\"No\" class=\"btnSecondary\" style=\"flex-grow: 1\"\n                            onclick=\"callTabNoCallback\"></adt-button>\n            </adt-btn-group>\n          </adt-component>\n          <adt-component location=\"3rdPartyComp-li-call-details-bottom\" label=\"3rdPartyComp-li-call-details-bottom\" style=\"flex-direction: row; justify-content: space-between; align-items: flex-end;\">\n            <adt-input value=\"Initial value\" name=\"input2\" label=\"Credit card2\" placeholder=\"this is placeholder1\"\n                       onchange=\"callDetailsInputCallback\"></adt-input>\n            <adt-button name=\"button3\" label=\"Verify\" class=\"btnPrimary\" style=\"justify-content: center;\"\n                        onclick=\"callDetailsButtonCallback\"></adt-button>\n          </adt-component>\n        </adt-components>\n        `,\n        callbacks: {\n          callTabInputCallback: function(params){\n            console.log({\n              data: params\n            });\n           \n          },\n\n          callTabYesCallback: function(params){\n            console.log({\n              data: params\n            });\n           \n          },\n          callTabNoCallback: function(params){\n            console.log({\n              data: params\n            });\n           \n          },\n          callDetailsInputCallback: function(params){\n            console.log({\n              data: params\n            });\n           \n          },\n          callDetailsButtonCallback: function(params){\n            console.log({\n              data: params\n            });\n           \n          }\n          \n      }}); \n\n      const exit_btn = document.getElementById('exit-five9');\n      exit_btn.addEventListener('click', function () {\n        cti.callCompleted();\n      });\n\n  };\n  \n  if (\n    document.readyState === \"interactive\" ||\n    document.readyState === \"complete\"\n  ) {\n    window.setTimeout(() => callback(), 1000);\n  } else {\n    document.addEventListener(\"DOMContentLoaded\", callback);\n  }\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/@hubspot/calling-extensions-sdk/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@hubspot/calling-extensions-sdk/index.js ***!
  \***************************************************************/
/*! exports provided: default, Constants, IFrameManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_CallingExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/CallingExtensions */ \"./node_modules/@hubspot/calling-extensions-sdk/src/CallingExtensions.js\");\n/* harmony import */ var _src_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Constants */ \"./node_modules/@hubspot/calling-extensions-sdk/src/Constants.js\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"Constants\", function() { return _src_Constants__WEBPACK_IMPORTED_MODULE_1__; });\n/* harmony import */ var _src_IFrameManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/IFrameManager */ \"./node_modules/@hubspot/calling-extensions-sdk/src/IFrameManager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"IFrameManager\", function() { return _src_IFrameManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_src_CallingExtensions__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./node_modules/@hubspot/calling-extensions-sdk/index.js?");

/***/ }),

/***/ "./node_modules/@hubspot/calling-extensions-sdk/src/CallingExtensions.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@hubspot/calling-extensions-sdk/src/CallingExtensions.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _IFrameManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IFrameManager */ \"./node_modules/@hubspot/calling-extensions-sdk/src/IFrameManager.js\");\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ \"./node_modules/@hubspot/calling-extensions-sdk/src/Constants.js\");\n\"use es6\";\n\n\n\n\n/*\n * CallingExtensions allows call providers to communicate with HubSpot.\n */\nclass CallingExtensions {\n  constructor(options) {\n    if (!options || !options.eventHandlers) {\n      throw new Error(\"Invalid options or missing eventHandlers.\");\n    }\n\n    this.options = options;\n\n    this.iFrameManager = new _IFrameManager__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      debugMode: options.debugMode,\n      onMessageHandler: event => this.onMessageHandler(event)\n    });\n  }\n\n  initialized(userData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].INITIALIZED,\n      data: userData\n    });\n  }\n\n  userLoggedIn() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].LOGGED_IN\n    });\n  }\n\n  userLoggedOut() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].LOGGED_OUT\n    });\n  }\n\n  incomingCall(callDetails) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].INCOMING_CALL,\n      data: callDetails\n    });\n  }\n\n  outgoingCall(callDetails) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].OUTGOING_CALL_STARTED,\n      data: callDetails\n    });\n  }\n\n  callAnswered() {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].CALL_ANSWERED\n    });\n  }\n\n  callData(data) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].CALL_DATA,\n      data\n    });\n  }\n\n  callEnded(engagementData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].CALL_ENDED,\n      data: engagementData\n    });\n  }\n\n  callCompleted(callCompletedData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].CALL_COMPLETED,\n      data: callCompletedData\n    });\n  }\n\n  sendError(errorData) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].ERROR,\n      data: errorData\n    });\n  }\n\n  resizeWidget(sizeInfo) {\n    this.sendMessage({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].RESIZE_WIDGET,\n      data: sizeInfo\n    });\n  }\n\n  sendMessage(message) {\n    this.iFrameManager.sendMessage(message);\n  }\n\n  onMessageHandler(event) {\n    const { type, data } = event;\n    const { eventHandlers } = this.options;\n    let handler;\n    switch (type) {\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].READY: {\n        const { onReady } = eventHandlers;\n        handler = onReady;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].DIAL_NUMBER: {\n        const { onDialNumber } = eventHandlers;\n        handler = onDialNumber;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].ENGAGEMENT_CREATED: {\n        const { onEngagementCreated } = eventHandlers;\n        handler = onEngagementCreated;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].END_CALL: {\n        const { onEndCall } = eventHandlers;\n        handler = onEndCall;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].VISIBILITY_CHANGED: {\n        const { onVisibilityChanged } = eventHandlers;\n        handler = onVisibilityChanged;\n        break;\n      }\n      case _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].SET_CALL_STATE: {\n        const { onSetCallState } = eventHandlers;\n        handler = onSetCallState;\n        break;\n      }\n      default: {\n        // Send back a message indicating an unknown event is received\n        this.sendMessage({\n          type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"messageType\"].ERROR,\n          data: {\n            type: _Constants__WEBPACK_IMPORTED_MODULE_1__[\"errorType\"].UNKNOWN_MESSAGE_TYPE,\n            data: {\n              originalMessage: event\n            }\n          }\n        });\n        break;\n      }\n    }\n    handler = handler || eventHandlers.defaultEventHandler;\n    if (handler) {\n      handler(data, event);\n    } else {\n      console.error(\n        `No event handler is available to handle message of type: ${type}`\n      );\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CallingExtensions);\n\n\n//# sourceURL=webpack:///./node_modules/@hubspot/calling-extensions-sdk/src/CallingExtensions.js?");

/***/ }),

/***/ "./node_modules/@hubspot/calling-extensions-sdk/src/Constants.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@hubspot/calling-extensions-sdk/src/Constants.js ***!
  \***********************************************************************/
/*! exports provided: VERSION, messageType, errorType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VERSION\", function() { return VERSION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"messageType\", function() { return messageType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"errorType\", function() { return errorType; });\n\"use es6\";\n\nconst VERSION = \"0.0.1\";\n\nconst messageTypeList = [\n  \"CALL_ANSWERED\",\n  \"CALL_COMPLETED\",\n  \"CALL_DATA\",\n  \"CALL_ENDED\",\n  \"DIAL_NUMBER\",\n  \"ENGAGEMENT_CREATED\",\n\n  \"END_CALL\",\n  \"ERROR\",\n  \"INCOMING_CALL\",\n  \"INITIALIZED\",\n  \"LOGGED_IN\",\n  \"LOGGED_OUT\",\n  \"OUTGOING_CALL_STARTED\",\n  \"READY\",\n  \"RESIZE_WIDGET\",\n  \"SET_CALL_STATE\",\n  \"SET_WIDGET_URL\",\n  \"SYNC\",\n  \"SYNC_ACK\",\n  \"SYNC_ACK_FAILED\",\n  \"UNLOADING\",\n  \"VISIBILITY_CHANGED\"\n];\n\nconst errorTypeList = [\"UNKNOWN_MESSAGE_TYPE\", \"GENERIC\"];\n\nfunction mirrorKeys(keyList) {\n  const keyObject = {};\n  keyList.forEach(keyName => {\n    keyObject[keyName] = keyName;\n  });\n  return keyObject;\n}\n\nconst messageType = mirrorKeys(messageTypeList);\nconst errorType = mirrorKeys(errorTypeList);\n\n\n//# sourceURL=webpack:///./node_modules/@hubspot/calling-extensions-sdk/src/Constants.js?");

/***/ }),

/***/ "./node_modules/@hubspot/calling-extensions-sdk/src/IFrameManager.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@hubspot/calling-extensions-sdk/src/IFrameManager.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ \"./node_modules/@hubspot/calling-extensions-sdk/src/Constants.js\");\n\"use es6\";\n\n\n\n/*\n * IFrameManager abstracts the iFrame communication between the IFrameHost and an IFrame\n * An IFrameManager instance can act as part of the IFrameHost and an IFrame depending on\n * the options.\n */\nclass IFrameManager {\n  constructor(options) {\n    this.options = options;\n    const { iFrameOptions, onMessageHandler, debugMode } = options;\n\n    this.onMessageHandler = onMessageHandler;\n    if (!this.onMessageHandler) {\n      throw new Error(\"Invalid options: onMessageHandler is not defined\");\n    }\n    this.isIFrameHost = !!iFrameOptions;\n    this.debugMode = debugMode;\n\n    // Keeps track of all the callbacks\n    this.callbacks = {};\n\n    this.instanceId = Date.now();\n    this.instanceRegexp = new RegExp(`^${this.instanceId}`);\n    this.isReady = false;\n\n    this.messageHandler = event => this.onMessage(event);\n    window.addEventListener(\"message\", this.messageHandler);\n\n    if (iFrameOptions) {\n      this.iFrame = IFrameManager.createIFrame(iFrameOptions, () => {\n        this.firstSyncSent = Date.now();\n        this.isReady = false;\n        this.sendSync();\n      });\n    }\n\n    this.destinationWindow = iFrameOptions\n      ? this.iFrame.contentWindow\n      : window.parent;\n\n    this.destinationHost = IFrameManager.getDestinationHost(iFrameOptions);\n  }\n\n  /*\n   * Creates a new message id\n   */\n  static createMessageId(instanceId) {\n    return `${instanceId}_${Date.now()}`;\n  }\n\n  /*\n   * Gets the html element that hosts the iFrame\n   */\n  static getHostElement(hostElementSelector) {\n    const hostElement = document.querySelector(hostElementSelector);\n    if (!hostElement) {\n      throw new Error(\n        `hostElement not found. Selector - ${hostElementSelector}`\n      );\n    }\n    return hostElement;\n  }\n\n  static extractHostFromUrl(url) {\n    const a = document.createElement(\"a\");\n    a.href = url;\n    return `${a.protocol}//${a.host}`;\n  }\n\n  static getDestinationHost(iFrameOptions) {\n    const url = iFrameOptions ? iFrameOptions.src : document.referrer;\n    return IFrameManager.extractHostFromUrl(url);\n  }\n\n  static createIFrame(iFrameOptions, onLoadCallback) {\n    const { src, width, height, hostElementSelector } = iFrameOptions;\n\n    if (!src || !width || !height || !hostElementSelector) {\n      throw new Error(\n        \"iFrameOptions is missing one of the required properties - {src, width, height, hostElementSelector}.\"\n      );\n    }\n\n    const iFrame = document.createElement(\"iFrame\");\n    iFrame.onload = onLoadCallback;\n    iFrame.onerror = this.handleLoadError;\n    iFrame.src = src;\n    iFrame.width = width;\n    iFrame.height = height;\n    iFrame.allow = \"microphone; autoplay\";\n    iFrame.id = \"hubspot-calling-extension-iframe\";\n\n    const element = IFrameManager.getHostElement(hostElementSelector);\n    element.innerHTML = \"\";\n    element.appendChild(iFrame);\n\n    return element.querySelector(\"iFrame\");\n  }\n\n  handleLoadError() {\n    this.onMessageHandler({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].SYNC_ACK_FAILED\n    });\n  }\n\n  updateIFrameSize(sizeInfo) {\n    const { width, height } = sizeInfo;\n    const formatSize = size => (typeof size === \"number\" ? `${size}px` : size);\n    if (width) {\n      this.iFrame.setAttribute(\"width\", formatSize(width));\n    }\n    if (height) {\n      this.iFrame.setAttribute(\"height\", formatSize(height));\n    }\n  }\n\n  onReady() {\n    this.isReady = true;\n    this.onMessageHandler({\n      type: _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].READY\n    });\n  }\n  /*\n   * Unload the iFrame\n   */\n  remove() {\n    window.removeEventListener(\"message\", this.messageHandler);\n\n    if (this.iFrame) {\n      const element = IFrameManager.getHostElement(\n        this.options.iFrameOptions.hostElementSelector\n      );\n      element.innerHTML = \"\";\n\n      this.isReady = false;\n      this.iFrame = null;\n      this.options = null;\n    }\n  }\n\n  /*\n   * Send a message to the destination window.\n   */\n  sendMessage(message, callback) {\n    const { type } = message;\n    if (type !== _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].SYNC && !this.isReady) {\n      // Do not send a message unless the iFrame is ready to receive.\n      console.warn(\"iFrame not initialized to send a message\", message);\n      return;\n    }\n\n    let { messageId } = message;\n    if (!messageId) {\n      // Initiating a new message\n      messageId = IFrameManager.createMessageId(this.instanceId);\n      if (callback) {\n        // Keep track of the callback\n        this.callbacks[messageId] = callback;\n      }\n    }\n\n    const newMessage = Object.assign({}, message, {\n      messageId\n    });\n\n    this.logDebugMessage(\"postMessage\", type, message);\n    this.destinationWindow.postMessage(newMessage, this.destinationHost);\n  }\n\n  onMessage(event) {\n    const { data, origin } = event;\n    const { type } = event.data;\n    if (type === _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].SYNC) {\n      // The iFrame host can send this message multiple times, don't respond more than once\n      if (!this.isReady) {\n        this.isReady = true;\n\n        const message = Object.assign({}, event.data, {\n          type: _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].SYNC_ACK,\n          debugMode: this.debugMode,\n          version: _Constants__WEBPACK_IMPORTED_MODULE_0__[\"VERSION\"],\n          iFrameUrl: IFrameManager.extractHostFromUrl(window.location.href)\n        });\n\n        const { hostUrl } = event.data;\n        this.destinationHost = hostUrl || this.destinationHost;\n        this.sendMessage(message);\n        this.onReady();\n      }\n      return;\n    }\n\n    if (this.destinationHost !== origin) {\n      // Ignore messages from an unknown origin\n      return;\n    }\n\n    if (type === _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].SET_WIDGET_URL) {\n      const { iFrameUrl } = data;\n      this.destinationHost = iFrameUrl || this.destinationHost;\n      return;\n    }\n\n    const { messageId } = data;\n\n    if (!messageId || !type) {\n      return;\n    }\n\n    this.logDebugMessage(\"onMessage\", type, { data });\n    if (this.instanceRegexp.test(messageId)) {\n      // This is a response to some message generated by HubSpot\n      const callBack = this.callbacks[messageId];\n      if (callBack) {\n        callBack(data);\n        delete this.callbacks[messageId];\n      }\n      return;\n    }\n\n    // This is a new message, let the handler handle it.\n    this.onMessageHandler(data);\n  }\n\n  sendSync() {\n    // No SYNC_ACK message after 30sec results in a failure\n    if (Date.now() - this.firstSyncSent > 30000) {\n      this.onMessageHandler({\n        type: _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].SYNC_ACK_FAILED\n      });\n      return;\n    }\n\n    this.sendMessage(\n      {\n        type: _Constants__WEBPACK_IMPORTED_MODULE_0__[\"messageType\"].SYNC,\n        hostUrl: IFrameManager.extractHostFromUrl(window.location.href)\n      },\n      eventData => {\n        const { iFrameUrl } = eventData;\n        this.destinationHost = iFrameUrl || this.destinationHost;\n        this.onReady();\n        this.debugMode = eventData && eventData.debugMode;\n      }\n    );\n\n    // In cases where the call widget loads the calling extensions asynchronously, message\n    // handlers may not be set up - retry until a response from the iFrame\n    window.setTimeout(() => {\n      if (this.iFrame && !this.isReady) {\n        this.sendSync();\n      }\n    }, 100);\n  }\n\n  logDebugMessage(...args) {\n    if (this.debugMode) {\n      const msg = this.isIFrameHost ? \"IFrame host\" : \"IFrame\";\n      args.unshift(msg);\n      console.log.call(null, args);\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IFrameManager);\n\n\n//# sourceURL=webpack:///./node_modules/@hubspot/calling-extensions-sdk/src/IFrameManager.js?");

/***/ })

/******/ });
});