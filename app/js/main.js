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

		toggleClasses: function(el, activeClass) {
			el.on('click', function(e) {
				e.stopPropagation();
				el.toggleClass(activeClass)
				$(document).on('click', function() {
					el.removeClass(activeClass);
				})
			});
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

				that.parent().css({
					'transform': 'rotateX(' + rotateX + 'deg) ' +
					'rotateY(' + rotateY + 'deg)'
				});
				for (i=0; i < tabsArray.length; i++) {
					$(tabsArray[i]).removeClass('active');
				};
				$(tabsArray[elIndex]).addClass('active');
			});
		},

		renderMap: function() {
	 		var mapEl = document.getElementById('map');
      var kievCrd = {lat: 50.4506593, lng: 30.5148581};
      var map = new google.maps.Map(mapEl, {
        zoom: 5,
        center: kievCrd,
        mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
        backgroundColor: '#a87ece',
        styles: [
        {
				    "featureType": "all",
				    "elementType": "geometry",
				    "stylers": [
				      { "color": '#a87ece' }
				    ]
				  }, {
				    "featureType": "administrative",
				    "elementType": "geometry",
				    "stylers": [
				      { "color": '#333333' }
				    ]
				  }, {
				    "featureType": "road",
				    "elementType": "geometry",
				    "stylers": [
				      { "color": '#cccccc' }
				    ]
				  }, {
				    "featureType": "water",
				    "elementType": "geometry",
				    "stylers": [
				      { "color": '#cccccc' }
				    ]
				  },{
				    "featureType": "landscape",
				    "elementType": "labels",
				    "stylers": [
				      { "visibility": "on" }
				    ]
				  }
				]				
      });

      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      var marker = new google.maps.Marker({
        position: kievCrd,
        map: map,
		    icon: image
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

		methods.renderMap();

		 

	});

})();
