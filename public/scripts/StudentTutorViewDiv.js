'use strict'

function CallStudOrTutDiv(theProp1, theProp2, theProp3){
 return <StudentTutorViewDiv populatingFor={theProp1} roleData={theProp2} rAuthData={theProp3}/>
}

class StudentTutorViewDiv extends React.Component{

   randomActivity(){ //Remove this afterwards
     var labelToReturn = <h6 className="text-success">Active</h6>
     var dice = Math.floor(Math.random() * 1.25);
     if(dice == 1) labelToReturn = <h6 className="text-danger">Inactive</h6>
     return labelToReturn;
   }

   manageTutors(){
        var tutorListview = "null"; //Add feature: Click Tutor`s username to show more of its infor
        var moreData = this.props.rAuthData;
        tutorListview = this.props.roleData.map((studTutVal, an_index) => <div key={"studOrTutorRow_" + an_index}>

                                                                            <div id={"detailsRow_" + an_index} className="d-flex flex-row justify-content-between mx-2">

                                                                             <div className="row">   
                                                                              <div className="col">
                                                                               <button className="accordion-button collapsed"
                                                                                     type="button"
                                                                                     data-bs-toggle="collapse"
                                                                                     data-bs-target={"#collapse_" + an_index}
                                                                                     aria-expanded="false"
                                                                                     aria-controls={"collapse_" + an_index}>
                                                                               </button>
                                                                              </div>
                                                                              <h5 className="col"> {studTutVal[0]}</h5>
                                                                             </div>

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

                                                                            <div>
                                                                             
                                                                             <div id={"collapse_" + an_index } className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent={"#detailsRow_" + an_index}>
                                                                              <div className="accordion-body">
                                                                               <h6>{this.nullCheckSetter("Fullname: ", studTutVal[1].profileDetails["fullName"])}</h6>
                                                                               <h6>{this.nullCheckSetter("Gender: ", studTutVal[1].profileDetails["gender"])}</h6>
                                                                               {this.infoLoader(studTutVal[1].profileDetails)}
                                                                               {this.randomActivity()}
                                                                              </div>
                                                                             </div>

                                                                             <hr/>
                                                                            </div>

                                                                           </div>);
        return tutorListview;
   }

   infoLoader(parentObject){
     var loadCarrier;
     if(this.props.populatingFor == "Students"){
         loadCarrier = <div>
                        <h6>{this.nullCheckSetter("Matric no: ", parentObject["matricNo"])}</h6>
                        <h6>{this.nullCheckSetter("Program: ", parentObject["programCor"])}</h6>
                        <h6>{this.nullCheckSetter("Program Level: ", parentObject["programLevel"])}</h6>
                       </div>
     }else if(this.props.populatingFor == "Tutors") loadCarrier = <h6>{this.nullCheckSetter("Staff ID: ", parentObject["staffId"])}</h6>
     return loadCarrier;
   }

   nullCheckSetter(prefixLabel, objectToCheck){
      var infoToReturn = "";
      if(objectToCheck != null && objectToCheck != undefined) infoToReturn = prefixLabel + objectToCheck;
      else infoToReturn = prefixLabel + "Not set";
      return infoToReturn;
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


/*
<div class="accordion" id="accordionExample">


          <div class="accordion-item">

            <h4 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Accordion Item #1
              </button>
            </h4>

            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style="">
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>

          </div>


        </div> */