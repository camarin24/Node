var express = require("express");
var app = express();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
app.set("view engine","jade");
app.get("/",function(req,res){
  res.render("index",{tata:"Tatiana"});
})
app.listen(server_port,server_ip_address,function(){
  console.log("ip"+server_ip_address+ ", port"+server_port);
});
