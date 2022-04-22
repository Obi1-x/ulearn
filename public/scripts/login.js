var uiConfig;
var user_name, selectedRole;

var authUI = document.getElementById('authenticate');
var roleUI = document.getElementById('roleSelect');
var roleHeader = document.getElementById('roleheader');
var roleContainer = document.getElementById('roleS1');
var adminApplyBtn = document.getElementById('adminApply');
var submitRoleBtn = document.getElementById('submitRole');

function firstFunction(userName){
    selectedRole = "Student";
    if(userName == null){
       roleHeader.style.display = 'none';
       roleContainer.style.display = 'none';
       adminApplyBtn.style.display = 'none';
       submitRoleBtn.style.display = 'none';
       roleUI.style.display = 'none';
    }else{
       roleUI.style.display = 'block';
       adminApplyBtn.style.display = 'block';
       submitRoleBtn.style.display = 'block';
       roleContainer.style.display = 'block';
       roleHeader.style.display = 'block';
    }
}

firstFunction(user_name);

document.addEventListener('DOMContentLoaded', function() {
	UIconfig();

    firebase.auth().onAuthStateChanged(async (user) => {
        if(user){
           user_name = await user.displayName;
           console.log(user_name);
           
           //toRoleSelect();
        }else if(!user){     //Signed in.  Load Logged in page
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    });


function UIconfig(){
  uiConfig = {
   callbacks: {
    signInSuccessWithAuthResult: async function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      var firstSign = await authResult.additionalUserInfo.isNewUser
      console.log("firstSign: ", firstSign);
      if(firstSign){
         toRoleSelect();
      }else if(!firstSign){
          toUISelect();
      }

      //alert("Welcome to ULearn! Please choose a role.");
      return false;
    },
    uiShown: function() {
    console.log("Sign in");
      // The widget is rendered before signing in.
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '',
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

  submitRoleBtn.addEventListener('click', (e) => {
     if(selectedRole != null) {
        firebase.database().ref('/ulearnData/userData/' + selectedRole + 's/applications/' + user_name + '/authorizationStatus/').set("enabled", (failedApplyi) => {
            if(failedApplyi) console.log("error at " +selectedRole+ " application");
        }); //enabled by default.

        firebase.database().ref('/ulearnData/userData/roles/' + user_name + '/').set(selectedRole, (failedRole) => {
             if(failedRole) console.log("error at role assignment")
             else if(!failedRole){
                     alert("Welcome to ULearn");
                     localStorage.setItem("FirstAuth", true);
                     window.location.pathname = './index.html';
             }
            });
      }
  });

  adminApplyBtn.addEventListener('click', (ad) => {
     selectedRole = "Admin";

     var adminApplication = {
                             "authorizationStatus" : "disabled",
                             "statusDate" : new Date().getTime()
                            } //disabled by default

     firebase.database().ref('/ulearnData/userData/roles/' + user_name + '/').set(selectedRole, (failedRoleAd) => {
             if(failedRoleAd) console.log("error at role assignment")
             else if(!failedRoleAd){
                  firebase.database().ref('/ulearnData/userData/' + selectedRole + 's/applications/' + user_name + '/').set(adminApplication, (applyFailed) => {
                    if(!applyFailed){
                        alert("You will be redirected to the admin page");
                        localStorage.setItem("FirstAuth", true);
                        window.location.pathname = './adminpage.html';
                    }else if(applyFailed) console.log("Admin application failed");
                  });
             }
            });
  });
}

async function toUISelect(){
    await firebase.database()
                  .ref('/ulearnData/userData/roles/' + user_name + '/')
                  .once('value')
                  .then(function(checkedRole){
                          localStorage.setItem("FirstAuth", true);
                          if(checkedRole.val() == "Admin") window.location.pathname = './adminpage.html';
                          else window.location.pathname = './index.html';
                        });
}
