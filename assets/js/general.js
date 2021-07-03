jQuery(document).ready(function(e) {
    AOS.init({
        duration: 1200,
    })

    var headerHeight = jQuery('header').height();
    if ( jQuery(window).scrollTop() > headerHeight) {
        jQuery('header').addClass("fixed-header");
    }
    jQuery(window).on('scroll', function(e) {
        var scroll = jQuery(window).scrollTop();
        if ( scroll > headerHeight) {
            jQuery('header').addClass("fixed-header");
        } else {
            jQuery('header').removeClass("fixed-header");
        }
    });
    jQuery(".mobile-menu").on('click', function(e) {
        jQuery('body').toggleClass("sidebar-open");
        jQuery(this).find('ul').toggleClass("active");
    });
});