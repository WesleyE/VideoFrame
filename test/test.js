import 'babel-polyfill'
import 'assert'
import path from 'path'

// Import chai.
import chai from 'chai';
chai.should();

// Import the VideoFrame class.
let VideoFrame = require(path.join(__dirname, '..', 'dist', 'VideoFrame.js'));

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
     });

  });

});
