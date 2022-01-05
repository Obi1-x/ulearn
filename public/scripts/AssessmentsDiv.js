'use strict';

class AssessmentsDiv extends React.Component {
   constructor(props) {
    super(props);
    this.headerValue = "Assessments"//"Added / just assessments";
   }

   render() {
     return (
       <BodyContent 
                    id = {"myassessments"} 
                    header = {this.headerValue}
                    itemValues = {this.props.groupedssment}
                    forWho = "assessment"
                    miscellanous = {this.props.miscData}/>
     );
   }
}