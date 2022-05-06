'use strict';

class PrepImage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
                  imgIds: this.props.cTitle + "_imageForCard"
                 };
  }

  /*
  componentDidMount(){
   var extractGradient = document.getElementById('grad1');
   
   var theGrad1 = document.createElement("stop");
   theGrad1.setAttribute('offset', "0%");
   theGrad1.setAttribute('style', "stop-color:rgb(255,255,0);stop-opacity:1");

   var theGrad2 = document.createElement("stop");
   theGrad2.setAttribute('offset', "100%");
   theGrad2.setAttribute('style', "stop-color:rgb(255,0,0);stop-opacity:1");

   extractGradient.appendChild(theGrad1);
   extractGradient.appendChild(theGrad2);


   var babyRect = document.getElementById('svgrect');
   babyRect.setAttribute('fill', "grad1");
  }*/


  generateName(realName){
    //var generatedN;
    var arrayBuff = Array.from(realName);
   // generatedN = arrayBuff[0];
   // return generatedN;
   return arrayBuff[0];
  }

  render(){
    var displayElement;
    if(!this.props.iUrl || this.props.iUrl == "nullImage"){
         displayElement = <svg className="bd-placeholder-img img-thumbnail" 
                               width="100%" height="180" 
                               xmlns="http://www.w3.org/2000/svg" 
                               role="img"
                               preserveAspectRatio="xMidYMid slice" 
                               focusable="false"
                               >
                           
                           <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            </linearGradient>
                           </defs>

                           <title>{this.props.cTitle}</title>
                           <rect id="svgrect" width="100%" height="100%" rx="20" ry="20" fill="#27676e"></rect>
                           <text className="d-flex align-self-center" x="40%" y="50%" fontSize="45" fontFamily="Verdana" fill="#dee2e6" dy=".3em">{this.generateName(this.props.cTitle)}</text>
                          </svg>
      }else displayElement = <img id={this.state.imgIds} className="img-thumbnail img-fluid" src={this.props.iUrl} alt="Card image" width="100%" height="50%"></img>
    return (displayElement);
  }
}