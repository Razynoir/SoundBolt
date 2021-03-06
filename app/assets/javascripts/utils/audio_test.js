// // AUDIO CONTEXT
// window.AudioContext = window.AudioContext || window.webkitAudioContext ;
//
// var audioContext = new AudioContext();
// var currentBuffer  = null;
//
// // CANVAS
// var canvasWidth = 512;
// var canvasHeight = 120 ;
// var newCanvas   = createCanvas (canvasWidth, canvasHeight);
// var context     = newCanvas.getContext('2d');
//
// window.onload = appendCanvas;
// function appendCanvas() { document.body.appendChild(newCanvas);
//                           context = newCanvas.getContext('2d'); }
//
// // MUSIC LOADER + DECODE
// function loadMusic(url) {
//     var req = new XMLHttpRequest();
//     req.open( "GET", url, true );
//     req.responseType = "arraybuffer";
//     req.onreadystatechange = function (e) {
//           if (req.readyState == 4) {
//              if(req.status == 200)
//                   audioContext.decodeAudioData(req.response,
//                     function(buffer) {
//                              currentBuffer = buffer;
//                              displayBuffer2(buffer);
//                     }, onDecodeError);
//           }
//     } ;
//     req.send();
// }
//
// function onDecodeError(){}
//
// // MUSIC DISPLAY
// function displayBuffer2(buff /* is an AudioBuffer */) {
//    var leftChannel = buff.getChannelData(0); // Float32Array describing left channel
//    // we 'resample' with cumul, count, variance
//    // Offset 0 : PositiveCumul  1: PositiveCount  2: PositiveVariance
//    //        3 : NegativeCumul  4: NegativeCount  5: NegativeVariance
//    // that makes 6 data per bucket
//   //  var resampled = new Float64Array(canvasWidth * 6 );
//    var resampled = new Float64Array(100);
//
//    var i=0, j=0, buckIndex = 0;
//    var min=1e3, max=-1e3;
//    var thisValue=0, res=0;
//    var sampleCount = leftChannel.length;
//    // first pass for mean
//    for (i=0; i<sampleCount; i++) {
//         // in which bucket do we fall ?
//         buckIndex = 0 | ( canvasWidth * i / sampleCount );
//         // buckIndex *= 6;
//         // positive or negative ?
//         thisValue = leftChannel[i];
//         if (thisValue>0) {
//             resampled[buckIndex    ] += thisValue;
//             resampled[buckIndex + 1] +=1;
//         } else if (thisValue<0) {
//             resampled[buckIndex + 3] += thisValue;
//             resampled[buckIndex + 4] +=1;
//         }
//         if (thisValue<min) min=thisValue;
//         if (thisValue>max) max = thisValue;
//    }
//    // compute mean now
//    for (i=0, j=0; i<canvasWidth; i++, j+=6) {
//        if (resampled[j+1] != 0) {
//              resampled[j] /= resampled[j+1]; ;
//        }
//        if (resampled[j+4]!= 0) {
//              resampled[j+3] /= resampled[j+4];
//        }
//    }
//    // second pass for mean variation  ( variance is too low)
//    for (i=0; i<leftChannel.length; i++) {
//         // in which bucket do we fall ?
//         buckIndex = 0 | (canvasWidth * i / leftChannel.length );
//         buckIndex *= 6;
//         // positive or negative ?
//         thisValue = leftChannel[i];
//         if (thisValue>0) {
//             resampled[buckIndex + 2] += Math.abs( resampled[buckIndex] - thisValue );
//         } else  if (thisValue<0) {
//             resampled[buckIndex + 5] += Math.abs( resampled[buckIndex + 3] - thisValue );
//         }
//    }
//
//    // compute mean variation/variance now
//    for (i=0, j=0; i<canvasWidth; i++, j+=6) {
//         if (resampled[j+1]) resampled[j+2] /= resampled[j+1];
//         if (resampled[j+4]) resampled[j+5] /= resampled[j+4];
//    }
// }
//
// function createCanvas ( w, h ) {
//     var newCanvas = document.createElement('canvas');
//     newCanvas.width  = w;
//     newCanvas.height = h;
//     return newCanvas;
// };
//
// loadMusic('https://www.filepicker.io/api/file/Q4eVWdTTae2yfNgneJyY');
