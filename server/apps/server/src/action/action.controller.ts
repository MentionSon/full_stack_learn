import { Controller, UseGuards, Get, Query, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('action')
@UseGuards(AuthGuard('jwt'))
export class ActionController {
  constructor(
    @InjectModel(Action) private actionModel: ReturnModelType<typeof Action>,
  ) {}

  @Get('status')
  async getStatus(@Query() dto, @CurrentUser() user) {
    dto.user = user._id;
    const count = await this.actionModel.countDocuments(dto);
    return {
      status: count > 0,
    };
  }

  @Post('toggle')
  async toggle(@Body() dto, @CurrentUser() user) {
    const { status } = await this.getStatus(dto, user);
    dto.user = user._id;
    if (status) {
      await this.actionModel.deleteMany(dto);
    } else {
      await this.actionModel.create(dto);
    }
    return await this.getStatus(dto, user);
  }
}
