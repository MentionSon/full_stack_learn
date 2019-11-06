import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiModelProperty({ description: '视频名称' })
  @prop()
  name: string;

  @ApiModelProperty({ description: '封面' })
  @prop()
  cover: string;

  @arrayProp({ itemsRef: 'Episode' })
  episodes: Ref<Episode>[];
}
