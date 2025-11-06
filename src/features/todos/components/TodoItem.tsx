import { Button } from "../../../components/ui/Button";
import type { Todo } from "../types";
import { useDispatch } from "react-redux";
import {
  toggleTodo,
  deleteTodo as removeTodo,
  setEditTodo,
} from "../todosSlice";
import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { PriorityBadge } from "../../../components/ui/PriorityBadge";

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowDesc, setIsShowDesc] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeTodo(todo.id));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          onClick={handleToggle}
          className={`flex justify-between items-center p-2 border rounded shadow-sm 
          ${
            todo.completed
              ? "bg-orange-100 line-through text-gray-500"
              : "bg-white"
          } cursor-pointer select-none`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <h3
                className={`${
                  todo.completed && "text-orange-700"
                } text-sm pl-2 font-semibold`}
              >
                {todo.title}
              </h3>
              <span
                className="cursor-cell"
                title={`edit ${todo.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setEditTodo(todo.id));
                }}
              >
                ✏️
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="inline-block px-2 py-1 text-xs font-medium border rounded-full">
                {new Date(todo.createdAt).toLocaleString()}
              </span>
              <PriorityBadge
                priority={todo.priority as "Low" | "Medium" | "High"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 min-w-32">
            <Button
              onClick={handleDeleteClick}
              className="w-full text-xs text-orange-800 hover:bg-orange-100"
            >
              Remove
            </Button>
            <Button
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsShowDesc((prev) => !prev);
              }}
              className="w-full text-xs text-white bg-orange-800 hover:bg-orange-600"
            >
              {!isShowDesc ? "Show Description" : "Hide Description"}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Delete Todo"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        <p>Are you sure you want to delete "{todo.title}"?</p>
      </Modal>

      <Modal
        isOpen={isShowDesc}
        title={todo.title}
        onClose={() => setIsShowDesc(false)}
        cancelText={"close"}
      >
        <p>{todo.description}</p>
      </Modal>
    </>
  );
}
