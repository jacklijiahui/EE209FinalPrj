//requiring mathjs node module to perform mathematical calculation
const math = require('mathjs');

function Transform_Matrices_Eval(a_0, alpha_0, d_1, theta_1, a_1,
								alpha_1, d_2, theta_2, a_2, 
								alpha_2, d_3, theta_3, a_3, alpha_3, 
								d_4, theta_4, a_4, alpha_4, d_5, 
								theta_5){

	const equations = require('./DH_equations');
	const T_1_0_equation = equations.T_1_0_function;
	const T_2_1_equation = equations.T_2_1_function;
	const T_3_2_equation = equations.T_3_2_function;
	const T_4_3_equation = equations.T_4_3_function;
	const T_5_4_equation = equations.T_5_4_function;
	
	let Transform_matrix_1_0  =  T_1_0_equation(a_0,alpha_0,
								d_1,theta_1);

	let Transform_matrix_2_1 = T_2_1_equation(a_1,alpha_1,
								d_2,theta_2);

	let Transform_matrix_2_0 = math.eval(`(${Transform_matrix_1_0})*
										(${Transform_matrix_2_1})`);

	let Transform_matrix_3_2 = T_3_2_equation(a_2,alpha_2,
								d_3,theta_3);

	let Transform_matrix_3_0 = math.eval(`(${Transform_matrix_2_0})*
										(${Transform_matrix_3_2})`);

	let Transform_matrix_4_3 = T_4_3_equation(a_3,alpha_3,
								d_4,theta_4);

	let Transform_matrix_4_0 = math.eval(`(${Transform_matrix_3_0})*
										(${Transform_matrix_4_3})`);

	let Transform_matrix_5_4 = T_5_4_equation(a_4,alpha_4,
								d_5,theta_5);

	let Transform_matrix_5_0 = math.eval(`(${Transform_matrix_4_0})*
										(${Transform_matrix_5_4})`);

	return [Transform_matrix_1_0, Transform_matrix_2_1, 
			Transform_matrix_2_0, Transform_matrix_3_2,
			Transform_matrix_3_0, Transform_matrix_4_3, 
			Transform_matrix_4_0, Transform_matrix_5_4,
			Transform_matrix_5_0];
	}


function inverse_kinematics_1(a_0, alpha_0, d_1, theta_1, a_1,
								alpha_1, d_2, theta_2, a_2, 
								alpha_2){

	const equations = require('./DH_equations');
	const T_1_0_equation = equations.T_1_0_function;
	const T_2_1_equation = equations.T_2_1_function;

	let IK_1_0  =  T_1_0_equation(a_0,alpha_0,
								d_1,theta_1);

	let IK_2_1 = T_2_1_equation(a_1,alpha_1,
								d_2,theta_2);

	let IK_2_0 = math.eval(`(${IK_1_0})*(${IK_2_1})`);

	return [IK_2_0];
	}


function inverse_kinematics_2(a_0, alpha_0, d_1, theta_1, a_1,
								alpha_1, d_2, theta_2, a_2, 
								alpha_2d_3, theta_3, a_3, alpha_3
								d_4, theta_4, a_4, alpha_4){

	const equations = require('./DH_equations');
	const T_1_0_equation = equations.T_1_0_function;
	const T_2_1_equation = equations.T_2_1_function;
	const T_3_2_equation = equations.T_3_2_function;
	const T_4_3_equation = equations.T_4_3_function;
	
	
	
	let IK_1_0  =  T_1_0_equation(a_0,alpha_0,
								d_1,theta_1);

	let IK_2_1 = T_2_1_equation(a_1,alpha_1,
								d_2,theta_2);

	let IK_2_0 = math.eval(`(${IK_1_0}*(${IK_2_1})`);

	let IK_3_2 = T_3_2_equation(a_2,alpha_2,
								d_3,theta_3);

	let IK_3_0 = math.eval(`(${IK_2_0})* (${IK_3_2})`);

	let IK_4_3 = T_4_3_equation(a_3,alpha_3,
								d_4,theta_4);

	let IK_4_0 = math.eval(`(${IK_3_0})*(${IK_4_3})`);

	return [IK_4_0];

	}


module.exports = {
	Transform_Matrices_Eval,
	inverse_kinematics_1,
	inverse_kinematics_2}
}
