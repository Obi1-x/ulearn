'use strict';

const bodyContainer = document.querySelector('#body_main_child');
var renderedBodyContainer, previousClick, numOfCourses, coursesValuesArray, regulatedAssessments; //mainNavRef

function adminNavSelections(clicked){
  if(previousClick) previousClick.className = 'nav-link';
  clicked.className = 'nav-link active';
  previousClick = clicked;

  if(authorizationObject.getStatus() == "enabled"){
      switch(clicked.innerHTML){
        case "Content":  regulatedAssessments = new Array();
                         firebase.database().ref('/ulearnData/appData/assessments/').once('value').then(function(aTest){
                             Object.values(aTest.val()).forEach(subValue => {
                                Object.values(subValue).forEach(aQuiz => {
                                   var holdArray = Object.entries(aQuiz);
                                   var flip : int = 0;
                                   while(flip < holdArray.length){
                                         regulatedAssessments.push(holdArray[flip]);
                                         flip++;
                                   }
                                });
                             });
                         });

                        coursesValuesArray = new Array();
                        firebase.database()
                        .ref('/ulearnData/appData/courses/')
                        .once('value')
                        .then(function(mycData){
                             numOfCourses = mycData.numChildren();
                             firebase.database()
                             .ref('/ulearnData/appData/courses/')
                             .orderByChild('indexWithCreated')
                             .on('child_added', function(cData){ //Should filter 20 at a time.
                                 coursesValuesArray.push(cData.val());
                                 if(coursesValuesArray.length == numOfCourses) renderedBodyContainer = ReactDOM.render(<ContentDiv courseValueData={coursesValuesArray} quizesValueData={regulatedAssessments} />, bodyContainer);
                             });
                         });

                         firebase.database().ref('/ulearnData/appData/courses/').off('child_added')  //remove listener from path();
             break;
        case "Tutors": var tutorsDataArray = new Array();
                       var tutorStatusDataArray = new Array();
                       firebase.database().ref('/ulearnData/userData/Tutors/').once('value').then(function(allTutors){
                         Object.values(allTutors.val().applications).forEach(aTutorStatus => {
                            tutorStatusDataArray.push(aTutorStatus);
                         });

                         Object.entries(allTutors.val()).forEach((aTutor) => {
                             if(aTutor[0] != "applications") tutorsDataArray.push(aTutor);
                          });

                         ReactDOM.unmountComponentAtNode(bodyContainer); //Used to reset the states of the check buttons.
                         ReactDOM.render(<StudentTutorViewDiv populatingFor="Tutors" roleData={tutorsDataArray} rAuthData={tutorStatusDataArray} />, bodyContainer);
                       });
             break;
        case "Students": var studentsDataArray = new Array();
                         var studStatusDataArray = new Array();
                       firebase.database().ref('/ulearnData/userData/Students/').once('value').then(function(allStudents){
                         Object.values(allStudents.val().applications).forEach(aStudStatus => {
                            studStatusDataArray.push(aStudStatus);
                         });

                         Object.entries(allStudents.val()).forEach((aStud) => {
                             if(aStud[0] != "applications") studentsDataArray.push(aStud);
                          });

                         ReactDOM.unmountComponentAtNode(bodyContainer); //Used to reset the states of the check buttons.
                         ReactDOM.render(<StudentTutorViewDiv populatingFor="Students" roleData={studentsDataArray} rAuthData={studStatusDataArray} />, bodyContainer);
                       });
             break;
        case "Admins":  var authorizationsArray = new Array();
                        firebase.database().ref('/ulearnData/userData/Admins/').once('value').then(function(theList){
                          Object.entries(theList.val().applications).forEach(authoriStatus => {
                             authorizationsArray.push(authoriStatus);
                          });

                          var getKeys = Object.keys(theList.val());
                          var adminAuthenStatusArray = new Array();
                          Object.values(theList.val()).forEach((aState, count) => {
                             if(getKeys[count] != USERNAME && getKeys[count] != "applications") adminAuthenStatusArray.push(aState);
                          });

                          ReactDOM.render(<AdminViewDiv authoriApplyData={authorizationsArray} adminAuthenStatus={adminAuthenStatusArray} />, bodyContainer);
                        });
             break;
      }
      controlMainNavRef(clicked.innerHTML);
  }else{
     ReactDOM.render(<h2> Unauthorised Admin </h2>, bodyContainer);
  }

  const maxImgWidth = 800;
  var imgWidth = document.querySelector('html').clientWidth;
  if(imgWidth < maxImgWidth){
      document.getElementById('navbarNav').setAttribute('class', 'collapse navbar-collapse bg-dark'); //Used to close nav bar after clicking (for small scrrens).
  }
}

function controlMainNavRef(drawerMenuItem){
    if(drawerMenuItem == "Content") mainNavRef.style.display = 'block';
    else if(drawerMenuItem != "Content") mainNavRef.style.display = 'none';
}