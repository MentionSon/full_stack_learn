import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiTags('视频集合')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  option() {
    return {
      title: '集合管理',
      menuType: 'icon',
      column: [
        {
          prop: 'name',
          label: '集合名称',
          sortable: true,
          search: true,
          span: 24,
          regex: true,
          row: true,
        },
        {
          prop: 'cover',
          label: '集合封面',
          type: 'upload',
          listType: 'picture-img',
          action: '/upload',
          row: true,
          width: 150,
        },
      ],
    };
  }
}
