function draw() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");


	// importing images into a canvas is a 2 step process:
	// 1. get a reference to an HTMLImageElement object or to anoter canvas element as a source.
		// It is also possible to use images by providing a URL.
	// 2. Draw the image on the canvas using the drawImage() function. 

	var img = new Image(); // create new img element
	img.onload = function () {
		ctx.drawImage(img,50,50);
	};

	img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';


}
