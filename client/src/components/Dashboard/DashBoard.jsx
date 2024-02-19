import { useLocation } from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Plus from "./Plus";
function DashBoard() {
  const location = useLocation();
  const { id } = location.state;
  const [dnsRecord, setDnsRecord] = useState([]);
  const [showaddrecord, setShowaddrecord] = useState(false);
  const [record, setRecord] = useState({
    dnstype: "",
    dnsName: "",
    dnsvalue: "",
    dnsTTL: "",
    dnsStatus: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dnsmanager/${id}`)
      .then((response) => {
        setDnsRecord(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ----------------- Add new record -----------------------------------
  const toggleaddrecord = () => setShowaddrecord(!showaddrecord);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleaddrecord = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/dnsmanager/${id}`, record)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  // -----------------------------------------------------------------------
  return (
    <div className="main">
      <h1>Dns Record</h1>
      <table className="table table-hover table-bordered table-rounded">
        <thead>
          <tr>
            <th>No. </th>
            <th>Type</th>
            <th>Name</th>
            <th>Value</th>
            <th>TTL</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dnsRecord.map((record, index) => (
            <tr key={record._id}>
              <td> {index + 1}</td>
              <td> {record.dnstype} </td>
              <td> {record.dnsName}</td>
              <td> {record.dnsvalue}</td>
              <td> {record.dnsTTL}</td>
              <td> {record.dnsStatus}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-dnsrecord">
        {!showaddrecord && (
          <button className="plusbutton" onClick={toggleaddrecord}>
            <Plus></Plus>
          </button>
        )}

        {showaddrecord && (
          <div className="add-dnsrecord-modal">
            <form onSubmit={handleaddrecord}>
              <div className="mb-3">
                <label htmlFor="dnstype" className="form-label">
                  Type <span className="text-danger">*</span>
                </label>
                <select
                  required
                  id="dnstype"
                  name="dnstype"
                  className="form-control"
                >
                  <option value="A">A (Address) Record</option>
                  <option value="AAAA">AAAA (IPv6 Address) Record</option>
                  <option value="CNAME">CNAME (Canonical Name) Record</option>
                  <option value="MX">MX (Mail Exchange) Record</option>
                  <option value="NS">NS (Name Server) Record</option>
                  <option value="PTR">PTR (Pointer) Record</option>
                  <option value="SOA">SOA (Start of Authority) Record</option>
                  <option value="SRV">SRV (Service) Record</option>
                  <option value="TXT">TXT (Text) Record</option>
                  <option value="DNSSEC">DNSSEC</option>
                </select>

                {/* <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="dnstype"
                  value={record.type}
                  onChange={handleChange}
                  required
                /> */}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="dnsName"
                  value={record.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="value" className="form-label">
                  Value
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="value"
                  name="dnsvalue"
                  value={record.value}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ttl" className="form-label">
                  TTL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ttl"
                  name="dnsTTL"
                  value={record.ttl}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="dnsStatus"
                  value={record.status}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-evenly">
                <button onClick={toggleaddrecord} className="button-primary">
                  close
                </button>
                <button type="submit" className="button-primary">
                  save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
