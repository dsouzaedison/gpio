/**
 * Created by edison on 1/14/2016.
 */
var express = require('express');
var app = express();
var gpio= require('./gpiocontroller');
app.locals.ledState = 0;
var toggle,title="LED controller",color="#0f0";

app.set('view engine','ejs');

app.use(express.static(__dirname + '/views'));
app.use(function(req,res,next){
    console.log('Request Recieved');
    if (app.locals.ledState) {
        toggle = "OFF";
        color = "#f00"
    } else {
        toggle = "ON";
        color = "#0f0"
    }
    next();
});

app.get('/',function(req,res){
    res.render('index',{title:title,toggle:toggle,color:color});
});

app.post('/toggle',function(req,res){
    console.log('Toggle Requested');
    if(app.locals.ledState)
    {
        app.locals.ledState=0;
        res.redirect('/gpio/off');
    }else{
        app.locals.ledState=1;
        res.redirect('/gpio/on');
    }
});

app.use('/gpio',gpio);

app.listen(555,function(){
    console.log('ServerRunning at 127.0.0.1:555');
});

