import { Button, Card } from "react-bootstrap";
import { formatDateWithTime } from "../utils/date";

export const Reviews = ({ reviews, onEditReview, onDeleteReview }) => {
  return reviews.map((review) => {
    const handleEditButtonClick = () => {
      const newText = prompt("Введіть новий текст");
      if (newText) {
        onEditReview(review.id, newText);
      }
    };

    const handleDeleteButtonClick = () => {
      onDeleteReview(review.id);
    };

    return (
      <Card key={review.id} className="p-2 w-50 mb-4">
        <div className="d-flex justify-content-between">
          <Card.Text className="fw-bold mb-1">Коментар {review.id}</Card.Text>
          <p>{formatDateWithTime(review.createdAt)}</p>
        </div>
        <Card.Text>{review.text}</Card.Text>
        <div className="d-flex">
          <Button
            onClick={handleEditButtonClick}
            className="d-block"
            style={{ marginRight: 10 }}
          >
            Редагувати
          </Button>
          <Button
            onClick={handleDeleteButtonClick}
            className="d-block"
            variant="danger"
          >
            Вилучити
          </Button>
        </div>
      </Card>
    );
  });
};
