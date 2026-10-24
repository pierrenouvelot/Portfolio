// --- ALBUM GRÈCE ---
let photosGrece = [];
for (let i = 1; i <= 36; i++) {
    photosGrece.push(`Grèce/Grece-${i}.JPG`);
}

// --- ALBUM PORTUGAL ---
let photosPortugal = [];
for (let i = 1; i <= 32; i++) {
    photosPortugal.push(`Portugal/Portugal-${i}.JPG`);
}

// --- ALBUM SGOSFF ---
let photosSgosff = [];
for (let i = 1; i <= 32; i++) {
    photosSgosff.push(`SGOSFF/SGOSFF-${i}.JPG`);
}

// --- ALBUM BJT ---
let photosBjt = [];
for (let i = 1; i <= 32; i++) {
    photosBjt.push(`BJT/BJT-${i}.JPG`);
}

// --- ALBUM PARIS ---
let photosParis = [];
for (let i = 1; i <= 11; i++) {
    photosParis.push(`Paris/Paris-${i}.JPG`);
}

// --- ALBUM BRETAGNE ---
let photosBretagne = [];
for (let i = 1; i <= 21; i++) {
    photosBretagne.push(`Bretagne/Bretagne-${i}.JPG`);
}

// --- ALBUM FDM ---
let photosFdm = [];
for (let i = 1; i <= 9; i++) {
    photosFdm.push(`FDM/FDM-${i}.JPG`);
}

// --- ALBUM STREET ---
let photosStreet = [];
for (let i = 1; i <= 14; i++) {
    photosStreet.push(`Street/Street-${i}.JPG`);
}

// --- ALBUM CHAT ---
let photosChat = [];
for (let i = 1; i <= 11; i++) { // Modifie le nombre si tu as plus ou moins de photos
    photosChat.push(`Chat/Chat-${i}.JPG`);
}

// --- ALBUM PORTRAIT ---
let photosPortrait = [];
for (let i = 1; i <= 5; i++) {
    photosPortrait.push(`Portrait/Portrait-${i}.JPG`);
}

// --- ALBUM FAMILLE (PROTÉGÉ) ---
let photosFamille = [];
for (let i = 1; i <= 8; i++) { // Adapte le nombre de photos si besoin
    photosFamille.push(`Famille/Famille-${i}.JPG`);
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
    } else if (nomEvenement === 'Famille') {
        let motDePasseSaisi = prompt("🔒 Cet album est protégé. Entre le mot de passe :");
        if (motDePasseSaisi !== "pierrot") {
            alert("❌ Mot de passe incorrect !");
            return;
        }
        photosActuelles = photosFamille;
        
        // Si le mot de passe est bon, on enlève le flou de la tuile sur la page !
        if (element) {
            element.classList.remove('locked');
        }
    }

    if (photosActuelles.length > 0) {
        currentIndex = 0;
        chargerMiniatures(photosActuelles);
        afficherLightbox();
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

// Fermeture de la lightbox
function fermerLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
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