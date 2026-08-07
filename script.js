/*=========================================
VANDANA'S VILLA
script.js
=========================================*/

// =========================
// LOADER
// =========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 1200);

});


// =========================
// STICKY HEADER
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// =========================
// MOBILE MENU
// =========================

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector("#menu");

menuBtn.addEventListener("click", () => {

    menu.classList.toggle("show");

});


// =========================
// CLOSE MENU
// =========================

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("show");

    });

});


// =========================
// SCROLL ANIMATION
// =========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show-element");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll("section,.highlight-card,.amenity,.gallery img")
.forEach(el => {

    el.classList.add("hidden-element");

    observer.observe(el);

});


// =========================
// GALLERY LIGHTBOX
// =========================

const images = document.querySelectorAll(".gallery-grid img");

images.forEach(img => {

    img.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.className = "lightbox";

        overlay.innerHTML = `

            <span class="close-lightbox">&times;</span>

            <img src="${img.src}">

        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {

            overlay.remove();

        });

    });

});


// =========================
// CONTACT FORM
// =========================

const form = document.querySelector(".contact-form");

form.addEventListener("submit", function(e){

e.preventDefault();

const name=this.querySelectorAll("input")[0].value;

const phone=this.querySelectorAll("input")[1].value;

const email=this.querySelectorAll("input")[2].value;

const message=this.querySelector("textarea").value;

const text=

`Hello Vandana's Villa,

Name : ${name}

Phone : ${phone}

Email : ${email}

Message : ${message}`;

window.open(

`https://wa.me/919769602777?text=${encodeURIComponent(text)}`,

"_blank"

);

this.reset();

});


// =========================
// ACTIVE MENU
// =========================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("#menu a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-150;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")=="#"+current){

link.classList.add("active");

}

});

});
// ===========================
// Scroll To Top Button
// ===========================

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        scrollTopBtn.style.display = "flex";
        scrollTopBtn.style.justifyContent = "center";
        scrollTopBtn.style.alignItems = "center";
    } else {
        scrollTopBtn.style.display = "none";
    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
