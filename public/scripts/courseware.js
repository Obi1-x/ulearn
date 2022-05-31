'use strict';

var vidPortal;

function CallCoursewareDiv(){
 return <CoursewareDiv/>
}


class CoursewareDiv extends React.Component {
/*
  componentDidMount () {
   const script = document.createElement("script");
    script.src = "scripts/admin_functions.js";
    script.type = "text/babel";
    script.async = true;
    document.body.appendChild(script);
    //document.body.lastChild.type = "text/babel";
}*/

  decideCourseware(){
     var cWareToReturn = <ScoursewareDiv/>
     if(USERROLE == "Tutor") cWareToReturn = <TcoursewareDiv/>
     return cWareToReturn;
  }

  render() {
    return (
     <div>
      <h4 className="mb-2">Course ware</h4>
      <hr/>
      {this.decideCourseware()}
     </div>
    ); 
  }
}//CoursewareDiv End



class TcoursewareDiv extends React.Component{

  standaloneLecture(startTrigger, corT, corC){
    var titleEntry = document.getElementById(corT);
    var codeEntry = document.getElementById(corC);
    if(titleEntry.value && codeEntry.value){
       localStorage.setItem("Live_lecture_index", 1);
       localStorage.setItem("Live_course_title", "Virtual course");
       localStorage.setItem("Live_lecture_title", codeEntry.value);
       localStorage.setItem("Live_lecture_desc", titleEntry.value);
       localStorage.setItem("Attending_name", USERNAME);
       localStorage.setItem("Attending_role", USERROLE);
       vidPortal = window.open("./videoClass.html", "_blank");
    }
  }

  beginStudentsManagement(){
   console.log("Going to students");
   var fakeObject = {
                   name: "cloneHTML",
                   innerHTML: "Students"
                   }
   adminNavSelections(fakeObject);
  }

  realUpload(controlBtn, theId){ //PUT ONCHANGE IN THE INPUT
   var inputfield = document.getElementById(theId);
   if(inputfield.value && inputfield.files[0].size < 500000){ //and files size < 500KB.
      controlBtn.innerHTML = "Uploading...";
      controlBtn.disabled = true;

      //Begin Upload.
      var fileUrlRef = '/ulearnData/miscFiles/' + inputfield.files[0].name;
      var uploadJob = firebase.storage().ref(fileUrlRef).put(inputfield.files[0]);

      uploadJob.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                                                         console.log(snapshot.state);
                                                         },
                                                         (error) => {
                                                          // Handle unsuccessful uploads
                                                          console.log(error);
                                                          console.log("Upload unsuccessful");
                                                          }, 
                                                         (complete) => {
                                                          // Handle successful uploads on complete
                                                          console.log("Upload successful");
                                                          const miscLink = '/ulearnData/appData/misc/' + theId + '/';
                                                          firebase.storage().ref(fileUrlRef).getDownloadURL().then((downloadURL) => {
                                                            console.log(downloadURL);
                                                            firebase.database().ref(miscLink).set(downloadURL, (err_or) => {
                                                                                                                            if (err_or) alert("An error occurred");
                                                                                                                            else{
                                                                                                                                controlBtn.disabled = false;
                                                                                                                                controlBtn.innerHTML = "Upload";
                                                                                                                                inputfield.value = "";
                                                                                                                                inputfield.setAttribute('class', 'form-control');
                                                                                                                            }
                                                                                                                           });
                                                            });
                                                         }
                                                       );
   }else{ 
         inputfield.setAttribute('class', 'form-control is-invalid');
         console.log("File too large for storage");
         }
}


  render() {
   return(
    <div>
      
      <div className="d-flex flex-row justify-content-end">
      <button type="submit" className="btn text-primary" onClick={(stuClick) => this.beginStudentsManagement()}>Manage students</button>
      </div>

      <div>
       <h6>Time-table</h6>
       <div>
        <label htmlFor="timetableUpload" className="form-label">Upload timetable</label>
        <input type="file" accept=".docx, .pdf" id="timetableUpload" className="form-control form-control-sm" aria-label="tt_file_input" onChange={(aCallB) => {aCallB.target.setAttribute('class', 'form-control');}}/>
        <div className="invalid-feedback">File should be less than 500KB.</div>
        <button id="submitTT" type="submit" className="btn btn-primary my-3" onClick={(bttn) => this.realUpload(bttn.target, "timetableUpload")}>Upload</button>
       </div>
      </div> {/*TT end*/}

      <br/>
      <hr/>

      <div>
       <h6>Curriculum</h6>
       <div>
        <label htmlFor="curriculumUpload" className="form-label">Upload curicullum</label>
        <input type="file" accept=".docx, .pdf" id="curriculumUpload" className="form-control form-control-sm" aria-label="curri_file_input" onChange={(aCallB) => {aCallB.target.setAttribute('class', 'form-control');}}/>
        <div className="invalid-feedback">File should be less than 500KB.</div>
        <button id="submitCC" type="submit" className="btn btn-primary my-3" onClick={(bttn1) => this.realUpload(bttn1.target, "curriculumUpload")} >Upload</button>
       </div>
      </div> {/*CC end*/}

      <br/>
      <hr/>

      <div>
       <h6>Other materials</h6>
       <div>
        <label htmlFor="othermaterialsUpload" className="form-label">Upload learning materials</label>
        <input type="file" accept=".docx, .pdf" id="othermaterialsUpload" className="form-control form-control-sm" aria-label="other_file_input" onChange={(aCallB) => {aCallB.target.setAttribute('class', 'form-control');}}/>
        <div className="invalid-feedback">File should be less than 500KB.</div>
        <button id="submitOM" type="submit" className="btn btn-primary my-3" onClick={(bttn2) => this.realUpload(bttn2.target, "othermaterialsUpload")} >Upload</button>
       </div>
      </div> {/*OM end*/}

      <br/>
      <hr/>

      <div>
       <h6>Setup virtual class</h6>
       <div>
       <div className="col-md-6">
         <label htmlFor="coursetitle" className="form-label">Course title</label>
         <input type="text" id="coursetitle" className="form-control" placeholder="Course title"/>
         <label htmlFor="coursecode" className="form-label">Course code</label>
         <input type="text" id="coursecode" className="form-control" placeholder="Course code"/>
       </div>
       <button id="setup_class" type="submit" className="btn btn-primary my-3" onClick={(bttn4) => this.standaloneLecture(bttn4.target, "coursetitle", "coursecode")} rel="noopener noreferrer">Setup</button>
       </div>
      </div> {/*VL end*/}

     </div>    
   );
  }
}


class ScoursewareDiv extends React.Component{
  startNagging(){
   var complainElement = <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfAxu2JpcUAiYYYtlwWZB-dllfMaPBhYL3kdssFLKJ-2SX-pQ/viewform?embedded=true"
                                  width="640"
                                  height="979"
                                  frameBorder="0"
                                  marginHeight="0"
                                  marginWidth="0">
                            Loading…
                         </iframe>
   ReactDOM.render(complainElement, document.getElementById("complainIFrame"));
   document.getElementById("complainB").disabled = true;
  }


  componentDidMount(){
   
    firebase.database().ref('/ulearnData/appData/misc/').once('value').then(function(miscDetails){
     if(miscDetails.val()){
      Object.entries(miscDetails.val())
            .forEach(docLink => {
                                 if(docLink[0] != "miscLectures"){ //Checking docLink[1] != null might prevent future error.
                                    var actionBtn = document.getElementById(docLink[0]);
                                    var actionLink = actionBtn.children[0];
                                    actionLink.href = docLink[1]; //Set the link.
                                    actionBtn.disabled = false; //Enable the button.
                                 }else if(docLink[0] == "miscLectures"){
                                    const lectureDoor = document.querySelector('#joinBtn');
                                    lectureDoor.disabled = false;
                                    lectureDoor.addEventListener('click', (theBtnCallback) => {vidPortal = window.open(docLink[1], "_blank");})
                                 }
                                });
    }
   });

  }

  render() {
   return(
    <div>

      <div>
       <h5>Time-table</h5>
       <div>
        <p>Get timetable</p>
        <button id="timetableUpload"
                type="submit"
                className="btn btn-secondary my-3"
                disabled="disabled">
         <a className="text-decoration-none text-light"
            href="noLink"
            target="_blank"
            rel="noreferrer"> 
          Download
         </a>
        </button>
       </div>
      </div> {/*TT end*/}

      <br/>
      <hr/>

      <div>
       <h5>Curriculum</h5>
       <div>
        <p>Get curicullum</p>
        <button id="curriculumUpload"
                type="submit" 
                className="btn btn-secondary my-3" 
                disabled="disabled">
         <a className="text-decoration-none text-light"
            href="noLink"
            target="_blank"
            rel="noreferrer">
          Download
         </a> 
        </button>
       </div>
      </div> {/*CC end*/}

      <br/>
      <hr/>

      <div>
       <h5>Other materials</h5>
       <div>
        <p>Download learning materials</p>
        <button id="othermaterialsUpload"
                type="submit"
                className="btn btn-secondary my-3"
                disabled="disabled">
         <a className="text-decoration-none text-light"
            href="noLink"
            target="_blank"
            rel="noreferrer">
          Download
         </a>
        </button>
       </div>
      </div> {/*OM end*/}

      <br/>
      <hr/>

      <div>
       <h6>Join virtual class</h6>
       <button id="joinBtn"
               type="submit"
               className="btn btn-primary my-3"
               rel="noopener noreferrer"
               disabled="disabled">
        Enter
       </button>
      </div> {/*VL end*/}

      <br/>
      <hr/>

      <div>
       <h6>Make complaint</h6>
       <button id="complainB" type="submit" className="btn btn-primary my-3" onClick={(nag) => this.startNagging(nag)}>Complain</button>
       <div id="complainIFrame" className="mt-2"></div>
      </div> {/*VL end*/}

     </div>  
   );
  }
}

function updateVirtualCourseware(miscVirtualRoomName, virtualLink){
    const coursewareLink = '/ulearnData/appData/misc/miscLectures/';
    firebase.database().ref(coursewareLink).set(virtualLink);
}