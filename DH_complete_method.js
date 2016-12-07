//requiring mathjs node module to perform mathematical calculation
const math = require('mathjs');
const leapmotion = require('leapjs');

///FORWARD KINEMATICS
const DHmatrices = require('./DH_complete_equations');
const DHmatrixequation = DHmatrices.Transform_Matrices_Eval;
const invkinequation1 = DHmatrices.inverse_kinematics_1;
const invkinequation2 = DHmatrices.inverse_kineamtics_2;

let a_0_input     = 0,
	alpha_0_input = 0;
	d_1_input = 2,
	theta_1_input,

	a_1_input = 0,
	alpha_1_input = 0,
	d_2_input = 10,
	theta_2_input = 0,

	a_2_input = 5,
	alpha_2_input = 0,
	d_3_input = 0,
	theta_3_input = 0,

	a_3_input = 0,
	alpha_3_input = 90,
	d_4_input = 10.5,
	theta_4_input = 90,

	a_4_input = 2,
	alpha_4_input = 0,
	d_5_input = 3.5,
	theta_5_input = 0;


let ans =  DH_matrices(a_0_input,alpha_0_input,d_1_input,
					theta_1_input,a_1_input,alpha_1_input,
					d_2_input,theta_2_input, a_2_input, 
					alpha_2_input, d_3_input, theta_3_input,
					a_3_input, alpha_3_input, d_4_input, 
					theta_4_input, a_4_input, alpha_4_input, 
					d_5_input, theta_5_input);

let T_1_0_eval = ans[0];
let T_2_1_eval = ans[1];
let T_2_0_eval = ans[2];
let T_3_2_eval = ans[3];
let T_3_0_eval = ans[4];
let T_4_3_eval = ans[5];
let T_4_0_eval = ans[6];
let T_5_4_eval = ans[7];
let T_5_0_eval = ans[8];

//////INVERSE KINEMATICS


///DETERMINING THETA 1
//console.log('T_5_0 = ', T_5_0_eval);

let T_3_1_G_0 = 0;
let T_3_2_G_0 = 0;
let T_3_3_G_0 = 1;

let N_5_0_K_0 = math.matrix([T_3_1_G_0, T_3_2_G_0, T_3_3_G_0]);

//console.log('N_6_0_K_0 = ', N_6_0_K_0);

let P_5_4_K_0 = math.multiply(N_5_0_K_0, d_5_input);
console.log('P_5_4_K_0 = ', P_5_4_K_0);

//CHECK SYNTAX
// let T_4_1_G_0 = frame.hands[0].palmPosition[0];
// let T_4_2_G_0 = frame.hands[1].palmPosition[1];
// let T_4_3_G_0 = frame.hands[2].palmPosition[2];

let P_5_0_K_0 = math.matrix([T_4_1_G_0, T_4_2_G_0, T_4_3_G_0]);
console.log('P_5_0_K_0 = ', P_5_0_K_0);

let P_4_0_K_0 = math.subtract(P_5_0_K_0, P_5_4_K_0);
console.log('P_4_0_K_0 = ', P_4_0_K_0);

let P_4_0_K_0_x = math.subset(P_4_0_K_0, math.index(0));
let P_4_0_K_0_y = math.subset(P_4_0_K_0, math.index(1));

if (P_4_0_K_0_y > 0) {
	
	var theta_1 = math.atan2(P_4_0_K_0_y, P_4_0_K_0_x);

} else {
	var theta_1 = math.atan2(P_4_0_K_0_y, P_4_0_K_0_x) + math.pi;
}

console.log('theta 1 =', theta_1);
theta_2_joint3 = 0;

let invans1 = invkinequation1(a_0_input,alpha_0_input, a_1_input, 
							alpha_1_input, d_1_input, theta_1, d_2_input,
							alpha_2_input, a_2_input, theta_2_joint3);
let T_2_0_IK = invans1;

//DETERMINING THETA 3

//console.log('T_2_0_IK = ', T_2_0_IK);

let T_4_1_2_0 = math.subset(T_2_0_IK, math.index(0,3));
let T_4_2_2_0 = math.subset(T_2_0_IK, math.index(1,3));
let T_4_3_2_0 = math.subset(T_2_0_IK, math.index(2,3));

let P_2_0_K_0 = math.matrix([T_4_1_2_0, T_4_2_2_0, T_4_3_2_0]);
console.log('P_2_0_K_0 = ', P_2_0_K_0);

let P_4_2_K_0 = math.subtract(P_4_0_K_0, P_2_0_K_0);
P_4_2_K_0_mag = math.norm(P_4_2_K_0);
P_4_2_K_0_mag_sq = math.square(P_4_2_K_0_mag);

let phi_pre_1 = (math.divide((math.square(d_4_input) - 
			math.square(a_2_input) + P_4_2_K_0_mag_sq),
			(2*P_4_2_K_0_mag*d_4_input)));

console.log('phi_pre_1',phi_pre_1);

if (a_2_input !== 0) {

	var phi_pre_2 =  math.divide((math.subtract(P_4_2_K_0_mag, 
				(math.divide(((math.square(d_4_input)) - 
				(math.square(a_2_input)) + P_4_2_K_0_mag_sq), 
				2*P_4_2_K_0_mag)))),a_2_input);

	var phi_pre_4 = math.asin(phi_pre_2);
} else {
	var phi_pre_2 = 0;
	var phi_pre_4 = 0;
}


console.log('phi_pre_2',phi_pre_2);

let phi_pre_3 = math.asin(phi_pre_1);
//let phi_pre_4 = math.asin(phi_pre_2);

console.log('phi_pre_3', phi_pre_3);

let phi = math.add(phi_pre_3,phi_pre_4); 

console.log('phi = ',phi);

if (phi > 180) {
	theta_3 = math.add(math.pi, phi);
} else {
	theta_3 = math.subtract(math.pi, phi);
}

console.log('theta 3 = ',theta_3);

///Determining Theta 2

let invans2 = invkinequation1(a_0_input,alpha_0_input, a_1_input, 
							alpha_1_input, d_1_input, theta_1, d_2_input,
							alpha_2_input, a_2_input, theta_2_input);
let T_2_0_IK_2 = invans2;

let R_2_0_IK_1_1 = math.subset(T_2_0_IK_2, math.index(0,0));
let R_2_0_IK_1_2 = math.subset(T_2_0_IK_2, math.index(0,1));
let R_2_0_IK_1_3 = math.subset(T_2_0_IK_2, math.index(0,2));
let R_2_0_IK_2_1 = math.subset(T_2_0_IK_2, math.index(1,0));
let R_2_0_IK_2_2 = math.subset(T_2_0_IK_2, math.index(1,1));
let R_2_0_IK_2_3 = math.subset(T_2_0_IK_2, math.index(1,2));
let R_2_0_IK_3_1 = math.subset(T_2_0_IK_2, math.index(2,0));
let R_2_0_IK_3_2 = math.subset(T_2_0_IK_2, math.index(2,1));
let R_2_0_IK_3_3 = math.subset(T_2_0_IK_2, math.index(2,2));

let R_2_0_IK = math.matrix([R_2_0_IK_1_1, R_2_0_IK_1_2, R_2_0_IK_1_3, 
							R_2_0_IK_2_1, R_2_0_IK_2_2, R_2_0_IK_2_3, 
							R_2_0_IK_3_1, R_2_0_IK_3_2, R_2_0_IK_3_3]);


let P_4_2_K_2 = math.multiply(R_2_0_IK, P_4_2_K_0);

let P_4_2_K_2_x = math.subset(P_4_2_K_2, math.index(0));
let P_4_2_K_2_y = math.subset(P_4_2_K_2, math.index(1));

let beta_1 = math.atan2(P_4_2_K_2_x,P_4_2_K_2_y);

if (a_2_input !== 0) {

	var beta_2_pre_1 =  math.divide((math.square(a_2_input) - P_4_2_K_0_mag_sq
							+ math.square(d_4_input)), (2*d_4_input*a_2_input));

	beta_2_pre_2 = math.asin(beta_2_pre_1);

} else {
	var beta_2_pre_1 = 0;
	var beta_2_pre_2 = 0;
}

let beta_2_pre_3 = math.divide((math.subtract((d_4_input), (math.divide((math.square(a_2_input) - P_4_2_K_0_mag_sq 
					+ math.square(d_4_input)),(2*d_4_input))))), P_4_2_K_0_mag)

let beta_2_pre_4 = math.asin(beta_2_pre_3);

let beta_2 = beta_2_pre_2 + beta_2_pre_4;

if (P_4_2_K_2_x > 0) {
	
	var theta_2 = math.divide((math.pi),2) - (math.abs(beta_1) + beta_2);

} else {
	var theta_2 = math.divide((math.pi),2) - (math.abs(beta_1) - beta_2);

////Determining Theta 4 and theta 5

// let theta_4_joint5 = 0;

// let invans3 = invkinequation2(a_0_input,alpha_0_input, a_1_input, 
// 							alpha_1_input, d_1_input, theta_1, d_2_input,
// 							alpha_2_input, a_2_input, theta_2, d_3_input,
// 							alpha_3_input, a_3_input, theta_3, d_4_input,
// 							alpha_4_input, a_4_input, theta_4_joint5);

// let T_4_0_IK = invans3;

// let T_4_0_IK_1_3 = math.subset(T_4_0_IK, math.index(0,2));
// let T_4_0_IK_2_3 = math.subset(T_4_0_IK, math.index(1,2));
// let T_4_0_IK_3_3 = math.subset(T_4_0_IK, math.index(2,2));

// let N_4_0_K_0 = math.matrix([T_4_0_IK_1_3, T_4_0_IK_2_3, T_4_0_IK_3_3]);

// let theta_5 = math.pi - math.acos(N_4_0_K_0, N_5_0_K_0);

////Determining Theta 4 and theta 5

let R_6_4_1_1 = math.multiply(math.cos(theta_4_input), math.cos(theta_5_input));
let R_6_4_1_2 = 0-math.sin(theta_4_input);
let R_6_4_1_3 = math.multiply(math.cos(theta_4_input), math.sin(theta_5_input));
let R_6_4_2_1 = math.multiply(math.cos(theta_5_input), math.sin(theta_4_input));
let R_6_4_2_2 = math.cos(theta_4_input);
let R_6_4_2_3 = math.multiply(math.sin(theta_4_input), math.sin(theta_5_input));
let R_6_4_3_1 = 0-math.sin(theta_5_input);
let R_6_4_3_2 = 0;
let R_6_4_3_3 = math.cos(theta_5_input);

let R_6_4 = math.matrix([R_6_4_1_1, R_6_4_1_2, R_6_4_1_3,
						R_6_4_2_1, R_6_4_2_2, R_6_4_2_3,
						R_6_4_3_1, R_6_4_3_2, R_6_4_3_3]);

var theta_4 = math.atan2(0-R_6_4_3_1, R_6_4_3_3);
var theta_5 = math.atan2(0-R_6_4_1_2, R_6_4_2_2);



















