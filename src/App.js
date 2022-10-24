import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [veri, setVeri] = useState();
  const [tarih, setTarih] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json"
      )
      .then((res) => setVeri(res.data[tarih]))
      .catch((err) => console.log(err));
  }, [veri, tarih]);

  return (
    <div className="container">
      <div className="row">
        <div className="inp col-md-8 mx-auto mt-5">
          <h2 className="text-danger text-center display-5 fw-bold">TÜRKİYE</h2>
          <h2 className="text-white text-center display-5 mb-5">
            COVID-19 ARAMA MOTORU
          </h2>
          <input
            type="text"
            placeholder="GG.AA.YY"
            className="form-control"
            onChange={(e) => {
              setTarih(e.target.value.replaceAll(".", "/"));
            }}
          ></input>
          <table className="table table strike text-white">
            <thead>
              <tr>
                <th scope="col">Tarih</th>
                <th scope="col">Test Sayısı</th>
                <th scope="col">Hasta Sayısı</th>
                <th scope="col">Vefat Sayısı</th>
              </tr>
            </thead>
            <tbody>
              <tr className={veri === undefined ? "bg-danger" : "bg-success"}>
                <th scope="row">
                  {veri === undefined
                    ? "Veri Bekleniyor"
                    : veri.date.replaceAll("/", ".")}
                </th>
                <td>
                  {veri === undefined ? "Veri Bekleniyor" : veri.totalTests}
                </td>
                <td>
                  {veri === undefined ? "Veri Bekleniyor" : veri.patients}
                </td>
                <td>{veri === undefined ? "Veri Bekleniyor" : veri.deaths}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
