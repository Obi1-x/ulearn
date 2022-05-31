'use strict';

function accessRestricted(){
    return <h2>Access restricted</h2>
}

function CallHomeDiv(homeProp1){
 return <HomeDiv courseValueData={homeProp1}/>
}

class HomeDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  contents: ["a","b","c","d","e","f"]
                 };
  }

  render() {
    var fakeLib = new Array();
    return (
     <div>
      <BodyContent 
                   id={"courses"} 
                   header={"Courses"}
                   itemValues = {this.props.courseValueData}
                   forWho = "others"/>
      <br/>
      <hr/>
      <br/>
      {/*
      <BodyContent 
                   id={"tutors"} 
                   header={"Tutors"}
                   itemValues = {this.props.courseValueData}
                   forWho = "others"/>*/}

      <BodyContent 
                   id={"library"} 
                   header={"Library"}
                   itemValues = {fakeLib}
                   forWho = "libs"/>
     </div>
    ); //Previous : forWho = "libs"
  }
}