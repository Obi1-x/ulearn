'use strict';

var QuizBody;

class AssessmentViewDiv extends React.Component{
     constructor(props) {
      super(props);
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
      else ReactDOM.render(<LectureViewDiv populateCourseWith={PopulateAfterReturn}/>, bodyContainer);
     }

     setupQuizBody(){
        //TODO: Use 'this.props.theNode' to check if the assessment if still accessible.
        var backUpInstance = this;
        var quizBtnContent;
        QuizBody = "";
        if(USERROLE == "Student"){
           firebase.database().ref(this.personalAssessRef).once('value').then(function(addedBefore){
             if(backUpInstance.props.from == "cardColumn" || addedBefore.val()) ReactDOM.render(backUpInstance.Iframe, document.getElementById('quizBody'));
             else {
               quizBtnContent = <button type="btn" className="btn btn-outline-info" onClick={(begin) => this.startTest(begin)}>Begin assessment</button> 
               ReactDOM.render(quizBtnContent, document.getElementById('forQuizButton'));
             }
           });
        }else if(USERROLE == "Tutor"){
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

     render(){
       this.setupQuizBody();
       return(
         <div>
          <button className="btn bg-success mb-3" onClick={(un) => this.selectParent(un)}>Back</button>
          <h1>{this.props.neededData.assessmentTitle}</h1>
          <h6>{this.props.neededData.assessmentDescription}</h6>
          <h2>ASSESSMENT RESULTS</h2>
          <small>Username: Performance</small>
          <hr/>

          <div className="d-flex flex-row justify-content-between mb-3">
           <h2>ASSESSMENT BODY</h2>
           <div id="forQuizButton"></div>
          </div>
          
          <div id="quizBody">{QuizBody}</div>

         </div>
       );
     }
}