var N1, N2, N3, N4, N5, N6, N7, N8;
var N9=15; // N9=NO. OF MASTER STATIONS
var flatteningFactor=1/298.26;
var A0=-1;
var PI=4.*Math.atan(1);
var TP=PI+PI;
var RD=PI/180;
var G$ = [];
var C0$;
var C$;
var C;
var F0;
var N;
var I$;
var L;
var A$;
var B$;
var B;
var I9$;
var N0;
var P0;
var L0;
var W$ = [];
var D9 = [];
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
var A;
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
var YY;
var XX;
var G;
var Z;
var S0;
var P1;
var L1;
var Z1;
var Z8;
var Z9;
var P8;
var P9;
var M;
var D;
var P;
var S1;
var D0;
var U;
var W;
var Y;
var S2;
var S8;
var S9;
var P2;
var S3;
var L2;
var Z2;
var P$;
var F1=1;
var F2=1;
var ITD;
var GRI;
var T;
var T_arr = [];

function ItdValidContinue()
{
	A_arr[I] = A/21295.8736;
	return Aarr[I];
}

function test()
{
	A = 1;
}

function convertLoranToLL(GRI, loran1, loran2)
{
	I9$ = GRI;
	F0 = 1;
	
	var slave1 = findSlave(GRI, loran1);
	var slave2 = findSlave(GRI, loran2);
	console.log(slave1, slave2);
	G$.push(GRI + slave1, GRI + slave2);
	console.log(G$);

	var towersObj = getTowerData();
	P0 = towersObj[GRI].lat;
	L0 = towersObj[GRI].long;

	D9.push(towersObj[GRI][slave1]['delay']);
	P1 = towersObj[GRI][slave1]['lat'];
	L1 = towersObj[GRI][slave1]['long'];

	D9.push(towersObj[GRI][slave2]['delay']);
	P2 = towersObj[GRI][slave2]['lat'];
	L2 = towersObj[GRI][slave2]['long'];

	console.log(towersObj[GRI][slave1]);
	console.log(towersObj[GRI][slave2]);
}

//FIXING ROUTINE - was basic subroutine 770
function fixingRoutine()
{
	var A1=F1*MATH.sin(ITD[0]);
	var B1=MATH.cos(ITD[0])-MATH.cos(B[0]);
	var C1=MATH.sin(B[0]);
	var A2=F2*MATH.sin(ITD[1]);
	var B2=MATH.cos(ITD[1])-MATH.cos(B[1]);
	var C2=MATH.sin(B[1]);
	var E1=Z[0][0];
	
	if(F1 == -1) 
	{
		E1=Z[1][0];
	}
	
	E2=Z[0][1];
	
	if(F2 == -1)
	{	
		E2=Z[1][1];
	}
	
	var C=B1*C2*MATH.cos(E2)-B2*C1*MATH.cos(E1);
	var S=B1*C2*MATH.sin(E2)-B2*C1*MATH.sin(E1);
	var K=B2*A1-B1*A2;
	var R=SQR(C*C+S*S);
	var YY=S;
	var XX=C;
	var P1;
	
	var AN = getQatn(XX, YY);

	var G=AN;
	XX=K/R;
	
	AN = getAcos(XX);
	
	var Z=G+A0*AN;
	YY=B2;
	XX=C2*MATH.cos(Z-E2)+A2;
	
	AN=getQatn(XX, YY);

	var S0=AN;
	
	if (F2==1)
	{
		P1=P[0][1];
	} 
	
	var L1=L[0][1];

	if (F2==-1)
	{
		P1=P[1][1];
	} 

	L1=L[1][1];

	var Z1=Z;
	
	var directVals = directSolution();
	
	// get from directSolution(): P2, L2 
	var P0=directVals.P2;
	var L0=directVals.L2;
	var P=Math.atan(Math.tan(P0)/(1-flatteningFactor));

	P=P/RD;
	var X=L0/RD;
	var M0=360;
	
	//GOSUB 1250: The BASIC program implies that we must call mConvert() and then getQatn() 
	// but I believe it's unnecessary to call getQatn() here
	X = mConvert(M0, X);
	
	var L=X;
	//IF L>180 THEN L=L-360
	L = L>180 ? L-360 : L;
	
	X=P;
	var C$ = xConvert(X);
	P$=C$;

	X=L;
	C$ = xConvert(X);
	console.log("LAT  = " + P$); 
	console.log("LONG = " + C$);
}

// was basic subroutine 1260
function getQatn(XX, YY)
{
	var AN=Math.atan(YY/(XX-1e-9*(XX=0)))-Math.PI*(XX<0);
	return AN;
}

// was basic subroutine 1350
function getAcos(XX)
{
	var AN=Math.atan(Math.sqrt(1-XX*XX)/(XX-1e-9*(XX=0)))-Math.PI*(XX<0);
	return AN;
}

function getAsin(XX)
{
	var ZZ=Math.sqrt(1-XX*XX);
	var AN=ATN(XX/(ZZ-1e-9*(ZZ=0)));
	return AN;
}

// was basic subroutine 1250
function mConvert(M0, X)
{
	X=X-M0*INT(X/M0);
	return X;
}

// was basic subroutine 1280
function xConvert(X)
{
	var C$=" ";

	if (X<0)
	{
		C$="-";
		X=-X;
	}

	X=X+1/7200;
	var X0=parseInt(X);
	C$=C$+String(X0)+" ";
	X=60*(X-X0);
	X0=parseInt(X);
	X$=String(100+X0);
	C$=C$+str.slice(X$,-2)+" ";
 	X=60*(X-X0);
	X0=INT(X);
	X$=String(100+X0);
	C$=C$+str.slice(X$,-2)+" ";

	return C$;
}

// Direct Solution - was basic subroutine 550
function directSolution()
{
	var Z8=Math.sin(Z1);
	var Z9=Math.cos(Z1);
	var P8=Math.sin(P1);
	var P9=Math.cos(P1);
	var M=-Z8*P9;
	var C1=flatteningFactor*M;
	var C2=flatteningFactor*(1-M*M)/4;
	var D=(1-C2)*(1-C2-C1*M);
	var P=C2*(1+C1*M/2)/D;
	var N=P9*Z9;
	var YY=N;
	var XX=P8;
	
	var AN = getQatn(XX, YY);
	
	var S1=AN;
	var D0=S0/D;
	var U=2*(S1-D0);
	var W=1-2*P*Math.cos(U);
	var V=COS(U+D0);

	var X=C2*C2*Math.sin(D0)*Math.cos(D0*(2*V*V-1));
	var Y=2*P*V*W*Math.sin(D0);
  	var S2=D0+X-Y;
	var S8=Math.sin(S2);
	var S9=Math.cos(S2);
	var K=Math.sqrt(M*M+(N*S9-P8*S8)^2);
  	var P2=Math.atan((P8*S9+N*S8)/K);
  	YY=-S8*Z8;
	XX=P9*S9-P8*S8*Z9;
	
	AN = getQatn(XX, YY);
	S3=AN;
  	var H=C1*(1-C2)*S2-C1*C2*S8*Math.cos(S1+S1-S2);
	var L2=L1+S3-H;
  	YY=-M;
	XX=-(N*S9-P8*S8);
	
	AN = getQatn(XX, YY);
	Z2=AN; // set global Z2 value

	var ret = {P2, L2};
	return ret;
}

// reverse solution - was basic subroutine 650
function reverseSolution()
{
	var L3=L2-L1;
	var P3=(P2-P1)/2;
	var P4=(P1+P2)/2;
	var P6=Math.sin(P3);
	var P7=Math.cos(P3);
	var P8=Math.sin(P4);
	var P9=Math.cos(P4);

	var H=P7*P7-P8*P8;
	var L=P6*P6+H*SIN(L3/2)^2;
	var XX=SQR(L);

	var AN = getAsin(XX);
	var D0=2*AN;
	var U=2*P8*P8*P7*P7/(1-L);
	var V=2*P6*P6*P9*P9/L;
	var X=U+V;
	var Y=U-V;
	var T=D0/SIN(D0);
	var D=4*T*T;

	var E=2*Math.cos(D0);
	var A=D*E;
	var C=T-(A-E)/2;
	var N1=X*(A+C*X);
	var B=D+D;
	var N2=Y*(B+E*Y);
	var N3=D*X*Y;

	var D2=flatteningFactor*flatteningFactor*(N1-N2+N3)/64;
	var D1=flatteningFactor*(T*X-Y)/4;
	var S0=(T-D1+D2)*Math.sin(D0);

	var M=32*T-(20*T-A)*X-(B+4)*Y;
	var F=Y+Y-E*(4-X);
	var G=flatteningFactor*(T/2+flatteningFactor*M/64);
	var Q=-F*G*Math.tan(L3)/4;

	var L4=(L3+Q)/2;
	var L8=Math.sin(L4);
	var L9=Math.cos(L4);

	var YY=P6*L9;
	var XX=P9*L8;
	var AN = getQatn(XX, YY);
	var T1=AN;
	YY=-P7*L9;
	XX=P8*L8;
	AN = getQatn(XX, YY);
	T2=AN;

	var M0=TP;
	X=T1+T2;
	X = mConvert(M0, X);
	var Z1=X;
	X=T1-T2;
	X = mConvert(M0, X);
	var Z2=X;

	var ret = {S0, Z1, Z2, A};
	return ret;

}

function getTowerData()
{
	var ret = {};
	var towerData = {
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
function findSlave(GRI, loranDelay)
{
	var ret = "";

	if (GRI == "9960") {
		if (loranDelay >= 11000 && loranDelay < 25000) 
		{
		  ret = "W";
		}
		else if (loranDelay >= 25000 && loranDelay < 39000) 
		{
		  ret = "X";
		}
		else if (loranDelay >= 39000 && loranDelay < 54000) 
		{
		  ret = "Y";
		}
		else if (loranDelay >= 54000 && loranDelay < 68000) 
		{
		  ret = "Z";
		}
	}
	else if  (GRI == "7980") {
		if (loranDelay >= 11000 && loranDelay < 23000) {
			ret = "W";
		}
		else if  (loranDelay >= 23000 && loranDelay < 43000) {
			ret = "X";
		}
		else if  (loranDelay >= 43000 && loranDelay < 59000) {
			ret = "Y";
		}	
		else if  (loranDelay >= 59000 && loranDelay < 73000) {
			ret = "Z";
		}
	 }
	 else if  (GRI == "5930") {
		if (loranDelay >= 11000 && loranDelay < 25000) {
			ret = "X";
		}
		else if  (loranDelay >= 25000 && loranDelay < 39000) {
			ret = "Y";
		}
	}
	return ret;
}

var GRI = '9960';
var loran1 = 26600;
var loran2 = 41400;

convertLoranToLL(GRI, loran1, loran2);
