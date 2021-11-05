import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const CurUser = createParamDecorator((data, req): User => {
//   console.log(req.user);
//   return req.user;
// });

export const CurUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
