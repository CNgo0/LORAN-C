var A2;
var A = 0;
var A_arr = [];
var A1;
var A$;
var AN;
var A0 = -1;

var B2;
var B1;
var B$;
var B;
var B_arr = [];

var C0;
var C1;
var C2;
var C0$;
var C$;
var C;

var D;
var D_arr = [];
var D9_arr = [];
var D0;

var E1;
var E2;

var F1 = 1;
var F2 = 1;
var C0 = 1 / 298.26;
var F0 = 0;

var GRI;
var G_arr = [];
var G1$;
var G2$;
var G$ = [];
var G;

var H;

var I$;
var I9$;

var K;

var L2;
var L1;
var L1_arr = [];
var L_arr = [];
var L0;
var L;
var L1_arr = [];

var M;
var M0;

var N1
var N2
var N3
var N4
var N5
var N6
var N7
var N8;
var N9 = 15; 
var N = 0;
var N0;

var PI = 4. * Math.atan(1);
var P$;
var P2;
var P2_arr = [];
var P8;
var P9;
var P;
var P1;
var P1_arr = [];
var P_arr = [];
var P0;

var R;
var RD = PI / 180;

var S0;
var S1;
var S2;
var S8;
var S9;
var S3;

var TP = PI + PI;
var T = 0;
var T_arr = [];
var traceList = '';

var U = 0;

var V;

var W$ = [];
var W = 0;

var X;
var XX = 0;

var YY = 0;
var Y = 0;

var ZZ = 0;
var Z;
var Z_arr = [];
var Z1 = 0;
var Z8;
var Z9;
var Z2;

function convertLoranToLL(GRI, loran1, loran2) 
{
    // find sub (slave) towers 
    let slave = []
	slave[0] = slave1 = findSlave(GRI, loran1);
	slave[1] = slave2 = findSlave(GRI, loran2);

    G1$ = GRI + slave[0];
	G2$ = GRI + slave[1];

    // get coords and delays for all towers in this GRI triad
	towersObj = getTowerData();

    P1 = towersObj[GRI][slave1]['lat'];
	L1 = towersObj[GRI][slave1]['long'];
	P2 = towersObj[GRI][slave2]['lat'];
	L2 = towersObj[GRI][slave2]['long'];
	P1_arr.push(P1);
	L1_arr.push(L1);
	D9_arr.push(towersObj[GRI][slave2]['delay']);
	P1_arr.push(P2);
	L1_arr.push(L2);

    P0 = towersObj[GRI].lat;
	L0 = towersObj[GRI].long;

    for(var i=0;i<2;i++)
    {  
        G$[i] = slave[i];
        D_arr[i] = towersObj[GRI][slave[i]]['delay'];
        X = P0;
        useAcosQatn();
        P_arr[0] = typeof(P_arr[0]) == 'undefined' ? [] : P_arr[0];
        P_arr[0].push(X);
        X = L0;
        acos();
        L_arr[0] = typeof(L_arr[0]) == 'undefined' ? [] : L_arr[0];
        L_arr[0].push(V * RD);
        X = P1_arr[i];
        useAcosQatn();
        P_arr[1] = typeof(P_arr[1]) == 'undefined' ? [] : P_arr[1];
        P_arr[1].push(X);
        X = L1_arr[i];
        acos();
        L_arr[1] = typeof(L_arr[1]) == 'undefined' ? [] : L_arr[1];
        L_arr[1].push(V * RD);
    }

    setF1AndF2();
    doWork();
    
    // process ITDs
    for(let i=0;i<2;i++)
    {
        A = A + G_arr[i] - D_arr[i] - T_arr[i];
        console.log(A);
        console.log(T_arr[i]);
        if(Math.abs(A) < T_arr[i])
        {  
            ItdValidContinue(i);
        }
        ItdValidContinue(i);
    }
    fixingRoutine();
}

// Direct Solution - was basic subroutine 550
function directSolution() {
	traceList += ", " + arguments.callee.name;
	Z8 = Math.sin(Z1);
	Z9 = Math.cos(Z1);
	P8 = Math.sin(P1);
	P9 = Math.cos(P1);
	M = -Z8 * P9;
	C1 = C0 * M;
	C2 = C0 * (1 - M * M) / 4;
	D = (1 - C2) * (1 - C2 - C1 * M);
	P = C2 * (1 + C1 * M / 2) / D;
	N = P9 * Z9;
	YY = N;
	XX = P8;

	modFn();
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

	modFn();
	S3 = AN;
	H = C1 * (1 - C2) * S2 - C1 * C2 * S8 * Math.cos(S1 + S1 - S2);
	L2 = L1 + S3 - H;
	YY = -M;
	XX = -(N * S9 - P8 * S8);

	modFn();
	Z2 = AN;
}

//FIXING ROUTINE - was basic subroutine 770
function fixingRoutine() {
	//traceList += ", " + arguments.callee.name;
	A1 = F1 * Math.sin(A_arr[0]);
    console.log(A_arr[0]);
	B1 = Math.cos(A_arr[0]) - Math.cos(B_arr[0]);
	C1 = Math.sin(B_arr[0]);
	console.log(A_arr);
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

	modFn();
    G = AN;
	XX = K / R;

	asin();
	Z = G + A0 * AN;
	YY = B2;
	XX = C2 * Math.cos(Z - E2) + A2;
	console.log("line 266: " + AN)
    modFn();
	S0 = AN;

	if (F2 == 1) {
		P1 = P_arr[0][1];
        L1 = L_arr[0][1];
	}
	if (F2 == -1) {
		P1 = P_arr[1][1];
        L1 = L_arr[1][1];
	}
	Z1 = Z;

	directSolution();
	P0 = P2;
	L0 = L2;
	P = Math.atan(Math.tan(P0) / (1 - C0));
	P = P / RD;
	X = L0 / RD;
	M0 = 360;

	modFnSetup();
	L = X;
	//IF L>180 THEN L=L-360
	L = L > 180 ? L - 360 : L;
	X = P;

	P$ = C$;
	X = L;
//console.log("line 295: " + L1)
    buildString();
}

function asin()
{
    let boola = XX == 0 ? -1 : 0;
    let boolb = XX < 0 ? -1 : 0;
    AN=Math.atan(Math.sqrt(1 - XX * XX) / (XX -1e-9 * boola))-PI * boolb;
}

function ItdValidContinue(i)
{
    A_arr[i] = A/21295.8736;
    console.log(A_arr);
}

function doWork()
{
    for(let i=0;i<2;i++)
    {
        P1 = P_arr[0][i];
        L1 = L_arr[0][i];
        P2 = P_arr[1][i];
        L2 = L_arr[1][i];
        setUpVars(i);
    }

    G_arr[0] = 0;
    G_arr[1] = 0;
}

function math1()
{
    X = parseInt(M0 * X + 0.5)/M0;
}

function math2()
{
    P = 129.04398 / T - 0.40758 + 0.645765438e-3 * T;
}

function math3()
{
    P = 2.7412979 / T - 0.32774624 - 3 * T;
}

function math4()
{
    T = 21282.3593 * S0;
}

function setUpVars(i)
{
    reverseSolution();
    B_arr[i] = S0;
    Z_arr[0] = typeof(Z_arr[0] == 'undefined') ? [] : Z_arr[0];
    Z_arr[0][i] = Z1; 
    Z_arr[1] = typeof(Z_arr[1] == 'undefined') ? [] : Z_arr[1];
    Z_arr[1][i] = Z2; 

    math4();

    T = 21282.3593 * S0;
    if(T >= 537)
    {
        math2();
    } else {
        math3();
    }
    T_arr[i] = T + P;
}

function useAcosQatn()
{
    acos();
    X = V * RD;
    qatn();
}

function acos()
{
    S = Math.sign(X);
    X = Math.abs(X);
    H = parseInt(X);
    M0 = 1;
    modFnSetup();
    V = X * 100;
    X = V;
    modFnSetup();
    V = S * ((100 * X/60 + parseInt(V)) / 60 + H);
}

function modFnSetup()
{
    X = X - M0 * parseInt(X/M0);
    modFn();
}

function modFn()
{
    let xxBoola = XX == 0 ? -1 : 0;
	let xxBoolb = XX < 0 ? -1 : 0;
	AN = Math.atan(YY / (XX - 0.000000001 * xxBoola)) - Math.PI * xxBoolb;
    //console.log("line 399: " + xxBoolb)
}

function qatn()
{
    X = Math.atan((1-C0) * Math.tan(X));
}

function setF1AndF2()
{
    F1 = 1;
	F2 = 1;
    $error = false;
	//IF G1$=G2$ THEN GOTO 300
	if (P_arr[0][0] == P_arr[0][1] && L_arr[0][0] && L_arr[0][1]) {
		F2 = -1;
	}
	else if (P_arr[0][0] == P_arr[1][1] && L_arr[0][0] && L_arr[1][1]) {
		F1 = -1;
	}
	else if (P_arr[1][0] == P_arr[1][1] && L_arr[1][0] && L_arr[1][1]) {
		F2 = 2;
	}
	else if (P_arr[1][0] = P_arr[0][1] && L_arr[1][0] && L_arr[0][1]) {
        F1 = 1;
        F2 = 1;
    } else {
		$error = "No Triplet Possible";
	}
}

function setZzAndAn()
{
    ZZ = Math.sqrt(1 - XX * XX);
    let boola = ZZ == 0 ? -1 : 0;
    let boolb = XX < 0 ? -1 : 0;
    AN = Math.atan(Math.sqrt(1 - XX * XX) / (XX -1e-9 * boola)) - PI * boolb;
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
	//let p6sq = P6 * P6;
	L = P6 * P6 + H * Math.sin(L3 / 2) ** 2;
	XX = Math.sqrt(L);
	
    setZzAndAn();

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

	D2 = C0 * C0 * (N1 - N2 + N3) / 64;
	D1 = C0 * (T * X - Y) / 4;
	S0 = (T - D1 + D2) * Math.sin(D0);
	M = 32 * T - (20 * T - A) * X - (B + 4) * Y;
	F = Y + Y - E * (4 - X);
	G = C0 * (T / 2 + C0 * M / 64);
	Q = -F * G * Math.tan(L3) / 4;

	L4 = (L3 + Q) / 2;
	L8 = Math.sin(L4);
	L9 = Math.cos(L4);

	YY = P6 * L9;
	XX = P9 * L8;
	
    modFn();
	T1 = AN;
	YY = -P7 * L9;
	XX = P8 * L8;

	modFn();
	T2 = AN;
	M0 = TP;
	X = T1 + T2;

	modFnSetup();
	Z1 = X;
	X = T1 - T2;
	
    modFnSetup();
	Z2 = X;
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

function buildString()
{
    C$ = " ";
    if(X < 0)
    {
        C$ = "-";
        X = -X;
    }
    X = X + 1 / 7200;
    X0 = parseInt(X);
    C$ = C$ + X0.toString() + " ";
    X = 60 * (X - X0);
    X0 = parseInt(X);
    let st = 100 + X0;
    X$ = st.toString();

    console.log("line 760 " + X)
}

GRI = '9960';
var loran1 = 26600;
var loran2 = 41400;

convertLoranToLL(GRI, loran1, loran2);
console.log("LAT  = " + P$ + ", LONG = " + C$);
logVals(577);