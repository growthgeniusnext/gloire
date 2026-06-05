/**
 * SCRIPTS UNIQUE DU SITE DE MARIAGE - EMILE & KOROTOUM
 * Gère le Loader (30s), le Diaporama et le Menu Mobile.
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. GESTION DU LOADER (30 SECONDES AVEC VERSETS)
  // ==========================================
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  const loadingBar = document.getElementById('loading-bar');
  const bibleVerse = document.getElementById('bible-verse');
  const bibleReference = document.getElementById('bible-reference');

  const verses = [
    { text: '"L\'amour est patient, l\'amour est plein de bonté..."', ref: "1 Corinthiens 13:4" },
    { text: '"Que tout ce que vous faites se fasse avec amour."', ref: "1 Corinthiens 16:14" },
    { text: '"Mettez l\'amour au-dessus de tout : c\'est le lien parfait."', ref: "Colossiens 3:14" },
    { text: '"Nous aimons parce que Dieu nous a aimés le premier."', ref: "1 Jean 4:19" }
  ];

  let currentVerseIndex = 0;
  let progress = 0;
  const totalDuration = 30000; // 30 secondes d'attente requises
  const intervalTime = 100;    
  const steps = totalDuration / intervalTime;

  // Lancement du chargement de la barre
  const progressInterval = setInterval(function () {
    progress += (100 / steps);
    if (loadingBar) {
      loadingBar.style.width = Math.min(progress, 100) + '%';
    }

    if (progress >= 100) {
      clearInterval(progressInterval);
      clearInterval(verseInterval);
      
      // Cache le loader
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(function () {
          loader.classList.add('hidden');
          if (mainContent) {
            mainContent.classList.remove('hidden');
          }
        }, 500);
      }
    }
  }, intervalTime);

  // Défilement des versets toutes les 7 secondes
  const verseInterval = setInterval(function () {
    currentVerseIndex = (currentVerseIndex + 1) % verses.length;
    if (bibleVerse && bibleReference) {
      bibleVerse.style.opacity = '0';
      bibleReference.style.opacity = '0';
      
      setTimeout(function() {
        bibleVerse.textContent = verses[currentVerseIndex].text;
        bibleReference.textContent = verses[currentVerseIndex].ref;
        bibleVerse.style.opacity = '1';
        bibleReference.style.opacity = '1';
      }, 400);
    }
  }, 7000);


  // ==========================================
  // 2. DIAPORAMA DE L'ARRIÈRE-PLAN HERO (ACCUEIL)
  // ==========================================
  let slideIndex = 0;
  const slides = document.querySelectorAll('.hero-slide');
  
  function changeSlides() {
    if (slides.length > 0) {
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add('active');
    }
  }
  
  if (slides.length > 0) {
    setInterval(changeSlides, 4000); // Changement automatique toutes les 4 secondes
  }


  // ==========================================
  // 3. ENVOI DU FORMULAIRE RSVP
  // ==========================================
  const rsvpForm = document.getElementById('rsvpForm');
  const submitBtn = document.getElementById('submitBtn');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Confirmation en cours...";
      }

      const formData = new FormData(rsvpForm);
      const guestName = formData.get('Nom');

      // Simulation traitement réseau d'1.5s
      setTimeout(function () {
        alert("Merci " + guestName + " ! Votre réponse a bien été prise en compte.");
        rsvpForm.reset();
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Confirmer ma présence";
        }
      }, 1500);
    });
  }
});

// ==========================================
// 4. ACTION DU MENU HAMBURGER (ACCESSIBLE PARTOUT)
// ==========================================
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('show');
  }
}

function closeMenuMobile() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
  }
}