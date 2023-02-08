import React, {
  FC,
  useEffect,
  useState,
} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import FormClass from "../../../utils/Form";
import Paging from "../Paging";
import Wrapper from "../../layouts/Wrapper";

// interfaces
import { ITable } from "../../../utils/interface";

// classes
const Form = new FormClass();

const Table: FC<ITable> = ({ data, title }) => {
  const [header, setHeader] = useState<string[]>(
    [],
  );
  const [body, setBody] = useState<object[]>([]);
  const [selectAll, setSelectAll] =
    useState(false);

  // type for enable new unknown object
  const [selected, setSelected] = useState<
    Record<string, boolean>
  >({
    selectAll: false,
  });

  // paging
  const [currentPage, setCurrentPage] =
    useState<number>(1);
  const [maxPage, setMaxPage] =
    useState<number>(10);

  useEffect(() => {
    // create table header with unique keys
    for (const item of data) {
      for (const key of Object.keys(item))
        if (!header.includes(key))
          header.push(key);
    }

    // create body with empty data
    for (const item of data) {
      const bodyItem = [];

      for (const title of header)
        item[title as keyof object] !== undefined
          ? bodyItem.push(
              item[title as keyof object],
            )
          : bodyItem.push("");

      body.push(bodyItem);

      // add selectable checkbox
      selected[
        `selectRow${
          Object.keys(selected).length - 1
        }`
      ] = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle select and unselect all
  useEffect(() => {
    const newSelected: Record<string, boolean> =
      {};

    for (const item of Object.keys(selected))
      newSelected[item] = selectAll;

    setSelected(newSelected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAll]);

  return (
    <Wrapper className="wrapper-table-container">
      <h1 className="table-title">{title}</h1>

      <table className="table">
        <TableHeader
          header={header}
          handleBooleanChange={() =>
            Form.handleBooleanChange(
              setSelectAll,
              selectAll,
            )
          }
          selectAll={selectAll}
        />
        <TableBody
          body={body}
          selected={selected}
          setSelected={setSelected}
        />
      </table>

      <Paging
        current={currentPage}
        setCurrent={setCurrentPage}
        max={maxPage}
      />
    </Wrapper>
  );
};

export default Table;
