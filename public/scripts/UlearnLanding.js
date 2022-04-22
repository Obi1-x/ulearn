'use strict';

const chiefBody = document.querySelector('#body_chief');
const mainBody = document.querySelector('#body_main_child');
const subBody = document.querySelector('#body_sub_child');
const headerNavi = document.querySelector('#headernavi');
const footerNavi = document.querySelector('#footerNav');
const firstAuthen = localStorage.getItem("FirstAuth");

const staticBanner = <div className="d-flex flex-column align-items-center bg-success py-3">
                    <h1 className="text-light display-1 mt-3">ULearn</h1>
                    <p className="d-flex flex-sm-wrap flex-md-wrap text-light mt-2">A remote learning platform built primarily for students of Yaba college of Technology.</p>
                    <button className="btn btn-warning" type="submit">Get started</button>
                   </div>

const staticFeatures =  <div className="d-flex flex-column">
                         <h2 className="align-self-center mt-3">Features</h2>
                         <div className="col">


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded-3 my-5 mx-1 p-2">
                           <div className="d-flex flex-column align-items-center">
                            <h5>Authentication</h5>
                            <ul>
                             <li>Authentication is ensured through a sign-up or sign-in flow.</li>
                             <li>Users can signin using a valid email address and strong password.</li>
                             <li>Alternatively, users can sign in using a google account.</li>
                             <li>Authentication is completed using an email verification after sign-ups.</li>
                            </ul>
                           </div>
                           <img src="./images/authflow.jpg" alt="Live-lecture-sample" width="10%" height="5%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-1 p-2">
                           <div className="d-flex flex-column align-items-center col-lg-8">
                            <h5>User role segmentation</h5>
                            <ul>
                             <li>Every user signs up as either a lecture, student or Admin.</li>
                             <li>Lecturers are in charge of creating most of the content.</li>
                             <li>Students consume or interact with content created by lecturers.</li>
                             <li>Adiministrator monitor lecturers, students and the entire content within the platform, to maintain its intergrity.</li>
                            </ul>
                           </div>
                           <img className="col-lg-4" src="./images/roles2.jpg" alt="userroles" width="10%" height="10%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-1 p-2">
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
                           <img src="./images/courseCreSample.jpg" className="img-thumbnail" alt="Live-lecture-sample" width="10%" height="10%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-1 p-2">
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
                           <img src="./images/livevidposter.jpg" alt="Live-lecture-sample" width="20%" height="20%"/>
                          </div>


                          <div className="row row-cols-1 row-cols-md-2 border border-success rounded my-5 mx-1 p-2">
                           <div className="d-flex flex-column align-items-center col-lg-4">
                            <h5>Assessements</h5>
                            <ul>
                             <li>Existing assessmnets can be accessed at the "Assessment" nav item.</li>
                             <li>Every assessment must be associated with at least 1 course.</li>
                             <li>A lecturer can begin creating an assessment by clicking on the "Assessment" button on the course info panel.</li>
                             <li></li>
                            </ul>
                           </div>
                           <img src="./images/assessment-created.jpg" alt="Live-lecture-sample" width="10%" height="10%"/>
                          </div>


                          <div className="row">
                           <div className="d-flex flex-column">
                            <h4 className="align-self-center">Powered by</h4>
                           </div>
                          </div>

                          
                          <div className="row align-items-center row-cols-1 row-cols-md-2 row-cols-lg-5 mx-1 p-2">

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
                           
                           <div className="col d-flex flex-column align-items-center">
                            <img id="gformsIcon" src="./images/gforms-logo.png" alt="gforms-icon" width="10%" height="10%"/>
                            <label htmlFor="gformsIcon" className="form-label">G-forms</label>
                           </div>

                           <div className="col d-flex flex-column align-items-center">
                            <img id="jitsiIcon" src="./images/jitsi-logo.svg" alt="jitsi-icon" width="20%" height="20%"/>
                            <label htmlFor="jitsiIcon" className="form-label">Jitsi-meet</label>
                           </div>

                          </div>


                         </div>
                        </div>


function loadStatic(renderTime){
        headerNavi.hidden = true; //Remember to check it out once logged out.
        footerNavi.style.display = "none";
        chiefBody.setAttribute('class', 'container-fluid bg-success');
        mainBody.setAttribute('class', 'bg-success');
        if(renderTime == "preRender"){
           ReactDOM.render(staticBanner, mainBody);
           ReactDOM.render(staticFeatures, subBody);
        }
        if(!firstAuthen || firstAuthen == "false") document.body.hidden = false; //Reveal is authentication not executed.
} 

loadStatic("preRender");

firebase.auth().onAuthStateChanged(firstUser => {
          if(firstUser && firstUser.displayName == USERNAME){
             headerNavi.hidden = false;
             footerNavi.hidden = false;
             chiefBody.setAttribute('class', 'container-fluid bg-light');
             mainBody.setAttribute('class', 'py-3 bg-light');
             ReactDOM.unmountComponentAtNode(mainBody);
             ReactDOM.unmountComponentAtNode(subBody);
          }
        });