/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());

  // Vérifier si le thème sombre est activé pour changer le lien de téléchargement
  if (document.body.classList.contains(darkTheme)) {
    downloadLink.href = "assets/pdf/AdrienForbiceCV noir.pdf"; // Lien pour le CV noir
  } else {
    downloadLink.href = "assets/pdf/AdrienForbiceCV blanc.pdf"; // Lien par défaut pour le CV blanc
  }
});

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/

function scaleCv() {
  document.body.classList.add("scale-cv");
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/

function removeScale() {
  document.body.classList.remove("scale-cv");
}

/*==================== GENERATE PDF ====================*/
// PDF generated area

let areaCv = document.getElementById("area-cv");

let resumeButton = document.getElementById("resume-button");

// Html2pdf options
var opt = {
  margin: 1,
  filename: "AdrienForbiceCV.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { format: "a4", orientation: "portrait" },
  output: "save",
};

// Function to call areaCv and Html2Pdf options

function generateResume() {
  html2pdf(areaCv, opt);
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener("click", () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCv();

  // 2. The PDF is generated

  generateResume();

  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.

  setTimeout(removeScale, 5000);
});

/*==================== DOWNLOAD LINK PDF GENERATION ====================*/
// Faire fonctionner le lien "Télécharger" comme le bouton Generate PDF
let downloadLink = document.getElementById("downloadLink");

// Fonction pour détecter si on est sur mobile
function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
}

// Fonction pour forcer la disposition desktop sur mobile pour le PDF
function forceDesktopLayout() {
  if (isMobileDevice()) {
    document.body.classList.add("force-desktop-pdf");
  }
}

// Fonction pour restaurer la disposition mobile
function restoreMobileLayout() {
  if (isMobileDevice()) {
    document.body.classList.remove("force-desktop-pdf");
  }
}

downloadLink.addEventListener("click", (e) => {
  e.preventDefault(); // Empêcher le téléchargement du fichier statique

  // 1. Forcer la disposition desktop sur mobile
  forceDesktopLayout();

  // 2. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCv();

  // 3. The PDF is generated
  generateResume();

  // 4. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(() => {
    removeScale();
    restoreMobileLayout(); // Restaurer la disposition mobile après génération
  }, 5000);
});

/*==================== TOGGLE PROFILE / SOFT SKILLS ====================*/
const profileToggle = document.getElementById("profile-toggle");
const profileToggle2 = document.getElementById("profile-toggle-2");
const profileSection = document.getElementById("profile");
const softSkillsSection = document.getElementById("soft-skills");

let showingSoftSkills = false;

function toggleProfileSoftSkills() {
  if (showingSoftSkills) {
    // Montrer le profil, cacher les soft skills
    profileSection.style.display = "block";
    softSkillsSection.style.display = "none";
    profileToggle.classList.remove("bx-brain");
    profileToggle.classList.add("bx-user-check");
    profileToggle2.classList.remove("bx-brain");
    profileToggle2.classList.add("bx-user-check");
    showingSoftSkills = false;
  } else {
    // Montrer les soft skills, cacher le profil
    profileSection.style.display = "none";
    softSkillsSection.style.display = "block";
    profileToggle.classList.remove("bx-user-check");
    profileToggle.classList.add("bx-brain");
    profileToggle2.classList.remove("bx-user-check");
    profileToggle2.classList.add("bx-brain");
    showingSoftSkills = true;
  }
}

profileToggle.addEventListener("click", toggleProfileSoftSkills);
profileToggle2.addEventListener("click", toggleProfileSoftSkills);

/*==================== TOGGLE SKILLS / COMPETENCES ====================*/
const skillsToggle = document.getElementById("skills-toggle");
const skillsToggle2 = document.getElementById("skills-toggle-2");
const skillsSection = document.getElementById("skills");
const competencesSection = document.getElementById("competences");

let showingCompetences = false;

function toggleSkillsCompetences() {
  if (showingCompetences) {
    // Montrer les skills, cacher les compétences
    skillsSection.style.display = "block";
    competencesSection.style.display = "none";
    skillsToggle.classList.remove("bx-bulb");
    skillsToggle.classList.add("bx-code-alt");
    skillsToggle2.classList.remove("bx-bulb");
    skillsToggle2.classList.add("bx-code-alt");
    showingCompetences = false;
  } else {
    // Montrer les compétences, cacher les skills
    skillsSection.style.display = "none";
    competencesSection.style.display = "block";
    skillsToggle.classList.remove("bx-code-alt");
    skillsToggle.classList.add("bx-bulb");
    skillsToggle2.classList.remove("bx-code-alt");
    skillsToggle2.classList.add("bx-bulb");
    showingCompetences = true;
  }
}

skillsToggle.addEventListener("click", toggleSkillsCompetences);
skillsToggle2.addEventListener("click", toggleSkillsCompetences);
