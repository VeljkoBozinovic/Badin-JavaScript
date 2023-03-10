const elementMain = document.querySelector("main");
const elementBestRatingsContainer = document.querySelector(".best-ratings-container");
const elementMostReviewsContainer = document.querySelector(".most-reviews-container");
const elementBooksContainerGenres = document.querySelector(".books-container-genres");
const elementBooksContainerList = document.querySelector(".books-container-list");
const elementShop = document.querySelector(".shop");
const elementShopImage = document.querySelector(".shop-wrapper-container-image");
const elementShopTitle = document.querySelector(".shop-wrapper-container-info-title");
const elementShopStats = document.querySelector(".shop-wrapper-container-info-stats");
const elementShopDescription = document.querySelector(".shop-wrapper-description");
const elementShopExit = document.querySelector(".exit");
const elementGenreTitle = document.querySelector(".home-preview-title-item");

let JSONbooks;
let books;
let allGenres = [];
let allGenresIndex = 0;
let allGenresFiltered = [];
let booksByGenre = [];
let averageRating = 0;
let elementAllGenresBooks;

window.addEventListener("load", async () => {
  //all books form api
  try {
    JSONbooks = await getBooks();
    books = JSONbooks.results;
  } catch (error) {
    console.log(error);
  }

  //all genres and one random, avg rating
  books.forEach((book) => {
    let currentGenres = book.genre.split(",");
    averageRating += book.rating;

    for (let i = 0; i < currentGenres.length; i++) {
      if (!allGenres.includes(currentGenres[i])) {
        allGenres[allGenresIndex] = currentGenres[i];
        allGenresIndex++;
      }
    }
  });

  let randomGenre = allGenres[Math.floor(Math.random() * (allGenresIndex - 1))];
  elementGenreTitle.innerHTML += `: ${randomGenre}`;

  books.forEach((el) => {
    if (el.genre.includes(randomGenre)) booksByGenre = [...booksByGenre, el];
  });
  //show books sorted by rating
  let sortedBooksBestRating = [...books].sort((x, y) => {
    return x.rating < y.rating ? 1 : x.rating > y.rating ? -1 : 0;
  });

  let showFirstFourOfSortedBooks = (listOfSortedBooks, elParent) => {
    for (let i = 0; i < 4; i++) {
      if (listOfSortedBooks[i] !== undefined)
        makeCard(elParent, "home-preview-container-card", listOfSortedBooks[i]);
    }
  };
  showFirstFourOfSortedBooks(sortedBooksBestRating, elementBestRatingsContainer);

  //show books form random genre sorted by reviews
  let sortedBooksMostReviews = [...booksByGenre].sort((x, y) => {
    return x.reviews < y.reviews ? 1 : x.reviews > y.reviews ? -1 : 0;
  });
  showFirstFourOfSortedBooks(sortedBooksMostReviews, elementMostReviewsContainer);

  //books page, all genres IAOSDOANHDNBSAIOAUIFS
  allGenres.sort();
  allGenres.forEach((genre) => {
    if (!adultContentList.includes(genre)) {
      allGenresFiltered = [...allGenresFiltered, genre];
    }
  });
  displayGenres(allGenresFiltered);
});

// my functions
let getBooks = async () => {
  return (
    // await fetch("https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest", {
    //   method: "GET",
    //   headers: {
    //     "X-Master-Key":
    //       "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
    //   },
    // })
    (await fetch("JSON/books.json")).json()
  );
};

let makeCard = (parent, cardClass, item) => {
  const elementCard = document.createElement("div");
  elementCard.classList.add(cardClass);
  const elementCardImage = document.createElement("img");
  const elementCardTitle = document.createElement("p");
  const elementCardRating = document.createElement("p");

  item.img
    ? (elementCardImage.src = item.img)
    : (elementCardImage.src = `https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80`);

  elementCardTitle.innerHTML = item.title;
  elementCardRating.innerHTML = `Rating: ${item.rating}`;

  elementCard.append(elementCardImage, elementCardTitle, elementCardRating);

  elementCard.addEventListener("click", () => {
    elementShop.classList.remove("hide");
    elementMain.style.overflow = "hidden";
    elementMain.style.height = "90vh";

    item.img
      ? (elementShopImage.src = item.img)
      : (elementShopImage.src = `https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80`);

    let shopTitle = document.createElement("h1");
    shopTitle.innerHTML = item.title;
    elementShopTitle.appendChild(shopTitle);
    let shopAuthor = document.createElement("p");
    shopAuthor.innerHTML = `Author: ${item.author}`;
    let shopGenre = document.createElement("p");
    shopGenre.innerHTML = `Genres: ${item.genre}`;
    let shopRating = document.createElement("p");
    shopRating.innerHTML = `Rating: ${item.rating}`;
    item.rating >= averageRating / books.length
      ? (shopRating.style.backgroundColor = "#0f0")
      : (shopRating.style.backgroundColor = "#f00");
    elementShopStats.append(shopAuthor, shopGenre, shopRating);
    elementShopDescription.innerHTML = item.desc;
    elementShopExit.addEventListener("click", () => {
      elementShop.classList.add("hide");
      shopTitle.innerHTML = "";
      shopAuthor.innerHTML = "";
      shopGenre.innerHTML = "";
      shopRating.innerHTML = "";
      elementMain.style.overflow = "auto";
      elementMain.style.height = "auto";
    });
  });

  parent.appendChild(elementCard);
};

let loadBooks = (g) => {
  if (g === null) {
    books.forEach((element) => {
      makeCard(elementBooksContainerList, "books-container-list-card", element);
    });
    return;
  }

  books.forEach((book) => {
    if (book.genre.includes(g)) {
      makeCard(elementBooksContainerList, "books-container-list-card", book);
    }
  });
};

let displayGenres = (listOfGenresToDisplay) => {
  elementAllGenresBooks = document.createElement("p");
  elementAllGenresBooks.innerHTML = "All genres";
  elementAllGenresBooks.addEventListener("click", () => {
    elementBooksContainerList.innerHTML = "";
    showBooksPage();
  });
  elementBooksContainerGenres.appendChild(elementAllGenresBooks);

  listOfGenresToDisplay.forEach((genre) => {
    let elementGenre = document.createElement("p");
    elementGenre.innerHTML = genre;
    elementGenre.addEventListener("click", () => {
      elementBooksContainerList.innerHTML = "";
      loadBooks(genre);
    });
    elementBooksContainerGenres.appendChild(elementGenre);
  });
};

let showBooksPage = () => {
  elementBooksContainerGenres.innerHTML = "";
  elementBooksContainerList.innerHTML = "";

  if (elementCheckbox.checked) {
    displayGenres(allGenres);
    loadBooks(null);
    return;
  }

  displayGenres(allGenresFiltered);
  books.forEach((book) => {
    let currentBookGenres = book.genre.split(",");
    if (!currentBookGenres.some((el) => adultContentList.includes(el))) {
      makeCard(elementBooksContainerList, "books-container-list-card", book);
    }
  });
};
