'use strict';

class PrepImage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
                  imgIds: this.props.cTitle + "_imageForCard"
                 };
  }

  render(){
    var displayElement;
    if(this.props.iUrl == "nullImage"){
         displayElement = <svg className="bd-placeholder-img card-img-top" 
                               width="100%" height="180" 
                               xmlns="http://www.w3.org/2000/svg" 
                               role="img"
                               preserveAspectRatio="xMidYMid slice" 
                               focusable="false"
                               >
                           <title>Placeholder</title>
                           <rect width="100%" height="100%" fill="#868e96"></rect>
                           <text className="d-flex align-self-center" x="60%" y="60%" fill="#dee2e6" dy=".3em">{this.props.cTitle}</text>
                          </svg>
      }else displayElement = <img id={this.state.imgIds} className="img-thumbnail img-fluid" src={this.props.iUrl} alt="Card image" width="100%" height="50%"></img>
    return (displayElement);
  }
}

/*

<svg class="bd-placeholder-img figure-img img-fluid rounded" width="400" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 400x300" preserveAspectRatio="xMidYMid slice" focusable="false">
 <title>Placeholder</title>
 <rect width="100%" height="100%" fill="#868e96"></rect>
 <text x="50%" y="50%" fill="#dee2e6" dy=".3em">400x300</text>
</svg>

<svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
 <title>Placeholder</title>
 <rect width="100%" height="100%" fill="#868e96"></rect>
 <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
</svg>
*/