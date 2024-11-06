import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import propTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const StudentCard = ({ student }) => {
  return (
    <Col md={3}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={student?.profile_picture} />
        <Card.Body>
          <Card.Title className="font-bold">{student?.name}</Card.Title>
          <Card.Text>{student?.nick_name}</Card.Text>
          <Button as={Link} href={`/students/${student.id}`} variant="primary">Detail Student</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
StudentCard.propTypes = {
  student: propTypes.object,
};

export default StudentCard;
