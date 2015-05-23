var inputPath = process.argv[2];
var outputPath = process.argv[3];

if (inputPath[inputPath.length-1] !== "/") { inputPath = inputPath + '/'; }
if (outputPath[outputPath.length-1] !== "/") { outputPath = outputPath + '/'; }

require('child_process').spawn("ffmpeg", ["-framerate", "1", "-pattern_type", "glob", "-i", inputPath + 'img*.jpg', "-vf", "crop=((in_w/2)*2):((in_h/2)*2)", "-c:v", "libx264", outputPath + "out.mp4"]);