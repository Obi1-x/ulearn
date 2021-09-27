var uiConfig;
var FB;

function UIconfig(){
    uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      //document.getElementById('loader').style.display = 'none';
      //document.getElementById('homepageView').style.display = 'none'; Hide the homepage is relevant.
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  //signInSuccessUrl: 'dev_dashboard.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
}
}


 function signingOut(e){
   //e.preventDefault();
	 //e.stopPropagation();
	 //console.log(e);
     console.log("Signing out");
	 firebase.auth().signOut();

     document.getElementById('homepageView').style.display = 'none';
     document.getElementById('firebaseui-auth-container').style.display = 'block';
     document.getElementById('load').style.display = 'block';
}


document.addEventListener('DOMContentLoaded', function() {
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
         UIconfig();
         firebase.auth().onAuthStateChanged(user => {
          if(user){     //Signed in.
             FB = firebase; 
             //window.location.pathname = 'dev_dashboard.html'; 
             document.getElementById('homepageView').style.display = 'block';
             document.getElementById('firebaseui-auth-container').style.display = 'none';
             document.getElementById('load').style.display = 'none';
          }else if(!user){    //Not Signed in.
             document.getElementById('homepageView').style.display = 'none';
			 var ui = new firebaseui.auth.AuthUI(firebase.auth());  // Initialize the FirebaseUI Widget using Firebase.
			 ui.start('#firebaseui-auth-container', uiConfig);     // The start method will wait until the DOM is loaded.
          }
          console.log(user);
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

        const loadEl = document.querySelector('#load');
        try {
          let app = firebase.app();
          let features = [
            'auth', 
            'database', 
            'firestore',
            'functions',
            'messaging', 
            'storage', 
            'analytics', 
            'remoteConfig',
            'performance',
          ].filter(feature => typeof app[feature] === 'function');
          loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
        } catch (e) {
          console.error(e);
          loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
        }
      });


      /*
      e,g entry point
      function arrangeScreen(){

      }

      arrangeScreen();
      */