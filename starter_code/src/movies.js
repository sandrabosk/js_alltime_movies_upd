/* eslint no-restricted-globals: 'off' */

 // Iteration 1: All rates average
  // Get the average of all rates with 2 decimals
  function ratesAverage (movies) {
    let rateSum = movies.reduce((sum, oneMovie) => sum + Number(oneMovie.rate), 0);
  
    let result = rateSum / movies.length;
    return Number(Math.round(result * 100) / 100);
  }

// Iteration 2: Drama movies
  // Get the average of Drama Movies
  function dramaOnly (movies) {
    let dramas = movies.filter(oneMovie => oneMovie.genre.includes("Drama"));
    return dramas;
  }

  function dramaMoviesRate (movies) {
    let dramas = dramaOnly(movies);
    if (dramas.length === 0) {
      return;
    }
    return ratesAverage(dramas);
  }  


 // Iteration 3: Ordering by duration
  // Order by time duration, in growing order
  function orderByDuration (movies) {
    movies.sort((movieA, movieB) => {
      let result = movieA.duration - movieB.duration;
      if (result !== 0) {
        return result;
      }
  
      if (movieA.title < movieB.title) {
        return -1;
      }
  
      if (movieA.title > movieB.title) {
        return 1;
      }
      return 0;
    });

    return movies;
  }

 // Iteration 4: Steven Spielberg. The best?
  // How many movies did STEVEN SPIELBERG
  function howManyMovies (movies) {
    if (movies.length === 0) {
      return;
    }
  
    let spielbergFilms = movies.filter(oneMovie => oneMovie.director === "Steven Spielberg");
  
    let dramas = dramaOnly(spielbergFilms);
  
    return `Steven Spielberg directed ${dramas.length} drama movies!`;
  }

 // Iteration 5: Alphabetic Order
  // Order by title and print the first 20 titles
  function orderAlphabetically (movies) {
    let sortedTitles = movies
        .map(oneMovie => oneMovie.title)
        .sort()
        .slice(0, 20)
      ;
  
    return sortedTitles;
  }

// Iteration 6: Time Format
// Turn duration of the movies from hours to minutes
// "2h 33min" -> 153
// "2h"       -> 120
// "33min"    -> 33

// "2h"
function convertHours (hourString) {
    // ["2", ""]
    let calculateHour = hourString.split("h");
    return calculateHour[0] * 60;
    // "2" * 60
    // 120
  }
  
  // "33min"
  function convertMinutes (minuteString) {
    // ["33", ""]
    let calculateMinutes = minuteString.split("min");
    return Number(calculateMinutes[0]);
    // return +(calculateMinutes[0]); // this is alternative fancier way
    // 33
  }
  
  function convertDuration (duration) {
    let timePieces = duration.split(" ");
    // ["2h", "33min"]
    // ["2h"]
    // ["33min"]
  
    let minutes = timePieces.reduce((sum, onePiece) => {
        if (onePiece.includes("h")) {
          return sum + convertHours(onePiece);
        }
        return sum + convertMinutes(onePiece);
      }, 0);

    return minutes;
  }
  
  function turnHoursToMinutes (movies) {
    let newCentArray = movies.map(oneMovie => {
        let newMovie = {};
        newMovie.title = oneMovie.title;
        newMovie.year = oneMovie.year;
        newMovie.director = oneMovie.director;
        newMovie.duration = convertDuration(oneMovie.duration);
        newMovie.genre = oneMovie.genre;
        newMovie.rate = oneMovie.rate;
  
        return newMovie;
      });
  
    return newCentArray;
  }
  
// BONUS Iteration: Best yearly rate average
  // Best yearly rate average
  function bestYearAvg (movies) {
    if (movies.length === 0) {
      return;
    }
  
    let movieYears = {};
    movies.forEach(oneMovie => {
      if (!movieYears[oneMovie.year]) {
        movieYears[oneMovie.year] = [];
      }
  
      movieYears[oneMovie.year].push(oneMovie);
    });
  
    let winner = 
        Object.keys(movieYears)
        .map(oneYear => {
          return {
            average: ratesAverage(movieYears[oneYear]),
            year: oneYear
          };
        })
        .reduce((currentBest, yearInfo) => {
          if (yearInfo.average > currentBest.average) {
            return yearInfo;
          }
          return currentBest;
        });
  
    return `The best year was ${winner.year} with an average rate of ${winner.average}`;
  }