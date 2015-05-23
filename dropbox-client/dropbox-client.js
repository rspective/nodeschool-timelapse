var config 		= require('./config');
var fs			= require('fs');
var path 		= require('path');
var dropbox 	= require('dropbox');

/*

FILE REQUIRE DROPBOX CONFIGURATION IN './config.js'

{
	dropboxAuth: {
		key: 	'xxx',
		secret: 'yyy',
		token: 	'zzz' 
	}
}

*/

var DropboxClient = function () {
	var self = this;

	self.client = new dropbox.Client(config.dropboxAuth);

	self.syncFolder = function (localPath, dropboxPath) {

		// write to root folder
		dropboxPath = dropboxPath || "/";

		fs.readdir(localPath, function (err, files) {
			// check access errors
			if (err) {
				return console.log('Src directory access error');
			}

			// iterate through files
			files.forEach(function(fileName) {
				// check if file has been marked as uploaded yet
				if (fileName[fileName.length-5] != '_') {

					console.log(fileName + ' reading...');

					// read file from local store
					var file = fs.readFileSync(localPath + fileName);

					console.log(fileName + ' transfering...');

					// transfer file to dropbox
					self.client.writeFile(dropboxPath + fileName, file, function (error, stat) {
						if (error) {
							console.log(fileName + ' transfer error!');
						}
						console.log(fileName + ' uploaded');
						
						var ext = path.extname(fileName);
						var name = path.basename(fileName, ext);
		
						var oldName = localPath + fileName;
						var newName = localPath + name + "_" + ext;
						
						// rename file by adding '_' at name end
						fs.renameSync(oldName, newName);
					});
				}
			});
		});
	} 
}