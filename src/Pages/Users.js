import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import StatusDialog from "../components/StatusDialog";
import RoleDialog from "../components/RoleDialog";
import DeleteDialog from "../components/DeleteDialog";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users-slice";

const actionHandler = ({ data, handleRoleOpen, handleDeleteOpen }) => {
  // const viewUserHandler = () => {
  //   console.log("viewUserHandler is runing on", data?.firstName);
  // };
  const changeRoleHandler = () => {
    console.log("changeRoleHandler is runing on", data?.firstName);
    handleRoleOpen(data);
  };

  const deleteUserHandler = () => {
    console.log("deleteUserHandler is runing on", data?.firstName);
    handleDeleteOpen(data);
  };

  return (
    <>
      {/* <Button
        variant="contained"
        size="small"
        sx={{ marginRight: "10px" }}
        onClick={viewUserHandler}
      >
        View
      </Button> */}
      <Button
        variant="contained"
        color="warning"
        size="small"
        sx={{ marginRight: "10px" }}
        onClick={changeRoleHandler}
      >
        Change Role
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={deleteUserHandler}
      >
        Delete
      </Button>
    </>
  );
};

const statusHandler = ({ data, handleStatusOpen }) => {
  const changeStatusHandler = () => {
    console.log("changeStatusHandler runing on", data?.active);
    handleStatusOpen(data);
  };

  return (
    <>
      <Button
        variant="contained"
        color={`${data?.active ? "success" : "error"}`}
        size="small"
        onClick={changeStatusHandler}
      >
        {data?.active ? "Active" : "In active"}
      </Button>
    </>
  );
};

const idHandler = (e) => {
  return<>{e?.node?.rowIndex + 1}</>
};

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusData, setStatusData] = useState({});
  const [roleOpen, setRoleOpen] = useState(false);
  const [roleData, setRoleData] = useState({});
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const handleStatusOpen = (data) => {
    setStatusData(data);
    setStatusOpen(true);
  };

  const handleStatusClose = () => {
    setStatusOpen(false);
  };

  const handleRoleOpen = (data) => {
    setRoleData(data);
    setRoleOpen(true);
  };

  const handleRoleClose = () => {
    setRoleOpen(false);
  };

  const handleDeleteOpen = (data) => {
    setDeleteData(data);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [columnDefs] = useState([
    {
      field: "Id",
      minWidth: 50,
      width: 60,
      maxWidth: 70,
      cellRenderer: idHandler,
    },
    { field: "firstName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "lastName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "email", minWidth: 170, width: 180, maxWidth: 230 },
    { field: "phoneNumber", minWidth: 120, width: 130, maxWidth: 150 },
    { field: "role", minWidth: 50, width: 60, maxWidth: 100 },
    {
      field: "status",
      sortable: false,
      filter: false,
      minWidth: 70,
      width: 80,
      maxWidth: 120,
      cellRenderer: statusHandler,
      cellRendererParams: {
        handleStatusOpen,
      },
    },
    {
      field: "Actions",
      sortable: false,
      filter: false,
      minWidth: 200,
      maxWidth: 350,
      cellRenderer: actionHandler,
      cellRendererParams: {
        handleRoleOpen,
        handleDeleteOpen,
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
    }),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        className="ag-theme-alpine"
        style={{
          margin: " 0 auto",
          boxSizing: "border-box",
          height: "80vh",
          width: "85vw",
        }}
      >
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>
      <StatusDialog
        open={statusOpen}
        handleStatusClose={handleStatusClose}
        data={statusData}
      />
      <RoleDialog
        open={roleOpen}
        handleRoleClose={handleRoleClose}
        data={roleData}
      />
      <DeleteDialog
        open={deleteOpen}
        handleDeleteClose={handleDeleteClose}
        data={deleteData}
      />
    </div>
  );
};

export default Users;
