'use strict';

function CallAssessmentsDiv(assessProp1, assessProp2){
  return <AssessmentsDiv groupedssment={assessProp1} miscData={assessProp2} />
}

class AssessmentsDiv extends React.Component {
   constructor(props) {
    super(props);
    this.headerValue = "Assessments"//"Added / just assessments";
    this.createAssement;
    this.submitResult
   }

   checkWhichRole(){
    if(USERROLE == "Tutor"){
        var dummyCourse = new CourseInfo("Null course", "Null descrip");
        this.createAssement = <button type="submit"
                                      className="btn btn-secondary mb-2"
                                      onClick={(assess) => ReactDOM.render(<AssessmentBuildDiv parentData={dummyCourse} />, bodyContainer)}
                                      >
                               Create test / exam
                              </button>
        this.submitResult = <div>
                             <h6>Results</h6>
                             <div>
                              <label htmlFor="curriculum_upload" className="form-label">Upload result</label>
                              <input type="file" accept=".docx, .pdf" id="curriculum_upload" className="form-control form-control-sm" aria-label="curri_file_input"/>
                              <div className="invalid-feedback">File should be less than 500KB.</div>
                              <button id="submitCC" type="submit" className="btn btn-primary my-3" onClick={(bttn4) => simuUpload(bttn4.target, "curriculum_upload")} >Upload</button>
                             </div>
                            </div>
    }else if(USERROLE == "Student"){
        this.createAssement = <h3 className="mb-2 text-secondary">Write Exam / Test</h3>;
        this.submitResult =  <div>
                              <h5>Download result</h5>
                              <div>
                               <p>Get result</p>
                               <button id="getRR" type="submit" className="btn btn-secondary my-3">Download</button>
                              </div>
                             </div>
    }
   }

   render() {
     this.checkWhichRole()
     return (
      <div>
       {this.createAssement}
       <BodyContent 
                    id = {"myassessments"} 
                    header = {this.headerValue}
                    itemValues = {this.props.groupedssment}
                    forWho = "assessment"
                    miscellanous = {this.props.miscData}/>
       
       <br/>
       <hr/>
       {this.submitResult}
      </div>
     );
   }
}