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
/* ==========================================================
   LOGIQUE DE RENTRÉE RSVP ET TÉLÉCHARGEMENT D'INVITATION IMAGE
   ========================================================== */

document.getElementById('rsvpForm').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const presenceSelect = document.getElementById('presence').value;
  const successBox = document.getElementById('downloadSuccessBox');

  if (presenceSelect === 'oui') {
    // Déclenche la création et le téléchargement de la carte image personnalisée
    generateAndDownloadInvitation();
    
    // Affiche le conteneur de validation
    successBox.style.display = 'block';
    successBox.scrollIntoView({ behavior: 'smooth' });
  } else {
    successBox.style.display = 'none';
    alert("Votre réponse a été prise en compte. Merci d'avoir pris le temps de nous informer.");
  }
});

// Écouteur pour le bouton de ré-échantillonnage manuel
document.getElementById('btnDownloadAgain').addEventListener('click', function() {
  generateAndDownloadInvitation();
});

function generateAndDownloadInvitation() {
  const nameInput = document.getElementById('name').value;
  const guestsSelect = document.getElementById('guests');
  const numAccompagnants = parseInt(guestsSelect.value);
  const totalPersonnes = numAccompagnants + 1;

  const canvas = document.getElementById('invitationCanvas');
  const ctx = canvas.getContext('2d');

  // Initialisation de la maquette d'image de fond
  const baseImage = new Image();
  // IMPORTANT : Assurez-vous d'avoir enregistré l'image du modèle sous ce nom dans votre dossier :
  baseImage.src = 'images/invitation-fond.png'; 

  baseImage.onload = function() {
    // 1. Dessine la carte d'invitation vierge reçue
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    // 2. Configuration du Nom de l'invité
    ctx.fillStyle = '#6d562c'; // Couleur assortie au texte d'origine
    ctx.textAlign = 'center';
    ctx.font = 'bold 36px "Montserrat", sans-serif';
    
    // Position horizontale centrée (500) et verticale ajustée (365)
    ctx.fillText(nameInput.toUpperCase(), 500, 365);

    // 3. Configuration du nombre de personnes invitées
    ctx.fillStyle = '#bc964a';
    ctx.font = 'italic 500 24px "Montserrat", sans-serif';
    
    let texteInvitation = "";
    if(totalPersonnes === 1) {
      texteInvitation = "Invitation valable pour : 1 Personne seule";
    } else {
      texteInvitation = "Invitation valable pour : " + totalPersonnes + " Personnes";
    }
    
    ctx.fillText(texteInvitation, 500, 410);

    // 4. Génération du fichier PNG final et téléchargement automatique
    const imageURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    
    downloadLink.href = imageURL;
    downloadLink.download = 'Invitation_Mariage_Emile_et_Korotoum_' + nameInput.replace(/ /g, "_") + '.png';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  baseImage.onerror = function() {
    alert("Erreur de chargement de la maquette. Veuillez vérifier que l'image existe dans 'images/invitation-fond.png'.");
  };
}
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
