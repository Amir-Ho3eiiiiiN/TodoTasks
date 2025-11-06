import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addTodo } from "../todosSlice";
import { todoSchema } from "../schema";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import type { Todo } from "../types";
import { Dropdown } from "../../../components/ui/ِDropDown";
import { Textarea } from "../../../components/ui/TextArea";

export function AddTodoForm() {
  const dispatch = useDispatch();
  type TodoForm = Omit<Todo, "id" | "completed" | "createdAt">;
  const [todoOptions, setTodoOptions] = useState<TodoForm>({
    title: "",
    description: "",
    priority: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: keyof TodoForm
  ) => {
    setTodoOptions((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = todoSchema.safeParse(todoOptions);
    if (!result.success) {
      setError(result.error.issues?.[0]?.message || "Validation failed");
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      ...result.data,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTodo(newTodo));
    setTodoOptions({
      title: "",
      description: "",
      priority: "",
    });
  };

  return (
    <div className=" w-full max-w-lg flex flex-col gap-1">
      <h2 className="border-b text-sm font-semibold">Form Section</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg gap-2 border rounded p-2"
      >
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter a new task..."
            value={todoOptions.title}
            onChange={(e) => handleChange(e, "title")}
          />
          <Dropdown
            value={todoOptions.priority}
            onChange={(e) => handleChange(e, "priority")}
            options={[
              { label: "select priority", value: "" },
              { label: "Low", value: "Low" },
              { label: "Medium", value: "Medium" },
              { label: "High", value: "High" },
            ]}
          />
        </div>
        <Textarea
          placeholder="Write your description..."
          value={todoOptions.description}
          onChange={(e) => handleChange(e, "description")}
          rows={4}
        />
        <Button
          className="text-sm text-white bg-orange-600 hover:text-slate-800 hover:bg-orange-500"
          type="submit"
        >
          Add
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
