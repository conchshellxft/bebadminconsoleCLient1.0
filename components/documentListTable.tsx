import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
// import { API } from "../constants/Api";
import { useSnackAlert } from "../hooks/useSnackAlert";

const headCells = [
  {
    label: "Id",
    id: "_id",
  },
  {
    label: "Name",
    id: "name",
  },
  {
    label: "No Of Images",
    id: "quantity",
  },
  {
    label: "Images Description",
    id: "description",
  },
  {
    label: "Action",
    id: "action",
  },
];

function EnhancedTableHead(props: any) {
  const { order, setOrder, orderBy, setOrderBy } = props;
  return (
    <TableHead>
      <TableRow
        style={{height:30}}>
        {headCells.map((headCell) => (
          <TableCell
            style={{ backgroundColor: "#EFF5FB" }}
            key={headCell.label}
          >
            <TableSortLabel
              active={orderBy ? orderBy === headCell.id : false}
              direction={order === "ASC" ? "asc" : "desc"}
              onClick={() => {
                setOrder(order === "ASC" ? "DESC" : "ASC");
                setOrderBy(headCell.id);
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function DocumentListTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rows: data,
  countRecords,
  documentToUpdate,
  setDocumentToUpdate,
  setOpen,
  order,
  setOrder,
  orderBy,
  setOrderBy,
}: any) {
  const rows: any[] = data ?? [];
  const showSnackAlert = useSnackAlert();

  // null ?? [
  //   {
  //     id: "document_id",
  //     name: "RHB Bank",
  //     numberOfImages: 5,
  //     imageDescription: "This is the image description",
  //   },
  // ];

  console.log(data);

  for (let i = 1; i <= rowsPerPage - (data?.length ?? 0); i++) {
    rows.push({});
  }
  const router = useRouter();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "white",
    outline: 0,
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

  const deleteDocument = (id: string) => {
    // API.post("delete-document-list", {
    //   id,
    // })
    //   .then((res) =>
    //     showSnackAlert("success", "Document deleted successfully!")
    //   )
    //   .catch((res) => showSnackAlert("error", "Failed deleting document!"));
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer sx={{ maxHeight: 1100 }}>
          <Table aria-labelledby="tableTitle" size={"medium"} stickyHeader>
            <EnhancedTableHead
              {...{ order, setOrder, orderBy, setOrderBy }}
              rowCount={rows?.length}
            />
            <TableBody sx={{ width: "100%" }}>
              {rows?.map((row: any, index: number) => {
                return (
                  <TableRow
                    onClick={(event) => console.log(event, row.trxnId)}
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "white" : "#F8F8F8",
                      height: 30,
                    }}
                  >
                    <TableCell style={{whiteSpace:"nowrap"}}>{row._id}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.name}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.quantity}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.description}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row._id && (
                        <div style={{ display: "flex" }}>
                          <Button
                            style={{ backgroundColor: "red", marginRight: 10 }}
                            onClick={() => deleteDocument(row._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() => {
                              setDocumentToUpdate(row);
                              setOpen(true);
                            }}
                            style={{
                              backgroundColor: "#EFEFEF",
                              color: "black",
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={countRecords ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
