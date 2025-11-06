import type { Priority } from "../../features/todos/types";


type BadgeProps = {
  priority: Priority;
};

export function PriorityBadge({ priority }: BadgeProps) {

  const colorMap: Record<Priority, string> = {
    Low: "bg-green-100 text-green-700 border-green-300",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    High: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${colorMap[priority]}`}
    >
      {priority}
    </span>
  );
}
