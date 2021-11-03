'use strict';

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