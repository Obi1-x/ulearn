'use strict';

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
    var returnComponent, assessBtn, smallOrButton;
    if(USERROLE == "Tutor"){
        if(USERNAME == this.props.populateCourseWith.creator) assessBtn = <button className="btn-sm btn-outline-secondary" 
                                                                                  type="button" 
                                                                                  onClick={(assess) => ReactDOM.render(<AssessmentBuildDiv creationPoint={this.props.populateCourseWith.courseTitle} theCreator={this.props.populateCourseWith.creator} />, bodyContainer)}>Assessment</button>
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
           assessBtn = <button className="btn-sm btn-outline-secondary" type="button" onClick={(assess) => ReactDOM.render(<AssessmentViewDiv/>, bodyContainer)}>Assessment</button>
        }else smallOrButton = <button type="button" id={this.props.populateCourseWith.courseTitle + '_addBtn'} className="btn btn-sm btn-outline-secondary" onClick={(put) => this.addcourse_ToList(put)}>Add to course list</button>

        returnComponent = <div className="d-flex mt-5 justify-content-between">
                           {smallOrButton}
                           {assessBtn}
                          </div>
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

       {/*
        <div className="col-3">
        <PrepImage iUrl={this.props.populateCourseWith.courseImageUrl}
                      cTitle={this.props.populateCourseWith.courseTitle}/>
        </div> */}

        <div className="col-9 d-flex flex-column">
         <h5 className="card-title">{this.props.populateCourseWith.courseTitle}</h5>
         <p className="card-text">{this.props.populateCourseWith.courseDescription}</p>
         <small className="text-muted">{"by " + this.props.populateCourseWith.creator}</small>
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
     );
 }
}