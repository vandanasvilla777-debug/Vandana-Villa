/*====================================
VANDANA'S VILLA
script.js
====================================*/

// Wait until page loads
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

    AOS.init({
        duration: 900,
        once: true
    });

});


/*====================================
SCROLL TO TOP
====================================*/

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.style.display = "flex";

    } else {

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*====================================
DARK / LIGHT MODE
====================================*/

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");

    }

});

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    themeBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");

}
/*====================================
MOBILE MENU
====================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

        });

    });

}

/*====================================
SMOOTH SCROLL
====================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

/*====================================
HEADER SHADOW
====================================*/

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.background = "rgba(0,0,0,0.90)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(0,0,0,0.55)";
        header.style.boxShadow = "none";

    }

});

/*====================================
CURRENT YEAR
====================================*/

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}
/*====================================
GALLERY LIGHTBOX
====================================*/

const galleryImages = document.querySelectorAll(".gallery-grid img");

if (galleryImages.length) {

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";

    lightbox.innerHTML = `
        <span id="closeLightbox">&times;</span>
        <img id="lightboxImg" src="" alt="Gallery Image">
    `;

    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");

    galleryImages.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;

        });

    });

    closeBtn.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }

    });

}

/*====================================
LAZY IMAGE FADE-IN
====================================*/

const images = document.querySelectorAll("img");

images.forEach(img => {

    img.addEventListener("load", () => {

        img.classList.add("loaded");

    });

});

/*====================================
CONSOLE MESSAGE
====================================*/

console.log("%cWelcome to Vandana's Villa", "color:#D4AF37;font-size:20px;font-weight:bold;");
console.log("%cLuxury Villa Website", "color:white;font-size:14px;");
