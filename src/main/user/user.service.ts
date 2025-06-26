import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return this.Users;
  }

  findOne(email: string) {
    return this.Users.find((user) => user.email == email);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
  private Users = [
    {
      name: 'sharif',
      email: 'srka780@gmail.com',
      password: '12345',
      role: 'admin',
    },
    {
      name: 'meraj',
      email: 'meraj@gmail.com',
      password: '12345',
      role: 'user',
    },
    {
      name: 'rakib',
      email: 'rakib@gmail.com',
      password: '12345',
      role: 'user',
    },
  ];
}
