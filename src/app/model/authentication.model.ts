export class AuthenticationResponse {
  key: string;
  user: AuthenticatedUser;
}

export class AuthenticatedUser {
  id: number;
  username: string;
  get_full_name: string;
}
