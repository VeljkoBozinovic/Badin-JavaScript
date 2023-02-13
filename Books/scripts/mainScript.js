const elementsBestRatingCards = document.querySelectorAll(".best-ratings-card");
const elementsBestRatingCardsImages = document.querySelectorAll(
  ".best-ratings-card-image"
);
const elementsBestRatingCardsTitles = document.querySelectorAll(
  ".best-ratings-card-title"
);
let elementsBestRatingCardsIndex = 0;
const elementsMostReviewsCards = document.querySelectorAll(
  ".most-reviews-card-image"
);

let books;
let allGenres = [];
let allGenresIndex = 0;

window.addEventListener("load", async () => {
  try {
    books = await getBooks();
  } catch (error) {
    console.log(error);
  }

  books.record.results.forEach((book) => {
    let currentGenres = book.genre.split(",");

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
      elementsBestRatingCardsImages[elementsBestRatingCardsIndex].src = el.img;
      elementsBestRatingCardsTitles[elementsBestRatingCardsIndex].innerHTML =
        el.title;
      elementsMostReviewsCards[elementsBestRatingCardsIndex].src = el.img;

      elementsBestRatingCardsIndex++;
    }
  });
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
