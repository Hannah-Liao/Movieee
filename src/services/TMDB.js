import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApikey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApikey}`,
    }),
    //* get movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Search Movie
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApikey}`;
        }
        //* Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApikey}`;
        }

        //* Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApikey}`;
        }
        //* Get Popular Movies (Default)
        return `movie/popular?page=${page}&api_key=${tmdbApikey}`;
      },
    }),
    //* get Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApikey}`,
    }),
    //* get user specific list
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApikey}&session_id=${sessionId}&page=${page}`,
    }),

    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApikey}`,
    }),

    getActor: builder.query({
      query: ({ person_id }) => `/person/${person_id}?api_key=${tmdbApikey}`,
    }),

    getMoviesByActorID: builder.query({
      query: ({ person_id, page }) => `/discover/movie?with_cast=${person_id}&page=${page}&api_key=${tmdbApikey}`,
    }),
  }),
});

export const { useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorIDQuery,
  useGetListQuery } = tmdbApi;
