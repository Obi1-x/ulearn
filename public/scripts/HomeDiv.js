'use strict';

class HomeDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  contents: ["a","b","c","d","e","f"]
                 };
  }

  render() {
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
                   forWho = "others"/>

      <BodyContent 
                   id={"library"} 
                   header={"Library"}
                   itemValues = {this.props.courseValueData}
                   forWho = "libs"/>*/}
     </div>
    );
  }
}