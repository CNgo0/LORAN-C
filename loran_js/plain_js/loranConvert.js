var A2;
var A = 0;
var A_arr = [];
var A1 = 0;
var A$;
var AN = 0;
var A0 = -1;

var B2 = 0;
var B1 = 0;
var B$;
var B = 0;
var B_arr = [];

var C0 = 0;
var C1 = 0;
var C2 = 0;
var C0$;
var C$;
var C = 0;

var D = 0;
var D_arr = [];
var D9_arr = [];
var D0 = 0;

var E1 = 0;
var E2 = 0;

var F1 = 1;
var F2 = 1;
var C0 = 1 / 298.26;
var F0 = 0;

var GRI = 0;
var G_arr = [];
var G1$;
var G2$;
var G$ = [];
var G = 0;

var H = 0;

var I$;
var I9$;
var ITD;

var K = 0;

var L2 = 0;
var L1 = 0;
var L1_arr = [];
var L_arr = [];
L_arr.push([0, 0],[0, 0]);
var L0 = 0;
var L = 0;
var L1_arr = [];

var M = 0;
var M0 = 0;

var N1 = 0;
var N2 = 0;
var N3 = 0;
var N4 = 0;
var N5 = 0;
var N6 = 0;
var N7 = 0;
var N8 = 0;
var N9 = 15; 
var N = 0;
var N0 = 0;

var PI = 4. * Math.atan(1);
var P$;
var P2 = 0;
var P2_arr = [];
var P8 = 0;
var P9 = 0;
var P = 0;
var P1 = 0;
var P1_arr = [];
var P_arr = [];
P_arr.push([0, 0],[0, 0]);
var P0 = 0;

var R = 0;
var RD = PI / 180;

var S0 = 0;
var S1 = 0;
var S2 = 0;
var S8 = 0;
var S9 = 0;
var S3 = 0;
var slave1;
var slave2;

var TP = PI + PI;
var T = 0;
var T_arr = [];
var traceList = '<table>';

var U = 0;

var V = 0;

var W$ = [];
var W = 0;

var X = 0;
var XX = 0;

var YY = 0;
var Y = 0;

var ZZ = 0;
var Z = 0;
var Z_arr = [];
Z_arr.push([0, 0],[0, 0]);
var Z1 = 0;
var Z8 = 0;
var Z9 = 0;
var Z2 = 0;
var logged = false;

function convertLoranToLL(GRI, loran1, loran2) 
{
    let slave = []
	slave[0] = slave1 = findSlave(GRI, loran1);
	slave[1] = slave2 = findSlave(GRI, loran2);

    G1$ = GRI + slave[0];
	G2$ = GRI + slave[1];

	D_arr.push(loran1, loran2);

    // get coords and delays for all towers in this GRI triad
	towersObj = getTowerData();

    P1 = towersObj[GRI][slave1]['lat'];
	L1 = towersObj[GRI][slave1]['long'];
	P2 = towersObj[GRI][slave2]['lat'];
	L2 = towersObj[GRI][slave2]['long'];
	P1_arr.push(P1);
	L1_arr.push(L1);
	D9_arr.push(towersObj[GRI][slave1]['delay']);
	D9_arr.push(towersObj[GRI][slave2]['delay']);
	P1_arr.push(P2);
	L1_arr.push(L2);

    P0 = towersObj[GRI].lat;
	L0 = towersObj[GRI].long;

    for(var i=0;i<2;i++)
    {  
        G$[i] = GRI + slave[i];
        c = towersObj[GRI][slave[i]]['delay'];
        X = P0;
        useAcosQatn();
		
        P_arr[0][i] = X;
        X = L0;
        acos();
		
        L_arr[0][i] = V * RD;
        X = P1_arr[i];
        useAcosQatn();
		
        P_arr[1][i] = X;
        X = L1_arr[i];
        acos();
		
        L_arr[1][i] = V * RD;
    }

    setF1AndF2();

    for(let i=0;i<2;i++)
    {
		ITD = D_arr[i];
		ITD = ITD + G_arr[i] - D9_arr[i] - T_arr[i];

        if(Math.abs(ITD) < T_arr[i])
        {  
            ItdValidContinue(i);
        } else {
			console.log("ERROR: ITD NOT VALID FOR " + G$[i]);
		}
    }
    fixingRoutine();
}

function ItdValidContinue(i)
{
    A_arr[i] = ITD/21295.8736;
}

// Direct Solution - was basic subroutine 550
function directSolution() {

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
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
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
	modFn();

    G = AN;
	XX = K / R;
	asin();
	Z = G + A0 * AN;

	YY = B2;
	XX = C2 * Math.cos(Z - E2) + A2;
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
	
	L = L > 180 ? L - 360 : L;
	X = P;
	
	buildString();
	P$ = C$;
	X = L;
    buildString();
}

function asin()
{
    let boola = XX == 0 ? -1 : 0;
    let boolb = XX < 0 ? -1 : 0;
    AN=Math.atan(Math.sqrt(1 - XX * XX) / (XX -1e-9 * boola))-PI * boolb;
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
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    X = parseInt(M0 * X + 0.5)/M0;
}

// secondary phase correct if time delay >= 537 micro secs
function math2() 
{
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    P = 129.04398 / T - 0.40758 + 0.645765438e-3 * T;
}

// secondary phase correct if time delay < 537 micro secs
function math3()
{
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    P = 2.7412979 / T - 0.32774624 - 3 * T;
}

function math4(i)
{
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    T = 21282.3593 * S0;
	// secondary phase correction
    if(T >= 537)
    {
        math2();
    } else {
        math3();
    }
    T_arr[i] = T + P;
}

function setUpVars(i)
{
	
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    reverseSolution();
    B_arr[i] = S0;
    Z_arr[0][i] = Z1; 
    Z_arr[1][i] = Z2; 
    math4(i);
}

function useAcosQatn()
{
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    acos();
    X = V * RD;
    qatn();
}

function acos()
{
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
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
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    X = X - M0 * parseInt(X/M0);
    modFn();
}

function modFn()
{
	
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
	
    let xxBoola = XX == 0 ? -1 : 0;
	let xxBoolb = XX < 0 ? -1 : 0;
	AN = Math.atan(YY / (XX - 1e-9 * xxBoola)) - PI * xxBoolb;
}

function qatn()
{
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    X = Math.atan((1-C0) * Math.tan(X));
}

function setF1AndF2()
{
	
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
    F1 = 1;
	F2 = 1;
    $error = false;
	
	if (P_arr[0][0] == P_arr[0][1] && L_arr[0][0] == L_arr[0][1]) {
		doWork();		
	}
	else if (P_arr[0][0] == P_arr[1][1] && L_arr[0][0] == L_arr[1][1]) {
		F2 = -1;
		doWork();	
	}
	else if (P_arr[1][0] == P_arr[1][1] && L_arr[1][0] == L_arr[1][1]) {
		F1 = -1;
		doWork();
	}
	else if (P_arr[1][0] == P_arr[0][1] && L_arr[1][0] == L_arr[0][1]) {
		F2 = 2;
		doWork();
    } else {
		$error = "No Triplet Possible";
	}
	
}

function setZzAndAn()
{
    ZZ = Math.sqrt(1 - XX * XX);
    let boola = ZZ == 0 ? -1 : 0;
	AN = Math.atan(XX / (ZZ -1e-9 * boola));
}

// reverse solution - was basic subroutine 650
function reverseSolution() {
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
	
	L3 = L2 - L1;
	P3 = (P2 - P1) / 2;
	P4 = (P1 + P2) / 2;
	P6 = Math.sin(P3);
	P7 = Math.cos(P3);
	P8 = Math.sin(P4);
	P9 = Math.cos(P4);
	H = P7 * P7 - P8 * P8;
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

function buildString()
{
	traceList += "<tr><td>" + arguments.callee.name + "</td>";
	traceList += "<td>X=" + X + "</td></tr>";
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
	C$ = C$ + X$.slice(-2);
	X = 60 * (X - X0);
	X0 = parseInt(X);
	let st2 = 100 + X0;
	X$ = st2.toString();
	C$ = C$ + " " + X$.slice(-2);
}

function buildDebugStrings(vars)
{
	var basicString = 'PRINT ';
	var basicLogString = '';
	var jsString = 'console.log(';
	var ret = [];
	for(vr of vars)
	{
		basicString += ' "' + vr + '=";' + vr + ';';
		basicLogString += 'PRINT #1,' + ' "' + vr + '=";' + vr + ';:' + 'PRINT #1, CHR$(10);:';
		jsString += ' "' + vr + '=" + ' + vr + ', ';
	}
	ret['bas'] = basicString;
	ret['basLog'] = basicLogString;
	ret['js'] = jsString + ');';
	return ret;
}


//GRI = 9960;
//var loran1 = 26600;
//var loran2 = 41400;

GRI = 9960;
var loran1 = 12153.31;
var loran2 = 44451.83;

convertLoranToLL(GRI, loran1, loran2);
console.log("LAT  = " + P$ + ", LONG = " + C$);