if(/Android/.test(navigator.appVersion)) {
	window.addEventListener("resize", function() {
		if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
			document.activeElement.scrollIntoView();
		}
	});
} 


var block = $('<div>').css({'height':'50px','width':'50px'}),
    indicator = $('<div>').css({'height':'200px'}),
    scrollbarWidth = 0;

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();    
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();
scrollbarWidth = (w1 - w2);


var bodyScrollOptions = {
    reserveScrollBarGap: true
};

function openModal(hrefModal) {
    
    if ($(hrefModal).length > 0){
        $(hrefModal).fadeIn(300);
    
        bodyScrollLock.clearAllBodyScrollLocks();
        bodyScrollLock.disableBodyScroll(hrefModal, bodyScrollOptions);
    }
}

function closeModals() {
	if (scrollbarWidth > 0) {
		$('.popup-block:not(:hidden)').fadeOut(200, function() {
            bodyScrollLock.clearAllBodyScrollLocks();
        });
	} else {
		$('.popup-block:not(:hidden)').fadeOut(200);
		
		bodyScrollLock.clearAllBodyScrollLocks();
	}
}


$(document.body).on('click','[data-toggle="modal"]',function(e) {
	e.preventDefault();
	
	var hrefModal = $(this).attr('data-target');
	
	openModal(hrefModal);
});

$(document.body).on('click','.popup-block__overlay',function(e) {
	var closeButton = $(this).children('[data-toggle="dismiss"]');
	
	if (e.target != this) {
//		return false;
	} else {
		closeModals();
	}
});


$(document.body).on('click','[data-toggle="dismiss"]',function(e) {
	e.preventDefault();
	
	closeModals();
});


$('[data-toggle="scroll-to-top"]').click(function(e) {
	e.preventDefault();

	$('html,body').animate({
		scrollTop: 0
	}, 600);
});

$('[data-toggle="anchor"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target'),
		targetPos = $(dataTarget).offset().top - 150;

	$('html,body').animate({
		scrollTop: targetPos
	}, 400);
});

$('[data-toggle="tab"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target');

	if ($(this).parent().is('li')) {
		$(this).addClass('active').parent().addClass('active').siblings().removeClass('active').children().removeClass('active');
	} else {
		$(this).addClass('active').siblings().removeClass('active');
	}

	$(dataTarget).addClass('active').siblings().removeClass('active');
});

$(window).on('scroll load orientationchange', function() {
	var scrolledHeight = 100;

	if ($(this).scrollTop() > scrolledHeight && !($('body').hasClass("scrolled")) ) {
		$('body').addClass("scrolled");
	} else if($(this).scrollTop() <= scrolledHeight && $('body').hasClass("scrolled")) {
		$('body').removeClass("scrolled");
	}
});

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $(this).addClass('active');
  $("#header-menu").addClass("active");
});

$("#menu-toggle-active").click(function(e) {
  e.preventDefault();
  $("#header-menu").removeClass("active");
});

$('.page-header__menu .page-header__nav ul li a').on('click', function() {
	$('.page-header__menu').removeClass('active');
});

$('#ajax_form').on('submit', function(){

	var http = new XMLHttpRequest();
	var url  = 'https://volkaapp.com/api/android/preregister';

	var params   = new Object();
	params.email = $('#popup_email');

	let urlEncodedData = "", urlEncodedDataPairs = [], name;
	for( name in params ) {
		urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(params[name]));
	}

	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) { // тот самый ответ 200
			alert(http.responseText);
			// Если ответ 200 ОК - показываем следующий pop up
		}
	}

	http.send(params);
});