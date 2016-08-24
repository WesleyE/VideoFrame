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

class VideoFrame {
  constructor(fps = FrameRates.PAL, videoElementId) {
    this.fps = fps;
    this.videoElement = window.document.getElementById(videoElementId);
  }

  /**
	 * Returns the current frame number
   */
  getFrameNumber() {
    return Math.floor(this.video.currentTime.toFixed(5) * this.frameRate);
  }

  /**
	 * Runs at frameRate * 2
   */
  listen() {
  }

  stopListen() {
    clearInterval(this.interval);
  }

}


export default VideoFrame;
