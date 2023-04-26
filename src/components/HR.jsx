import { useContext } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function HR() {
  const { hrUsers } = useContext(appContext);
  const { setRequest } = useContext(socketContext);

  function handleChange(ev) {}

  return (
    <>
      <div className="hrContainer mt-3">
        <div className="row">
          <div className="card">
            <h5 className="card-header fs-2 bg-info text-center">My HR</h5>
            <div className="card-body">
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
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="nif"
                              defaultValue={v.nif}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="name"
                              defaultValue={v.name}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="fsurname"
                              defaultValue={v.fsurname}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="ssurname"
                              defaultValue={v.ssurname}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="phone"
                              defaultValue={v.phone}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="type"
                              defaultValue={v.type}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              onChange={handleChange}
                              id="depname"
                              defaultValue={v.depname}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
