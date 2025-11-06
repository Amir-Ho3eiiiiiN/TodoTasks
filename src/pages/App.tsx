
import { Layout } from "../components/Layout";
import { AddTodoForm } from "../features/todos/components/AddTodoForm";
import FilterTodos from "../features/todos/components/FilterTodos";
import { TodoList } from "../features/todos/components/TodoList";

export default function App() {
  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <FilterTodos />
        <AddTodoForm />
      </div>
      <div className="w-full">
        <TodoList />
      </div>
    </Layout>
  );
}
