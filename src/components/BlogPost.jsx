import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";

export const BlogPost = ({ post }) => {
  const pathToPost = `/post/${post.id}`;

  return (
    <Col lg={4} className="mb-4">
      <Card>
        <Link to={pathToPost}>
          <Card.Img
            variant="top"
            src={post.coverUrl}
            width={100}
            height={200}
          />
        </Link>
        <Card.Body>
          <Link to={pathToPost} className="text-decoration-none text-dark">
            <Card.Title>
              {post.title}
            </Card.Title>
          </Link>
          <Card.Text>{post.content}</Card.Text>
          {post.createdAt && (
            <Card.Footer className="text-muted small">
              {formatDate(post.createdAt)}
            </Card.Footer>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};
