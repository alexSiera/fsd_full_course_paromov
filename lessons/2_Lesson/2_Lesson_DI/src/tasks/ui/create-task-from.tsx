import { ChangeEventHandler, useId, useState } from "react";

export function CreateTaskForm({
  onCreate,
}: {
  onCreate: (title: string) => void;
}) {
  const [value, setValue] = useState("");
  const id = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id}>Create task input</label>
      <input id={id} type="text" value={value} onChange={handleChange} />
      <button>Create Task</button>
    </form>
  );
}
