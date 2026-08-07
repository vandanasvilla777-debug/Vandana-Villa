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
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
        menu.style.flexDirection = "column";
        menu.style.position = "absolute";
        menu.style.top = "90px";
        menu.style.left = "0";
        menu.style.width = "100%";
        menu.style.background = "#111";
        menu.style.padding = "20px";
        menu.style.gap = "20px";
    }
});

// ==============================
// CLOSE MENU AFTER CLICK
// ==============================
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
            menu.style.display = "none";
        }
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
// GALLERY IMAGE VIEW
// ==============================
document.querySelectorAll(".gallery-grid img").forEach(img => {

    img.addEventListener("click", () => {

        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.width = "100%";
        popup.style.height = "100%";
        popup.style.background = "rgba(0,0,0,0.95)";
        popup.style.display = "flex";
        popup.style.justifyContent = "center";
        popup.style.alignItems = "center";
        popup.style.zIndex = "99999";
        popup.style.cursor = "pointer";

        const image = document.createElement("img");
        image.src = img.src;
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90%";
        image.style.borderRadius = "15px";

        popup.appendChild(image);
        document.body.appendChild(popup);

        popup.addEventListener("click", () => {
            popup.remove();
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
// FADE ANIMATION
// ==============================
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll("section").forEach(sec => {

    sec.style.opacity = "0";
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "0.8s";

    observer.observe(sec);

});
