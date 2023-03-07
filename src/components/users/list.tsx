import { Button } from "@progress/kendo-react-buttons";
import { getter } from "@progress/kendo-react-common";
import {
  getSelectedState,
  Grid,
  GridColumn,
  GridHeaderSelectionChangeEvent,
  GridSelectionChangeEvent,
} from "@progress/kendo-react-grid";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/user";
import useStore from "../../store";

const DATA_ITEM_KEY: string = "id";
const SELECTED_FIELD: string = "selected";
const idGetter = getter(DATA_ITEM_KEY);

const UserList = () => {
  const { userStore } = useStore();
  const { users, onDelete } = userStore;

  const [dataState, setDataState] = useState<User[]>([]);
  const [selectedState, setSelectedState] = useState<{
    [id: string]: boolean | number[];
  }>({});

  const [userIds, setUserIds] = useState<string[]>([]);

  useEffect(() => {
    setDataState(users.map((item) => Object.assign({ selected: false }, item)));
  }, [users]);

  const handleDeleteUser = () => {
    onDelete(userIds);
    setUserIds([]);
  };

  const onSelectionChange = useCallback(
    (event: GridSelectionChangeEvent) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });

      const userSelected = event.dataItem;

      if (userSelected.selected) {
        setUserIds((prevState) =>
          prevState.filter((item) => item !== userSelected.id)
        );
      } else {
        setUserIds((prevState) => [...prevState, userSelected.id]);
      }

      setSelectedState(newSelectedState);
    },
    [selectedState]
  );

  const onHeaderSelectionChange = useCallback(
    (event: GridHeaderSelectionChangeEvent) => {
      const checkboxElement: any = event.syntheticEvent.target;
      const checked = checkboxElement.checked;
      let newSelectedState = {};
      const userIDs: string[] = [];

      event.dataItems.forEach((item: any) => {
        const id = idGetter(item);
        userIDs.push(id);
        newSelectedState = Object.assign(newSelectedState, {
          [id]: checked,
        });
      });
      setSelectedState(newSelectedState);
      setUserIds(userIDs);
    },
    []
  );

  return (
    <div className="w-[90%] lg:px-8 xl:px-0 m-auto p-5">
      <div className="flex justify-end space-x-3">
        <Link to="/user/new">
          <Button className="buttons-container-button" icon="plus">
            New
          </Button>
        </Link>
        <Link
          to={`user/${userIds[0]}`}
          className={userIds.length !== 1 ? "pointer-events-none" : ""}
        >
          <Button
            className="buttons-container-button"
            icon="edit"
            disabled={userIds.length !== 1}
          >
            Edit
          </Button>
        </Link>
        <Button
          className="buttons-container-button"
          icon="delete"
          onClick={handleDeleteUser}
          disabled={userIds.length === 0}
        >
          Delete
        </Button>
      </div>
      <div className="mt-5">
        <Grid
          style={{ height: "400px" }}
          data={dataState.map((item) => ({
            ...item,
            [SELECTED_FIELD]: selectedState[idGetter(item)],
          }))}
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          selectable={{
            enabled: true,
            drag: false,
            cell: false,
            mode: "multiple",
          }}
          onSelectionChange={onSelectionChange}
          onHeaderSelectionChange={onHeaderSelectionChange}
        >
          <GridColumn
            field={SELECTED_FIELD}
            width="70px"
            headerSelectionValue={
              dataState.findIndex((item) => !selectedState[idGetter(item)]) ===
              -1
            }
          />
          <GridColumn field="fullName" title="Full name" width="200px" />
          <GridColumn field="birthday" title="Birthday" width="200px" />
          <GridColumn field="gender" title="Gender" width="200px" />
          <GridColumn field="email" title="Email" width="200px" />
          <GridColumn field="phoneNumber" title="Phone number" width="200px" />
          <GridColumn field="address" title="Address" width="200px" />
        </Grid>
      </div>
    </div>
  );
};

export default UserList;
