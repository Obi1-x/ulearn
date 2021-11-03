'use strict';

class BodyContent extends React.Component{
   doIteration(){
     var retrievedCourses = this.props.itemValues.map((itm) => <CardColumn key = {itm.courseTitle + "_" + itm.creator}
                                                                           cardImage = {itm.courseImageUrl}
                                                                           cardTitle = {itm.courseTitle}
                                                                           cardText = {itm.courseDescription}
                                                                           cardSmallDetail = {itm.lectureCount}
                                                                           dataCollection = {itm} 
                                                                           displayFor = {this.props.id}/>); //Will be used when populating tutor data. 
     return retrievedCourses;
   }

   headerValue(someTrigger){
       var toReturn;
       if(someTrigger == 0) toReturn = "No content to show here";
       else if(someTrigger > 0) toReturn = this.props.header;
       return toReturn;
   }


   render() {
     var itemCount = this.props.itemValues;
     return (
       <div>
        <div id={this.props.id} className="container mg-8">
         <h4>{this.headerValue(itemCount.length)}</h4>
         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          
          {this.doIteration()}

         </div>
        </div>
       </div>
     );
   }
}