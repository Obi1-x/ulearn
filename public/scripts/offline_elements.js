'use strict';

const mainBody = document.querySelector('#body_main_child');

const staticPage = <div>
     <div id="courses" className="container mg-8">
      <h4>Courses</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-thumbnail img-fluid" src="courses/eng_math.png" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Engineering math</h3>
              <p className="card-text">Learn intensive calculations.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Add</button>
                </div>
                <small className="text-muted">50 lectures</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-thumbnail img-fluid" src="./courses/literature.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Literature</h3>
              <p className="card-text">An exposure to literal pros.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Add</button>
                </div>
                <small className="text-muted">15 lectures</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-thumbnail img-fluid" src="./courses/physics.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Physics</h3>
              <p className="card-text">Understanding the principles of realitivity.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Add</button>
                </div>
                <small className="text-muted">45 lectures</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-thumbnail img-fluid" src="./courses/economics.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Economics</h3>
              <p className="card-text">Master the dynamic of supply and demand.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Add</button>
                </div>
                <small className="text-muted">35 lectures</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col">
          <div className="card shadow-sm">
            <img className="img-thumbnail img-fluid" src="./courses/philosophy.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Philosophy</h3>
              <p className="card-text">Revealing the "stuff of reality".</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Add</button>
                </div>
                <small className="text-muted">60 lectures</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col">
          <div className="card shadow-sm">
            <img className="img-thumbnail img-fluid" src="./courses/law.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Law</h3>
              <p className="card-text">Description: Learn intensive calculations.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Add</button>
                </div>
                <small className="text-muted">9 lectures</small>
              </div>
            </div>
          </div>
        </div>

        <span></span>

      </div>
    </div>



    <div id="tutors" className="container">
      <h4>Tutors</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-fluid" src="./tutors/testimonials-1.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Andrew Vardie</h3>
              <p className="card-text">Assitant lecturer at ABC instituition.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Like</button>
                </div>
                <small className="text-muted">3 courses</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-fluid" src="./tutors/testimonials-4.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Adams Smith</h3>
              <p className="card-text">Assitant lecturer at ABC instituition.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Like</button>
                </div>
                <small className="text-muted">5 courses</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-fluid" src="./tutors/einstein.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Albert Einstein</h3>
              <p className="card-text">A genius.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Like</button>
                </div>
                <small className="text-muted">10 courses</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-fluid" src="./tutors/testimonials-5.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Galileo Galilei</h3>
              <p className="card-text">Senior lecturer at ABC instituition.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Like</button>
                </div>
                <small className="text-muted">8 courses</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-fluid" src="./tutors/testimonials-2.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Larson Goodman</h3>
              <p className="card-text">Graduate assitant at ABC instituition.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Like</button>
                </div>
                <small className="text-muted">2 courses</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <img className="img-fluid" src="./tutors/testimonials-3.jpg" width="100%" height="50"></img>
            <div className="card-body">
              <h3 className="card-title display-6">Sarah Karlis</h3>
              <p className="card-text">Senior lecturer in literature at ABC instituition.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Like</button>
                </div>
                <small className="text-muted">15 courses</small>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    </div>

function loadStatic(){
    if(!USERNAME) ReactDOM.render(staticPage, mainBody);
    else ReactDOM.unmountComponentAtNode(mainBody);
}

loadStatic();