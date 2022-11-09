const Geo = require("./Geo");
const DMS = require("geographiclib-dms");
const Loran = require("./Loran");
const Tower = require("./Tower");


const gri9960 = {
    m: new Tower(`42° 42' 50.716"N`, `76° 49' 33.308"W`),
    w: new Tower(`46° 48' 27.305"N`, `67° 55' 37.159"W`,  11000),
    x: new Tower(`41° 15' 12.046"N`, `069° 58' 38.536"W`, 27000),
    y: new Tower(`34° 03' 46.17"N`,  `77° 54' 46.21"W`,   40000),
    z: new Tower(`39° 51' 07.658"N`, `87° 29' 11.586"W`, -1), // Do not use
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

let az1 = master2x.a12;
let az2 = master2w.a12;

// Get C, S, K
let C = B1 * C2 * Math.cos(az2) - B2 * C1 * Math.cos(az1);
let S = B1 * C2 * Math.sin(az2) - B2 * C1 * Math.sin(az1);
let K = B2 * A1 - B1 * A2;

let rho = Math.sqrt(Math.pow(C, 2) + Math.pow(S, 2));
let gamma = Math.atan2(S, C);
console.log(K);
console.log(rho);
console.log(K / rho);
let alpha = gamma + Math.acos(K / rho);
let r = Math.atan2(B1 / (C1 * Math.cos(alpha - az1) + A1)); // Using S1 (x)

let result = Geo.Direct(x.pos, alpha, 100000);
console.log(result);
console.log(alpha);

/*
console.log()
console.log(`Azimuth:  ${master2w.a12}`);
console.log(`Distance: ${master2w.s12}`);
console.log(`Azimuth:  ${master2x.a12}`);
console.log(`Distance: ${master2x.s12}`);

/*
Azimuth:  7.53926754217945
Distance: 837774.1868516725
Azimuth:  2.951427580632468
Distance: 327888.115853502
*/