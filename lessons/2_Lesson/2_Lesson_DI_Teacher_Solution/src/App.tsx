import { getFromStorage, saveToStorage } from "./lib";
import { TasksList, TasksRepository } from "./tasks";
import { UserSelect } from "./user";

const TASKS_STORAGE_KEY = "tasks";

const tasksRepository: TasksRepository = {
  getTasks: () => getFromStorage(TASKS_STORAGE_KEY, []),
  saveTasks: (tasks) => saveToStorage(TASKS_STORAGE_KEY, tasks),
};

export function App() {
  return (
    <>
      <TasksList
        tasksRepository={tasksRepository}
        renderOwnerSelect={({ onChangeOwnerId, ownerId }) => {
          return (
            <UserSelect userId={ownerId} onChangeUserId={onChangeOwnerId} />
          );
        }}
      />
    </>
  );
}
