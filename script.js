document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM is ready");

  // === Fade-in Animation ===
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeElements.forEach((el) => fadeObserver.observe(el));

  // === Lazy Loading ===
  // function observeLazyImages(selector = ".lazy-img") {
  //   const lazyObserver = new IntersectionObserver(
  //     (entries, obs) => {
  //       entries.forEach((entry) => {
  //         const img = entry.target;
  //         if (entry.isIntersecting) {
  //           if (!img.src) {
  //             img.src = img.dataset.src;
  //             img.onload = () => img.classList.add("loaded");
  //           } else {
  //             img.classList.add("loaded");
  //           }
  //           obs.unobserve(img);
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   document
  //     .querySelectorAll(selector)
  //     .forEach((img) => lazyObserver.observe(img));
  // }

  // observeLazyImages();

  // === Carousel Setup ===
  class Carousel {
    currentIndex;
    images;
    totalImages;
    container;

    constructor(container) {
      this.container = container;
      this.currentIndex = 0;
      this.images = container.querySelectorAll(".carousel-image");
      this.totalImages = this.images.length;

      const leftBtn = container.querySelector(".carousel-btn.left");
      const rightBtn = container.querySelector(".carousel-btn.right");

      if (leftBtn && rightBtn) {
        leftBtn.addEventListener("click", () => this.prevSlide());
        rightBtn.addEventListener("click", () => this.nextSlide());
        this.updateCarousel();
      } else {
        console.warn("🚨 Carousel buttons not found in DOM for one container.");
      }
    }

    updateCarousel() {
      this.images.forEach((img, index) => {
        img.classList.remove("active", "prev", "next", "out");
        if (index === this.currentIndex) {
          img.classList.add("active");
        } else if (
          index ===
          (this.currentIndex - 1 + this.totalImages) % this.totalImages
        ) {
          img.classList.add("prev");
        } else if (index === (this.currentIndex + 1) % this.totalImages) {
          img.classList.add("next");
        } else {
          img.classList.add("out");
        }
      });
    }

    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.totalImages;
      this.updateCarousel();
    }

    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.totalImages) % this.totalImages;
      this.updateCarousel();
    }
  }

  // === Inject Navigation and Attach Dropdown Events ===
  fetch("navigation.html")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.text();
    })
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;

      const dropBtn = document.querySelector(".dropbtn");
      const dropdown = document.querySelector(".dropdown");
      const dropdownContent = document.querySelector(".dropdown-content");

      if (dropBtn && dropdownContent) {
        dropBtn.addEventListener("click", () => {
          dropdownContent.classList.toggle("show");
        });

        window.addEventListener("click", (e) => {
          if (!dropdown.contains(e.target)) {
            dropdownContent.classList.remove("show");
          }
        });
      }
    })
    .catch((err) => console.error("❌ Error loading navbar:", err));

  document.querySelectorAll(".carousel-container").forEach((container) => {
    new Carousel(container);
  });
});
