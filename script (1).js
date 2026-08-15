/* =========================================
   VANDANA VILLA — SCRIPT.JS
   PART 1/2
========================================= */


/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.add("page-loaded");

    }, 500);

});



/* =========================================
   NAVBAR
========================================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("active");

        menuButton.classList.toggle(
            "active",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close menu after clicking a link */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add(
                    "is-visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top
                    +
                    window.scrollY
                    -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

    });



/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryCards =
    document.querySelectorAll(
        ".gallery-card"
    );

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


galleryCards.forEach(card => {

    card.addEventListener("click", () => {

        const image =
            card.dataset.gallery;

        if (
            !image ||
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        lightboxImage.src = image;

        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    });

});



/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}



/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);



/* =========================================
   SCROLL TO TOP
========================================= */

const scrollTop =
    document.getElementById(
        "scrollTop"
    );


window.addEventListener("scroll", () => {

    if (!scrollTop) return;


    if (window.scrollY > 700) {

        scrollTop.classList.add(
            "show"
        );

    } else {

        scrollTop.classList.remove(
            "show"
        );

    }

});


if (scrollTop) {

    scrollTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}



/* =========================================
   3D IMAGE TILT
========================================= */

const tiltElements =
    document.querySelectorAll(
        ".intro-image, .gallery-card, .beach-card, .amenity, .reach-card"
    );


tiltElements.forEach(element => {

    element.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 800
            ) {
                return;
            }


            const rect =
                element.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) /
                    centerX) * 3;


            const rotateX =
                ((centerY - y) /
                    centerY) * 3;


            element.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateZ(8px)`;

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform =
                "";

        }
    );

});



/* =========================================
   HERO PARALLAX
========================================= */

const heroImage =
    document.querySelector(
        ".hero-media img"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            !heroImage ||
            window.innerWidth <= 800
        ) {
            return;
        }


        const scrollY =
            window.scrollY;


        if (scrollY > window.innerHeight) {
            return;
        }


        heroImage.style.transform =
            `scale(1.03)
             translateY(${scrollY * 0.12}px)`;

    }
);
/* =========================================
   VANDANA VILLA — SCRIPT.JS
   PART 2/2
========================================= */


/* =========================================
   ENQUIRY FORM
========================================= */

const enquiryForm =
    document.getElementById("enquiryForm");


if (enquiryForm) {

    enquiryForm.addEventListener(
        "submit",
        event => {

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


            /* Basic validation */

            if (!name || !phone) {

                showFormMessage(
                    "Please enter your name and WhatsApp number.",
                    "error"
                );

                return;

            }


            /*
             * IMPORTANT:
             * Replace this number with the actual
             * Vandana Villa WhatsApp number later.
             *
             * Format:
             * 919XXXXXXXXX
             */

            const whatsappNumber =
                "919XXXXXXXXX";


            const enquiryText =
`Hello Vandana Villa,

I would like to make an enquiry.

Name: ${name}
Phone / WhatsApp: ${phone}
Email: ${email || "Not provided"}
Guests: ${guests || "Not specified"}
Preferred Date: ${date || "Not specified"}
Message: ${message || "No additional message"}

Thank you.`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiryText)}`;


            /*
             * Open WhatsApp
             */

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            /*
             * Reset form after sending
             */

            enquiryForm.reset();


            showFormMessage(
                "Your enquiry is ready to send on WhatsApp.",
                "success"
            );

        }
    );

}



/* =========================================
   FORM MESSAGE
========================================= */

function showFormMessage(
    message,
    type = "success"
) {

    let messageBox =
        document.getElementById(
            "form
