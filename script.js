/* =========================================
   VANDANA VILLA — SCRIPT.JS
   PART 1
========================================= */


/* ---------- ELEMENTS ---------- */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const scrollTop = document.getElementById("scrollTop");


/* ---------- STICKY NAVBAR ---------- */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ---------- MOBILE MENU ---------- */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

    });


    /* Close menu after clicking a link */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ---------- SCROLL TO TOP ---------- */

if (scrollTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");

        }

    });


    scrollTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ---------- CURRENT YEAR ---------- */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ---------- ESCAPE KEY ---------- */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


/* ---------- PREVENT EMPTY LINKS ---------- */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});
/* =========================================
   VANDANA VILLA — SCRIPT.JS
   PART 2
========================================= */


/* ---------- 3D CARD INTERACTION ---------- */

const cards = document.querySelectorAll(
    ".space-card, .amenity-card, .experience-card, .reach-card, .beach-card"
);

const isTouchDevice =
    window.matchMedia("(hover: none)").matches ||
    navigator.maxTouchPoints > 0;


if (!isTouchDevice) {

    cards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            const rotateX =
                ((centerY - y) / centerY) * 5;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)
                 translateZ(15px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* ---------- 3D IMAGE INTERACTION ---------- */

const aboutImage =
    document.querySelector(".about-image");

if (aboutImage && !isTouchDevice) {

    const image =
        aboutImage.querySelector("img");

    aboutImage.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                aboutImage.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x - rect.width / 2) /
                    (rect.width / 2)) * 4;

            const rotateX =
                ((rect.height / 2 - y) /
                    (rect.height / 2)) * 4;

            image.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateZ(20px)`;

        }
    );


    aboutImage.addEventListener(
        "mouseleave",
        () => {

            image.style.transform = "";

        }
    );

}


/* ---------- SCROLL REVEAL ---------- */

const revealElements =
    document.querySelectorAll(".reveal-3d");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

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

        element.classList.add("is-visible");

    });

}


/* ---------- SMOOTH ANCHOR SCROLL ---------- */

document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
).forEach(link => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ---------- PAGE VISIBILITY ---------- */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.title =
                "Vandana Villa | Gorai";

        } else {

            document.title =
                "Vandana Villa | Private Luxury Villa in Gorai, Mumbai";

        }

    }
);


/* ---------- SAFETY RESET ON RESIZE ---------- */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 768) {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* ---------- PAGE READY ---------- */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
