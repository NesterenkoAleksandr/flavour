let modalId = $('#image-gallery');

// Initialize and add the map
function initMap() {
	// The location of Uluru
	var uluru = {lat: 46.9659100, lng: 31.9974000};
	// The map, centered at Uluru
	var map = new google.maps.Map(
		document.getElementById('map'), {
			zoom: 11, 
			center: uluru
		});
	// The marker, positioned at Uluru
	var marker = new google.maps.Marker({
		position: uluru, 
		map: map
	});
}

/**
	 *
	 * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
	 * @param setClickAttr  Sets the attribute for the click handler.
	 */
function loadGallery(setIDs, setClickAttr) {
	let counter = 0;

	function updateGallery(selector) {
		let $sel = selector;
		current_image = $sel.data('image-id');
		$('#image-gallery-image').attr('src', $sel.data('image'));
	}

	if (setIDs == true) {
		$('[data-image-id]')
		.each(function () {
			counter++;
			$(this)
			.attr('data-image-id', counter);
		});
	}

	$(setClickAttr)
		.on('click', function () {
		updateGallery($(this));
	});
}

document.addEventListener("DOMContentLoaded", function(event) { 
    // Init Isotope filter
    var $grid = $('.grid').isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'fitRows'
	});

	$('.filter-button-group').on('click', 'button', function(){
		$('.is-checked')[0].classList.remove('is-checked');
		$(this)[0].classList.add('is-checked');
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({filter:filterValue});
	});
	
	var btn = $('.totop-button');
	var navbar = $('.navbar');
	$(window).scroll(function(){
		// Show/hide navbar dark background
		if ($(window).scrollTop() > 150){
			navbar.addClass('navbar-dark-bg');
		}
		else{
			navbar.removeClass('navbar-dark-bg');
		}

		// Scroll screen to top
		if ($(window).scrollTop() > 300){
			btn.addClass('show');
		}
		else{
			btn.removeClass('show');
		}

		btn.on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, '300');
		});
	});

	// Init image gallery
	loadGallery(true, 'a.thumbnail');

});
