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
!function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i={film:24,NTSC:29.97,NTSC_Film:23.98,NTSC_HD:59.94,PAL:25,PAL_HD:50,web:30,high:60},a=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?i.PAL:arguments[0],n=arguments.length<=1||void 0===arguments[1]?null:arguments[1];r(this,e),this.frameRate=t,this.videoElement=window.document.getElementById(n),this.callbacks=[]}return n(e,[{key:"registerCallback",value:function(e){return this.callbacks.push(e)}},{key:"unregisterCallback",value:function(e){return e>-1&&this.callbacks.splice(e,1),!1}},{key:"getFrameNumber",value:function(){return Math.floor(this.video.currentTime.toFixed(5)*this.frameRate)}},{key:"listen",value:function(e){var t=this;this.interval=setInterval(function(){if(!t.video.paused&&!t.video.ended){var r=!0,n=!1,i=void 0;try{for(var a,o=t.callbacks[Symbol.iterator]();!(r=(a=o.next()).done);r=!0){var u=a.value;"SMPTE"===e?u(t.toSMPTE(),e):"time"===e?u(t.toTime(),e):"time"===e?u(t.toTime(),e):u(t.getFrameNumber(),e)}}catch(s){n=!0,i=s}finally{try{!r&&o["return"]&&o["return"]()}finally{if(n)throw i}}}},1e3/this.frameRate/2)}},{key:"stopListen",value:function(){clearInterval(this.interval)}},{key:"toSMPTE",value:function(){var t=arguments.length<=0||void 0===arguments[0]?null:arguments[0];if(!t)return this.toTime(this.video.currentTime);var r=Number(t),n=this.frameRate,i=60*n*60,a=60*n,o=(r/i).toFixed(0),u=Number((r/a).toString().split(".")[0])%60,s=Number((r/n).toString().split(".")[0])%60;return e.pad(o)+":"+e.pad(u)+":"+e.pad(s)+":"+e.pad(r%n)}},{key:"toTime",value:function(t){var r=t;"number"!=typeof t&&(r=this.video.currentTime);var n=this.frameRate,i=new Date,a="hh:mm:ss";return"number"==typeof t&&(a+=":ff"),i.setHours(0),i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(1e3*r),a.replace(/hh|mm|ss|ff/g,function(){switch(a){case"hh":return e.pad(i.getHours()<13?i.getHours():i.getHours()-12);case"mm":return e.pad(i.getMinutes());case"ss":return e.pad(i.getSeconds());case"ff":return e.pad(Math.floor(r%1*n));default:return""}})}},{key:"toSeconds",value:function(e){if(!e)return Math.floor(this.video.currentTime);var t=e.split(":");return 60*Number(t[0])*60+60*Number(t[1])+Number(t[2])}},{key:"toMilliseconds",value:function(e){var t=Number(this.toSMPTE().split(":")[3]);e||(t=Number(e.split(":")[3]));var r=1e3/this.frameRate*(isNaN(t)?0:t);return Math.floor(1e3*this.toSeconds(e)+r)}}],[{key:"pad",value:function(e){return e<10?"0"+e:e.toString()}}]),e}();t["default"]=a}]);