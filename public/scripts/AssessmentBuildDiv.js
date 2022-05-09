'use strict';

class AssessmentBuildDiv extends React.Component{
     constructor(props) {
      super(props);
      this.referenceObject = {};
     }
     Test
     componentDidMount() {
       this.whoToDisable();
     }

     whoToDisable(compare){
      this.referenceObject[this.props.parentData.courseTitle] = this.props.parentData.creator;
      var todisAble = document.getElementById("checkID_" + this.props.parentData.courseTitle + '_' + this.props.parentData.creator);
      todisAble.checked = true;
      todisAble.disabled = true;
     }

     buildCheckList(){
      const possibleLinks = findMyCourses();
      var checks = possibleLinks.map((checK) => <div key={"check_" + checK.courseTitle + '_' + checK.creator}
                                                     className="mb-3 form-check"
                                                     id={"ID_" + checK.courseTitle + '_' + checK.creator}>
                                                 <input onChange={(checkB) => this.populateLinkedCourses(checkB.target.checked, checK.courseTitle, checK.creator)}
                                                        type="checkbox" className="form-check-input" 
                                                        id={"checkID_" + checK.courseTitle + '_' + checK.creator} 
                                                        value={checK.courseTitle}/>
                                                 <label className="form-check-label"
                                                        htmlFor={"checkID_" + checK.courseTitle + '_' + checK.creator}>{checK.courseTitle}</label>
                                                </div>
                                                );
      return checks;
     }

     populateLinkedCourses(isChecked, ident, creaTOR){
        if(isChecked) this.referenceObject[ident] = creaTOR;
        else if(!isChecked) this.referenceObject[ident] = "";
     }

     prepToSubmitA(btn_CallB){
          const aNa = document.querySelector('#asseName');
          const aDi = document.querySelector('#asseDisc');
          const aLi = document.querySelector('#asseLink');

          //If all the neccesary fields are not empty.
          if(aNa.value && aDi.value && aLi.value) this.submitAssess(btn_CallB);
          else{
             var inputFields = new Array(aNa, aDi, aLi);
             var highestBlankField;
             var i = 0;
             while(i<3){
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

     submitAssess(asseCallback){
      console.log("Submitting Assessment");

      const assessName = document.querySelector('#asseName');
      const assessDescrip = document.querySelector('#asseDisc');
      const assessLink = document.querySelector('#asseLink');

      var anAssessment = new Assessment(assessName.value, assessDescrip.value);
      //anAssessment.creationPoint = this.props.parentData.courseTitle;
      anAssessment.courseRefs = this.referenceObject;
      anAssessment.assessmentLink = assessLink.value;

      var assessRef = "/ulearnData/appData/assessments/" + this.props.parentData.creator + '/' + this.props.parentData.courseTitle + '/';
      firebase.database().ref(assessRef).push()
          .set(anAssessment, (err_or) => {
                                      if (err_or) alert("An error occurred");
                                      else{
                                        alert("Assessment submitted");
                                        //Click back button
                                        ReactDOM.render(<LectureViewDiv populateCourseWith={this.props.parentData}/>, bodyContainer)
                                      }
                                      }
                                      );
     }


     render(){
       return(
        <div>
        <button className="btn bg-success text-light mb-3" onClick={(lin) => ReactDOM.render(<LectureViewDiv populateCourseWith={this.props.parentData}/>, bodyContainer)}>Back</button>
         <h3>New Assessment</h3>

         <div className="my-4 col-md-6">
          <label htmlFor="asseName" className="form-label">Assessment name</label>
          <input type="text" id="asseName" className="form-control" placeholder="e.g End of year test" autoFocus="autoFocus" required="required"/>
          <div className="invalid-feedback">Sholud not be blank.</div>
         </div>
       
         <div className="my-4 col-md-6">
          <label htmlFor="asseDisc" className="form-label">Assessment discription</label>
          <input type="text" id="asseDisc" className="form-control" placeholder="e.g A test on courses linked to this test" required="required"/>
          <div className="invalid-feedback">Sholud not be blank.</div>
         </div>

         <div className=" mt-4 mb-5 col-md-3">
          <label htmlFor="couRefChecks" className="form-label">Course reference</label>
          <div id="couRefChecks">
           {this.buildCheckList()}
          </div>
         </div>

         <hr/>

         <a href="https://docs.google.com/forms/">Set assessment questions here</a>

         <div className="my-4 col-md-6">
          <label htmlFor="asseLink" className="form-label">Then drop link below</label>
          <input type="url" id="asseLink" className="form-control" placeholder="Assessment link." required="required"/>
          <div className="invalid-feedback">Sholud contain a link to the assessment.</div>
         </div>

         <button id="submitAssessment" onClick={(ament) => this.prepToSubmitA(ament)} type="submit" className="btn btn-primary my-3">Create assessment</button>

        </div>
       );
     }
}