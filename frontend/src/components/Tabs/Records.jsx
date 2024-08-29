import React from 'react';
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell, } from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
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
    nodes: 2,
  }
  ,
  {
    id: '8',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 3,
  },
  {
    id: '9',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 4,
  },
  {
    id: '10',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 5,
  },
  {
    id: '11',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 6,
  },
  {
    id: '12',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 7,
  },
  {
    id: '13',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 8,
  },
  {
    id: '14',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 8,
  },
  {
    id: '15',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 9,
  },
  {
    id: '16',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 10,
  },
  {
    id: '17',
    name: 'Node',
    deadline: new Date(2020, 6, 18),
    type: 'LEARN',
    isComplete: true,
    nodes: 11,
  }

];

const Records = () => {
  const LIMIT = 10;
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

  const handleExpand = (item) => {
    setExpandedRowId(expandedRowId === item.id ? null : item.id);
    console.log(expandedRowId)
  };

  const pagination = usePagination(
    data,
    {
      state: {
        page: 0,
        size: LIMIT,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: false,
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

  const totalPages = Math.ceil(data.nodes.length / LIMIT);
  // const isLastPage = pagination.state.page === totalPages - 1;

  return (
    <>
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
          </>
        )}
      </Table>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" aria-label="Previous" onClick={() => pagination.fns.onSetPage(Math.max(0, pagination.state.page - 1))}>
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>

          {Array.from({ length: pagination.state.getTotalPages(data.nodes) }).map((_, index) => (
            <li class="page-item"
              key={index}
              onClick={() => pagination.fns.onSetPage(index)}
              style={{ fontWeight: pagination.state.page === index ? 'bold' : 'normal' }}
            >
              <a class="page-link">{index + 1}</a>
            </li>
          ))}

          <li class="page-item">
            <a class="page-link" aria-label="Next" onClick={() => pagination.fns.onSetPage(Math.min(totalPages - 1, pagination.state.page + 1))}>
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </>

  )
}


export default Records;
