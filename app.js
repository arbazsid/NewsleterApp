// jshint esversion: 6

const express= require("express");
const bodyParser= require("body-parser");
const request=require("request");
const https = require("https");

const app=express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/",function(req,res){
    const fistname=req.body.fname;
    const lastname=req.body.lname;
    const email= req.body.email;
   
    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fistname,
                    LNAME:lastname
                }
            }
        ]
    };
    const JsonData=JSON.stringify(data);
    
   
    const url="https://us21.api.mailchimp.com/3.0/lists/c637981767";
    const option={                                      
        method:"POST",
        auth:"arabz:7580c9c86670ccdd5c571b43eef72dbe-us21"
    }

   const request= https.request(url,option,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(JsonData);
    request.end();

});


app.post("/failure",function(req,res){  
    res.redirect("/");
});


app.listen(process.env.PORT ,function(){
    console.log("sever is running on 3000");
});


