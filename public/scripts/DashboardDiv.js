'use strict';

function CallDashboardDiv(){
 return <DashboardDiv/>
}


class DashboardDiv extends React.Component {

componentDidMount(){
var lineYValues = [3,5,2,7,0,5,8];
document.getElementById("dashChart").setAttribute("style", "width:100%;max-width:700px");
document.getElementById("pieChart").setAttribute("style", "width:100%;max-width:400px");

var theLine = new Chart("dashChart", {
  type: "line",
  data: {
    labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    datasets: [{
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff',
      data: lineYValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Learning materials deployed"
    }
  }
  });

  //console.log(theLine);

  var xValues = ["Students taught", "Total students"];
  var yValues = [20, 10];
  var barColors = ["green", "yellow"];
  var thePie = new Chart("pieChart", {
                                      type: "doughnut",
                                      data: {
                                             labels: xValues,
                                             datasets: [{
                                                         backgroundColor: barColors,
                                                         data: yValues
                                                       }]
                                             }
                                     });
   }   


   render() {
     return (
     <div>
      <h4>Dashboard</h4>
      <small className="text-muted ms-2"> Your recent activities. </small>
      <hr/>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-1 row-cols-lg-3 row-cols-xl-3">

       <div className="col">
        <div className="card shadow-sm">
         <div className="row g-0">  
          <div className="col-md-4">
           <svg className="bd-placeholder-img"
                width="100%" 
                height="120"
                role="img" 
                aria-label="Placeholder: Image" 
                preserveAspectRatio="xMidYMid slice" 
                focusable="false">
            <title>Course</title>
            <rect width="100%" height="100%" fill="#092063"></rect> 
            <text x="40%" y="50%" fontSize="45" fill="#dee2e6" dy=".3em">C</text>
           </svg>
          </div>
          <div className="col-md-8">
           <div className="card-body">
            <h3 className="card-title display-6">4</h3>
            <p className="card-text">Total courses created</p>
           </div>
          </div> {/*col-md-8 end*/}
         </div> {/*row g-0 end*/}
        </div> {/*shadow-sm end*/}
       </div> {/*col end*/}


       <div className="col">
        <div className="card shadow-sm">
         <div className="row g-0">  
          <div className="col-md-4">
           <svg className="bd-placeholder-img"
                width="100%" 
                height="120"
                xmlns="http://www.w3.org/2000/svg"
                role="img" 
                aria-label="Placeholder: Image" 
                preserveAspectRatio="xMidYMid slice" 
                focusable="false">
            <title>Course</title>
            <rect width="100%" height="100%" fill="#057822"></rect>
            <text x="40%" y="50%" fontSize="45" fill="#dee2e6" dy=".3em">L</text>
           </svg>
          </div>
          <div className="col-md-8">
           <div className="card-body">
            <h3 className="card-title display-6">12</h3>
            <p className="card-text">Total lectures created</p>
           </div>
          </div> {/*col-md-8 end*/}
         </div> {/*row g-0 end*/}
        </div> {/*shadow-sm end*/}
       </div> {/*col end*/}


       <div className="col">
        <div className="card shadow-sm">
         <div className="row g-0">  
          <div className="col-md-4">
           <svg className="bd-placeholder-img"
                width="100%" 
                height="120"
                xmlns="http://www.w3.org/2000/svg"
                role="img" 
                aria-label="Placeholder: Image" 
                preserveAspectRatio="xMidYMid slice" 
                focusable="false">
            <title>Course</title>
            <rect width="100%" height="100%" fill="#ba910b"></rect>
            <text x="40%" y="50%" fontSize="45" fill="#dee2e6" dy=".3em">A</text>
           </svg>
          </div>
          <div className="col-md-8">
           <div className="card-body">
            <h3 className="card-title display-6">2</h3>
            <p className="card-text">Total assessments created</p>
           </div>
          </div> {/*col-md-8 end*/}
         </div> {/*row g-0 end*/}
        </div> {/*shadow-sm end*/}
       </div> {/*col end*/}


      </div> {/*row end*/}

      <br/>

      <div className="d-flex flex-row my-4">
       <canvas className="border border-secondary rounded-3" id="dashChart" width="517" height="218"></canvas>
       <canvas id="pieChart" width="450" height="200"></canvas>
      </div>

     </div>
     );
   }
}