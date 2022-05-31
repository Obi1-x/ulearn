'use strict'

function CallAdminViewDiv(adViewProp1, adViewProp2){
 return <AdminViewDiv authoriApplyData={adViewProp1} adminAuthenStatus={adViewProp2}/>
}

class AdminViewDiv extends React.Component {
 async toggleAuthorization(buttonToEnable, applyingAdmin, tally){

     var anAdminStatus;
     var updateTimestamp = new Date().getTime();
     var statusDateElement = document.getElementById("timeStatus_" + tally);
     var toggleState : boolean;

     toggleState = buttonToEnable.target.checked;
     if(toggleState) anAdminStatus = "enabled";
     else if(!toggleState) anAdminStatus = "disabled";

     //Update database first then update UI with the callback
     var updateApplication = {
                              "authorizationStatus" : anAdminStatus,
                              "statusDate" : updateTimestamp
                             }

     await firebase.database().ref('/ulearnData/userData/Admins/applications/' + applyingAdmin + '/').set(updateApplication, (updateFailed) => {
               if(updateFailed) console.log("An error occured")
                  else if(!updateFailed){
                       buttonToEnable.target.labels[0].innerHTML = anAdminStatus;
                       statusDateElement.innerHTML = this.convertTime(updateTimestamp);
               }
     });
  }

  readAuthorization(receivedStatus){
        var statusToReturn = false;
        if(receivedStatus == "enabled") statusToReturn = true;
        return statusToReturn;
  }

  convertTime(inTimestamp){
        var timing = new Date(inTimestamp);
        return timing.toLocaleString();
  }

  unpackData(){
     var collect = this.props.adminAuthenStatus;
     var appliesMap;
     appliesMap = this.props.authoriApplyData.map((appl, ind_ex) => <tr key={ind_ex} id={"row" + ind_ex}>
                                                                     <th scope="row">{appl[0]}</th>
                                                                     <td>{collect[ind_ex].status}</td>

                                                                     <td className="mx-3 form-check form-switch">
                                                                       <input className="form-check-input"
                                                                              type="checkbox"
                                                                              id={"flexSwitchCheckChecked_" + ind_ex} 
                                                                              onChange={(toggling) => this.toggleAuthorization(toggling, appl[0], ind_ex)}
                                                                              defaultChecked={this.readAuthorization(appl[1].authorizationStatus)}
                                                                       />
                                                                       <label className="form-check-label" htmlFor={"flexSwitchCheckChecked_" + ind_ex}>{appl[1].authorizationStatus}</label>
                                                                     </td>

                                                                     <td id={"timeStatus_" + ind_ex}>{this.convertTime(appl[1].statusDate)}</td>
                                                                    </tr>);
     return appliesMap;
  }


  render() {
    return (
     <div className="container-fluid">

        <div className="d-flex flex-row mb=3 align-items-buttom">
         <img id="tutPageIcon" className="img-responsive img-thumbnail me=2" src="./images/myAdmin.jpg" width="5%" height="10"></img>
         <h2 >Administrators</h2>
        </div>
      
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Authen status</th>
            <th scope="col">Authorization status</th>
            <th scope="col">Status date</th>
          </tr>
          </thead>

          <tbody>
           {this.unpackData()}
          </tbody>
        </table>

     </div>
    );
  }
}