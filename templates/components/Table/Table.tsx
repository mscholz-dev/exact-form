import React, {
  FC,
  useEffect,
  useState,
} from "react";
import TableHeader from "./TableHeader";

// interfaces
import { ITable } from "../../../utils/interface";

const Table: FC<ITable> = ({ data }) => {
  const [header, setHeader] = useState<string[]>(
    [],
  );

  useEffect(() => {
    // create table header with unique keys
    for (const item of data) {
      for (const key of Object.keys(item)) {
        if (!header.includes(key))
          header.push(key);
      }
    }

    console.log(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table className="table">
      <TableHeader header={header} />
    </table>
  );
};

export default Table;
