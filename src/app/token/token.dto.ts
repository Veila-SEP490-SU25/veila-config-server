export class TokenPayload {
  id: string;
  username: string;
  fullname: string;
}

export class TokenOptions {
  isRefresh?: boolean;
  ignoreExpiration?: boolean;
}
