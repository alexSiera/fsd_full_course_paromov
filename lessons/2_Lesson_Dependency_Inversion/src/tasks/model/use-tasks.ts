import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Task } from "../../types";

const STORAGE_KEY = "tasks";

type Props = {
  saveToStorage: (key: string, value: unknown) => void;
  getFromStorage: <T>(key: string, defaultValue: T) => T;
};

export function useTasks({ getFromStorage, saveToStorage }: Props) {
  const [tasks, setTasks] = useState<Task[]>(() =>
    getFromStorage(STORAGE_KEY, [])
  );

  const addTask = (value: string) => {
    setTasks((tasks) => [
      { id: nanoid(), title: value, done: false },
      ...tasks,
    ]);
  };

  const removeTask = (id: string) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  };

  const toggleCheckTask = (id: string) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const updateOwner = (id: string, ownerId: string) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, ownerId } : task))
    );
  };

  useEffect(() => {
    saveToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  return {
    tasks,
    addTask,
    removeTask,
    toggleCheckTask,
    updateOwner,
  };
}
