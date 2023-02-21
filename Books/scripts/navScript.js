const elementsNavDownListItem = document.querySelectorAll(
  ".nav-down-list-item"
);
const elementHome = document.querySelector(".home");
const elementBooks = document.querySelector(".books");
const elementNavUp = document.querySelector(".nav-up-search");
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
  elementNavUp.classList.add("hide");

  elementShopExit.click();
});

elementsNavDownListItem[1].addEventListener("click", () => {
  elementsNavDownListItem[0].classList.remove("selected");
  elementsNavDownListItem[1].classList.add("selected");

  elementHome.classList.add("hide");
  elementBooks.classList.remove("hide");
  elementNavUp.classList.remove("hide");

  elementShopExit.click();
});

elementSearch.addEventListener("click", () => {
  books.forEach((element) => {
    if (elementInputSearch.value === "") {
      elementInputSearch.focus();
    } else if (
      element.title
        .toString()
        .toLowerCase()
        .includes(elementInputSearch.value.toLowerCase())
    ) {
      elementBooksContainerList.innerHTML = "";
      makeCard(elementBooksContainerList, "books-container-list-card", element);
    }
  });
  elementInputSearch.value = "";
  elementShopExit.click();
});

elementCheckbox.addEventListener("change", () => {
  showBooksPage();
  elementShopExit.click();
});
