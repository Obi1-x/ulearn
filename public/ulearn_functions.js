'use strict';

const bodyContainer = document.querySelector('#body_main_child');
var previousClick, studentCourseList, numOfCourses;
var coursesValuesArray;

//========================================================Sub components clasess
class BodyContent extends React.Component{
   doIteration(){
     var retrievedCourses = this.props.itemValues.map((itm) => <CardColumn key = {itm.courseTitle + "_" + itm.creator}
                                                                           cardImage = {itm.courseImageUrl}
                                                                           cardTitle = {itm.courseTitle}
                                                                           cardText = {itm.courseDescription}
                                                                           cardSmallDetail = {itm.lectureCount}
                                                                           dataCollection = {itm} 
                                                                           displayFor = {this.props.id}/>); //Will be used when populating tutor data. 
     return retrievedCourses;
   }

   headerValue(someTrigger){
       var toReturn;
       if(someTrigger == 0) toReturn = "No content to show here";
       else if(someTrigger > 0) toReturn = this.props.header;
       return toReturn;
   }


   render() {
     var itemCount = this.props.itemValues;
     return (
       <div>
        <div id={this.props.id} className="container mg-8">
         <h4>{this.headerValue(itemCount.length)}</h4>
         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          
          {this.doIteration()}

         </div>
        </div>
       </div>
     );
   }
}


class CardColumn extends React.Component{
   addcourseToList(clickarg){
    var courseListRef = '/ulearnData/userData/Students/' + USERNAME + '/courseList/' + this.props.dataCollection.courseTitle + "_" + this.props.dataCollection.creator;
    var courseInteractionRef = '/ulearnData/appData/courseInteractions/' + this.props.dataCollection.courseTitle + "_" + this.props.dataCollection.creator + '/' + USERNAME
    var time_Stamp = new Date().getTime();
    firebase.database().ref(courseListRef + '/').set(time_Stamp, (error)=>{
       if(!error){
          document.querySelector('#' + this.props.cardTitle + '_addBtn').disabled = true;
          console.log("Added to course list");
       }
    });
    firebase.database().ref(courseInteractionRef + '/').set(time_Stamp);
   }

   checkCreator(){
     var returnElement;
     if(this.props.dataCollection.creator == USERNAME){
           returnElement = <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
                            <small className=" ms-2 text-primary">Yours</small> {/*Use it to show the number of students who added the course to their course list*/}
                            <small className="text-muted">{this.props.cardSmallDetail + " lectures"}</small>
                           </div>
     }else {
          if(USERROLE == "Student" && !hasAdded(this.props.dataCollection.courseTitle + "_" + this.props.dataCollection.creator)){ //and student has not previously added the course.
             returnElement = <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
                           <button id={this.props.cardTitle + "_addBtn"} onClick={(w) => this.addcourseToList(w)} className="btn btn-sm btn-outline-secondary">Add</button>
                           <small className="text-muted">{this.props.cardSmallDetail + " lectures"}</small>
                          </div>
          }else { //Removed the if  if(USERROLE == "Tutor")
             returnElement = <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
                           <button id={this.props.cardTitle + "_addBtn"} disabled="disabled" className="btn btn-sm btn-outline-secondary">Add</button>
                           <small className="text-muted">{this.props.cardSmallDetail + " lectures"}</small>
                          </div>
          }
     }
     return returnElement;
   }

   render() {
     return (
       <div className="col">
        <div className="card shadow-sm">
         <div onClick={(t) => ReactDOM.render(<LectureViewDiv populateCourseWith={this.props.dataCollection}/>, bodyContainer)}>  

      <PrepImage iUrl={this.props.cardImage}
                    cTitle={this.props.cardTitle}/>  

          <div className="card-body">
           <h3 className="card-title display-6">{this.props.cardTitle}</h3>
           <p className="card-text">{this.props.cardText}</p>
          </div>
         </div>

         {this.checkCreator()}

        </div>
       </div>
     );
   }
}


function hasAdded(courseIdentifier){
     var added = false;
     if(studentCourseList){
         Object.keys(studentCourseList).forEach(valu => {
          if(valu == courseIdentifier) added = true;
         });
     }
     return added;
}


class PrepImage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
                  imgIds: this.props.cTitle + "_imageForCard"
                 };
  }

  render(){
    var displayElement;
    if(this.props.iUrl == "nullImage"){
         displayElement = <svg className="bd-placeholder-img card-img-top" 
                               width="100%" height="180" 
                               xmlns="http://www.w3.org/2000/svg" 
                               role="img"
                               preserveAspectRatio="xMidYMid slice" 
                               focusable="false"
                               >
                           <title>Placeholder</title>
                           <rect width="100%" height="100%" fill="#868e96"></rect>
                           <text className="d-flex align-self-center" x="60%" y="60%" fill="#dee2e6" dy=".3em">{this.props.cTitle}</text>
                          </svg>
      }else displayElement = <img id={this.state.imgIds} className="img-thumbnail img-fluid" src={this.props.iUrl} alt="Card image" width="100%" height="50%"></img>
    return (displayElement);
  }
}
//===========================================================================End sub components clases

/*

<svg class="bd-placeholder-img figure-img img-fluid rounded" width="400" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 400x300" preserveAspectRatio="xMidYMid slice" focusable="false">
 <title>Placeholder</title>
 <rect width="100%" height="100%" fill="#868e96"></rect>
 <text x="50%" y="50%" fill="#dee2e6" dy=".3em">400x300</text>
</svg>

<svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
 <title>Placeholder</title>
 <rect width="100%" height="100%" fill="#868e96"></rect>
 <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
</svg>
*/

//=================================================================================Root component classes
class HomeDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  contents: ["a","b","c","d","e","f"]
                 };
  }

  render() {
    return (
     <div>
      <BodyContent 
                   id={"courses"} 
                   header={"Courses"}
                   itemValues = {this.props.courseValueData}/>
      <br/>
      <hr/>
      <br/>
      {/*
      <BodyContent 
                   id={"tutors"} 
                   header={"Tutors"}
                   itemValues = {this.props.courseValueData}/> */}
     </div>
    );
  }
}

class DashboardDiv extends React.Component {
   render() {
     return (<h1>DASHBOARD</h1>);
   }
}


class LecturesDiv extends React.Component {
   constructor(props) {
    super(props);
    this.headerValue = "Added courses";
    //this.lecDivRef = React.createRef();
  }

  checkRole(){
        var createB;
        if(USERROLE == "Tutor"){
           this.headerValue = "My courses";
           createB = <div>
                      <button className="btn btn-outline-primary d-flex align-self-end" 
                              onClick={(u) => ReactDOM.render(<LectureBuildDiv existingCourses={this.props.myCourseValueData}/>, bodyContainer)}>
                          Create lecture
                      </button>
                    </div>
        }
        return createB;
  }

   render() {
     return (
      <div>

      {this.checkRole()}

       <BodyContent 
                    id = {"mycourses"} 
                    header = {this.headerValue}
                    itemValues = {this.props.myCourseValueData}/>

     </div>
     );
   }
}

class AssessmentsDiv extends React.Component {
   render() {
     return (<h1>ASSESSMENTS</h1>);
   }
}
//================================================================End root component classes

//=================================================================================================Inner component classes
class LectureBuildDiv extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
                   select_ed: 0
                 };
  }

   displayCourses(){
    const courseList = this.props.existingCourses;
    var course_s = courseList.map((cou) => <option key={"option_" + cou.courseTitle + cou.creator } 
                                                   value={cou.courseTitle} 
                                                   disabled="">{cou.courseTitle}</option>);
    return course_s
   }

   toggleCourseFields(selection){
     this.state.select_ed = selection.target.options.selectedIndex;

     const courseTitle = document.querySelector('#courseTitleEntry');
     const course_Description = document.querySelector('#courseDiscrip');
     const courseImage = document.querySelector('#imageblock');
     const LectureTop = document.querySelector('#lecturetopic');
     const LectureDisc = document.querySelector('#lectureDiscrip');

     if(this.state.select_ed == 0) {
         courseTitle.disabled = false;
         if(LectureTop) courseTitle.value = LectureTop.value;
         course_Description.disabled = false;
         if(LectureDisc) course_Description.value = LectureDisc.value;
         courseImage.style.display = 'block';
         submitlecture.innerHTML = "Create lecture and course";
     }else if(this.state.select_ed > 0){
          courseTitle.disabled = true;

          const courseListOnce = this.props.existingCourses;
          var aCourse = courseListOnce[this.state.select_ed - 1]

          courseTitle.value = aCourse.courseTitle;
          course_Description.disabled = true;
          course_Description.value = aCourse.courseDescription;
          courseImage.style.display = 'none';
          submitlecture.innerHTML = "Create lecture";
     }
   }

   adjustTitleField(theInput){
    if(this.state.select_ed == 0){
       document.querySelector('#courseTitleEntry').value = theInput.target.value;
    }
   }

   prepToSubmitLnC(btnCallB){
          const cTi = document.querySelector('#courseTitleEntry');
          const cDe = document.querySelector('#courseDiscrip');
          const lTo = document.querySelector('#lecturetopic');
          const lDe = document.querySelector('#lectureDiscrip');
          const lMf = document.querySelector('#lectureMediaFile');

          if(cTi.value && cDe.value && lTo.value && lDe.value){ //If all the neccesary fields are not empty.
             if(lMf.value && lMf.files[0].size > 500000){ //If files size > 500KB.
                lMf.setAttribute('class', 'form-control form-control-sm is-invalid');
                console.log("File too large for storage");
             }else if(lMf.value && lMf.files[0].size <= 500000) {
                this.submitLecAndCourse(btnCallB);
             }
          }else{
             var inputFields = new Array(lTo, lDe, cTi, cDe);
             var highestBlankField;
             var i = 0;
             while(i<4){
                  var loop = inputFields[i];
                  if(!loop.value){
                   loop.setAttribute('class', 'form-control is-invalid');
                   if(!highestBlankField) highestBlankField = loop; //if nothing has been assigned already.
                  }
                  i++;
             }
             if(highestBlankField) highestBlankField.focus();
          }
   }

   async submitLecAndCourse(subB){ //THERE IS AN ERROR HERE!!!!MAKE SURE YOU DO NOT CREATE A NEW WHILE TRYING TO CREATE A NEW LECTURE.
     const courseTitle_Sub = document.querySelector('#courseTitleEntry');
     const courseDescription_Sub = document.querySelector('#courseDiscrip');
     const courseImage_Sub = document.querySelector('#coursepic');

     const lectureTop_Sub = document.querySelector('#lecturetopic');
     const lectureDisc_Sub = document.querySelector('#lectureDiscrip');
     const lectureContentText_Sub = document.querySelector('#lecContText'); lectureMediaFile
     const lectureMediaFile_Sub = document.querySelector('#lectureMediaFile');

     var refCourse;
     var baseCourseRef = '/ulearnData/appData/courses/' + courseTitle_Sub.value + '_' + USERNAME + '/';
     var baseLectureRef = '/ulearnData/appData/lectures/' + courseTitle_Sub.value + '_' + USERNAME + '/' + lectureTop_Sub.value + '_' + courseTitle_Sub.value + '_' + USERNAME +  '/';

     if(this.state.select_ed == 0){
         refCourse = new CourseInfo(courseTitle_Sub.value, courseDescription_Sub.value); //Create new course.
         refCourse.lectureCount = 1;
         if(courseImage_Sub.value){
           //Upload to storage
           var imageUrlRef = '/ulearnData/courses/' + courseTitle_Sub.value;
           var uploadTask = firebase.storage().ref(imageUrlRef).put(courseImage_Sub.files[0]);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
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
                                                          firebase.storage().ref(imageUrlRef).getDownloadURL().then((downloadURL) => {
                                                            firebase.database().ref(baseCourseRef + 'courseImageUrl/').set(downloadURL);
                                                            });
                                                         }
                                                       );
         }

         await firebase.database().ref(baseCourseRef)
           .set(refCourse, (err_or) => {
                                      if (err_or) alert("An error occurred");
                                      else alert("Course created");
                                      }
                                      );

     }else if(this.state.select_ed > 0){
         const courseListAgain = this.props.existingCourses;
         refCourse = courseListAgain[this.state.select_ed - 1] //Get reference course.
         refCourse.lectureCount++;

         await firebase.database().ref(baseCourseRef + 'lectureCount/')
          .set(refCourse.lectureCount, (err_or) => {
                                      if (err_or) alert("An error occurred");
                                      else alert("Course updated");
                                      }
                                      );
     }

     var newLecture = new LectureInfo(lectureTop_Sub.value, lectureDisc_Sub.value, courseTitle_Sub.value); //Create new Lecture.
     newLecture.lecContentText = lectureContentText_Sub.value;
     newLecture.lectureIndex = refCourse.lectureCount;


     if(lectureMediaFile_Sub.value){
           //Upload to storage
           var fileUrlRef = '/ulearnData/lectures/' + courseTitle_Sub.value + '_' + lectureTop_Sub.value + '/' + lectureMediaFile_Sub.files[0].name;
           var uploadTask = firebase.storage().ref(fileUrlRef).put(lectureMediaFile_Sub.files[0]);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
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
                                                          firebase.storage().ref(fileUrlRef).getDownloadURL().then((downloadURL) => {
                                                            firebase.database().ref(baseLectureRef + 'lectureMediaFileUrl/').set(downloadURL);
                                                            });
                                                         }
                                                       );
     }


     await firebase.database().ref(baseLectureRef)
         .set(newLecture, (error) => {
                                      if (error) alert("An error occurred");
                                      else {
                                          alert("Lecture created"); //Use a rolling bar and a "Submitted" messsage in green

                                          //Clear text fields after submission.
                                          courseTitle_Sub.value = "";
                                          courseTitle_Sub.setAttribute('class', 'form-control');
                                          courseDescription_Sub.value = "";
                                          courseDescription_Sub.setAttribute('class', 'form-control');
                                          courseImage_Sub.value = "";
                                          lectureTop_Sub.value = "";
                                          lectureTop_Sub.setAttribute('class', 'form-control');
                                          lectureDisc_Sub.value = "";
                                          lectureDisc_Sub.setAttribute('class', 'form-control');
                                          lectureContentText_Sub.value = "";
                                          lectureMediaFile_Sub.value = ""
                                          //lectureMediaFile_Sub.files[0] = ""; //Make sure you properly clear the contained file, or might lead to an error
                                          lectureMediaFile_Sub.setAttribute('class', 'form-control form-control-sm');
                                          this.state.select_ed = 0;
                                          }
                                      }
                                      ); //UPDATE THE COURSE LIST IF A NEW COURSE WAS CREATED AFTER SUBMISSION.
   }

   render() {
     return (
      <div>

       <button className="btn bg-success" onClick={(un) => console.log("Back to me courses.")}>Back</button>

       <h3>New lecture</h3>

       <div className="my-4 col-md-6">
        <label htmlFor="lecturetopic" className="form-label">Lecture topic</label>
        <input onInput={(i) => this.adjustTitleField(i)} type="text" id="lecturetopic" className="form-control" placeholder="e.g Physics-101-lecture-01" autoFocus="autoFocus" required="required"/>
        <div className="invalid-feedback">Sholud not be blank.</div>
       </div>
       
       <div className="my-4 col-md-6">
        <label htmlFor="lectureDiscrip" className="form-label">Brief discription</label>
        <input type="text" id="lectureDiscrip" className="form-control" placeholder="e.g Equations of motion" required="required"/>
        <div className="invalid-feedback">Sholud not be blank.</div>
       </div>

       <div className=" mt-4 mb-5 col-md-3">
        <label htmlFor="courseList" className="form-label">Add to course</label>
        <select name="courseSelect" className="form-select" id="courseList" onChange={(c) => this.toggleCourseFields(c)}>
         <option value="New course" disabled="">New course</option>
         {this.displayCourses()}
        </select>
       </div>

       <hr/>
        <div className="col-md-6">
         <label htmlFor="courseTitleEntry" className="form-label">Course title</label>
         <input type="text" id="courseTitleEntry" className="form-control" required="required"/>
         <div className="invalid-feedback">Sholud not be blank.</div>
        </div>

        <div className="my-2 col-md-6">
         <label htmlFor="courseDiscrip" className="form-label">Course description</label>
         <input type="text" id="courseDiscrip" className="form-control" required="required"/>
         <div className="invalid-feedback">Sholud not be blank.</div>
        </div>

        <div id="imageblock" className="mb-3">
          <label htmlFor="coursepic" className="form-label">Course Image</label>
          <input type="file" accept="image/*" id="coursepic" className="form-control form-control-sm" aria-label="Small file input example"/>
        </div>
       <hr/>

       <div id="contentDiv" className="container-fluid my-4">
        <h6>Lecture content</h6>
        <textarea className="form-control" id="lecContText" placeholder="Type lecture notes here (200 words max), and(or) add lecture files below." rows="6"></textarea>

        <label htmlFor="lectureMediaFile" className="form-label">Add media file</label>
        <input type="file" accept=".docx, .pdf" id="lectureMediaFile" className="form-control form-control-sm" aria-label="Small file input example"/>
        <div className="invalid-feedback">File should be less than 500KB.</div>

       </div>

       <button id="submitlecture" onClick={(d) => this.prepToSubmitLnC(d)} type="submit" className="btn btn-primary my-3">Create lecture and course</button>
      </div>
     );
   }
}



class LectureViewDiv extends React.Component{
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


  liveMediaButton(lecture_Index){
     var liveButton;
     if(USERROLE == "Tutor"){
        liveButton = <button id={"streamBtn_" + lecture_Index} className="btn-sm btn-outline-primary me-2" type="submit" onClick={(livLec) => alert("Creating live lecture")}>Create live lecture</button>
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
    var returnComponent;
    if(USERROLE == "Tutor"){
        returnComponent = <small id="interactions" className="text-dark">Added by 0 student(s).</small>
        firebase.database().ref('/ulearnData/appData/courseInteractions/' + this.props.populateCourseWith.courseTitle + '_' + this.props.populateCourseWith.creator)
              .once('value')
              .then((inters)=> {
                  if(inters.val()){
                     const adders = Object.keys(inters.val());
                     document.querySelector('#interactions').innerHTML = `Added by ${adders.length} student(s).`;
                  }
              });
    }else { //Default is student.
        if(hasAdded(this.props.populateCourseWith.courseTitle + "_" + this.props.populateCourseWith.creator))returnComponent = <button type="button" disabled="disabled" className="btn btn-sm btn-outline-secondary">Add to course list</button> //The course been previously added.
        else returnComponent = <button type="button" id={this.props.populateCourseWith.courseTitle + '_addBtn'} className="btn btn-sm btn-outline-secondary" onClick={(put) => this.addcourse_ToList(put)}>Add to course list</button>
    }
    return returnComponent;
  }


   render(){
   var lectureContent;
   var classClone = new LectureViewDiv();
    var numOfLectures = this.props.populateCourseWith.lectureCount;
    var lecturesObjectArray = new Array();

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

            <button className="navbar-toggler collapsed d-flex align-self-end" type="button" data-bs-toggle="collapse" data-bs-target={"#navContent_" + lec.lectureIndex} aria-controls={"navContent_" + lec.lectureIndex} aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            </div>


            <h6 className="ms-4 text-secondary">
              {lec.lectureDescription}
            </h6>
          
            <div className="navbar-collapse collapse" id={"navContent_" + lec.lectureIndex}>
             <div>
              {classClone.liveMediaButton(lec.lectureIndex)}
              {classClone.handleAttachments(lec.lectureMediaFileUrl, lec.lectureIndex)}
             </div>
             <p> {lec.lecContentText} </p>
            </div>
           
           <hr/>

              </div>);
          ReactDOM.render(lectureContent, document.querySelector('#allLecList'));
       }
      });
    });
      
     return(
      <div className="d-flex flex-column">

       <div className="row">

       
        <div className="col-3">
        <PrepImage iUrl={this.props.populateCourseWith.courseImageUrl}
                      cTitle={this.props.populateCourseWith.courseTitle}/>
        </div> 

        <div className="col-9 d-flex flex-column">
         <h5 className="card-title">{this.props.populateCourseWith.courseTitle}</h5>
         <p className="card-text">{this.props.populateCourseWith.courseDescription}</p>
         <small className="text-muted">{"by " + this.props.populateCourseWith.creator}</small>
         <div className="d-flex mt-5 justify-content-between">
          {this.handleAddButton()}
          <small className="text-muted">{this.props.populateCourseWith.lectureCount + " lectures"}</small>
         </div>
        </div>

       </div>

       <hr/>

       <div id="allLecList"></div>

      </div>
     );
 }
}
//========================================================================End inner component classes


class CourseInfo{
  constructor(title, decrip){
	this.courseTitle = title;
    this.courseDescription = decrip;
    this.courseImageUrl = "nullImage";
    this.creator = USERNAME;
    this.lectureCount = "empty";
    this.created = new Date().getTime(); 
    this.indexWithCreated = 0 - this.created;
	}
}

class LectureInfo{
   constructor(topic, l_decrip, couref, indexLecture){
	this.lectureTopic = topic;
    this.lectureDescription = l_decrip;
    this.lecContentText = "empty";
    this.lectureMediaFileUrl = "nullFile";
    this.courseRef = couref;
    this.created = new Date().getTime();
    this.lectureIndex = "unindexed";
   }
}


function NavSelections(clicked){
  if(previousClick) previousClick.className = 'nav-link';
  clicked.className = 'nav-link active';
  previousClick = clicked;

  switch(clicked.innerHTML){
        case "Home": if(USERROLE == "Student") {//Get courseList
                        firebase.database().ref('/ulearnData/userData/Students/' + USERNAME + '/courseList/').once('value').then(function(stuCouList){
                          studentCourseList = stuCouList.val();
                        });
                     }

                     coursesValuesArray = new Array();
                     firebase.database()
                        .ref('/ulearnData/appData/courses/')
                        .once('value')
                        .then(function(mycData){
                             numOfCourses = mycData.numChildren();
                             firebase.database()
                             .ref('/ulearnData/appData/courses/')
                             .orderByChild('indexWithCreated')
                             .on('child_added', function(cData){ //Should filter 20 at a time.
                                 coursesValuesArray.push(cData.val());
                                 if(coursesValuesArray.length == numOfCourses) ReactDOM.render(<HomeDiv courseValueData={coursesValuesArray} />, bodyContainer); 
                             });
                         });

                     //firebase.database().ref('/ulearnData/appData/courses/').off('child_added')  //remove listener from path();
             break;
        case "Dashboard": ReactDOM.render(<DashboardDiv/>, bodyContainer); //TODO close nav drawer after selection
             break;
        case "Course list": var courseListArray = new Array(); 
                            coursesValuesArray.forEach(couItm => {
                              if(hasAdded(couItm.courseTitle + "_" + couItm.creator)){
                                 courseListArray.push(couItm);
                              }
                            });
                            ReactDOM.render(<LecturesDiv myCourseValueData={courseListArray} />, bodyContainer);
             break;
        case "My courses": var myCoursesArray = new Array();
                           coursesValuesArray.forEach(mycou => {
                                      if(mycou.creator == USERNAME) myCoursesArray.push(mycou); //also do this filtering in database query.
                                   });
                           ReactDOM.render(<LecturesDiv myCourseValueData={myCoursesArray} />, bodyContainer); 
             break;
        case "Assessments": ReactDOM.render(<AssessmentsDiv/>, bodyContainer); 
             break;
  }

  const maxImgWidth = 800;
  var imgWidth = document.querySelector('html').clientWidth;
  if(imgWidth < maxImgWidth){
      document.getElementById('navbarNav').setAttribute('class', 'collapse navbar-collapse bg-dark'); //Used to close nav bar after clicking (for small scrrens).
  }
}