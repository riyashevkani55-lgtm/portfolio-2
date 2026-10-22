(function () {
  console.log("JavaScript connected");

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const projectSearch = document.getElementById("projectSearch");
  const technologyFilter = document.getElementById("technologyFilter");
  const projectItems = Array.from(document.querySelectorAll(".projects-list li"));
  const projectCount = document.getElementById("projectCount");
  const noProjects = document.getElementById("noProjects");
  const clearFilters = document.getElementById("clearFilters");

  if (projectSearch && technologyFilter && projectCount && noProjects) {
    const technologies = new Set();
    projectItems.forEach((project) => {
      (project.dataset.technologies || "")
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean)
        .forEach((technology) => technologies.add(technology));
    });

    Array.from(technologies)
      .sort((first, second) => first.localeCompare(second))
      .forEach((technology) => {
        const option = document.createElement("option");
        option.value = technology.toLocaleLowerCase();
        option.textContent = technology;
        technologyFilter.appendChild(option);
      });

    function filterProjects() {
      const query = projectSearch.value.trim().toLocaleLowerCase();
      const selectedTechnology = technologyFilter.value;
      let visibleCount = 0;

      projectItems.forEach((project) => {
        const projectTechnologies = (project.dataset.technologies || "")
          .split(",")
          .map((technology) => technology.trim().toLocaleLowerCase());
        const searchableText = [
          project.dataset.name,
          project.dataset.technologies,
          project.textContent,
        ]
          .join(" ")
          .toLocaleLowerCase();
        const matchesQuery = searchableText.includes(query);
        const matchesTechnology =
          selectedTechnology === "all" ||
          projectTechnologies.includes(selectedTechnology);
        const isMatch = matchesQuery && matchesTechnology;

        project.hidden = !isMatch;
        if (isMatch) {
          visibleCount += 1;
        }
      });

      projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
      noProjects.hidden = visibleCount !== 0;
      if (clearFilters) {
        clearFilters.hidden = !query && selectedTechnology === "all";
      }
    }

    projectSearch.addEventListener("input", filterProjects);
    technologyFilter.addEventListener("change", filterProjects);
    clearFilters?.addEventListener("click", () => {
      projectSearch.value = "";
      technologyFilter.value = "all";
      filterProjects();
      projectSearch.focus();
    });
    filterProjects();
  }

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "/" &&
      projectSearch &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)
    ) {
      event.preventDefault();
      projectSearch.focus();
    }
  });

  const sectionIds = ["about", "projects", "portfolio-chatbot"];
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

  const themeButton = document.getElementById("themeToggle");
  if (themeButton) {
    const themeLabel = document.getElementById("themeLabel");
    let savedTheme = "light";
    try {
      savedTheme = localStorage.getItem("portfolio-theme") || "light";
    } catch {
      savedTheme = "light";
    }
    document.body.classList.toggle("dark-mode", savedTheme === "dark");

    function updateThemeButton() {
      const isDark = document.body.classList.contains("dark-mode");
      const nextTheme = isDark ? "light" : "dark";
      if (themeLabel) {
        themeLabel.textContent = `${nextTheme[0].toUpperCase()}${nextTheme.slice(1)} theme`;
      }
      themeButton.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
      themeButton.setAttribute("aria-pressed", String(isDark));
    }

    updateThemeButton();
    themeButton.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark-mode");
      try {
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
      } catch {
        // The theme still works for this visit when storage is unavailable.
      }
      updateThemeButton();
    });
  }
})();
