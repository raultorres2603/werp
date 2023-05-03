import { useContext } from "react";
import { socketContext } from "./ContextSocket";
import { appContext } from "./ContextApp";

export function Alert() {
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);

  const { savePage, page } = useContext(appContext);

  function updateQueue() {
    setRequest({
      req: "updateQueue",
      fields: { page: socketResponse.page },
    });
    setSocketResponse(null);
  }

  function addQueue() {
    setRequest({
      req: "addOnQueueAlert",
      fields: { socketId: socketResponse.socket, page: socketResponse.page },
    });
    setSocketResponse(null);
  }

  function goToPage() {
    savePage(socketResponse.page);
    setSocketResponse(null);
  }

  function cancel() {
    savePage("main");
    setSocketResponse(null);
  }

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
      } else if (socketResponse.result) {
        return (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.result}
          </div>
        );
      } else if (socketResponse.req == "askEnter") {
        return (
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.text}
            <div className="row">
              <div className="col">
                <button type="button" onClick={goToPage} class="btn btn-dark">
                  Go to page!
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  onClick={updateQueue}
                  class="btn btn-danger"
                >
                  Don't go.
                </button>
              </div>
            </div>
          </div>
        );
      } else if (socketResponse.req == "askQueueAlert") {
        return (
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.text}
            <div className="row">
              <div className="col">
                <button type="button" onClick={addQueue} class="btn btn-dark">
                  Add me on queue!
                </button>
              </div>
              <div className="col">
                <button type="button" onClick={cancel} class="btn btn-danger">
                  Don't go.
                </button>
              </div>
            </div>
          </div>
        );
      } else if (socketResponse.req == "waitPosition") {
        return (
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.text}
            <div className="row">
              <button type="button" onClick={cancel} class="btn btn-danger">
                Go to Main.
              </button>
            </div>
          </div>
        );
      }
    }
  }

  return <div className="alerts">{viewAlert()}</div>;
}
