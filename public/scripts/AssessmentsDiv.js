'use strict';

class AssessmentsDiv extends React.Component {
   constructor(props) {
    super(props);
    this.state = {clickedCard : "NULL"}
    this.headerValue = "Assessments"//"Added / just assessments";
   }

   render() {
     return (
       <BodyContent 
                    id = {"myassessments"} 
                    header = {this.headerValue}
                    itemValues = {this.props.groupedssment}/>
     );
   }
}