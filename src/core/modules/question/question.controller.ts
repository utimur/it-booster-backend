import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post()
    create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    @Get()
    findAll() {
        return this.questionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.questionService.findOne(+id);
    }

    @Get('interview/:id')
    findByInterviewId(@Param('id') id: string) {
        return this.questionService.findByInterviewId({ interviewId: +id });
    }

    @Get('interview/:id/position/:position')
    findByIPosition(
        @Param('id') id: string,
        @Param('position') position: string,
    ) {
        return this.questionService.findOneByPosition({
            interviewId: +id,
            position: +position,
        });
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ) {
        return this.questionService.update(+id, updateQuestionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.questionService.remove(+id);
    }
}
