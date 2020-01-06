import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode,
})
@Controller('episodes')
@ApiTags('视频')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map(v => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '视频管理',
      menuType: 'icon',
      translate: false,
      column: [
        {
          prop: 'course',
          label: '所属集合',
          type: 'select',
          row: true,
          dicData: courses,
        },
        { prop: 'name', label: '视频名称', span: 24, sortable: true },
        {
          prop: 'file',
          label: '视频文件',
          span: 24,
          type: 'upload',
          width: '120px',
          listType: 'picture-img',
          action: '/upload',
        },
      ],
    };
  }
}
