const elementsNavDownListItem = document.querySelectorAll(
  ".nav-down-list-item"
);
const elementHome = document.querySelector(".home");
const elementBooks = document.querySelector(".books");
const elementSearch = document.querySelector(".nav-up-search-btn");
const elementInputSearch = document.querySelector("input[type=search]");
const elementCheckbox = document.querySelector("#adult-content");
let adultContentList = [
  "Abuse",
  "Adult",
  "Asexual",
  "BDSM",
  "Erotic",
  "GLBT",
  "LGBT",
  "M F M",
  "M M",
  "Queer",
  "Gay",
];

elementsNavDownListItem[0].addEventListener("click", () => {
  elementsNavDownListItem[1].classList.remove("selected");
  elementsNavDownListItem[0].classList.add("selected");

  elementBooks.classList.add("hide");
  elementHome.classList.remove("hide");
});

elementsNavDownListItem[1].addEventListener("click", () => {
  elementsNavDownListItem[0].classList.remove("selected");
  elementsNavDownListItem[1].classList.add("selected");

  elementHome.classList.add("hide");
  elementBooks.classList.remove("hide");
});

elementSearch.addEventListener("click", () => {
  elementBooksContainerList.innerHTML = "";
  books.record.results.forEach((element) => {
    if (elementInputSearch.value === "") {
      makeCard(elementBooksContainerList, "books-container-list-card", element);
    } else if (
      element.title
        .toLowerCase()
        .includes(elementInputSearch.value.toLowerCase()) &&
      elementInputSearch.value !== ""
    ) {
      makeCard(elementBooksContainerList, "books-container-list-card", element);
    }
  });
  elementInputSearch.value = "";
});

elementCheckbox.addEventListener("change", () => {
  elementBooksContainerGenres.innerHTML = "";
  elementBooksContainerList.innerHTML = "";

  if (elementCheckbox.checked) {
    allGenres.forEach((genre) => {
      displayGenre(genre);
    });
    loadBooks(null);
  } else {
    allGenres.forEach((genre) => {
      if (!adultContentList.includes(genre)) {
        displayGenre(genre);
      }
    });

    books.record.results.forEach((book) => {
      if (!adultContentList.some((el) => book.genre.includes(el))) {
        makeCard(elementBooksContainerList, "books-container-list-card", book);
      }
    });
  }
});