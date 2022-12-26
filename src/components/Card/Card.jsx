import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Card.css'


function CardContainer({ info, name, license }) {
  const [stockLicense, setStockLicense] = useState([]);
  let newName




  const newNames = (info) => {
    switch (info) {
      case "1055@ANSYS":
        newName = "1055@ANSYS"
        break;
      case "27000@ADESK-ETR":
        newName = "27000@AUTODESK España"
        break;
      case "27000@AUTODESK":
        newName = "27000@AUTODESK Global"
        break;
      case "27000@ESRI":
        newName = "27000@AUTODESK España"
        break;
      case "27000@GlobalMapper":
        newName = "27000@Global Mapper"
        break;
      case "27001@Matlab":
        newName = "27001@Matlab"
        break;
      case "7788@MathCAD-L":
        newName = "MathCAD España"
        break;
      case "7788@MathCAD-G":
        newName = "MathCAD Global"
        break;
      case "0@LICENCIAS.typsa.es":
        newName = "SAP2000 / ETABS / SAFE (España)"
        break;
    }
  }


  newNames(info)


  const numberLicense = (array, license) => {
    const stock = []
    let contador = 0
    array?.forEach((singleName) => {
      contador = 0
      license.map((singleLicense) => {
        if (singleName == singleLicense.PortAtServer) contador++
      })
      let stockSingle = `{"${singleName}":${contador}}`
      stock.push(JSON.parse(stockSingle))
    });
    setStockLicense(stock)
    localStorage.setItem("stock", JSON.stringify(stock))
  };

  useEffect(() => {
    numberLicense(name , license)

  }, []);



  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{newName}</Card.Title>
      
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
         {stockLicense.map((stock)=> {

          for( let clave in stock){
            if (clave == info) {
              let numberLicense = `Tiene ${stock[clave]} licencias`
              return(
                <Card.Text key={clave}>{numberLicense}</Card.Text>
              )
            }
          }
         })

         }
        
       
        <Link to={`/${info}`}><Button sx={{ color: "red" }}>Ver más</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default CardContainer;