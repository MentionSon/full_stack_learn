import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@app/common';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionModule } from './action/action.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [CommonModule, CoursesModule, AuthModule, ActionModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
