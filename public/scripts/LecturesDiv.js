'use strict';

class LecturesDiv extends React.Component {
   constructor(props) {
    super(props);
    this.headerValue = "Added courses";
    //this.lecDivRef = React.createRef();
  }

  checkRole(){
        var createB;
        if(USERROLE == "Tutor"){
           this.headerValue = "My courses";
           createB = <div>
                      <button className="btn btn-outline-primary d-flex align-self-end" 
                              onClick={(u) => ReactDOM.render(<LectureBuildDiv existingCourses={this.props.myCourseValueData}/>, bodyContainer)}>
                          Create lecture
                      </button>
                    </div>
        }
        return createB;
  }

  displaySuggestions(){
     var suggestionsToDisplay;
     if(USERROLE == "Student" && this.props.suggestionsData != null){
       suggestionsToDisplay =  <div>
                                <br/><hr/>
                                <BodyContent id = "suggestions" 
                                            header = "Suggestions"
                                            itemValues = {this.props.suggestionsData}
                                            forWho = "others"/>
                               </div>
     }
     return suggestionsToDisplay;
   }

   render() {
     return(
      <div>

      {this.checkRole()}

       <BodyContent 
                    id = {"mycourses"} 
                    header = {this.headerValue}
                    itemValues = {this.props.myCourseValueData}
                    forWho = "others"/>
       
      {this.displaySuggestions()}

     </div>
     );
   }
}