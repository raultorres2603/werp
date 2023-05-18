import { useState, useContext, useEffect } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";
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
  const [to, setTo] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

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
      },
    });
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
          </div>
          <div className="row mt-4">
            <button type="submit" class="btn btn-info align-middle fs-4">
              Insertar
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div className="row">
        <div className="col-4">
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
              <select className="form-select" id="taxes">
                <option selected>Open this select menu</option>
                <option value="iva">IVA</option>
                <option value="irpf">IRPF</option>
                <option value="iva+irpf">IVA + IRPF</option>
              </select>
            </div>
            <div className="row mt-4">
              <button
                type="button"
                class="btn btn-success align-middle fs-4"
                onClick={handleSearch}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="row">
            <ResponsiveContainer width={"95%"} height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar type="monotone" dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
