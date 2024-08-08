import { TUserSelectSlot } from "../../types";
import { useTasks } from "../model/use-tasks";
import { CreateTaskForm } from "./create-task-from";
import { TaskItem } from "./task-item";

type Props = {
  saveToStorage: (key: string, value: unknown) => void;
  getFromStorage: <T>(key: string, defaultValue: T) => T;
  UserSelectSlot: TUserSelectSlot;
};

export function TasksList({
  saveToStorage,
  getFromStorage,
  UserSelectSlot,
}: Props) {
  const { addTask, tasks, toggleCheckTask, removeTask, updateOwner } = useTasks(
    { saveToStorage, getFromStorage }
  );

  return (
    <div>
      <CreateTaskForm onCreate={addTask} />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          done={task.done}
          title={task.title}
          onToggleDone={() => toggleCheckTask(task.id)}
          onDelete={() => removeTask(task.id)}
          userSelectSlot={
            <UserSelectSlot
              userId={task.ownerId}
              onChangeUserId={(ownerId) => updateOwner(task.id, ownerId)}
            />
          }
        />
      ))}
    </div>
  );
}
