export type Todo = {
  id: string;
  title: string;
  description: string;
  priority: Priority | "";
  completed: boolean;
  createdAt: string;
};

export type Priority = "High" | "Medium" | "Low";
