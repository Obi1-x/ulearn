'use strict';


class SettingsDiv extends React.Component{
  constructor(props) {
      super(props);
      this.dynamicDetails = this.props.initialDetails;
      this.hasDynamicDetailsChanged = false;
  }

  getInitialDetail(theKey){
      var toGiveBack = "";
      if(this.props.initialDetails != null && this.props.initialDetails[theKey] != null){
         toGiveBack = this.props.initialDetails[theKey];
      }
      return toGiveBack;
  }

  arrangeInputs(){
    var finalInputs = <div>

                      {/* <div className="my-1">
                        <label htmlFor="matricNo" className="form-label">Matric no</label>
                        <input type="text"
                               className="form-control"
                               id="matricNo"
                               aria-label="Matric No"
                               defaultValue={this.getInitialDetail("matricNo")}
                               onChange={(reer) => this.settingsBuffer(reer)}
                               />
                       </div>*/}

                       <div className="my-1">
                        <label htmlFor="matricNo" className="form-label">Program</label>
                        <input type="text"
                               className="form-control"
                               id="programCor"
                               placeholder="Computer engineering"
                               aria-label="Fullname"
                               defaultValue={this.getInitialDetail("programCor")}
                               onChange={(reer) => this.settingsBuffer(reer)}
                               />
                       </div>
                       
                       <div className="my-1">
                        <label htmlFor="programlevel" className="form-label">Program level</label>
                        <select className="form-select"
                                id="programLevel"
                                defaultValue={this.getInitialDetail("programLevel")}
                                onChange={(r) => this.settingsBuffer(r)}>
                         <option defaultValue="none">Choose...</option>
                         <option value="OND 1" disabled="" defaultValue="">OND 1</option>
                         <option value="OND 2" disabled="" defaultValue="">OND 2</option>
                         <option value="HND 1" disabled="" defaultValue="">HND 1</option>
                         <option value="HND 2" disabled="" defaultValue="">HND 2</option>
                        </select>
                       </div>

                      </div>

    if(USERROLE == "Tutor"){
        finalInputs = <div>
                       <div className="my-1">
                        <label htmlFor="tutorRank"className="form-label">TutorRank</label>
                        <select defaultValue={this.getInitialDetail("tutorRank")}
                                className="form-select" 
                                id="tutorRank"
                                required=""
                                onChange={(reer) => this.settingsBuffer(reer)}
                                >
                         <option value="none">Choose...</option>
                         <option value="Junior lecturer">Junior lecturer</option>
                         <option value="Senior lecturer">Senior lecturer</option>
                         <option value="Other">Other</option>
                        </select>
                       </div>
                      </div>
    }
    return finalInputs;
  }


  updateSettings(updater){
   var aProgresswheel = document.getElementById('updateDetailsProgressWheel');
   aProgresswheel.hidden = false;
   updater.target.disabled = true;

   var inputRef = document.getElementById("profilepic");
   var detailsRef = '/ulearnData/userData/' + USERROLE + 's/' + USERNAME + '/profileDetails/';
   var prpUrlRef = '/ulearnData/' + USERROLE + 's/' + USERNAME + '/' + USERNAME + "photo";
   if(inputRef.value){
       //Upload to Storage.
       var updateTask = firebase.storage().ref(prpUrlRef).put(inputRef.files[0]);
       updateTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
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
                                                          firebase.storage().ref(prpUrlRef).getDownloadURL().then((downloadURL) => {
                                                            this.dynamicDetails.profilePicUrl = downloadURL;
                                                            this.hasDynamicDetailsChanged = true;
                                                            this.actualSettingsUpdate(detailsRef, aProgresswheel, updater.target);
                                                          });
                                                         }
                                                       );
   }else if(this.hasDynamicDetailsChanged) this.actualSettingsUpdate(detailsRef, aProgresswheel, updater.target);
  }

  actualSettingsUpdate(theUrl, infoProgressWheel, infoSubmitButton){
    //Upload to db
    firebase.database().ref(theUrl).set(this.dynamicDetails, (err_or) => {
                                                                           if (err_or) alert("An error occurred");
                                                                           else{
                                                                                this.hasDynamicDetailsChanged = false;
                                                                                console.log("Details updated");
                                                                                infoProgressWheel.hidden = true;
                                                                                infoSubmitButton.disabled = false;
                                                                                }
                                                                               }
                                                                            );
  }


  settingsBuffer(whatChanged){
    this.hasDynamicDetailsChanged = true;
    const detailKey = whatChanged.target.id;
    if(this.dynamicDetails == null) this.dynamicDetails = new Object();
    this.dynamicDetails[detailKey] = whatChanged.target.value;
  }

  selectImageUrl(){
     var linkToUse;
     if(this.props.initialDetails != null && this.props.initialDetails.profilePicUrl != null) linkToUse = this.props.initialDetails.profilePicUrl;
     else linkToUse = "./images/blank_pic.png";
     return linkToUse;
     //return this.props.initialDetails.profilePicUrl ? this.props.initialDetails.profilePicUrl : "./images/blank_pic.png";
  }

  matricOrStaffID(){
   var whichId;
   if(USERROLE == "Student") whichId = this.getInitialDetail("matricNo");
   else if(USERROLE == "Tutor") whichId = this.getInitialDetail("staffId");
   return whichId;
  }

  render() {
    return (
     <div>
      <h3 className="bd-heading align-self-start mt-1 mb-3">Settings</h3>
      
      <legend className="ms-2">Account settings</legend>
      
      <div className="card my-3 p-2">
       <div className="d-flex flex-column align-items-center">
        <img id="prp" className="img-fluid rounded-circle" src={this.selectImageUrl()} width="30%" height="100%"/>
        <h5 className="display-6">{'@' + USERNAME}</h5>
        <h6>{this.matricOrStaffID()}</h6>
       </div>
       <input type="file" 
              accept="image/*" 
              id="profilepic" 
              className="form-control form-control-sm"
              aria-label="profile photo upload"
              onChange={(lambda) => {
                                     document.getElementById("prp").src = URL.createObjectURL(lambda.target.files[0]);
                                    }
                       }
       />
      </div>

      <div className="my-1">
       <label htmlFor="fullName" className="form-label my-1">Full name</label>
       <input type="text"
              id="fullName"
              className="form-control"
              placeholder="Yemi Osinbajo"
              aria-label="Fullname"
              defaultValue={this.getInitialDetail("fullName")}
              aria-describedby=""
              onChange={(theChange) => this.settingsBuffer(theChange)}
       />
      </div>

      <div className="my-1">
       <label htmlFor="gender"className="form-label">Gender</label>
       <select defaultValue={this.getInitialDetail("gender")}
               className="form-select" 
               id="gender"
               required=""
               onChange={(gen) => this.settingsBuffer(gen)}
               >
        <option value="none">Choose...</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
       </select>
      </div>

      {this.arrangeInputs()}

      <br/><hr/>
      <br/>
      <legend>Other settings:</legend>

      
      <button type="submit" className="btn btn-primary my-3" onClick={(reffer) => this.updateSettings(reffer)}>Save</button>

      <div id="updateDetailsProgressWheel" className="spinner-border text-primary ms-2 mt-4" role="status" hidden="hidden">
       <span className="visually-hidden">Loading...</span>
      </div>

     </div>
    );
  }
}