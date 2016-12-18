$(function() {
	var main = {
		sel: {
			tabs: $('.tabs'),
			popup: $('.btn.pop'),
			img: $('img'),
			linc: $('a'),
			body: $('body'),
			wind: $(window),
			headerSel: $('header'),
			mobButton: $('.mob-button'),
			slider: $('.slider')
		},
		opt: {			
			owlOptions: {
				autoPlay: 3000,
				navigation: true,
				singleItem: true,
				autoPlay: false,	
				pagination: true,
				scrollPerPage: true,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']								
			}
		},

		viewPortHeight: function() {
				return this.sel.wind.height();
		},

		tabs: function(el){
			var linc = el.find('.tab-link'),
					tab  = el.find('.tab'),
					dataShow;
			linc.on('click',function(){				
				dataShow = $(this).data('show');
				linc.removeClass('active');
				$(this).addClass('active');

				tab.css('display','none')
				.find('.tab-content').removeClass('active');

				$('#'+dataShow).fadeIn(600)
				.find('.tab-content').addClass('active');
			});
		},

		popup: function(el){
			el.on('click',function(event){
				event.preventDefault();		
				var show = $(this).data('show'),
						pop  = $('#'+ show);

				pop.fadeIn(600)
				.css('height', $(window).height() + 'px')
				.find('.popup-content')
				.removeClass('anim')
				.append('<span class="fade_out">&#9587;</span>')

				$('.fade_out').click(function(){
					pop.fadeOut(600)
					.find('.popup-content')
					.addClass('anim');
					$(this).detach();
				});
			});
		},
		toggleC: function(el){
			el.on('click',function(){
				el.toggleClass('active');
			});
		},
		
		fullHeight: function(el){
			$(el).css('min-height',this.viewPortHeight()+'px');
		},
		dragstart: function(el){
			$(el).on('dragstart',function(event){
				event.preventDefault();
			});
		},
		init: function(){
			this.viewPortHeight();
			// default functions
			// this.dragstart(this.sel.img);
			// this.dragstart(this.sel.linc);

			// tabs init
			this.tabs(this.sel.tabs);
			// popup init
			this.popup(this.sel.popup);
			// Add el window height
			this.fullHeight(this.sel.headerSel);
			//owl slider init
			this.sel.slider.owlCarousel(this.opt.owlOptions);
			//mob button toggle
			this.toggleC(this.sel.mobButton);
		}
	};

	//E-mail Ajax Send
	$("form").submit(function() { 
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {		
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});


	$(document).ready(function(){

		main.init();

		//Chrome Smooth Scroll
		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {

		};
	});
});
