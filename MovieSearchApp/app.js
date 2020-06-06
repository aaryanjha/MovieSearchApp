var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "https://api.themoviedb.org/3/search/movie?query=" + query + "&api_key=52f10309141ffea437b02baf512657b2&language=en-US";
    console.log(url);
    request(url, function(error, response, body){
        if (!error && response.statusCode==200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
})

app.listen(3000, function(){
    console.log("Movie Search App started on port 3000!!");
});