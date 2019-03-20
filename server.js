var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if(request.method==="GET" && parsedUrl.pathname=="/listings"){
      response.statusCode=200;
      response.end(listingData);
}
  else{
      response.writeHead(404,{'Content-Type': 'text/plain'});
      response.write("Bad gateway error");
      response.end();
}
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    listingData=data;
    if(err) throw err;
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
    server=http.createServer(requestHandler);
    server.listen(port,function(){console.log("Server listening on: http://localhost:"+port);});
    console.log("Server Started");
});
