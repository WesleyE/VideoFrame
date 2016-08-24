/*!
 * MIT License
 * 
 * Original work (c) 2012 Allen Sarkisyan - Released under the Open Source MIT License
 * Modified work Copyright 2016 Wesley Elfring
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VideoFrame", [], factory);
	else if(typeof exports === 'object')
		exports["VideoFrame"] = factory();
	else
		root["VideoFrame"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*!
	MIT License

	Original work (c) 2012 Allen Sarkisyan - Released under the Open Source MIT License
	Modified work Copyright 2016 Wesley Elfring

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	*/

	/**
	* FrameRates - Industry standard frame rates
	*/
	var FrameRates = {
	  film: 24,
	  NTSC: 29.97,
	  NTSC_Film: 23.98,
	  NTSC_HD: 59.94,
	  PAL: 25,
	  PAL_HD: 50,
	  web: 30,
	  high: 60
	};

	/** Class for VideoFrame */

	var VideoFrame = function () {

	  /**
	  * @class
	  * @classdesc Main VideoFrame Implementation.
	  * @param {Object} frameRate rate for the video
	  * @param {Object} videoElementId for the <video> element
	  */
	  function VideoFrame() {
	    var frameRate = arguments.length <= 0 || arguments[0] === undefined ? FrameRates.PAL : arguments[0];
	    var videoElementId = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	    _classCallCheck(this, VideoFrame);

	    this.frameRate = frameRate;

	    // Make sure window is defined (it is not in tests)
	    if (typeof window !== 'undefined') {
	      this.videoElement = window.document.getElementById(videoElementId);
	    } else {
	      this.videoElement = null;
	    }

	    this.callbacks = [];
	  }

	  /**
	  * Reports the current time
	  *
	  * @callback frameCallback
	  * @param {number} responseCode
	  * @param {string} responseMessage
	  */

	  /**
	  * Add a callback to the stack. This reports the current time every 0,5 video frames
	  * @param {frameCallback} callback - The callback that handles the response.
	  */


	  _createClass(VideoFrame, [{
	    key: 'registerCallback',
	    value: function registerCallback(callback) {
	      return this.callbacks.push(callback);
	    }

	    /**
	    * Removes the callback from the stack.
	    * @param {number} callbackId - The id of the callback that handles the response.
	    */

	  }, {
	    key: 'unregisterCallback',
	    value: function unregisterCallback(callbackId) {
	      if (callbackId > -1) {
	        this.callbacks.splice(callbackId, 1);
	      }

	      return false;
	    }

	    /**
	    * Returns the current frame number
	    *
	    * @return {Number} - Frame number in video
	    */

	  }, {
	    key: 'getFrameNumber',
	    value: function getFrameNumber() {
	      return Math.floor(this.video.currentTime.toFixed(5) * this.frameRate);
	    }

	    /**
	    * Event listener for handling callback execution at double the current frame rate interval
	    *
	    * @param  {String} format - Accepted formats are: SMPTE, time, frame
	    * @return {Number} Returns a value at a set interval
	    */

	  }, {
	    key: 'listen',
	    value: function listen(format) {
	      var _this = this;

	      this.interval = setInterval(function () {
	        if (_this.video.paused || _this.video.ended) {
	          return;
	        }

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _this.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var callback = _step.value;

	            if (format === 'SMPTE') {
	              callback(_this.toSMPTE(), format);
	            } else if (format === 'time') {
	              callback(_this.toTime(), format);
	            } else if (format === 'time') {
	              callback(_this.toTime(), format);
	            } else {
	              callback(_this.getFrameNumber(), format);
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }, 1000 / this.frameRate / 2);
	    }

	    /**
	    * Stops the reporting of video frames to the registered callbacks
	    */

	  }, {
	    key: 'stopListen',
	    value: function stopListen() {
	      clearInterval(this.interval);
	    }

	    /**
	    * Returns the current SMPTE Time code in the video.
	    * - Can be used as a conversion utility.
	    *
	    * @param  {Number} frame - OPTIONAL: Frame number to convert to SMPTE TC
	    * @return {String} Returns a SMPTE Time code in HH:MM:SS:FF format
	    */

	  }, {
	    key: 'toSMPTE',
	    value: function toSMPTE() {
	      var frame = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	      if (!frame) {
	        return this.toTime(this.video.currentTime);
	      }

	      var frameNumber = Number(frame);
	      var fps = this.frameRate;

	      var hour = fps * 60 * 60;
	      var minute = fps * 60;
	      var hours = Math.floor(frameNumber / hour).toFixed(0);
	      var minutes = Number((frameNumber / minute).toString().split('.')[0]) % 60;
	      var seconds = Number((frameNumber / fps).toString().split('.')[0]) % 60;

	      // eslint-disable-next-line max-len
	      return VideoFrame.pad(hours) + ':' + VideoFrame.pad(minutes) + ':' + VideoFrame.pad(seconds) + ':' + VideoFrame.pad(frameNumber % fps);
	    }

	    /**
	    * Returns the current time code in the video in HH:MM:SS format
	    * - used internally for conversion to SMPTE format.
	    *
	    * @param  {Number} frames - The current time in the video
	    * @return {String} Returns the time code in the video
	    */

	  }, {
	    key: 'toTime',
	    value: function toTime(frames) {
	      var time = frames;
	      if (typeof frames !== 'number') {
	        time = this.video.currentTime;
	      }
	      var frameRate = this.frameRate;

	      var dt = new Date();

	      var format = 'hh:mm:ss';
	      if (typeof frames === 'number') {
	        format = format + ':ff';
	      }

	      dt.setHours(0);
	      dt.setMinutes(0);
	      dt.setSeconds(0);
	      dt.setMilliseconds(time * 1000);

	      return format.replace(/hh|mm|ss|ff/g, function () {
	        switch (format) {
	          case 'hh':
	            return VideoFrame.pad(dt.getHours() < 13 ? dt.getHours() : dt.getHours() - 12);
	          case 'mm':
	            return VideoFrame.pad(dt.getMinutes());
	          case 'ss':
	            return VideoFrame.pad(dt.getSeconds());
	          case 'ff':
	            return VideoFrame.pad(Math.floor(time % 1 * frameRate));
	          default:
	            return '';
	        }
	      });
	    }

	    /**
	    * Converts a SMPTE Time code to Seconds
	    *
	    * @param  {String} SMPTE - a SMPTE time code in HH:MM:SS:FF format
	    * @return {Number} Returns the Second count of a SMPTE Time code
	    */

	  }, {
	    key: 'toSeconds',
	    value: function toSeconds(SMPTE) {
	      if (!SMPTE) {
	        return Math.floor(this.video.currentTime);
	      }
	      var time = SMPTE.split(':');
	      return Number(time[0]) * 60 * 60 + Number(time[1]) * 60 + Number(time[2]);
	    }

	    /**
	    * Converts a SMPTE Time code, or standard time code to Milliseconds
	    *
	    * @param  {String} SMPTE OPTIONAL: a SMPTE time code in HH:MM:SS:FF format,
	    * or standard time code in HH:MM:SS format.
	    * @return {Number} Returns the Millisecond count of a SMPTE Time code
	    */

	  }, {
	    key: 'toMilliseconds',
	    value: function toMilliseconds(SMPTE) {
	      var frames = Number(this.toSMPTE().split(':')[3]);
	      if (!SMPTE) {
	        frames = Number(SMPTE.split(':')[3]);
	      }

	      var milliseconds = 1000 / this.frameRate * (isNaN(frames) ? 0 : frames);
	      return Math.floor(this.toSeconds(SMPTE) * 1000 + milliseconds);
	    }

	    /**
	    * Wraps the N in leading zero's
	    *
	    * @param  {Number} n - The number to be padded
	    * @return {String} Returns the time code in the video
	    */

	  }], [{
	    key: 'pad',
	    value: function pad(n) {
	      if (n < 10) {
	        return '0' + n;
	      }
	      return n.toString();
	    }
	  }]);

	  return VideoFrame;
	}();

	module.exports = VideoFrame;

/***/ }
/******/ ])
});
;