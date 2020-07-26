import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';

@Module({
  controllers: [ActionController]
})
export class ActionModule {}
