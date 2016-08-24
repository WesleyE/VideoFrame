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
const FrameRates = {
  film: 24,
  NTSC: 29.97,
  NTSC_Film: 23.98,
  NTSC_HD: 59.94,
  PAL: 25,
  PAL_HD: 50,
  web: 30,
  high: 60,
};


/** Class for VideoFrame */
class VideoFrame {

  /**
  * @class
  * @classdesc Main VideoFrame Implementation.
  * @param {Object} frameRate rate for the video
  * @param {Object} videoElementId for the <video> element
  */
  constructor(frameRate = FrameRates.PAL, videoElementId = null) {
    this.frameRate = frameRate;
    this.videoElement = window.document.getElementById(videoElementId);
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
  registerCallback(callback) {
    return this.callbacks.push(callback);
  }

  /**
  * Removes the callback from the stack.
  * @param {number} callbackId - The id of the callback that handles the response.
  */
  unregisterCallback(callbackId) {
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
  getFrameNumber() {
    return Math.floor(this.video.currentTime.toFixed(5) * this.frameRate);
  }

  /**
  * Event listener for handling callback execution at double the current frame rate interval
  *
  * @param  {String} format - Accepted formats are: SMPTE, time, frame
  * @return {Number} Returns a value at a set interval
  */
  listen(format) {
    this.interval = setInterval(() => {
      if (this.video.paused || this.video.ended) {
        return;
      }

      for (const callback of this.callbacks) {
        if (format === 'SMPTE') {
          callback(this.toSMPTE(), format);
        } else if (format === 'time') {
          callback(this.toTime(), format);
        } else if (format === 'time') {
          callback(this.toTime(), format);
        } else {
          callback(this.getFrameNumber(), format);
        }
      }
    }, (1000 / this.frameRate / 2));
  }

  /**
  * Stops the reporting of video frames to the registered callbacks
  */
  stopListen() {
    clearInterval(this.interval);
  }

  /**
  * Returns the current SMPTE Time code in the video.
  * - Can be used as a conversion utility.
  *
  * @param  {Number} frame - OPTIONAL: Frame number to convert to SMPTE TC
  * @return {String} Returns a SMPTE Time code in HH:MM:SS:FF format
  */
  toSMPTE(frame = null) {
    if (!frame) {
      return this.toTime(this.video.currentTime);
    }

    const frameNumber = Number(frame);
    const fps = this.frameRate;

    const hour = ((fps * 60) * 60);
    const minute = (fps * 60);
    const hours = Math.floor(frameNumber / hour).toFixed(0);
    const minutes = (Number((frameNumber / minute).toString().split('.')[0]) % 60);
    const seconds = (Number((frameNumber / fps).toString().split('.')[0]) % 60);

    // eslint-disable-next-line max-len
    return `${VideoFrame.pad(hours)}:${VideoFrame.pad(minutes)}:${VideoFrame.pad(seconds)}:${VideoFrame.pad(frameNumber % fps)}`;
  }

  /**
  * Returns the current time code in the video in HH:MM:SS format
  * - used internally for conversion to SMPTE format.
  *
  * @param  {Number} frames - The current time in the video
  * @return {String} Returns the time code in the video
  */
  toTime(frames) {
    let time = frames;
    if (typeof frames !== 'number') {
      time = this.video.currentTime;
    }
    const frameRate = this.frameRate;

    const dt = new Date();

    let format = 'hh:mm:ss';
    if (typeof frames === 'number') {
      format = `${format}:ff`;
    }

    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(time * 1000);

    return format.replace(/hh|mm|ss|ff/g, () => {
      switch (format) {
        case 'hh': return VideoFrame.pad(dt.getHours() < 13 ? dt.getHours() : (dt.getHours() - 12));
        case 'mm': return VideoFrame.pad(dt.getMinutes());
        case 'ss': return VideoFrame.pad(dt.getSeconds());
        case 'ff': return VideoFrame.pad(Math.floor(((time % 1) * frameRate)));
        default: return '';
      }
    });
  }

  /**
  * Converts a SMPTE Time code to Seconds
  *
  * @param  {String} SMPTE - a SMPTE time code in HH:MM:SS:FF format
  * @return {Number} Returns the Second count of a SMPTE Time code
  */
  toSeconds(SMPTE) {
    if (!SMPTE) {
      return Math.floor(this.video.currentTime);
    }
    const time = SMPTE.split(':');
    return (((Number(time[0]) * 60) * 60) + (Number(time[1]) * 60) + Number(time[2]));
  }

  /**
  * Converts a SMPTE Time code, or standard time code to Milliseconds
  *
  * @param  {String} SMPTE OPTIONAL: a SMPTE time code in HH:MM:SS:FF format,
  * or standard time code in HH:MM:SS format.
  * @return {Number} Returns the Millisecond count of a SMPTE Time code
  */
  toMilliseconds(SMPTE) {
    let frames = Number(this.toSMPTE().split(':')[3]);
    if (!SMPTE) {
      frames = Number(SMPTE.split(':')[3]);
    }

    const milliseconds = (1000 / this.frameRate) * (isNaN(frames) ? 0 : frames);
    return Math.floor(((this.toSeconds(SMPTE) * 1000) + milliseconds));
  }

  /**
  * Wraps the N in leading zero's
  *
  * @param  {Number} n - The number to be padded
  * @return {String} Returns the time code in the video
  */
  static pad(n) {
    if (n < 10) {
      return `0${n}`;
    }
    return n.toString();
  }

}

export default VideoFrame;
