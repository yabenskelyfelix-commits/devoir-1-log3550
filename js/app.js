// app.js
let books = JSON.parse(localStorage.getItem('books')) || initialBooks;

const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const sortBySelect = document.getElementById('sort-by');
const availableOnlyCheckbox = document.getElementById('available-only');
const booksContainer = document.getElementById('books-container');
const resultsCount = document.getElementById('results-count');
const emptyState = document.getElementById('empty-state');
const addBookForm = document.getElementById('add-book-form');
const resetBtn = document.getElementById('reset-btn');

// Normalisation pour recherche insensible aux accents et à la casse
function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Initialiser les catégories dans le select de filtre
function populateCategories() {
  const categories = [...new Set(books.map(b => b.categorie))];
  categoryFilter.innerHTML = '<option value="">Toutes les catégories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

// Rendu des cartes via le DOM (createElement)
function renderBooks() {
  const searchTerm = normalizeString(searchInput.value.trim());
  const selectedCategory = categoryFilter.value;
  const onlyAvailable = availableOnlyCheckbox.checked;
  const sortValue = sortBySelect.value;

  // 1. Filtrage
  let filtered = books.filter(book => {
    const matchSearch = normalizeString(book.titre).includes(searchTerm) || normalizeString(book.auteur).includes(searchTerm);
    const matchCategory = selectedCategory === "" || book.categorie === selectedCategory;
    const matchAvailability = !onlyAvailable || book.disponible;
    return matchSearch && matchCategory && matchAvailability;
  });

  // 2. Tri
  filtered.sort((a, b) => {
    if (sortValue === 'titre-asc') return a.titre.localeCompare(b.titre);
    if (sortValue === 'titre-desc') return b.titre.localeCompare(a.titre);
    if (sortValue === 'annee-asc') return a.annee - b.annee;
    if (sortValue === 'annee-desc') return b.annee - a.annee;
  });

  // 3. Affichage compteur et état vide
  booksContainer.innerHTML = '';
  resultsCount.textContent = `${filtered.length} livre(s) trouvé(s)`;

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  // 4. Génération des éléments du DOM
  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-3";

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = `
      <div class="flex justify-between items-start">
        <h3 class="font-bold text-slate-900 text-lg">${book.titre}</h3>
        <span class="text-xs px-2 py-1 rounded-full ${book.disponible ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
          ${book.disponible ? 'Disponible' : 'Emprunté'}
        </span>
      </div>
      <p class="text-sm text-slate-600">Par ${book.auteur} (${book.annee})</p>
      <span class="inline-block bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md mt-1">${book.categorie}</span>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = "self-end bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition";
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener('click', () => deleteBook(book.id));

    card.appendChild(contentDiv);
    card.appendChild(deleteBtn);
    booksContainer.appendChild(card);
  });
}

// Suppression avec confirmation
function deleteBook(id) {
  if (confirm("Voulez-vous vraiment supprimer ce livre du catalogue ?")) {
    books = books.filter(b => b.id !== id);
    saveAndRefresh();
  }
}

// Validation et Ajout
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const titreInput = document.getElementById('input-titre');
  const auteurInput = document.getElementById('input-auteur');
  const anneeInput = document.getElementById('input-annee');
  const categorieInput = document.getElementById('input-categorie');

  const errTitre = document.getElementById('error-titre');
  const errAuteur = document.getElementById('error-auteur');
  const errAnnee = document.getElementById('error-annee');
  const errCategorie = document.getElementById('error-categorie');

  let isValid = true;
  const currentYear = new Date().getFullYear();

  // Validation Titre
  if (titreInput.value.trim().length < 2) {
    errTitre.textContent = "Le titre doit comporter au moins 2 caractères.";
    isValid = false;
  } else {
    errTitre.textContent = "";
  }

  // Validation Auteur
  if (auteurInput.value.trim().length < 2) {
    errAuteur.textContent = "L'auteur doit comporter au moins 2 caractères.";
    isValid = false;
  } else {
    errAuteur.textContent = "";
  }

  // Validation Année
  const anneeVal = parseInt(anneeInput.value);
  if (isNaN(anneeVal) || anneeVal < 1450 || anneeVal > currentYear) {
    errAnnee.textContent = `L'année doit être comprise entre 1450 et ${currentYear}.`;
    isValid = false;
  } else {
    errAnnee.textContent = "";
  }

  // Validation Catégorie
  if (categorieInput.value.trim() === "") {
    errCategorie.textContent = "Veuillez indiquer une catégorie.";
    isValid = false;
  } else {
    errCategorie.textContent = "";
  }

  if (!isValid) return;

  // Création et ajout du livre
  const newBook = {
    id: Date.now(),
    titre: titreInput.value.trim(),
    auteur: auteurInput.value.trim(),
    annee: anneeVal,
    categorie: categorieInput.value.trim(),
    disponible: true
  };

  books.push(newBook);
  addBookForm.reset();
  saveAndRefresh();
});

// Sauvegarde localStorage et rafraîchissement
function saveAndRefresh() {
  localStorage.setItem('books', JSON.stringify(books));
  populateCategories();
  renderBooks();
}

// Bouton Réinitialiser
resetBtn.addEventListener('click', () => {
  if (confirm("Voulez-vous réinitialiser le catalogue avec les données d'origine ?")) {
    books = [...initialBooks];
    localStorage.removeItem('books');
    populateCategories();
    renderBooks();
  }
});

// Écouteurs d'événements pour les filtres et la recherche en temps réel
searchInput.addEventListener('input', renderBooks);
categoryFilter.addEventListener('change', renderBooks);
sortBySelect.addEventListener('change', renderBooks);
availableOnlyCheckbox.addEventListener('change', renderBooks);

// Initialisation au chargement de la page
populateCategories();
renderBooks();