var N1, N2, N3, N4, N5, N6, N7, N8;
var N9 = 15; // N9=NO. OF MASTER STATIONS
var flatteningFactor = C0 = 1 / 298.26;
var A0 = -1;
var PI = 4. * Math.atan(1);
var TP = PI + PI;
var RD = PI / 180;
var G$ = [];
var AN;
var C0$;
var C$;
var C;
var F0;
var N = 0;
var I$;
var L;
var A$;
var B$;
var B;
var B_arr = [];
var I9$;
var N0;
var P0;
var L0;
var W$ = [];
var D9_arr = [];
var P1_arr = [];
var L1_arr = [];
var G1$;
var G2$;
var D_arr = [];
var X;
var S;
var H;
var M0;
var V;
var P_arr = [];
var L_arr = [];
var A = 0;
var A_arr = [];
var A1;
var B1;
var C1;
var A2;
var B2;
var C2;
var E1;
var E2;
var K;
var R;
var YY = 0;
var XX = 0;
var ZZ = 0;
var G_arr2 = [];
var G_arr = [0, 0];
var Z;
var Z_arr = [];
var S0;
var P1;
var P1_arr = [];
var L1;
var L1_arr = [];
var Z1 = 0;
var Z8;
var Z9;
var P8;
var P9;
var M;
var D;
var P;
var S1;
var D0;
var U = 0;
var W = 0;
var Y = 0;
var S2;
var S8;
var S9;
var P2;
var P2_arr = [];
var S3;
var L2;
var Z2;
var P$;
var F1 = 1;
var F2 = 1;
//var ITD = [];
var GRI;
var T = 0;
var T_arr = [];
var C0;
var traceList = '';

function ItdValidContinue() {
	traceList += ", " + arguments.callee.name;
	A_arr[I] = A / 21295.8736;
}

function logVals(calledFromLine) {
	console.log("Called from line " + calledFromLine);
	console.log("A=" + A);
	console.log("A_arr=" + A_arr);
	console.log("A1=" + A1);
	console.log("A0=" + A0);
	console.log("A$=" + A$);
	console.log("A2=" + A2);
	console.log("AN=" + AN);

	console.log("B$=" + B$);
	console.log("B=" + B);
	console.log("B_arr=" + B_arr);
	console.log("B1=" + B1);
	console.log("B2=" + B2);

	console.log("C0$=" + C0$);
	console.log("C$=" + C$);
	console.log("C=" + C);
	console.log("C2=" + C2);
	console.log("C0=" + C0);
	console.log("C1=" + C1);

	console.log("D_arr=" + D_arr);
	console.log("D9_arr=" + D9_arr);
	console.log("D0=" + D0);
	console.log("D=" + D);

	console.log("E1=" + E1);
	console.log("E2=" + E2);

	console.log("flatteningFactor = " + flatteningFactor);
	console.log("F0=" + F0);
	console.log("F1=" + F1);
	console.log("F2=" + F2);

	console.log("G1$=" + G1$);
	console.log("G2$=" + G2$);
	console.log("G=" + G);
	console.log("G_arr=" + G_arr);
	console.log("GRI=" + GRI);
	console.log("G$ = " + G$);

	console.log("H=" + H);

	console.log("I$=" + I$);
	console.log("I9$=" + I9$);

	console.log("K=" + K);

	console.log("L=" + L);
	console.log("L0=" + L0);
	console.log("L_arr=" + L_arr);
	console.log("L1_arr=" + L1_arr);
	console.log("L1=" + L1);
	console.log("L2=" + L2);

	console.log("M0=" + M0);
	console.log("M=" + M);

	console.log("N0=" + N0);
	console.log("N=" + N);
	console.log("N1=" + N1);
	console.log("N2=" + N2);
	console.log("N3=" + N3);
	console.log("N4=" + N4);
	console.log("N5=" + N5);
	console.log("N6=" + N6);
	console.log("N7=" + N7);
	console.log("N8=" + N8);
	console.log("N9=" + N9);

	console.log("PI=" + P1);
	console.log("P0=" + P0);
	console.log("P1=" + P1);
	console.log("P1_arr=" + P1_arr);
	console.log("P_arr=" + P_arr);
	console.log("P=" + P);
	console.log("P8=" + P8);
	console.log("P9=" + P9);
	console.log("P2=" + P2);
	console.log("P2_arr=" + P2_arr);
	console.log("P$=" + P$);

	console.log("R=" + R);
	console.log("RD=" + RD);

	console.log("S=" + S);
	console.log("S0=" + S0);
	console.log("S1=" + S1);
	console.log("S2=" + S2);
	console.log("S3=" + S3);
	console.log("S8=" + S8);
	console.log("S9=" + S9);

	console.log("TP=" + TP);
	console.log("T=" + T);
	console.log("T_arr=" + T_arr);

	console.log("traceList=" + traceList);

	console.log("U=" + U);

	console.log("V=" + V);

	console.log("W$=" + W$);
	console.log("W=" + W);

	console.log("X=" + X);
	console.log("XX=" + XX);

	console.log("YY=" + YY);
	console.log("Y=" + Y);

	console.log("ZZ=" + ZZ);
	console.log("Z=" + Z);
	console.log("Z_arr=" + Z_arr);
	console.log("Z1=" + Z1);
	console.log("Z2=" + Z2);
	console.log("Z8=" + Z8);
	console.log("Z9=" + Z9);
}

// was basic subroutine 1270
function buildString() {

}

function convertLoranToLL(GRI, loran1, loran2) {
	traceList += ", " + arguments.callee.name;
	I9$ = GRI;
	//F0 = 1;

	// find sub (slave) towers 
	slave1 = findSlave(GRI, loran1);
	slave2 = findSlave(GRI, loran2);

	// get coords and delays for all towers in this GRI triad
	towersObj = getTowerData();
	P0 = towersObj[GRI].lat;
	L0 = towersObj[GRI].long;

	// assign values to someglobal variables
	G1$ = GRI + slave1;
	G2$ = GRI + slave2;
	G$.push(G1$, G2$);
	D9_arr.push(towersObj[GRI][slave1]['delay']);
	P1 = towersObj[GRI][slave1]['lat'];
	L1 = towersObj[GRI][slave1]['long'];
	P2 = towersObj[GRI][slave2]['lat'];
	L2 = towersObj[GRI][slave2]['long'];
	P1_arr.push(P1);
	L1_arr.push(L1);
	D9_arr.push(towersObj[GRI][slave2]['delay']);
	P1_arr.push(P2);
	L1_arr.push(L2);



	for (let N = 0; N < 2; N++) {
		for (let I = 0; I < 2; I++) {

			D_arr[N] = D9_arr[I];
			X = P0;
			calculateV();
			X = V * RD;
			convertX();
			calculateV();

			if (typeof (P_arr[0] == 'undefined')) { P_arr[0] = []; }
			P_arr[0] = { [N]: X }
			X = L0;
			calculateV();
			//X = V * RD;
			//convertX();
			if (typeof (L_arr[0] == 'undefined')) { L_arr[0] = []; }
			L_arr[0] = { [N]: V * RD }
			X = P1_arr[I];
			X = V * RD;
			calculateV();
			X = V * RD;
			convertX();
			if (typeof (P_arr[1] == 'undefined')) { P_arr[1] = []; }
			P_arr[1] = { [N]: X }
			X = L1_arr[I];
			calculateV();
			if (typeof (L_arr[1] == 'undefined')) { L_arr[1] = []; }
			L_arr[1] = { [N]: V * RD };
		}
	}

	F1 = 1;
	F2 = 1;
	//IF G1$=G2$ THEN GOTO 300
	if (P_arr[0][0] == P_arr[0][1] && L_arr[0][0] + L_arr[0][1]) {
		F2 = -1;
	}
	else if (P_arr[0][0] == P_arr[1][1] && L_arr[0][0] + L_arr[1][1]) {
		F1 = -1;
	}
	else if (P_arr[1][0] == P_arr[1][1] && L_arr[1][0] + L_arr[1][1]) {
		F2 = 2;
	}
	else if (P_arr[1][0] = P_arr[0][1] && L_arr[1][0] + L_arr[0][1]) {
		$error = false;
	} else {
		$error = "No Triplet Possible";
	}

	reverseSolution();
	A_arr[0] = A / 21295.8736;
	B_arr[0] = S0;
	Z_arr[0] = [];
	Z_arr[0].push(Z1);
	Z_arr[0].push(Z1);
	G_arr2[0] = 0;
	calculateT(0);
	A = loran1 + G_arr2[0] - D_arr[0] - T;

	reverseSolution();
	A = loran1 + G_arr2[0] - D_arr[0] - T;
	A_arr[1] = loran2 / 21295.8736;
	Z_arr[1] = [];
	Z_arr[1].push(Z2);
	B_arr[1] = S0;
	Z_arr[1].push(Z2);
	calculateT(1);
	A = loran1 + G_arr2[1] - D_arr[1] - T;

	fixingRoutine();
	//var variables = ""
	logVals(330);
}

//FIXING ROUTINE - was basic subroutine 770
function fixingRoutine() {
	traceList += ", " + arguments.callee.name;
	A1 = F1 * Math.sin(A_arr[0]);
	B1 = Math.cos(A_arr[0]) - Math.cos(B_arr[0]);
	C1 = Math.sin(B_arr[0]);
	A2 = F2 * Math.sin(A_arr[1]);
	B2 = Math.cos(A_arr[1]) - Math.cos(B_arr[1]);
	C2 = Math.sin(B_arr[1]);
	E1 = Z_arr[0][0];

	if (F1 == -1) {
		E1 = Z_arr[1][0];
	}

	E2 = Z_arr[0][1];

	if (F2 == -1) {
		E2 = Z_arr[1][1];
	}

	C = B1 * C2 * Math.cos(E2) - B2 * C1 * Math.cos(E1);
	S = B1 * C2 * Math.sin(E2) - B2 * C1 * Math.sin(E1);
	K = B2 * A1 - B1 * A2;
	R = Math.sqrt(C * C + S * S);
	YY = S;
	XX = C;
	//logVals(359);
	//P1;
	getQatn();
	G = AN;
	XX = K / R;
	getAcos();
	Z = G + A0 * AN;
	YY = B2;
	XX = C2 * Math.cos(Z - E2) + A2;
	getQatn();
	S0 = AN;

	if (F2 == 1) {
		P1 = P_arr[0];
	}

	L1 = L_arr[0];

	if (F2 == -1) {
		P1 = P_arr[1];
	}
	L1 = L_arr[1];

	Z1 = Z;

	directSolution();
	//console.log(directVals);
	// get from directSolution(): P2, L2 
	P0 = P2;
	L0 = L2;
	P = Math.atan(Math.tan(P0) / (1 - flatteningFactor));
	P = P / RD;
	X = L0 / RD;
	M0 = 360;

	//GOSUB 1250: The BASIC program implies that we must call mConvert() and then getQatn() 
	// but I believe it's unnecessary to call getQatn() here
	mConvert();
	L = X;
	//IF L>180 THEN L=L-360
	L = L > 180 ? L - 360 : L;
	X = P;
	xConvert();
	P$ = C$;
	X = L;
	C$ = xConvert();
	//logVals(415);
}

// was basic subroutine 1260
function getQatn() {
	traceList += ", " + arguments.callee.name;
	let xxBoola = XX == 0 ? -1 : 0;
	let xxBoolb = XX < 0 ? -1 : 0;
	console.log("XX=" + XX, "YY=" + YY);
	AN = Math.atan(YY / (XX - 0.000000001 * xxBoola)) - Math.PI * xxBoolb;
}

// was basic subroutine 1350
function getAcos() {
	traceList += ", " + arguments.callee.name;
	let xxBoola = XX == 0 ? -1 : 0;
	let xxBoolb = XX < 0 ? -1 : 0;
	AN = Math.atan(Math.sqrt((1 - XX * XX) / (XX - 0.000000001 * xxBoola))) - Math.PI * (xxBoolb);
}

function getAsin() {
	traceList += ", " + arguments.callee.name;
	ZZ = Math.sqrt(1 - XX * XX);
	let zzBool = ZZ == 0 ? -1 : 0;
	AN = Math.atan(XX / (ZZ - 0.000000001 * zzBool));
}

// was basic subroutine 1250
function mConvert() {
	traceList += ", " + arguments.callee.name;
	X = X - M0 * parseInt(X / M0);
}

function convertX() {
	traceList += ", " + arguments.callee.name;
	X = Math.atan((1 - C0) * Math.tan(X));
}

// was basic subroutine 1360
function calculateV() {
	traceList += ", " + arguments.callee.name;
	S = Math.sign(X);
	X = Math.abs(X);
	H = parseInt(X);
	M0 = 1;
	modFunction();
	V = X * 100;
	X = V;
	modFunction();
	V = S * ((100 * X / 60 + parseInt(V)) / 60 + H);
}

function calculateT(iter) {
	T = 21282.3593 * S0
	if (T >= 537) {
		P = 129.04398 / T - .40758 + .000645765438 * T;
	}
	if (T < 537) {
		P = 2.7412979 / T - .00032774624 * T
	}
	T_arr[iter] = T + P;
}

function modFunction() {
	traceList += ", " + arguments.callee.name;
	X = X - M0 * parseInt(X / M0);
}

// was basic subroutine 1280
function xConvert() {
	traceList += ", " + arguments.callee.name;
	C$ = " ";

	if (X < 0) {
		C$ = "-";
		X = -X;
	}

	X = X + 1 / 7200;
	X0 = parseInt(X);
	C$ = C$ + String(X0) + " ";
	X = 60 * (X - X0);
	X0 = parseInt(X);
	X$ = String(100 + X0);
	let Xlen0 = X$.length;
	C$ = C$ + X$.slice(Xlen0, -2) + " ";
	X = 60 * (X - X0);
	X0 = parseInt(X);
	X$ = String(100 + X0);
	let Xlen1 = X$.length;
	C$ = C$ + X$.slice(Xlen1, -2) + " ";

	return C$;
}

// Direct Solution - was basic subroutine 550
function directSolution() {
	traceList += ", " + arguments.callee.name;
	Z8 = Math.sin(Z1);
	Z9 = Math.cos(Z1);
	P8 = Math.sin(P1);
	P9 = Math.cos(P1);
	M = -Z8 * P9;
	C1 = flatteningFactor * M;
	C2 = flatteningFactor * (1 - M * M) / 4;
	D = (1 - C2) * (1 - C2 - C1 * M);
	P = C2 * (1 + C1 * M / 2) / D;
	N = P9 * Z9;
	YY = N;
	XX = P8;

	getQatn();
	S1 = AN;
	D0 = S0 / D;
	U = 2 * (S1 - D0);
	W = 1 - 2 * P * Math.cos(U);
	V = Math.cos(U + D0);

	X = C2 * C2 * Math.sin(D0) * Math.cos(D0 * (2 * V * V - 1));
	Y = 2 * P * V * W * Math.sin(D0);
	S2 = D0 + X - Y;
	S8 = Math.sin(S2);
	S9 = Math.cos(S2);
	K = Math.sqrt(M * M + (N * S9 - P8 * S8) ** 2);

	P2 = Math.atan((P8 * S9 + N * S8) / K);
	YY = -S8 * Z8;
	XX = P9 * S9 - P8 * S8 * Z9;

	getQatn();
	S3 = AN;
	H = C1 * (1 - C2) * S2 - C1 * C2 * S8 * Math.cos(S1 + S1 - S2);
	L2 = L1 + S3 - H;
	YY = -M;
	XX = -(N * S9 - P8 * S8);

	getQatn();
	Z2 = AN;
}

// reverse solution - was basic subroutine 650
function reverseSolution() {
	traceList += ", " + arguments.callee.name;
	L3 = L2 - L1;
	P3 = (P2 - P1) / 2;
	P4 = (P1 + P2) / 2;
	P6 = Math.sin(P3);
	P7 = Math.cos(P3);
	P8 = Math.sin(P4);
	P9 = Math.cos(P4);
	H = P7 * P7 - P8 * P8;
	let p6sq = P6 * P6;
	L = P6 * P6 + H * Math.sin(L3 / 2) ** 2;
	XX = Math.sqrt(L);
	//getAsin();
	ZZ = Math.sqrt(1 - XX * XX);
	AN = Math.atan(XX / (ZZ - 1e-9 * (ZZ = 0)));
	D0 = 2 * AN;
	U = 2 * P8 * P8 * P7 * P7 / (1 - L);
	V = 2 * P6 * P6 * P9 * P9 / L;
	X = U + V;
	Y = U - V;
	T = D0 / Math.sin(D0);
	D = 4 * T * T;

	E = 2 * Math.cos(D0);
	A = D * E;
	C = T - (A - E) / 2;
	N1 = X * (A + C * X);
	B = D + D;
	N2 = Y * (B + E * Y);
	N3 = D * X * Y;

	D2 = flatteningFactor * flatteningFactor * (N1 - N2 + N3) / 64;
	D1 = flatteningFactor * (T * X - Y) / 4;
	S0 = (T - D1 + D2) * Math.sin(D0);

	M = 32 * T - (20 * T - A) * X - (B + 4) * Y;
	F = Y + Y - E * (4 - X);
	G = flatteningFactor * (T / 2 + flatteningFactor * M / 64);
	Q = -F * G * Math.tan(L3) / 4;

	L4 = (L3 + Q) / 2;
	L8 = Math.sin(L4);
	L9 = Math.cos(L4);

	YY = P6 * L9;
	XX = P9 * L8;
	getQatn();
	T1 = AN;
	YY = -P7 * L9;
	XX = P8 * L8;
	getQatn();
	T2 = AN;

	M0 = TP;
	X = T1 + T2;
	mConvert();
	Z1 = X;
	X = T1 - T2;
	mConvert();
	Z2 = X;
}

function getTowerData() {
	let ret = {};
	towerData = {
		"5930": {
			"lat": 46.4827199,
			"long": 67.5537713,
			"X": {
				"delay": 11000,
				"lat": 41.151193,
				"long": 69.583909
			},
			"Y": {
				"delay": 25000,
				"lat": 46.46463218,
				"long": 53.102816
			}
		},
		"7980": {
			"lat": 30.593874,
			"long": 85.1009305,
			"W": {
				"delay": 11000,
				"lat": 30.4333018,
				"long": 90.49436
			},
			"X": {
				"delay": 23000,
				"lat": 26.3155006,
				"long": 97.500009
			},
			"Y": {
				"delay": 43000,
				"lat": 27.0158393,
				"long": 80.0653429
			},
			"Z": {
				"delay": 59000,
				"lat": 34.0346081,
				"long": 77.5446654
			}
		},
		"9960": {
			"lat": 42.4250603,
			"long": 76.4933862,
			"W": {
				"delay": 11000,
				"lat": 46.4827199,
				"long": 67.5537713
			},
			"X": {
				"delay": 25000,
				"lat": 41.151193,
				"long": 69.583909
			},
			"Y": {
				"delay": 39000,
				"lat": 34.0346081,
				"long": 77.5446654
			},
			"Z": {
				"delay": 54000,
				"lat": 39.510754,
				"long": 87.291214
			}
		}

	}

	ret = towerData;
	return ret;
}

/* 
	The code below is adapted from the Perl code 	
*/
function findSlave(GRI, loranDelay) {
	let ret = "";

	if (GRI == "9960") {
		if (loranDelay >= 11000 && loranDelay < 25000) {
			ret = "W";
		}
		else if (loranDelay >= 25000 && loranDelay < 39000) {
			ret = "X";
		}
		else if (loranDelay >= 39000 && loranDelay < 54000) {
			ret = "Y";
		}
		else if (loranDelay >= 54000 && loranDelay < 68000) {
			ret = "Z";
		}
	}
	else if (GRI == "7980") {
		if (loranDelay >= 11000 && loranDelay < 23000) {
			ret = "W";
		}
		else if (loranDelay >= 23000 && loranDelay < 43000) {
			ret = "X";
		}
		else if (loranDelay >= 43000 && loranDelay < 59000) {
			ret = "Y";
		}
		else if (loranDelay >= 59000 && loranDelay < 73000) {
			ret = "Z";
		}
	}
	else if (GRI == "5930") {
		if (loranDelay >= 11000 && loranDelay < 25000) {
			ret = "X";
		}
		else if (loranDelay >= 25000 && loranDelay < 39000) {
			ret = "Y";
		}
	}
	return ret;
}

GRI = '9960';
var loran1 = 26600;
var loran2 = 41400;

convertLoranToLL(GRI, loran1, loran2);
console.log("LAT  = " + P$ + ", LONG = " + C$);