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
const elementShopContainerItems = document.querySelector(
  ".shop-container-items"
);

let books;
let allGenres = [];
let allGenresIndex = 0;
let booksByGenre = [];
let averageRating = 0;

window.addEventListener("load", async () => {
  //all books form api
  try {
    books = await getBooks();
  } catch (error) {
    console.log(error);
  }
  //all genres and one random, avg rating
  books.record.results.forEach((book, i) => {
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

  books.record.results.forEach((el) => {
    if (el.genre.includes(randomGenre)) {
      booksByGenre = [...booksByGenre, el];
    }
  });
  //show books sorted by rating
  let sortedBooksBestRating = [...books.record.results].sort((x, y) => {
    return x.rating < y.rating ? 1 : x.rating > y.rating ? -1 : 0;
  });

  for (let i = 0; i < 4; i++) {
    if (sortedBooksBestRating[i] !== undefined) {
      makeCard(
        elementBestRatingsContainer,
        "best-rating-container-card",
        sortedBooksBestRating[i]
      );
    }
  }
  //show books form random genre sorted by reviews
  let sortedBooksMostReviews = [...booksByGenre].sort((x, y) => {
    return x.reviews < y.reviews ? 1 : x.reviews > y.reviews ? -1 : 0;
  });

  for (let i = 0; i < 4; i++) {
    if (sortedBooksMostReviews[i] !== undefined) {
      makeCard(
        elementMostReviewsContainer,
        "most-reviews-container-card",
        sortedBooksMostReviews[i]
      );
    }
  }
  //books page, all genres
  allGenres.sort();
  allGenres.forEach((genre) => {
    let elementGenre = document.createElement("p");
    elementGenre.innerHTML = genre;
    elementGenre.addEventListener("click", () => {
      elementBooksContainerList.innerHTML = "";

      loadBooks(genre);
    });
    elementBooksContainerGenres.appendChild(elementGenre);
  });
  //books page, all books
  let loadBooks = (g) => {
    if (g === null) {
      books.record.results.forEach((element) => {
        makeCard(
          elementBooksContainerList,
          "books-container-list-card",
          element
        );
      });
    } else {
      books.record.results.forEach((book) => {
        if (book.genre.includes(g)) {
          makeCard(
            elementBooksContainerList,
            "books-container-list-card",
            book
          );
        }
      });
    }
  };

  loadBooks(null);
});

let getBooks = async () => {
  return (
    await fetch("https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest", {
      method: "GET",
      headers: {
        "X-Master-Key":
          "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
      },
    })
  ).json();
};

let makeCard = (parent, cardClass, item) => {
  const elementCard = document.createElement("div");
  elementCard.classList.add(cardClass);
  const elementCardImage = document.createElement("img");
  const elementCardTitle = document.createElement("p");
  const elementCardRating = document.createElement("p");

  elementCardImage.src = item.img;
  elementCardTitle.innerHTML = item.title;
  elementCardRating.innerHTML = item.rating;

  elementCard.appendChild(elementCardImage);
  elementCard.appendChild(elementCardTitle);
  elementCard.appendChild(elementCardRating);

  elementCard.addEventListener("click", () => {
    elementShop.classList.remove("hide");
    elementShopContainerItems.innerHTML = "";

    const elementShopItem = document.createElement("div");
    elementShopItem.classList.add(cardClass);
    const elementShopImage = document.createElement("img");
    const elementShopTitle = document.createElement("p");
    const elementShopRating = document.createElement("p");
    const elementShopDescription = document.createElement("p");
    const elementShopExit = document.createElement("p");

    elementShopImage.src = item.img;
    elementShopTitle.innerHTML = item.title;
    elementShopRating.innerHTML = item.rating;
    item.rating >= averageRating / 66
      ? (elementShopRating.style.backgroundColor = "#0f0")
      : (elementShopRating.style.backgroundColor = "#f00");
    elementShopDescription.innerHTML = item.desc;
    elementShopExit.innerHTML = "Back";
    elementShopExit.addEventListener("click", () => {
      elementShop.classList.add("hide");
    });

    elementShopItem.appendChild(elementShopImage);
    elementShopItem.appendChild(elementShopTitle);
    elementShopItem.appendChild(elementShopRating);
    elementShopItem.appendChild(elementShopDescription);

    elementShopContainerItems.appendChild(elementShopItem);
    elementShopContainerItems.append(elementShopExit);
  });

  parent.appendChild(elementCard);
};
