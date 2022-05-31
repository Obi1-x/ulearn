'use strict';

function CallContentDiv(contentProp1, contentProp2){
 return <ContentDiv courseValueData={contentProp1} quizesValueData={contentProp2}/>
}

class ContentDiv extends React.Component {
  constructor(props) {
    super(props);
    mainNavRef.style.display = 'block';
    this.state = {
                  contents: ["a","b","c","d","e","f"]
                 };
  }

  render() {
    return (
     <div>
      <ContentBodyDiv 
                   id={"courses"} 
                   header={"Courses"}
                   itemValues = {this.props.courseValueData}
                   forWho = "others"/>
      <br/>
      <hr/>
      <br/>
      
      <ContentBodyDiv 
                   id={"assessments"} 
                   header={"Assessments"}
                   itemValues = {this.props.quizesValueData}
                   forWho = "assessments"/>
     </div>
    );
  }
}

class ContentBodyDiv extends React.Component{
   doIteration(){
     var retrievedCourses;
     if(this.props.forWho == "others"){
        retrievedCourses = this.props.itemValues.map((itm) => <CardColumn key = {itm.courseTitle + "_" + itm.creator}
                                                                          cardImage = {itm.courseImageUrl}
                                                                          cardTitle = {itm.courseTitle}
                                                                          cardText = {itm.courseDescription}
                                                                          cardSmallDetail = {itm.lectureCount}
                                                                          dataCollection = {itm} 
                                                                          displayFor = {this.props.id}/>); //Will be used when populating tutor data. 
     }else if(this.props.forWho == "assessments"){
        retrievedCourses = this.props.itemValues.map((quiz, anIndex) => <CardColumnAssess key = {quiz[1].assessmentTitle + "_" + quiz[1].creator}
                                                                                          quizData = {quiz[1]}
                                                                                          forNodeKey = {quiz[0]}
                                                                                          />);
     }
     return retrievedCourses;
   }

   headerValue(someTrigger){
       var toReturn;
       if(someTrigger == 0) toReturn = "No content to show here";
       else if(someTrigger > 0) toReturn = this.props.header;
       return toReturn;
   }

   render() {
     var itemCount = this.props.itemValues; //Might remove;
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