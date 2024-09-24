import React ,{useEffect, useState}from 'react'
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell, } from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
import {uid} from "./uid"
import { nodes } from './asset'
import 'reactjs-popup/dist/index.css';
import "../Styles/Records.css"
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import {
    useSort,
    HeaderCellSort,
    SortIconPositions,
    SortToggleType,
  } from "@table-library/react-table-library/sort";

const Staff = () => {
    const LIMIT = 10;
    const [db, setDb] = useState(null);
    const [data, setData] = React.useState({ nodes });
    const [editRowId, setEditRowId] = React.useState(null);
  
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [search, setSearch] = React.useState("");
    const [dataChanged, setDataChanged] = useState(true);
    const [newRow, setNewRow] = useState({
        id: uid(),
        name: '',
        deadline: '',
        type: '',
        isComplete: '',
        nodes: '',
      })

      useEffect(()=>{
        const DBOpenReq = indexedDB.open('RecordsDB', 14);
        DBOpenReq.onerror = (err) => {
          console.warn('Error opening DB:', err);
        }
        DBOpenReq.onsuccess = (ev) => {
          const database = ev.target.result;
          setDb(database);
          console.log('DB opened successfully:', database);
        
            buildList();
        }
        DBOpenReq.onupgradeneeded = (ev) => {
          const db = ev.target.result;
         
    
          if (!db.objectStoreNames.contains('RecordStore')) {
            db.createObjectStore('RecordStore', { keyPath: 'id' }
    
            );
            console.log("RecordStore object store created.");
          }
        };
    
    
      },[])
    
      useEffect(() => {
        if (dataChanged && db) { 
          buildList();
          setDataChanged(false); 
        }
    
      }, [dataChanged, db]);
      
      const theme = useTheme({
        HeaderRow: `
            background-color: #eaf5fd;
          `,
        Row: `
            &:nth-of-type(odd) {
              background-color: #d2e9fb;
            }
    
            &:nth-of-type(even) {
              background-color: #eaf5fd;
            }
          `,
      });
    
    
    
      const buildList = () => {
        if (!db) return;
        const tx = db.transaction('RecordStore', 'readwrite');
        const store = tx.objectStore('RecordStore');
        const getReq = store.getAll();
        getReq.onsuccess = (ev) => {
          console.log("new transition is created")
          const nodes = ev.target.result.map((course) => ({
            ...course,
            // Ensure that the deadline is a Date object
            deadline: new Date(course.deadline),
          }));
          setData({ nodes });
         
        };
    
        getReq.onerror = (err) => {
          console.warn(err);
        };
      };
    
      const handlenewRow = (e) => {
        const { name, value, type, checked } = e.target;
        // setNewRow((prev) => ({
        //   ...prev,
        //   [name]: type === 'checkbox' ? checked : value,
        // }));
        setNewRow((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
          }));
        };
    
      const handleFormSubmit = () => {
        if(!db){
          console.log("Database is not initialized")
          return
        }
        const newId = uid();
        const newCourse = {
          id: newId,
          ...newRow,
          deadline: new Date(newRow.deadline),
          
        }
        
        // // Close the modal
        $('#exampleModalCenter').modal('hide');
        const tx = db.transaction('RecordStore', 'readwrite');
        const store = tx.objectStore('RecordStore');

        const request = store.add(newCourse);
           request.onerror = (err) => {
          console.log("Error Occured", err)
        
        }
        request.onsuccess = (eq) => {
          console.log("The Following code is succesfully running", eq)
          setDataChanged(true)
        }
      };
    
     
     
    
      const handleExpand = (courses) => {
    
        setExpandedRowId(expandedRowId === courses.id ? null : courses.id);
        console.log(expandedRowId)
      };
      const handleDeleteRow = (rowId) => {
    
        const updatedNodes = data.nodes.filter((node) => node.id !== rowId);
        setData({ nodes: updatedNodes });
    
        const tx = db.transaction('RecordStore', 'readwrite');
        const store = tx.objectStore('RecordStore');
        const deleteRequest = store.delete(rowId);

        deleteRequest.onsuccess = () => {
          console.log(`Row with ID ${rowId} deleted successfully from IndexedDB`);
          buildList();
          setDataChanged(true)
        }
    
          deleteRequest.onerror = (err) => {
            console.error('Error deleting row from IndexedDB:', err);
          }
          tx.oncomplete = () => {
            console.log('Transaction completed');
          };
    
    
        }
    
      
     
    
    
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
  
      if (editRowId === rowId) {
       
        const updatedRow = data.nodes.find((row) => row.id === rowId);
        if (db) {
          const tx = db.transaction('RecordStore', 'readwrite');
          const store = tx.objectStore('RecordStore');
    
          
          const request = store.put(updatedRow);
    
          request.onsuccess = () => {
            console.log(`Row with ID ${rowId} updated successfully in IndexedDB`);
            buildList();
            setDataChanged()
          };
    
          request.onerror = (err) => {
            console.error('Error updating row in IndexedDB:', err);
          };
    
          tx.oncomplete = () => {
            console.log('Transaction completed');
          };
        } else {
          console.error('Database is not initialized');
        }
      }
    
      
      setEditRowId(editRowId === rowId ? null : rowId);
    };
  
    const handleInputChange = (value, rowId, columnId) => {
      setData((prevState) => ({
        nodes: prevState.nodes.map((row) =>
          row.id === rowId ? { ...row, [columnId]: value } : row
        ),
      }));
    };
  
  
    const sort = useSort(
      data,
      
      {
        state: {
          sortKey: "TASK",
          reverse: false, 
        },
        onChange: onSortChange,
        
      },
      {
        sortFns: {
          TASK: (array) => Array.isArray(array) ? array.sort((a, b) => a.name.localeCompare(b.name)) : [],
          DEADLINE: (array) => Array.isArray(array) ? array.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) : [],
          TYPE: (array) => Array.isArray(array) ? array.sort((a, b) => a.type.localeCompare(b.type)) : [],
          COMPLETE: (array) => Array.isArray(array) ? array.sort((a, b) => a.isComplete - b.isComplete) : [],
          TASKS: (array) =>
            Array.isArray(array) ? array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length) : [],
        },
      }
    );
  
  
    function onSortChange(action, state) {
      console.log(action, state);
    }
     //searching
     
    const totalPages = Math.ceil(data.nodes.length / LIMIT);
    // const isLastPage = pagination.state.page === totalPages - 1;

  return (
    <>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header justify-content-between">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" name="name" value={newRow.name} onChange={handlenewRow} className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Deadline:</label>
                  <input type="date" name="deadline" value={newRow.deadline} onChange={handlenewRow} className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Type:</label>
                  <select name="type" value={newRow.type} onChange={handlenewRow} className="form-control" required>
                    <option value="SETUP">SETUP</option>
                    <option value="LEARN">LEARN</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Complete:</label>
                  <input type="checkbox" name="isComplete" checked={newRow.isComplete} onChange={handlenewRow} />
                </div>
                <div className="form-group">
                  <label>Tasks:</label>
                  <input type="number" name="nodes" value={newRow.nodes} onChange={handlenewRow} className="form-control" required />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" onClick={()=> {handleFormSubmit();
                  
                  }} class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
            </div>
          </div>
        </div>
      </div>


      {/* Navbar section */}
      <nav >
        <div >
          <button >Admin</button>
          <button>Bot</button>
          <button >Operators</button>
        </div>
        
       
      <div>

         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          Add Row
        </button>

      </div>
       
      </nav>
      {/* table  section */}
      <div >
      
        <Table layout={{ fixedHeader: true }} pagination={pagination}  sort={sort}  data={{ nodes }}   theme={theme}>
          {(tableList) => (
            <>
              <Header >
               
                    {/* <HeaderCellSort sortKey="TASK">Task  </HeaderCellSort>
                    <HeaderCellSort sortKey="DEADLINE">Deadline </HeaderCellSort>
                    <HeaderCellSort sortKey="TYPE">Type </HeaderCellSort>
                    <HeaderCellSort sortKey="COMPLETE">Complete</HeaderCellSort>
                    <HeaderCellSort sortKey="TASKS">Tasks </HeaderCellSort> */}
                
                <HeaderRow   className="headercell">
                    <HeaderCellSort  sortKey="TASK">Task</HeaderCellSort>
                    <HeaderCellSort  sortKey="DEADLINE">Deadline</HeaderCellSort>
                    <HeaderCellSort  sortKey="TYPE">Type</HeaderCellSort>
                    <HeaderCellSort  sortKey="COMPLETE">Complete</HeaderCellSort>
                    <HeaderCellSort  sortKey="TASKS">Tasks</HeaderCellSort>
                  </HeaderRow>

                
              </Header>

              <Body>
                {tableList.map((courses) => (
                  <React.Fragment key={courses.id}>
                    <Row item={courses} onClick={() => handleExpand(courses) }key={courses.id} >
                      <Cell>
                        {courses.name}
                      </Cell>
                      <Cell>

                        {courses.deadline.toLocaleDateString("en-US")}
                      </Cell>
                      <Cell>

                        {courses.type}
                      </Cell>
                      <Cell>

                        {courses.isComplete.toString()}
                      </Cell>
                      <Cell>{courses.nodes}</Cell>

                    </Row>
                    {

                      expandedRowId === courses.id && (
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
                                {editRowId === courses.id ? (
                                  <input
                                    value={courses.name}
                                    name='go'
                                    onChange={(e) =>
                                      handleInputChange(e.target.value, courses.id, "name")
                                    }
                                  />
                                ) : (
                                  courses.name
                                )}
                              </li>
                              <li>
                                <strong>Deadline: </strong>{" "}
                                {editRowId === courses.id ? (
                                  <input
                                    type="date"
                                    name='go'
                                    value={courses.deadline.toISOString().substr(0, 10)}
                                    onChange={(e) =>
                                      handleInputChange(
                                        new Date(e.target.value),
                                        courses.id,
                                        "deadline"
                                      )
                                    }
                                  />
                                ) : (
                                  courses.deadline.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })
                                )}

                              </li>
                              <li>
                                <strong>Type: </strong>
                                {editRowId === courses.id ? (
                                  <select
                                    value={courses.type}
                                    name='go'
                                    onChange={(e) =>
                                      handleInputChange(e.target.value, courses.id, "type")
                                    }
                                  >
                                    <option value="SETUP">SETUP</option>
                                    <option value="LEARN">LEARN</option>
                                  </select>
                                ) : (
                                  courses.type
                                )}
                              </li>
                              <li>
                                <strong>Complete:</strong>{" "}
                                {editRowId === courses.id ? (
                                  <input
                                    type="checkbox"
                                    name='go'
                                    checked={courses.isComplete}
                                    onChange={(e) =>
                                      handleInputChange(e.target.checked, courses.id, "isComplete")
                                    }
                                  />
                                ) : (
                                  courses.isComplete.toString()
                                )}

                              </li>
                              <li>
                                <Cell>
                                  <button onClick={() => handleEditClick(courses.id)}>
                                    {editRowId === courses.id ? "Save" : "Edit"}
                                  </button>
                                </Cell>
                              </li>

                              <li>
                                <Cell>
                                  <button onClick={() => handleDeleteRow(courses.id)}>Delete</button>
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
      


     
      </div>
    </>




   
  )
}

export default Staff