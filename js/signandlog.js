$(document).ready(
    function() {
        var firebaseConfig = {
            apiKey: "AIzaSyChhUUuDOhvslN64ho_GIGPwDdARJmZUyA",
            authDomain: "project-2302780931325811267.firebaseapp.com",
            databaseURL: "https://project-2302780931325811267.firebaseio.com",
            projectId: "project-2302780931325811267",
            storageBucket: "project-2302780931325811267.appspot.com",
            messagingSenderId: "977640784095",
            appId: "1:977640784095:web:309ed120e1b5811c"
        };

        //Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        var dbRef = firebase.database().ref().child('object');
        const $email = $('#email');
        const $password = $('#password');
        const $loginbtn = $('#loginbtn');
        const $logoutbtn = $('#logoutbtn');
        const $signupbtn = $('#signupbtn');
        const $info = $('#info');
        const useremail = $('.useremail');
        //$info.html("");

        //sign up
        $signupbtn.click(function(e) {
            const email = $email.val();
            const pass = $password.val();
            const auth = firebase.auth();
            auth.createUserWithEmailAndPassword(email, pass)
                .catch(function(e) {
                    $info.html(e.message);
                })
        })

        //log in
        $loginbtn.click(function(e) {
            const email = $email.val();
            const pass = $password.val();
            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(email, pass)
                .then(function(e) { window.location.href = '/shoppingcar.html' })
                .catch(function(e) {
                    console.log(e.message);
                    $info.html(e.message);
                });
        });

        //listening login user
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user);
                $info.html(user.email + "is log in...");
                user.providerData.forEach(function(profile) {
                    console.log(" Sign-in provider:" + profile.providerId);
                    console.log(" Provider-specific UID:" + profile.uid);
                    console.log(" Name: " + profile.displayName);
                    console.log(" Email:" + profile.email);
                    useremail.html(user.email);
                });
            } else {
                console.log("not log in...");
            }
        });

        //sign out 
        $logoutbtn.click(function() {
            firebase.auth().signOut();
            $info.html('no one log in...');
            window.location.href = "/login.html";
        });


    });