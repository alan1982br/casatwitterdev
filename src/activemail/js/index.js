
$(document).ready(function() {
  
    $( "#email_verified" ).hide();
    $( "#recover_password" ).hide();
    $( "#try_again_password" ).hide();
    $( "#password_changed" ).hide(); 
    $( "#email_token_error" ).hide();

    $('#send_newpassword').prop('disabled', true);

  
 
  console.log(mode,  " // " , actionCode , " // " , continueUrl," // " , lang);

 
 
  var config = {
    apiKey: "AIzaSyA-kJ6FsSMg3eak2EzCwqExbBVUWaz62S8",
    authDomain: "casatwitter-815ac.firebaseapp.com",
    databaseURL: "https://casatwitter-815ac-default-rtdb.firebaseio.com",
    projectId: "casatwitter-815ac",   
    messagingSenderId: "561846138709",   
  };

  
    app = firebase.initializeApp(config);
    auth = app.auth();

  // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      
      $( "#recover_password" ).show();
     
      handleResetPassword(auth, actionCode, continueUrl, lang);
      break;
 
    case 'verifyEmail':
      // Display email verification handler and UI.
      
      $( "#email_verified" ).show();
      handleVerifyEmail(auth, actionCode, continueUrl, lang);
      break;
    default:
    $( "#email_verified" ).hide();
    $( "#recover_password" ).hide();
    $( "#try_again_password" ).hide();
    $( "#password_changed" ).hide();
      // Error: invalid mode.
  }


  $(".floating-menu-button").click(function() {
    if ($(".floating-menu").hasClass("closed")) {
      $(".floating-menu").removeClass("closed");
      $("#openclose").attr("src", "img/close.png");
    } else {
      $(".floating-menu").addClass("closed");
      $("#openclose").attr("src", "img/open.png");
    }
  });

  $(".point-history-container").click(function() {
    if ($(".point-history").hasClass("open")) {
      $(".point-history").removeClass("open");
      $(".history-details").slideUp();
    } else {
      $(".point-history").addClass("open");
      $(".history-details").slideDown();
    }
  });

  $("input[type=password]")
    .keyup(function() {
      
  

      var pswd = $(this).val();
      //validate the length
      if (pswd.length < 8) {
        $("#length").show();
        validtotal = false;
      } else {
        $("#length").hide();
        validtotal = true;

      }
      //validate letter
      if (pswd.match(/[A-z]/)) {
        $("#letter")
          .removeClass("invalid")
          .addClass("valid");
          $("#letter").hide();
          validLetter =true;
      } else {
        $("#letter")
          .removeClass("valid")
          .addClass("invalid");
          $("#letter").show();
          validLetter =false;
      }
 
      //validate number
      if (pswd.match(/\d/)) {
        $("#number")
          .removeClass("invalid")
          .addClass("valid");
          $("#number").hide();
          validNumber =true;
      } else {
        $("#number")
          .removeClass("valid")
          .addClass("invalid");
          $("#number").show();
          validNumber =false;
      }
       //validate capital letter
      // if (pswd.match(/[A-Z]/)) {
      //   $("#capital")
      //     .removeClass("invalid")
      //     .addClass("valid");
      // } else {
      //   $("#capital")
      //     .removeClass("valid")
      //     .addClass("invalid");
      // }

      if(validNumber && validLetter && validtotal){
        $("#title_requirements").hide();
        $('#send_newpassword').prop('disabled', false);
        passworValid =true;
      }else{
        $("#title_requirements").show();
        $('#send_newpassword').prop('disabled', true);
        passworValid =false;
      }

    })
    .focus(function() {
      $("#pswd_info").show();
    })
    .blur(function() {
      $("#pswd_info").hide();
    });
    
});
  var validNumber =false;
  var validLetter =false;
  var validtotal =false;

  var passworValid =false;

  var app =  "";
  var auth = "";

  // TODO: Implement getParameterByName()

  // Get the action to complete.
  var mode = getParameterByName('mode');
  // Get the one-time code from the query parameter.
  var actionCode = getParameterByName('oobCode');
  // (Optional) Get the continue URL from the query parameter if available.
  var continueUrl = getParameterByName('continueUrl');
  // (Optional) Get the language code if available.
  var lang = getParameterByName('lang') || 'en';

  var accountEmail;

  function getParameterByName( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }



function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
 
  auth.applyActionCode(actionCode).then(function(resp) {
   

    console.log("Ok Email address has been verified !");
  }).catch(function(error) {
    
  //  alert("error " + error);
  });
};

function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  
  // Verify the password reset code is valid.
  console.log("actionCode " + actionCode)
  auth.verifyPasswordResetCode(actionCode).then(function(email) {
    var accountEmail = email;
     console.log(accountEmail);
    //  $( "#email_ver" ).text( accountEmail );
    // TODO: Show the reset screen with the user's email and ask the user for
    // the new password.
 
  }).catch(function(error) {
    console.log(" expired action code error " , error);
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
    $( "#try_again_password" ).show();
    $( "#insert_password" ).hide();
   
  });
};

// Save the new password.
$( "#send_newpassword" ).click(function() {
  
 if(passworValid){
   
  auth.confirmPasswordReset(actionCode, $( "#input_paswword" ).val()).then(function(resp) {
      // Password reset has been confirmed and new password updated.
      
      console.log("Password reset has been confirmed and new password updated == " + resp);
      $( "#recover_password" ).show();
      $( "#password_changed" ).show();
      $( "#insert_password" ).hide();
      // TODO: Display a link back to the app, or sign-in the user directly
      // if the page belongs to the same domain as the app:
      // auth.signInWithEmailAndPassword(accountEmail, newPassword);

      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch(function(error) {
      alert("Error occurred during confirmation cath error " , error);
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
    });
 }
 
  });
