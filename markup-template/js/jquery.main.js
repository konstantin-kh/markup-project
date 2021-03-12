var $ = $.noConflict();
$(document).ready(function() {
	isElementExist(".nav-drop", initSmartMenu);
	initAccordion();
	initCustomForms();
	initSlickSlider();
	initAnchors();
	initOpenClose();
	checkFormsState();
	initMobileNav();
});

$(window).on('load resize orientationchange', function () {
	initSlickCustom();
});

//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

// Helper if element exist then call function
function isElementExist(_el, _cb) {
	var elem = document.querySelector(_el);

	if (document.body.contains(elem)) {
		_cb();
	}
}

// smart menu init
function initSmartMenu() {
	jQuery(".header-menu").smartmenus({
		collapsibleBehavior: "accordion",
		subMenusMinWidth: "19em",
		subMenusMaxWidth: "21em",
	});

	jQuery("body").mobileNav({
		menuActiveClass: "nav-active",
		menuOpener: ".nav-opener",
		hideOnClickOutside: true,
		menuDrop: ".nav-drop"
	}),
		"ontouchstart" in document.documentElement ||
			jQuery(window).on("resize orientationchange", function() {
				jQuery("body").removeClass("nav-active"), $.SmartMenus.hideAll();
			});
}

function initMobileNav() {
	$(".main-slider").each(function (index, sliderWrap) {
		var $opener = $(sliderWrap).find(".main-slider__nav-opener-1, .main-slider__nav-close-1");
		var $drop = $(sliderWrap).find("#main-slider__nav-drop-1");

		jQuery("body").mobileNav({
			menuActiveClass: "main-slider__nav-active-1",
			menuOpener: $opener,
			hideOnClickOutside: false,
			menuDrop: $drop,
		});
	});

	$(".main-slider").each(function (index, sliderWrap) {
		var $opener = $(sliderWrap).find(".main-slider__nav-opener-2, .main-slider__nav-close-2");
		var $drop = $(sliderWrap).find("#main-slider__nav-drop-2");

		jQuery("body").mobileNav({
			menuActiveClass: "main-slider__nav-active-2",
			menuOpener: $opener,
			hideOnClickOutside: false,
			menuDrop: $drop,
		});
	});

	$(".slider-nav-links").on('click', 'li', function() {
		if ($('body').hasClass('main-slider__nav-active-1')) {
			$('body').removeClass('main-slider__nav-active-1');
		}
	});

	$(".slider-nav-links").on("click", "li", function () {
		if ($("body").hasClass("main-slider__nav-active-2")) {
			$("body").removeClass("main-slider__nav-active-2");
		}
	});
}

// accordion menu init
function initAccordion() {
	jQuery(".conf-accordion").slideAccordion({
		opener: ".conf-accordion__opener",
		slider: ".conf-accordion__slide",
		animSpeed: 300,
		scrollToActiveItem: {
			enable: true,
			extraOffset: 0,
		},
	});
}

// initialize custom form elements
function initCustomForms() {
	jcf.setOptions("Select", {
		wrapNative: false,
	});
	jcf.replaceAll();
}

// initialize slick slider
function initSlickSlider() {
	$(".main-slider").each(function (index, sliderWrap) {
		var $slider = $(sliderWrap).find(".main-carousel");
		var $prev = $(sliderWrap).find(".custom-slick-prev");
		var $next = $(sliderWrap).find(".custom-slick-next");
		var $sliderNav = $(sliderWrap).find(".slider-nav-links");

		$slider.slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			fade: true,
			rows: false,
			dots: false,
			prevArrow: $prev,
			nextArrow: $next,
			speed: 300,
			asNavFor: $sliderNav,
			swipe: false,
			touchMove: false,
		});

		$sliderNav.slick({
			slidesToShow: 8,
			slidesToScroll: 1,
			asNavFor: $slider,
			dots: true,
			focusOnSelect: true,
			rows: false,
			swipe: false,
			touchMove: false,
		});

		//remove active class from all thumbnail slides
		$sliderNav.find('.slick-slide').removeClass('slick-active');

		//set active class to first thumbnail slides
		var activeLi = $sliderNav.find(".active");
		var eqActive = activeLi.data('slide');
		$sliderNav.find(".slick-slide:eq(" + eqActive + ")").addClass("slick-active");

		$slider.slick("slickGoTo", parseInt(eqActive));

		// On before slide change match active thumbnail to current slide
		$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			var mySlideNumber = nextSlide;
			$sliderNav.find(".slick-slide").removeClass("slick-active");
			$sliderNav.find(".slick-slide").eq(mySlideNumber).addClass('slick-active');
		});

		// remove active class nav li
		$slider.on('swipe', function () {
			$sliderNav.find(".slick-slide.active").removeClass("active");
		});

		// remove active class nav li
		$prev.on("click", function () {
			$sliderNav.find(".slick-slide.active").removeClass("active");
		});

		// remove active class nav li
		$next.on("click", function () {
			$sliderNav.find(".slick-slide.active").removeClass("active");
		});

		// set active slide
		$sliderNav.on('click', 'span', function (e) {
			var e = $(this).parent().index();

			$sliderNav.find(".slick-slide.active").removeClass("active");
			$slider.slick("slickGoTo", parseInt(e));
		});
	});
}

function initSlickCustom() {
	$('.slick-sm').each(function () {
		var $carousel = $(this);
		/* Initializes a slick carousel only on mobile screens */
		// slick on mobile
		if (window.matchMedia("(min-width: 1024px)").matches) {
			if ($carousel.hasClass("slick-initialized")) {
				$carousel.slick("unslick");
			}
		} else {
			if (!$carousel.hasClass("slick-initialized")) {
				$carousel.slick({
					slidesToShow: 3,
					variableWidth: true,
					adaptiveHeight: true,
					rows: 0,
					arrows: false,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								variableWidth: true,
								adaptiveHeight: true,
								rows: 0,
								arrows: false,
							},
						},
					],
				});
			}
		}
	});

	$(".training-carousel").each(function () {
		var $carousel = $(this);
		/* Initializes a slick carousel only on mobile screens */
		// slick on mobile
		if (window.matchMedia("(min-width: 768px)").matches) {
			if ($carousel.hasClass("slick-initialized")) {
				$carousel.slick("unslick");
			}
		} else {
			if (!$carousel.hasClass("slick-initialized")) {
				$carousel.slick({
					infinite: false,
					slidesToShow: 3,
					variableWidth: true,
					adaptiveHeight: true,
					rows: 0,
					arrows: false,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								infinite: false,
								slidesToShow: 2,
								variableWidth: true,
								adaptiveHeight: true,
								rows: 0,
								arrows: false,
							},
						},
					],
				});
			}
		}
	});
}

// initialize smooth anchor links
function initAnchors() {
	new SmoothScroll({
		anchorLinks: 'a[href^="#"]:not([href="#"])',
		extraOffset: function () {
			var totalHeight = 20;
			jQuery(".header").each(function () {
				var $box = jQuery(this);
				var stickyInstance = $box.data("StickyScrollBlock");
				if (stickyInstance) {
					stickyInstance.stickyFlag = false;
					stickyInstance.stickyOn();
					totalHeight += $box.outerHeight();
					stickyInstance.onResize();
				} else {
					totalHeight +=
						$box.css("position") === "fixed" ? $box.outerHeight() : 0;
				}
			});
			return totalHeight;
		},
		activeClasses: "parent",
		wheelBehavior: "none",
	});
}

// open-close init
function initOpenClose() {
	ResponsiveHelper.addRange({
		'0..1023': {
			on: function() {
				jQuery('.nav-page__open-close').openClose({
					activeClass: 'active',
					opener: '.nav-page__opener',
					slider: '.nav-page__slide',
					hideOnClickOutside: true,
					animSpeed: 400,
					effect: 'slide'
				});
			},
			off: function() {
				jQuery('.nav-page__open-close').openClose('destroy');
			}
		}
	});
}

function checkFormsState() {
	$(".form-purchase").each(function (i, element) {
		var $btnAdd = $(element).find(".btn-toggle--add");
		var $formContent = $(element).find(".form-purchase__holder");
		var $inputName = $(element).find(".input-check");
		var $btnRemove = null || $(element).find(".btn-toggle--remove");
		var validName = false;
		var counter = null;
		var countName = 5;

		$(this).on("click", ".btn-toggle--add", function (event) {
			event.preventDefault();
			var nameVal = $inputName.val();

			if ($btnRemove && counter >= countName) {
				$btnAdd.attr("disabled", true);
			} else {
				$btnAdd.attr("disabled", false);

				if (nameVal == "") {
					validName = false;
					$inputName.parent().addClass("error");
				} else {
					counter++;
					validName = true;
					$inputName.parent().removeClass("error");
					$formContent.prepend(
						"<div class='form-group form-group--btn-remove'>" +
							"<button class='form-control btn-toggle btn-toggle--remove' type='button'>" +
							nameVal +
							"</button></div>"
					);
					$inputName.val("");
				}
			}
		});

		$(this).on("click", ".btn-toggle--remove", function (event) {
			var trg = event.target;

			if ($(trg).hasClass("btn-toggle--remove")) {
				$(this).parent().remove();
				$btnAdd.attr("disabled", false);
				counter--;
			}
		});
	});
}


//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------

//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------

// library smartmenus (if you dont have menu in the project - just remove)
//= vendors/smartmenus.js
//= vendors/picturefill.min.js
//= vendors/slick.min.js
//= vendors/jquery.accordion.js
//= vendors/jcf.js
//= vendors/smoothscroll.js
//= vendors/openclose.jquery.js

//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------
