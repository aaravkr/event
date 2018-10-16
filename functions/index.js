const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
.document('users/{userId}')
.onCreate(event => {
    
    const userId = event.params.userId;
    
    const db = admin.firestore();
    
    return db.collection('users').doc(userId)
              .get()
              .then(doc => {
        const user = doc.data()
        
        const msg = {
            to: user.email,
            from: 'cpc.kolkata@cyberpeace.net',
            subject: 'New Follower',
            
            templateId: 'd-0be03444181141f78b2279a547a189f8',
            substitutionWrappers: [ '{{',  '}}'],
            substitutions:{
                name: 'aarav'
            }
        };
        
        return sgMail.send(msg);
    })
    .then(()=> console.log('email sent'))
    .catch(err => console.log(err))
})