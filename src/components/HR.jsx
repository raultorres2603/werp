export function HR() {
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
                    <tbody id="userBodyTable"></tbody>
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
