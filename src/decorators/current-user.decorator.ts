import { createParamDecorator, ExecutionContext } from '@nestjs/common';

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const CurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
});
