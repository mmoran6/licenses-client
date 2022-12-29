import { useParams } from "react-router-dom";
import Axios from "../../services/initAxios";
import features from "../../data/features.txt";
import detailstxt from "../../data/details.txt";
import { useEffect, useState } from "react";
import * as d3Fetch from "d3-fetch";
import "./Licenses.css";
import Accordion from "react-bootstrap/Accordion";
import Pagination from '@mui/material/Pagination';
import { ConstructionOutlined } from "@mui/icons-material";

function Licenses() {
  const infoAxios = new Axios();
  const { info } = useParams();
  const [filterWord, setFilterWord] = useState("");
  const [filterFeature, setFilterFeature] = useState([]);
  const [licenseList, setLicenseList] = useState();
  const [dictionaryCSV, setDictionaryCSV] = useState([]);
  const [detailsList, setDetailsList] = useState();
  const [search, setSearch] = useState(false);
  const [infoCities, setInfoCities] = useState([]);
  const [idCities, setIdCities] = useState([]);
  const [relUserGroup, setRelUserGroup] = useState([]);
  const [idUser, setIdUser] = useState([]);
  const [pag, setPag]= useState(0)
  const [prev, setPrev]= useState(1)
  const [actual, setActual] = useState(5)
  
  const names = [];
  const infoAboutLicense = [];
  const namesAndFeatures = [];
  
  const filtered = licenseList?.filter(
    (license) => license.PortAtServer === info
);

  let dupli = [];
  let counter = 0;
  let newName;
  let okCities = true;
  let nPag

  const newNames = (info) => {
    switch (info) {
      case "1055@ANSYS":
        newName = "1055@ANSYS";
        break;
      case "27000@ADESK-ETR":
        newName = "27000@AUTODESK España";
        break;
      case "27000@AUTODESK":
        newName = "27000@AUTODESK Global";
        break;
      case "27000@ESRI":
        newName = "27000@ESRI";
        break;
      case "27000@GlobalMapper":
        newName = "27000@Global Mapper";
        break;
      case "27001@Matlab":
        newName = "27001@Matlab";
        break;
      case "7788@MathCAD-L":
        newName = "MathCAD España";
        break;
      case "7788@MathCAD-G":
        newName = "MathCAD Global";
        break;

      case "0@LICENCIAS.typsa.es":
        newName = "SAP2000 / ETABS / SAFE (España)";
        break;
    }
  };

  const data = () => {
    fetch(features)
      .then((response) => response.json())
      .then((data) => {
        setLicenseList(data);
      });
  };

  const details = () => {
    fetch(detailstxt)
      .then((response) => response.json())
      .then((data) => {
        setDetailsList(data);
      });
  };

  const dictionary = async () => {
    const data = await d3Fetch.csv("/dictionary-table.csv");
    setDictionaryCSV(data);
  };

  const mapNames = () => {
    filtered?.map((elementFiltered) => {
      dictionaryCSV?.map((elementDictionary) => {
        if (elementDictionary.JTB === elementFiltered.Feature) {
          names.push(elementDictionary.name);
          const obj = {
            name: elementDictionary.name,
            feature: elementFiltered.Feature, 
            port: elementFiltered.PortAtServer
          };
          namesAndFeatures.push(obj);
        }
      });
    });
  };

  const moreInfo = () => {
    filtered?.map((elementFiltered) => {
      detailsList?.map((elementDetails) => {
        if (
          elementFiltered.Feature === elementDetails.Feature &&
          elementDetails.PortAtServer === elementFiltered.PortAtServer
        ) {
          infoAboutLicense.push(elementDetails);
        }
      });
    });
  };

  const objectCity = () => {
    relUserGroup.map((single) => {
      let name;
      let city;
      idUser.map((id) => {
        if (id.UserID == single.UserName) {
          name = id.UserName;
        }
      });
      idCities.map((town) => {
        if (town.GroupId == single.GroupId) {
          city = town.GroupName;
        }
      });
      let object = {
        user: name,
        GroupName: city,
      };
      dupli.push(object);
    });
  };

  const NumberPag = () => {
    filterWord != ""  && (filterFeature.length !== 0) ? nPag = Math.round(filterFeature.length/5) : nPag = Math.round(namesAndFeatures.length/5)  
    console.log("filterFeature.length", filterFeature)
  }


  const handleChange = (e, p ) => {
    console.log("p", p)
    
    setActual((p*5))
    console.log("ahoa actual vale ", actual)
  }

  const  cut =(prev, actual, array) => {
    let arrayCopy = [...array]
    let arrayFine = arrayCopy.slice((actual-5), actual)

    console.log("actual", actual)
    console.log("arrayFine", arrayFine)

    return arrayFine

  }

  useEffect(() => {
    data();
    dictionary();
    details();
    

    infoAxios.getInfoCities().then((info) => {
      setInfoCities(info.message.recordset);
    });

    infoAxios.getIdCity().then((info) => {
      setIdCities(info.message.recordset);
    });

    infoAxios.getRelUserGroup().then((info) => {
      setRelUserGroup(info.message.recordset);
    });

    infoAxios.getIdUser().then((info) => {
      setIdUser(info.message.recordset);
    });
  }, [filterWord]);

  mapNames();
  moreInfo();
  newNames(info);
  NumberPag()

  return (
    <div className="licenses-container">
      <h2>Licencias de {newName}</h2>
      <input
        type="text"
        id="search"
        className="searchbar"
        placeholder="Busque aquí su licencia"
        onChange={(e) => {
          setSearch(true);
          setFilterWord(e.target.value.toLowerCase());
          setFilterFeature(
            namesAndFeatures.filter((license) =>
              license.name.toLowerCase().includes(filterWord)  
            )
          );
          setSearch(true);
          NumberPag()
        }}
      />
      {objectCity()}
      
      <Pagination className="pagination" count={nPag} showFirstButton showLastButton onChange={handleChange} />
      <Accordion >
        {(filterWord != ""  && (filterFeature.length !== 0) ? cut(prev, actual, filterFeature) : cut(prev, actual, namesAndFeatures)).map((element, index) => {
          counter = 0;
          return (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>
                <div className="containerSingleLicense">
                  <p className="cardHomeTitle"><b>{element.name}</b></p>
                  {filtered.map((licensess, key) => {
                    return licensess.Feature == element.feature ? (
                      <p key={key} className="useLicense">
                     
                    
                        <b> TOTAL:</b> {licensess.AvailableLicences} licencias   <b>UTILIZADAS: </b> {licensess.UsedLicences} licencias   <b>UTILIZACIÓN: </b> {Math.round(
                          (licensess.UsedLicences * 100) /
                            licensess.AvailableLicences
                        )}
                        % de uso
                      </p>
                    ) : null;
                  })}
                </div>
              </Accordion.Header>

              <Accordion.Body>
                {infoAboutLicense.map((person, key) => {
                  okCities = true;
                  if (person.Feature === element.feature) {
                    counter++;
                    const dateString = person.CheckedOutDate.substr(6);
                    const currentTime = new Date(parseInt(dateString));

                    const dateString1 = person.SnapShotDate.substr(6);
                    const dateString2 = person.CheckedOutDate.substr(6);

                    const currentTime1 = new Date(parseInt(dateString1));
                    const currentTime2 = new Date(parseInt(dateString2));

                    const dif = currentTime1.getTime() - currentTime2.getTime();
                    const parseDate = new Date(parseInt(dif));
                    const timeInUse = parseDate.toLocaleTimeString();

                    return (
                      <div key={key} className="accordion-body-content">
                        <p>
                          {person.UserName}@{person.UserHost}
                        </p>
      
                        {dupli.map((city, index) => {
                          city.user?.toLowerCase() !==
                          person.UserName?.toLowerCase()
                            ? null
                            : (okCities = false);
                          return city.user?.toLowerCase() !==
                            person.UserName?.toLowerCase() ? null : (
                            <p key={index} className="city">
                              {city.GroupName}
                            </p>
                          );
                        })}
                        {okCities ? (
                          <p className="city">Sede desconocida</p>
                        ) : null}
                        <p className="checked">
                          {" "}
                          Licencia reavisada a {" "}
                          {currentTime.toLocaleDateString()}{" "}
                          {currentTime.toLocaleTimeString()}{" "}
                        </p>
                        <p className="time"> Horas utlizadas {timeInUse}</p>
                      </div>
                    );
                  }
                })}
                {counter === 0 ? (
                  <p style={{ color: "#bf1525" }}>
                    No hay nadie usando la licencia
                  </p>
                ) : null}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

export default Licenses;
