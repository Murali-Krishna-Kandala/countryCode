import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
const token = "777d27b0d9ba335844aa290561f21e5b";
function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/information" element={<InformationComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

const HomeComponent = () => {
  const [country_name, set_country_name] = React.useState("");
  const navigate = useNavigate();
  const getCounrtyInformation = (e: any) => {
    e.preventDefault();
    fetch(`https://restcountries.com/v2/name/${country_name}`)
      .then((data) => data.json())
      .then((response) => {
        localStorage.setItem("country_information", JSON.stringify(response));
        navigate("/information");
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="Home">
      <h1>COUNTRY INFO TRACKER</h1>
      <form onSubmit={getCounrtyInformation} className="txt_btn">
        <div>
          <TextField
            id="filled-basic"
            label="Country"
            placeholder="Enter Country"
            variant="outlined"
            onChange={(e) => set_country_name(e.target.value)}
          />
        </div>
        <div>
          <Button
            id="submit_button"
            variant="contained"
            disabled={country_name?.length > 2 ? false : true}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

const InformationComponent = () => {
  const [country_information, set_country_information] = React.useState<any>(
    []
  );
  const [capital_weather, set_capital_weather] = React.useState<any>({});
  const [weather, set_weather] = React.useState<any>({});
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  React.useEffect(() => {
    const recived_country_data = localStorage.getItem("country_information");
    if (recived_country_data) {
      set_country_information(JSON.parse(recived_country_data));
    }
  }, []);
  const Weather_infroamation = (capital: any) => {
    set_capital_weather({ capital });
    handleOpen();
    fetch(
      `http://api.weatherstack.com/current?access_key=${token}&query=${capital}`
    )
      .then((data) => data.json())
      .then((response) => {
        set_weather(response?.current);
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="Main">
      <h1>Country Inforamtion</h1>
      <table className="country_info_table">
        {country_information?.map((map_country_info: any, index: any) => {
          return (
            <tr>
              <td>{map_country_info?.capital}</td>
              <td>{map_country_info?.latlng.join(", ")}</td>
              <td>{map_country_info?.population}</td>
              <td>
                <img
                  src={map_country_info?.flag}
                  alt="National Flag"
                  height={80}
                  width={80}
                />
              </td>
              <td>
                <Button
                  variant="contained"
                  onClick={() =>
                    Weather_infroamation(map_country_info?.capital)
                  }
                >
                  Capital Weather
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <Modal
        open={openModal}
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
            // bgcolor: "background.paper",
            border: "2px solid burlywood",
            boxShadow: 24,
            background: "linear-gradient(180deg, #2f3f5f 30%, #978987 30%)",
            p: 5,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {capital_weather?.capital}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <table className="weather_info_table">
              <tr>
                <td>
                  <p>{weather?.temperature}</p>
                </td>
                <td>
                  <img
                    src={weather?.weather_icons}
                    alt="Weather Icon"
                    height={80}
                    width={80}
                  />
                </td>
                <td>
                  <p>{weather?.wind_speed}</p>
                </td>
                <td>
                  <p>{weather?.precip}</p>
                </td>
              </tr>
            </table>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
