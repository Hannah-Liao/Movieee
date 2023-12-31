import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genereIcons from '../../assets/genres';
import { selectgenreOrCategory } from '../../features/currentGenreOrCategory';
import redLogo from '../../assets/images/movieee-red.png';
import blueLogo from '../../assets/images/movieee-blue.png';

const Sidebar = ({ setMobileOpen }) => {
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const theme = useTheme();
  const classes = useStyles();

  const demoCategories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link className={classes.imageLink} to="/">
        <img
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="logo"
          className={classes.image}
        />
      </Link>

      <Divider />

      <List>
        <ListSubheader>Categories</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectgenreOrCategory(value))} button>
              <ListItemIcon> <img src={genereIcons[label.toLowerCase()]} alt="" className={classes.genreImages} height={30} /></ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <Link key={name} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectgenreOrCategory(id))} button>
              <ListItemIcon> <img src={genereIcons[name.toLowerCase()]} alt="" className={classes.genreImages} height={30} /></ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
