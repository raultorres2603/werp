import { useContext, useEffect } from "react";
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
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        );
      } else if (socketResponse.result) {
        return (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.result}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        );
      } else if (socketResponse.req == "askEnter" && page != "hr") {
        return (
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.text}
            <div className="row">
              <div className="col">
                <div class="d-grid gap-2">
                  <button type="button" onClick={goToPage} class="btn btn-dark">
                    Go to page!
                  </button>
                </div>
              </div>
              <div className="col">
                <div class="d-grid gap-2">
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
                <div class="d-grid gap-2">
                  <button type="button" onClick={addQueue} class="btn btn-dark">
                    Add me on queue!
                  </button>
                </div>
              </div>
              <div className="col">
                <div class="d-grid gap-2">
                  <button type="button" onClick={cancel} class="btn btn-danger">
                    Don't go.
                  </button>
                </div>
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
      } else if (socketResponse.req == "insertBill" && page == "facturation") {
        return (
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            {socketResponse.text}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        );
      }
    }
  }

  return <div className="alerts">{viewAlert()}</div>;
}
