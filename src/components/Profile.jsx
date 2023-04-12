import { useContext, useEffect, useState } from "react";
import { Users } from "../lib/Users";

export function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [infoFilled, setInfoFilled] = useState(false);

  useEffect(() => {
    Users.profile().then((res) => {
      setProfileInfo(res);
      console.log(profileInfo);
      setInfoFilled(true);
    });
  }, [infoFilled]);
  return (
    <div
      className="profile-container"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="card">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
          <h5 className="card-title">My Profile</h5>
          <div className="card-text">
            {infoFilled && (
              <div className="info">
                <div className="row">
                  <div className="col-4">
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
                  <div className="col-4">
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
                  <div className="col-4">
                    <div className="input-group input-group">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                      >
                        NIF
                      </span>
                      <input
                        type="text"
                        id="name"
                        defaultValue={profileInfo.nif}
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <a href="#" className="btn btn-primary mt-4">
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
