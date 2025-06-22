import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const Secret = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const secret = request.headers["x-secret-key"] || request.headers["X-Secret-Key"];
  if (!secret) {
    throw new UnauthorizedException("Secret key is required");
  }
  return secret;
})