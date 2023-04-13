import { useContext, useEffect, useState } from "react";
import { Users } from "../lib/Users";
import { appContext } from "./ContextApp";

export function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [infoFilled, setInfoFilled] = useState(false);
  const { setRequest } = useContext(appContext);

  useEffect(() => {
    Users.profile().then((res) => {
      setProfileInfo(res);
      console.log(profileInfo);
      setInfoFilled(true);
    });
  }, [infoFilled]);

  function handleInput(ev) {
    switch (ev.target.id) {
      case "alias":
        setRequest({
          req: "updateProfile",
          field: "alias",
          value: ev.target.value,
        });
        break;

      default:
        break;
    }
  }

  return (
    <div
      className="profile-container"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="card">
        <h5 className="card-header">My Profile</h5>
        <div className="card-body">
          <div className="card-text">
            {infoFilled && (
              <div className="info">
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
                          onInput={handleInput}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
