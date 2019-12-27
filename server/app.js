const express = require("express");
const app = express();
const port = 3000;

app.get('/*', function(req, res) {
	console.log("req.url = " + req.url);
	if(File.exist())
	res.sendfile("..\\www\\index.html");
});

app.listen(port, () => {
	console.log("fART server listening on port " + port);
});