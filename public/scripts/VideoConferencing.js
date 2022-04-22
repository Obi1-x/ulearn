//'use strict';

const domain = 'meet.jit.si';
const attendantName = localStorage.getItem("Attending_name");
const attendantRole = localStorage.getItem("Attending_role");
const courseT = localStorage.getItem("Live_course_title");
const lecT = localStorage.getItem("Live_lecture_title");
const lecD = localStorage.getItem("Live_lecture_desc");
const lecInd = localStorage.getItem("Live_lecture_index");
const recorderOptions = {mimeType: "video/webm; codecs=vp9"};
const tutorDetails = {
                      email: 'user@gmail.com',
                      displayName: attendantName
                     };
const vidWindow = document.getElementById('videoB');
const aCanvas = document.getElementById('activeCanvas');
const context = aCanvas.getContext('2d');
const theVidToTest = document.getElementById('testVid');
theVidToTest.style.display = "none";
aCanvas.style.display = "none";

var vidCallAPI, runningStream, recorder;
var recordStartTime, recordStopTime, fbClone; //Upgrade to a class in future update
var rollingTape, options;
var recordedChunks = new Array();
var attendance = new Array();
var isRecording = false;

document.querySelector('#l_T').innerHTML = lecT;
document.querySelector('#l_D').innerHTML = lecD;

var abcd;


document.addEventListener('DOMContentLoaded',  async function(r) {

 abcd = new AttendanceInfo(123, "John Sherpard", new Date().getTime());
 attendance.push(abcd);
 

  options = {
    roomName: courseT + "_" + lecT,
    width: 1280,
    height: 720,
    parentNode: vidWindow,
    userInfo: tutorDetails,
    lang: 'en'
  };

  vidCallAPI =  await new JitsiMeetExternalAPI(domain, options);

  vidCallAPI.addListener('videoConferenceJoined', (creatorIn) => beginTutorLiveWork(creatorIn));
  vidCallAPI.addListener('videoConferenceLeft', (creatorout) => cleanUpTutorLive(creatorout));
});


 async function beginTutorLiveWork(aCallback){ //Use the callback to to set the lecture link in lecture view. 
    //FOR RECORDING
    var cStream;
    await setTimeout(function(){
                          console.log("About to record");
                          alert("This lecture will be recorded");
                         }, 3000);

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
                           cStream = aCanvas.captureStream(30);
                          });

    await navigator.mediaDevices.getUserMedia({
     video: false,
     audio: true
    }).then(async function(stream1){
                                    cStream.addTrack(stream1.getAudioTracks()[0]);
                                   });

    rollingTape = setInterval(gettingCanvas, 30); //Argument 3 and 4 are for parameters.
    recorder = new MediaRecorder(cStream, recorderOptions);
    recorder.addEventListener('dataavailable', (event) => {
                                                           console.log("Data available");
                                                           if(event.data.size > 0){
                                                              recordedChunks.push(event.data); //Houses the video data
                                                              tidyLectureHall(download());
                                                           }
                                                           });
    recorder.start();
    isRecording = true;
    recordStartTime = new Date().getTime(); //NOTE: Javascripts timestamp is in milliseconds

    //Handles linkage to this live lecture.
    updateLectureLink();

    //Listener for attendance
    vidCallAPI.addListener('participantJoined', (studentIn) => currateMembers(studentIn)); //Compiled after the tutor is live.
 }

  function cleanUpTutorLive(aCallback){
    //Stop recording and arrange it
    if(recorder.state == "recording"){
        recorder.stop();
        const tracks = runningStream.getTracks();
        tracks.forEach(track => track.stop());
        
    }
    isRecording = false;
    clearInterval(rollingTape);
    vidCallAPI.dispose();

    localStorage.removeItem("Attending_name");
    localStorage.removeItem("Attending_role");
    localStorage.removeItem("Live_course_title");
    localStorage.removeItem("Live_lecture_title");
    localStorage.removeItem("Live_lecture_desc");
    localStorage.removeItem("Live_lecture_index");
    window.close();
  }

  function tidyLectureHall(lecFileName){
     if(window.opener != null && !window.opener.closed) {
         window.opener.mountedState.aVidLecture = recordedChunks;
         window.opener.mountedState.vidFileName = lecFileName;
         window.opener.mountedState.anAttendance = attendance;
         window.opener.mountedState.lecRefIndex = lecInd;
         window.opener.mountedState.setState({
                                              lectureUpdate: true,
                                              liveUrlUpdate: false
                                             });
     }//else reopen LectureView
  }

  function currateMembers(studDetails){
      var entryTime = new Date().getTime();
      var lateness = entryTime - recordStartTime;
      if(isRecording && lateness <= 3600000){ //1hour 
            attendance.push(new AttendanceInfo(studDetails.id, studDetails.displayName, entryTime));
            console.log(attendance);
            console.log("Working");
      }
  }

  function gettingCanvas(){
     const newWidth = aCanvas.width - 90;
     const newHeight = aCanvas.height - 60;
     context.drawImage(
                       theVidToTest,
                       20,
                       60,
                       newWidth,
                       newHeight,
                       0,
                       0,
                       aCanvas.width,
                       aCanvas.height
                      );
  }

 function download() {
   const liveLecGivenName = options.roomName + "_" + new Date().getTime();
   var blob = new Blob(recordedChunks, {
     type: "video/webm"
   });
   var url = URL.createObjectURL(blob);
   var a = document.createElement("a");
   document.body.appendChild(a);
   a.style = "display: none";
   a.href = url;
   a.download = liveLecGivenName;
   a.click();
   window.URL.revokeObjectURL(url);
   return liveLecGivenName;
 }

 function updateLectureLink(){
    var holdingName = "https://meet.jit.si/" + options.roomName;
    var holdingArray = Array.from(holdingName);
    var finalLink = "";
    var ind = 0;

    while(ind < holdingArray.length){
       if(holdingArray[ind] == ' ') finalLink += "%20";
       else finalLink += holdingArray[ind];
       ind++;
    }

    window.opener.mountedState.linkToLecture = finalLink;
    window.opener.mountedState.lecRefIndex = lecInd;
    window.opener.mountedState.setState({
                                         lectureUpdate: false,
                                         liveUrlUpdate: true
                                        });
                                        
                                        console.log("linkToLecture: ", window.opener.mountedState.linkToLecture);
                                        console.log("lecRefIndex: ", window.opener.mountedState.lecRefIndex);
 }

 class AttendanceInfo{
  constructor(liveId, dis_Name, attend_time){
	this.displayName = dis_Name;
    this.attendantId = liveId;
    this.attendingTime = attend_time;
	}
}