const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

});


const offersTrack = document.getElementById("offers-track");
const offersPrev = document.getElementById("offers-prev");
const offersNext = document.getElementById("offers-next");
const offersProgress = document.getElementById("offers-progress-bar");

if (offersTrack && offersPrev && offersNext) {
    function moveOffers(direction) {
        const card = offersTrack.querySelector(".offer-card");

        if (!card) return;

        const styles = getComputedStyle(offersTrack);
        const gap = parseFloat(styles.columnGap) || 0;
        const cardWidth = card.getBoundingClientRect().width;

        // Avanza exactamente una tarjeta por clic
        offersTrack.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: "smooth"
        });
    }

    offersNext.addEventListener("click", () => {
        moveOffers(1);
    });

    offersPrev.addEventListener("click", () => {
        moveOffers(-1);
    });

    function updateOffersProgress() {
        const maxScroll =
            offersTrack.scrollWidth - offersTrack.clientWidth;

        const progress = maxScroll > 0
            ? (offersTrack.scrollLeft / maxScroll) * 100
            : 100;

        if (offersProgress) {
            offersProgress.style.width = `${progress}%`;
        }

        offersPrev.disabled = offersTrack.scrollLeft <= 1;
        offersNext.disabled =
            offersTrack.scrollLeft >= maxScroll - 1;
    }

    offersTrack.addEventListener("scroll", updateOffersProgress);
    window.addEventListener("resize", updateOffersProgress);

    updateOffersProgress();
}


/* =========================================
   CARRUSEL PRINCIPAL HAB HOUSE
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrev = document.getElementById("hero-prev");
const heroNext = document.getElementById("hero-next");

if (heroSlides.length > 0) {
    let currentHero = 0;
    let heroTimer;

    function showHero(index) {
        currentHero = (index + heroSlides.length) % heroSlides.length;

        heroSlides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentHero);
        });

        heroDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentHero);
        });
    }

    function nextHero() {
        showHero(currentHero + 1);
    }

    function previousHero() {
        showHero(currentHero - 1);
    }

    function startHeroTimer() {
        clearInterval(heroTimer);
        heroTimer = setInterval(nextHero, 6000);
    }

    if (heroNext) {
        heroNext.addEventListener("click", () => {
            nextHero();
            startHeroTimer();
        });
    }

    if (heroPrev) {
        heroPrev.addEventListener("click", () => {
            previousHero();
            startHeroTimer();
        });
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showHero(index);
            startHeroTimer();
        });
    });

    showHero(0);
    startHeroTimer();
}

