import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userModel.create(createUserDto);

    await this.userModel.save(user);

    //delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async update(
    id: number,
    data: object,
  ): Promise<User | UpdateResult | undefined> {
    const user = await this.findById(id).then((res) => res);
    if (user) return await this.userModel.update(id, data).then((res) => res);
    return;
  }

  async remove(id: number) {
    return await this.userModel.delete(id);
  }
}
