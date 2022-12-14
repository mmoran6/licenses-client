import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './Card.css'


function CardContainer( {info} ) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{info}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Link to={`/${info}`}><Button sx={{color: "red"}}>Ver más</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default CardContainer;