import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Res,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.usersService.update(+id, createUserDto);
    if (response)
      return res.json({ message: 'User information updated successfully' });
    return res.json({ error: 'The resource to be updated no longer exist' });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.remove(+id);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Book details deleted successfully' });
  }
}
