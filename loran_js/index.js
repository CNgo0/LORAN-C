const Geo = require("./Geo");
const DMS = require("geographiclib-dms");
const Loran = require("./Loran");
const Tower = require("./Tower");


const gri9960 = {
    m: new Tower(`42° 42' 50.716"N`, `76° 49' 33.308"W`),
    w: new Tower(`46° 48' 27.305"N`, `67° 55' 37.159"W`,  11000),
    x: new Tower(`41° 15' 12.046"N`, `069° 58' 38.536"W`, 27000),
    y: new Tower(`34° 03' 46.17"N`,  `77° 54' 46.21"W`,   40000),
    z: new Tower(`39° 51' 07.658"N`, `87° 29' 11.586"W`,  -1), // Do not use
}

let m = gri9960.m; // M
let w = gri9960.w; // S2
let x = gri9960.x; // S1

let master2w = Geo.Inverse(m.pos, w.pos); // S2
let master2x = Geo.Inverse(m.pos, x.pos); // S1

let T1 = 12300;
let T2 = 25500;

let zeta = 1; // Placeholder

let TB1 = Loran.GetTB(m.pos, x.pos);
let TB2 = Loran.GetTB(m.pos, w.pos);

let twoA1 = Loran.Get2a(T1, TB1, x.codingDelay);
let twoA2 = Loran.Get2a(T2, TB2, w.codingDelay);

let twoC1 = Loran.Get2c(TB1);
let twoC2 = Loran.Get2c(TB2);

// Get A, B, C
let A1 = zeta * Math.sin(twoA1);
let A2 = zeta * Math.sin(twoA2);

let B1 = Math.cos(twoA1) - Math.cos(twoC1);
let B2 = Math.cos(twoA2) - Math.cos(twoC2);

let C1 = Math.sin(twoC1);
let C2 = Math.sin(twoC2);

let az1 = master2x.a12 * Math.PI / 180;
let az2 = master2w.a12 * Math.PI / 180;

// Get C, S, K
let C = B1 * C2 * Math.cos(az2) - B2 * C1 * Math.cos(az1);
let S = B1 * C2 * Math.sin(az2) - B2 * C1 * Math.sin(az1);
let K = B2 * A1 - B1 * A2;

let rho = Math.sqrt(Math.pow(C, 2) + Math.pow(S, 2));
let gamma = Math.atan2(S, C);

let alpha = gamma + Math.acos(K / rho);
// let alpha = gamma + Math.acos((K / rho) / Math.ceil(Math.abs(K / rho)));
// let alpha = gamma + Math.acos((K / rho) % 1);

let r = Math.atan2(B1, (C1 * Math.cos(alpha - az1) + A1)); // Using S1 (x)

let result = Geo.Direct(x.pos, alpha, r);
console.log(result);
console.log(`result: ${result.lat2}, ${result.lon2}`);
console.log(`alpha: ${alpha}`);
console.log(`r: ${r}`);

/*
{
  lat1: 41.253346111111114,
  azi1: 20.95609925039048,
  lon1: -69.97737111111111,
  a12: 758.0245243057831,
  s12: 84234692.40714446,
  lon2: -24.8948394945011,
  lat2: 72.14848097120367,
  azi2: 61.13217200486732
}
result: 72.14848097120367, -24.8948394945011
alpha: 1.3102980645532072
r: 1.3404816669794215
*/