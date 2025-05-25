import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Categories = ({ categories, activeCategoryKey }) => (
  <ListGroup horizontal className="mb-4 justify-content-center">
    {categories.map((category) => (
      <ListGroup.Item
        key={category.key}
        className={activeCategoryKey === category.key ? "active" : ""}
      >
        <Link
          className={`text-decoration-none ${
            activeCategoryKey === category.key ? "text-light" : "text-dark"
          }`}
          to={`/posts/${category.key}`}
        >
          {category.name}
        </Link>
      </ListGroup.Item>
    ))}
  </ListGroup>
);
