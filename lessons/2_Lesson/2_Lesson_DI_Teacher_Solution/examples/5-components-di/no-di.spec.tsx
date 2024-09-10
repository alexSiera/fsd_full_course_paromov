import { nanoid } from "nanoid";
import { create } from "zustand";
import React, { useEffect, useId } from "react";
import { expect, test } from "vitest";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";

type TaskDto = { title: string; id: string };
let tasks = [
  {
    id: nanoid(),
    title: "Initial Task",
  },
] as Array<TaskDto>;

async function getTasks() {
  return tasks;
}

async function createTask(title: string) {
  const task = { title, id: nanoid() };
  tasks = tasks.concat(task);
  return task;
}

async function deleteTask(id: string) {
  tasks = tasks.filter((task) => task.id !== id);
}

// ============================
// tasks module
// ============================

type TasksStore = {
  tasks: TaskDto[];
  fetchTasks: () => void;
  createTask: (title: string) => void;
  deleteTask: (id: string) => void;
};

const useTasks = create<TasksStore>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    set({ tasks: await getTasks() });
  },
  createTask: async (title) => {
    await createTask(title);
    set({ tasks: await getTasks() });
  },
  deleteTask: async (id) => {
    await deleteTask(id);
    const newTasks = await getTasks();
    set({ tasks: newTasks });
  },
}));

const DeleteTaskButton = ({ id }: { id: string }) => {
  const deleteTask = useTasks((state) => state.deleteTask);
  return <button onClick={() => deleteTask(id)}>Delete</button>;
};

const CreateTaskForm = () => {
  const [value, setValue] = React.useState("");

  const id = useId();
  const createTask = useTasks((state) => state.createTask);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTask(value);
        setValue("");
      }}
    >
      <label htmlFor={id}>Create Task input</label>
      <input type="text" id={id} value={value} onChange={handleChange} />
      <button>Create Task</button>
    </form>
  );
};

const TaskCard = ({ title, id }: { title: string; id: string }) => {
  return (
    <div>
      <div>{title}</div>
      <div>
        <DeleteTaskButton id={id} />
      </div>
    </div>
  );
};

const TasksList = () => {
  const tasks = useTasks((state) => state.tasks);
  const fetchTasks = useTasks((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <CreateTaskForm />
      <TasksList />
    </div>
  );
};

test("should work", async () => {
  render(<App />);

  await waitFor(() => {
    //@ts-ignore
    expect(screen.getByText("Initial task")).toBeInTheDocument();
  });

  const createTaskInput = screen.getByLabelText("Create task input");
  const createTaskButton = screen.getByText("Create Task");

  fireEvent.change(createTaskInput, { target: { value: "New task" } });
  fireEvent.click(createTaskButton);

  await waitFor(() => {
    //@ts-ignore
    expect(screen.getByText("New task")).toBeInTheDocument();
  });

  const deleteButton = within(
    screen.getByText("New task").parentNode as HTMLDivElement
  ).getByText("Delete task");
  fireEvent.click(deleteButton);

  await waitForElementToBeRemoved(() => screen.getByText("New task"));
});
