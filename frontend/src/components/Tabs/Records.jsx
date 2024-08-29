import React from 'react';
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { usePagination } from "@table-library/react-table-library/pagination";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useState } from 'react';
const nodes = [
  {
    id: '0',
    name: 'Operating System',
    deadline: new Date(2020, 2, 15),
    type: 'SETUP',
    isComplete: true,
    nodes: 3,
  },
  {
    id: '1',
    name: 'VSCode',
    deadline: new Date(2020, 2, 17),
    type: 'SETUP',
    isComplete: true,
    nodes: 0,
  },
  {
    id: '2',
    name: 'Python',
    deadline: new Date(2020, 2, 24),
    type: 'SETUP',
    isComplete: true,
    nodes: 0,
  },
  {
    id: '3',
    name: 'JavaScript',
    deadline: new Date(2020, 3, 28),
    type: 'LEARN',
    isComplete: true,
    nodes: 3,
  },
  {
    id: '4',
    name: 'React',
    deadline: new Date(2020, 4, 8),
    type: 'LEARN',
    isComplete: false,
    nodes: 5,
  },
  {
    id: '5',
    name: 'Git',
    deadline: new Date(2020, 5, 28),
    type: 'DATE',
    isComplete: false,
    nodes: 0,
  },
  {
    id: '6',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 1,
  },
  {
    id: '7',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 1,
  },
  
];

const Records = () => {

  const LIMIT = 2;
  const [data, setData] = React.useState({ nodes });
  //const [ids, setIds] = React.useState([]);
  const [editRowId, setEditRowId] = React.useState(null);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [newRow, setNewRow] = useState({
    id: '',
    name: '',
    deadline: '',
    type: '',
    isComplete: '',
    nodes: '',
  })
  const handlenewRow = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = () => {
    setData((prevData) => ({
      nodes: [
        ...prevData.nodes,
        {
          id: prevData.nodes.length.toString(),
          ...newRow,
          deadline: new Date(newRow.deadline),
        },
      ],
    }));
    setNewRow({
      id: '',
      name: '',
      deadline: '',
      type: '',
      isComplete: false,
      nodes: '',
    });
  };




  // const handleClose=(item)=>{
  //   setExpandedRowId(expandedRowId=== item.id ? null  :   item.id);
  //   console.log(expandedRowId)
  // }
  const handleExpand = (item) => {

    setExpandedRowId(expandedRowId === item.id ? null : item.id);
    console.log(expandedRowId)
  };



  const pagination = usePagination(
    data,
    {
      state: {
        page: 0,
        size: 2,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: true,
    }
  );
  function onPaginationChange(action, state) {
    console.log(action, state);
  }
  const handleEditClick = (rowId) => {
    setEditRowId(editRowId === rowId ? null : rowId);
  };

  const handleInputChange = (value, rowId, columnId) => {
    setData((prevState) => ({
      nodes: prevState.nodes.map((row) =>
        row.id === rowId ? { ...row, [columnId]: value } : row
      ),
    }));
  };


  return (
    <>
      <div
        style={{
          height: "400px",
        }}
      >

        <Table data={data} layout={{ fixedHeader: true }} pagination={pagination}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Task</HeaderCell>
                  <HeaderCell>Deadline</HeaderCell>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Complete</HeaderCell>
                  <HeaderCell>Tasks</HeaderCell>

                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <React.Fragment key={item.id}>
                    <Row item={item} onClick={() => handleExpand(item)}
                    >
                      <Cell>
                        {item.name}
                      </Cell>
                      <Cell>

                        {item.deadline.toLocaleDateString("en-US")}
                      </Cell>
                      <Cell>

                        {item.type}
                      </Cell>
                      <Cell>

                        {item.isComplete.toString()}
                      </Cell>
                      <Cell>{item.nodes}</Cell>
                    </Row>
                    {
                      // ids.includes(item.id) && 
                      expandedRowId === item.id && (
                        <tr style={{ display: "flex", gridColumn: "1 / -1" }}>
                          <td style={{ flex: "1" }}>
                            <ul
                              style={{
                                margin: "0",
                                padding: "0",
                                backgroundColor: "#e0e0e0",

                              }}
                            >
                              <li>
                                <strong>Name: </strong>
                                {editRowId === item.id ? (
                                  <input
                                    value={item.name}
                                    name='go'
                                    onChange={(e) =>
                                      handleInputChange(e.target.value, item.id, "name")
                                    }
                                  />
                                ) : (
                                  item.name
                                )}
                              </li>
                              <li>
                                <strong>Deadline: </strong>{" "}
                                {editRowId === item.id ? (
                                  <input
                                    type="date"
                                    name='go'
                                    value={item.deadline.toISOString().substr(0, 10)}
                                    onChange={(e) =>
                                      handleInputChange(
                                        new Date(e.target.value),
                                        item.id,
                                        "deadline"
                                      )
                                    }
                                  />
                                ) : (
                                  item.deadline.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })
                                )}
                                {/* {item.deadline.toLocaleDateString("en-US")} */}
                              </li>
                              <li>
                                <strong>Type: </strong>
                                {editRowId === item.id ? (
                                  <select
                                    value={item.type}
                                    name='go'
                                    onChange={(e) =>
                                      handleInputChange(e.target.value, item.id, "type")
                                    }
                                  >
                                    <option value="SETUP">SETUP</option>
                                    <option value="LEARN">LEARN</option>
                                  </select>
                                ) : (
                                  item.type
                                )}
                              </li>
                              <li>
                                <strong>Complete:</strong>{" "}
                                {editRowId === item.id ? (
                                  <input
                                    type="checkbox"
                                    name='go'
                                    checked={item.isComplete}
                                    onChange={(e) =>
                                      handleInputChange(e.target.checked, item.id, "isComplete")
                                    }
                                  />
                                ) : (
                                  item.isComplete.toString()
                                )}

                              </li>
                              <li>
                                <Cell>
                                  <button onClick={() => handleEditClick(item.id)}>
                                    {editRowId === item.id ? "Save" : "Edit"}
                                  </button>
                                </Cell>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))}
              </Body>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>
                <span>
                  Page: {pagination.state.getPages(data.nodes).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      style={{
                        fontWeight: pagination.state.page === index ? 'bold' : 'normal',
                      }}
                      onClick={() => pagination.fns.onSetPage(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </span>
              </div>
            </>
          )}
        </Table>
      </div>


      {
        data.pageInfo && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Total Pages: {data.pageInfo.totalPages}</span>

            <span>
              Page:{" "}
              {Array(data.pageInfo.totalPages)
                .fill()
                .map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    style={{
                      fontWeight:
                        pagination.state.page === index ? "bold" : "normal",
                    }}
                    onClick={() => pagination.fns.onSetPage(index)}
                  >
                    {index + 1}
                  </button>
                ))}
            </span>
          </div>

        )
      }

      <div>

        <Popup trigger=
          {<button> Add new Row </button>}
          modal nested>
          {
            close => (
              <div className='modal' style={{
                backgroundColor: "black"
              }}>
                <div className='content'>
                  <strong>Name: </strong>
                  <input
                    name="name"
                    value={newRow.name}
                    onChange={handlenewRow}

                  />
                  <strong>Deadline: </strong>
                  <input

                    type="date"
                    name="deadline"
                    value={newRow.deadline}
                    onChange={handlenewRow}


                  />
                  <strong>Type: </strong>
                  <select
                    name="type"
                    value={newRow.type}
                    onChange={handlenewRow}

                  >
                    <option value="SETUP">SETUP</option>
                    <option value="LEARN">LEARN</option>
                  </select>
                  <strong>Complete:</strong>
                  <input
                    type="checkbox"
                    name="isComplete"
                    checked={newRow.isComplete}
                    onChange={handlenewRow}


                  // onChange={(e) =>
                  //   handleInputChange(e.target.checked, item.id, "isComplete")
                  // }
                  />



                </div>
                <div>
                  <button onClick={() => {
                    handleFormSubmit();
                    close();
                  }}>
                    Add Row
                  </button>
                  <button onClick={() => close()}>Close</button>
                </div>
              </div>
            )
          }
        </Popup>
      </div>



    </>

  )
}


export default Records;
