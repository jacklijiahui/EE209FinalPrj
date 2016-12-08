//Initializing the libraries necessary to control the Leap Motion
//controller and Arduino microcontroller. 
var Leap = require('leapjs');
var five = require('johnny-five');
var board = new five.Board();
    
var controllerLM = new Leap.Controller();

//Workaround hack
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

//defining motors on the initialization of the Arduino board
board.on('ready', function() {
    var motor1 = new five.Motor({
      pins: { pwm: 11 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 2, b: 3 }
    });

    var motor2 = new five.Motor({
      pins: { pwm: 3 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 1, b: 4 }
    });

    var motor3 = new five.Motor({
      pins: { pwm: 6 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 5, b: 7 }
    });

    var motor4 = new five.Motor({
      pins: { pwm: 5 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 0, b: 6 }
    });
  


    //count_motorname_forward is for forward motion count
    //count_motorname_reverse is for reverse motion count
    //count is used to set a number of frames to be 
    //processed before the motors begin to rotate
    
   
    var count_motor1_forward = 0; 
    var count_motor1_reverse = 0;
    var count_motor2_forward = 0;
    var count_motor2_reverse = 0;
    var count_motor3_forward = 0;
    var count_motor3_reverse = 0;
    var count_motor4_forward = 0;
    var count_motor4_reverse = 0;

   
   //beginnning the algorithm once a frame is available from 
   //the Leap Motion controller
    controllerLM.on('frame', function (frame) {
       
        //if a hand is detected
        if (frame.hands.length > 0) {

          //incrementing the count values to sum a number 
          //of frames

          count_motor1_forward = count_motor1_forward + 1;
          count_motor1_reverse = count_motor1_reverse + 1;
          count_motor2_forward = count_motor2_forward + 1;
          count_motor2_reverse = count_motor2_reverse + 1;
          count_motor3_forward = count_motor3_forward + 1;
          count_motor3_reverse = count_motor3_reverse + 1;
          count_motor4_forward = count_motor4_forward + 1;
          count_motor4_reverse = count_motor4_reverse + 1;

          //defining the various axis velocities from the palm
          //velocity information extracted from Leap Motion
          var handvelocity1 = frame.hands[0].palmVelocity[0];
          var handvelocity2 = frame.hands[0].palmVelocity[1];
          var handvelocity3 = frame.hands[0].palmVelocity[2];

        //to monitor motor activities, console.log() commands
        //are used to describe the state of the motor, its 
        //direction of rotation, or its activity  

       //moving motor 1
          if (handvelocity1 > 10) {
            //moving forward, no reverse count
            count_motor1_reverse = 0;
            //setting the count condition before motor moves
            if (count_motor1_forward == 30){
              console.log('motor 1 go forward');
              motor1.forward(255);
              //reset the count so that a new batch of 
              //frames can be processed
              
              count_motor1_forward = 0;
            } else {
            //during the time that the next 30 are 
            //processed, we want to keep the same state of
            //the motor
            console.log('motor 1 keep moving forward');
            }
          } else if (handvelocity1 < -10){
            //moving reverse, no forward count
             count_motor1_forward = 0;
            //setting the count condition before motor moves
            if (count_motor1_reverse == 30){
              console.log('motor 1 go reverse');
              motor1.reverse(255);
              //reset the count so that a new batch of frames
              //can be processed
              count_motor1_reverse = 0;
            } else {
            //during the time that the next 30 are processed,
            //we want to keep the same state of the motor
            console.log('motor 1 keep moving reverse');
            }
          } else {
            //when our hands stop, we want to reset the value
            //of counts for motor1 and make motor1 stop
            console.log('motor 1 stop');
            motor1.stop();
            count_motor1_forward = 0;
            count_motor1_reverse = 0;
            
          }

        //moving motor 2
          if (handvelocity3 > 10) {
            //moving forward, no reverse count
            count_motor2_reverse = 0;
            //setting the count condition before motor moves
            if (count_motor2_forward == 30){
              console.log('motor 2 go forward');
              motor2.forward(255);
              //reset the count so that a new batch of 
              //frames can be processed
              
              count_motor2_forward = 0;
            } else {
            //during the time that the next 30 are 
            //processed, we want to keep the same state of
            //the motor
            console.log('motor 2 keep moving forward');
            }
          } else if (handvelocity3 < -10){
            //moving reverse, no forward count
             count_motor2_forward  = 0;
            //setting the count condition before motor moves
            if (count_motor2_reverse == 30){
              console.log('motor 2 go reverse');
              motor2.reverse(255);
              //reset the count so that a new batch of frames
              //can be processed
              count_motor2_reverse = 0;
            } else {
            //during the time that the next 30 are processed,
            //we want to keep the same state of the motor
            console.log('motor 2 keep moving reverse');
            }
          } else {
            //when our hands stop, we want to reset the value
            //of counts for motor2 and make motor2 stop
            console.log('motor 2 stop');
            motor2.stop();
            count_motor2_forward = 0;
            count_motor2_reverse = 0;
            
          }


          //moving motor 3

          if (handvelocity2 > 10) {
            //moving forward, no reverse count
            count_motor3_reverse = 0;
            //setting the count condition before motor
            // moves
            if (count_motor3_forward == 30){
              console.log('motor 3 go forward');
              motor3.forward(255);
              //reset the count so that a new batch of 
              //frames can be processed
              
              count_motor3_forward = 0;
            } else {
            //during the time that the next 30 are 
            //processed, we want to keep the same state of
            //the motor
            console.log('motor 3 keep moving forward');
            }
          } else if (handvelocity2 < -10){
            //moving reverse, no forward count
             count_motor3_forward  = 0;
            //setting the count condition before motor moves
            if (count_motor3_reverse == 30){
              console.log('motor 3 go reverse');
              motor3.reverse(255);
              //reset the count so that a new batch of frames
              //can be processed
              count_motor3_reverse = 0;
            } else {
            //during the time that the next 30 are processed,
            //we want to keep the same state of the motor
            console.log('motor 3 keep moving reverse');
            }
          } else {
            //when our hands stop, we want to reset the value
            //of counts for motor3 and make motor3 stop
            console.log('motor 3 stop');
            motor3.stop();
            count_motor3_forward = 0;
            count_motor3_reverse = 0;
            
          }

          //moving motor 4 

          if (handvelocity2 > 10) {
            //moving forward, no reverse count
            count_motor4_reverse = 0;
            //setting the count condition before motor
            // moves
            if (count_motor4_forward == 30){
              console.log('motor 4 go forward');
              motor4.forward(255);
              //reset the count so that a new batch of 
              //frames can be processed
              
              count_motor4_forward = 0;
            } else {
            //during the time that the next 30 are 
            //processed, we want to keep the same state of
            //the motor
            console.log('motor 4 keep moving forward');
            }
          } else if (handvelocity2 < -10){
            //moving reverse, no forward count
             count_motor4_forward  = 0;
            //setting the count condition before motor moves
            if (count_motor4_reverse ==30){
              console.log('motor 4 go reverse');
              motor4.reverse(255);
              //reset the count so that a new batch of frames
              //can be processed
              count_motor4_reverse = 0;
            } else {
            //during the time that the next 30 are processed,
            //we want to keep the same state of the motor
            console.log('motor 4 keep moving reverse');
            }
          } else {
            //when our hands stop, we want to reset the value
            //of counts for motor4 and make motor4 stop
            console.log('motor 4 stop');
            motor4.stop();
            count_motor4_forward = 0;
            count_motor4_reverse = 0;
            
          }

        } else {
          //if leap motion cannot detect our hands, we want 
          //all motors to stop and reset all counts
          count_motor1_forward = 0;
          count_motor1_reverse = 0;
          count_motor2_forward = 0;
          count_motor2_reverse = 0;
          count_motor3_forward = 0;
          count_motor3_reverse = 0;
          count_motor4_forward = 0;
          count_motor4_reverse = 0;

          console.log('no hands detected');
          motor1.stop();
          motor2.stop();
          motor3.stop();
          motor4.stop();
          }
        }
    );
});

//Initialize the connection of the Leap Motion Controller
controllerLM.connect();

//Redefining motor components and setting the motors to stop upon
//termination of the code, defined by the exit event on the Arudino
//board
board.on("exit", function() {

  var motor1 = new five.Motor({
      pins: { pwm: 11 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 2, b: 3 }
    });

    var motor2 = new five.Motor({
      pins: { pwm: 3 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 1, b: 4 }
    });

    var motor3 = new five.Motor({
      pins: { pwm: 6 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 5, b: 7 }
    });

    var motor4 = new five.Motor({
      pins: { pwm: 5 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 0, b: 6 }
    });
  
  motor1.stop();
  motor2.stop();
  motor3.stop();
  motor4.stop();
  
  

});





