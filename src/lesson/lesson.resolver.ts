import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }
}
