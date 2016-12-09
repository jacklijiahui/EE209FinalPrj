//JavaScript code for general mathematical process of 
//Bresenham's Line Based Algorithm. This is only the mathematical 
//process of Bresenham's algorithm and does not implement any
//writing or replication process
const math = require('mathjs');

let a1 = 24.7531651668;
let a2 = 25.5661616546;
let a3 = 25.7;
let a4 = 26.7;

function calcStraightLine(in1, in2, in3, in4) {
    var coordinatesArray = new Array();
    console.log(coordinatesArray);
    // Translate coordinates


    var x1 = 5 * (math.round(5 * in1) / 5);
    var y1 = 5 * (math.round(5 * in2) / 5);
    var x2 = 5 * (math.round(5 * in3) / 5);
    var y2 = 5 * (math.round(5 * in4) / 5);


    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;

    // Set first coordinates
    coordinatesArray.push(x1);
    coordinatesArray.push(y1);

    // Main loop
    while (!((x1 == x2) && (y1 == y2))) {
        var e2 = err << 1;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
        // Set coordinates
        coordinatesArray.push(x1);
        coordinatesArray.push(y1);

    }
    // Return the result
    return coordinatesArray;
}

let ans = calcStraightLine(a1, a2, a3, a4);
let ans2 = math.divide(ans, 5);
console.log(ans2);
