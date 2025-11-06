import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, setEditTodo } from "../todosSlice";
import { todoSchema } from "../schema";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import type { Todo } from "../types";
import { Dropdown } from "../../../components/ui/ِDropDown";
import { Textarea } from "../../../components/ui/TextArea";
import type { RootState } from "../../../app/store";

export function AddTodoForm() {
  const dispatch = useDispatch();
  const todosEdit = useSelector((state: RootState) => state.todos.editedTodo);
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

    if (!todosEdit) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        ...result.data,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      dispatch(addTodo(newTodo));
    } else {
      dispatch(
        editTodo({
          ...todosEdit,
          ...result.data,
        })
      );
    }

    setTodoOptions({
      title: "",
      description: "",
      priority: "",
    });
  };

  useEffect(() => {
    if (todosEdit)
      setTodoOptions({
        title: todosEdit.title,
        description: todosEdit.description,
        priority: todosEdit.priority,
      });
  }, [todosEdit]);

  return (
    <div className="flex flex-col w-full max-w-lg gap-1 ">
      <h2 className="text-sm font-semibold border-b">Form Section</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg gap-2 p-2 border rounded"
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
        <div className="flex flex-1 gap-1">
          <Button
            className="w-full text-sm text-white bg-orange-600 hover:text-slate-800 hover:bg-orange-500"
            type="submit"
          >
            {todosEdit ? "Edit" : "Add"}
          </Button>
          {todosEdit && (
            <Button
              className="w-full text-sm text-orange-600 bg-white hover:bg-orange-100"
              onClick={() => {
                setTodoOptions({
                  title: "",
                  description: "",
                  priority: "",
                });
                dispatch(setEditTodo("-1"));
              }}
            >
              cancel edit
            </Button>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
