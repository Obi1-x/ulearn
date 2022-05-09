'use strict';

const chiefBody = document.querySelector('#body_chief');
const mainBody = document.querySelector('#body_main_child');
const subBody = document.querySelector('#body_sub_child');
const headerNavi = document.querySelector('#headernavi');
const footerNavi = document.querySelector('#footerNav');
const firstAuthen = localStorage.getItem("FirstAuth"); //className="nav-item d-flex flex-row"


const headerAddition =  <li id="static_nav" className="nav nav-pills">
                         <a className="nav-link text-success" href="#body_main_child">Home</a>
					     <a className="nav-link text-success" href="#gallery">Gallery</a>
				     	 <a className="nav-link text-success" href="#publications">Publication</a>
				    	 <a className="nav-link text-success" href="#events">Events</a>
					     <a className="nav-link text-success" href="#features">About</a>
                        </li>

const staticBanner = <div className="d-flex flex-column align-items-center bg-success py-3">
                      <img src="./images/yabatechlogo.png" alt="YT logo" width="10%" height="10%"/>
                      <h1 className="text-light display-1 mt-3">ULearn</h1>
                      <p className="d-flex flex-sm-wrap flex-md-wrap text-light mt-2">A remote learning platform built primarily for students of Yaba college of Technology.</p>

                      <div className="dropdown">
                       <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Get started
                       </button>

                       <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><h6 className="dropdown-header">Authenticate as</h6></li>
                        <li><button className="dropdown-item" onClick={(stuAs) => signingIn("student")}>Student</button></li>
                        <li><button className="dropdown-item" onClick={(tuAs) => signingIn("tutor")}>Tutor</button></li>
                        <li><button className="dropdown-item" onClick={(adAs) => signingIn("admin")}>Administrator</button></li>
                       </ul>
                      </div>

                     </div>
                    



firebase.auth().onAuthStateChanged(firstUser => {
          var landingNavRef2 = document.getElementById("landing_nav");

          if(firstUser && firstUser.displayName == USERNAME){
             headerNavi.hidden = false;
             footerNavi.hidden = false;
             chiefBody.setAttribute('class', 'container-fluid bg-light');
             mainBody.setAttribute('class', 'py-3 bg-light');
             ReactDOM.unmountComponentAtNode(mainBody);
             ReactDOM.unmountComponentAtNode(subBody);
             ReactDOM.unmountComponentAtNode(landingNavRef2);
             document.getElementById("nav_control_btn").hidden = true;
          }
        });


class StaticContentDiv extends React.Component{
    render(){
        return(
            <div className="d-flex flex-column mt-5">
             <div className="b-example-divider"></div>
             <GalleryDiv/>
             <div className="b-example-divider"></div>
             <PublicationsDiv/>
             <div className="b-example-divider"></div>
             <EventsDiv/>
             <div className="b-example-divider"></div>
             <FeaturesDiv/>
            </div> 
        );
    }
}

class GalleryDiv extends React.Component{
    render(){
        return(
             <div id="gallery" className="d-flex flex-column border border-success rounded-3 my-1 mx-2">
              <h2 className="align-self-center">Gallery</h2>
              <hr/>
              <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 mx-2 my-1">

                <div className="col d-flex flex-column align-items-center"> 
                 <img id="registrarIcon" src="./images/registrar1.jpg" alt="registrar" width="50%" height="50%"/>
                 <h5 htmlFor="registrarIcon" className="form-label">Registrar</h5>
                 <label htmlFor="registrarIcon" className="form-label">Dr S.O Momodu</label>
                </div>
                
                <div className="col d-flex flex-column align-items-center">
                 <img id="rectorIcon" src="./images/rector.jpg" alt="The rector" width="50%" height="50%"/>
                 <h5 htmlFor="rectorIcon" className="form-label">Rector</h5>
                 <label htmlFor="rectorIcon" className="form-label">Engr Obafemi Omokungbe</label>
                </div>

                <div className="col d-flex flex-column align-items-center">
                 <img id="hodIcon" src="./images/engr_yekini.jpg" alt="HOD photo" width="50%" height="50%"/>
                 <h5 htmlFor="hodIcon" className="form-label">HOD Computer engineering</h5>
                 <label htmlFor="hodIcon" className="form-label">Engr Yekini Nurenin Asafe</label>
                </div>

              </div>
             </div>
        );
    }
}

class PublicationsDiv extends React.Component{
    render(){
        return(
            <div id="publications" className="d-flex flex-column border border-success rounded-3 my-1 mx-2">
             <h2 className="align-self-center">Publications</h2>
             <div className="row embed-responsive embed-responsive-21by9">
              <iframe src="https://www.researchgate.net/plugins/institution?installationId=5c78590ec7d8ab547d637ece&theme=light&type=institution&width=1200&height=500&publications=true&faces=true&stats=true&href=https%3A%2F%2Fwww.yabatech.edu.ng%2F"
                      width="800"
                      height="500"
                      marginHeight="0"
                      marginWidth="0"
                      className="embed-responsive-item">
               Loading…
              </iframe>
             </div>
            </div> 
        );
    }
}

class EventsDiv extends React.Component{
    render(){
        return(
            <div id="events" className="d-flex flex-column border border-success rounded-3 my-1 mx-2">
             <h2 className="align-self-center">Events</h2>
             <hr/>
             <div className="row row-cols-1 row-cols-md-2 my-1 mx-3">
              <div className="col d-flex flex-column">
               <img id="training_event" src="./images/training.jpg" alt="Event_1" width="100%" height="100%"/>
               <small htmlFor="training_event" className="form-label text-muted mx-2">
                Yabatech Organizes a training programme on the "Strategies And Methodologies Of Publishing Papers On The High Impact Journal Platform".
               </small>
               <hr/>
              </div> {/*col end*/}
              <div className="col d-flex flex-column align-items-center">
               <p>
                Yaba College of Technology organized a training programme on the strategies and Methodologies of Publishing Papers on the High Impact Journal Platform for Teaching Staff of the College.
                The training programme convener by Dr. J O. Adigun, a chief lecturer and former Director of CITM had as participants nominated staff from different academics department in the College.

                The Rector, Engr. Obafemi Omokungbe who declared the program open said that the need for the training was to ensure that academic staff publishes their papers on high-impact journal platforms.
               </p>
              </div> {/*col d-flex end*/}
             </div> {/*col row-cols-1 end*/}
            </div> //d-flex end
        );
    }
}

class FeaturesDiv extends React.Component{
    render(){
        return(
                         <div id="features" className="d-flex flex-column">
                          <h2 className="align-self-center mb-1">Features</h2>

                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded-3 mb-5 mx-2 p-2">
                           <div className="d-flex flex-column align-items-center">
                            <h5>Authentication</h5>
                            <ul>
                             <li>Authentication is ensured through a sign-up or sign-in flow.</li>
                             <li>Users can signin using a valid email address and strong password.</li>
                             <li>Alternatively, users can sign in using a google account.</li>
                             <li>Authentication is completed using an email verification after sign-ups.</li>
                             <li>Authorisation gets handled by admin, who reserve the right to grant of deny access to the user.</li>
                            </ul>
                           </div>
                           <img src="./images/authflow.JPG" alt="Authentication" width="10%" height="5%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-2 p-2">
                           <div className="d-flex flex-column align-items-center col-lg-8">
                            <h5>User role segmentation</h5>
                            <ul>
                             <li>Every user signs up as either a lecture, student or Admin.</li>
                             <li>Lecturers are in charge of creating most of the content.</li>
                             <li>Students consume or interact with content created by lecturers.</li>
                             <li>Adiministrator monitor lecturers, students and the entire content within the platform, to maintain its intergrity.</li>
                            </ul>
                           </div>
                           <img className="col-lg-4" src="./images/roles2.JPG" alt="userroles" width="10%" height="10%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-2 p-2">
                           <div className="d-flex flex-column align-items-center">
                            <h5>Seamless course and lecture creation</h5>
                            <ul>
                             <li>Lecturers can easily create courses under the "My courses" nav item.</li>
                             <li>Several lectures can be created within a course.</li>
                             <li>Every lecture must be associated with a course.</li>
                             <li>The first entry to a newly created course can be used for the course curriculum.</li>
                             <li>Lecture notes, materials and other illustrations can be added to a lecture in plain text, pdf or word doc format.</li>
                            </ul>
                           </div>
                           <img src="./images/courseCreSample.JPG" className="img-thumbnail" alt="Creation" width="10%" height="10%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-2 p-2">
                           <div className="d-flex flex-column align-items-center">
                            <h5>Audio-visual features</h5>
                            <ul>
                             <li>Every lecture includes a button to automatically setup virtual lectures.</li>
                             <li>Students can join lectures afterwards, using an associated link.</li>
                             <li>Attendance of every live lecture participant is automatically colated within an hour from the commencement of the virtual lecture.</li>
                             <li>Contents of the live lecture gets recorded, at the lecturer's end, for future reference.</li>
                             <li>Students can rewatch pre-recorded videos associated with a lecture.</li>
                            </ul>
                           </div>
                           <img src="./images/livevidposter.JPG" alt="Audio-visual" width="20%" height="20%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-2 p-2">
                           <div className="d-flex flex-column align-items-center col-lg-4">
                            <h5>Assessements</h5>
                            <ul>
                             <li>Existing assessmnets can be accessed at the "Assessment" nav item.</li>
                             <li>Every assessment must be associated with at least 1 course.</li>
                             <li>A lecturer can begin creating an assessment by clicking on the "Assessment" button on the course info panel.</li>
                             <li></li>
                            </ul>
                           </div>
                           <img src="./images/assessment-created.JPG" alt="Assessment" width="10%" height="10%"/>
                          </div>


                          <div className="row">
                           <div className="d-flex flex-column">
                            <h4 className="align-self-center">Powered by</h4>
                           </div>
                          </div>

                          
                          <div className="row align-items-center row-cols-1 row-cols-md-2 row-cols-lg-6 mx-2 p-2">

                           <div className="col d-flex flex-column align-items-center">
                            <img id="javascriptIcon" src="./images/javascriptlogo.jpg" alt="javascrpit-icon" width="20%" height="20%"/>
                            <label htmlFor="javascriptIcon" className="form-label">Javascript</label>
                           </div>

                           <div className="col d-flex flex-column align-items-center">
                            <img id="firebaseIcon" src="./images/firebase_28dp.png" alt="firebase-icon" width="20%" height="20%"/>
                            <label htmlFor="firebaseIcon" className="form-label">Firebase</label>
                           </div>

                           <div className="col d-flex flex-column align-items-center">
                            <img id="reactIcon" src="./images/react-logo.svg" alt="react-icon" width="20%" height="20%"/>
                            <label htmlFor="reactIcon" className="form-label">React.js</label>
                           </div>
                           
                           <div className="col d-flex flex-column align-items-center mt-2">
                            <img id="bootstrapIcon" src="./images/bootstrap-logo.svg" alt="bootstrap-icon" width="20%" height="20%"/>
                            <label htmlFor="bootstrapIcon" className="form-label">Bootstrap</label>
                           </div>

                           <div className="col d-flex flex-column align-items-center mt-2">
                            <img id="gformsIcon" src="./images/gforms-logo.png" alt="gforms-icon" width="10%" height="10%"/>
                            <label htmlFor="gformsIcon" className="form-label">G-forms</label>
                           </div>

                           <div className="col d-flex flex-column align-items-center">
                            <img id="jitsiIcon" src="./images/jitsi-logo.svg" alt="jitsi-icon" width="20%" height="20%"/>
                            <label htmlFor="jitsiIcon" className="form-label">Jitsi-meet</label>
                           </div>

                          </div>

                          <div className="b-example-divider"></div>

                         </div>
        );
    }
}

function loadStatic(renderTime){
        var landingNavRef = document.getElementById("landing_nav");
        headerNavi.hidden = true; //Remember to check it out once logged out.
        landingNavRef.parentElement.setAttribute('class', "d-flex flex-row justify-content-between py-3 navbar navbar-expand-lg navbar-light bg-light sticky-top");
        footerNavi.style.display = "none";
        chiefBody.setAttribute('class', 'container-fluid bg-success');
        mainBody.setAttribute('class', 'bg-success');
        if(renderTime == "preRender"){
           ReactDOM.render(staticBanner, mainBody);
           ReactDOM.render(<StaticContentDiv/>, subBody);
           ReactDOM.render(headerAddition, landingNavRef);
        }
        if(!firstAuthen || firstAuthen == "false") document.body.hidden = false; //Reveal if authentication not executed.
} 

loadStatic("preRender");