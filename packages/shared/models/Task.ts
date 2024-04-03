import { UserDto } from "./User";

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}


export interface CreateTaskDto {
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
  assignedIds?: number[];
}
export interface SimpleUserDto extends Omit<UserDto, 'role'> {}
export interface TaskDto {
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    assigned: SimpleUserDto[];
    createdBy: SimpleUserDto;
}