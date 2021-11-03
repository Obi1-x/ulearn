'use strict';

const bodyContainer = document.querySelector('#body_main_child');
var previousClick, studentCourseList, numOfCourses;
var coursesValuesArray;


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
   }
}


function NavSelections(clicked){
  if(previousClick) previousClick.className = 'nav-link';
  clicked.className = 'nav-link active';
  previousClick = clicked;

  switch(clicked.innerHTML){
        case "Home": if(USERROLE == "Student") {//Get courseList
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
                                 coursesValuesArray.push(cData.val());
                                 if(coursesValuesArray.length == numOfCourses) ReactDOM.render(<HomeDiv courseValueData={coursesValuesArray} />, bodyContainer); 
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
                            ReactDOM.render(<LecturesDiv myCourseValueData={courseListArray} />, bodyContainer);
             break;
        case "My courses": ReactDOM.render(<LecturesDiv myCourseValueData={findMyCourses()} />, bodyContainer); 
             break;
        case "Assessments": var assessmentArray = new Array();
                            firebase.database().ref('/ulearnData/appData/assessments/').once('value').then(function(allAssessments){
                               Object.values(allAssessments.val()).forEach(asses => {
                                  if(USERROLE == "Tutor"){
                                     if(asses.creator == USERNAME) assessmentArray.push(asses);
                                  }//else if(student)
                               });
                            });
                            ReactDOM.render(<AssessmentsDiv groupedssment={assessmentArray} />, bodyContainer); 
             break;
  }

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