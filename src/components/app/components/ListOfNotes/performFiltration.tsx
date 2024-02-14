import { Task } from "../../../../models/Task/TaskModel";

export default function performFiltration(
  data: Task[],
  toDo: boolean,
  inProgress: boolean,
  done: boolean
): Task[] {
  const filtratedArray: Task[] = [];
  if (toDo) {
    const first: Task[] = data.filter((task) => task.status === "TO DO");
    first.forEach((num) => {
      filtratedArray.push(num);
    });
  }
  if (inProgress) {
    const first: Task[] = data.filter((task) => task.status === "IN PROGRESS");
    first.forEach((num) => {
      filtratedArray.push(num);
    });
  }
  if (done) {
    const first: Task[] = data.filter((task) => task.status === "DONE");
    first.forEach((num) => {
      filtratedArray.push(num);
    });
  }
  return filtratedArray;
}
