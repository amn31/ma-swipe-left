
var window = {}
const R = require('../lib/ma-swipe-left');

if (R) {
	console.log("R exist");
} else {
	console.log("Could not load module!");
}

if (R.MA) {
	console.log("R.SwipeLeft exist");
} else {
	console.log("Could not load module R.MA!");
}

if (R.MA.SwipeLeft) {
	console.log("R.MA.SwipeLeft exist");
} else {
	console.log("Could not load module R.MA.SwipeLeft!");
}

console.log(R)
