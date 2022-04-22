'use strict';


class SettingsDiv extends React.Component{
  constructor(props) {
      super(props);
  }

  getAndPutPrp(anAction){
        if(anAction == "Create"){
        }
  }

  render() {
    return (
     <div>
      <h3 className="bd-heading align-self-start mt-1 mb-3">Settings</h3>
      
      <legend className="ms-2">Account settings</legend>
      
      <div className="card my-3 p-2">
       <div className="d-flex flex-column align-items-center">
        <img id="prp" className="img-fluid rounded-circle" src="./images/blank_pic.png" width="30%" height="100%"/>
        <h6 className="display-6">{'@' + USERNAME}</h6>
       </div>
       <input type="file" accept="image/*" id="profilepic" className="form-control form-control-sm" aria-label="profile photo upload"/>
      </div>

      <div className="my-1 col">
       <label htmlFor="fullname" className="form-label">Full name</label>
       <input type="text" id="fullname" className="form-control" placeholder="Yemi Osinbajo" aria-label="Fullname" aria-describedby=""/>
      </div>

      <div className="my-1">
       <label htmlFor="matricNo" className="form-label">Matric no</label>
       <input type="text" className="form-control" id="matricNo" required="" aria-label="Matric No"/>
      </div>

      <div className="my-1">
       <label htmlFor="matricNo" className="form-label">Program</label>
       <input type="text" className="form-control" id="programCor" required="" placeholder="Computer engineering" aria-label="Fullname"/>
      </div>

      <div>
       <label htmlFor="validationServer04" className="form-label">State</label>
       <select className="form-select" id="validationServer04" required="">
        <option defaultValue="none">Choose...</option>
        <option value="Abia" disabled="" defaultValue="">Abia</option>
        <option>...</option>
       </select>
      </div>

      <br/><hr/>
      <br/>
      <legend>Other settings:</legend>

      <button type="submit" className="btn btn-primary my-3">Submit</button>
     </div>
    );
  }
}