import { createParamDecorator } from '@nestjs/common';

export const currentUser = createParamDecorator((data, req) => req.user);
