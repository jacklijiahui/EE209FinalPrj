var Cylon = require('cylon');

var thumb = [];         //  Two levles: 1st. [n] counts i; thumb's [x][y][z]
var index = [];         //  Two levles: 1st. [n] counts i; index's [x][y][z]
var palm =  [];         //  Two levles: 1st. [n] counts i; palm's [x][y][z]
var i = 0;              // initial count value

Cylon.robot({
  name: "testbot",

  connections: {
    leapmotion: { adaptor: 'leapmotion' }
  },

  devices: {
    leapmotion: { driver: 'leapmotion' }
  },

  

  work: function(my) {
    //start the leapmotion, like an interupt 
    my.leapmotion.on('hand', function(hand) {
      if ((Math.round(hand.palmPosition[0]) % 2 == 0 )|| (Math.round(hand.palmPosition[1]) % 2 == 0)|| (Math.round(hand.palmPosition[2]) % 2 == 0)) {
      // 0 indicates x value; 1 indicates y value; 2 indicates z value
      palm[i] = [Math.round(hand.palmPosition[0]), Math.round(hand.palmPosition[1]), Math.round(hand.palmPosition[2])];
      console.log('The X, Y, Z of Palm: '+ palm[i][0] + ',' + palm[i][1] + ',' + palm[i][2]);
      } else {
        console.log('Skip and no new palm data written in the palm array');
      }

      if ((Math.round(hand.fingers[0].tipPosition[0]) % 2 == 0 )|| (Math.round(hand.fingers[0].tipPosition[1]) % 2 == 0)|| (Math.round(hand.fingers[0].tipPosition[2]) % 2 == 0)) {
      thumb[i] = [Math.round(hand.fingers[0].tipPosition[0]), Math.round(hand.fingers[0].tipPosition[1]), Math.round(hand.fingers[0].tipPosition[2])];
      console.log('The X, Y, Z of Thumb: '+ thumb[i][0] + ',' + thumb[i][1] + ',' + thumb[i][2]);
      } else {
        console.log('Skip and no new thumb data written in the palm array');
      }


      if ((Math.round(hand.fingers[1].tipPosition[0]) % 3 == 0 )|| (Math.round(hand.fingers[1].tipPosition[1]) % 3 == 0)|| (Math.round(hand.fingers[1].tipPosition[2]) % 3 == 0)) {
      index[i] = [Math.round(hand.fingers[1].tipPosition[0]), Math.round(hand.fingers[1].tipPosition[1]), Math.round(hand.fingers[1].tipPosition[2])];
      console.log('The X, Y, Z of Index: '+ index[i][0] + ',' + index[i][1] + ',' + index[i][2]); 
           if (hand.fingers[1].tipPosition[1] < 0){
            console.log('Has negative value');
           } else {
            console.log("did not see negative value");
           }

      } else {
        console.log('Skip and no new index data written in the palm array');
      }

      if (i == 100) {   // Overwrite the oldest data when array fiiled up, e.g. limit 100
      i = 0;
    } else {
      //console.log(index[i][1]); // test Y value
      i++;             // normal index count up
      //console.log(palm.toString()); // For testing and printing all current array of thumb
      
    }     
    });


  my.doAThing(); 
  },

  

  doAThing: function() {
    console.log("I did a thing!");
  }


}).start();




/*
Finger.type
Type: integer – a code indicating the finger name
The anatomical name of this finger:

0 = THUMB
1 = INDEX
2 = MIDDLE
3 = RING
4 = PINKY
*/