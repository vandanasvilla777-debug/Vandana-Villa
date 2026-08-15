/* =========================================
   VANDANA VILLA — COMPLETE SCRIPT.JS
========================================= */

(function () {

    "use strict";

    /* ---------- PAGE LOADER ---------- */

    function hideLoader() {
        document.body.classList.add("page-loaded");
    }

    window.addEventListener("load", function () {
        setTimeout(hideLoader, 400);
    });

    /* Safety: never stay on loader forever */
    setTimeout(hideLoader, 2500);


    /* ---------- ELEMENTS ---------- */

    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const scrollTop = document.getElementById("scrollTop");


    /* ---------- NAVBAR ---------- */

    window.addEventListener("scroll", function () {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

        if (scrollTop) {
            scrollTop.classList.toggle(
                "show",
                window.scrollY > 600
            );
        }

    }, { passive: true });


    /* ---------- MOBILE MENU ---------- */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            const open =
                mobileMenu.classList.toggle("active");

            menuButton.classList.toggle(
                "active",
                open
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(open)
            );

        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* ---------- SMOOTH SCROLL ---------- */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const id = link.getAttribute("href");

            if (!id || id === "#") return;

            const target = document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            const offset =
                navbar ? navbar.offsetHeight : 0;

            window.scrollTo({
                top:
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset,
                behavior: "smooth"
            });

        });

    });


    /* ---------- SCROLL REVEAL ---------- */

    const revealItems =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(function (entries, obs) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    obs.unobserve(entry.target);

                });

            }, {
                threshold: 0.1
            });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });

    } else {

        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });

    }


    /* ---------- SCROLL TO TOP ---------- */

    if (scrollTop) {

        scrollTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ---------- GALLERY LIGHTBOX ---------- */

    const galleryCards =
        document.querySelectorAll(".gallery-card");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    galleryCards.forEach(function (card) {

        card.addEventListener("click", function () {

            if (!lightbox || !lightboxImage) return;

            const image =
                card.dataset.gallery ||
                card.querySelector("img")?.src;

            if (!image) return;

            lightboxImage.src = image;

            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

        });

    });


    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    /* ---------- 3D EFFECT ---------- */

    const tiltItems =
        document.querySelectorAll(
            ".intro-image, .gallery-card, .beach-card, .amenity, .reach-card, .space-card, .experience-card"
        );


    if (window.matchMedia("(hover: hover)").matches) {

        tiltItems.forEach(function (item) {

            item.addEventListener("mousemove", function (event) {

                const rect =
                    item.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x - rect.width / 2) /
                    (rect.width / 2)) * 3;

                const rotateX =
                    ((rect.height / 2 - y) /
                    (rect.height / 2)) * 3;

                item.style.transform =
                    "perspective(900px) " +
                    "rotateX(" + rotateX + "deg) " +
                    "rotateY(" + rotateY + "deg) " +
                    "translateZ(6px)";

            });


            item.addEventListener("mouseleave", function () {

                item.style.transform = "";

            });

        });

    }


    /* ---------- HERO PARALLAX ---------- */

    const heroImage =
        document.querySelector(".hero-media img");


    window.addEventListener("scroll", function () {

        if (
            !heroImage ||
            window.innerWidth <= 800
        ) return;

        if (window.scrollY >
            window.innerHeight) return;

        heroImage.style.transform =
            "scale(1.03) translateY(" +
            (window.scrollY * 0.08) +
            "px)";

    }, { passive: true });


    /* ---------- ENQUIRY FORM ---------- */

    const enquiryForm =
        document.getElementById("enquiryForm");


    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    document.getElementById("name")?.value.trim() || "";

                const phone =
                    document.getElementById("phone")?.value.trim() || "";

                const email =
                    document.getElementById("email")?.value.trim() || "";

                const guests =
                    document.getElementById("guests")?.value.trim() || "";

                const date =
                    document.getElementById("date")?.value || "";

                const message =
                    document.getElementById("message")?.value.trim() || "";


                if (!name || !phone) {

                    alert(
                        "Please enter your name and WhatsApp number."
                    );

                    return;

                }


                /*
                 * ACTUAL WHATSAPP NUMBER
                 * WILL BE ADDED AFTER LAUNCH.
                 */

                const whatsappNumber =
                    "919XXXXXXXXX";


                const text =
                    "Hello Vandana Villa,\n\n" +
                    "I would like to make an enquiry.\n\n" +
                    "Name: " + name + "\n" +
                    "Phone: " + phone + "\n" +
                    "Email: " + (email || "Not provided") + "\n" +
                    "Guests: " + (guests || "Not specified") + "\n" +
                    "Date: " + (date || "Not specified") + "\n" +
                    "Message: " + (message || "None");


                const url =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(text);


                window.open(
                    url,
                    "_blank",
                    "noopener"
                );

            }
        );

    }


    /* ---------- CURRENT YEAR ---------- */

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* ---------- DATE INPUT ---------- */

    const dateInput =
        document.getElementById("date");

    if (dateInput) {

        const today =
            new Date();

        const y =
            today.getFullYear();

        const m =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const d =
            String(today.getDate())
                .padStart(2, "0");

        dateInput.min =
            y + "-" + m + "-" + d;

    }


    /* ---------- CLOSE MENU ON ESC ---------- */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            mobileMenu &&
            menuButton
        ) {

            mobileMenu.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* ---------- JS READY ---------- */

    document.body.classList.add("js-ready");

})();
