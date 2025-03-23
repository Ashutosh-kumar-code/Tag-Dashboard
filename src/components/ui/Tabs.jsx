import React from "react";
import cn from "../../utils/cn";

function Tab({ label, isActive, onClick, className, ...props }) {
  return (
    <button
      role="tab"
      className={cn(
        `px-12 py-2.5 text-sm font-bold focus:outline-none  ${
          isActive
            ? "text-white bg-gray-500 rounded-[7px]"
            : "text-white hover:text-white"
        }`,
        className
      )}
      onClick={onClick}
      {...props}>
      {label}
    </button>
  );
}

function Tabs({
  children,
  value,
  onChange,
  className,
  tabClassName,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex justify-between p-2 bg-primary rounded-[10px] overflow-x-auto overflow-y-hidden no-scrollbar w-fit",
        className
      )}
      {...props}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === value,
          onClick: () => onChange(index),
          className: tabClassName,
        });
      })}
    </div>
  );
}

export { Tabs, Tab };
