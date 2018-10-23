{
  
 var Auth_form_button = document.getElementById('auth_form');
 console.log('auth is', Auth_form_button);

        Auth_form_button.addEventListener('submit', signInEmail);

        function signInEmail(e) {
            e.preventDefault();
            var email = document.getElementById('inputEmail3').value;
            var pass = document.getElementById('inputPassword3').value;
            console.log(` email is ${email} and password is ${pass}`);

            firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });



        }

        
       

        firebase.auth().onAuthStateChanged(function(user) {
             var signInButton = document.getElementById('sign_in_email');
            var button_sign_out = document.getElementById('sign_out');
            if (user) {
                console.log(user);
               
                signInButton.style.display = 'none';
                button_sign_out.style.display = 'block';
                var email = user.email;
                
                window.location.href = "/abcdefgparticipantlist.html";
                
            } else {
                console.log('no user')
                signInButton.style.display = 'block';
                button_sign_out.style.display = 'none';

            }
        });


var button_sign_out = document.getElementById('sign_out');
        button_sign_out.addEventListener('click', signOut);

        function signOut() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
            });
        }
    
    
    
    
}