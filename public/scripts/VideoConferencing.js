//'use strict';

const domain = 'meet.jit.si';
const attendantName = localStorage.getItem("Attending_name");
const attendantRole = localStorage.getItem("Attending_role");
const courseT = localStorage.getItem("Live_course_title");
const lecT = localStorage.getItem("Live_lecture_title");
const lecD = localStorage.getItem("Live_lecture_desc"); //Add for email and displayName.
const tutorDetails = {
                      email: 'user@gmail.com',
                      displayName: attendantName
                     };
const vidWindow = document.getElementById('videoB');
const aCanvas = document.getElementById('activeCanvas');
var context = aCanvas.getContext('2d');
const theVidToTest = document.getElementById('testVid');  //https://meet.jit.si/Law_Contracts meeting invite
theVidToTest.style.visibility = "hidden";

var vidCallAPI;
var runningStream;
var mediaStreams = new Array();
var recordedChunks = new Array();
var sourcePic;
var recorder;
var isRecording = false;
var rollingTape;

document.querySelector('#courseTi').innerHTML = courseT;
document.querySelector('#l_T').innerHTML = lecT;
document.querySelector('#l_D').innerHTML = lecD;


document.addEventListener('DOMContentLoaded',  async function(r) {
  const options = {
    roomName: courseT + "_" + lecT,
    width: 1280,
    height: 720,
    parentNode: vidWindow,
    userInfo: tutorDetails,
    lang: 'en'
  };
  vidCallAPI =  await new JitsiMeetExternalAPI(domain, options);

  vidCallAPI.addListener('videoConferenceJoined', (creatorIn) => beginTutorLiveWork(creatorIn));
  //vidCallAPI.addListener('videoConferenceLeft', (creatorout) => cleanUpTutorLive(creatorout));
});

 async function beginTutorLiveWork(aCallback){
    //StartRecording
    var cStream;
    await setTimeout(function(){
                          console.log("About to record");
                          alert("This lecture will be recorded");
                         }, 3000);

    await navigator.mediaDevices.getUserMedia({
     video: false,
     audio: true
    }).then(async function(stream1){
                                    mediaStreams.push(stream1);
                                    //var cStream = aCanvas.captureStream(30);
                                   // cStream.addTrack(stream1.getAudioTracks()[0]);
                                   });

    await navigator.mediaDevices.getDisplayMedia({
     video: {
             cursor: "always",
             width: 1280,
             height: 720
            },
     audio: false
    }).then(function(stream2){
                           theVidToTest.srcObject = stream2;
                           runningStream = stream2;
                           //mediaStreams.push(aCanvas);
                           cStream = aCanvas.captureStream(30);
                           mediaStreams.push(cStream);
                          });
    rollingTape = setInterval(gettingCanvas, 50); //Argument 3 and 4 are for parameters.

    cStream.addTrack(mediaStreams[0].getAudioTracks()[0]);
    console.log(cStream.getTracks());

    diversion(cStream);
    
    /*
    recorder = new RecordRTC(cStream, {
                                           type: 'video',
                                           frameInterval: 90,
                                           video: {
                                                    width: 1280,
                                                    height: 720
                                                   },
                                            mimeType: 'video/webm',
                                            recorderType: MediaStreamRecorder,
                                            disableLogs: true,
                                            bitsPerSecond: 128000,
                                            videoBitsPerSecond: 128000
                                          });

                                          /*
    recorder = new MultiStreamRecorder(mediaStreams, {
                                                     type: 'video',
                                                     video: {
                                                             width: 1280,
                                                             height: 720
                                                            },
                                                     mimeType: 'video/webm',
                                                     recorderType: MediaStreamRecorder,
                                                     disableLogs: true,
                                                     bitsPerSecond: 128000,
                                                     videoBitsPerSecond: 128000
                                                    });
   recorder.record(); */


/*
   recorder = new MRecordRTC();

   recorder.addStream(mediaStreams[0]);
   recorder.mediaType = {
    audio: true,
    video: CanvasRecorder
   };

   recorder.addStream(mediaStreams[1]);
   /*
   recorder.mediaType = {
    audio: true,
    video: false
   }; 


    recorder.startRecording();
    isRecording = true;
    */

    //Create listeners for attendance
 }



  function cleanUpTutorLive(aCallback){
    //Stop recording and arrange it
    recorder.stopRecording(function(){
     isRecording = false;
     //video.src = URL.createObjectURL(blob);
     let blob = recorder.getBlob();
     invokeSaveAsDialog(blob);
    });
    clearInterval(rollingTape);
    const tracks = runningStream.getTracks();
    tracks.forEach(track => track.stop());
    //vidCallAPI.dispose();

    //Compile attendance.
    //call dispose on api iFrame.
  }

  function gettingCanvas(){
     context.drawImage(
                       theVidToTest,
                       0,
                       0,
                       aCanvas.width,
                       aCanvas.height
                      );
  }



  function diversion(canvasStreamToUse){
var options = { mimeType: "video/webm; codecs=vp9" };
mediaRecorder = new MediaRecorder(canvasStreamToUse, options);

mediaRecorder.ondataavailable = handleDataAvailable;
mediaRecorder.start();

// demo: to download after 9sec
setTimeout(event => {
  console.log("stopping");
  mediaRecorder.stop();
}, 5000);

}

function handleDataAvailable(event) {
  console.log("data-available");
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    console.log(recordedChunks);
    download();
  } else {
     console.log("Waiting for data....");
  }
}
function download() {
  var blob = new Blob(recordedChunks, {
    type: "video/webm"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}


    /*
    var firstStream, secondStream;

    await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
   }).then(async function(str2){mediaStreams.push(str2)});

    await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: "always"
    },
    audio: false
   }).then(async function(str1){mediaStreams.push(str1)});

   recorder = new MultiStreamRecorder(mediaStreams, {
                                                     type: 'video',
                                                     video: {
                                                             width: 1280,
                                                             height: 720
                                                            },
                                                     mimeType: 'video/webm',
                                                     recorderType: MediaStreamRecorder,
                                                     bitsPerSecond: 128000,
                                                     videoBitsPerSecond: 128000
                                                    });
   recorder.record();
   */
   /*
   await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: "always",
      width: 800,
      height: 600
    },
    audio: false
   }).then(async function(str1){
                                //sourcePic = str1;
                                //console.log(str1);
                                theVidToTest.srcObject = str1;
                               });

   
  /* theVidToTest.addEventListener('play', (thy) => {
                                                   window.setInterval(gettingCanvas(), 50);
                                                   },
                                                   false);

   recorder = new RecordRTC(aCanvas, {
                                           type: 'canvas',
                                           frameInterval: 90,
                                           video: HTMLVideoElement,
                                           canvas: {
                                                    width: 800,
                                                    height: 600
                                                   },
                                            mimeType: 'video/webm',
                                            recorderType: CanvasRecorder,
                                            bitsPerSecond: 128000,
                                            videoBitsPerSecond: 128000
                                          });

   recorder.startRecording();
   isRecordingStarted = true;*/

    //navigator.getUserMedia([mediaConstraints2, mediaConstraints1], (stri) => onMediaSuccess(stri), (anE) => onMediaError(anE));
  //});


  /*

  mediaStreams.push(theVidToTest.srcObject);
  recorder = new RecordRTC(aCanvas, {
                                           type: 'canvas',
                                           frameInterval: 90,
                                           video: HTMLVideoElement,
                                           canvas: {
                                                    width: 800,
                                                    height: 600
                                                   },
                                            mimeType: 'video/webm',
                                            recorderType: CanvasRecorder,
                                            disableLogs: true,
                                            bitsPerSecond: 128000,
                                            videoBitsPerSecond: 128000
                                          });
  recorder.startRecording();
  */