export type Task = {
  id: string;
  title: string;
  done: boolean;
  ownerId?: string;
};

export type OwnerSelectParams = {
  ownerId?: string;
  onChangeOwnerId: (value: string) => void;
};

export type TasksRepository = {
  getTasks: () => Task[];
  saveTasks: (tasks: Task[]) => void;
};
