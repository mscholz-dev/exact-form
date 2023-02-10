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
import IconLoader from "../../../public/icons/loader.svg";

// interfaces
import { ITable } from "../../../utils/interfaces";

// types
import { TTableBox } from "../../../utils/types";
import NoDataFound from "../NoDataFound";

// classes
const Form = new FormClass();

const Table: FC<ITable> = ({
  items,
  title,
  countAll,
  currentPage,
  setCurrentPage,
  maxPage,
  noDataFoundTitle,
  loading,
}) => {
  const [header, setHeader] = useState<TTableBox>(
    [],
  );
  const [body, setBody] = useState<TTableBox[]>(
    [],
  );
  const [selectAll, setSelectAll] =
    useState(false);

  // type for enable new unknown object
  const [selected, setSelected] = useState<
    Record<string, boolean>
  >({
    selectAll: false,
  });

  useEffect(() => {
    if (!items.length) return;

    // delete created_at header
    const newHeader: TTableBox = [];

    // create table header with unique keys
    for (const object of items) {
      for (const item in object.data) {
        if (
          !newHeader.some(
            ({ value }) => value === item,
          )
        )
          newHeader.push({
            id: newHeader.length,
            value: item,
          });
      }
    }

    // add created_at column
    newHeader.push({
      id: newHeader.length,
      value: "created_at",
    });

    // create body with empty data
    for (const object of items) {
      const bodyItem = [];

      for (const { value } of newHeader) {
        if (value !== "created_at") {
          object.data[value as keyof object]
            ? bodyItem.push({
                id: bodyItem.length,
                value:
                  object.data[
                    value as keyof object
                  ],
              })
            : bodyItem.push({
                id: bodyItem.length,
                value: "",
              });
        }
      }

      // TODO: formater la date, ajouter l'offset de la timezone
      // add created_at column
      bodyItem.push({
        id: bodyItem.length,
        value: object.created_at.toString(),
      });

      body.push(bodyItem);

      // add selectable checkbox
      selected[
        `selectRow${
          Object.keys(selected).length - 1
        }`
      ] = false;
    }

    // trigger header and body render
    setHeader(newHeader);
    setBody([...body]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
      <h1 className="table-title">
        <span className="table-title-label">
          {title}
        </span>
        <span className="table-title-number">
          {countAll === null
            ? ""
            : `(${countAll})`}
        </span>
      </h1>

      {loading && (
        <span className="table-loader">
          <IconLoader />
        </span>
      )}

      {!loading &&
        countAll !== null &&
        items.length === 0 && (
          <NoDataFound title={noDataFoundTitle} />
        )}

      {!loading &&
        countAll !== null &&
        items.length !== 0 && (
          <>
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
          </>
        )}
    </Wrapper>
  );
};

export default Table;
