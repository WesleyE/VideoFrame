import 'babel-polyfill'
import 'assert'
import path from 'path'

// Import chai.
import chai from 'chai';
chai.should();

// Import the VideoFrame class.
let VideoFrame = require(path.join(__dirname, '..', 'dist', 'VideoFrame.js')).default;

describe('VideoFrame', () => {

  describe('#toSeconds', () => {

    let videoFrame;
     beforeEach(() => {
       // Create a new VideoFrame object before every test.
       videoFrame = new VideoFrame();
     });

     it('should return 1 when SMPTE is 00:00:01:00', () => {
       videoFrame.toSeconds('00:00:01:00').should.equal(1);
     });

     it('should return 3600 when SMPTE is 01:00:00:00', () => {
       videoFrame.toSeconds('01:00:00:00').should.equal(3600);
     });

  });

  describe('#toMilliseconds', () => {

    let videoFrame;
     beforeEach(() => {
       // Create a new VideoFrame object before every test.
       videoFrame = new VideoFrame();
     });

     it('should return 1000 when SMPTE is 00:00:01:00', () => {
       videoFrame.toMilliseconds('00:00:01:00').should.equal(1000);
     });

     it('should return 3600000 when SMPTE is 01:00:00:00', () => {
       videoFrame.toMilliseconds('01:00:00:00').should.equal(3600000);
     });

  });

  describe('#toSMPTE', () => {

    let videoFrame;
     beforeEach(() => {
       // Create a new VideoFrame object before every test.
       videoFrame = new VideoFrame();
     });

     it('should return 00:00:01:00 when frames is 25', () => {
       videoFrame.toSMPTE(25).should.equal('00:00:01:00');
     });

     it('should return 01:00:00:00 when frames is 90000', () => {
       videoFrame.toSMPTE(90000).should.equal('01:00:00:00');
     });

  });

  /*describe('#toTime', () => {

    let videoFrame;
     beforeEach(() => {
       // Create a new VideoFrame object before every test.
       videoFrame = new VideoFrame();
     });

     it('should return 00:00:00:01 when frames is 1', () => {
       videoFrame.toTime(1).should.equal('00:00:00:01');
     });


     it('should return 01:00:00:00 when frames is 50', () => {
       videoFrame.toTime(50).should.equal('00:00:02:00');
     });

  });*/

  describe('callback registration should', () => {

    let videoFrame;
     beforeEach(() => {
       // Create a new VideoFrame object before every test.
       videoFrame = new VideoFrame();
     });

     it('have a callback on the stack after registration', () => {
       let index = videoFrame.registerCallback(() => {});
       index.should.equal(0);
       videoFrame.callbacks.should.have.length(1);
     });

     it('have no callbacks on the stack after deletion', () => {
       let index = videoFrame.registerCallback(() => {});
       videoFrame.unregisterCallback(index);
       videoFrame.callbacks.should.have.length(0);
     });

  });

  describe('#pad', () => {

    let videoFrame;
     beforeEach(() => {
       // Create a new VideoFrame object before every test.
       videoFrame = new VideoFrame();
     });

     it('should return the number as a string when > 10', () => {
       VideoFrame.pad(10).should.equal('10');
       VideoFrame.pad(11).should.equal('11');
     });

     it('should return the padded number as a string when < 10', () => {
       VideoFrame.pad(8).should.equal('08');
       VideoFrame.pad(0).should.equal('00');
     });

  });

});
