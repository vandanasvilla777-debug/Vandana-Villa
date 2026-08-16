/* =========================================
   VANDANA VILLA
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADER
    ===================================== */

    const loader = document.getElementById("loader");

    function hideLoader() {
        if (loader) {
            loader.classList.add("loaded");

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }
    }

    window.addEventListener("load", hideLoader);

    setTimeout(hideLoader, 3000);


    /* =====================================
       STICKY HEADER
    ===================================== */

    const header = document.querySelector("header");

    if (header) {

        const handleHeader = () => {

            if (window.scrollY > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", handleHeader, {
            passive: true
        });

        handleHeader();
    }


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            mobileMenu.classList.toggle(
                "active",
                !isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                !isOpen
            );

        });


        /* Close menu after clicking a link */

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.classList.remove("active");

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                menuButton.getAttribute("aria-expanded") === "true"
            ) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.classList.remove("active");

                document.body.classList.remove(
                    "menu-open"
                );
            }

        });

    }


    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================
       REDUCED MOTION
    ===================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }

});
/* =====================================
   GALLERY LIGHTBOX
===================================== */

const galleryImages =
    document.querySelectorAll(".gallery-grid img");

galleryImages.forEach((image, index) => {

    image.style.cursor = "pointer";

    image.addEventListener("click", () => {

        const lightbox =
            document.createElement("div");

        lightbox.className = "gallery-lightbox";

        lightbox.innerHTML = `
            <button
                class="lightbox-close"
                type="button"
                aria-label="Close gallery"
            >
                &times;
            </button>

            <button
                class="lightbox-prev"
                type="button"
                aria-label="Previous image"
            >
                &#10094;
            </button>

            <img
                class="lightbox-image"
                src="${image.src}"
                alt="${image.alt || "Vandana Villa gallery image"}"
            >

            <button
                class="lightbox-next"
                type="button"
                aria-label="Next image"
            >
                &#10095;
            </button>
        `;

        document.body.appendChild(lightbox);

        document.body.style.overflow = "hidden";

        const lightboxImage =
            lightbox.querySelector(".lightbox-image");

        const closeButton =
            lightbox.querySelector(".lightbox-close");

        const previousButton =
            lightbox.querySelector(".lightbox-prev");

        const nextButton =
            lightbox.querySelector(".lightbox-next");

        let currentIndex = index;

        function showImage(newIndex) {

            if (newIndex < 0) {
                newIndex = galleryImages.length - 1;
            }

            if (newIndex >= galleryImages.length) {
                newIndex = 0;
            }

            currentIndex = newIndex;

            const currentImage =
                galleryImages[currentIndex];

            lightboxImage.src =
                currentImage.src;

            lightboxImage.alt =
                currentImage.alt ||
                "Vandana Villa gallery image";
        }

        function closeLightbox() {

            lightbox.remove();

            document.body.style.overflow = "";

            document.removeEventListener(
                "keydown",
                keyboardHandler
            );
        }

        function keyboardHandler(event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            }

            if (event.key === "ArrowRight") {
                showImage(currentIndex + 1);
            }

        }

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

        previousButton.addEventListener(
            "click",
            () => {
                showImage(currentIndex - 1);
            }
        );

        nextButton.addEventListener(
            "click",
            () => {
                showImage(currentIndex + 1);
            }
        );

        lightbox.addEventListener(
            "click",
            event =>
                       if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );

        document.addEventListener(
            "keydown",
            keyboardHandler
        );

    });

});
/* =====================================
   AMENITIES CLICK MODAL
===================================== */

const amenityCards =
    document.querySelectorAll(".amenity-card");

const amenityModal =
    document.getElementById("amenityModal");

const amenityModalImage =
    document.getElementById("amenityModalImage");

const amenityModalTitle =
    document.getElementById("amenityModalTitle");

const amenityModalText =
    document.getElementById("amenityModalText");

const amenityModalClose =
    document.getElementById("amenityModalClose");


if (
    amenityCards.length &&
    amenityModal
) {

    function openAmenity(card) {

        const title =
            card.dataset.amenityTitle || "Amenity";

        const image =
            card.dataset.amenityImage || "";

        const text =
            card.dataset.amenityText || "";

        amenityModalTitle.textContent =
            title;

        amenityModalText.textContent =
            text;

        if (image) {

            amenityModalImage.src =
                image;

            amenityModalImage.alt =
                title +
                " at Vandana Villa";

        }

        amenityModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeAmenity() {

        amenityModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    amenityCards.forEach(card => {

        card.setAttribute(
            "tabindex",
            "0"
        );

        card.addEventListener(
            "click",
            () => {
                openAmenity(card);
            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openAmenity(card);

                }

            }
        );

    });


    if (amenityModalClose) {

        amenityModalClose.addEventListener(
            "click",
            closeAmenity
        );

    }


    amenityModal.addEventListener(
        "click",
        event => {

            if (
                event.target === amenityModal
            ) {
                closeAmenity();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                amenityModal.getAttribute(
                    "aria-hidden"
                ) === "false"
            ) {

                closeAmenity();

            }

        }
    );

}
/* =====================================
   SCROLL TO TOP
===================================== */

const scrollTopButton =
    document.getElementById("scrollTopBtn");

if (scrollTopButton) {

    function updateScrollButton() {

        if (window.scrollY > 500) {

            scrollTopButton.classList.add(
                "show"
            );

        } else {

            scrollTopButton.classList.remove(
                "show"
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateScrollButton,
        { passive: true }
    );

    updateScrollButton();


    scrollTopButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}
/* =====================================
   LIGHT / DARK THEME
===================================== */

const themeToggle =
    document.getElementById("themeToggle");

if (themeToggle) {

    const savedTheme =
        localStorage.getItem("vandana-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }


    function updateThemeButton() {

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            String(isLight)
        );

    }


    themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                document.body.classList.toggle(
                    "light-mode"
                );

            localStorage.setItem(
                "vandana-theme",
                isLight
                    ? "light"
                    : "dark"
            );

            updateThemeButton();

        }
    );


    updateThemeButton();

}
/* =====================================
   ACTIVE NAVIGATION LINK
===================================== */

const pageSections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(
        "#mobileMenu a[href^='#'], nav a[href^='#']"
    );

if (
    pageSections.length &&
    navigationLinks.length
) {

    function updateActiveLink() {

        let currentSection = "";

        pageSections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === "#" + currentSection
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();

}
/* =====================================
   PREMIUM 3D CARD TILT
===================================== */

const tiltCards =
    document.querySelectorAll(
        ".highlight-card, .amenity-card"
    );

if (tiltCards.length) {

    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth <= 768) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -4;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                card.style.transform = `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}
/* =====================================
   AUTO FOOTER YEAR
===================================== */

const footerYear =
    document.getElementById("currentYear");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =====================================
   IMAGE LAZY LOAD FALLBACK
===================================== */

const lazyImages =
    document.querySelectorAll("img[loading='lazy']");

if ("IntersectionObserver" in window) {

    const imageObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const image = entry.target;

                if (image.dataset.src) {

                    image.src =
                        image.dataset.src;

                }

                imageObserver.unobserve(image);

            });

        });

    lazyImages.forEach(image => {

        imageObserver.observe(image);

    });

}


/* =====================================
   CONSOLE MESSAGE
===================================== */

console.log(
    "Vandana Villa Website Loaded Successfully"
);

});
