import "./App.css";
// import "antd/dist/antd.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [editInputs, seteditInputs] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Salih",
      email: "salih@gmail.com",
      address: "Sowutuom HS# 555",
    },
    {
      id: 2,
      name: "Maryam",
      email: "maryam@gmail.com",
      address: "Sowutuom HS# 5455",
    },
    {
      id: 3,
      name: "Terry",
      email: "terry@gmail.com",
      address: "Sowutuom HS# 5665",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },

    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => onEditStudent(record)}
              style={{ color: "green" }}
            />
            <DeleteOutlined
              onClick={() => onDeleteStudent(record)}
              style={{ color: "red", marginLeft: 15 }}
            />
          </>
        );
      },
    },
    // {
    //   key: "4",
    //   title: "Actions",
    //   render: (record) => {
    //     return (
    //       <>
    //         <EditOutlined
    //           onClick={() => onEditStudent(record)}
    //           style={{ color: "green" }}
    //         />
    //         <DeleteOutlined
    //           onClick={() => onDeleteStudent(record)}
    //           style={{ color: "red", marginLeft: 12 }}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  const onAddStudent = () => {
    const randomNum = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNum,
      name: "Name " + randomNum,
      email: randomNum + "@gmail.com",
      address: "Address" + randomNum,
    };

    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const handleChange = (e) => {
    const [name, value] = e.target;
    seteditInputs({ [name]: value });
  };
  const onEditStudent = (record) => {
    setIsEdited(true);
    console.log(record);
    seteditInputs({ ...record });
  };

  const resetEditing = () => {
    setIsEdited(false);
    seteditInputs(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={dataSource}></Table>
        <Button onClick={onAddStudent}>Add a new Student</Button>
        <Modal
          title="Edit Student"
          visible={isEdited}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editInputs.id) return editInputs;
                return student;
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editInputs?.name}
            onChange={(e) =>
              seteditInputs((pre) => {
                return { ...pre, name: e.target.value };
              })
            }
          />
          <Input
            value={editInputs?.email}
            onChange={(e) =>
              seteditInputs((pre) => {
                return { ...pre, name: e.target.value };
              })
            }
          />
          <Input
            value={editInputs?.address}
            onChange={(e) =>
              seteditInputs((pre) => {
                return { ...pre, name: e.target.value };
              })
            }
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
