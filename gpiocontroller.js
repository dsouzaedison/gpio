/**
 * Created by edison on 1/14/2016.
 */
var express = require('express');
var gpioapp = express();
var gpio = require('onoff').Gpio;
var led = new gpio(14,'out');

gpioapp.get('/on',function(req,res){
    console.log('LED ON');
    led.write(1);
    res.redirect('/');
});

gpioapp.get('/off',function(req,res){
    led.write(0);
    console.log('LED OFF');
    res.redirect('/');
});

module.exports = gpioapp;