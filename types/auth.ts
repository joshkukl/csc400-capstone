export type PublicUser = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: PublicUser;
};

export type AuthErrorResponse = {
  error: string;
};
