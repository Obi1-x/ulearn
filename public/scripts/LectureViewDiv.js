'use strict';

var PopulateAfterReturn, lecturesObjectArray, mountedState;

class LectureViewDiv extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
                    lectureUpdate: false,
                    liveUrlUpdate: false
                   };
      this.linkToLecture = null;

      this.anAttendance = null;
      this.aVidLecture = null;
      this.vidFileName = null;
      this.lecRefIndex = null;
  }

  componentDidMount(){
   mountedState = this;
  }

  addcourse_ToList(clickarg){
    var courseListRef = '/ulearnData/userData/Students/' + USERNAME + '/courseList/' + this.props.populateCourseWith.courseTitle + "_" + this.props.populateCourseWith.creator;
    var courseInteractionRef = '/ulearnData/appData/courseInteractions/' + this.props.populateCourseWith.courseTitle + "_" + this.props.populateCourseWith.creator + '/' + USERNAME
    var timeStamp = new Date().getTime();
    firebase.database().ref(courseListRef + '/').set(timeStamp, (error)=>{
       if(!error){
          document.querySelector('#' + this.props.populateCourseWith.courseTitle + '_addBtn').disabled = true;
          console.log("Added to course list");
       }
    });
    firebase.database().ref(courseInteractionRef + '/').set(timeStamp);
   }

  addLiveLectureVid(theLecture, courseT){ //Later change mp4 to webm
        var liveLecVidNDetails;
        const classVidDir = '/ulearnData/lectures/' + courseT + '_' + theLecture.lectureTopic + '/' + this.vidFileName + ".mp4";
        const classUrlDir = '/ulearnData/appData/lectures/' + this.props.populateCourseWith.courseTitle + '_' + this.props.populateCourseWith.creator + '/' + theLecture.lectureTopic + '_' + this.props.populateCourseWith.courseTitle + '_' + this.props.populateCourseWith.creator;
        
        if(this.state.lectureUpdate && this.lecRefIndex == theLecture.lectureIndex && this.aVidLecture != null){
            //UPLOAD VIDEO LECTURE.
            var finishedLiveLecture = new File(this.aVidLecture, this.vidFileName, {type: "video/mp4"});
            liveLecVidNDetails = this.buildTheVideoHtml(theLecture, "null");
            var uploadStream = firebase.storage().ref(classVidDir).put(finishedLiveLecture);
            uploadStream.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                                                         console.log(snapshot.state);
                                                         },
                                                         (error) => {
                                                          // Handle unsuccessful uploads
                                                          console.log(error);
                                                          console.log("Upload unsuccessful");
                                                          }, 
                                                         (complete) => {
                                                          // Handle successful uploads on complete.
                                                          console.log("Upload successful");
                                                          firebase.storage().ref(classVidDir).getDownloadURL().then((downloadURL) => {
                                                            firebase.database().ref(classUrlDir + "/lectureVidUrl/").set(downloadURL);
                                                            var vidWindow = document.getElementById("liveLecDiv_" + theLecture.lectureIndex);
                                                            var theHtmlVid = vidWindow.children[0];
                                                            theHtmlVid.children[0].src = downloadURL;
                                                            theHtmlVid.load();
                                                          });
                                                          //Remove live lecture link from DB.
                                                          firebase.database().ref(classUrlDir + "/lectureLink/").remove();
                                                          uploadStream.off();
                                                         }
                                                       );



            //Upload Attendance.
            if(this.anAttendance != null){
               console.log("Uploading attendance")
               firebase.database().ref(classUrlDir + "/lectureVidAttendance/").set(this.anAttendance, (error)=>{
                                                                    if(!error){
                                                                       console.log("Attendance uploaded");
                                                                       //Build and display the attendance.
                                                                       //var attendList = document.getElementById("liveLecAttend_" + theLecture.lectureIndex);
                                                                    }else console.log("Failed to upload attendance");
                                                                                                 });
            }
            
            this.state.lectureUpdate = false; //return to default
            this.aVidLecture = null;
            this.vidFileName = null;
            this.anAttendance = null;
            this.lecRefIndex = null;
        }else if(this.state.liveUrlUpdate && this.lecRefIndex == theLecture.lectureIndex && this.linkToLecture != null){
        console.log(this.linkToLecture);
            //Upload link to DB
            firebase.database().ref(classUrlDir + "/lectureLink/").set(this.linkToLecture, (error) => {
                                                                    if(error){
                                                                       console.log("Lecture link upload failed");
                                                                       //Retry
                                                                    }else if(!error){
                                                                       console.log("Lecture link uploaded");
                                                                       this.linkToLecture = null;
                                                                       this.lecRefIndex = null;
                                                                    }
                                                                                           });
            
            this.state.liveUrlUpdate = false;
        }else{
           if(theLecture.lectureVidUrl != null && theLecture.lectureLink == null) liveLecVidNDetails = this.buildTheVideoHtml(theLecture, theLecture.lectureVidUrl);
           else if(theLecture.lectureVidUrl == null && theLecture.lectureLink != null){
            //Update UI with link.
            liveLecVidNDetails = <a id={"anchorLink_ " + theLecture.lectureIndex}
                                    href={theLecture.lectureLink}
                                   >
                                 Click to join ongoing lecture
                                 </a>
           }
        }
        return liveLecVidNDetails;
  }

  buildTheVideoHtml(theLecture2, theSource){
     var vidBuilder, holdAttendanceList, rawAttendanceList, uploadingPane;

     if(theLecture2.lectureVidAttendance != null){
        holdAttendanceList = Object.values(theLecture2.lectureVidAttendance);
        rawAttendanceList = holdAttendanceList.map((attendee) => <h6 key={"attendeeKey_" + attendee.attendantId}
                                                                     id={"attendeeId_" + attendee.attendantId}
                                                                     >
                                                                  {attendee.displayName + ':  ' + attendee.attendingTime}
                                                                 </h6>);
     }
     
     if(theSource == null) uploadingPane = <h4>Uploading...</h4>
     else uploadingPane = "";

     vidBuilder = <div id={"liveLecDiv_" + theLecture2.lectureIndex}
                    className="d-flex flex-column">
                   <video id={"video_" + theLecture2.lectureIndex}
                       width="450"
                       height="350"
                       controls>
                    <source src={theSource}
                         type="video/mp4"/>
                    Your browser does not support the video tag.
                    {uploadingPane}
                   </video>

                   <div id={"liveLecAttend_" + theLecture2.lectureIndex}
                        className="ms-4 my-3">
                    <h5>Attendance (1 hour after launch)</h5>
                    <h6>Username             Entrytime</h6>
                    {rawAttendanceList}
                   </div>

               </div>
               //Replace div with iFrame above, to make the attendance scrollable.
     return vidBuilder;
  }

  liveMediaButton(lectureFields, thisCourseTitle){
     var liveButton;
     if(USERROLE == "Tutor" && this.props.populateCourseWith.creator == USERNAME && lectureFields.lectureVidUrl == null){ //Only 1 live lecture can be created per lecture for now.
       liveButton = <button id={"streamBtn_" + lectureFields.lectureIndex}
                            className="btn-sm btn-outline-primary me-2" type="submit"
                            onClick={(livLec) => {
                                                  localStorage.setItem("Live_lecture_index", lectureFields.lectureIndex);
                                                  localStorage.setItem("Live_course_title", thisCourseTitle);
                                                  localStorage.setItem("Live_lecture_title", lectureFields.lectureTopic);
                                                  localStorage.setItem("Live_lecture_desc", lectureFields.lectureDescription);
                                                  localStorage.setItem("Attending_name", USERNAME);
                                                  localStorage.setItem("Attending_role", USERROLE);
                                                  var portal = window.open("./videoClass.html", "_blank");
                                                 }} 
                            rel="noopener noreferrer">
                     Create live lecture
                    </button>
     }
     return liveButton;
  }


  async fetchLectures(){
     return await firebase.database()
     .ref('/ulearnData/appData/lectures/' + this.props.populateCourseWith.courseTitle + '_' + this.props.populateCourseWith.creator + '/').orderByChild('created');
  }


  handleAttachments(attachmentUrl, lecTally){
      var dwnAtth = <div></div>
      if(attachmentUrl != "nullFile"){
          dwnAtth = <button className="btn-sm bg-secondary ms-2" 
                            id={"downloadBtn_" + lecTally}
                            type="submit">
                               <a href={attachmentUrl} className="text-decoration-none text-light"> Download attachment </a>
                    </button>
      }
      return dwnAtth;
  }


 handleAddButton(){
    var returnComponent, assessBtn, smallOrButton;
    if(USERROLE == "Tutor"){
        if(USERNAME == this.props.populateCourseWith.creator) assessBtn = <button className="btn-sm btn-outline-secondary" 
                                                                                  type="button" 
                                                                                  onClick={(assess) => ReactDOM.render(<AssessmentBuildDiv parentData={this.props.populateCourseWith} />, bodyContainer)}>Assessment</button>
        returnComponent = <div className="d-flex mt-5 justify-content-between">
                           <small id="interactions" className="text-dark">Added by 0 student(s).</small>
                           {assessBtn}
                          </div>
        firebase.database().ref('/ulearnData/appData/courseInteractions/' + this.props.populateCourseWith.courseTitle + '_' + this.props.populateCourseWith.creator)
              .once('value')
              .then((inters)=> {
                  if(inters.val()){
                     const adders = Object.keys(inters.val());
                     document.querySelector('#interactions').innerHTML = `Added by ${adders.length} student(s).`;
                  }
              });
    }else { //Default is student.
        if(hasAdded(this.props.populateCourseWith.courseTitle + "_" + this.props.populateCourseWith.creator)){
           smallOrButton = <button type="button" disabled="disabled" className="btn btn-sm btn-outline-secondary">Add to course list</button> //The course been previously added.
           assessBtn = <button id="quizB" className="btn-sm btn-outline-secondary" type="button" onClick={(assess) => this.getAssessment(assess)}>Assessment</button>
        }else smallOrButton = <button type="button" id={this.props.populateCourseWith.courseTitle + '_addBtn'} className="btn btn-sm btn-outline-secondary" onClick={(put) => this.addcourse_ToList(put)}>Add to course list</button>

        returnComponent = <div className="d-flex mt-5 justify-content-between">
                           {smallOrButton}
                           {assessBtn}
                          </div>
    }
    return returnComponent;
  }


  toggleModal(modalVisibility){
    if(modalVisibility == "open"){
        document.getElementById('mdrop').className = "modal-backdrop fade show";
        document.getElementById('mdrop').style.display = "block";
        document.getElementById('assessmentChooser').className = "modal fade show";
        document.getElementById('assessmentChooser').style.display = "block";
    }else if(modalVisibility == "close"){
        document.getElementById('mdrop').className = "modal-backdrop fade";
        document.getElementById('mdrop').style.display = "none";
        document.getElementById('assessmentChooser').className = "modal fade";
        document.getElementById('assessmentChooser').style.display = "none";
    }
  }

  


  getAssessment(btnCallback){
     var cloneForBuilder = new LectureViewDiv();
     var quizGroups = new Array();
     var forRef = "/ulearnData/appData/assessments/" + this.props.populateCourseWith.creator + '/' + this.props.populateCourseWith.courseTitle + '/';
     firebase.database().ref(forRef).once('value').then(function(groupAssessments){
      if(groupAssessments.val()){
       const pushKeys = Object.keys(groupAssessments.val());

       Object.values(groupAssessments.val()).forEach(ssementOptions => {
         if(ssementOptions.visibilityStatus == "enabled") quizGroups.push(ssementOptions); //Censorship control.
       });
       if(quizGroups.length > 1){
          console.log("Opening chooser");
          var quizOptions = quizGroups.map((qui, count) => <button key = {"quiz_" + qui.assessmentTitle}
                                                            className = "btn btn-outline-primary col my-"
                                                            onClick = {(quizObj) => ReactDOM.render(<AssessmentViewDiv neededData={qui} theNode={pushKeys[count]} from="lectureView" />, bodyContainer)}> 
                                                            {qui.assessmentTitle}
                                                           </button> );

          ReactDOM.render(quizOptions, document.getElementById('chooserBody'));
          cloneForBuilder.toggleModal("open");
       }
       else if(quizGroups.length == 1) ReactDOM.render(<AssessmentViewDiv neededData={quizGroups[0]} theNode={pushKeys[0]} from="lectureView" />, bodyContainer);
       else if(quizGroups.length == 0){
               document.getElementById('quizB').innerHTML = "No assessment yet";
               document.getElementById('quizB').disabled = true;
       }
      }else if(!groupAssessments.val()){
               document.getElementById('quizB').innerHTML = "No assessment yet";
               document.getElementById('quizB').disabled = true;
      }
     });
  }


  selectParent(btnBack){
      if(previousClick.innerHTML == "My courses") ReactDOM.render(<LecturesDiv myCourseValueData={MyCoursesArray} />, bodyContainer);
      else if(previousClick.innerHTML == "Course list") ReactDOM.render(<LecturesDiv myCourseValueData={CourseListArray} suggestionsData={SuggestionsArray} />, bodyContainer);
      else ReactDOM.render(<HomeDiv courseValueData={coursesValuesArray} />, bodyContainer);
  }

  buildTarget(){
    var targetAudience = "For: " + this.props.populateCourseWith.programLevel + ". ";
    if(this.props.populateCourseWith.courseCategory) targetAudience += this.props.populateCourseWith.courseCategory;
    return targetAudience;
  }


   render(){
   var lectureContent;
   var classClone = this;  //new LectureViewDiv();
   PopulateAfterReturn = this.props.populateCourseWith;
   var numOfLectures = this.props.populateCourseWith.lectureCount;
   lecturesObjectArray = new Array();

    this.fetchLectures().then(async function(lecFetched){
      await lecFetched.on('child_added', function(eve){
       lecturesObjectArray.push(eve.val());

       if(lecturesObjectArray.length == numOfLectures){ //Equal to number of courses.
          lectureContent = lecturesObjectArray.map((lec) => 
              <div key={"index_" + lec.lectureIndex} className="container-fluid navbar-light">

            <div className="d-flex flex-row justify-content-between">
            <h3 className="navbar-brand">
              {lec.lectureIndex + ". " + lec.lectureTopic}
            </h3>

            <button className="navbar-toggler collapsed d-flex align-self-end"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#navContent_" + lec.lectureIndex}
                    aria-controls={"navContent_" + lec.lectureIndex}
                    aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            </div>


            <h6 className="ms-4 text-secondary">
              {lec.lectureDescription}
            </h6>
          
            <div className="navbar-collapse collapse" id={"navContent_" + lec.lectureIndex}>
             <div>
              {classClone.liveMediaButton(lec, PopulateAfterReturn.courseTitle)}
              {classClone.handleAttachments(lec.lectureMediaFileUrl, lec.lectureIndex)}
             </div>
             {classClone.addLiveLectureVid(lec, PopulateAfterReturn.courseTitle, lec.lectureTopic)}
             <p> {lec.lecContentText} </p>
            </div>
           
           <hr/>

              </div>);
          ReactDOM.render(lectureContent, document.querySelector('#allLecList'));
       }
      }); //on block.
    }); //then block.
      
     return(
     <div>
      <button className="btn bg-success text-light mb-3" onClick={(un) => this.selectParent(un)}>Back</button>

      <div id="mdrop" className="modal-backdrop fade" style={{display: "none"}}></div>

      <div className="modal fade"
            id="assessmentChooser"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1" 
            aria-labelledby="assessmentChooserLabel"
            style={{display: "none"}}>

        <div className="modal-dialog">
         <div className="modal-content">

          <div className="modal-header">
           <h5 className="modal-title" id="assessmentChooserLabel">Select assessment</h5>
           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(closeModal) => this.toggleModal("close")}></button>
          </div>

          <div className="modal-body">
           <div id="chooserBody" className="row row-cols-1"></div>
          </div>

         </div>
        </div>
       </div>


      <div className="d-flex flex-column">
       <div className="row">

       
        <div className="col-3">
        
        <PrepImage iUrl={this.props.populateCourseWith.courseImageUrl}
                   cTitle={this.props.populateCourseWith.courseTitle}/>

        </div>

        <div className="col-9 d-flex flex-column">
         <h5 className="card-title">{this.props.populateCourseWith.courseTitle}</h5>
         <p className="card-text">{this.props.populateCourseWith.courseDescription}</p>
         <small className="text-muted">{"By: " + this.props.populateCourseWith.creator}</small>
         <small className="text-muted">{this.buildTarget()}</small>
         
         {this.handleAddButton()}
        </div>

       </div>

       <hr/>

       <div className="d-flex flex-row justify-content-between">
        <h5 className="display-6">Lectures</h5>
        <small className="me-3 align-self-center">{"Total: " + this.props.populateCourseWith.lectureCount}</small>
       </div>

       <hr/>

       <div id="allLecList"></div>

      </div>
    </div>
     );
 }
}