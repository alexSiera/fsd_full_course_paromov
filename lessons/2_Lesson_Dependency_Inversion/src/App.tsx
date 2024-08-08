import { getFromStorage, saveToStorage } from "./lib/storage";
import { TasksList } from "./tasks/ui/tasks-list";
import { UserSelect } from "./user/ui/user-select";

export function App() {
  return (
    <>
      <TasksList
        getFromStorage={getFromStorage}
        saveToStorage={saveToStorage}
        UserSelectSlot={UserSelect}
      />
    </>
  );
}
