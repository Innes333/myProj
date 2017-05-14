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
						elIndex = that.data('index'),
						tabIndex = that.index(),
						tabsArray = $('.tab');

				console.log(elIndex);
				console.log(tabIndex);
				console.log(rotateX, tabIndex);
				that.parent().css({
						'transform': 'rotateX(' + rotateX + 'deg) ' +
						'rotateY(' + rotateY + 'deg)'
					});
					for (i=0; i < tabsArray.length; i++) {
						$(tabsArray[i]).removeClass('active');
					};
					$(tabsArray[elIndex]).addClass('active');
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

	});

})();
