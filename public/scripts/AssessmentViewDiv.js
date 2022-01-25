'use strict';

var QuizBody;

class AssessmentViewDiv extends React.Component{
     constructor(props) {
      super(props);
      mainNavRef.style.display = 'none';
      this.createdFrom = "none";
      this.personalAssessRef = "/ulearnData/userData/Students/" + USERNAME + "/assessmentInteractions/" + props.theNode + '/';
      this.errorCall = <p className="text-danger display-6"> An error occured. Please reload the page.</p>
      this.Iframe = <iframe src={this.props.neededData.assessmentLink}
                                  width="640"
                                  height="562"
                                  frameBorder="0"
                                  marginHeight="0"
                                  marginWidth="0">
                            Loading…
                          </iframe>
     }

     selectParent(btnBack){
      if(previousClick.innerHTML == "Assessments") ReactDOM.render(<AssessmentsDiv groupedssment={RequiredAssements} miscData={RequiredAssementsKeys} />, bodyContainer)
      else{
        if(USERROLE == "Admin") ReactDOM.render(<ContentDiv courseValueData={coursesValuesArray} quizesValueData={regulatedAssessments} />, bodyContainer);
        else ReactDOM.render(<LectureViewDiv populateCourseWith={PopulateAfterReturn}/>, bodyContainer);
      }
     }

     setupQuizBody(){
        //TODO: Use 'this.props.theNode' to check if the assessment if still accessible.
        var backUpInstance = this;
        var quizBtnContent;
        QuizBody = "";
        if(USERROLE == "Student"){
           firebase.database().ref(this.personalAssessRef).once('value').then(function(addedBefore){
             if(backUpInstance.props.from == "cardColumn" || addedBefore.val()) {
                  
                  //First check if Admin has not disabled this content.
                  firebase.database()
                  .ref("/ulearnData/appData/assessments/" + backUpInstance.props.neededData.creator + '/' + backUpInstance.createdFrom[0] + '/' + backUpInstance.props.theNode + '/visibilityStatus/')
                  .once('value')
                  .then(function(refStatus){
                    if(refStatus.val() == "enabled") ReactDOM.render(backUpInstance.Iframe, document.getElementById('quizBody'));
                    else if(refStatus.val() == "disabled") {
                        console.log("Quiz disabled at source");
                        ReactDOM.render(<h6>This content has been disabled</h6>, document.getElementById('quizBody'));
                    }
                  });
                  
             }
             else {
               quizBtnContent = <button type="btn" className="btn btn-outline-info" onClick={(begin) => backUpInstance.startTest(begin)}>Begin assessment</button> 
               ReactDOM.render(quizBtnContent, document.getElementById('forQuizButton'));
             }
           });
        }else if(USERROLE == "Tutor" || USERROLE == "Admin"){
            quizBtnContent = "";   //quizBtnContent is null for Tutor.
            QuizBody = this.Iframe;
        }
     }

     startTest(beginBtn){
        firebase.database().ref(this.personalAssessRef).set(this.props.neededData, (err_or) => {
                                                if(!err_or){
                                                   console.log("Added to assessment interactions");
                                                   beginBtn.target.style.display = "none";
                                                   ReactDOM.render(this.Iframe, document.getElementById('quizBody'));
                                                }else{
                                                   ReactDOM.render(this.errorCall, document.getElementById('quizBody'));
                                                }
        });
     }

     dis_enableQuiz(){
          var visibilityControl = "";
          if(USERROLE == "Admin") visibilityControl = <div className="form-check form-switch">
                                                       <input className="form-check-input"
                                                              type="checkbox"
                                                              id="quizVisibilityControl"
                                                              onChange={(seeToggle) => this.setVisibility(seeToggle)}
                                                              defaultChecked={this.statusToBool(this.props.neededData.visibilityStatus)}
                                                       />
                                                       <label className="ms-1 form-check-label" htmlFor="quizVisibilityControl">{this.props.neededData.visibilityStatus}</label>
                                                      </div>
          return visibilityControl;
     }

     async setVisibility(theTarget){
        var quizVisiStatus;
        var toggleVisibility : boolean;
        var theUrl = "/ulearnData/appData/assessments/" + this.props.neededData.creator + '/' + this.createdFrom[0] + '/' + this.props.theNode + '/visibilityStatus/';

        toggleVisibility = theTarget.target.checked;
        if(toggleVisibility) quizVisiStatus = "enabled";
        else if(!toggleVisibility) quizVisiStatus = "disabled"; 

        await firebase.database().ref(theUrl).set(quizVisiStatus, (updateFailed) => {
               if(updateFailed) console.log("An error occured");
               else if(!updateFailed) theTarget.target.labels[0].innerHTML = quizVisiStatus;
        });
     }

     statusToBool(theStatus){
          var returnedStatus = false;
          if(theStatus == "enabled") returnedStatus = true;
          return returnedStatus;
     }

     render(){
       this.createdFrom = Object.keys(this.props.neededData.courseRefs);
       this.setupQuizBody();
       return(
         <div>
          <button className="btn bg-success mb-3" onClick={(un) => this.selectParent(un)}>Back</button>

          <div className="d-flex flex-row justify-content-between">
           <h1>{this.props.neededData.assessmentTitle}</h1>
           {this.dis_enableQuiz()}
          </div>

          <h6>{this.props.neededData.assessmentDescription}</h6>
          <h3>ASSESSMENT RESULTS</h3>
          <small>Username: Performance</small>
          <hr/>

          <div className="d-flex flex-row justify-content-between mb-3">
           <h4>ASSESSMENT BODY</h4>
           <div id="forQuizButton"></div>
          </div>
          
          <div id="quizBody">{QuizBody}</div>

         </div>
       );
     }
}