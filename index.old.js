const express = require('express');
const app = express();
const https = require('https');
const http = require('http');


app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/html/index.html')
});

const Ecleptic = "https://owapi.net/api/v3/u/Ecleptic-1216/blob";
const Ecleptic1 = "http://owapi.net/api/v3/u/Ecleptic-1216/blob";
const nodejs = "https://nodejs.org/dist/index.json"



app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});

//////////////////////////////////////////////////////////////////////////////////////////////////
console.log(`Server at: ${Ecleptic}`);

https.get({
	hostname: 'https://owapi.net/api/v3/u/Ecleptic-1216/blob',
    headers: {'user-agent': 'Mozilla/5.0'},
	    path: '/'

}, (res) => {

	res.setEncoding('utf8');
	let rawData = '';
	res.on('data', (chunk) => rawData += chunk);
	res.on('end', () => {
		try {
			let parsedData = JSON.parse(rawData);
			console.log(parsedData);
		} catch (e) {
			console.log(e.message);
		}
	});
}).on('error', (e) => {
	console.log(`Got error: ${e.message}`);
});

// https.get('https://owapi.net/api/v3/u/Ecleptic-1216/stats', (res) => {
//   const statusCode = res.statusCode;
//   const contentType = res.headers['content-type'];

//   let error;
// //   if (statusCode !== 200) {
// //     error = new Error(`Request Failed.\n` +
// //                       `Status Code: ${statusCode}`);
// //   } else if (!/^application\/json/.test(contentType)) {
// //     error = new Error(`Invalid content-type.\n` +
// //                       `Expected application/json but received ${contentType}`);
// //   }
// //   if (error) {
// //     console.log(error.message);
// //     // consume response data to free up memory
// //     res.resume();
// //     return;
// //   }

//   res.setEncoding('utf8');
//   let rawData = '';
//   res.on('data', (chunk) => rawData += chunk);
//   res.on('end', () => {
//     try {
//       let parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.log(e.message);
//     }
//   });
// }).on('error', (e) => {
//   console.log(`Got error: ${e.message}`);
// });