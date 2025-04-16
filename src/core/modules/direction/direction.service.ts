import { Injectable } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { DirectionRepository } from './direction.repository';

@Injectable()
export class DirectionService {
    constructor(private readonly directionRepository: DirectionRepository) {}

    create({ title }: CreateDirectionDto) {
        return this.directionRepository.create({
            title,
        });
    }

    findAll() {
        return this.directionRepository.findAll();
    }

    findOne(id: number) {
        return this.directionRepository.findOne(id);
    }

    update(id: number, { title }: UpdateDirectionDto) {
        return this.directionRepository.update(id, {
            title,
            updatedAt: new Date(),
        });
    }

    remove(id: number) {
        return this.directionRepository.remove(id);
    }
}
