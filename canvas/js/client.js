// CanvasMosaic
var mosaicModule = (function() {
	var	CONST = {
		IMG_THUMBNAIL: 'image-thumbnail',
		IMG_LIST: 'img-list',
		MS_TILE_W: TILE_WIDTH !=0 ? TILE_WIDTH : 16,
		MS_TILE_H: TILE_HEIGHT !=0 ? TILE_HEIGHT : 16,
		UPLOAD_INPUT: 'img-upload',
		DOWNLOAD_BTN: 'download-btn',
		SPINNER: 'spinner',
		ARRAY_OF_COLORS: [],
		CURRENT_COLOR: '',
		SHOW_COLORS_BTN: 'show-colors-btn',
		SVG_EL: ''
	};

	// DOM manipulation
	var DOMFunc = {
		hasClass: function(el, className) {
			if (el.classList)
				return el.classList.contains(className)
			else
				return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
		},
		addClass: function(el, className) {
			if (el.classList)
				el.classList.add(className)
			else if (!this.hasClass(el, className)) el.className += " " + className
		},
		removeClass: function(el, className) {
			if (el.classList)
				el.classList.remove(className)
			else if (this.hasClass(el, className)) {
				var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
				el.className=el.className.replace(reg, ' ')
			}
		}
	};
	// vanilla js requests handler
	var requestsHandler = function(options) {
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XHR();
		var response;
		xhr.open(options.method, options.url, true);
		xhr.setRequestHeader('Content-Type', options.contentType);
		xhr.onload = function () {
			var DONE = 4;
			var OK = 200;
			if (xhr.readyState === DONE && xhr.status == OK) {
				CONST.SVG_EL = options.contentType === 'image/svg+xml' ? CONST.SVG_EL = xhr.response : '';
				return response = xhr.responseText; // 'This is the returned text.'
			}
		};
		xhr.send(JSON.stringify(options.body));
	};

	var CanvasMosaic = function () {};
	// get base 64 url of uploaded image
	CanvasMosaic.prototype.encodeImageURL = function(element) {
		var img = element.files[0],
			fileReader = new FileReader();
		// get info from input type file
		fileReader.onloadend = function() {
			CanvasMosaic.prototype.drawCanvasImage(fileReader.result);
			CanvasMosaic.prototype.appendImageThumbnail(fileReader.result)
		}
		fileReader.readAsDataURL(img);
	};
	// Start drawing
	CanvasMosaic.prototype.drawCanvasImage = function(url) {
		var imageElement = new Image();
		imageElement.onload = function() {
			CanvasMosaic.prototype.drawImageMosaic(this);
			window.setTimeout(function() {
				document.querySelector('.' + CONST.SPINNER).style.display = 'none';
			}, 1000);
			CONST.CURRENT_COLOR = CONST.ARRAY_OF_COLORS[0];
			var putOptions = {
				method: 'PUT',
				url: '/color/' + CONST.CURRENT_COLOR,
				contentType:  'image/svg+xml',
				body: CONST.ARRAY_OF_COLORS,
			};
			requestsHandler(putOptions);
		};
		imageElement.src = url;
	};
	// create imageThumbnails of uploaded images
	CanvasMosaic.prototype.appendImageThumbnail = function(url) {
		var imgThumbnail = document.createElement('img');
		imgThumbnail.src = url;
		imgThumbnail.className = CONST.IMG_THUMBNAIL;
		document.querySelector('.' + CONST.IMG_LIST).appendChild(imgThumbnail);

		imgThumbnail.addEventListener('click', function(e) {
			CanvasMosaic.prototype.drawCanvasImage(e.srcElement.currentSrc);
		})
	};
	// Draw uploaded image in the canvas
	CanvasMosaic.prototype.drawImageMosaic = function(imageElement) {
		var canvas = document.getElementById('mosaic'),
			context = canvas.getContext('2d'),
			horizontalRatio = window.innerWidth  / imageElement.width,
			verticalRatio =  window.innerHeight / imageElement.height,
			ratio =  Math.min( horizontalRatio, verticalRatio ),
			imageX = 0,
			imageY = 0,
			imageWidth = imageElement.naturalWidth,
			imageHeight = imageElement.naturalHeight,
			scaledImageWidth = parseInt((imageWidth*ratio*CONST.MS_TILE_W)/CONST.MS_TILE_W),
			scaledImageHeight = parseInt((imageHeight*ratio*CONST.MS_TILE_H)/CONST.MS_TILE_H);
		//resize canvas
		context.clearRect(0,0, canvas.width, canvas.height);
		canvas.height = scaledImageHeight;
		canvas.width = scaledImageWidth;
		context.drawImage(imageElement, 0,0,
			imageWidth, imageHeight,
			0,0,
			scaledImageWidth, scaledImageHeight);
		// generate image data
		var imageData = context.getImageData(imageX, imageY, scaledImageWidth, scaledImageHeight);
		var data = imageData.data;

		// iterate over all pixels based on x and y coordinates
		for(var y = 0; y < scaledImageHeight/CONST.MS_TILE_H; y++) {
			var red, green, blue;
			// loop through each row
			for(var x = 0; x < scaledImageWidth/CONST.MS_TILE_W; x++) {
				red = toHex(data[((scaledImageWidth * y*CONST.MS_TILE_H) + x*CONST.MS_TILE_W) * 4]);
				green = toHex(data[((scaledImageWidth * y*CONST.MS_TILE_H) + x*CONST.MS_TILE_W) * 4 + 1]);
				blue = toHex(data[((scaledImageWidth * y*CONST.MS_TILE_H) + x*CONST.MS_TILE_W) * 4 + 2]);
				// get hex of rgb
				function toHex(int) {
					if (int == undefined) return;
					var hex = int.toString(16);
					return hex.length == 1 ? "0" + hex : hex;
				}
				context.fillStyle = '#' + red + green + blue;
				context.fillRect(x*CONST.MS_TILE_W, y*CONST.MS_TILE_H,
					CONST.MS_TILE_W, CONST.MS_TILE_H);
				CONST.ARRAY_OF_COLORS.push(red + green + blue);
			}
		}
	};
	// download generated mosaic
	CanvasMosaic.prototype.downloadCanvasImg = function (link, canvasId, filename) {
		link.href = document.getElementById(canvasId).toDataURL();
		link.download = filename;
	};

	function DOMReady() {
		var fileInput  = document.getElementById(CONST.UPLOAD_INPUT),
			downloadBtn = document.querySelector('.' + CONST.DOWNLOAD_BTN),
			showColorsBtn = document.querySelector('.' + CONST.SHOW_COLORS_BTN);
		// bind onchange event of input file
		fileInput.addEventListener( "change", function(e) {
			CanvasMosaic.prototype.encodeImageURL(e.target);
			document.querySelector('.' + CONST.SPINNER).style.display = 'block';
		});
		// download mosaic on click
		downloadBtn.addEventListener('click', function() {
			CanvasMosaic.prototype.downloadCanvasImg(this, 'mosaic', 'mosaic.png');
		}, false);
		// show saved colors
		showColorsBtn.addEventListener('click', function() {
			var getOptions = {
				method: 'GET',
				url: '/color/' + CONST.CURRENT_COLOR,
				contentType:  'image/svg+xml',
			};
			var svg = requestsHandler(getOptions);
				setTimeout(function() {
					document.querySelector('.colors-svg').innerHTML += CONST.SVG_EL;
				}, 1000);

		});

	};

	document.addEventListener("DOMContentLoaded", DOMReady);
})();