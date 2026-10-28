// --- ALBUM GRÈCE ---
let photosGrece = [];
for (let i = 1; i <= 36; i++) {
    photosGrece.push(`Grèce/Grece-${i}.webp`);
}

// --- ALBUM PORTUGAL ---
let photosPortugal = [];
for (let i = 1; i <= 32; i++) {
    photosPortugal.push(`Portugal/Portugal-${i}.webp`);
}

// --- ALBUM SGOSFF ---
let photosSgosff = [];
for (let i = 1; i <= 20; i++) {
    photosSgosff.push(`SGOSFF/SGOSFF-${i}.webp`);
}

// --- ALBUM BJT ---
let photosBjt = [];
for (let i = 1; i <= 21; i++) {
    photosBjt.push(`BJT/BJT-${i}.webp`);
}

// --- ALBUM PARIS ---
let photosParis = [];
for (let i = 1; i <= 11; i++) {
    photosParis.push(`Paris/Paris-${i}.webp`);
}

// --- ALBUM BRETAGNE ---
let photosBretagne = [];
for (let i = 1; i <= 21; i++) {
    photosBretagne.push(`Bretagne/Bretagne-${i}.webp`);
}

// --- ALBUM FDM ---
let photosFdm = [];
for (let i = 1; i <= 9; i++) {
    photosFdm.push(`FDM/FDM-${i}.webp`);
}

// --- ALBUM STREET ---
let photosStreet = [];
for (let i = 1; i <= 14; i++) {
    photosStreet.push(`Street/Street-${i}.webp`);
}

// --- ALBUM CHAT ---
let photosChat = [];
for (let i = 1; i <= 11; i++) {
    photosChat.push(`Chat/Chat-${i}.webp`);
}

// --- ALBUM PORTRAIT ---
let photosPortrait = [];
for (let i = 1; i <= 5; i++) {
    photosPortrait.push(`Portrait/Portrait-${i}.webp`);
}

// --- ALBUM BDS ---
let photosBds = [];
for (let i = 1; i <= 15; i++) {
    photosBds.push(`BDS/BDS-${i}.webp`);
}

// --- ALBUM ZOO ---
let photosZoo = [];
for (let i = 1; i <= 14; i++) {
    photosZoo.push(`Zoo/Zoo-${i}.webp`);
}

// --- ALBUM FAMILLE (PROTÉGÉ) ---
let photosFamille = [];
for (let i = 1; i <= 11; i++) {
    photosFamille.push(`Famille/Famille-${i}.webp`);
}

// Tableau actif en cours de visionnage
let photosActuelles = [];
let currentIndex = 0;

// Générer les miniatures dynamiquement selon l'album cliqué
function chargerMiniatures(photos) {
    const thumbsContainer = document.getElementById('lightbox-thumbnails');
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = ''; // On vide les anciennes miniatures
    
    photos.forEach((photo, index) => {
        const thumb = document.createElement('img');
        thumb.src = photo;
        thumb.alt = `Miniature ${index + 1}`;
        thumb.className = 'lightbox-thumb';
        thumb.addEventListener('click', () => {
            currentIndex = index;
            afficherLightbox();
        });
        thumbsContainer.appendChild(thumb);
    });
}

// Fonction déclenchée au clic sur une tuile
function ouvrirEvenement(nomEvenement, element) {
    // On réinitialise proprement le tableau avant d'attribuer
    photosActuelles = [];

    if (nomEvenement === 'Grèce') {
        photosActuelles = photosGrece;
    } else if (nomEvenement === 'Portugal') {
        photosActuelles = photosPortugal;
    } else if (nomEvenement === 'SGOSFF') {
        photosActuelles = photosSgosff;
    } else if (nomEvenement === 'BJT') {
        photosActuelles = photosBjt;
    } else if (nomEvenement === 'Paris') {
        photosActuelles = photosParis;
    } else if (nomEvenement === 'Bretagne') {
        photosActuelles = photosBretagne;
    } else if (nomEvenement === 'FDM') {
        photosActuelles = photosFdm;
    } else if (nomEvenement === 'Street') {
        photosActuelles = photosStreet;
    } else if (nomEvenement === 'Chat') {
        photosActuelles = photosChat;
    } else if (nomEvenement === 'Portrait') {
        photosActuelles = photosPortrait;
    } else if (nomEvenement === 'BDS') {        // <-- Ajouté ici
        photosActuelles = photosBds;
    } else if (nomEvenement === 'Zoo') {        // <-- Ajouté ici
        photosActuelles = photosZoo;
    } else if (nomEvenement === 'Famille') {
        let motDePasseSaisi = prompt("🔒 Cet album est protégé. Entre le mot de passe :");
        if (motDePasseSaisi !== "pierrot") {
            alert("❌ Mot de passe incorrect !");
            return;
        }
        photosActuelles = photosFamille;
        
        if (element) {
            element.classList.remove('locked');
        }
    }

    // Sécurité : on s'assure qu'on a bien des photos avant d'ouvrir la lightbox
    if (photosActuelles && photosActuelles.length > 0) {
        currentIndex = 0;
        chargerMiniatures(photosActuelles);
        afficherLightbox();
    } else {
        console.error("Erreur : Aucun album trouvé pour " + nomEvenement);
    }
}

// Affiche la lightbox
function afficherLightbox() {
    const lightbox = document.getElementById('lightbox');
    const imgElement = document.getElementById('lightbox-img');
    const counterElement = document.getElementById('lightbox-counter');

    if (!lightbox || !imgElement) return;

    imgElement.src = photosActuelles[currentIndex];
    counterElement.innerText = `${currentIndex + 1} / ${photosActuelles.length}`;
    lightbox.style.display = 'flex';

    // Mettre à jour les miniatures actives
    const thumbs = document.querySelectorAll('.lightbox-thumb');
    thumbs.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Changer de photo (flèches)
function changerPhoto(direction) {
    currentIndex += direction;

    if (currentIndex >= photosActuelles.length) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = photosActuelles.length - 1;
    }

    afficherLightbox();
}

// Fonction pour fermer la lightbox et quitter le plein écran
function fermerLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }

    // Quitter le mode plein écran s'il est actif
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

// Fermeture au clic sur le fond noir de la lightbox (géré de manière sécurisée)
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && e.target === lightbox) {
        fermerLightbox();
    }
});

// Navigation au clavier globale et sécurisée
window.onkeydown = function(e) {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox && window.getComputedStyle(lightbox).display === 'flex') {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            changerPhoto(1);
        } 
        else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            changerPhoto(-1);
        } 
        else if (e.key === 'Escape') {
            e.preventDefault();
            fermerLightbox();
        }
    }
};

// Système de filtrage des galeries
function filtrerGalerie(categorie, bouton) {
    // Gestion de la classe active sur les boutons
    const boutons = document.querySelectorAll('.filter-btn');
    boutons.forEach(btn => btn.classList.remove('active'));
    bouton.classList.add('active');

    // Filtrage des tuiles
    const tuiles = document.querySelectorAll('.tiles-grid .tile');
    tuiles.forEach(tile => {
        const catTile = tile.getAttribute('data-categorie');
        if (categorie === 'tous' || catTile === categorie) {
            tile.style.display = 'block';
            setTimeout(() => tile.style.opacity = '1', 50);
        } else {
            tile.style.opacity = '0';
            setTimeout(() => tile.style.display = 'none', 300);
        }
    });
}

// Fonction pour activer ou quitter le mode plein écran manuellement
function basculerPleinEcran() {
    const lightbox = document.getElementById('lightbox');
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        // Entrer en plein écran
        if (lightbox.requestFullscreen) {
            lightbox.requestFullscreen();
        } else if (lightbox.webkitRequestFullscreen) {
            lightbox.webkitRequestFullscreen();
        }
    } else {
        // Quitter le plein écran
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}