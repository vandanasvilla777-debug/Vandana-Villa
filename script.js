/* =========================================
   VANDANA VILLA — FINAL SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     ELEMENTS
  ----------------------------------------- */

  const header = document.getElementById("navbar");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  const amenityModal = document.getElementById("amenityModal");
  const amenityModalClose = document.getElementById("amenityModalClose");
  const amenityModalImage = document.getElementById("amenityModalImage");
  const amenityModalTitle = document.getElementById("amenityModalTitle");
  const amenityModalText = document.getElementById("amenityModalText");

  const enquiryForm = document.getElementById("enquiryForm");

  const currentYear = document.getElementById("currentYear");


  /* -----------------------------------------
     SETTINGS
  ----------------------------------------- */

  const whatsappNumber = "919601996733";


  /* -----------------------------------------
     CURRENT YEAR
  ----------------------------------------- */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* -----------------------------------------
     HEADER + SCROLL TOP
  ----------------------------------------- */

  function handleScroll() {

    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();


  /* -----------------------------------------
     SCROLL TO TOP
  ----------------------------------------- */

  if (scrollTopBtn) {

    scrollTopBtn.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* -----------------------------------------
     MOBILE MENU
  ----------------------------------------- */

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        mobileMenu.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });


    /* Close menu after clicking a link */

    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      });

    });

  }


  /* -----------------------------------------
     SMOOTH INTERNAL NAVIGATION
  ----------------------------------------- */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {

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

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* -----------------------------------------
     ACTIVE NAVIGATION
  ----------------------------------------- */

  const sections =
    [...document.querySelectorAll(
      "main section[id]"
    )];

  const navLinks =
    [
      ...document.querySelectorAll(
        ".desktop-nav a, .mobile-menu a"
      )
    ];


  function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
      window.scrollY +
      (header ? header.offsetHeight : 0) +
      120;


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;

      const sectionBottom =
        sectionTop +
        section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionBottom
      ) {
        currentSection =
          section.id;
      }

    });


    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  updateActiveNavigation();


  /* -----------------------------------------
     AMENITY MODAL
  ----------------------------------------- */

  function closeAmenityModal() {

    if (!amenityModal) {
      return;
    }

    amenityModal.classList.remove("active");

    amenityModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  function openAmenityModal(card) {

    if (!amenityModal) {
      return;
    }

    const title =
      card.dataset.title ||
      card.querySelector("h3")?.textContent ||
      "Vandana Villa";

    const description =
      card.dataset.description ||
      "Enjoy this facility at Vandana Villa.";

    const image =
      card.dataset.image || "";


    /* Title */

    if (amenityModalTitle) {
      amenityModalTitle.textContent =
        title;
    }


    /* Description */

    if (amenityModalText) {
      amenityModalText.textContent =
        description;
    }


    /* Image */

    if (amenityModalImage) {

      if (image) {

        amenityModalImage.src =
          image;

        amenityModalImage.alt =
          title;

        amenityModalImage.style.display =
          "block";

      } else {

        amenityModalImage.removeAttribute(
          "src"
        );

        amenityModalImage.alt = "";

        amenityModalImage.style.display =
          "none";

      }

    }


    /* Open */

    amenityModal.classList.add(
      "active"
    );

    amenityModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

  }


  /* Amenity cards */

  const amenityCards =
    document.querySelectorAll(
      ".amenity-card"
    );


  amenityCards.forEach(card => {

    /* Mouse */

    card.addEventListener(
      "click",
      () => {
        openAmenityModal(card);
      }
    );


    /* Keyboard */

    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openAmenityModal(card);

        }

      }
    );

  });


  /* Close button */

  if (amenityModalClose) {

    amenityModalClose.addEventListener(
      "click",
      closeAmenityModal
    );

  }


  /* Close by clicking outside */

  if (amenityModal) {

    amenityModal.addEventListener(
      "click",
      event => {

        if (
          event.target === amenityModal
        ) {
          closeAmenityModal();
        }

      }
    );

  }


  /* -----------------------------------------
     GALLERY LIGHTBOX
  ----------------------------------------- */

  let lightbox = null;
  let lightboxImage = null;


  function createLightbox() {

    if (lightbox) {
      return;
    }


    lightbox =
      document.createElement("div");

    lightbox.className =
      "gallery-lightbox";


    lightbox.innerHTML = `
      <button
        class="gallery-lightbox-close"
        type="button"
        aria-label="Close image"
      >
        &times;
      </button>

      <img
        class="gallery-lightbox-image"
        src=""
        alt=""
      >
    `;


    document.body.appendChild(
      lightbox
    );


    lightboxImage =
      lightbox.querySelector(
        ".gallery-lightbox-image"
      );


    const closeButton =
      lightbox.querySelector(
        ".gallery-lightbox-close"
      );


    if (closeButton) {

      closeButton.addEventListener(
        "click",
        closeLightbox
      );

    }


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


  function openLightbox(image) {

    createLightbox();


    if (lightboxImage) {

      lightboxImage.src =
        image.currentSrc ||
        image.src;

      lightboxImage.alt =
        image.alt ||
        "Vandana Villa";

    }


    lightbox.classList.add(
      "active"
    );

    document.body.classList.add(
      "modal-open"
    );

  }


  function closeLightbox() {

    if (!lightbox) {
      return;
    }

    lightbox.classList.remove(
      "active"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  /* Gallery images */

  const galleryImages =
    document.querySelectorAll(
      ".gallery-item img"
    );


  galleryImages.forEach(image => {

    image.addEventListener(
      "click",
      () => {
        openLightbox(image);
      }
    );

  });


  /* -----------------------------------------
     ESCAPE KEY
  ----------------------------------------- */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeAmenityModal();

        closeLightbox();

      }

    }
  );


  /* -----------------------------------------
     ENQUIRY FORM → WHATSAPP
  ----------------------------------------- */

  if (enquiryForm) {

    enquiryForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const formData =
          new FormData(enquiryForm);


        const name =
          formData.get("name") || "";

        const phone =
          formData.get("phone") || "";

        const date =
          formData.get("date") || "";

        const guests =
          formData.get("guests") || "";

        const message =
          formData.get("message") || "";


        const whatsappMessage = `
Hello Vandana Villa,

I would like to make an enquiry.

Name: ${name}

WhatsApp / Phone: ${phone}

Preferred Date: ${date}

Number of Guests: ${guests}

Message:
${message}

Thank you.
        `.trim();


        const whatsappURL =
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`;


        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );


        /* Success message */

        const formMessage =
          enquiryForm.querySelector(
            ".form-message"
          );


        if (formMessage) {

          formMessage.textContent =
            "Your enquiry is ready to send on WhatsApp.";

        }

      }
    );

  }


  /* -----------------------------------------
     DATE INPUT — PREVENT PAST DATES
  ----------------------------------------- */

  const dateInput =
    document.getElementById("date");


  if (dateInput) {

    const today =
      new Date();


    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");


    dateInput.min =
      `${year}-${month}-${day}`;

  }


  /* -----------------------------------------
     CLOSE MOBILE MENU ON RESIZE
  ----------------------------------------- */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900 &&
        mobileMenu &&
        menuButton
      ) {

        mobileMenu.classList.remove(
          "open"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* -----------------------------------------
     IMAGE ERROR HANDLING
     Keeps broken image areas clean while
     photos are being added later.
  ----------------------------------------- */

  const allImages =
    document.querySelectorAll("img");


  allImages.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-not-found"
        );

      }
    );

  });

});
