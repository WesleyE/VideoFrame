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

  });

});
