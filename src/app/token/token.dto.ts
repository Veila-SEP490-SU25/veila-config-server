export class TokenPayload {
  id: string;
  username: string;
  fullName: string;
}

export class TokenOptions {
  isRefresh?: boolean;
  ignoreExpiration?: boolean;
}
