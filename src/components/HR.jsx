import { useContext, useEffect, useState, useRef } from "react";
import { Alert } from "./Alert";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function HR() {
  const { hrUsers, depts, page } = useContext(appContext);
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setSocketResponse(null);
    setRequest({ req: "roomComprob", fields: { page: page } });
    return () => {
      console.log("unmounted");
      setRequest({ req: "updateQueue", fields: { page: "hr" } });
    };
  }, []);

  function handleChange(ev) {
    hrUsers[ev.target.dataset.userpos][ev.target.id] = ev.target.value;
    console.log(hrUsers);
  }

  function renderUsers() {
    if (socketResponse) {
      if (socketResponse.req != "askQueue") {
        return hrUsers.map((vu, iu) => (
          <tr key={iu}>
            <td>
              <input
                data-userpos={iu}
                type="text"
                class="form-control"
                onChange={handleChange}
                id="nif"
                data-inpupd={"nif" + iu}
                data-iduser={vu.uid}
                defaultValue={vu.nif}
              />
            </td>
            <td>
              <input
                data-userpos={iu}
                type="text"
                class="form-control"
                onChange={handleChange}
                id="name"
                data-inpupd={"name" + iu}
                data-iduser={vu.uid}
                defaultValue={vu.name}
              />
            </td>
            <td>
              <input
                data-userpos={iu}
                type="text"
                class="form-control"
                onChange={handleChange}
                id="fsurname"
                data-inpupd={"fsurname" + iu}
                data-iduser={vu.uid}
                defaultValue={vu.fsurname}
              />
            </td>
            <td>
              <input
                data-userpos={iu}
                type="text"
                class="form-control"
                onChange={handleChange}
                id="ssurname"
                data-inpupd={"ssurname" + iu}
                data-iduser={vu.uid}
                defaultValue={vu.ssurname}
              />
            </td>
            <td>
              <input
                data-userpos={iu}
                type="text"
                class="form-control"
                onChange={handleChange}
                id="phone"
                data-inpupd={"phone" + iu}
                data-iduser={vu.uid}
                defaultValue={vu.phone}
              />
            </td>
            <td>
              <input
                data-userpos={iu}
                type="text"
                class="form-control"
                onChange={handleChange}
                id="type"
                data-inpupd={"type" + iu}
                data-iduser={vu.uid}
                defaultValue={vu.type}
              />
            </td>
            <td>
              <select
                data-userpos={iu}
                class="form-select"
                onChange={handleChange}
                id="department"
                data-inpupd={"department" + iu}
                data-iduser={vu.uid}
                defaultValue={vu.did}
              >
                <option value="null"></option>
                {depts.map((vd, id) => (
                  <option key={id} value={vd.id}>
                    {vd.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ));
      }
    }
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
                <Alert />
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
                    <tbody id="userBodyTable">{renderUsers()}</tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                {socketResponse && (
                  <button
                    type="button"
                    id="updateInfoHR"
                    onClick={sendChanges}
                    class="btn btn-success"
                    disabled
                  >
                    Update
                  </button>
                )}
                {socketResponse == null && (
                  <button
                    type="button"
                    id="updateInfoHR"
                    onClick={sendChanges}
                    class="btn btn-success"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
