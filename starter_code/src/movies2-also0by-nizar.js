/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes  ---MAP---

function turnHoursToMinutes(moviesArray) {
    return moviesArray.map(function (elem) {
      var hours = 0;
      var minutes = 0;
      if (elem.duration.indexOf('h') !== -1) {
        hours = parseInt(elem.duration[0], 10) * 60;
      }
      if (elem.duration.indexOf('min') !== -1) {
        minutes = parseInt(elem.duration.substring(elem.duration.length - 5, elem.duration.length - 3), 10);
      }
      return Object.assign({}, elem, { duration: hours + minutes });
    });
  }
  turnHoursToMinutes(movies);
  console.log(movies);
  
  
  // Get the average of all rates with 2 decimals rounded to nearest hundredths ---REDUCE---
  function ratesAverage(moviesArray) {
    var rateSum = moviesArray.reduce(function (accumulator, movie) {
      return accumulator + Number(movie.rate);
    }, 0);
    return Number((rateSum / moviesArray.length).toFixed(2));
  }
  
  console.log('The average rate is: ' + (ratesAverage(movies)));
  
  
  // Get the average of Drama Movies ---FILTER AND REDUCE--
  
  function dramaMoviesRate(movieArray) {
    var dramaMovies = movieArray.filter(function (movieElement) {
      return movieElement.genre.indexOf('Drama') !== -1;
    });
    if (isNaN(ratesAverage(dramaMovies))) {
      return undefined;
    }
    return (ratesAverage(dramaMovies));
  }
  
  console.log('The average rate of "Drama" movies is: ' + dramaMoviesRate(movies));
  
  
  // Order by time duration, in growing order
  
  function orderByDuration(moviesArray) {
    moviesArray.sort(function (a, b) {
      if (a.duration === b.duration) {
        if (a.title > b.title) {
          return 1;
        }
      }
      return a.duration - b.duration;
    });
    return moviesArray;
  }
  
  console.log(orderByDuration(movies));
  
  // How many Drama movies did STEVEN SPIELBERG ---FILTER---
  
  function howManyMovies(moviesArr) {
    if (moviesArr.length === 0) {
      return undefined;
    }
    var directorMovies = moviesArr.filter(function (e) {
      return e.director === 'Steven Spielberg' && e.genre.indexOf('Drama') !== -1;
    });
    return 'Steven Spielberg directed ' + directorMovies.length + ' drama movies!';
  }
  
  console.log(howManyMovies(movies));
  
  
  // Order by title and print the first 20 titles
  function orderAlphabetically(moviesArray) {
    moviesArray.sort(function (a, b) {
      return a.title < b.title ? -1 : 1;
    });
    var top20Movies = [];
    var limit = 20;
    if (moviesArray.length < 20) {
      limit = moviesArray.length;
    }
    for (var i = 0; i < limit; i++) {
      top20Movies.push(moviesArray[i].title);
    }
    return top20Movies;
  }
  
  console.log(orderAlphabetically(movies));
  
  // Best yearly rate average ---forEach and REDUCE---
  
  function bestYearAvg(moviesArr) {
    var ratesYear = {};
    var moviesYear = {};
    var averageYear = {};
    if (moviesArr.length === 0) {
      return undefined;
    }
    moviesArr.forEach(function (e) {
      if (ratesYear[e.year]) {
        moviesYear[e.year] += 1;
        ratesYear[e.year] += parseFloat(e.rate);
        averageYear[e.year] = parseFloat((ratesYear[e.year] / moviesYear[e.year]).toFixed(2));
      } else {
        ratesYear[e.year] = parseFloat(e.rate);
        moviesYear[e.year] = 1;
        averageYear[e.year] = parseFloat(e.rate);
      }
    });
    var year = Object.keys(averageYear).reduce(function (a, b) {
      if (averageYear[a] === averageYear[b]) {
        if (b < a) {
          return b;
        }
        return a;
      } else if (averageYear[a] > averageYear[b]) {
        return a;
      }
      return b;
    });
    return 'The best year was ' + year + ' with an average rate of ' + averageYear[year];
  }
  
  console.log(bestYearAvg(movies));
  