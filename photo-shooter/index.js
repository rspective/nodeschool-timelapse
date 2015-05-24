var RaspiCam = require("raspicam");
var fs = require('fs');

var sOutputPath = './output';
var sOrgPath = sOutputPath + "/photo.jpg";

var camera = new RaspiCam({
	mode: "photo",
	output: sOrgPath,
	encoding: "jpg",
	timeout: 0,
	width: 960,
	height: 720,
	//nopreview: true
});

camera.on("read", function( err, timestamp, filename ){
	if(fs.existsSync(sOrgPath)) {
		var iTimestamp = new Date().getTime();
		var sDestPath = sOutputPath + "/" + iTimestamp + ".jpg";
		fs.rename(sOrgPath, sDestPath, function(err) {
			if ( err ) console.log('ERROR: ' + err);
		});
	}
});

var interval = setInterval(function() { camera.start(); }, 1000);




