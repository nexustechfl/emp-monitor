import React from "react";
import CustomTab from "@/components/common/elements/CustomTab";
import CustomSelect from "@/components/common/elements/CustomSelect";

const PerformanceFilter = ({
  tabValue,
  typeValue,
  onTabChange,
  onTypeChange,
  typePlaceholder = "Productive",
}) => {
  const productivityOptions = [
    { value: "pro", label: "Productive" },
    { value: "non", label: "Non Productive" },
    { value: "neu", label: "Idle" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <CustomTab onChange={onTabChange} value={tabValue} />
      <div className="flex items-center gap-2">
        <CustomSelect
          placeholder={typePlaceholder}
          items={productivityOptions}
          onChange={onTypeChange}
          selected={typeValue}
        />
      </div>
    </div>
  );
};

export default React.memo(PerformanceFilter);
