function isEmail(emailStr) {
    var emailPat = /^(.+)@(.+)$/;
    var specialChars = '\\(\\)<>@,;:\\\\\\"\\.\\[\\]';
    var validChars = "\[^\\s" + specialChars + "\]";
    var quotedUser = '("[^"]*")';
    var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
    var atom = validChars + "+";
    var word = "(" + atom + "|" + quotedUser + ")";
    var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray = emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user = matchArray[1];
    var domain = matchArray[2];

    // See if "user" is valid
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        // this is an IP address
        for (var i = 1; i <= 4; i++) {
            if (IPArray[i] > 255) {
                return false;
            }
        }
        return true;
    }
    var domainArray = domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }

    var atomPat = new RegExp(atom, "g");
    var domArr = domain.match(atomPat);
    var len = domArr.length;

    if (
        domArr[domArr.length - 1].length < 2 ||
        domArr[domArr.length - 1].length > 3
    ) {
        return false;
    }

    if (len < 2) {
        return false;
    }

    return true;
}
$(document).ready(function() {
    var widthBr = $(window).width();

    // Navigation Mobile
    $('.toggleMb').click(function(event) {
        if ($('.navMb').is(':hidden')) {
            $('.navMb').show('slide', {
                direction: 'right'
            }, 300);
        } else {
            $('.navMb').hide('slide', {
                direction: 'right'
            }, 300);
        }
    });

    // Custom header
    var sticky = $('.navFixed');
    setTimeout(function() {
        $(sticky).slideDown();
    }, 1100);

    // Fade logo slider
    $(".blockSlider .logoSlider").delay(1000).fadeIn('1000');


    // Active scroll navTop
    $(window).scroll(function(event) {
        if ($(this).scrollTop() > 88) {
            $('.navFixed').css({
                'transition-duration': '500ms',
                'background': '#fff',
                'text-shadow': 'none'
            });
            $('.navFixed a').css('color', '#000');
            $('.navFixed .nav li a.active').addClass('active2').removeClass('active');
        } else {
            $('.navFixed').css({
                'transition-duration': '500ms',
                'background': 'rgba(18,166,235,0.28)',
                'text-shadow': '0 0 8px #004463'
            });
            $('.navFixed a').css('color', '#fff');
            $('.navFixed .nav li a.active2').addClass('active').removeClass('active2');
        }
    });


    // Fixed header
    if (widthBr <= 768) {
        var sticky = $('.navFixed');
        $(window).scroll(function() {
            var currentScroll = $(this).scrollTop();
            if (currentScroll > 70) {
                $('.header').css('background', '#fff');
            } else {
                $('.header').css('background', 'rgba(18,166,235,0.28)');
            }
        });
    }


    // Hover listNews
    $('.listNews .item').hover(function() {
        var url = $(this).find('.btnNewsM');
        $(this).css('border', '5px solid #12a5eb');
        $(this).find('.btnNewsM').attr('src', $(this).find('.btnNewsM').attr('src').replace('-ovoff', '-ovon'));
    }, function() {
        $(this).css('border', '5px solid #edecea');
        $(this).find('.btnNewsM').attr('src', $(this).find('.btnNewsM').attr('src').replace('-ovon', '-ovoff'));
    });


    // Disable scroll zoom Google map
    $('#mapIframe').click(function() {
        $(this).css("pointer-events", "auto");
    });
    $("#mapIframe").mouseleave(function() {
        $(this).css("pointer-events", "none");
    });


    // Anime Scroll
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 150
                    }, 1000);
                    return false;
                }
            }
        });
    });


    // Scroll back to top
    var object = '#totop';
    var offset = 250;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $(object).fadeIn(duration);
        } else {
            $(object).fadeOut(duration);
        }
    });

    $(object).click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });


    // Validate form
    $("#form_register").on("submit", function(event) {
        var clubname = $.trim($('#clubname').val());
        var username = $.trim($('#username').val());
        var username2 = $.trim($('#username2').val());
        var email = $.trim($('#email').val());
        var phone = $.trim($('#phone').val());

        var flag = true;

        // ClubName
        if (clubname == '') {
            window.location.href = '/contact/confirm.html';
            // $('#clubname_error').text('Cannot be empty');
            flag = false;
        } else {
            window.location.href = '/contact/complete.html';
        }
        // Username
        if (username == '') {
            window.location.href = '/contact/confirm.html';
            // $('#username_error').text('Cannot be empty');
            flag = false;
        } else {
            window.location.href = '/contact/complete.html';
        }
        // Username2
        if (username2 == '') {
            window.location.href = '/contact/confirm.html';
            // $('#username2_error').text('Cannot be empty');
            flag = false;
        } else {
            window.location.href = '/contact/complete.html';
        }

        // Phone
        if (phone == '' || phone.length < 5) {
            window.location.href = '/contact/confirm.html';
            // $('#phone_error').text('You must be used: 0-9, "+" and "-"');
            flag = false;
        } else {
            window.location.href = '/contact/complete.html';
        }

        // Email
        if (!isEmail(email)) {
            window.location.href = '/contact/confirm.html';
            // $('#email_error').text('Email may not be blank and must be in the correct format');
            flag = false;
        } else {
            window.location.href = '/contact/complete.html';
        }
        return flag;
    });

    // Active nav Wipe
    var urlPath = window.location.pathname;
    $('nav.nav').find('a').each(function() {
        let url = '..' + urlPath;
        let url_ht = $(this).attr('href');
        if (url == url_ht) {
            $(this).addClass('active');
        }
    });
    $('nav.navMb').find('a').each(function() {
        let url = '..' + urlPath;
        let url_ht = $(this).attr('href');
        if (url == url_ht) {
            $(this).addClass('active');
        }
    });
    $('nav.navFooter').find('a').each(function() {
        let url = '..' + urlPath;
        let url_ht = $(this).attr('href');
        if (url == url_ht) {
            $(this).addClass('active');
        }
    });
    $('.blockListTop').find('.items a').each(function() {
        var tmp = window.location.href.split("/");
        let url_l = '/' + tmp[3] + '/' + $(this).attr('href');
        if (urlPath == url_l) {
            $(this).parents('.items').addClass('active');
        }
    });

    // Set height for menu listTop mobile
    equalheight = function(container) {
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {

            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
    $(window).load(function() {
        equalheight('.blockListTop ul li');
        equalheight('.blockP ul li .description');
        equalheight('.blockP ul li .text');
    });
    $(window).resize(function() {
        equalheight('.blockListTop ul li');
        equalheight('.blockP ul li .description');
        equalheight('.blockP ul li .text');
    });
});
