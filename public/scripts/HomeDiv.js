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

      <button className="btn bg-light text-primary my-3"
              onClick={(cl) => window.location.pathname = './adminpage.html'}>To admin (TEST)</button>

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
                   forWho = "others"/> */}
     </div>
    );
  }
}