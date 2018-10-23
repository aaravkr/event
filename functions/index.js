
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//const SENDGRID_API_KEY = functions.config().sendgrid.key

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('');

exports.sendEmail = functions.database.ref('/participant/{participantID}').onCreate( (event)  => {
    
    const email = event.data.val().email;
    const name = event.data.val().name;
    const msg = {
        to:    email,
        from: 'events@cyberpeace.net',
        subject: 'Thank you for subscribing',
        
        templateId: 'd-00217c94994b4a15a2140db8c340f45f',
        substitutionWrappers: [ '{{',  '}}'],
        substitutions:{
            name: name
        }
    };
      return sgMail.send(msg);
    
});