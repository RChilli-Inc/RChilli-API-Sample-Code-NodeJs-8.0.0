var https = require('http');
var fs = require('fs'), 
// file data from file
	FILE_DATA=base64_encode('SampleResume.doc')

/**
 * HOW TO Make an HTTP Call - POST
 */
// do a POST request
// create the JSON object
function base64_encode(file) {
    // read binary data
    var binaryData = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(binaryData).toString('base64');
}

jsonObject = JSON.stringify({
			'filedata':FILE_DATA,
			//filename
			'filename':'SampleResume.docx'
			,'userkey':'Your UserKey'
			,'version':'8.0.0'
			,'subuserid':'Your Company Name'
});
 
// prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
 
// the post options
var optionspost = {
    host : 'rest.rchilli.com',
    port : 80,
    path : '/RChilliParser/Rchilli/parseResumeBinary',
    method : 'POST',
    headers : postheaders
};
 
console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');
 
// do the POST call
var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);
    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
});
 
// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});
 
