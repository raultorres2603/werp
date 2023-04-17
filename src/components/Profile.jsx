import { useContext, useEffect, useState } from "react";
import { Users } from "../lib/Users";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [infoFilled, setInfoFilled] = useState(false);
  const { setRequest } = useContext(socketContext);

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
        creation: ev.target.elements.creation.value,
        fsurname: ev.target.elements.fsurname.value,
        name: ev.target.elements.name.value,
        nif: ev.target.elements.nif.value,
        ssurname: ev.target.elements.ssurname.value,
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
                              Surname
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
                              Alias
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
                        Update
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
