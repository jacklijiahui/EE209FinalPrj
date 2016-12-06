var Leap = require('leapjs');
var five = require('johnny-five');

var controllerLM = new Leap.Controller();

var thumb = [];         //  Two levles: 1st. [n] counts i; thumb's [x][y][z]
var index = [];         //  Two levles: 1st. [n] counts i; index's [x][y][z]
var palm =  [];         //  Two levles: 1st. [n] counts i; palm's [x][y][z]
var i = 0;              //  Initial count value for storing array data


 //start the leapmotion, like an interupt 
 controllerLM.on('frame',function (frame){

 	if (frame.hands.length > 0) {

 	var palmPosition1 = frame.hands[0].palmPosition[0];
 	var palmPosition2 = frame.hands[0].palmPosition[1];
 	var palmPosition3 = frame.hands[0].palmPosition[2];
 	var thumbPosition1 = frame.pointables[0].tipPosition[0];
 	var thumbPosition2 = frame.pointables[0].tipPosition[1];
 	var thumbPosition3 = frame.pointables[0].tipPosition[2];
 	var indexPosition1 = frame.pointables[1].tipPosition[0];
 	var indexPosition2 = frame.pointables[1].tipPosition[1];
 	var indexPosition3 = frame.pointables[1].tipPosition[2];

 	var handvelocity1 = frame.hands[0].palmVelocity[0];

      if ((Math.round(palmPosition1) % 2 == 0) || (Math.round(palmPosition2) % 2 == 0) || (Math.round(palmPosition3) % 2 == 0)) {
      palm[i] = [Math.round(palmPosition1), Math.round(palmPosition2), Math.round(palmPosition3)];
      console.log('The X, Y, Z of Palm: '+ palm[i][0] + ',' + palm[i][1] + ',' + palm[i][2]);
      palm = palm.filter(function(entry) { return /\S/.test(entry); });
      } else {
        console.log('Skip and no new palm data written in the palm array');
      }

      if ((Math.round(thumbPosition1) % 2 == 0) || (Math.round(thumbPosition2) % 2 == 0) || (Math.round(thumbPosition3) % 2 == 0)) {
      thumb[i] = [Math.round(thumbPosition1), Math.round(thumbPosition2), Math.round(thumbPosition3)];
      console.log('The X, Y, Z of Thumb: '+ thumb[i][0] + ',' + thumb[i][1] + ',' + thumb[i][2]);
      thumb = thumb.filter(function(entry) { return /\S/.test(entry); });
      } else {
        console.log('Skip and no new thumb data written in the palm array');
      }

      if ((Math.round(indexPosition1) % 3 == 0) || (Math.round(indexPosition2) % 3 == 0) || (Math.round(indexPosition3) % 3 == 0)) {
      index[i] = [Math.round(indexPosition1), Math.round(indexPosition2), Math.round(indexPosition3)];
      console.log('The X, Y, Z of Index: '+ index[i][0] + ',' + index[i][1] + ',' + index[i][2]); 
      index = index.filter(function(entry) { return /\S/.test(entry); });
      } else {
        console.log('Skip and no new index data written in the palm array');
      }



      if (handvelocity1 > 300) {   // Overwrite the oldest data when array fiiled up, e.g. limit 200
      //i = 0;
      controllerLM.disconnect(); // Stop writing from Leap motion
      console.log('Stop writing part, go to replication!');
      } else {
      i++;             // Normal index count up
      console.log(index.toString()); 
      //console.log(thumb.toString()); 
      //console.log(palm.toString()); // For testing and printing all current array of thumb
      }  

    } else {
 	  console.log('No hand detected');
    } 

  });

    controllerLM.connect(); 