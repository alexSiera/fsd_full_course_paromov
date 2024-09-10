import { getFromStorage, saveToStorage } from "./lib/storage";
import { Task, TasksRepository } from "./tasks/types";
import { TasksList } from "./tasks/ui/tasks-list";
import { UserSelect } from "./user/ui/user-select";

const TASKS_STORAGE_KEY = "tasks";
const tasksRepository: TasksRepository = {
  getTasks: () => getFromStorage(TASKS_STORAGE_KEY, []),
  saveTasks: (tasks: Task[]) => saveToStorage(TASKS_STORAGE_KEY, tasks),
};

export function App() {
  return (
    <>
      <TasksList
        tasksRepository={tasksRepository}
        renderOwnerSelect={({ ownerId, onChangeOwnerId }) => (
          <UserSelect userId={ownerId} onChangeUserId={onChangeOwnerId} />
        )}
      />
    </>
  );
}
