import { Dayjs } from "dayjs";

export interface Task {
  id?: number;
  title: string;
  description: string;
  creationDate: Dayjs;
  dueDate: Dayjs;
  status: "TO DO" | "IN PROGRESS" | "DONE";
}
