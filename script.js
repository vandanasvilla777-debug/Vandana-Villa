// ==============================
// LOADER
// ==============================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.transition = "0.5s";
    }, 1000);
});

// ==============================
// STICKY HEADER
// ==============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ==============================
// MOBILE MENU
// ==============================

const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {

    menu.classList.toggle("mobile-open");

    menuBtn.classList.toggle("active");

});

// ==============================
// CLOSE MENU AFTER CLICK
// ==============================

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("mobile-open");
        menuBtn.classList.remove("active");

    });

});

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ==============================
// PREMIUM 3D GALLERY LIGHTBOX
// ==============================

const galleryImages = document.querySelectorAll(".gallery-grid img");

let currentImage = 0;

galleryImages.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentImage = index;

        const lightbox = document.createElement("div");
        lightbox.className = "premium-lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>

            <button class="lightbox-prev">&#10094;</button>

            <div class="lightbox-content">

                <img src="${galleryImages[currentImage].src}"
                     alt="Vandana Villa Gallery">

                <div class="lightbox-counter">
                    ${currentImage + 1} / ${galleryImages.length}
                </div>

            </div>

            <button class="lightbox-next">&#10095;</button>
        `;

        document.body.appendChild(lightbox);

        document.body.style.overflow = "hidden";

        const lightboxImage =
            lightbox.querySelector(".lightbox-content img");

        const counter =
            lightbox.querySelector(".lightbox-counter");

        function showImage(index) {

            currentImage =
                (index + galleryImages.length) %
                galleryImages.length;

            lightboxImage.style.opacity = "0";

            setTimeout(() => {

                lightboxImage.src =
                    galleryImages[currentImage].src;

                counter.textContent =
                    `${currentImage + 1} / ${galleryImages.length}`;

                lightboxImage.style.opacity = "1";

            }, 150);
        }

        lightbox
            .querySelector(".lightbox-next")
            .addEventListener("click", (e) => {

                e.stopPropagation();

                showImage(currentImage + 1);

            });

        lightbox
            .querySelector(".lightbox-prev")
            .addEventListener("click", (e) => {

                e.stopPropagation();

                showImage(currentImage - 1);

            });

        lightbox
            .querySelector(".lightbox-close")
            .addEventListener("click", () => {

                lightbox.remove();

                document.body.style.overflow = "";

            });

        lightbox.addEventListener("click", (e) => {

            if (e.target === lightbox) {

                lightbox.remove();

                document.body.style.overflow = "";

            }

        });

        document.addEventListener("keydown", function keyboardHandler(e) {

            if (!document.body.contains(lightbox)) {

                document.removeEventListener(
                    "keydown",
                    keyboardHandler
                );

                return;

            }

            if (e.key === "Escape") {

                lightbox.remove();

                document.body.style.overflow = "";

            }

            if (e.key === "ArrowRight") {

                showImage(currentImage + 1);

            }

            if (e.key === "ArrowLeft") {

                showImage(currentImage - 1);

            }

        });

    });

});

// ==============================
// CONTACT FORM
// ==============================
const form = document.querySelector(".contact-form");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    alert("Thank you! Your enquiry has been sent.");

    form.reset();

});
// ==============================
// PREMIUM SCROLL REVEAL
// ==============================

const revealElements = document.querySelectorAll(
    ".section-heading, .highlight-card, .amenity, .gallery-grid img, .about-image, .about-content, .location-info, .map, .contact-form"
);

revealElements.forEach((element, index) => {

    element.classList.add("reveal-element");

});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("reveal-visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    revealObserver.observe(element);

});

const toggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggle.textContent = "☀️";
} else {
    toggle.textContent = "🌙";
}

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        toggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});
// =========================================
// PREMIUM 3D MOUSE TILT
// =========================================

const tiltCards = document.querySelectorAll(
    ".highlight-card, .amenity"
);

tiltCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 4;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
            scale(1.02)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});
// =========================================
// PREMIUM HERO 3D PARALLAX
// =========================================

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

if (hero && heroContent) {

    hero.addEventListener("mousemove", (e) => {

        if (window.innerWidth <= 768) return;

        const rect = hero.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x / rect.width - 0.5) * 12;
        const moveY = (y / rect.height - 0.5) * 8;

        heroContent.style.transform = `
            translate3d(${moveX}px, ${moveY}px, 0)
        `;

    });

    hero.addEventListener("mouseleave", () => {

        heroContent.style.transform =
            "translate3d(0, 0, 0)";

    });

}
// =========================================
// CINEMATIC HERO BACKGROUND PARALLAX
// =========================================

if (hero) {

    hero.addEventListener("mousemove", (e) => {

        if (window.innerWidth <= 768) return;

        const rect = hero.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x / rect.width - 0.5) * 10;
        const moveY = (y / rect.height - 0.5) * 6;

        hero.style.backgroundPosition =
            `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;

    });

    hero.addEventListener("mouseleave", () => {

        hero.style.backgroundPosition =
            "center center";

    });

}
