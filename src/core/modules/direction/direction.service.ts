import { Injectable } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { DirectionRepository } from './direction.repository';

@Injectable()
export class DirectionService {
    constructor(private readonly directionRepository: DirectionRepository) {}

    create(createDirectionDto: CreateDirectionDto) {
        return this.directionRepository.create(createDirectionDto);
    }

    findAll() {
        return this.directionRepository.findAll();
    }

    findOne(id: number) {
        return this.directionRepository.findOne(id);
    }

    update(id: number, updateDirectionDto: UpdateDirectionDto) {
        return this.directionRepository.update(id, updateDirectionDto);
    }

    remove(id: number) {
        return this.directionRepository.remove(id);
    }
}
