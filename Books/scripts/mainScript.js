const elementMain = document.querySelector("main");
const elementBestRatingsContainer = document.querySelector(
  ".best-ratings-container"
);
const elementMostReviewsContainer = document.querySelector(
  ".most-reviews-container"
);
const elementBooksContainerGenres = document.querySelector(
  ".books-container-genres"
);
const elementBooksContainerList = document.querySelector(
  ".books-container-list"
);
const elementShop = document.querySelector(".shop");
const elementShopImage = document.querySelector(
  ".shop-wrapper-container-image"
);
const elementShopTitle = document.querySelector(
  ".shop-wrapper-container-info-title"
);
const elementShopStats = document.querySelector(
  ".shop-wrapper-container-info-stats"
);
const elementShopDescription = document.querySelector(
  ".shop-wrapper-description"
);
const elementShopExit = document.querySelector(".exit");
const elementGenreTitle = document.querySelector(".home-preview-title-item");

let JSONbooks;
let books;
let allGenres = [];
let allGenresIndex = 0;
let booksByGenre = [];
let averageRating = 0;

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

  showFirstFourOfSortedBooks(
    sortedBooksBestRating,
    elementBestRatingsContainer
  );
  //show books form random genre sorted by reviews
  let sortedBooksMostReviews = [...booksByGenre].sort((x, y) => {
    return x.reviews < y.reviews ? 1 : x.reviews > y.reviews ? -1 : 0;
  });

  showFirstFourOfSortedBooks(
    sortedBooksMostReviews,
    elementMostReviewsContainer
  );
  //books page, all genres
  allGenres.sort();
  allGenres.forEach((genre) => {
    if (!adultContentList.includes(genre)) {
      displayGenre(genre);
    }
  });
  //books page, all books
  books.forEach((book) => {
    if (!adultContentList.some((el) => book.genre.includes(el))) {
      makeCard(elementBooksContainerList, "books-container-list-card", book);
    }
  });
});

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

  elementCardImage.src = item.img;
  elementCardTitle.innerHTML = item.title;
  elementCardRating.innerHTML = `Rating: ${item.rating}`;

  elementCard.appendChild(elementCardImage);
  elementCard.appendChild(elementCardTitle);
  elementCard.appendChild(elementCardRating);

  elementCard.addEventListener("click", () => {
    elementShop.classList.remove("hide");
    elementMain.style.overflow = "hidden";
    elementMain.style.height = "90vh";

    elementShopImage.src = item.img;
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
    elementShopStats.appendChild(shopAuthor);
    elementShopStats.appendChild(shopGenre);
    elementShopStats.appendChild(shopRating);
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
  } else {
    books.forEach((book) => {
      if (book.genre.includes(g)) {
        makeCard(elementBooksContainerList, "books-container-list-card", book);
      }
    });
  }
};

let displayGenre = (gen) => {
  let elementGenre = document.createElement("p");
  elementGenre.innerHTML = gen;
  elementGenre.addEventListener("click", () => {
    elementBooksContainerList.innerHTML = "";
    loadBooks(gen);
  });

  elementBooksContainerGenres.appendChild(elementGenre);
};
