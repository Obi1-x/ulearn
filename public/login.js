var uiConfig;
var user_name, selectedRole;

var authUI = document.getElementById('authenticate');
var roleUI = document.getElementById('roleSelect');
var roleHeader = document.getElementById('roleheader');
var roleContainer = document.getElementById('roleS1');
var submitRoleBtn = document.getElementById('submitRole');

firstFunction(user_name);

function UIconfig(){
    uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: async function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      var firstSign = await authResult.additionalUserInfo.isNewUser
      console.log("firstSign: " + firstSign);
      if(firstSign){
         toRoleSelect();
      }else if(!firstSign){
          updateStatus(); //window.location.pathname = './index.html';
      }

      //alert("Welcome to ULearn! Please choose a role.");
      return true;
    },
    uiShown: function() {
    console.log("Sign in");
      // The widget is rendered before signing in.
      //Hidden individually to for it to work as hiding the parent element didnt work.
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  //signInSuccessUrl: false,
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

function firstFunction(username){
    selectedRole = "Student";
    if(username == null){
       roleHeader.style.display = 'none';
       roleContainer.style.display = 'none';
       submitRoleBtn.style.display = 'none';
       roleUI.style.display = 'none';
    }else{
       roleUI.style.display = 'block';
       submitRoleBtn.style.display = 'block';
       roleContainer.style.display = 'block';
       roleHeader.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', function() {
	UIconfig();

    firebase.auth().onAuthStateChanged(async (user) => {
        if(user){
           firebase.database().ref('/ulearnData/userData/' + USERROLE + 's/' + USERNAME + 'status/').set("offline");
           user_name = await user.displayName;
           console.log(user_name);
           
           //toRoleSelect();
        }else if(!user){     //Signed in.  Load Logged in page
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    });


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
          loadEl.textContent = 'Error loading Firebase, check the console.';
        }
});


function simuClick(reference){
    var studentCard = document.getElementById('studentcard');
    var tutorCard = document.getElementById('tutorcard');

    reference.setAttribute('class', 'card mx-2 border-primary');
    reference.children[1].setAttribute('class', 'card-title align-self-center text-primary');

    if(reference == studentcard){
        selectedRole = "Student";
        console.log(selectedRole);
        tutorCard.setAttribute('class', 'card mx-2');
        tutorCard.children[1].setAttribute('class', 'card-title align-self-center text-dark');
    }else if(reference == tutorCard){
        selectedRole = "Tutor";
        console.log(selectedRole);
        studentCard.setAttribute('class', 'card mx-2');
        studentCard.children[1].setAttribute('class', 'card-title align-self-center text-dark');
    }
}

function toRoleSelect(){
  firstFunction(user_name);
  authUI.style.display = 'none';

  submitRoleBtn.addEventListener('click', async(e)=>{
        var newBucket = 
        {
          "status" : "Online"
        }
        console.log(newBucket);
        await firebase.database().ref('/ulearnData/userData/' + selectedRole + 's/' + user_name + '/').set(newBucket);
        await firebase.database().ref('/ulearnData/userData/roles/' + user_name + '/').set(selectedRole);
         
         alert("Welcome to ULearn");
         updateStatus();
   });
}

function updateStatus(){
      firebase.database().ref('/ulearnData/userData/' + USERROLE + 's/' + USERNAME + 'status/').set("online", (error) => {
        if(!error) window.location.pathname = './index.html';
      });
}
