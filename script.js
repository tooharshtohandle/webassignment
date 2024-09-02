window.addEventListener("scroll", () => {
  setScrollVar();
  focusInSection();
  fadeInTextSection();
  fadeInSentences();
});

window.addEventListener("resize", setScrollVar);

document.addEventListener("DOMContentLoaded", () => {
  setScrollVar();
  focusInSection();
  fadeInTextSection();
  fadeInSentences();
  observeSections();
  initGrowingSection();
  initFadingBlurSection();
});

function setScrollVar() {
  const htmlElement = document.documentElement;
  const percentOfScreenHeightScrolled = htmlElement.scrollTop / htmlElement.clientHeight;
  htmlElement.style.setProperty("--scroll", Math.min(percentOfScreenHeightScrolled * 100, 100));
}

function observeSections() {
  const observer = new IntersectionObserver((entries) => {
    let imgShouldShow = false;

    entries.forEach((entry) => {
      const imgSelector = entry.target.dataset.imgToShow;
      entry.target.classList.toggle("show", entry.isIntersecting);

      if (entry.isIntersecting && imgSelector) {
        document.querySelectorAll("[data-img]").forEach((img) => img.classList.remove("show"));
        document.querySelector(imgSelector)?.classList.add("show");
        imgShouldShow = true;
      } else if (imgSelector) {
        document.querySelector(imgSelector)?.classList.remove("show");
      }
    });

    if (!imgShouldShow) {
      document.querySelectorAll("[data-img]").forEach((img) => img.classList.remove("show"));
    }
  });

  document.querySelectorAll("[data-img-to-show]").forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });
}

function focusInSection() {
  document.querySelectorAll(".blur-in-section").forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight / 1.3) {
      section.classList.add("in-focus");
    }
  });
}

function fadeInTextSection() {
  const fadingTextSection = document.querySelector(".fading-text-section");
  if (fadingTextSection && fadingTextSection.getBoundingClientRect().top < window.innerHeight / 1.3) {
    fadingTextSection.classList.add("fade-in");
  }
}

function fadeInSentences() {
  document.querySelectorAll(".fading-sentences-section .sentence").forEach((sentence) => {
    if (sentence.getBoundingClientRect().top < window.innerHeight / 1.3) {
      sentence.classList.add("in-view");
    }
  });
}

function initGrowingSection() {
  const growingSection = document.querySelector(".growing-section");

  if (growingSection) {
    const updateScale = () => {
      const sectionRect = growingSection.getBoundingClientRect();
      const distanceFromCenter = Math.abs((window.innerHeight / 2) - ((sectionRect.top + sectionRect.bottom) / 2));
      const scale = Math.max(0.5, 0.65 * window.innerWidth / sectionRect.width - (distanceFromCenter / (window.innerHeight / 2)) * 0.15);

      growingSection.style.transform = `scale(${scale})`;
    };

    window.addEventListener("scroll", updateScale);
    updateScale(); // Initial call to set the scale on page load
  }
}

function initFadingBlurSection() {
  const fadingBlurSection = document.querySelector("#fading-blur-section");

  if (fadingBlurSection) {
    const fadeInSection = () => {
      if (fadingBlurSection.getBoundingClientRect().top < window.innerHeight / 1.5) {
        fadingBlurSection.classList.add("fade-in");
        window.removeEventListener("scroll", fadeInSection);
      }
    };

    window.addEventListener("scroll", fadeInSection);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const imgFadeBlurSections = document.querySelectorAll(".img-fade-blur-section");

  const fadeBlurObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
          } else {
              entry.target.classList.remove("in-view");
          }
      });
  }, {
      threshold: 0.5 // Adjust as needed; 0.5 means the effect triggers when 50% of the section is visible
  });

  imgFadeBlurSections.forEach(section => fadeBlurObserver.observe(section));
});
