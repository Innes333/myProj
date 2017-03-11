(function() {
	var sel = {
		active: 'active',
		fixed: 'fixed',
		header: $('header'),
		burgerMenu: $('.burger-button'),
		navBar: $('.nav-bar')
	};

	var cube = {
		cube: $('.cube'),
		flag: false,
		startX: null,
		startY: null
	};

	var methods = {
	 getHeight: function(el) {
		el.css('height', window.innerHeight);
		},
		toggleClasses: function(el, sel) {
			el.on('click', function() {
				el.toggleClass(sel)});
		},
		burgerPos: function (el) {
			window.onscroll = function() {
				if ( window.scrollY > (window.innerHeight)) {
					el.addClass(sel.fixed);
				} else {
					el.removeClass(sel.fixed);
				}
			};
		},
		cubeRotation: function(cube) {
			cube.on('click', function(e) {
				var rotateX = this.data('rotate-x'),
						rotateY = this.data('rotate-y'),
						tabIndex = this.index(),
						tabsArray = $('.tab');

				that.parent().css({
						'transform': 'rotateX(' + rotateX + 'deg) ' +
						'rotateY(' + rotateY + 'deg)'
					});
					for (i=0; i < tabsArray.length; i++) {
						$(tabsArray[i]).removeClass('active');
					};
					$(tabsArray[tabIndex]).addClass('active');
			});

		},

		onMouseMoveListn: function(e) {
			if(e.clientX - cube.startX > 0) {

			}
		},

		cubeTransform: function(cube) {
			var xCahnge = 0,
					yChange = 0;
			cube.on('mousedown', function(e){
				cube.flag = true;
				var rotateX = $(e.target).data('rotate-x'),
						rotateY = $(e.target).data('rotate-y');
				cube.startX = e.clientX;
				cube.startY = e.clientY;

			cube.parent().css({
					'transform': 'rotateX(' + rotateX + 'deg) ' +
					'rotateY(' + rotateY  + 'deg)'
				});
			});
		}

	};

// Init of methods
	$(document).on('ready', function(){
		// set height of header
		methods.getHeight(sel.header);
		// toggle class for Burger menu
		methods.toggleClasses(sel.burgerMenu, sel.active);
		// set burger pos
		methods.burgerPos(sel.navBar);
		// cube rotatio
		methods.cubeRotation(cube.cube);
		methods.cubeTransform(cube.cube);

		$(window).on('mouseup',function() {
			cube.flag = false;
			console.log(cube.flag);
		});
	});

	particlesJS('particles-js',{
	  "particles": {
	    "number": {
	      "value": 110,
	      "density": {
	        "enable": true,
	        "value_area": 800}
	    },
	    "color": {
	      "value": "#fff"
	    },
	    "shape": {
	      "type": "circle",
	      "stroke": {
	        "width": 0,
	        "color": "#000000"
	      },
	      "polygon": {
	        "nb_sides": 5
	      },
	      "image": {
	        "src": "img/github.svg",
	        "width": 100,
	        "height": 100
	      }
	    },
	    "opacity": {
	      "value": 0.5,
	      "random": false,
	      "anim": {
	        "enable": false,
	        "speed": 1,
	        "opacity_min": 0.1,
	        "sync": false
	      }
	    },
	    "size": {
	      "value": 3.8,
	      "random": true,
	      "anim": {
	        "enable": false,
	        "speed": 40,
	        "size_min": 0.1,
	        "sync": false
	      }
	    },
	    "line_linked": {
	      "enable": true,
	      "distance": 150,
	      "color": "#fff",
	      "opacity": 0.4,
	      "width": 2
	    },
	    "move": {
	      "enable": true,
	      "speed": 4,
	      "direction": "none",
	      "random": false,
	      "straight": false,
	      "out_mode": "out",
	      "bounce": false,
	      "attract": {
	        "enable": false,
	        "rotateX": 600,
	        "rotateY": 1200
	      }
	    }
	  },
	  "interactivity": {
	    "detect_on": "canvas",
	    "events": {
	      "onhover": {
	        "enable": false,
	        "mode": "repulse"
	      },
	      "onclick": {
	        "enable": false,
	        "mode": "push"
	      },
	      "resize": true
	    },
	    "modes": {
	      "grab": {
	        "distance": 400,
	        "line_linked": {
	          "opacity": 1
	        }
	      },
	      "bubble": {
	        "distance": 400,
	        "size": 30,
	        "duration": 2,
	        "opacity": 8,
	        "speed": 3
	      },
	      "repulse": {
	        "distance": 200,
	        "duration": 0.4
	      },
	      "push": {
	        "particles_nb": 4
	      },
	      "remove": {
	        "particles_nb": 2
	      }
	    }
	  },
	  "retina_detect": true
	});
})();
