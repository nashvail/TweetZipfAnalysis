(function($) {
	'use strict';
	var navigationLinks = $('.navbar--link');

	// Attach an event listener to each one of the links 
	navigationLinks.each(function(_, link) {
		$(link).on('click', function() {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
		});
	});

})(jQuery);