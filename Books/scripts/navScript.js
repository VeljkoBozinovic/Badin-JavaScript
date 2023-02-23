const elementsNavDownListItem = document.querySelectorAll(".nav-down-list-item");
const elementHome = document.querySelector(".home");
const elementBooks = document.querySelector(".books");
const elementNavUp = document.querySelector(".nav-up-search");
const elementSearch = document.querySelector(".nav-up-search-btn");
const elementInputSearch = document.querySelector("input[type=search]");
const elementCheckbox = document.querySelector("#adult-content");
let adultContentList = [
  "Abuse",
  "Adult",
  "Adult Fiction",
  "Asexual",
  "BDSM",
  "GLBT",
  "LGBT",
  "M F M",
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
  if (elementInputSearch.value === "") {
    elementInputSearch.focus();
    return;
  }

  elementBooksContainerList.innerHTML = "";

  books.forEach((element) => {
    if (!element.title.toString().toLowerCase().includes(elementInputSearch.value.toLowerCase()))
      return;

    if (elementCheckbox.checked) {
      makeCard(elementBooksContainerList, "books-container-list-card", element);
      return;
    }
    if (!elementCheckbox.checked) {
      let currentBookGenres = element.genre.split(",");

      if (currentBookGenres.some((el) => adultContentList.includes(el))) {
        elementBooksContainerList.innerHTML = "Sadrzaj za odrasle se ne prikazuje!";
        return;
      }

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
