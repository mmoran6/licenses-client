import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import detailstxt from "../../data/details.txt";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Card.css";

function CardContainer({ info, name, license }) {
  const [stockLicense, setStockLicense] = useState([]);
  const [detailsList, setDetailsList] = useState();

  let contador2 = 0;
  let newName;
  let sumLicenses = 0 
  let sumUsedLicenses = 0 

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

  const details = () => {
    fetch(detailstxt)
      .then((response) => response.json())
      .then((data) => {
        setDetailsList(data);
      });
  };

  newNames(info);

  const numberLicense = (array, license) => {
    const stock = [];
    let contador = 0;
    array?.forEach((singleName) => {
      contador = 0;
      license.map((singleLicense) => {
        if (singleName == singleLicense.PortAtServer) contador++;
      });
      let stockSingle = `{"${singleName}":${contador}}`;
      stock.push(JSON.parse(stockSingle));
    });
    setStockLicense(stock);
    localStorage.setItem("stock", JSON.stringify(stock));
  };


  const sum =()=>{
    license.map((singleLicense)=>{
      if (singleLicense.PortAtServer == info ){
        sumLicenses += singleLicense.AvailableLicences
        sumUsedLicenses += singleLicense.UsedLicences
      }

    })
  }

  useEffect(() => {
    numberLicense(name, license);
    details()
  }, []);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body className="cardHome" >
        {sum()}  
        
        <Card.Title className="cardHomeTitle" >{newName}</Card.Title>
        <Card.Text>{`Tiene ${sumLicenses} licencias en total`}</Card.Text>
        <Card.Text>{`${sumUsedLicenses} licencias en uso`}</Card.Text>
        <Card.Text>{`${Math.round((sumUsedLicenses*100)/sumLicenses)} %  de uso`}</Card.Text>
     
        <Link to={`/${info}`}>
          <Button sx={{ color: "red" }}>Ver más</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CardContainer;
