import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const location = useLocation();

  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== '/') return null;

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
