//Image upload: File API
// access FileList - File objects

// var input = document.getElementById('input');
// var selectedFile = input.files[0];

// input.addEventListener("change", handleFiles, false);

// FileReader
// var img = document.createElement('img');
// var reader = new FileReader();
// reader.onload = function (e) {
// 	img.src = e.target.result
// };
// reader.readAsDataURL(selectedFile);

// console.log(reader);



function loadImage() {
	var input, file, fr, img;

	// if (typeof window.FileReader !== 'function') {
	// 	write("The file API isn't supported on this browser yet.");
	// 	return;
	// }

	input = document.getElementById('imgFile');
	// if (!input) {
	// 	write("Um, couldn't find the imgfile element.");
	// }
	// else if (!input.files) {
	// 	write("This browser doesn't seem to support the `files` property of file inputs.");
	// }
	// else if (!input.files[0]) {
	// 	write("Please select a file before clicking 'Load'");
	// }
	// else {
	  file = input.files[0];
		fr = new FileReader();
		fr.onload = createImage;
		fr.readAsDataURL(file);
	// }

	function createImage() {
		img = new Image();
		img.onload = imageLoaded;
		img.src = fr.result;
	}

	function imageLoaded() {
		var canvas = document.getElementById("canvas")
		// canvas.width = img.width;
		// canvas.height = img.height;
		var ctx = canvas.getContext("2d");

		alert(canvas.toDataURL("image/png"));

		var maxWidth = 800;
		var maxHeight = 600;
		var width = img.width;
		var height = img.height;

		if (width > height) {
			if (width > maxWidth) {
				height *= maxWidth / width;
				width = maxWidth;
			}
		} else {
			if (height > maxHeight) {
				width *= maxHeight / height; 
				height = maxHeight;
			}
		}
		ctx.drawImage(img,0,0,width,height);
	}

	function write(msg) {
		var p = document.createElement('p');
		p.innerHTML = msg;
		document.body.appendChild(p);
	}
}

/*
Importing images into a canvas is a 2 step process:
	1. get a reference to an HTMLImageElement object or to anoter canvas element as a source.
		It is also possible to use images by providing a URL.
	2. Draw the image on the canvas using the drawImage() function.
	Scaling:
	drawImage(image, x, y, width, height)
	Slicing:
	drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
*/

// Shows file size
function updateSize() {
	var nBytes = 0,
	oFiles = document.getElementById("imgFile").files,
	nFiles = oFiles.length;
	for (var nFileId = 0; nFileId < nFiles; nFileId++) {
		nBytes += oFiles[nFileId].size;
	}
	var sOutput = nBytes + " bytes";
  // optional code for multiples approximation
  for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
  	sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
  }
  // end of optional code
  // document.getElementById("fileNum").innerHTML = nFiles;
  document.getElementById("fileSize").innerHTML = sOutput;
}


// Zoom Controls

$(window).load(function() {
	var view = $("#view");
	var image = $("#canvas");
	var zoom = $("<a id='zoom'><span><br /></span></a>");

	view.width(image.width());
	view.height(image.height());

	zoom.width(Math.floor(image.width()/2));
	zoom.height(Math.floor(image.height()/2));

	view.append(zoom);

	view.hover(
		function (event) {
			zoom.show();
		},
		function (event) {
			zoom.hide();
		})

	viewOffset = view.offset();

	var window = $(window);

	view.mousemove(
		function (event) {
			var windowScrollTop = window.scrollTop();
			var windowScrollLeft = window.scrollLeft();
			setZoomPosition(
				Math.floor(
					event.clientX - viewOffset.left + windowScrollLeft
				), 
				Math.floor(
					event.clientY - viewOffset.top + windowScrollTop
				)
			);
		});

	var setZoomPosition = function (mouseLeft, mouseTop) {
		var zoomLeft = (mouseLeft - (zoom.width() / 2));
		var zoomTop = (mouseTop - (zoom.height() /2));
		zoomleft = Math.max(zoomLeft, 0);
		zoomTop = Math.max(zoomTop, 0);

		zoomLeft = Math.min(zoomLeft, (view.width() - zoom.outerWidth()) );
		zoomTop = Math.min(zoomTop, (view.height() - zoom.outerHeight()) );

		zoom.css({
			left: (zoomLeft + "px"),
			top: (zoomTop + "px")
		});
	};

	image.data({
		zoomFactor: (view.width() / zoom.width()),
		zoom: 1,
		top: 0,
		left: 0,
		width: image.width(),
		height: image.height(),
		originalWidth: image.width(),
		originalHeight: image.height()
	});

	zoom.click(
		function (event) {
			event.preventDefault();
			zoomImage(zoom.position().left, zoom.position().top);
		}
	);

	var zoomImage = function (zoomLeft, zoomTop) {
		var imageData = image.data();
		console.log(imageData)
		if ((imageData.zoom == 5) || (image.is( ":animated" )) ) {
			return;
		}


		imageData.width = (image.width() * imageData.zoomFactor);
		imageData.height = (image.height() * imageData.zoomFactor);

		imageData.left = ((imageData.left - zoomLeft) * imageData.zoomFactor);
		imageData.top = ((imageData.top - zoomTop) * imageData.zoomFactor);
		imageData.zoom++;
		image.animate(
		{
			width: imageData.width,
			height: imageData.height,
			left: imageData.left,
			top: imageData.top
		}, 500);
	}

	var resetZoom = function () {
		var imageData = image.data();
		imageData.zoom = 1;
		imageData.top = 0;
		imageData.left = 0;
		imageData.width = imageData.originalWidth;
		imageData.height = imageData.originalHeight;
		image.animate(
		{
			width: imageData.width,
			height: imageData.height,
			left: imageData.left,
			top: imageData.top
		}, 300);
	};

// resets zoom
	$(document).mousedown(
		function (event) {
			var closestView = $(event.target).closest("#view");
			if (!closestView.size()) {
				resetZoom();
			}
	});


});	















/* Zoom Levels
{
	'0': {rows: 1,  cols: 1}, -> 1 tile
	'1': {rows: 2,  cols: 2}, -> 4 tiles
	'2': {rows: 4,  cols: 4}, -> 16 tiles
	'3': {rows: 8,  cols: 8}, -> 64 tiles
	'4': {rows: 16, cols: 16} -> 256 tiles
}
*/