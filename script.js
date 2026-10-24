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
for (let i = 1; i <= 32; i++) { // Adapte le nombre maximal de photos si besoin
    photosSgosff.push(`SGOSFF/SGOSFF-${i}.JPG`);
}

// --- ALBUM BJT ---
let photosBjt = [];
for (let i = 1; i <= 32; i++) { // Adapte le nombre maximal de photos si besoin
    photosBjt.push(`BJT/BJT-${i}.JPG`);
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
function ouvrirEvenement(nomEvenement) {
    if (nomEvenement === 'Grèce') {
        photosActuelles = photosGrece;
    } else if (nomEvenement === 'Portugal') {
        photosActuelles = photosPortugal;
    } else if (nomEvenement === 'SGOSFF') {
        photosActuelles = photosSgosff;
    } else if (nomEvenement === 'BJT') {
        photosActuelles = photosBjt;
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