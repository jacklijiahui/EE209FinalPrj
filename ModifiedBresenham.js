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
var speedX =[];
var speedZ = [];

var i = 0;              //  Initial count value for storing array data
var j = 0;
var factor = 2;
var countNum=1;


var startReplication = 0; // Variable go HIGH(stop writing by using Leapmotion), start the process of replication
//var startRepeat = 0; // Control repeat part for replication

var startFlag =false;
var speedRPM1=0;
var speedRPM2=0;


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

  var lcd = new five.LCD({ 
      controller: "JHD1313M1"
      }); 
  lcd.cursor(0, 0).print("TeamThimble");

  var count = 0;      //used to count frames of Positive X
  var count2 = 0;       //...negative X
  var countY = 0;       //...positive y
  var countY2 = 0;      //...negative y
  var countZ = 0;       //...positive z
  var countZ2= 0;       //...negative z

  var handPositionX =0;             
  var lastHandPositionX = 0;
  var errPositionX=0;
  var totalErrPositionX=0;

  var handPositionY =0;
  var handPositionZ =0;
  var lastHandPositionZ = 0;
  var errPositionZ=0;
  var totalErrPositionZ=0;

  // used to control the Pen up and down 
  var middlePosition;
  var thumbPosition;
  var distance;


  controllerLM.on('frame',function (frame){
        
    if (frame.hands.length > 0) {
     
          

          if(frame.hands.length ==2){  //used to judge when to store array
            startFlag=true;
            console.log(startFlag);
          };

          var handvelocity0 = frame.hands[0].palmVelocity[0]; // use to stop LM
          var palmNormlY = frame.hands[0].palmNormal[1];   //palmNormal Y

          var indexPosition2 = frame.pointables[1].tipPosition[1]; // For servoMotor control

          var handvelocity1 = frame.fingers[1].tipVelocity[0];   //index finger x
          var handvelocity3 = frame.fingers[1].tipVelocity[2];    // index finger z
          var handvelocity2 = frame.fingers[1].tipVelocity[1];    // index finger y


          var handPosition2 = frame.fingers[1].tipPosition[1];  //speed of y

          var rate1_3 = Math.abs(frame.fingers[1].tipVelocity[0]/frame.fingers[1].tipVelocity[2]);  //ratio v_x/ v_z
          var rate3_1 = Math.abs(frame.fingers[1].tipVelocity[2]/frame.fingers[1].tipVelocity[0]);


          handPositionX = frame.fingers[1].tipPosition[0];    //the x position of index finger 
          errPositionX =  handPositionX - lastHandPositionX;  
          lastHandPositionX = handPositionX;

          handPositionZ = frame.fingers[1].tipPosition[2];      //the z position of index finger 
          errPositionZ =  handPositionZ - lastHandPositionZ;
          lastHandPositionZ = handPositionZ;



          /*************  calculate the distance between the middle and thumb finger to lift pen up and down *****************/
          middlePosition = frame.fingers[2].tipPosition;
          thumbPosition = frame.fingers[0].tipPosition;
          distance = Math.sqrt(Math.pow((middlePosition[0]-thumbPosition[0]),2)+Math.pow((middlePosition[1]-thumbPosition[1]),2)
                          +Math.pow((middlePosition[2]-thumbPosition[2]),2));

          //console.log(handPositionX,'-----',handPositionZ,'-----',errPositionX)
          if (distance>70) { // go up

            countY2 = 0;
            if (countY==countNum){
                //console.log('pen go UP');
                servoPen.to(15);
                if(startFlag==true){
                    stepY.push(1);
                };
                //stepY.push(1);
                //reset the countY so that a new batch of frames
                //can be processed
                countY = 0;
            } else {
                //during the time that the next 30 are processed,
                //we want to keep the same state of the motor
                //console.log('pen keep UP');
                if(startFlag==true){
                    stepY.push(0);
                };
                //stepY.push(0);
            }
          } else if (distance<50) { // go down

              countY = 0;
              if (countY2==countNum){
                  servoPen.to(45);
                  //console.log('pen go DOWN');
                  if(startFlag==true){
                      stepY.push(-1);
                  };
                  //stepY.push(-1);
                  countY2 = 0;
              } else {
                  //during the time that the next 30 are processed,
                  //we want to keep the same state of the motor
                 //console.log('pen keep DOWN');
                  if(startFlag==true){
                      stepY.push(0);
                  };
                  //stepY.push(0);
              }
          } else {
              //when our hands stop, we want to reset the value
              //of countY and make the motor stop
              //console.log('pen keep the current status');
              countY2 = 0;
              countY = 0;
              if(startFlag==true){
                  stepY.push(0);
              };
              //stepY.push(0);
          }

          /*************  end *****************/

          /* 
          Frame test

          LM: 40 FPS  ---> 25ms per frame 

          Stepper Motor: 120RPM---> 0.002 rad per millisecond ----> 0.4 step per millisecond 
          ----> 10 steps per frame at most 

          

          */
          
          /*************  algorithm of writing signature--Modified Bresham's algorithm   *****************/

          if (rate1_3>=1) {
              count2=0;
              speedRPM2=0;
              speedRPM1 = speedRPM1 + rate3_1;
              if(count == countNum){  //countNum =5

                  speedRPM1 = speedRPM1 + rate3_1;
                  totalErrPositionX = totalErrPositionX + errPositionX;
                  speedRPM1 = speedRPM1/countNum;
                  totalErrPositionX = factor* totalErrPositionX;
                  if(totalErrPositionX > 0.4*factor*countNum){
                      if(totalErrPositionX > 3){
                          totalErrPositionX =3;
                      };
                      stepperX.rpm(100).ccw().step(Math.round(Math.abs(totalErrPositionX)),function(){ //go right     
                      });
                      console.log(Math.round(Math.abs(totalErrPositionX)),'go right ');
                      if(startFlag==true){
                          stepX.push(Math.round(Math.abs(totalErrPositionX)));
                          speedX.push(100);
                      };
                      
                  }else if(totalErrPositionX < -0.4*factor*countNum){
                      if(totalErrPositionX < -3){
                          totalErrPositionX = -3;
                      };
                      stepperX.rpm(100).cw().step(Math.round(Math.abs(totalErrPositionX)),function(){ //go left 
                          
                      });
                      console.log(Math.round(Math.abs(totalErrPositionX)),'go left ');
                      if(startFlag==true){
                          stepX.push(-Math.round(Math.abs(totalErrPositionX)));
                          speedX.push(100);
                      };
                      
                  }else{
                      stepperX.rpm(0);
                      if(startFlag==true){
                          stepX.push(0);
                          speedX.push(0);
                      };
                      
                  }

                  totalErrPositionZ = totalErrPositionZ + errPositionZ;
                  totalErrPositionZ = factor* totalErrPositionZ;
                  if(totalErrPositionZ > 0.4*factor*countNum){
                      if(totalErrPositionZ > 3){
                          totalErrPositionZ =3;
                      };
                      stepperZ.rpm(Math.round(100*speedRPM1)).cw().step(Math.round(Math.abs(totalErrPositionZ)),function(){ //go down 
                          
                      });
                      console.log(Math.round(Math.abs(totalErrPositionZ)),'go down ');
                      if(startFlag==true){
                          stepZ.push(-Math.round(Math.abs(totalErrPositionZ)));
                          speedZ.push(Math.round(100*speedRPM1));
                      };   
                      
                  }else if(totalErrPositionZ < -0.4*factor*countNum){
                      if(totalErrPositionZ < -3){
                          totalErrPositionZ = -3;
                      };
                      stepperZ.rpm(Math.round(100*speedRPM1)).ccw().step(Math.round(Math.abs(totalErrPositionZ)),function(){ //go up 
                          
                      });
                      console.log(Math.round(Math.abs(totalErrPositionZ)),'go up');
                      if(startFlag==true){
                          stepZ.push(Math.round(Math.abs(totalErrPositionZ)));
                          speedZ.push(Math.round(100*speedRPM1));
                      };  
                      
                  }else{
                      stepperZ.rpm(0);
                      if(startFlag==true){
                          stepZ.push(0);
                          speedZ.push(0);
                      };
                      
                  }

                  totalErrPositionX =0;
                  totalErrPositionZ =0;
                  count=0;
                  speedRPM1=0;

              }else{
                  speedRPM1 = speedRPM1 + rate3_1;
                  totalErrPositionX = totalErrPositionX + errPositionX;
                  totalErrPositionZ = totalErrPositionZ + errPositionZ;
                  if(startFlag==true){
                      stepZ.push(0);
                      speedZ.push(0);
                      stepX.push(0);
                      speedX.push(0);
                  };
              }
          }else{
              count=0;
              speedRPM1=0;
              speedRPM2 = speedRPM2 + rate1_3;
              if(count2 == countNum){  //countNum =5

                  speedRPM2 = speedRPM2 + rate1_3;
                  totalErrPositionX = totalErrPositionX + errPositionX;
                  speedRPM2 = speedRPM2/countNum;
                  totalErrPositionX = factor* totalErrPositionX;
                  if(totalErrPositionX > 0.4*factor*countNum){
                      if(totalErrPositionX > 3){
                          totalErrPositionX = 3;
                      };
                      stepperX.rpm(Math.round(100*speedRPM2)).ccw().step(Math.round(Math.abs(totalErrPositionX)),function(){ //go right 
                          
                      });
                      console.log(Math.round(Math.abs(totalErrPositionX)),'go right ');
                      if(startFlag==true){
                          stepX.push(Math.round(Math.abs(totalErrPositionX)));
                          speedX.push(Math.round(100*speedRPM2));
                      };
                      
                  }else if(totalErrPositionX < -0.4*factor*countNum){
                      if(totalErrPositionX < -3){
                          totalErrPositionX = -3;
                      };
                      stepperX.rpm(Math.round(100*speedRPM2)).cw().step(Math.round(Math.abs(totalErrPositionX)),function(){ //go left 
                          
                      });
                      console.log(Math.round(Math.abs(totalErrPositionX)),'go left ');
                      if(startFlag==true){
                          stepX.push(-Math.round(Math.abs(totalErrPositionX)));
                          speedX.push(Math.round(100*speedRPM2));
                      };
                      
                  }else{
                      stepperX.rpm(0);
                      if(startFlag==true){
                          stepX.push(0);
                          speedX.push(0);
                      };
                      
                  }

                  totalErrPositionZ = totalErrPositionZ + errPositionZ;
                  totalErrPositionZ = factor* totalErrPositionZ;
                  if(totalErrPositionZ > 0.4*factor*countNum){
                      if(totalErrPositionZ > 3){
                          totalErrPositionZ =3;
                      };
                      stepperZ.rpm(100).cw().step(Math.round(Math.abs(totalErrPositionZ)),function(){ //go down
                          
                      });
                      console.log(Math.round(Math.abs(totalErrPositionZ)),'go down');
                      if(startFlag==true){
                          stepZ.push(-Math.round(Math.abs(totalErrPositionZ)));
                          speedZ.push(100);
                      }; 
                      
                  }else if(totalErrPositionZ < -0.4*factor*countNum){
                      if(totalErrPositionZ < -3){
                          totalErrPositionZ = -3;
                      };
                      stepperZ.rpm(100).ccw().step(Math.round(Math.abs(totalErrPositionZ)),function(){ //go up
                         
                      });
                      console.log(Math.round(Math.abs(totalErrPositionZ)),'go up');
                      if(startFlag==true){
                          stepZ.push(Math.round(Math.abs(totalErrPositionZ)));
                          speedZ.push(100);
                      };  
                      
                  }else{
                      stepperZ.rpm(0);
                      if(startFlag==true){
                          stepZ.push(0);
                          speedZ.push(0);
                      };
                      
                  }

                  totalErrPositionX =0;
                  totalErrPositionZ =0;
                  count2=0;
                  speedRPM2=0;


              }else{
                  speedRPM2 = speedRPM2 + rate1_3;
                  totalErrPositionX = totalErrPositionX + errPositionX;

                  totalErrPositionZ = totalErrPositionZ + errPositionZ;

                  if(startFlag==true){
                      stepZ.push(0);
                      speedZ.push(0);
                      stepX.push(0);
                      speedX.push(0);
                  };
              }

          };
          
          /*************  algorithm end *****************/

          if (palmNormlY>0 && (startFlag==true)) {    // if the palm is up and the array is recording.
              startReplication = 1; //var for starting replication
              controllerLM.disconnect(); 
              servoPen.to(15); // pen UP
              console.log('x',stepX);
              console.log('z',stepZ);
              console.log('xs',speedX);
              console.log('ys',speedZ);
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
                                if(stepX[i]>0){
                                    servoPen.to(15);
                                    stepperX.rpm(speedX[i]).cw().step(stepX[i], function() {
                                        //console.log("CW to write on X");
                                    });
                                } else if(stepX[i]<0){
                                    servoPen.to(15);
                                    stepperX.rpm(speedX[i]).ccw().step(Math.abs(stepX[i]), function() {
                                    //console.log("CCW to write on X");
                                    });
                                } else {
                                    servoPen.to(15);
                                    stepperX.rpm(0);
                                    //console.log("same X");
                                }

                                if(stepZ[i]>0){
                                    servoPen.to(15);
                                    stepperZ.rpm(speedZ[i]).cw().step(stepZ[i], function() {
                                    //console.log("CW to write on Z");
                                    });
                                } else if(stepZ[i]<0){
                                    servoPen.to(15);
                                    stepperZ.rpm(speedZ[i]).ccw().step(Math.abs(stepZ[i]), function() {
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
                                                servoPen.to(45);
                                            } else {
                                              if (i == 1) {    // pen go down when just starting replication
                                                servoPen.to(45);
                                              } else {
                                                //console.log("pen dont move");
                                              }
                                            }


                                            if(stepX[i]>0){
                                                //servoPen.to(50);
                                                stepperX.rpm(speedX[i]).ccw().step(stepX[i], function() {
                                                //console.log("CCW to write on X");
                                                });
                                            } else if(stepX[i]<0){
                                                //servoPen.to(50);
                                                stepperX.rpm(speedX[i]).cw().step(Math.abs(stepX[i]), function() {
                                                //console.log("CW to write on X");
                                                });
                                            } else {
                                                //servoPen.to(50);
                                                stepperX.rpm(0);
                                                //console.log("same X");
                                            }

                                            if(stepZ[i]>0){
                                                //servoPen.to(50);
                                                stepperZ.rpm(speedZ[i]).ccw().step(stepZ[i], function() {
                                                //console.log("CCW to write on Z");
                                                });
                                            } else if(stepZ[i]<0){
                                                //servoPen.to(50);
                                                stepperZ.rpm(speedZ[i]).cw().step(Math.abs(stepZ[i]), function() {
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
                                        }, 30);
                                    }
                                }
                                i = i - 1;
                            }, 30);
                            console.log(answer);
              
                        } else if (answer == 0) {
                            console.log('Yes sir! Stop.');
                            flag == true;
                            rl.close();
                        } else {
                            console.log('ERROR! Sorry I do not understand what you mean, please type again!');
                        }; 
                    });         
                   
              } else {
                   //none
              } 

          }

          count = count + 1;
          count2 = count2 + 1;
          //console.log('count =>',count);
          //console.log('count2 =>',count2);  

          countY = countY + 1;
          countY2 = countY2 + 1; 

          countZ = countZ + 1;    
          countZ2= countZ2 + 1;

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

          totalErrPositionX = 0;
          totalErrPositionZ = 0;

          console.log('No hand detected');

          stepperX.rpm(0);
          stepperZ.rpm(0);
          servoPen.to(15); // pen keep down when starting drawing
          }

  });
});

controllerLM.connect();




