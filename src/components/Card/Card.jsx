import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './Card.css'


function CardContainer({ info, license }) {
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


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{newName}</Card.Title>
      
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
       
        <Link to={`/${info}`}><Button sx={{ color: "red" }}>Ver más</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default CardContainer;