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
				var that = $(this),
						rotateX = that.data('rotate-x'),
						rotateY = that.data('rotate-y'),
						tabIndex = that.index(),
						tabsArray = $('.tab');

			// 	that.parent().css({
			// 			'transform': 'rotateX(' + rotateX + 'deg) ' +
			// 			'rotateY(' + rotateY + 'deg)'
			// 		});
			// 		for (i=0; i < tabsArray.length; i++) {
			// 			$(tabsArray[i]).removeClass('active');
			// 		};
			// 		$(tabsArray[tabIndex]).addClass('active');
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

			}).on('mousemove', function(e) {
				if(cube.flag) {
					xChange = e.clientX - cube.startX;
					yChange = e.clientY - cube.startY;
					//methods.onMouseMoveListn(e);
					console.log(xChange, yChange);
				}
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

})();
