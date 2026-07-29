// ===========================
// STICKY NAVBAR
// ===========================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,0.85)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
    } else {
        header.style.background = "rgba(0,0,0,.45)";
        header.style.boxShadow = "none";
    }

});

// ===========================
// BACK TO TOP BUTTON
// ===========================

const topBtn = document.getElementById("topBtn");

topBtn.style.display = "none";

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ===========================
// SCROLL ANIMATION
// ===========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".card,.about-image,.about-text,.gallery img,.contact form")
.forEach((el) => {

    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";
    el.style.transition = ".8s";

    observer.observe(el);

});

// ===========================
// ACTIVE MENU
// ===========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (scrollY >= top) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});
// ===========================
// LOADER
// ===========================

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader")
.classList.add("hide");

},1200);

});
// ===========================
// GALLERY LIGHTBOX
// ===========================

const galleryImages =
document.querySelectorAll(".gallery img");

const lightbox =
document.querySelector(".lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const closeBtn =
document.querySelector(".close-lightbox");

galleryImages.forEach(img=>{

img.onclick=()=>{

lightbox.style.display="flex";

lightboxImg.src=img.src;

}

});

closeBtn.onclick=()=>{

lightbox.style.display="none";

}

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

}
