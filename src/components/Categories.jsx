import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Categories = ({ categories }) => (
  <ListGroup horizontal className="mb-4 justify-content-center">
    {categories.map((category) => (
      <ListGroup.Item key={category.key}>
        <Link
          className="text-decoration-none text-dark"
          to={`/posts/${category.key}`}
        >
          {category.name}
        </Link>
      </ListGroup.Item>
    ))}
  </ListGroup>
);
