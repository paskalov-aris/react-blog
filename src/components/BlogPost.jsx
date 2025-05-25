import { Card, Col } from "react-bootstrap";

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const BlogPost = ({ post }) => {
  return (
    <Col lg={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={post.coverUrl} width={100} height={200} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
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
