(function () {
  console.log("JavaScript connected");

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const sectionIds = ["about", "skills", "projects"];
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

  function setActiveLink() {
    const fromTop = window.scrollY + 96;
    let currentId = sectionIds[0];

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= fromTop) {
        currentId = id;
      }
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
})();
const themeButton = document.getElementById("themeToggle");
themeButton.addEventListener("click", function () {
document.body.classList.toggle("dark-mode");
if (document.body.classList.contains("dark-mode")) {
themeButton.textContent = "Switch to Light Mode";
} else {
themeButton.textContent = "Switch to Dark Mode";
}
});
