/* =========================================
   VANDANA VILLA — FINAL SCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("navbar");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const currentYear = document.getElementById("currentYear");
  const pageLoader = document.getElementById("pageLoader");

  const amenityModal = document.getElementById("amenityModal");
  const amenityModalClose = document.getElementById("amenityModalClose");
  const amenityModalTitle = document.getElementById("amenityModalTitle");
  const amenityModalText = document.getElementById("amenityModalText");
  const amenityModalIcon = document.getElementById("amenityModalIcon");

  const enquiryForm = document.getElementById("enquiryForm");
  const dateInput = document.getElementById("date");

  const galleryLightbox = document.getElementById("galleryLightbox");
  const galleryLightboxClose = document.getElementById("galleryLightboxClose");
  const galleryLightboxImage = document.getElementById("galleryLightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");

  const whatsappNumber = "919601996733";

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  window.addEventListener("load", () => {
    window.setTimeout(() => pageLoader?.classList.add("is-hidden"), 250);
  });

  function handleScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("show", window.scrollY > 500);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function closeMobileMenu() {
    mobileMenu?.classList.remove("is-open");
    menuButton?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation menu");
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.toggle("is-open") ?? false;
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  function closeAmenityModal() {
    if (!amenityModal) return;
    amenityModal.classList.remove("active");
    amenityModal.setAttribute("aria-hidden", "true");
    syncModalLock();
  }

  function closeLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove("active");
    galleryLightbox.setAttribute("aria-hidden", "true");
    syncModalLock();
  }

  function syncModalLock() {
    const anyModalOpen =
      amenityModal?.classList.contains("active") ||
      galleryLightbox?.classList.contains("active");

    document.body.classList.toggle("modal-open", Boolean(anyModalOpen));
  }

  function closeAllOverlays() {
    closeAmenityModal();
    closeLightbox();
  }

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      // IMPORTANT: this fixes the old "gallery freezes the page" issue.
      // Any open modal/lightbox is closed before navigation.
      closeAllOverlays();
      closeMobileMenu();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        1;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      history.replaceState(null, "", targetId);
    });
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [
    ...document.querySelectorAll(".desktop-nav a, .mobile-menu a")
  ];

  function updateActiveNavigation() {
    let currentSection = "home";
    const scrollPosition =
      window.scrollY + (header ? header.offsetHeight : 0) + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  }

  window.addEventListener("scroll", updateActiveNavigation, { passive: true });
  window.addEventListener("resize", updateActiveNavigation);
  updateActiveNavigation();

  function openAmenityModal(card) {
    if (!amenityModal) return;

    const title =
      card.dataset.title ||
      card.querySelector("h3")?.textContent ||
      "Vandana Villa";

    const description =
      card.dataset.description ||
      "Enjoy this facility at Vandana Villa.";

    const icon = card.querySelector(".amenity-icon")?.textContent?.trim() || "✨";

    if (amenityModalTitle) amenityModalTitle.textContent = title;
    if (amenityModalText) amenityModalText.textContent = description;
    if (amenityModalIcon) amenityModalIcon.textContent = icon;

    amenityModal.classList.add("active");
    amenityModal.setAttribute("aria-hidden", "false");
    syncModalLock();
  }

  document.querySelectorAll(".amenity-card").forEach((card) => {
    card.addEventListener("click", () => openAmenityModal(card));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openAmenityModal(card);
      }
    });
  });

  amenityModalClose?.addEventListener("click", closeAmenityModal);

  amenityModal?.addEventListener("click", (event) => {
    if (event.target === amenityModal) closeAmenityModal();
  });

  function openLightbox(image) {
    if (!galleryLightbox || !galleryLightboxImage) return;

    galleryLightboxImage.src = image.currentSrc || image.src;
    galleryLightboxImage.alt = image.alt || "Vandana Villa";
    if (lightboxCaption) {
      lightboxCaption.textContent =
        image.closest(".gallery-item")?.querySelector("figcaption")?.textContent ||
        image.alt ||
        "Vandana Villa";
    }

    galleryLightbox.classList.add("active");
    galleryLightbox.setAttribute("aria-hidden", "false");
    syncModalLock();
  }

  document.querySelectorAll(".gallery-item img").forEach((image) => {
    image.addEventListener("click", () => openLightbox(image));
  });

  galleryLightboxClose?.addEventListener("click", closeLightbox);

  galleryLightbox?.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllOverlays();
      closeMobileMenu();
    }
  });

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(enquiryForm);
      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const date = String(formData.get("date") || "").trim();
      const guests = String(formData.get("guests") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const whatsappMessage = [
        "Hello Vandana Villa,",
        "",
        "I would like to make an enquiry.",
        "",
        `Name: ${name}`,
        `WhatsApp / Phone: ${phone}`,
        `Preferred Date: ${date || "Not specified"}`,
        `Number of Guests: ${guests || "Not specified"}`,
        "",
        "Message:",
        message || "No additional message.",
        "",
        "Thank you."
      ].join("\n");

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappURL, "_blank", "noopener,noreferrer");

      const formMessage = enquiryForm.querySelector(".form-message");
      if (formMessage) {
        formMessage.textContent =
          "Your enquiry is ready to send on WhatsApp.";
      }
    });
  }

  if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${year}-${month}-${day}`;
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMobileMenu();
  });

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Prevent broken images from creating visually awkward empty blocks.
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-not-found");
    });
  });
});
