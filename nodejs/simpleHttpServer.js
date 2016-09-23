var http = require("http");
var url = require("url");
var querystring  = require("querystring");
var fs = require("fs");

http.createServer(function(request,response){
	pathName = url.parse(request.url).pathname;
	fs.readFile(__dirname+pathName, function(err,data){
		if(err){
			response.writeHead(404,{'Content-type':'text/plain'});
			response.write("Page Was Not Found"+JSON.stringify(err));
			response.end();
		}else{
			response.writeHead(200,{'Content-type':'text/plain'});
			response.write(data);
			response.end();
		}
	})
	//response.writeHead(200,{'Content-type':'text/plain'});
	//response.write('Hello Node JS Server Response');
	//response.end();
	
	//pathName = url.parse(request.url).pathname;
	//query = url.parse(request.url).query;
	//console.log("pathName "+pathName);
	//console.log("query "+query);
})
.listen(7000);
