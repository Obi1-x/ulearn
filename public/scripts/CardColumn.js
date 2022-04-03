'use strict';

class CardColumn extends React.Component{
   addcourseToList(clickarg){
    var courseListRef = '/ulearnData/userData/Students/' + USERNAME + '/courseList/' + this.props.dataCollection.courseTitle + "_" + this.props.dataCollection.creator;
    var courseInteractionRef = '/ulearnData/appData/courseInteractions/' + this.props.dataCollection.courseTitle + "_" + this.props.dataCollection.creator + '/' + USERNAME
    var time_Stamp = new Date().getTime();
    firebase.database().ref(courseListRef + '/').set(time_Stamp, (error)=>{
       if(!error){
          document.querySelector('#' + this.props.cardTitle + '_addBtn').disabled = true;
          console.log("Added to course list");
       }
    });
    firebase.database().ref(courseInteractionRef + '/').set(time_Stamp);
   }

   checkCreator(){
     var returnElement;
     if(this.props.dataCollection.creator == USERNAME){
           returnElement = <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
                            <small className=" ms-2 text-primary">Yours</small> {/*Use it to show the number of students who added the course to their course list*/}
                            <small className="text-muted">{this.props.cardSmallDetail + " lecture(s)"}</small>
                           </div>
     }else{
          if(USERROLE == "Student" && !hasAdded(this.props.dataCollection.courseTitle + "_" + this.props.dataCollection.creator)){ //and student has not previously added the course.
             returnElement = <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
                              <button id={this.props.cardTitle + "_addBtn"} onClick={(w) => this.addcourseToList(w)} className="btn btn-sm btn-outline-secondary">Add</button>
                              <small className="text-muted">{this.props.cardSmallDetail + " lecture(s)"}</small>
                             </div>
          }else if(USERROLE == "Tutor" || !(USERROLE == "Student" && !hasAdded(this.props.dataCollection.courseTitle + "_" + this.props.dataCollection.creator))){
             returnElement = <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
                              <button id={this.props.cardTitle + "_addBtn"} disabled="disabled" className="btn btn-sm btn-outline-secondary">Add</button>
                              <small className="text-muted">{this.props.cardSmallDetail + " lecture(s)"}</small>
                             </div>
          }else if(USERROLE == "Admin"){
             var showEnStatus = "";
             if(this.props.dataCollection.courseVisibility == "enabled") showEnStatus = <button id={this.props.cardTitle + "_addBtn"} disabled="disabled" className="btn btn-sm btn-outline-secondary">EN</button>
             returnElement = <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
                              {showEnStatus}
                              <small className="text-muted">{this.props.cardSmallDetail + " lecture(s)"}</small>
                             </div>
          }
     }
     return returnElement;
   }

   whatToRender(){
      if(USERROLE == "Admin") ReactDOM.render(<LectureControlDiv populateCourseWith={this.props.dataCollection}/>, bodyContainer);
      else ReactDOM.render(<LectureViewDiv populateCourseWith={this.props.dataCollection}/>, bodyContainer);
   }

   render() {
     return (
       <div className="col">
        <div className="card shadow-sm">
         <div onClick={(t) => this.whatToRender()}>  

     {/* <PrepImage iUrl={this.props.cardImage}
                    cTitle={this.props.cardTitle}/>*/}

          <div className="card-body">
           <h3 className="card-title display-6">{this.props.cardTitle}</h3>
           <p className="card-text">{this.props.cardText}</p>
          </div>
         </div>

         {this.checkCreator()}

        </div>
       </div>
     );
   }
}