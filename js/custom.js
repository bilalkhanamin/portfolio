;
(function($, window, document, undefined) {
    'use strict';
    var $winW = function() {
        return $(window).width();
    };
    var $winH = function() {
        return $(window).height();
    };
    var $screensize = function(element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function(mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
    $(document).ready(function() {
        $(window).on('load', function() {
            $('.preloader').fadeOut();
            $('.animated-row').each(function() {
                var $this = $(this);
                $this.find('.animate').each(function(i) {
                    var $item = $(this);
                    var animation = $item.data('animate');
                    $item.on('inview', function(event, isInView) {
                        if (isInView) {
                            setTimeout(function() {
                                $item.addClass('animated ' + animation).removeClass('animate');
                            }, i * 50);
                        } else if (!screencheck(767)) {
                            $item.removeClass('animated ' + animation).addClass('animate');
                        }
                    });
                });
            });
        });
        if ($('.facts-list').length) {
            $('.facts-list').owlCarousel({
                loop: true,
                nav: false,
                dots: false,
                items: 5,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 4,
                        margin: 30
                    }
                }
            });
        }
        if ($('.services-list').length) {
            $('.services-list').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 3,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.gallery-list').length) {
            $('.gallery-list').owlCarousel({
                loop: false,
                nav: false,
                dots: true,
                items: 3,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 4000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 1,
                        margin: 20
                    },
                    992: {
                        items: 2,
                        margin: 30
                    }
                }
            });
        }
        if ($('.testimonials-slider').length) {
            $('.testimonials-slider').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    768: {
                        items: 1
                    }
                }
            });
        }
        if ($('.fullpage-default').length) {
            var myFullpage = new fullpage('.fullpage-default', {
                licenseKey: ' C7F41B00-5E824594-9A5EFB99-B556A3D5',
                anchors: ['slide01', 'slide02', 'slide03', 'slide04', 'slide05', 'slide06'],
                menu: '#nav',
                lazyLoad: true,
                navigation: true,
                navigationPosition: 'right',
                scrollOverflow: true,
                responsiveWidth: 768,
                responsiveHeight: 600,
                responsiveSlides: true
            });
        }
        $(document).on('click', '.navbar-toggle', function() {
            $('.navbar-collapse').slideToggle(300);
            return false;
        }).on('click', '.navigation-menu > li > a', function() {
            $('.navbar-collapse').slideUp(300);
        }).on('click', '.next-section', function() {
            fullpage_api.moveSectionDown();
        });
        $('.facts-row').on('inview', function(event, isInView) {
            $('.count-number').each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
                setTimeout(function() {
                    $('.count-number').removeClass('count-number').addClass('counted');
                }, 1000);
            });
        });
        $('.skills-row').on('inview', function(event, isInView) {
            $(this).addClass('view');
        });
        $(document).on('click', '.menu-trigger', function() {
            $('body').toggleClass('sidemenu-open');
        }).on('click', '.side-menu .navbar-nav li a', function() {
            $('body').removeClass('sidemenu-open');
        });
    });
})(jQuery, window, document);

// function([string1, string2],target id,[color1,color2])    
consoleText(['Bilal Amin', 'Full-stack Developer'], 'text');

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}


var logoEl = document.querySelector('.logo-animation');
var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
var innerWidth = window.innerWidth;
var maxWidth = 740;
var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
var logoTimeline = anime.timeline();

logoEl.style.transform = 'translateY(50px) scale('+logoScale+')';

for (var i = 0; i < pathEls.length; i++) {
  var el = pathEls[i];
  el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
}

logoTimeline
  .add({
  targets: '.dot-e',
  translateX: [
    { value: -600, duration: 520, delay: 200, easing: 'easeInQuart' },
    { value: [-100, 0], duration: 500, delay: 1000, easing: 'easeOutQuart' }
  ],
  scale: [
    { value: [0, 1], duration: 200, easing: 'easeOutBack' },
    { value: 0, duration: 20, delay: 500, easing: 'easeInQuart' },
    { value: 1, duration: 200, delay: 1000, easing: 'easeOutQuart' },
    { value: 0, duration: 400, delay: 500, easing: 'easeInBack' }
  ],
  offset: 0
})
  .add({
  targets: '.dot-i',
  translateY: { value: [-200, 0], duration: 500, elasticity: 400 },
  scale: [
    { value: [0, 1], duration: 100, easing: 'easeOutQuart' },
    { value: 0, duration: 400, delay: 1400, easing: 'easeInBack' }
  ],
  delay: 1200,
  offset: 0
})
  .add({
  targets: '.fill.in',
  strokeDashoffset: {
    value: [anime.setDashoffset, 0],
    duration: 600,
    delay: function(el, i, t) { return 700 + ( i * 100 ); },
    easing: 'easeOutQuart'
  },
  stroke: {
    value: ['#FFF', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
    duration: 500,
    delay: 500,
    easing: 'easeInQuad'
  },
  opacity: {
    value: 0,
    duration: 1,
    delay: function(el, i, t) { return 1900 + ( i * 80 ); },
  },
  offset: 0
})
  .add({
  targets: '.fill.out',
  strokeDashoffset: [
    { value: [anime.setDashoffset, anime.setDashoffset], duration: 1890 },
    {
      value: [0, anime.setDashoffset],
      duration: 800,
      delay: function(el, i) { return (i * 80); },
      easing: 'easeInQuart'
    }
  ],
  offset: 0
})
  .add({
  targets: '.line.out',
  strokeDashoffset: {
    value: [0, anime.setDashoffset],
    duration: 1200,
    delay: function(el, i, t) { return 2500 + ( i * 100 ); },
    easing: 'easeInQuart'
  },
  strokeWidth: {
    value: [0, 2],
    delay: function(el, i, t) { return 2000 + ( i * 100 ); },
    duration: 200,
    easing: 'linear'
  },
  offset: 0
})
  .add({
  targets: '.icon',
  opacity: { value: 1, duration: 10, delay: 2800, easing: 'linear' },
  translateY: { value: 60, duration: 800 },
  delay: 4200,
  offset: 0
})
  .add({
  targets: '.icon-line',
  strokeDashoffset: [
    { value: [anime.setDashoffset, anime.setDashoffset], duration: 3000 },
    { value: 0, duration: 1200, easing: 'easeInOutQuart' }
  ],
  strokeWidth: {
    value: [8, 2],
    delay: 3000,
    duration: 800,
    easing: 'easeInQuad'
  },
  stroke: {
    value: ['#FFF', function(el) { return anime.getValue(el, 'stroke') } ],
    duration: 800,
    delay: 3400,
    easing: 'easeInQuad'
  },
  offset: 0
})
  .add({
  targets: ['.icon-text path', '.icon-text polygon'],
  translateY: [50, 0],
  opacity: { value: [0, 1], duration: 100, easing: 'linear' },
  delay: function(el, i, t) { return 4200 + ( i * 20 ); },
  offset: 0
});