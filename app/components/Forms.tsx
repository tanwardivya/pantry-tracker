"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Pagination from "@mui/material/Pagination";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  startAt,
  orderBy,
  QuerySnapshot,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface FormData {
  id: number;
  item: string;
  date: string | null;
}
interface FormValues {
  item: string;
  date: Dayjs | null;
}

const validationSchema = Yup.object({
  item: Yup.string().required("Food Item is required"),
  date: Yup.mixed<Dayjs>().nullable().required("Expiration Date is required"),
});

const Forms: React.FC = () => {
  const [fullData, setFullData] = React.useState<FormData[]>([]);
  const [filteredData, setFilteredData] = React.useState<FormData[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page: number) => {
    try {
      const q = query(collection(db, "pantry"), orderBy("date"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items: FormData[] = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: Number(doc.data().id),
            item: doc.data().item,
            date: doc.data().date,
          });
        });
        setFullData(items); // Reset the fullData state
        applyPagination(items, page);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const applyPagination = (data: FormData[], page: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);
    setFilteredData(paginatedData);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  };

  const calculateDaysToExpire = (expirationDate: string | null) => {
    if (!expirationDate) return "";
    const today = dayjs();
    const expDate = dayjs(expirationDate);
    return expDate.diff(today, "day");
  };

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    formikHelpers.setTouched({ item: true, date: true });
    if (!values.item || !values.date) {
      formikHelpers.setSubmitting(false);
      return;
    }
    // Extract the values
    const formData: FormData = {
      id: Date.now(), // Using timestamp as a unique ID for simplicity
      item: values.item,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };

    const responseValues: FormData[] = [
      {
        id: formData.id,
        item: formData.item,
        date: formData.date ? formData.date : null,
      },
    ];

    await setDoc(doc(db, "pantry", String(formData.id)), {
      id: formData.id,
      item: formData.item,
      date: formData.date,
    });
    const updatedFullData = [...fullData, ...responseValues];
    setFullData(updatedFullData);
    applyPagination(updatedFullData, page);

    formikHelpers.resetForm();
    formikHelpers.setSubmitting(false);
  };
  const handleDelete = async (id: number) => {
    await deleteDoc(doc(db, "pantry", String(id)));
    const updatedData = fullData.filter((item) => item.id !== id);
    setFullData(updatedData);
    applyPagination(updatedData, page);
  };

  const handleSearch = (queryTerm: string) => {
    setSearchQuery(queryTerm);
    if (queryTerm.trim() === "") {
      applyPagination(fullData, 1);
      setPage(1);
    } else {
      // Filter fullData based on the query
      const pantryRef = collection(db, "pantry");
      const q = query(pantryRef, where("item", "==", queryTerm));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items: FormData[] = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: Number(doc.data().id),
            item: doc.data().item,
            date: doc.data().date,
          });
        });
        setFilteredData(items);
        setTotalPages(Math.ceil(items.length / itemsPerPage));
        setPage(1);
      });
      return () => unsubscribe();
    }
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Formik
        initialValues={{ item: "", date: null }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Field
                  name="item"
                  as={TextField}
                  label="Food Item"
                  variant="outlined"
                  error={touched.item && Boolean(errors.item)}
                  helperText={touched.item && errors.item}
                  sx={{ marginRight: 1 }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Expiration Date"
                    value={values.date}
                    onChange={(newValue) => setFieldValue("date", newValue)}
                    slots={{
                      textField: (textFieldProps) => (
                        <TextField
                          {...textFieldProps}
                          name="date"
                          error={touched.date && Boolean(errors.date)}
                          helperText={touched.date && errors.date}
                        />
                      ),
                    }}
                  />
                </LocalizationProvider>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ m: 2.5 }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      {filteredData.length >= 0 && (
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ mb: 2, width: "20%" }}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Expiration Date</TableCell>
                  <TableCell>Days to Expire</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.item}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{calculateDaysToExpire(row.date)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(row.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 2 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Forms;
