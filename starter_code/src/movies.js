/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
// "2h 33min" -> 153
// "2h"       -> 120
// "33min"    -> 33

// "2h"
function convertHours (hourString) {
    // ["2", ""]
    var calculateHour = hourString.split("h");
    return calculateHour[0] * 60;
    // "2" * 60
    // 120
  }
  
  // "33min"
  function convertMinutes (minuteString) {
    // ["33", ""]
    var calculateMinutes = minuteString.split("min");
    return Number(calculateMinutes[0]);
    // 33
  }
  
  function convertDuration (duration) {
    var timePieces = duration.split(" ");
    // ["2h", "33min"]
    // ["2h"]
    // ["33min"]
  
    var minutes =
      timePieces.reduce(function (sum, onePiece) {
        if (onePiece.includes("h")) {
          return sum + convertHours(onePiece);
        }
        return sum + convertMinutes(onePiece);
      }, 0);
  
    return minutes;
  }
  
  function turnHoursToMinutes (movies) {
    var newCentArray =
      movies.map(function (oneMovie) {
        var newMovie = {};
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
  
  
  // Get the average of all rates with 2 decimals
  function ratesAverage (movies) {
    var rateSum =
      movies.reduce(function (sum, oneMovie) {
        return sum + oneMovie.rate;
      }, 0);
  
    var result = rateSum / movies.length;
    return Math.round(result * 100) / 100;
  }
  
  
  // Get the average of Drama Movies
  function dramaOnly (movies) {
    var dramas =
      movies.filter(function (oneMovie) {
        return oneMovie.genre.includes("Drama");
      });
  
    return dramas;
  }
  function dramaMoviesRate (movies) {
    var dramas = dramaOnly(movies);
  
    if (dramas.length === 0) {
      return;
    }
  
    return ratesAverage(dramas);
  }
  
  
  // Order by time duration, in growing order
  function orderByDuration (movies) {
    movies.sort(function (movieA, movieB) {
      var result = movieA.duration - movieB.duration;
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
  
  
  // How many movies did STEVEN SPIELBERG
  function howManyMovies (movies) {
    if (movies.length === 0) {
      return;
    }
  
    var spielbergFilms =
      movies.filter(function (oneMovie) {
        return oneMovie.director === "Steven Spielberg";
      });
  
    var dramas = dramaOnly(spielbergFilms);
  
    return "Steven Spielberg directed " + dramas.length + " drama movies!";
  }
  
  
  // Order by title and print the first 20 titles
  function orderAlphabetically (movies) {
    var sortedTitles =
      movies
        .map(function (oneMovie) {
          return oneMovie.title;
        })
        .sort()
        .slice(0, 20)
      ;
  
    return sortedTitles;
  }
  
  
  // Best yearly rate average
  function bestYearAvg (movies) {
    if (movies.length === 0) {
      return;
    }
  
    var movieYears = {};
    movies.forEach(function (oneMovie) {
      if (!movieYears[oneMovie.year]) {
        movieYears[oneMovie.year] = [];
      }
  
      movieYears[oneMovie.year].push(oneMovie);
    });
  
    var winner =
      Object.keys(movieYears)
        .map(function (oneYear) {
          return {
            average: ratesAverage(movieYears[oneYear]),
            year: oneYear
          };
        })
        .reduce(function (currentBest, yearInfo) {
          if (yearInfo.average > currentBest.average) {
            return yearInfo;
          }
          return currentBest;
        });
  
    return "The best year was " + winner.year + " with an average rate of " + winner.average;
  }