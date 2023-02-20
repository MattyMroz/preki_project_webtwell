document.addEventListener('DOMContentLoaded', () => {
    // NAVIGATION
    function navigation() {
        const burger = document.getElementById('burger');
        const navbar = document.querySelector('.navbar');
        const body = document.querySelector('body');

        // BURGER ON CLICK
        burger.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                body.classList.remove('no__scroll');
                navbar.classList.remove('active');
            } else {
                body.classList.add('no__scroll');
                navbar.classList.add('active');
            }
        });

        // NAVLINK ON CLICK
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

        // CLOSE BURGER ON RESIZE
        const header = document.querySelector('.header');
        window.addEventListener('resize', () => {
            if (navbar.classList.contains('active')) {
                if (burger.checked) {
                    burger.click();
                }
            }
        });

        // HEADER ON SCROLL
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                header.classList.add('header__scroll');
            } else {
                header.classList.remove('header__scroll');
            }
        });

        // SMOOTH SCROLL
        navlink.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                const targetOffset = target.offsetTop;
                const headerHeight = header.offsetHeight;
                const scrollTo = targetOffset - headerHeight;
                // jQuery bo fajnie działa *_*, może zwalniać strone
                $('html, body').animate({
                    scrollTop: scrollTo
                }, 1000);

                return false;
                // Alternatywa bez jQuery
                // window.scrollTo({
                //     top: scrollTo,
                //     behavior: 'smooth',
                // });
            });
        });
    }

    navigation();


    // ANIMATION MUSIC TOGGLE
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

    // ANIMATION HOME IMG SHADOWS
    function homeImgShadows() {
        const homeImgShadows = document.querySelector('.home__img-shadows');
        document.addEventListener('mousemove', e => {
            if (window.innerWidth < 888) return;
            const x = (e.clientX / window.innerWidth);
            const y = (e.clientY / window.innerHeight);
            homeImgShadows.style.transform = `translate3D(${x * 5 - 3}%, ${y * 5}%, 0)`;
        });
    }
    homeImgShadows();

    // ANIMATION SUBTITLE LEFT
    function subtitleLeftAnimation() {
        const textWrapper = document.querySelector('.subtitle__left-animation');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<pre class='letter'>$&</pre>");
        let currentTextIndex = 0;
        // Change text here
        const textChange = ['stand out and change\nthe game', 'impress and make your\ncustomer return', 'inspire and develop\na relationship', 'and attract new\ncustomers'];

        function animateText() {
            anime.timeline()
                .add({
                    targets: '.subtitle__left-animation .letter',
                    scale: [3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 1000,
                    delay: (el, i) => 70 * i
                }).add({
                    targets: '.subtitle__left-animation',
                    opacity: 1,
                    duration: 3000,
                    easing: "easeOutExpo",
                    complete: function (anim) {
                        currentTextIndex = (currentTextIndex + 1) % textChange.length;
                        textWrapper.innerHTML = textChange[currentTextIndex].replace(/\S/g, "<pre class='letter'>$&</pre>");
                        animateText();
                    }
                });
        }

        setTimeout(() => {
            animateText();
        }, 3000);
    }
    subtitleLeftAnimation();
});







        // Animacja pojawiania się kolejnych liter:

        // Skalowanie od 4 do 1 trwa 1000 ms.
        // Przejście z przezroczystości 0 na 1 trwa 1000 ms.
        // Opoznienie między pojawieniem kolejnych liter wynosi 70ms.
        // Szacunkowy czas animacji dla każdej litery to około 70 * liczba_liter + 1000 ms.
        // Animacja zanikania tekstu:

        // Przejście z przezroczystości 1 na 0 trwa 1000 ms.
        // Opoznienie przed zmianą tekstu wynosi 1000 ms.
        // Szacunkowy czas całej animacji zanikania tekstu to około 2000 ms.



















