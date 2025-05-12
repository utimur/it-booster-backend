import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { TgAuthGuard } from '@/core/modules/tg-auth/tg-auth.guard';
import { UserAuthData } from '@/shared/decorators/user-auth-data.decorator';
import { RepeatInterviewDto } from '@/core/modules/interview/dto/repeat-interview.dto';

@Controller('interview')
export class InterviewController {
    constructor(private readonly interviewService: InterviewService) {}

    @Post()
    create(@Body() createInterviewDto: CreateInterviewDto) {
        return this.interviewService.create(createInterviewDto);
    }

    @Get()
    @UseGuards(TgAuthGuard)
    async findAll(@UserAuthData('userId') userId: number) {
        const interview = await this.interviewService.findAll({
            authorId: userId,
        });
        console.log(interview[0].startedAt?.getDate());
        return this.interviewService.findAll({ authorId: userId });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.interviewService.findOne(+id);
    }

    @Post('/repeat')
    repeat(@Body() repeatInterviewDto: RepeatInterviewDto) {
        return this.interviewService.repeat(repeatInterviewDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateInterviewDto: UpdateInterviewDto,
    ) {
        return this.interviewService.update(+id, updateInterviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.interviewService.remove(+id);
    }
}
