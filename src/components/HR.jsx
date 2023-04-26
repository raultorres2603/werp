import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function HR() {
  const { hrUsers, depts } = useContext(appContext);
  const { setRequest, socketResponse } = useContext(socketContext);
  const [fields, setFields] = useState([]);

  function handleChange(ev) {
    hrUsers[ev.target.dataset.userpos][ev.target.id] = ev.target.value;
    console.log(hrUsers);
  }

  function sendChanges() {
    setRequest({
      req: "updateInfoHR",
      fields: {
        users: hrUsers,
      },
    });
  }

  return (
    <>
      <div className="hrContainer mt-3">
        <div className="row">
          <div className="card">
            <h5 className="card-header fs-2 bg-info text-center">My HR</h5>
            <div className="card-body">
              <div className="row">
                {socketResponse && socketResponse.error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {socketResponse.error}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                {socketResponse && socketResponse.result && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    {socketResponse.result}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="table-responsive">
                  <table
                    className="table table-striped table-hover"
                    id="userTable"
                  >
                    <thead className="table-info">
                      <tr>
                        <th scope="col">NIF</th>
                        <th scope="col">Name</th>
                        <th scope="col">F. Surname</th>
                        <th scope="col">S. Surname</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Type</th>
                        <th scope="col">Department</th>
                      </tr>
                    </thead>
                    <tbody id="userBodyTable">
                      {hrUsers.map((v, i) => (
                        <tr key={i}>
                          <td>
                            <input
                              data-userpos={i}
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="nif"
                              data-inpupd={"nif" + i}
                              data-iduser={v.uid}
                              defaultValue={v.nif}
                            />
                          </td>
                          <td>
                            <input
                              data-userpos={i}
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="name"
                              data-inpupd={"name" + i}
                              data-iduser={v.uid}
                              defaultValue={v.name}
                            />
                          </td>
                          <td>
                            <input
                              data-userpos={i}
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="fsurname"
                              data-inpupd={"fsurname" + i}
                              data-iduser={v.uid}
                              defaultValue={v.fsurname}
                            />
                          </td>
                          <td>
                            <input
                              data-userpos={i}
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="ssurname"
                              data-inpupd={"ssurname" + i}
                              data-iduser={v.uid}
                              defaultValue={v.ssurname}
                            />
                          </td>
                          <td>
                            <input
                              data-userpos={i}
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="phone"
                              data-inpupd={"phone" + i}
                              data-iduser={v.uid}
                              defaultValue={v.phone}
                            />
                          </td>
                          <td>
                            <input
                              data-userpos={i}
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="type"
                              data-inpupd={"type" + i}
                              data-iduser={v.uid}
                              defaultValue={v.type}
                            />
                          </td>
                          <td>
                            <select
                              data-userpos={i}
                              class="form-select"
                              onChange={handleChange}
                              id="department"
                              data-inpupd={"department" + i}
                              data-iduser={v.uid}
                              defaultValue={v.did}
                            >
                              <option value="null"></option>
                              {depts.map((vd, i) => (
                                <option key={i} value={vd.id}>
                                  {vd.name}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <button
                  type="button"
                  onClick={sendChanges}
                  class="btn btn-success"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
