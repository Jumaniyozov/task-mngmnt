import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.status.enum";


@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  //
  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  //
  @Delete("/:id")
  deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
  //
  // @Put("/:id")
  // updateTaskById(@Param("id") id: string, @Body() body): Task {
  //   const data = { ...body };
  //   return this.taskService.updateTaskById(id, data);
  // }
  //
  @Patch("/:id/status")
  updateTaskStatus(@Param("id", ParseIntPipe) id: number, @Body("status", new TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }
}
