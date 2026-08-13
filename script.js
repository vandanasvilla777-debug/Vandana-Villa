// ==============================
// LOADER — SAFE VERSION
// ==============================
function hideLoader() {
    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.style.transition = "opacity 0.6s ease, visibility 0.6s ease";
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
        loader.style.display = "none";
    }, 700);
}

window.addEventListener("load", () => {
    setTimeout(hideLoader, 800);
});

// Safety fallback — loader kabhi permanently stuck nahi hoga
setTimeout(hideLoader, 5000);
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

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        alert("Thank you! Your enquiry has been sent.");

        form.reset();
    });
}
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

// =========================================
// PREMIUM 3D MOUSE TILT
// =========================================

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
// =========================================
// PREMIUM 3D CURSOR LIGHT
// =========================================

const lightCards = document.querySelectorAll(
    ".highlight-card, .amenity"
);

lightCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

});
// =========================================
// PREMIUM MAGNETIC BUTTONS
// =========================================

const magneticButtons = document.querySelectorAll(
    ".btn-primary, .btn-secondary"
);

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", (e) => {

        if (window.innerWidth <= 768) return;

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.18;
        const moveY = y * 0.18;

        button.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});
// =========================================
// ABOUT IMAGE 3D PARALLAX
// =========================================

const aboutImage = document.querySelector(".about-image");

if (aboutImage) {

    aboutImage.addEventListener("mousemove", (e) => {

        if (window.innerWidth <= 768) return;

        const rect =
            aboutImage.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 8;

        const rotateX =
            ((y / rect.height) - 0.5) * -6;

        const image =
            aboutImage.querySelector("img");

        image.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(18px)
            scale(1.015)
        `;

    });

    aboutImage.addEventListener("mouseleave", () => {

        const image =
            aboutImage.querySelector("img");

        image.style.transform = "";

    });

}
// =========================================
// PLAYFUL AMENITY FLOAT
// =========================================

const amenityIcons =
    document.querySelectorAll(".amenity i");

amenityIcons.forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        if (window.innerWidth <= 768) return;

        icon.style.animation =
            "amenityFloat .7s ease";

    });

    icon.addEventListener("animationend", () => {

        icon.style.animation = "";

    });

});
