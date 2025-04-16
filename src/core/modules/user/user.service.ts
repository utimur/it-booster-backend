import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto);
    }

    findAll() {
        return this.userRepository.findAll();
    }

    findOne(id: number) {
        return this.userRepository.findOne(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.userRepository.remove(id);
    }
}
