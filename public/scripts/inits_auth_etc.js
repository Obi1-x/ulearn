//This script handles functionality involved with authentication and authorization.

//import NavSelections from './ulearn_functions.js';

const SET_IN = "SET_LOGIN_LISTENER";
const SET_OUT = "SET_LOGOUT_LISTENER";
const CLEAR = "CLEAR_LOGIN_LISTENER";

var USERNAME, USERROLE;
var mainNavRef, footerNavRef, navDrawerRef, reusableButton, authorizationObject;


function adjustments(task){
   mainNavRef = document.getElementById('mainNav');
   footerNavRef = document.getElementById('footerNav');
   navDrawerRef = document.getElementById('navDrawer');
   reusableButton = document.getElementById('goingIn');

   if(!USERNAME){    //Not Signed in.
      navDrawerRef.style.display = 'none'; //Hide nav Drawer.
      mainNavRef.style.display = 'none'; //Hide header navigation.
      footerNavRef.style.display = 'none'; //Hide main navigation.
      reusableButton.innerHTML = "Sign in";
      reusableButton.setAttribute('class', 'btn btn-primary');
      setLoginListerners(CLEAR, reusableButton);

      /*
      if(task == "adjt"){
         setLoginListerners(SET_IN, reusableButton);
         setLoginListerners(SET_IN, document.getElementById('body_main_child'));
      }*/
    }
}

adjustments("init");


document.addEventListener('DOMContentLoaded', function() {
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
         firebase.auth().onAuthStateChanged(user => {
          //console.log(user);
          if(user){     //Signed in.  Load Logged in page
             USERNAME = user.displayName;

             navDrawerRef.style.display = 'block';
             mainNavRef.style.display = 'block';
             footerNavRef.style.display = 'block'; //Show main navigation.
             
             setLoginListerners(CLEAR, reusableButton);
             setLoginListerners(SET_OUT, reusableButton);
             reusableButton.innerHTML = "Sign out";
             reusableButton.setAttribute('class', 'btn bg-danger text-light');
             //setLoginListerners(CLEAR, document.getElementById('body_main_child'));

             tidyNavDrawer();
          }else if(!user){    //Not Signed in.
             USERNAME = null;
             adjustments("adjt");
          }
         });

        // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
        // firebase.firestore().doc('/foo/bar').get().then(() => { });
        // firebase.messaging().requestPermission().then(() => { });
        // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
        // firebase.analytics(); // call to activate
        // firebase.analytics().logEvent('tutorial_completed');
        // firebase.performance(); // call to activate
        //
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
});

function setLoginListerners(action, loginElement){
    if(action == SET_IN){
       loginElement.addEventListener('click', function(e){signingIn("ALL");});
    }else if(action == SET_OUT){
       loginElement.addEventListener('click', function(a){signingOut(a);});
    }else if(action == CLEAR){
            loginElement.removeEventListener('click', function(c){console.log(c);});
    }
}

function signingIn(asin){
    localStorage.setItem("authUIFor", asin);
    window.location.pathname = './login.html'; //Redirect to login page.
}

function signingOut(et){
   et.preventDefault();
   et.stopPropagation();
   console.log("Signing out");
   firebase.database().ref('/ulearnData/userData/' + USERROLE + 's/' + USERNAME + '/profileDetails/profilePicUrl/').off('value');
   firebase.database().ref('/ulearnData/userData/' + USERROLE + 's/' + USERNAME + '/status/').set("offline", async function(error){
       if(!error) firebase.auth().signOut();
       localStorage.setItem("FirstAuth", false);
       alert("See you soon!");  //FIND ANOTHER WAY TO INDICATE OFFLINE STATUS.
       window.location.pathname = './index.html';
   });
}

async function tidyNavDrawer(){
  //Image
  const maxImgWidth = 800;
  var imgWidth = document.querySelector('html').clientWidth;
  if(imgWidth < maxImgWidth){
      document.getElementById('prpic').style.width = '15%';
  }else document.getElementById('prpic').style.width = '50%';

  //Username and role.
  document.getElementById('nav_uname').innerHTML = USERNAME;
  await firebase.database().ref('/ulearnData/userData/roles/' + USERNAME + '/').once('value').then(function(userRole){
               USERROLE = userRole.val();
               document.getElementById('nav_role').innerHTML = USERROLE;
               firebase.database().ref('/ulearnData/userData/' + USERROLE + 's/' + USERNAME + '/status/').set("online");
			}); 
            
            
  firebase.database().ref('/ulearnData/userData/' + USERROLE + 's/' + USERNAME + '/profileDetails/profilePicUrl/').on('value', (theProImageUrl) => {
        var prpReference = document.getElementById("prpic");
        const returnedImage = theProImageUrl.val();
        if(returnedImage) prpReference.src = returnedImage;
  });

  if(USERROLE == "Tutor"){ //My Courses
        document.querySelector('#navDrawer').setAttribute('class', 'bg-dark sticky-top');
        document.querySelector('#navbarNav').setAttribute('class', 'collapse navbar-collapse bg-dark text-light');

        const navList = document.querySelector('#navbarNavChild')
        navList.setAttribute('class', 'navbar-nav nav-pills flex-column  mb-auto bg-dark');
        navList.children[4].children[0].innerHTML = "My courses";
  }else if(USERROLE == "Admin"){
           if(window.location.pathname != '/adminpage.html') window.location.pathname = './adminpage.html'; //Ensures an admin is redirected to the admin UI.
           else if(window.location.pathname == "/adminpage.html"){
                  document.querySelector('#navDrawer').setAttribute('class', 'bg-info sticky-top');
                  document.querySelector('#navbarNav').setAttribute('class', 'collapse navbar-collapse bg-info text-light');

                  const navList = document.querySelector('#navbarNavChild')
                  navList.setAttribute('class', 'navbar-nav nav-pills flex-column  mb-auto bg-info');

                  await firebase.database().ref('/ulearnData/appData/currators/' + USERNAME + '/').once('value').then(async function(aUid){
                      if(firebase.auth().currentUser.uid != aUid.val()) { //if the user is not the super admin.
                            navList.children[5].style.display = 'none'; 
                            //Check if the user has been approved;
                            await firebase.database().ref('/ulearnData/userData/Admins/applications/' + USERNAME + '/').once('value').then(function(returningStatus){
                                const theStatus = returningStatus.val();
                                authorizationObject = new AuthorizationData(theStatus.statusDate, theStatus.authorizationStatus);
                            });
                      }else{
                          authorizationObject = new AuthorizationData("nill", "enabled");
                      }
                  });
                  adminNavSelections(document.getElementById('defaultClick'));
           }
  }

  if(USERROLE != "Admin"){
       await firebase.database().ref('/ulearnData/userData/' + USERROLE + 's/applications/' + USERNAME + '/authorizationStatus/').once('value').then(function(returningStatus){
          authorizationObject = new AuthorizationData("epoch", returningStatus.val());
          NavSelections(document.getElementById('defaultClick')); //Handle Logged out case.
       });
  }
  document.body.hidden = false;
}


class AuthorizationData{ //Convert to a singleton.
    #authorization_Status;
    authorizationTimestamp;

    constructor(authori_Timestamp, authori_Status){
        this.authorizationTimestamp = authori_Timestamp;
        this.#authorization_Status = authori_Status;
    }
    
    getStatus(){
        return this.#authorization_Status;
    }

    getStatusDate(){
        return this.authorizationTimestamp;
    }
}