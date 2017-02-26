(function() {
	var sel = {
		active: 'active',
		fixed: 'fixed',
		header: $('header'),
		burgerMenu: $('.burger-button'),
		navBar: $('.nav-bar'),
		cube: $('.cube')
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

		cubeTransform: function(cube) {
			cube.on('mousedown', function(e){
				var rotateX = $(e.target).data('rotate-x'),
						rotateY = $(e.target).data('rotate-y'),
						startX = e.offsetX,
						startY = e.offsetY;

			cube.parent().css({
					'transform': 'rotateX(' + rotateX + 'deg) ' +
					'rotateY(' + rotateY + 'deg)'
				});

				console.log(e)
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
		methods.cubeRotation(sel.cube);
		methods.cubeTransform(sel.cube);
	});

})();
