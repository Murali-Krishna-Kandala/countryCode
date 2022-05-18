import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/in" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
export const Home = () => {
  const [in_country, set_in_country] = React.useState<any>("");
  const usenav = useNavigate();
  const getCont = (e: any) => {
    e.preventDefault();
    fetch(`https://restcountries.com/v2/name/${in_country}`)
      .then((x) => x.json())
      .then((y) => {
        localStorage.setItem("myd", JSON.stringify(y));
        usenav("/in");
      })
      .catch((err) => alert(err));
  };
  return (
    <div id="dd">
      <form onSubmit={getCont}>
        <div>
          <TextField
            id="outlined-basic"
            label="Country"
            placeholder="enter country"
            variant="outlined"
            onChange={(e) => {
              set_in_country(e.target.value);
            }}
          />
        </div>
        <div>
          <Button
            id="submitButton"
            variant="contained"
            disabled={in_country?.length > 0 ? false : true}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export const Info = () => {
  const [count, setcount] = React.useState<any>([]);
  const [cap, setcap] = React.useState<any>({});
  const [wea, setwea] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    let rx = localStorage.getItem("myd");

    if (rx) {
      setcount(JSON.parse(rx));
    }
  }, []);
  const Getcap = (capi: any) => {
    setcap({ capi });
    const token = "777d27b0d9ba335844aa290561f21e5b";
    handleOpen();
    fetch(`http://api.weatherstack.com/current?access_key=${token}&query=${capi}
    `)
      .then((x) => x.json())

      .then((y) => {
        setwea(y?.current);
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <table>
        {count?.map((a: any) => {
          return (
            <tr>
              <td>{a?.capital}</td>
              <td>{a?.population}</td>
              <td>{a?.latlng.join(", ")}</td>
              <td>
                <img src={a?.flag} alt="flag" height={60} width={60} />
              </td>
              <td>
                <Button
                  variant="contained"
                  onClick={() => {
                    Getcap(a?.capital);
                  }}
                >
                  GetWeather
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {cap?.capi}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>{wea?.temperature}</p>
            <p>{wea?.precip}</p>
            <p>{wea?.wind_speed}</p>
            <img src={wea?.weather_icons} alt="flag" height={60} width={60} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
