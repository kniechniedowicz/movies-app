import { Movie } from './movie';

export type User = {
  id: string;
  email: string;
  favouriteMovies: Movie[];
  isAdmin: boolean;
};

export type AuthData = {
  accessToken: string;
  user: User;
};
