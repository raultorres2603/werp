import { useContext } from "react";
import { socketContext } from "./ContextSocket";

export function Alert() {
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);

  function viewAlert() {
    if (socketResponse) {
      if (socketResponse.error) {
        return (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.error}
          </div>
        );
      } else {
        return (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.result}
          </div>
        );
      }
    }
  }

  return <div className="alerts">{viewAlert()}</div>;
}
