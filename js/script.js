/*
BOOLFLIX
Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
film trovato:
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto
*/

var app = new Vue ({

  el: "#app",
  data: {
    baseurl: 'https://api.themoviedb.org/3/search/',
    apiKey: 'e7044893bb18dd7fd9107b2723c42676',
    userQuery: "",
    movies: [ ],
    series:[ ],
    language: 'it-IT',
    flags:[
      'de',
      'it',
      'en',
      'es',
      'fr',
      'ja',
      'us',
    ],
  },
  methods: {
    movieSearch: function () {
      if (this.userQuery != " ") {

        const params = {
          api_key: this.apiKey,
          query: this.userQuery,
          page: 1,
          include_adult: false,
          language: 'it-IT'
        };
        // console.log(params);

        this.movies = [];
        this.series = [];

        axios.get(this.baseurl + 'movie', { params })
        .then((response) => {
          // console.log(params);
          // this.movies.push(...response.data.results);
          this.movies = response.data.results;
          this.rateModify();
        });

        axios.get(this.baseurl + 'tv', { params })
        .then((response) => {
          // console.log(response.data);
          // this.series.push(...response.data.results);
          this.series = response.data.results;
          this.rateModifySeries();
        });

      }

    },

    rateModify: function () {
      this.movies.forEach(element => {
        element.vote_average = Math.ceil(element.vote_average / 2);
      });
    },
    rateModifySeries: function () {
      this.series.forEach(element => {
        element.vote_average = Math.ceil(element.vote_average / 2);
      });
    }
  },


});
