var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Esto es para openshift
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

//para mongodb
var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;

mongoose.connect("mongodb://"+connection_string+"",function(err,call){
    if(err) throw err;
});

var userSchemaJson = {
  email:String,
  password:String
};
var user_schema = new Schema(userSchemaJson);
var User = mongoose.model("User",user_schema);

app.set("view engine","jade");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.render("index");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/users",function(req,res){
  var user = new User({email:req.body.email,password:req.body.password});
  user.save(function(){
      res.send("Guardamos tus datos");
  });

});

app.listen(port,ip_address);
