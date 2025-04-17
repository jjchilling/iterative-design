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
  let currentIndex = 0;
  const images = document.querySelectorAll(".carousel-image");
  const totalImages = images.length;

  function updateCarousel() {
    images.forEach((img, index) => {
      img.classList.remove("active", "prev", "next");
      if (index === currentIndex) {
        img.classList.add("active");
      } else if (index === (currentIndex - 1 + totalImages) % totalImages) {
        img.classList.add("prev");
      } else if (index === (currentIndex + 1) % totalImages) {
        img.classList.add("next");
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
  }

  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener("click", prevSlide);
    rightBtn.addEventListener("click", nextSlide);
    updateCarousel();
  } else {
    console.warn("🚨 Carousel buttons not found in DOM.");
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
});
