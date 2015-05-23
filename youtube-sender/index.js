'use strict';

var config = require('config');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(config.clientId, config.clientSecret, config.redirectUrl);
var scopes = [
  'https://www.googleapis.com/auth/youtube'
];

var yt = google.youtube('v3');

var url = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: scopes
});

oauth2Client.getToken(config.code, function(err, tokens) {
  oauth2Client.setCredentials(tokens);


//  yt.channels.list({
//    "part": "id",
//    "mySubscribers": true,
//    "maxResults": 50,
//    auth: oauth2Client
//  }, function(err, data) {
//  
//     console.log(err || JSON.stringify(data,null,2));
//  });
});

