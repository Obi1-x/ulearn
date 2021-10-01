const SET_IN = "SET_LOGIN_LISTENER";
const SET_OUT = "SET_LOGOUT_LISTENER";
const CLEAR = "CLEAR_LOGIN_LISTENER";

var reusableButton, navDrawerRef, mainNavRef;
var isnavDrawerOpened = true;


document.addEventListener('DOMContentLoaded', function() {
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
         mainNavRef = document.getElementById('mainNav');
         console.log(mainNavRef);
         navDrawerRef = document.getElementById('navDrawer');
         firebase.auth().onAuthStateChanged(user => {
          if(user){     //Signed in.  Load Logged in page
             if(!isnavDrawerOpened){
                  navDrawerRef.style.display = 'block';
                  mainNavRef.style.display = 'block';
                  isnavDrawerOpened = true;
             }

             reusableButton = document.getElementById('goingIn');
             setLoginListerners(SET_OUT, reusableButton);
             reusableButton.innerHTML = "Sign out";
             reusableButton.setAttribute('class', 'btn bg-danger text-light');
             setLoginListerners(CLEAR, document.getElementById('body_main_child'), null);
             //alert("Welcome!");
          }else if(!user){    //Not Signed in.
             if(isnavDrawerOpened){
                  navDrawerRef.style.display = 'none';
                  mainNavRef.style.display = 'none';
                  isnavDrawerOpened = false;
             }
             reusableButton = document.getElementById('goingIn');
             setLoginListerners(SET_IN, reusableButton);
             reusableButton.innerHTML = "Sign in";
             reusableButton.setAttribute('class', 'btn btn-primary');
             setLoginListerners(SET_IN, document.getElementById('body_main_child'));
          }
         });

        // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
        // firebase.firestore().doc('/foo/bar').get().then(() => { });
        // firebase.functions().httpsCallable('yourFunction')().then(() => { });
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
       loginElement.addEventListener('click', function(e){signingIn();});
    }else if(action == SET_OUT){
       loginElement.addEventListener('click', function(a){signingOut(a);});
    }else if(action == CLEAR){
            loginElement.removeEventListener('click', function(c){});
    }
}

function signingIn(){
    window.location.pathname = './login.html'; //Redirect to login page.
}

function signingOut(et){
   et.preventDefault();
   et.stopPropagation();
   console.log("Signing out");
   firebase.auth().signOut();
   alert("See you soon!");
}
