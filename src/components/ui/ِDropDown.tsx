type DropdownProps = {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  className?: string;
};

export function Dropdown({
  label,
  value,
  onChange,
  options,
  className = "",
}: DropdownProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e)}
        className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.value === ""}
            hidden={opt.value === ""}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
