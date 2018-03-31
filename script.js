var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var button = document.querySelector(".btn");

// Function to convert hex to rgb: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function HextoRGB(hex) {
	hex = hex.replace(/[^0-9A-F]/gi, '');
  	var arrBuff = new ArrayBuffer(4);
  	var vw = new DataView(arrBuff);
  	vw.setUint32(0,parseInt(hex, 16),false);
  	var arrByte = new Uint8Array(arrBuff);

  	return "rgb(" + arrByte[1] + ", " + arrByte[2] + ", " + arrByte[3] + ")";
}

//next two function to convert rgb to hex : https://stackoverflow.com/questions/13070054/convert-rgb-strings-to-hex-in-javascript
function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function RGBToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
}

function setGradient() {
	body.style.background = "linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";

	//css.textContent = body.style.background + ";";
	css.textContent = HextoRGB(color1.value) + " " + HextoRGB(color2.value);
}

function createRandomColor() {
	rgb=[];
	for (var i = 0; i < 3; i++) {
		rgb[i] = Math.floor(Math.random() * 256);
	}
	return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] +")"

}

//random button which generates two random numbers for the colour inputs.
function iFeelLucky(){
	var randColor1 = createRandomColor();
	var randColor2 = createRandomColor();
	body.style.background = "linear-gradient(to right, " 
	+ randColor1
	+ ", " 
	+ randColor2
	+ ")";

	//css.textContent = body.style.background + ";";
	css.textContent = randColor1 + " " + randColor2;
	color1.value = RGBToHex(randColor1);
	color2.value = RGBToHex(randColor2);
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

button.addEventListener("click", iFeelLucky);