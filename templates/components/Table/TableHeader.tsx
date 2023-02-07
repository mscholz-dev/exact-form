import React, { FC } from "react";

// interfaces
import { ITableHeader } from "../../../utils/interface";

const TableHeader: FC<ITableHeader> = ({
  header,
}) => {
  return (
    <thead className="table-header">
      <tr className="table-header-row">
        {header.map((title, index) => (
          <th
            key={index}
            className="table-header-column"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
