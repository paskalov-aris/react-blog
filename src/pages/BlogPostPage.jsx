import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSinglePost } from "../hooks/useSinglePost";
import { Rating } from "react-simple-star-rating";
import { Reviews } from "../components/Reviews";

export const BlogPostPage = () => {
  const { postId } = useParams();
  const { post } = useSinglePost(postId);

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = () => {
    const newReview = {
      id: reviews?.length ? reviews[reviews.length - 1].id + 1 : 1,
      text: reviewText,
      createdAt: new Date().toISOString(),
    };

    setReviews([...reviews, newReview]);
    setReviewText("");
  };

  const handleEditReview = (reviewId, newText) => {
    const foundReview = reviews.find((review) => review.id === reviewId);

    const updatedReview = {
      ...foundReview,
      text: newText,
    }

    const updatedReviews = reviews.map((review) =>
      review.id === reviewId ? updatedReview : review
    );

    setReviews(updatedReviews);
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);

    setReviews(updatedReviews);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col lg={7}>
          <div className="d-flex justify-content-center mb-4">
            <Button className="d-block">
              <Link to="/" className="text-light text-decoration-none">
                Назад
              </Link>
            </Button>
          </div>
          <img
            src={post?.coverUrl}
            alt={post?.title}
            width={300}
            height={300}
          />
          <h2>{post?.title}</h2>
          <p className="mb-4">{post?.text}</p>
          <div>
            <p className="text-black fw-bold">Оцініть цю публікацію:</p>
            <Rating className="mb-2" />
            <Form>
              <Form.Group controlId="review">
                <Form.Control
                  as="textarea"
                  type="text"
                  rows={5}
                  name="review"
                  placeholder="Enter your review"
                  value={reviewText}
                  onChange={handleReviewTextChange}
                  className="mb-2 w-100"
                />
              </Form.Group>
              <Button
                onClick={handleSubmitReview}
                disabled={!reviewText.length}
                className="mb-4"
              >
                Залишити відгук
              </Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
              <Reviews reviews={reviews} onEditReview={handleEditReview} onDeleteReview={handleDeleteReview} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
