import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { setSortBy, setSortOrder } from "../todosSlice";
import { Dropdown } from "../../../components/ui/ِDropDown";

function SortTodos() {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.todos.sortBy);
  const sortOrder = useSelector((state: RootState) => state.todos.sortOrder);

  return (
    <div className="flex gap-2 items-center text-xs">
      <Dropdown
        value={sortBy || ""}
        onChange={(e) =>
          dispatch(setSortBy(e.target.value as "date" | "priority"))
        }
        options={[
          { label: "No sort", value: "" },
          { label: "Sort by Date", value: "date" },
          { label: "Sort by Priority", value: "priority" },
        ]}
      />

      {sortBy && (
        <button
          onClick={() =>
            dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))
          }
          className="border rounded-lg px-4 py-2"
        >
          {sortOrder === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
        </button>
      )}
    </div>
  );
}

export default SortTodos;
