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
                let headerHeight = header.offsetHeight;
                // Jeśli szerokość okna jest większa niż 1000px i link prowadzi do sekcji services, to headerHeight = 0 - zabieg stylistyczny
                if (window.innerWidth > 1000 && link.getAttribute('href') === '#services') {
                    headerHeight = 0;
                }
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
            if (window.innerWidth < 1000) return;
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

    // SERVICES ANIMATION LETTERS DROP AND CHANGE TEXT
    function titleServicesAnimation() {
        let words = document.getElementsByClassName('word');
        let wordArray = [];
        let currentWord = 0;

        words[currentWord].style.opacity = 1;
        for (let i = 0; i < words.length; i++) {
            splitts__letters(words[i]);
        }

        function changeWord() {
            let cw = wordArray[currentWord];
            let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
            for (let i = 0; i < cw.length; i++) {
                animatets__letterOut(cw, i);
            }

            for (let i = 0; i < nw.length; i++) {
                nw[i].className = 'ts__letter behind';
                nw[0].parentElement.style.opacity = 1;
                animatets__letterIn(nw, i);
            }

            currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
        }

        function animatets__letterOut(cw, i) {
            setTimeout(function () {
                cw[i].className = 'ts__letter out';
            }, i * 80);
        }

        function animatets__letterIn(nw, i) {
            setTimeout(function () {
                nw[i].className = 'ts__letter in';
            }, 340 + (i * 80));
        }

        function splitts__letters(word) {
            let content = word.innerHTML;
            word.innerHTML = '';
            let ts__letters = [];
            for (let i = 0; i < content.length; i++) {
                let ts__letter = document.createElement('span');
                ts__letter.className = 'ts__letter';
                ts__letter.innerHTML = content.charAt(i);
                word.appendChild(ts__letter);
                ts__letters.push(ts__letter);
            }

            wordArray.push(ts__letters);
        }

        changeWord();
        setInterval(changeWord, 4000);
    }
    titleServicesAnimation();
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



















