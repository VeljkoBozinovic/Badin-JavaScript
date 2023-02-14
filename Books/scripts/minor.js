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
  "Adult Fiction",
  "Asexual",
  "BDSM",
  "Erotica",
  "Erotic Romance",
  "GLBT",
  "LGBT",
  "M F M",
  "M M Contemporary",
  "M M M",
  "M M Romance",
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
});

elementCheckbox.addEventListener("change", () => {
  elementBooksContainerGenres.innerHTML = "";

  if (elementCheckbox.checked) {
    allGenres.forEach((genre) => {
      if (!adultContentList.includes(genre)) filterGenre(genre);
    });
  } else {
    allGenres.forEach((genre) => {
      filterGenre(genre);
    });
  }
  //JANSDPSAPNPASNBFBNSABFFABSb
  //ASFP:A{SF<{ASFA{SPF<AP{FS}}}}
  //ASFSAFASFFSSAFAS
  elementBooksContainerList.innerHTML = "";
  books.record.results.forEach((e) => {
    console.log(adultContentList.includes(e.genre));
    if (!adultContentList.includes(e.genre)) {
      makeCard(elementBooksContainerList, "books-container-list-card", e);
    }
  });
});

let filterGenre = (gen) => {
  let elementGenre = document.createElement("p");
  elementGenre.innerHTML = gen;
  elementBooksContainerGenres.appendChild(elementGenre);
};
