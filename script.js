/* =========================================
   VANDANA VILLA — SAFE FINAL JS
   3D • SCROLL TOP • MENU • LOADER
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    const loader = document.getElementById("loader");

    if (loader) {

        document.body.classList.add("no-scroll");

        const hideLoader = () => {
            loader.classList.add("loaded");
            document.body.classList.remove("no-scroll");
        };

        window.addEventListener("load", () => {
            setTimeout(hideLoader, 350);
        }, { once: true });

        /* Safety fallback */
        setTimeout(hideLoader, 3000);
    }


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.getElementById("menu");

    if (menuBtn && menu) {

        menuBtn.addEventListener("click", (e) => {

            e.preventDefault();

            menu.classList.toggle("mobile-open");
            menuBtn.classList.toggle("active");

        });

        menu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("mobile-open");
                menuBtn.classList.remove("active");

            });

        });
    }


    /* =========================
       HEADER SCROLL
    ========================= */

    const header = document.querySelector("header");

    const updateHeader = () => {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================
       3D CARD EFFECT
       DESKTOP ONLY
    ========================= */

    const cards = document.querySelectorAll(
        ".highlight-card, .amenity-card, .nearby-card"
    );

    cards.forEach(card => {

        card.addEventListener("pointermove", (event) => {

            if (window.innerWidth <= 768) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const rotateX =
                (0.5 - y) * 7;

            const rotateY =
                (x - 0.5) * 7;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateZ(5px)`;

        });

        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =========================
       SCROLL TO TOP
    ========================= */

    let scrollTop =
        document.getElementById("scrollTop");

    if (!scrollTop) {

        scrollTop =
            document.createElement("button");

        scrollTop.id = "scrollTop";

        scrollTop.type = "button";

        scrollTop.setAttribute(
            "aria-label",
            "Scroll to top"
        );

        scrollTop.innerHTML =
            '<i class="fas fa-arrow-up"></i>';

        document.body.appendChild(scrollTop);
    }


    const updateScrollButton = () => {

        scrollTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    };

    window.addEventListener(
        "scroll",
        updateScrollButton,
        { passive: true }
    );

    updateScrollButton();


    scrollTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================
       SMOOTH ANCHOR SCROLL
    ========================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", function(e) {

            const id =
                this.getAttribute("href");

            if (!id || id === "#") return;

            const target =
                document.querySelector(id);

            if (!target) return;

            e.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                10;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });

});
/* =========================================
   SCROLL TO TOP — 3D GOLD / OLIVE BUTTON
   ========================================= */

#scrollTop {
    position: fixed;

    right: 22px;
    bottom: 22px;

    width: 52px;
    height: 52px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid rgba(201,164,92,.55);
    border-radius: 17px;

    background:
        linear-gradient(
            145deg,
            var(--gold),
            var(--olive)
        );

    color: #fff;

    font-size: 18px;

    cursor: pointer;

    opacity: 0;
    visibility: hidden;

    transform:
        translateY(20px)
        scale(.85);

    box-shadow:
        0 12px 30px rgba(55,48,35,.20),
        inset 0 1px 0 rgba(255,255,255,.35);

    transition:
        opacity .3s ease,
        visibility .3s ease,
        transform .3s ease,
        box-shadow .3s ease;

    z-index: 9998;
}

#scrollTop.show {
    opacity: 1;
    visibility: visible;

    transform:
        translateY(0)
        scale(1);
}

#scrollTop:hover {
    transform:
        translateY(-5px)
        scale(1.06);

    box-shadow:
        0 20px 40px rgba(55,48,35,.25),
        inset 0 1px 0 rgba(255,255,255,.45);
}

#scrollTop:active {
    transform:
        translateY(-1px)
        scale(.97);
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 768px) {

    #scrollTop {
        right: 15px;
        bottom: 15px;

        width: 48px;
        height: 48px;

        border-radius: 15px;
    }
}
