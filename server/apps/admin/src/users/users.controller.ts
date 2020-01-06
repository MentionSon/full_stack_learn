import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(@InjectModel(User) private readonly model: ModelType<User>) {}

  @Get('option')
  option() {
    return {
      title: '用户管理',
      menuType: 'icon',
      column: [{ prop: 'username', label: '用户名', sortable: true }],
    };
  }
}
