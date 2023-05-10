import { useState, useContext, useEffect } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";
import ReactECharts from "echarts-for-react";

export function Facturation() {
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);
  const [chart, setChart] = useState(null);
  const [data, setData] = useState([]);
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
  const [xAxisData, setXAxisData] = useState(null);
  const [options, setOptions] = useState({
    title: {
      text: `Facturation of ${from} to ${to}`,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: data,
    },
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: data,
  });

  function handleSubmit(ev) {
    ev.preventDefault();
  }

  return (
    <div className="facturation-container">
      <div className="row">
        <div className="display-4 mb-4 text-center">My Bill Menu</div>
      </div>
      <div className="row mb-4">
        <div className="display-5 text-center">Insert Bill</div>
      </div>
      <div className="row">
        <form action="#" method="post" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-3">
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
            <div className="col-3">
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
            <div className="col-3">
              <div className="row">
                <div class="input-group input-group-lg">
                  <span class="input-group-text" id="inputGroup-sizing-lg">
                    IVA
                  </span>
                  <input
                    type="number"
                    id="iva"
                    required
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                  />
                </div>
              </div>
            </div>
            <div className="col-3">
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
      <div className="row mb-4">
        <div className="display-5 text-center">Filter Bills</div>
      </div>
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
                defaultValue={to}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="row">
          <button type="button" class="btn btn-success align-middle fs-4">
            Buscar
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        <ReactECharts option={options} />
      </div>
    </div>
  );
}
