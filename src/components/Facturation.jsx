import { useState, useContext, useEffect } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";
import { FileEarmarkX, PencilSquare } from "react-bootstrap-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Alert } from "./Alert";
import { Graphs } from "../lib/Graphs";

export function Facturation() {
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);
  const [data, setData] = useState(null);
  const [from, setFrom] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const [typeBill, setTypeBill] = useState(null);
  const [billDetails, setBillDetails] = useState([]);
  const [to, setTo] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const [billEdit, setBillEdit] = useState({
    id: null,
    amount: null,
    irpf: null,
    iva: null,
  });

  async function handleTypeBill(e) {
    if (e.target.value == "") {
      setTypeBill(null);
    } else {
      setTypeBill(await Graphs.getTypeBills());
    }
    console.log(typeBill);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    setRequest({
      req: "insertBill",
      fields: {
        fromDate: ev.target.elements.fromDate.value,
        amount: ev.target.elements.amount.value,
        iva: ev.target.elements.iva.value,
        irpf: ev.target.elements.irpf.value,
        user: sessionStorage.getItem("user"),
        typeBill: ev.target.elements.typeBill.value,
      },
    });
  }

  async function handleInformation(e) {
    console.log(e);
    let slash = e.activeLabel.indexOf("-");
    let month = e.activeLabel.substr(0, slash);
    let year = e.activeLabel
      .substr(slash, e.activeLabel.length - 1)
      .replace("-", "");

    let dataRes = await Graphs.getDetail(
      `${year}-${month}`,
      e.activePayload[1].value,
      e.activePayload[2].value
    );
    console.log(dataRes);
    setBillDetails(dataRes.data.results);
  }

  function handleDate(ev) {
    switch (ev.target.id) {
      case "from":
        setFrom(ev.target.value);
        break;

      case "to":
        setTo(ev.target.value);
        break;

      default:
        break;
    }
  }

  async function handleSearch(ev) {
    let dataRes = await Graphs.getGraph(from, to);
    setData(dataRes);
  }

  async function handleEdit(e) {
    let data = e.target.dataset;
    setBillEdit({
      id: data.element,
      amount: data.amount,
      irpf: data.irpf,
      iva: data.iva,
    });
  }

  async function handleElminate(e) {
    let idElement = e.target.dataset.element;
    if (
      confirm(`Are you sure you want to delete the bill with ID ${idElement}?`)
    ) {
      let responseDelete = await Graphs.deleteBill(idElement);
      console.log(responseDelete);
      if (responseDelete.res == 200) {
        handleSearch();
        setBillDetails([]);
        setSocketResponse({ result: "Bill Eliminated Correctly" });
      } else {
        setSocketResponse({ error: "Error on delete Bill" });
      }
    }
  }

  return (
    <div className="facturation-container">
      <div className="row">
        <div className="display-4 mb-4 text-center">My Bill Menu</div>
      </div>

      <Alert />
      <div className="row">
        <form action="#" method="post" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div class="input-group input-group-lg">
                  <span class="input-group-text" id="inputGroup-sizing-lg">
                    From
                  </span>
                  <input
                    type="date"
                    id="fromDate"
                    required
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div class="input-group input-group-lg">
                  <span class="input-group-text" id="inputGroup-sizing-lg">
                    Amount
                  </span>
                  <input
                    type="number"
                    id="amount"
                    required
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    onChange={handleTypeBill}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <div className="row">
                <div class="input-group input-group-lg">
                  <span class="input-group-text" id="inputGroup-sizing-lg">
                    IVA
                  </span>
                  <input
                    type="number"
                    id="iva"
                    defaultValue="21"
                    required
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div class="input-group input-group-lg">
                      <span class="input-group-text" id="inputGroup-sizing-lg">
                        IRPF
                      </span>
                      <input
                        type="number"
                        id="irpf"
                        required
                        class="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <select
                      disabled={typeBill ? false : true}
                      defaultValue="0"
                      required
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      name="typeBill"
                    >
                      <option value="0">Type Bill</option>
                      {typeBill &&
                        typeBill.results.map((v, i) => (
                          <option key={i} value={v.id}>
                            {v.type}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-info align-middle fs-4">
                  Insert
                </button>
              </div>
            </div>
            <div className="col-6">
              <div class="d-grid gap-2">
                <button
                  type="button"
                  class="btn btn-warning fs-4"
                  data-bs-toggle="modal"
                  data-bs-target="#reportModal"
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <hr />

      <div
        class="modal fade"
        id="reportModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title" id="exampleModalLabel">
                Report graphics
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <Alert />
            <div class="modal-body">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div class="input-group input-group-lg">
                      <span class="input-group-text" id="basic-addon1">
                        From
                      </span>
                      <input
                        type="date"
                        class="form-control"
                        id="from"
                        onChange={handleDate}
                        defaultValue={from}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div class="input-group input-group-lg">
                      <span class="input-group-text" id="basic-addon1">
                        To
                      </span>
                      <input
                        type="date"
                        class="form-control"
                        id="to"
                        onChange={handleDate}
                        defaultValue={to}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="row">
                    <button
                      type="button"
                      class="btn btn-success align-middle fs-4"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <ResponsiveContainer width={"100%"} height={300}>
                  <BarChart data={data} onClick={handleInformation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar type="monotone" dataKey="value" fill="#8884d8" />
                    <Bar type="monotone" dataKey="iva" fill="#FF3838" />
                    <Bar type="monotone" dataKey="irpf" fill="#CC38FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <hr />
              <div className="row text-center">
                <div className="fs-1">Detail</div>
              </div>
              <div className="row">
                <table class="table table-hover">
                  <thead className="bg-dark text-white text-center">
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>IVA</th>
                      <th>IRPF</th>
                      <th>User</th>
                      <th>Edit</th>
                      <th>Eliminate</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {billDetails.map((element, index) => (
                      <tr key={index} id={`tr-${element.id}`}>
                        <td>{element.id}</td>
                        <td>
                          {
                            new Date(element.fromDate)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td>{element.amount}</td>
                        <td>{element.iva}</td>
                        <td>{element.irpf}</td>
                        <td>{element.alias}</td>
                        <td>
                          <div class="d-grid gap-2">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-element={element.id}
                              data-amount={element.amount}
                              data-iva={element.iva}
                              data-irpf={element.irpf}
                              data-bs-toggle="modal"
                              data-bs-target="#editBillModal"
                              onClick={handleEdit}
                            >
                              <PencilSquare />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div class="d-grid gap-2">
                            <button
                              type="button"
                              class="btn btn-danger"
                              data-element={element.id}
                              onClick={handleElminate}
                            >
                              <FileEarmarkX />
                            </button>
                          </div>
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
      <div
        class="modal fade"
        id="editBillModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-info">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Bill
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-6">
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Bill's ID
                    </span>
                    <input
                      id="billID"
                      type="text"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      defaultValue={billEdit.id}
                      readOnly
                      disabled
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      IRPF
                    </span>
                    <input
                      id="billIRPF"
                      type="text"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      defaultValue={billEdit.irpf}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Amount
                    </span>
                    <input
                      id="billAmount"
                      type="text"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      defaultValue={billEdit.amount}
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      IVA
                    </span>
                    <input
                      id="billIVA"
                      type="text"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      defaultValue={billEdit.iva}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div class="d-grid gap-2">
                    <button type="button" class="btn btn-success">
                      Confirm
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div class="d-grid gap-2">
                    <button type="button" class="btn btn-danger">
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
