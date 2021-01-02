import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param, ParseIntPipe,
  Patch,
  Post,
  Put,
  Query, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.status.enum";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";


@Controller("tasks")
@UseGuards(AuthGuard("jwt"))
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private taskService: TasksService) {
  }

  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retrieving all taskss. Filter ${JSON.stringify(filterDto)}`)
    return this.taskService.getTasks(filterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User ${user.username} creating a task. Data ${JSON.stringify(createTaskDto)}`)
    return this.taskService.createTask(createTaskDto, user);
  }

  //
  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", new TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
