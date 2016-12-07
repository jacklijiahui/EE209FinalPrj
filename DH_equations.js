var math = require('mathjs');

function T_1_0_function(a_0,alpha_0,d_1,theta_1){
	//var theta_1 = Symbol([theta_1]);
	// element1  = math.eval('cos(' +theta_1+  ')');
	 let element1  = math.eval(`cos(${theta_1})`);
	 let element2  = math.eval(`-sin(${theta_1})`);
	 // console.log(typeof element2);
	 // element2 = element2 * -1
	 let element3  = 0;
	 let element4  = a_0;
	 let element5  = math.eval(`cos(${alpha_0})*sin(${theta_1})`);
	 let element6  = math.eval(`cos(${alpha_0})*cos(${theta_1})`);
	 let element7  = math.eval(`-sin(${alpha_0})`);
	 let element8  = math.eval(`-${d_1}*sin(${alpha_0})`);
	 let element9  = math.eval(`sin(${alpha_0})*sin(${theta_1})`);
	 let element10 = math.eval(`sin(${alpha_0})*cos(${theta_1})`);
	 let element11 = math.eval(`cos(${alpha_0})`);
	 let element12 = math.eval(`${d_1}*cos(${alpha_0})`);
	 let element13 = 0;
	 let element14 = 0;
	 let element15 = 0;
	 let element16 = 1;

	 let T_1_0_row_1 = math.matrix([element1,element2,
	 				element3,element4]);
	 let T_1_0_row_2 = math.matrix([element5,element6,
	 				element7,element8]);
	 let T_1_0_row_3 = math.matrix([element9,element10,
	 				element11,element12]);
	 let T_1_0_row_4 = math.matrix([element13,element14,
	 				element15,element16]);

	 return math.matrix([T_1_0_row_1,T_1_0_row_2, 
	 					T_1_0_row_3, T_1_0_row_4]);
 	}

function T_2_1_function(a_1,alpha_1,d_2,theta_2){

	 let element1  = math.eval(`cos(${theta_2})`);
	 let element2  = math.eval(`-sin(${theta_2})`);
	 let element3  = 0;
	 let element4  = a_1;
	 let element5  = math.eval(`cos(${alpha_1})*sin(${theta_2})`);
	 let element6  = math.eval(`cos(${alpha_1})*cos(${theta_2})`);
	 let element7  = math.eval(`-sin(${alpha_1})`);
	 let element8  = math.eval(`-${d_2}*sin(${alpha_1})`);
	 let element9  = math.eval(`sin(${alpha_1})*sin(${theta_2})`);
	 let element10 = math.eval(`sin(${alpha_1})*cos(${theta_2})`);
	 let element11 = math.eval(`cos(${alpha_1})`);
	 let element12 = math.eval(`${d_2}*cos(${alpha_1})`);
	 let element13 = 0;
	 let element14 = 0;
	 let element15 = 0;
	 let element16 = 1;

	 let T_2_1_row_1 = math.matrix([element1,element2,
	 				element3,element4]);
	 let T_2_1_row_2 = math.matrix([element5,element6,
	 				element7,element8]);
	 let T_2_1_row_3 = math.matrix([element9,element10,
	 				element11,element12]);
	 let T_2_1_row_4 = math.matrix([element13,element14,
	 				element15,element16]);

	 return math.matrix([T_2_1_row_1,T_2_1_row_2, 
	 					T_2_1_row_3, T_2_1_row_4]);
 	}

function T_3_2_function(a_2,alpha_2,d_3,theta_3){

	 let element1  = math.eval(`cos(${theta_3})`);
	 let element2  = math.eval(`-sin(${theta_3})`);
	 let element3  = 0;
	 let element4  = a_2;
	 let element5  = math.eval(`cos(${alpha_2})*sin(${theta_3})`);
	 let element6  = math.eval(`cos(${alpha_2})*cos(${theta_3})`);
	 let element7  = math.eval(`-sin(${alpha_2})`);
	 let element8  = math.eval(`-${d_3}*sin(${alpha_2})`);
	 let element9  = math.eval(`sin(${alpha_2})*sin(${theta_3})`);
	 let element10 = math.eval(`sin(${alpha_2})*cos(${theta_3})`);
	 let element11 = math.eval(`cos(${alpha_2})`);
	 let element12 = math.eval(`${d_3}*cos(${alpha_2})`);
	 let element13 = 0;
	 let element14 = 0;
	 let element15 = 0;
	 let element16 = 1;

	 let T_3_2_row_1 = math.matrix([element1,element2,
	 				element3,element4]);
	 let T_3_2_row_2 = math.matrix([element5,element6,
	 				element7,element8]);
	 let T_3_2_row_3 = math.matrix([element9,element10,
	 				element11,element12]);
	 let T_3_2_row_4 = math.matrix([element13,element14,
	 				element15,element16]);

	 return math.matrix([T_3_2_row_1,T_3_2_row_2, 
	 					T_3_2_row_3, T_3_2_row_4]);
 	}

function T_4_3_function(a_3,alpha_3,d_4,theta_4){

	 let element1  = math.eval(`cos(${theta_4})`);
	 let element2  = math.eval(`-sin(${theta_4})`);
	 let element3  = 0;
	 let element4  = a_3;
	 let element5  = math.eval(`cos(${alpha_3})*sin(${theta_4})`);
	 let element6  = math.eval(`cos(${alpha_3})*cos(${theta_4})`);
	 let element7  = math.eval(`-sin(${alpha_3})`);
	 let element8  = math.eval(`-${d_4}*sin(${alpha_3})`);
	 let element9  = math.eval(`sin(${alpha_3})*sin(${theta_4})`);
	 let element10 = math.eval(`sin(${alpha_3})*cos(${theta_4})`);
	 let element11 = math.eval(`cos(${alpha_3})`);
	 let element12 = math.eval(`${d_4}*cos(${alpha_3})`);
	 let element13 = 0;
	 let element14 = 0;
	 let element15 = 0;
	 let element16 = 1;

	 let T_4_3_row_1 = math.matrix([element1,element2,
	 				element3,element4]);
	 let T_4_3_row_2 = math.matrix([element5,element6,
	 				element7,element8]);
	 let T_4_3_row_3 = math.matrix([element9,element10,
	 				element11,element12]);
	 let T_4_3_row_4 = math.matrix([element13,element14,
	 				element15,element16]);

	 return math.matrix([T_4_3_row_1,T_4_3_row_2, 
	 					T_4_3_row_3, T_4_3_row_4]);
 	}

 function T_5_4_function(a_4,alpha_4,d_5,theta_5){

	 let element1  = math.eval(`cos(${theta_5})`);
	 let element2  = math.eval(`-sin(${theta_5})`);
	 let element3  = 0;
	 let element4  = a_4;
	 let element5  = math.eval(`cos(${alpha_4})*sin(${theta_5})`);
	 let element6  = math.eval(`cos(${alpha_4})*cos(${theta_5})`);
	 let element7  = math.eval(`-sin(${alpha_4})`);
	 let element8  = math.eval(`-${d_5}*sin(${alpha_4})`);
	 let element9  = math.eval(`sin(${alpha_4})*sin(${theta_5})`);
	 let element10 = math.eval(`sin(${alpha_4})*cos(${theta_5})`);
	 let element11 = math.eval(`cos(${alpha_4})`);
	 let element12 = math.eval(`${d_5}*cos(${alpha_4})`);
	 let element13 = 0;
	 let element14 = 0;
	 let element15 = 0;
	 let element16 = 1;

	 let T_5_4_row_1 = math.matrix([element1,element2,
	 				element3,element4]);
	 let T_5_4_row_2 = math.matrix([element5,element6,
	 				element7,element8]);
	 let T_5_4_row_3 = math.matrix([element9,element10,
	 				element11,element12]);
	 let T_5_4_row_4 = math.matrix([element13,element14,
	 				element15,element16]);

	 return math.matrix([T_5_4_row_1,T_5_4_row_2, 
	 					T_5_4_row_3, T_5_4_row_4]);
 	}

module.exports = {
	T_1_0_function,
	T_2_1_function,
	T_3_2_function,
	T_4_3_function,
	T_5_4_function
}
