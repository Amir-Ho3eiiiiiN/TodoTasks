import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Priority, Todo } from "./types";

// ---------- types ----------
export type Status = "All" | "Completed" | "Incomplete";
type SortOption = "date" | "priority" | null;
type SortOrder = "asc" | "desc";

export interface FiltersState {
  search: string;
  priority: Priority | "All";
  status: Status;
}

interface TodosState {
  todos: Todo[];
  todosToShow: Todo[];
  filters: FiltersState;
  sortBy: SortOption;
  sortOrder: SortOrder;
  selectedTodo: Todo;
}

// ---------- actions ----------
const applyFilters = (state: TodosState) => {
  const { search, priority, status } = state.filters;
  let filtered = [...state.todos];

  if (search.trim()) {
    filtered = filtered.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (priority !== "All") {
    filtered = filtered.filter((t) => t.priority === priority);
  }
  if (status !== "All") {
    filtered = filtered.filter((t) =>
      status === "Completed" ? t.completed : !t.completed
    );
  }

  state.todosToShow = filtered;
  applySorting(state);
};

const applySorting = (state: TodosState) => {
  if (!state.sortBy) return;

  const { sortBy, sortOrder } = state;
  const factor = sortOrder === "asc" ? 1 : -1;

  if (sortBy === "date") {
    state.todosToShow.sort(
      (a, b) =>
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
        factor
    );
  } else if (sortBy === "priority") {
    const order: Record<Priority, number> = { High: 3, Medium: 2, Low: 1 };
    state.todosToShow.sort((a, b) => {
      const aVal = order[a.priority as Priority] ?? 0;
      const bVal = order[b.priority as Priority] ?? 0;
      return (aVal - bVal) * factor;
    });
  }
};

const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (err) {
    console.error("Failed to save todos", err);
  }
};

// ---------- initial state ----------
const initialState: TodosState = {
  todos: loadTodos(),
  todosToShow: loadTodos(),
  filters: {
    search: "",
    priority: "All",
    status: "All",
  },
  sortBy: null,
  sortOrder: "asc",
};

// ---------- slice ----------
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveTodos(state.todos);
      applyFilters(state);
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveTodos(state.todos);
      applyFilters(state);
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      saveTodos(state.todos);
      applyFilters(state);
    },

    reorderTodos: (
      state,
      action: PayloadAction<{ fromId: string; toId: string }>
    ) => {
      state.sortBy = null;
      state.sortOrder = "asc";
      const { fromId, toId } = action.payload;
      const fromIndex = state.todosToShow.findIndex((t) => t.id === fromId);
      const toIndex = state.todosToShow.findIndex((t) => t.id === toId);
      if (fromIndex === -1 || toIndex === -1) return;
      const [moved] = state.todosToShow.splice(fromIndex, 1);
      state.todosToShow.splice(toIndex, 0, moved);
    },

    // ---------- filters ----------
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      applyFilters(state);
    },

    setPriorityFilter: (state, action: PayloadAction<Priority | "All">) => {
      state.filters.priority = action.payload;
      applyFilters(state);
    },

    setStatusFilter: (state, action: PayloadAction<Status>) => {
      state.filters.status = action.payload;
      applyFilters(state);
    },

    // ---------- sorting ----------
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      applyFilters(state);
    },

    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
      applyFilters(state);
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  reorderTodos,
  setSearch,
  setPriorityFilter,
  setStatusFilter,
  setSortBy,
  setSortOrder,
} = todosSlice.actions;

export default todosSlice.reducer;
