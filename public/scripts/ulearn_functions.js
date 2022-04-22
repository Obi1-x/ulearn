'use strict';

const bodyContainer = document.querySelector('#body_main_child');
var renderedBodyContainer;
var previousClick, studentCourseList, numOfCourses;
var coursesValuesArray, MyCoursesArray, CourseListArray, RequiredAssements, RequiredAssementsKeys;


class DashboardDiv extends React.Component {
   render() {
     return (<h1>DASHBOARD</h1>);
   }
}
//========================================================================End inner component classes


class CourseInfo{
  constructor(title, decrip){
	this.courseTitle = title;
    this.courseDescription = decrip;
    this.courseImageUrl = "nullImage";
    this.courseVisibility = "enabled";
    this.creator = USERNAME;
    this.lectureCount = "empty";
    this.created = new Date().getTime(); 
    this.indexWithCreated = 0 - this.created;
	}
}

class LectureInfo{
   constructor(topic, l_decrip, couref, indexLecture){
	this.lectureTopic = topic;
    this.lectureDescription = l_decrip;
    this.lecContentText = "empty";
    this.lectureMediaFileUrl = "nullFile";
    this.courseRef = couref;
    this.created = new Date().getTime();
    this.lectureIndex = "unindexed";
   }
}

class Assessment{
   constructor(asseTitle, asseDesc){
     this.creator = USERNAME;
     this.assessmentTitle = asseTitle;
     this.assessmentDescription = asseDesc;
     //this.creationPoint = "null";
     this.courseRefs = "null";
     this.assessmentLink = "null";
     //this.interations;
     this.visibilityStatus = "enabled";
   }
}


function NavSelections(clicked){
  if(previousClick) previousClick.className = 'nav-link';
  clicked.className = 'nav-link active';
  previousClick = clicked;

  if(authorizationObject.getStatus() == "enabled"){
      switch(clicked.innerHTML){
        case "All courses": if(USERROLE == "Student") {//Get courseList
                        firebase.database().ref('/ulearnData/userData/Students/' + USERNAME + '/courseList/').once('value').then(function(stuCouList){
                          studentCourseList = stuCouList.val();
                        });
                     }

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
                                 if(cData.val().courseVisibility == "enabled")coursesValuesArray.push(cData.val());
                                 else if(cData.val().courseVisibility == "disabled") numOfCourses--;

                                 if(coursesValuesArray.length == numOfCourses) renderedBodyContainer = ReactDOM.render(<HomeDiv courseValueData={coursesValuesArray} />, bodyContainer); 
                             });
                         });

                     firebase.database().ref('/ulearnData/appData/courses/').off('child_added')  //remove listener from path();
             break;
        case "Dashboard": ReactDOM.render(<DashboardDiv/>, bodyContainer); //TODO close nav drawer after selection
             break;
        case "Course list": var courseListArray = new Array(); 
                            coursesValuesArray.forEach(couItm => {
                              if(hasAdded(couItm.courseTitle + "_" + couItm.creator)){
                                 courseListArray.push(couItm);
                              }
                            });
                            CourseListArray = courseListArray;
                            ReactDOM.render(<LecturesDiv myCourseValueData={courseListArray} />, bodyContainer);
             break;
        case "My courses": MyCoursesArray = findMyCourses();
                           ReactDOM.render(<LecturesDiv myCourseValueData={MyCoursesArray} />, bodyContainer); 
             break;
        case "Assessments": var assessmentArray = new Array();
                            var whichRef = "/ulearnData/userData/Students/" + USERNAME + "/assessmentInteractions/"; //DEFAULT
                            if(USERROLE == "Tutor") whichRef = '/ulearnData/appData/assessments/' + USERNAME + '/';

                            firebase.database().ref(whichRef).once('value').then(function(allAssessments){
                               if(allAssessments.val() != null){
                                    Object.values(allAssessments.val()).forEach(assesParent => { //Noticed an error here.
                                     if(USERROLE == "Tutor"){
                                        Object.values(assesParent).forEach(asses => {
                                         if(asses.visibilityStatus == "enabled") assessmentArray.push(asses); //blocks disabled contents
                                        });
                                     }else if(assesParent.visibilityStatus == "enabled") assessmentArray.push(assesParent);
                                    });
                               RequiredAssements = assessmentArray;
                               RequiredAssementsKeys = Object.keys(allAssessments.val());
                               }
                               ReactDOM.render(<AssessmentsDiv groupedssment={assessmentArray} miscData={RequiredAssementsKeys} />, bodyContainer); 
                            });
             break;
        case "Settings": ReactDOM.render(<SettingsDiv/>, bodyContainer);
             break;
      }
  }else if(authorizationObject.getStatus() == "disabled") ReactDOM.render(<h2> Access restricted </h2>, bodyContainer);

  const maxImgWidth = 800;
  var imgWidth = document.querySelector('html').clientWidth;
  if(imgWidth < maxImgWidth){
      document.getElementById('navbarNav').setAttribute('class', 'collapse navbar-collapse bg-dark'); //Used to close nav bar after clicking (for small scrrens).
  }
}


function hasAdded(courseIdentifier){
     var added = false;
     if(studentCourseList){
         Object.keys(studentCourseList).forEach(valu => {
          if(valu == courseIdentifier) added = true;
         });
     }
     return added;
}


function findMyCourses(){
    var myCoursesArray = new Array();
    coursesValuesArray.forEach(mycou => {
                        if(mycou.creator == USERNAME) myCoursesArray.push(mycou); //also do this filtering in database query.
                        });
    return myCoursesArray;
}