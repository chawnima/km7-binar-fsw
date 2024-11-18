import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import propTypes from "prop-types";
const CarType = ({ type }) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{type.name}</Card.Title>
          <Card.Text>{type.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
CarType.propTypes={
  type:propTypes.object
}
export default CarType;
