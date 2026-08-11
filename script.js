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
