import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRespository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRespository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRespository.save(student);
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRespository.findOneBy({ id });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRespository.find();
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRespository.findByIds(studentIds);
    // return this.studentRespository.findBy({ id: { $in: studentIds } });
    // return this.studentRespository.find({
    //   where: {
    //     id: {
    //       $in: studentIds,
    //     },
    //   },
    // });
  }
}
