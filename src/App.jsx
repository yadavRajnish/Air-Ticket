import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Flare, Margin, Padding } from "@mui/icons-material";
import EastIcon from "@mui/icons-material/East";

function App() {
  const [origin, setOrigin] = useState("SYD");
  const [destination, setDestination] = useState("JFK");
  const [cabin, setCabin] = useState("economy");
  const [results, setResults] = useState([]);

  const originOptions = ["JFK", "DEL", "SYD", "BOM", "BNE", "BLR"];
  const destinationOptions = ["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"];
  const cabinOptions = ["Economy", "Business", "First"];

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    const headers = {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,hi;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      // "user-agent":
      //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    };

    const json_data = {
      origin: origin,
      destination: destination,
      partnerPrograms: [
        "Air Canada",
        "United Airlines",
        "KLM",
        "Qantas",
        "American Airlines",
        "Etihad Airways",
        "Alaska Airlines",
        "Qatar Airways",
        "LifeMiles",
      ],
      stops: 2,
      departureTimeFrom: "2024-07-09T00:00:00Z",
      departureTimeTo: "2024-10-07T00:00:00Z",
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [cabin.charAt(0).toUpperCase() + cabin.slice(1)],
      date: "2024-07-09T12:00:17.796Z",
    };

    try {
      const response = await axios.post(
        "https://cardgpt.in/apitest",
        json_data,
        { headers }
      );
      console.log(response);
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  console.log(results);

  const formControlStyle = {
    width: "20rem",
    bgcolor: "#181818",
    marginTop: "2rem",
  };

  const inputLabelStyle = {
    paddingLeft: "1rem",
    color: "#9ea29e",
  };

  const selectInputStyle = {
    color: "#9ea29e",
    width: "100%",
    ".MuiSvgIcon-root": {
      color: "#9ea29e",
    },
  };

  const currentDate = getCurrentDate();

  return (
    <div className="flight-search" style={{ fontFamily: "roboto" }}>
      <p>Choose Origin & Destination Airports:</p>

      <FormControl sx={formControlStyle}>
        <InputLabel sx={inputLabelStyle} variant="standard" htmlFor="origin">
          Origin
        </InputLabel>
        <Select
          labelId="origin"
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          sx={selectInputStyle}
        >
          {originOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={formControlStyle}>
        <InputLabel
          sx={inputLabelStyle}
          variant="standard"
          htmlFor="destination"
        >
          Destination
        </InputLabel>

        <Select
          labelId="destination"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={selectInputStyle}
        >
          {destinationOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          width: "20rem",
          bgcolor: "#1c2519",
          marginTop: "2rem",
        }}
      >
        <InputLabel sx={inputLabelStyle} variant="standard" htmlFor="cabin">
          Cabin Selection
        </InputLabel>

        <Select
          labelId="cabin"
          id="cabin"
          value={cabin}
          onChange={(e) => setCabin(e.target.value)}
          sx={selectInputStyle}
        >
          {cabinOptions.map((option) => (
            <MenuItem value={option.toLowerCase()} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormGroup
        sx={{
          width: "20rem",
          height: "4.5rem",
          bgcolor: "#111111",
          marginTop: "2rem",
        }}
      >
        <FormControlLabel
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            color: "white",
            marginLeft: ".5rem",
          }}
          disabled
          control={
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
                  backgroundColor: "#888888",
                },
                "& .MuiSwitch-switchBase.Mui-disabled": {
                  color: "#888888",
                },
              }}
            />
          }
          label={
            <Typography>
              <span style={{ color: "#4f4f4f" }}>Show </span>
              <span style={{ color: "#7a3e18" }}>Pro Filters</span>
            </Typography>
          }
        />
      </FormGroup>

      <Typography
        sx={{
          width: "20rem",
          height: "4.5rem",
          marginTop: "2rem",
        }}
      >
        <Button
          onClick={handleSearch}
          style={{ background: "#38b8a6" }}
          variant="contained"
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "start",
            bgcolor: "red",
          }}
        >
          Search
        </Button>
      </Typography>

      <div className="results">
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result-card">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "block" }}>
                  <img
                    src="https://media.tenor.com/HoRbCkoCMNIAAAAi/sunexpress-airplane.gif"
                    alt="logo"
                    style={{
                      height: "2rem",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "block",
                    marginTop: "1rem",
                    fontSize: "1.5rem",
                  }}
                >
                  {result.partner_program}
                </div>
              </div>
              <div className="card-body">
                <div>
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    SYD <EastIcon />
                    JFK
                  </p>
                  <p style={{ margin: 0, padding: 0 }}>
                  {currentDate} - {currentDate}
                  </p>
                </div>

                <div>
                  <div>
                    <div>
                      <p style={{ color: "white" }}>
                        <span
                          className="miles-info"
                          style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                        >
                          {" "}
                          {result.min_business_miles || "N/A"}
                        </span>
                        <span className="tax-info" style={{ color: "#ebe7dd" }}>
                          {result.min_business_miles
                            ? `+ $${result.min_business_tax}`
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div style={{ color: "#9ea29e" }}>Min Business Miles</div>
                  </div>

                  <div>
                    <div>
                      <p style={{ color: "white" }}>
                        <span
                          className="miles-info"
                          style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                        >
                          {" "}
                          {result.min_economy_miles || "N/A"}
                        </span>
                        <span className="tax-info" style={{ color: "#ebe7dd" }}>
                          {result.min_economy_miles
                            ? `+ $${result.min_economy_tax}`
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div style={{ color: "#9ea29e" }}>Min Economy Miles</div>
                  </div>

                  <div>
                    <div>
                      <p style={{ color: "white" }}>
                        <span
                          className="miles-info"
                          style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                        >
                          {" "}
                          {result.min_first_miles || "N/A"}
                        </span>
                        <span className="tax-info" style={{ color: "#ebe7dd" }}>
                          {result.min_first_miles
                            ? `+ $${result.min_first_tax}`
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div style={{ color: "#9ea29e" }}>Min First Miles</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 style={{ color: "#ebe7dd" }}>Try another search route</h2>
        )}
      </div>
    </div>
  );
}

export default App;
