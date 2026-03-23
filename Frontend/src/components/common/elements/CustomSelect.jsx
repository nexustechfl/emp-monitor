import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CustomSelect = ({ placeholder, items, onChange, selected, width }) => {
  return (
    <div>
      <Select
        onValueChange={onChange}
        value={
          selected !== undefined && selected !== null
            ? String(selected)
            : undefined
        }
      >
        <SelectTrigger className={`border-slate-200 text-slate-600 text-sm rounded-lg h-10 ${width? `w-full`:"w-44"} focus:ring-0 focus:ring-offset-0`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper" // ✅ anchors dropdown directly below trigger
          className="rounded-xl shadow-md border-slate-100"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            width: "var(--radix-select-trigger-width)",
          }}
        >
          {items?.filter((d) => d.value !== "" && d.value !== null && d.value !== undefined).map((d, i) => (
            <SelectItem
              key={`${d.value}-${i}`}
              value={String(d.value)}
              className="text-sm"
            >
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
