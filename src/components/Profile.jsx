import { useContext, useEffect, useState } from "react";
import { Users } from "../lib/Users";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [infoFilled, setInfoFilled] = useState(false);
  const { setRequest, socketResponse } = useContext(socketContext);

  useEffect(() => {
    Users.profile().then((res) => {
      setProfileInfo(res);
      console.log(profileInfo);
      setInfoFilled(true);
    });
  }, [infoFilled]);

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    setRequest({
      req: "updateProfile",
      fields: {
        alias: ev.target.elements.alias.value,
        fsurname: ev.target.elements.fsurname.value,
        name: ev.target.elements.name.value,
        nif: ev.target.elements.nif.value,
        ssurname: ev.target.elements.ssurname.value,
        user: sessionStorage.getItem("user"),
      },
    });
  }

  return (
    <div className="col-12-sm">
      <div
        className="profile-container mt-3"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="card">
          <h5 className="card-header bg-info text-center fs-2">My Profile</h5>
          <div className="card-body">
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

            <div className="card-text">
              {infoFilled && (
                <div className="info">
                  <form onSubmit={handleSubmit} method="post">
                    <div className="row">
                      <div className="col-4">
                        <div className="row">
                          <div className="input-group input-group">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-lg"
                            >
                              Alias
                            </span>
                            <input
                              type="text"
                              id="alias"
                              defaultValue={profileInfo.alias}
                              className="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="input-group input-group">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-lg"
                            >
                              Name
                            </span>
                            <input
                              type="text"
                              id="name"
                              defaultValue={profileInfo.name}
                              className="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="input-group input-group">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-lg"
                            >
                              Creation
                            </span>
                            <input
                              type="text"
                              id="creation"
                              readOnly
                              disabled
                              defaultValue={new Date(
                                profileInfo.creation
                              ).toLocaleString("en-GB")}
                              className="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="input-group input-group">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-lg"
                            >
                              First Surname
                            </span>
                            <input
                              type="text"
                              id="fsurname"
                              defaultValue={profileInfo.fsurname}
                              className="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="input-group input-group">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-lg"
                            >
                              NIF
                            </span>
                            <input
                              type="text"
                              id="nif"
                              defaultValue={profileInfo.nif}
                              className="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="input-group input-group">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-lg"
                            >
                              Second Surname
                            </span>
                            <input
                              type="text"
                              id="ssurname"
                              defaultValue={profileInfo.ssurname}
                              className="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <button type="submit" className="btn btn-success">
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
