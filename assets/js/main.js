$(document).ready(function () {
    const $body = $('body');
    const $header = $('.header');
    const $navbar = $('.navbar');
    const $navlink = $('.navlink');
    const $burger = $('.burger');
    const $bar1 = $('.burger-svg__bar-1');
    const $bar2 = $('.burger-svg__bar-2');
    const $bar3 = $('.burger-svg__bar-3');
    let isChangingState = false;
    let isOpen = false;
    const burgerTL = new TimelineMax();

    // ========== Burger Animations ==========
    function burgerOver() {
        if (!isChangingState) {
            burgerTL.clear();
            if (!isOpen) {
                burgerTL.to($bar1, 0.5, {
                    y: -2,
                    ease: Elastic.easeOut
                })
                    .to($bar2, 0.5, {
                        scaleX: 0.6,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%"
                    }, "-=0.5")
                    .to($bar3, 0.5, {
                        y: 2,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            } else {
                burgerTL.to($bar1, 0.5, {
                    scaleX: 1.2,
                    ease: Elastic.easeOut
                })
                    .to($bar3, 0.5, {
                        scaleX: 1.2,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            }
        }
    }

    function burgerOut() {
        if (!isChangingState) {
            burgerTL.clear();
            if (!isOpen) {
                burgerTL.to($bar1, 0.5, {
                    y: 0,
                    ease: Elastic.easeOut
                })
                    .to($bar2, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%"
                    }, "-=0.5")
                    .to($bar3, 0.5, {
                        y: 0,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            } else {
                burgerTL.to($bar1, 0.5, {
                    scaleX: 1,
                    ease: Elastic.easeOut
                })
                    .to($bar3, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut
                    }, "-=0.5");
            }
        }
    }

    function showCloseBurger() {
        burgerTL.clear();
        burgerTL.to($bar1, 0.3, {
            y: 12, // move the bar up
            ease: Power4.easeIn
        })
            .to($bar2, 0.3, {
                scaleX: 1,
                ease: Power4.easeIn
            }, "-=0.3")
            .to($bar3, 0.3, {
                y: -12, // move the bar down
                ease: Power4.easeIn
            }, "-=0.3")
            .to($bar1, 0.5, {
                rotation: 45,
                ease: Elastic.easeOut,
                transformOrigin: "50% 50%"
            })
            .set($bar2, {
                opacity: 0,
                immediateRender: false
            }, "-=0.5")
            .to($bar3, 0.5, {
                rotation: -45,
                ease: Elastic.easeOut,
                transformOrigin: "50% 50%",
                onComplete: function () {
                    isChangingState = false;
                    isOpen = true;
                }
            }, "-=0.5");
    }

    function showOpenBurger() {
        burgerTL.clear();
        burgerTL.to($bar1, 0.3, {
            scaleX: 0,
            ease: Back.easeIn
        })
            .to($bar3, 0.3, {
                scaleX: 0,
                ease: Back.easeIn
            }, "-=0.3")
            .set($bar1, {
                rotation: 0,
                y: 0
            })
            .set($bar2, {
                scaleX: 0,
                opacity: 1
            })
            .set($bar3, {
                rotation: 0,
                y: 0
            })
            .to($bar2, 0.5, {
                scaleX: 1,
                ease: Elastic.easeOut
            })
            .to($bar1, 0.5, {
                scaleX: 1,
                ease: Elastic.easeOut
            }, "-=0.4")
            .to($bar3, 0.5, {
                scaleX: 1,
                ease: Elastic.easeOut,
                onComplete: function () {
                    isChangingState = false;
                    isOpen = false;
                }
            }, "-=0.5");
    }

    // ========== Burger Hover ==========
    $burger.hover(burgerOver, burgerOut);

    // ========== Burger On Click ==========
    $burger.click(function () {
        if (!isChangingState) {
            isChangingState = true;

            if (!isOpen) {
                showCloseBurger();
                $navbar.addClass('active');
                $body.addClass('no__scroll');
                // obróć element o 360 stopni
                $navbar.css({
                    'transform': 'rotate(-360deg)'
                });
            } else {
                showOpenBurger();
                $navbar.removeClass('active');
                $body.removeClass('no__scroll');
                $navbar.css({
                    'transform': 'rotate(360deg)'
                });
            }
        }

    });

    // ========== NavLink On Click ==========
    $navlink.click(function () {
        if ($navbar.hasClass('active')) {
            if (!isChangingState) {
                isChangingState = true;
                if (isOpen) {
                    showOpenBurger();
                    $navbar.removeClass('active');
                    $body.removeClass('no__scroll');
                    $navbar.css({
                        'transform': 'rotate(360deg)'
                    });
                }
            }
        }
    });

    // ========== Resize ==========
    $(window).resize(function () {
        if ($(window).width() != 0 && !isChangingState) {
            isChangingState = true;
            showOpenBurger();
            $navbar.removeClass('active');
            $body.removeClass('no__scroll');
            $navbar.css({
                'transform': 'rotate(360deg)'
            });
        }
    });

    // ========== Header Width Functions ==========
    function setHeaderWidth() {
        if ($(window).scrollTop() > 0) {
            $header.addClass('header__scroll');
        } else {
            $header.removeClass('header__scroll');
        }
    }

    // ========== Header Refresh ==========
    $(window).scrollTop(function () {
        setHeaderWidth();
    });

    // ========== Header Scroll ==========
    $(window).scroll(function () {
        setHeaderWidth();
    });

    // ========== Scroll To ==========
    $navlink.click(function (e) {
        e.preventDefault();
        const $target = $($(this).attr('href'));
        const targetOffset = $target.offset().top;
        const headerHeight = $header.outerHeight();
        const scrollTo = targetOffset - headerHeight;

        $('html, body').animate({
            scrollTop: scrollTo
        }, 1000);
    });

    // ========== Rubber Band Animation ==========
    $(function () {
        const $blast = $(".blast");

        $blast.mouseenter(function () {
            $(this).addClass("active__blast");
            $(this).one("animationend", function () {
                $(this).removeClass("active__blast");
            });
        });
    });



    // ========== Music ==========
    // $(function () {
    //     const $toggleMusicButton = $('#toggle__music-button');
    //     const $music = $('#music');

    //     $music[0].play();

    //     $music[0].play().catch(function (error) {
    //         $toggleMusicButton.addClass('disabled');
    //     });

    //     $toggleMusicButton.click(() => {
    //         if ($music[0].paused) {
    //             $music[0].play();
    //             $toggleMusicButton.removeClass('disabled');
    //         } else {
    //             $music[0].pause();
    //             $toggleMusicButton.addClass('disabled');
    //         }
    //     });

    //     $music.on('ended', () => {
    //         $music[0].currentTime = 0;
    //         $music[0].play();
    //     });
    // });


    $(function () {
        const $toggleMusicButton = $('#toggle__music-button');
        const $music = $('#music');

        function setCookie(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
        }

        function getCookie(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        const musicCookie = getCookie('music');

        if (musicCookie === 'playing') {
            $music[0].play();
        } else {
            $music[0].pause();
        }

        $music[0].play().catch(function (error) {
            $toggleMusicButton.addClass('disabled');
        });

        $toggleMusicButton.click(() => {
            if ($music[0].paused) {
                $music[0].play();
                setCookie('music', 'playing', 365);
                $toggleMusicButton.removeClass('disabled');
            } else {
                $music[0].pause();
                setCookie('music', 'paused', 365);
                $toggleMusicButton.addClass('disabled');
            }
        });

        $music.on('ended', () => {
            $music[0].currentTime = 0;
            $music[0].play();
        });
    });


    // JAVASCRIPT
    const music__wrapper = document.querySelector('.music__wrapper');
    const spans = document.querySelectorAll('span');
    if (music__wrapper.classList.contains('disabled')) {
        setTimeout(() => {
            spans.forEach((span) => {
                span.style.animationPlayState = 'paused';
            });
        }, 555);
    }
    music__wrapper.addEventListener('click', () => {
        if (music__wrapper.classList.contains('disabled')) {
            music__wrapper.classList.remove('disabled');
            spans.forEach((span) => {
                span.style.animationPlayState = 'running';
            });
        } else {
            music__wrapper.classList.add('disabled');
            spans.forEach((span) => {
                span.style.animationPlayState = 'paused';
            });
        }
    });

    const homeImgShadows = document.querySelector('.home__img-shadows');

    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth);
        const y = (e.clientY / window.innerHeight);
        homeImgShadows.style.transform = `translate3D(${x * 5 - 3}%, ${y * 5}%, 0)`;
    });

});

