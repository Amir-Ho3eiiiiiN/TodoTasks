import { TodoItem } from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { reorderTodos } from "../todosSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import SortTodos from "./SortTodos";
import type { RootState } from "../../../app/store";

export function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todosToShow);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;
    const fromId = todos[source.index].id;
    const toId = todos[destination.index].id;
    dispatch(reorderTodos({ fromId, toId }));
  };

  return (
    <div className=" w-full flex flex-col gap-1">
      <div className="flex justify-between items-center border-b text-sm pb-1 ">
        <h2 className="font-semibold">List Section</h2>
        <SortTodos />
      </div>
      <div className="gap-2 p-2 border rounded max-h-[calc(100vh-115px)] overflow-y-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-2"
              >
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem todo={todo} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
