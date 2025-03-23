import React from "react";

const TableLayout = ({ columns, data }) => {
  const hasSubColumns = columns.some((column) => column.columns);

  const renderHeader = (columns) => {
    return columns.map((column, index) => (
      <th
        key={index}
        colSpan={column.columns ? column.columns.length : 1}
        className={`px-4 py-5 text-center bg-primary font-medium text-white`}>
        {column.Header}
      </th>
    ));
  };

  const renderSubHeader = (columns) => {
    return columns.map((column, index) => (
      <th
        key={index}
        className={`px-4 py-5 text-center bg-slate-200 font-medium`}>
        {column.Header}
      </th>
    ));
  };

  const renderRows = (columns, row) => {
    return columns.map((column, index) => {
      if (column.columns) {
        return column.columns.map((subColumn, subIndex) => (
          <td key={`${index}-${subIndex}`} className="px-4 py-2 text-center">
            {subColumn.render ? subColumn.render(row) : row[subColumn.rowKey]}
          </td>
        ));
      }
      return (
        <td key={index} className="px-4 py-2 text-center">
          {column.render ? column.render(row) : row[column.rowKey]}
        </td>
      );
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-tableShadow overflow-hidden">
      <table className="min-w-full whitespace-nowrap border-spacing-y-4">
        <thead>
          <tr>{renderHeader(columns)}</tr>
          {hasSubColumns && (
            <tr>
              {columns.map((column, index) =>
                column.columns ? (
                  renderSubHeader(column.columns)
                ) : (
                  <th key={index} className="bg-slate-200"></th>
                )
              )}
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              {renderRows(columns, row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLayout;
