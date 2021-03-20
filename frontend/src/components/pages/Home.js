import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import API from "../HttpService";

import EmpAdd from "../employee/EmpAdd";
import EmpEdit from "../employee/EmpEdit";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { toast } from "react-toastify";

toast.configure();

function Home() {
  const [employee, setemployee] = useState([]);

  const [addModal, setAddModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  const [editEmployee, seteditEmployee] = useState({});

  useEffect(() => {
    loadEmployees();
  }, []);

  const columns = [
    {
      selector: "id",
      name: "Employee ID",
    },
    {
      selector: "firstname",
      name: "First Name",
      sortable: true,
    },
    {
      selector: "lastname",
      name: "Last Name",
      sortable: true,
    },
    {
      selector: "email",
      name: "Email",
    },
    {
      selector: "city",
      name: "City",
    },
    {
      selector: "company",
      name: "Company",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <ButtonGroup size="sm" className="postion:block">
            <Button
              variant="primary"
              className="mx-2 my-2"
              onClick={() => {
                seteditEmployee(row);
                setEditModal(true);
              }}
            >
              edit
            </Button>
            <Button
              variant="danger"
              className="mx-2 my-2"
              onClick={() => delEmployee(row.id)}
            >
              del
            </Button>
          </ButtonGroup>
        </div>
      ),
    },
  ];

  //Loading intial employess
  const loadEmployees = () => {
    API.get("employee")
      .then((res) => {
        setemployee(res.data.reverse());
      })
      .catch(({ request }) => {
        console.log(request);
      });
  };

  //Deleting Employee API
  const delEmployee = (id) => {
    API.delete(`employee/${id}`)
      .then((res) => {
        toast.info(`Deleted Employee ${id}`);
        loadEmployees();
      })
      .catch(({ request }) => {
        console.log(request);
        toast.error("SOme Error");
      });
  };

  return (
    <div className="container">
      <p className="h3">
        Employee Table{" "}
        <span className="float-right">
          <Button
            variant="success"
            className="mx-2"
            onClick={() => setAddModal(true)}
          >
            Add
          </Button>
        </span>
      </p>
      <EmpAdd
        show={addModal}
        onHide={() => setAddModal(false)}
        loadEmployees={loadEmployees}
      />
      <EmpEdit
        show={editModal}
        onHide={() => setEditModal(false)}
        employee={editEmployee}
        loadEmployees={loadEmployees}
      />

      <DataTable pagination columns={columns} data={employee} />
    </div>
  );
}

export default Home;
