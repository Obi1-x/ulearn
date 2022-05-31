var uiConfig;
var user_name, selectedRole;

var authUI = document.getElementById('authenticate');
var roleUI = document.getElementById('roleSelect');
var roleHeader = document.getElementById('roleheader');
var roleContainer = document.getElementById('roleS1');
var inputVeriContainer = document.getElementById('userInputVeri');
var submitRoleBtn = document.getElementById('submitRole');
var orLabel = document.getElementById('ordis');
var adminApplyBtn = document.getElementById('adminApply');

const whoToAuth = localStorage.getItem("authUIFor");


function firstFunction(userName){
    selectedRole = whoToAuth;
    if(userName == null){
       adminApplyBtn.style.display = 'none';
       submitRoleBtn.style.display = 'none';
       roleUI.style.display = 'none';
       inputVeriContainer.style.display = 'none';
       orLabel.style.display = 'none';
    }else{
       roleUI.style.display = 'block';
       adminApplyBtn.style.display = 'block';
       submitRoleBtn.style.display = 'block';
       inputVeriContainer.style.display = 'block';
       orLabel.style.display = 'block';
    }
}

function quickMod(){
  console.log(whoToAuth);
  var identityHeader = document.getElementById('identity_header');
  var authHeading = document.getElementById('auth_guide_header');
  var userVerificationInput = document.getElementById('verification-id-input');
  switch(whoToAuth){
        case "Student": identityHeader.setAttribute('class', 'container-fluid nav nav-pills bg-success');
                        identityHeader.children[0].src = "./images/student.png";
                        authHeading.innerHTML += " student.";
                        userVerificationInput.labels[0].innerHTML = "Matric no:";
                        document.getElementById("adminApply").disabled = true;
        break;

        case "Tutor": identityHeader.setAttribute('class', 'container-fluid nav nav-pills bg-dark');
                      identityHeader.children[0].src = "./images/lecturer.png";
                      identityHeader.children[0].width = "50";
                      authHeading.innerHTML += " tutor.";
                      userVerificationInput.labels[0].innerHTML = "Staff ID:";
                      document.getElementById("adminApply").disabled = true;
        break;

        case "Admin": identityHeader.setAttribute('class', 'container-fluid nav nav-pills bg-info');
                      identityHeader.children[0].src = "./images/myAdmin.jpg";
                      authHeading.innerHTML += " administrator.";
                      userVerificationInput.disabled = true;
                      submitRoleBtn.disabled = true;
        break;
  }
}

quickMod();
firstFunction(user_name);

document.addEventListener('DOMContentLoaded', function() {
	UIconfig();

    firebase.auth().onAuthStateChanged(async (user) => {
        if(user){
           user_name = await user.displayName;
           console.log(user_name);

        }else if(!user){     //Signed in.  Load Logged in page
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', uiConfig);
            var toChangeHeading = ui.fd.children[0].firstChild;
            toChangeHeading.firstChild.firstChild.innerHTML = "Register / Login with email";
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
      localStorage.removeItem("authUIFor");
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
    firebase.auth.EmailAuthProvider.PROVIDER_ID
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


function toRoleSelect(){ //upload the matric no or staff Id
  var userVeriInputAgain = document.getElementById('verification-id-input');
  firstFunction(user_name);
  authUI.style.display = 'none';

  submitRoleBtn.addEventListener('click', async(e) => {
     console.log(selectedRole);
     if(selectedRole != null && userVeriInputAgain.value){

        firebase.database().ref('/ulearnData/userData/' + selectedRole + 's/applications/' + user_name + '/authorizationStatus/').set("disabled", (failedApplyi) => {
            if(failedApplyi) console.log("error at " +selectedRole+ " application");
        }); //disabled by default.

        var profileKey = "matricNo";
        if(selectedRole == "Tutor") profileKey = "staffId";
        await firebase.database().ref('/ulearnData/userData/' + selectedRole + 's/' + user_name + '/profileDetails/' + profileKey + '/').set(userVeriInputAgain.value);

        await firebase.database().ref('/ulearnData/userData/roles/' + user_name + '/').set(selectedRole, (failedRole) => {
             if(failedRole) console.log("error at role assignment")
             else if(!failedRole){
                     alert("Welcome to ULearn");
                     localStorage.setItem("FirstAuth", true);
                     window.location.pathname = './index.html';
             }
            });
     }else if(!userVeriInputAgain.value){
          userVeriInputAgain.setAttribute('class', 'form-control is-invalid');
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

function clearErrors(theVeriInput){
  theVeriInput.setAttribute('class', 'form-control');
}