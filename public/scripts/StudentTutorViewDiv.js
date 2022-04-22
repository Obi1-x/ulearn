'use strict'

class StudentTutorViewDiv extends React.Component{
   manageTutors(){
        var tutorListview = "null"; //Add feature: Click Tutor`s username to show more of its infor
        var moreData = this.props.rAuthData;
        tutorListview = this.props.roleData.map((studTutVal, an_index) => <div key={"studOrTutorRow_" + an_index}>

                                                                            <div className="d-flex flex-row justify-content-between mx-2">
                                                                             <h5> {studTutVal[0]}</h5>
                                                                             <h6> {studTutVal[1].status} </h6>

                                                                             <div className="mx-3 form-check form-switch">
                                                                              <input className="form-check-input"
                                                                                     type="checkbox"
                                                                                     id={"studTutorCheckbutton_" + an_index} 
                                                                                     onChange={(studTutToggle) => this.toggleStudTutAuth(studTutToggle, studTutVal[0])}
                                                                                     defaultChecked={this.getAuthorization(moreData[an_index].authorizationStatus)}
                                                                              />
                                                                              <label className="form-check-label" htmlFor={"studTutorCheckbutton_" + an_index} >{moreData[an_index].authorizationStatus}</label>
                                                                             </div>
                                                                            </div>

                                                                            <div><hr/></div>

                                                                           </div>);
        return tutorListview;
   }

   async toggleStudTutAuth(buttonCallback, applyingAdmin){
     var studOrTutStatus;
     var aToggleState : boolean;

     aToggleState = buttonCallback.target.checked;
     if(aToggleState) studOrTutStatus = "enabled";
     else if(!aToggleState) studOrTutStatus = "disabled";

     await firebase.database().ref('/ulearnData/userData/' + this.props.populatingFor + '/applications/' + applyingAdmin + '/authorizationStatus/').set(studOrTutStatus, (updateFailed) => {
               if(updateFailed) console.log("An error occured")
                  else if(!updateFailed){
                       buttonCallback.target.labels[0].innerHTML = studOrTutStatus;
               }
     });
  }

   getAuthorization(inputAuth){
       var aStatusToReturn = false;
       if(inputAuth == "enabled") aStatusToReturn = true;
       return aStatusToReturn;
   }

   chooseRole(assignedRole){
       var choosenRole;
       if(assignedRole == "Tutors") choosenRole = "./images/lecturer.png";
       else if(assignedRole == "Students") choosenRole = "./images/student.png";
       return choosenRole;
   }

   render() {
     return (
       <div className="d-flex flex-column">

       <div className="d-flex flex-row mb=3 align-items-buttom">
        <img className="img-responsive img-thumbnail" src={this.chooseRole(this.props.populatingFor)} width="5%" height="10"></img>
        <h2>{this.props.populatingFor}</h2>
       </div>

       <hr/>

       {this.manageTutors()}
       </div>
     );
   }
}