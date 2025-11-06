import { useDispatch, useSelector } from "react-redux";
import {
  setPriorityFilter,
  setSearch,
  setStatusFilter,
  type Status,
} from "../todosSlice";
import { Input } from "../../../components/ui/Input";
import { Dropdown } from "../../../components/ui/ِDropDown";
import type { RootState } from "../../../app/store";
import type { Priority } from "../types";

const FilterTodos = () => {
  const dispatch = useDispatch();
  const { search, priority, status } = useSelector(
    (state: RootState) => state.todos.filters
  );

  return (
    <div className=" w-full max-w-lg flex flex-col gap-1">
      <h2 className="border-b text-sm font-semibold">Filter Section</h2>
      <div className="flex gap-2 p-2 border rounded ">
        <Input
          value={search}
          type="text"
          placeholder="search todos ..."
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <Dropdown
          value={priority}
          onChange={(e) =>
            dispatch(setPriorityFilter(e.target.value as Priority))
          }
          options={[
            { label: "All priorities", value: "All" },
            { label: "Low", value: "Low" },
            { label: "Medium", value: "Medium" },
            { label: "High", value: "High" },
          ]}
        />

        <Dropdown
          value={status}
          onChange={(e) => dispatch(setStatusFilter(e.target.value as Status))}
          options={[
            { label: "All", value: "All" },
            { label: "Completed", value: "Completed" },
            { label: "Incomplete", value: "Incomplete" },
          ]}
        />
      </div>
    </div>
  );
};

export default FilterTodos;
