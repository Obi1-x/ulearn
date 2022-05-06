'use strict';

class LectureControlDiv extends React.Component{
  constructor(props) {
      super(props);
      mainNavRef.style.display = 'none';
  }

  componentDidMount(){
   var lectureContent;
   var classClone = new LectureControlDiv();
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
              {classClone.handleAttachments(lec.lectureMediaFileUrl, lec.lectureIndex)}
             </div>
             <p> {lec.lecContentText} </p>
            </div>
           
           <hr/>

              </div>);
          ReactDOM.render(lectureContent, document.querySelector('#allLecList'));
       }
      }); //on block.
    }); //then block.
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

 controlLectures(){
          var visibilityControl = "";
          if(USERROLE == "Admin") visibilityControl = <div className="form-check form-switch mt-2">
                                                       <input className="form-check-input"
                                                              type="checkbox"
                                                              id="quizVisibilityControl"
                                                              onChange={(control) => this.setVisibility(control)}
                                                              defaultChecked= {this.statusToBool(this.props.populateCourseWith.courseVisibility)}
                                                       />
                                                       <label className="form-check-label" htmlFor="quizVisibilityControl">{this.props.populateCourseWith.courseVisibility}</label>
                                                      </div>
          return visibilityControl;
  }

     async setVisibility(theTarget){
        var courVisibility;
        var toggleVisibility : boolean;
        var theUrl = "/ulearnData/appData/courses/" + this.props.populateCourseWith.courseTitle + '_' + this.props.populateCourseWith.creator + "/courseVisibility/";

        toggleVisibility = theTarget.target.checked;
        if(toggleVisibility) courVisibility = "enabled";
        else if(!toggleVisibility) courVisibility = "disabled"; 

        await firebase.database().ref(theUrl).set(courVisibility, (updateFailed) => {
               if(updateFailed) console.log("An error occured");
               else if(!updateFailed) theTarget.target.labels[0].innerHTML = courVisibility;
        });
     }

  statusToBool(theStatus){
          var returnedStatus = false;
          if(theStatus == "enabled") returnedStatus = true;
          return returnedStatus;
  }

   render(){  
     return(
     <div>
      <button className="btn bg-success mb-3" 
              onClick={(un) => ReactDOM.render(<ContentDiv courseValueData={coursesValuesArray} quizesValueData={regulatedAssessments} />, bodyContainer)}>Back</button>

      <div className="d-flex flex-column">
       <div className="row row-cols-sm-2 row-cols-lg-3 row-cols-xl-3">

        
        <div className="col-3">
        <PrepImage iUrl={this.props.populateCourseWith.courseImageUrl}
                      cTitle={this.props.populateCourseWith.courseTitle}/>
        </div>

        <div className="col-7 d-flex flex-column">
         <h5 className="card-title">{this.props.populateCourseWith.courseTitle}</h5>
         <p className="card-text">{this.props.populateCourseWith.courseDescription}</p>
         <small className="text-muted">{"by " + this.props.populateCourseWith.creator}</small>
        </div>

       <div className="col-2">{this.controlLectures()}</div>

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