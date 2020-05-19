import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Course {
  @ApiProperty({ description: '视频名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '封面' })
  @prop()
  cover: string;

  @arrayProp({ ref: 'Episode', localField: '_id', foreignField: 'course' })
  episodes: Array<Ref<Course>>;
}
