require('events').EventEmitter.prototype._maxListeners = 1000;

// For another way of replicating multiple times
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var countCopy = 0;   //record the times of replication 
var flag =false;

var Leap = require('leapjs');
var five = require('johnny-five');
var board = new five.Board();

var controllerLM = new Leap.Controller();

//var palm =  [];         //  Two levles: 1st. [n] counts i; palm's [x][y][z]
//var thumb = [];         //  Two levles: 1st. [n] counts i; thumb's [x][y][z]
//var index = [];         //  Two levles: 1st. [n] counts i; index's [x][y][z]

var stepX = [];
var stepY = [];
var stepZ = []; 

var i = 0;              //  Initial count value for storing array data
var j = 0;

var startReplication = 0; // Variable go HIGH(stop writing by using Leapmotion), start the process of replication
//var startRepeat = 0; // Control repeat part for replication


// filtering error
controllerLM.on('connect', function() {
  var origHandleData = this.connection.handleData;
  this.connection.handleData = function(data) {
    try {
      return origHandleData.call(this, data);
    } catch (e) {
      console.log(e);
    }
  };
});


board.on("ready", function() {
  var k = 0;
  var stepperX = new five.Stepper({
    //type: five.Stepper.TYPE.DRIVER,
    type: five.Stepper.TWO_WIRE,
    stepsPerRev: 200,
    pins: {
    step: 10,
    dir: 12
  }
  });
  var stepperZ = new five.Stepper({
    //type: five.Stepper.TYPE.DRIVER,
    type: five.Stepper.TWO_WIRE,
    stepsPerRev: 200,
    pins: {
    step: 11,
    dir: 13
  }
  });

  var servoPen = new five.Servo({
    pin: 3,
    startAt: 15
  });

  var count = 0; 
  var count2 = 0;
  var countY = 0;
  var countY2 = 0;
  var countZ = 0; 
  var countZ2= 0; 


  controllerLM.on('frame',function (frame){
        
    if (frame.hands.length > 0) {

          count = count + 1;
          count2 = count2 + 1;
          console.log('count =>',count);
          console.log('count2 =>',count2);  

          countY = countY + 1;
          countY2 = countY2 + 1; 

          countZ = countZ + 1;    
          countZ2= countZ2 + 1; 



          var handvelocity0 = frame.hands[0].palmVelocity[0]; // use to stop LM

          var indexPosition2 = frame.pointables[1].tipPosition[1]; // For servoMotor control

          var handvelocity1 = frame.fingers[1].tipVelocity[0];
          var handvelocity3 = frame.fingers[1].tipVelocity[2];
          var handvelocity2 = frame.fingers[1].tipVelocity[1];


          /*
          if (handvelocity2>=850 && handvelocity2 < 1000) {
            servoPen.to(15); //should be 15, position of servoPen when writing
          }

          if (handvelocity2<=-850 && handvelocity2 > -1000) {
            //console.log('Y speed ', handvelocity2);
            servoPen.to(50);
          }
          */

          if (indexPosition2 >= 380 || (handvelocity2>=850 && handvelocity2 < 1000)) { // go up

            countY2 = 0;
            if (countY==5){
                console.log('pen go UP');
                servoPen.to(15);
                
                stepY.push(1);
                //reset the countY so that a new batch of frames
                //can be processed
                countY = 0;
            } else {
                //during the time that the next 30 are processed,
                //we want to keep the same state of the motor
                console.log('pen keep UP');
                stepY.push(0);
            }
          } else if (indexPosition2 <= 280 || (handvelocity2<=-850 && handvelocity2 > -1000)) { // go down

              countY = 0;
              if (countY2==5){
                  servoPen.to(50);
                  console.log('pen go DOWN');
                  stepY.push(-1);
                  countY2 = 0;
              } else {
                  //during the time that the next 30 are processed,
                  //we want to keep the same state of the motor
                  console.log('pen keep DOWN');
                  stepY.push(0);
              }
          } else {
              //when our hands stop, we want to reset the value
              //of countY and make the motor stop
              console.log('pen keep the current status');
              countY2 = 0;
              countY = 0;
              stepY.push(0);
          }

       
          if (handvelocity1 > 50 && handvelocity1 < 1000) {
              count2 = 0;
              //setting the count condition before motor moves
              if (count==5){
                  console.log('loop test1');
                  stepperX.rpm(100).ccw().step(10, function() {
                    console.log("Done moving CCW");
                  });
                  stepX.push(10);
                  //reset the count so that a new batch of frames
                  //can be processed
                  count = 0;
              } else {
                  //during the time that the next 30 are processed,
                  //we want to keep the same state of the motor
                  console.log('loop test2');
                  stepX.push(0);
              }
          } else if (handvelocity1 < -50 && handvelocity1 > -1000) {
              count = 0;
              //setting the count condition before motor moves
              if (count2==5){
                  console.log('loop test1');
                  stepperX.rpm(100).cw().step(10, function() {
                      console.log("Done moving CW");
                  });
                  stepX.push(-10);
                  //motor2.reverse(120);
                  //reset the count so that a new batch of frames
                  //can be processed
                  count2 = 0;
              } else {
                  //during the time that the next 30 are processed,
                  //we want to keep the same state of the motor
                  console.log('loop test2');
                  stepX.push(0);
              }
          } else {
            //when our hands stop, we want to reset the value
            //of count and make the motor stop
            console.log('loop test3');
            stepperX.rpm(0);

            count2 = 0;
            count = 0;
            stepX.push(0);
          }
          

          if (handvelocity3 > 50 && handvelocity3 < 1000) {

            countZ2 = 0;
            //setting the count condition before motor moves
            if (countZ==5){
                console.log('loop test1');
                stepperZ.rpm(100).cw().step(10, function() {
                    console.log("Done moving CCW");
                });
                //motor2.forward(120);
                //reset the count so that a new batch of frames
                //can be processed
                stepZ.push(-10);
                countZ = 0;
            } else {
                //during the time that the next 30 are processed,
                //we want to keep the same state of the motor
                console.log('loop test2');
                stepZ.push(0);
            }
          } else if (handvelocity3 < -50 && handvelocity3 > -1000) {
                countZ = 0;
                //setting the count condition before motor moves
                if (countZ2==5){  
                    console.log('loop test1');
                    stepperZ.rpm(100).ccw().step(10, function() {
                        console.log("Done moving CW");
                    });
                    //motor2.reverse(120);
                    //reset the count so that a new batch of frames
                    //can be processed
                    countZ2 = 0;
                    stepZ.push(10);
                } else {
                    //during the time that the next 30 are processed,
                    //we want to keep the same state of the motor
                    console.log('loop test2');
                    stepZ.push(0);
                }
          } else {
              //when our hands stop, we want to reset the value
              //of count and make the motor stop
              console.log('loop test3');
              stepperZ.rpm(0);
              stepZ.push(0);

              countZ2 = 0;
              countZ = 0;
          }

          if (handvelocity0 > 1000) { // velocity 1000 to stop LM  

              startReplication = 1; //var for starting replication
              console.log('Stop writing part, go to replication!');
              controllerLM.disconnect(); // Stop writing from Leap motion

              servoPen.to(15); // pen UP 
              console.log(stepX.length + " " + stepY.length);

               // Replication Part Begin: Thinking only use index to draw the signiture
              if (controllerLM.disconnect() && startReplication == 1) {
                  console.log("Enter Replication");
                  //console.log(stepX.toString());
                  console.log("Reset!");
                  i = stepX.length - 1;

                  console.log('Do you want to replicate? (YES: type "1" or NO: type "0")');
                  rl.on('line', function (answer) {

                      if(answer == 1){

                        //Start replicating, default Y values, mention here keep in mind, need to code for servoPen for controlling/recording up and down
                        // but first testing w/o consider servoPen motor.                     
                        var refreshId1 = setInterval(function() {    // 1st setInterval reset

                            //console.log(i);
                            if(stepX[i]==10){
                                servoPen.to(15);
                                stepperX.rpm(20).cw().step(10, function() {
                                    //console.log("CW to write on X");
                                });
                            } else if(stepX[i]==-10){
                                servoPen.to(15);
                                stepperX.rpm(20).ccw().step(10, function() {
                                //console.log("CCW to write on X");
                                });
                            } else {
                                servoPen.to(15);
                                stepperX.rpm(0);
                                //console.log("same X");
                            }

                            if(stepZ[i]==10){
                                servoPen.to(15);
                                stepperZ.rpm(20).cw().step(10, function() {
                                //console.log("CW to write on Z");
                                });
                            } else if(stepZ[i]==-10){
                                servoPen.to(15);
                                stepperZ.rpm(20).ccw().step(10, function() {
                                //console.log("CCW to write on Z");
                                });
                            } else {
                              servoPen.to(15);
                              stepperZ.rpm(0);
                              //console.log("same Z");
                            }

                            if (i == 1) {
                                //servoPen.to(15);
                                console.log("end reset");
                                //console.log(i);
                                j = i;
                                //console.log(j);
                                clearInterval(refreshId1); // kill the reset
                              
                                if (j == 1) {
                                    var refreshId = setInterval(function() {        // 2nd setInterval replicate

                                        if (stepY[i] == 1) {
                                            servoPen.to(15);
                                        } else if (stepY[i] == -1) {
                                            servoPen.to(50);
                                        } else {
                                            console.log("pen dont move");
                                        }


                                        if(stepX[i]==10){
                                            //servoPen.to(50);
                                            stepperX.rpm(20).ccw().step(10, function() {
                                            //console.log("CCW to write on X");
                                            });
                                        } else if(stepX[i]==-10){
                                            //servoPen.to(50);
                                            stepperX.rpm(20).cw().step(10, function() {
                                            //console.log("CW to write on X");
                                            });
                                        } else {
                                            //servoPen.to(50);
                                            stepperX.rpm(0);
                                            //console.log("same X");
                                        }

                                        if(stepZ[i]==10){
                                            //servoPen.to(50);
                                            stepperZ.rpm(20).ccw().step(10, function() {
                                            //console.log("CCW to write on Z");
                                            });
                                        } else if(stepZ[i]==-10){
                                            //servoPen.to(50);
                                            stepperZ.rpm(20).cw().step(10, function() {
                                            //console.log("CW to write on Z");
                                            });
                                        } else {
                                            //servoPen.to(50);
                                            stepperZ.rpm(0);
                                            //console.log("same Z");
                                        }

                                        if (i == stepX.length - 1) {
                                            clearInterval(refreshId);
                                            countCopy ++;
                                            console.log('Start replicating. Times: ', countCopy,' Do you want to continue ? (YES: type "1" or NO: type "0")');
                                        }
                                        i++;
                                    }, 50);
                                }
                            }
                            i = i - 1;
                        }, 50);
                      } else if (answer == 0) {
                         console.log('Yes sir! Stop.');
                         flag == true;
                         rl.close();
                      } else {
                          console.log('ERROR! Sorry I do not understand what you mean, please type again!');
                      };
                  });
              }
          } else {
              //i++;             // Normal index count up
              //console.log(index.toString()); 
              //console.log(thumb.toString()); 
              //console.log(palm.toString()); // Only for testing and printing all current array of thumb
          } 

    } else { 
          // for biggest IF
          //if leap motion cannot detect our hands, we want 
          //the motor to stop and reset count
          count = 0;
          count2 = 0;
          countY = 0;
          countY2 = 0;
          countZ =0;
          countZ2=0;
          //console.log('loop test4');

          console.log('No hand detected');

          stepperX.rpm(0);
          stepperZ.rpm(0);
          servoPen.to(50); // should be 15
          }

  });
});

controllerLM.connect();