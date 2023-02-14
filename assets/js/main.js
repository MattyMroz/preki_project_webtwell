document.addEventListener('DOMContentLoaded', () => {

    function burger() {
        const burger = document.getElementById('burger');
        const navbar = document.querySelector('.navbar');
        const body = document.querySelector('body');

        burger.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                body.classList.remove('no__scroll');
                navbar.classList.remove('active');
            } else {
                body.classList.add('no__scroll');
                navbar.classList.add('active');
            }
        });

        const navlink = document.querySelectorAll('.navlink');
        navlink.forEach((link) => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    if (burger.checked) {
                        burger.click();
                    }
                }
            });
        });

        const header = document.querySelector('.header');
        window.addEventListener('resize', () => {
            if (navbar.classList.contains('active')) {
                if (burger.checked) {
                    burger.click();
                }
            }
        });
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                header.classList.add('header__scroll');
            } else {
                header.classList.remove('header__scroll');
            }
        });

        // $navlink.click(function (e) {
        //     e.preventDefault();
        //     const $target = $($(this).attr('href'));
        //     const targetOffset = $target.offset().top;
        //     const headerHeight = $header.outerHeight();
        //     const scrollTo = targetOffset - headerHeight;

        //     $('html, body').animate({
        //         scrollTop: scrollTo
        //     }, 1000);
        // });

        navlink.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                const targetOffset = target.offsetTop;
                const headerHeight = header.offsetHeight;
                const scrollTo = targetOffset - headerHeight;
                window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                });
            });
        });


    }

    burger();

    // $navlink.click(function () {
    //     if ($navbar.hasClass('active')) {
    //         if (!isChangingState) {
    //             isChangingState = true;
    //             if (isOpen) {
    //                 showOpenBurger();
    //                 $navbar.removeClass('active');
    //                 $body.removeClass('no__scroll');
    //                 $navbar.css({
    //                     'transform': 'rotate(360deg)'
    //                 });
    //             }
    //         }
    //     }
    // });













    function musicToggle() {
        const music__wrapper = document.querySelector('.music__wrapper');
        const spans = document.querySelectorAll('span');
        const music = document.getElementById('music');
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
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
        });
    }
    musicToggle();

    function homeImgShadows() {
        // jeśli wielkość okna jest mniejsza niż 768px to nie wykonuj kodu

        const homeImgShadows = document.querySelector('.home__img-shadows');
        document.addEventListener('mousemove', e => {
            if (window.innerWidth < 888) return;
            const x = (e.clientX / window.innerWidth);
            const y = (e.clientY / window.innerHeight);
            homeImgShadows.style.transform = `translate3D(${x * 5 - 3}%, ${y * 5}%, 0)`;
        });
    }
    homeImgShadows();
});


























