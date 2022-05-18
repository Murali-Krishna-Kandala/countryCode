import React from "react";
import { fireEvent, render, act, waitFor } from "@testing-library/react";
import App, { Info, Home } from "./App";

import { BrowserRouter } from "react-router-dom";

const country = [
  {
    name: "British Indian Ocean Territory",
    topLevelDomain: [".io"],
    alpha2Code: "IO",
    alpha3Code: "IOT",
    callingCodes: ["246"],
    capital: "Diego Garcia",
    altSpellings: ["IO"],
    subregion: "Eastern Africa",
    region: "Africa",
    population: 3000,
    latlng: [-6.0, 71.5],
    demonym: "Indian",
    area: 60.0,
    timezones: ["UTC+06:00"],
    nativeName: "British Indian Ocean Territory",
    numericCode: "086",
    flags: {
      svg: "https://flagcdn.com/io.svg",
      png: "https://flagcdn.com/w320/io.png",
    },
    currencies: [{ code: "USD", name: "United States dollar", symbol: "$" }],
    languages: [
      {
        iso639_1: "en",
        iso639_2: "eng",
        name: "English",
        nativeName: "English",
      },
    ],
    translations: {
      br: "Território Britânico do Oceano íÍdico",
      pt: "Território Britânico do Oceano Índico",
      nl: "Britse Gebieden in de Indische Oceaan",
      hr: "Britanski Indijskooceanski teritorij",
      fa: "قلمرو بریتانیا در اقیانوس هند",
      de: "Britisches Territorium im Indischen Ozean",
      es: "Territorio Británico del Océano Índico",
      fr: "Territoire britannique de l'océan Indien",
      ja: "イギリス領インド洋地域",
      it: "Territorio britannico dell'oceano indiano",
      hu: "Brit Indiai-óceáni Terület",
    },
    flag: "https://flagcdn.com/io.svg",
    regionalBlocs: [
      {
        acronym: "AU",
        name: "African Union",
        otherNames: [
          "الاتحاد الأفريقي",
          "Union africaine",
          "União Africana",
          "Unión Africana",
          "Umoja wa Afrika",
        ],
      },
    ],
    independent: true,
  },
  {
    name: "India",
    topLevelDomain: [".in"],
    alpha2Code: "IN",
    alpha3Code: "IND",
    callingCodes: ["91"],
    capital: "New Delhi",
    altSpellings: ["IN", "Bhārat", "Republic of India", "Bharat Ganrajya"],
    subregion: "Southern Asia",
    region: "Asia",
    population: 1380004385,
    latlng: [20.0, 77.0],
    demonym: "Indian",
    area: 3287590.0,
    gini: 35.7,
    timezones: ["UTC+05:30"],
    borders: ["AFG", "BGD", "BTN", "MMR", "CHN", "NPL", "PAK", "LKA"],
    nativeName: "भारत",
    numericCode: "356",
    flags: {
      svg: "https://flagcdn.com/in.svg",
      png: "https://flagcdn.com/w320/in.png",
    },
    currencies: [{ code: "INR", name: "Indian rupee", symbol: "₹" }],
    languages: [
      { iso639_1: "hi", iso639_2: "hin", name: "Hindi", nativeName: "हिन्दी" },
      {
        iso639_1: "en",
        iso639_2: "eng",
        name: "English",
        nativeName: "English",
      },
    ],
    translations: {
      br: "Índia",
      pt: "Índia",
      nl: "India",
      hr: "Indija",
      fa: "هند",
      de: "Indien",
      es: "India",
      fr: "Inde",
      ja: "インド",
      it: "India",
      hu: "India",
    },
    flag: "https://flagcdn.com/in.svg",
    regionalBlocs: [
      {
        acronym: "SAARC",
        name: "South Asian Association for Regional Cooperation",
      },
    ],
    cioc: "IND",
    independent: true,
  },
];

const weather = {
  request: {
    type: "City",
    query: "Fraccionamiento Gonzalo Garcia Garcia, Mexico",
    language: "en",
    unit: "m",
  },
  location: {
    name: "Fraccionamiento Gonzalo Garcia Garcia",
    country: "Mexico",
    region: "Zacatecas",
    lat: "22.754",
    lon: "-102.569",
    timezone_id: "America/Mexico_City",
    localtime: "2022-05-17 14:12",
    localtime_epoch: 1652796720,
    utc_offset: "-5.0",
  },
  current: {
    observation_time: "07:12 PM",
    temperature: 27,
    weather_code: 116,
    weather_icons: [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png",
    ],
    weather_descriptions: ["Partly cloudy"],
    wind_speed: 19,
    wind_degree: 270,
    wind_dir: "W",
    pressure: 1025,
    precip: 0,
    humidity: 26,
    cloudcover: 75,
    feelslike: 25,
    uv_index: 7,
    visibility: 16,
    is_day: "yes",
  },
};

describe("App", () => {
  test("should be able to render the app", () => {
    const app = render(<App />);
    const container = app.container;
    const appComp = container.getElementsByClassName("App").length;
    expect(appComp).toBe(1);
  });
});

describe("Home", () => {
  test("Should be able to click on the random button", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(country),
      })
    ) as jest.Mock;
    const app = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const container = app.container;
    const inEle = container.querySelectorAll("#outlined-basic")[0];
    const sBtn = container.querySelectorAll("#submitButton")[0];
    fireEvent.change(inEle, { target: { value: "india" } });
    expect(sBtn).toBeEnabled();
    act(() => {
      fireEvent.click(sBtn);
    });
    expect(global.fetch).toBeCalled();
  });
  test("Should be able to handle error in home", async () => {
    window.alert = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.resolve(country),
      })
    ) as jest.Mock;
    const app = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const container = app.container;
    const inEle = container.querySelectorAll("#outlined-basic")[0];
    const sBtn = container.querySelectorAll("#submitButton")[0];
    console.log(container.innerHTML);
    fireEvent.change(inEle, { target: { value: "india" } });
    expect(sBtn).toBeEnabled();
    act(() => {
      fireEvent.click(sBtn);
    });
    expect(global.fetch).toBeCalled();
    await waitFor(() => {
      expect(window.alert).toBeCalled();
    });
  });
});

describe("Info", () => {
  beforeEach(() => {
    localStorage.setItem("myd", JSON.stringify(country));
  });
  test("Should be able to Display Information ", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(weather),
      })
    ) as jest.Mock;
    const InfoCmp = render(<Info />);
    const container = InfoCmp.container;

    const tRows = container.getElementsByTagName("tr").length;
    const capitalName = container.getElementsByTagName("td")[0];
    const population = container.getElementsByTagName("td")[1];
    const latlng = container.getElementsByTagName("td")[2];
    const Wbutton = container.querySelectorAll("td button")[0];
    expect(tRows).toBe(2);
    expect(capitalName.textContent).toBe(`${country[0].capital}`);
    expect(population.textContent).toBe(`${country[0].population}`);
    expect(latlng.textContent).toBe(`${country[0].latlng.join(", ")}`);
    act(() => {
      fireEvent.click(Wbutton);
    });
    expect(global.fetch).toBeCalled();

    // expect(container.querySelectorAll("div")).toBeCalled();
  });
  test("Should be able handle error in info", async () => {
    window.alert = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.resolve(weather),
      })
    ) as jest.Mock;
    const InfoCmp = render(<Info />);
    const container = InfoCmp.container;

    const tRows = container.getElementsByTagName("tr").length;
    const capitalName = container.getElementsByTagName("td")[0];
    const population = container.getElementsByTagName("td")[1];
    const latlng = container.getElementsByTagName("td")[2];
    const Wbutton = container.querySelectorAll("td button")[0];
    expect(tRows).toBe(2);
    expect(capitalName.textContent).toBe(`${country[0].capital}`);
    expect(population.textContent).toBe(`${country[0].population}`);
    expect(latlng.textContent).toBe(`${country[0].latlng.join(", ")}`);
    act(() => {
      fireEvent.click(Wbutton);
    });
    expect(global.fetch).toBeCalled();
    await waitFor(() => {
      expect(window.alert).toBeCalled();
    });
    // expect(container.querySelectorAll("div")).toBeCalled();
  });

  test("shoould be able load when no data is available in localstorage", () => {
    localStorage.removeItem("myd");
    const InfoCmp = render(<Info />);
    const container = InfoCmp.container;
    expect(container.querySelectorAll("table").length).toBe(1);
  });

  test("Should be able to show modal", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(weather),
      })
    ) as jest.Mock;
    const InfoCmp = render(<Info />);
    const container = InfoCmp.container;
    const baseElement = InfoCmp.baseElement;
    const tRows = container.getElementsByTagName("tr").length;
    const capitalName = container.getElementsByTagName("td")[0];
    const population = container.getElementsByTagName("td")[1];
    const latlng = container.getElementsByTagName("td")[2];
    const Wbutton = container.querySelectorAll("td button")[0];
    expect(tRows).toBe(2);
    act(() => {
      fireEvent.click(Wbutton);
    });
    console.log("html", baseElement.innerHTML);
    expect(global.fetch).toBeCalled();
    expect(baseElement.querySelectorAll("#modal").length).toBe(1);
    act(() => {
      fireEvent.click(baseElement.querySelectorAll(".MuiBackdrop-root")[0]);
    });
    expect(baseElement.querySelectorAll("#modal").length).toBe(0);
  });
});
