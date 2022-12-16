import { useParams } from "react-router-dom";
import features from "../../data/features.txt";
import detailstxt from "../../data/details.txt";
import { useEffect, useState } from "react";
import * as d3Fetch from "d3-fetch";
import "./Licenses.css";
import Accordion from "react-bootstrap/Accordion";

function Licenses() {
    const { info } = useParams();

    const [filterWord, setFilterWord] = useState("");
    const [filterFeature, setFilterFeature] = useState([]);
    const [licenseList, setLicenseList] = useState();
    const [dictionaryCSV, setDictionaryCSV] = useState([]);
    const [detailsList, setDetailsList] = useState();
    const [search, setSearch] = useState(false);

    const names = [];
    const infoAboutLicense = [];
    const namesAndFeatures = [];

    let counter = 0;
    let newName;

    const filtered = licenseList?.filter(
        (license) => license.PortAtServer === info
    );


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
                    };
                    namesAndFeatures.push(obj);
                }
            });
        });
    };


    const moreInfo = () => {
        filtered?.map((elementFiltered) => {
            detailsList?.map((elementDetails) => {
                if (elementFiltered.Feature === elementDetails.Feature) {
                    infoAboutLicense.push(elementDetails);
                }
            });
        });
    };


    const newNames = (info) => {
        switch (info) {
            case "1055@ANSYS":
                newName = "1055@ANSYS";
                break;
            case "27000@ADESK-ETR":
                newName = "27000@AUTODESK España";
                break;
            case "27000@AUTODESK":
                newName = "27000@AUTODESK Global"
                break;
            case "27000@ESRI":
                newName = "27000@AUTODESK España";
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


    useEffect(() => {
        data();
        dictionary();
        details();
    }, [filterWord]);


    mapNames();
    moreInfo();
    newNames(info);


    return (
        <div className="licenses-container">
            <h2>Licencias de {newName}</h2>
            <input
                type="text"
                id="search"
                className="searchbar"
                onChange={(e) => {
                    setSearch(true);
                    setFilterWord(e.target.value.toLowerCase());
                    setFilterFeature(namesAndFeatures.filter(license => license.name.toLowerCase().includes(filterWord)))
                    setSearch(true);
                }}
            />
            <Accordion>
                {
                    search ? filterFeature?.map((element, index) => {
                        counter = 0;
                        return (
                            <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{element.name}</Accordion.Header>
                                <Accordion.Body>
                                    {infoAboutLicense.map((person, key) => {
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
                                                    <p>{person.UserName}@{person.UserHost}</p>
                                                    <p>Checked out license at{" "}{currentTime.toLocaleDateString()}{" "}{currentTime.toLocaleTimeString()}{" "}</p>
                                                    <p>Hours used {timeInUse}</p>
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
                    })
                        : namesAndFeatures?.map((element, index) => {
                            counter = 0;
                            return (
                                <Accordion.Item eventKey={index} key={index}>
                                    <Accordion.Header>{element.name}</Accordion.Header>
                                    <Accordion.Body>
                                        {
                                        infoAboutLicense.map((person, key) => {
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
                                                        <p>{person.UserName}@{person.UserHost}</p>
                                                        <p>Checked out license at{" "}{currentTime.toLocaleDateString()}{" "}{currentTime.toLocaleTimeString()}{" "} </p>
                                                        <p>Hours used {timeInUse}</p>
                                                    </div>
                                                );
                                            }
                                        })
                                        }
                                        
                                        {
                                        counter === 0 ? (

                                            <p style={{ color: "#bf1525" }}>No hay nadie usando la licencia</p>
                                        ) : null
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })
                }
            </Accordion>
        </div>
    );
}



export default Licenses;