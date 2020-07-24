;(function () {

	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var getHeight = function() {
		var extraHeight = 0;

		if ( isMobile.any() ) extraHeight = 50;

		setTimeout(function(){
			$('#port-main').stop().animate({
				'height': $('.port-tab-content.active').height() + extraHeight
			});
		}, 200);
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 10,
			lineCap: 'butt',
			barColor: '#17e7a4',
			trackColor:	"#000000",
			size: 160,
			animate: 1000
		});
	};

	var tabContainer = function() {
		getHeight();
		$(window).resize(function(){
			getHeight();
		})
	};

	var tabClickTrigger = function() {
		$('.port-tab-menu a').on('click', function(event) {
			event.preventDefault();
			var $this = $(this),
				data = $this.data('tab'),
				pie = $this.data('pie');

			// add/remove active class
			$('.port-tab-menu li').removeClass('active');
			$this.closest('li').addClass('active');

			$('.port-tab-content.active').addClass('animated fadeOutDown');

			setTimeout(function(){
				$('.port-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
				$('.port-tab-content[data-content="'+data+'"]').addClass('animated fadeInUp active');
				getHeight();
			}, 500);

			if ( pie === 'yes' ) {
				setTimeout(function(){
					pieChart();
				}, 800);
			}

		})
	};
	var createEventHandlers = function(){
		$("#resume-btn").on("click",function(){
			window.location= "rsc/resume_sauban.pdf"
		})
	}

	// Document on load.
	$(function(){
		tabContainer();
		tabClickTrigger();
		createEventHandlers();
	});

	var $box = $('.box'),
  	inter = 30,
  	speed = 0;

	function moveBox(e) {
	  //TweenMax.killTweensOf();
	  $box.each(function(index, val) {
	   TweenLite.to($(this), 0.05, { css: { left: e.pageX, top: e.pageY},delay:0+(index/750)});
	  });
	}

	$(window).on('mousemove', moveBox);

	$box.each(function(index, val) {
	    index = index + 1;
	    TweenMax.set(
	      $(this),{
	        autoAlpha: 1 - (0.0333 * index),
	        delay:0
	      });
	  });
	  TweenMax.set(
	    $('.text:nth-child(30)'), {
	      autoAlpha: 1.5,
	      delay: 0
	    }
	  );

		$(".icon-kaggle").hover(
		  function() {
		    $( this ).attr("src", 'images/icon/kaggle_red.png');
		  }, function() {
				$( this ).attr("src", 'images/icon/kaggle_white.png');
		  }
		);

		if(isMobile.any()){
			$('.desk-vis').addClass("hideme");
		}
		/* Every time the window is scrolled ... */
		$(window).scroll( function(){

				/* Check the location of each desired element */
				$('.hideme').each( function(i){

						var bottom_of_object = $(this).position().top + $(this).outerHeight();
						var bottom_of_window = $(window).scrollTop() + $(window).height();

						/* If the object is completely visible in the window, fade it it */
						if(isMobile.any()){
							if( bottom_of_window+100> bottom_of_object){
									$(this).animate({'opacity':'1'},1000);
							}
						}else{
							if( bottom_of_window-200 > bottom_of_object){
									$(this).animate({'opacity':'1'},2000);
							}
						}


				});

		});

}());
