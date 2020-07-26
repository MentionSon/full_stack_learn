/*
 * @Author: your name
 * @Date: 2020-03-21 17:34:48
 * @LastEditTime: 2020-03-21 17:38:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \full_stack_learn\server\libs\db\src\models\action.model.ts
 */
import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Course } from './course.model';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Action {
  @prop({ ref: 'User' })
  user: Ref<User>;

  @prop({ enum: ['Course', 'Episode'] })
  type: string;

  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;

  @prop({ enum: ['like', 'upvote'] })
  name: string;
}
