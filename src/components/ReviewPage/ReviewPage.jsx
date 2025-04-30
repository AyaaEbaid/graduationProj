import React, { useEffect, useState } from "react";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newReview, setNewReview] = useState({
    id: "",
    reviewerName: "",
    rating: "",
    comment: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // Load reviews from localStorage
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
  }, []);

  // Save reviews to localStorage whenever reviews state changes
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }
  }, [reviews]);

  const handleSaveReview = () => {
    if (!newReview.reviewerName || !newReview.rating || !newReview.comment) return;

    let updatedReviews;

    if (editingReview) {
      // Update the existing review
      updatedReviews = reviews.map((review) =>
        review.id === editingReview.id
          ? { ...newReview, id: editingReview.id }
          : review
      );
    } else {
      // Add a new review
      updatedReviews = [...reviews, { ...newReview, id: Date.now().toString() }];
    }

    setReviews(updatedReviews);
    setNewReview({ id: "", reviewerName: "", rating: "", comment: "" });
    setEditingReview(null);
    setIsModalOpen(false);
  };

  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const handleEditReview = (review) => {
    setNewReview(review);
    setEditingReview(review);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews Management</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Reviews..."
        className="border p-2 rounded mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Review Button */}
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setNewReview({ id: "", reviewerName: "", rating: "", comment: "" });
          setEditingReview(null);
          setIsModalOpen(true);
        }}
      >
        + Add Review
      </button>

      {/* Reviews Table for screens larger than sm */}
      <div className="hidden sm:block mt-4">
        <table className="min-w-full text-center bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Reviewer Name</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Comment</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews
              .filter((review) =>
                review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((review) => (
                <tr key={review.id} className="border">
                  <td className="border p-2">{review.id}</td>
                  <td className="border p-2">{review.reviewerName}</td>
                  <td className="border p-2">{review.rating}</td>
                  <td className="border p-2">{review.comment}</td>
                  <td className="border justify-center p-2 flex gap-2">
                    <button
                      className="bg-blue-700 text-white px-3 py-1 rounded"
                      onClick={() => handleEditReview(review)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Reviews Cards for screens smaller than sm */}
      <div className="sm:hidden mt-4 grid grid-cols-1 gap-6">
        {reviews
          .filter((review) =>
            review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((review) => (
            <div key={review.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md overflow-hidden max-w-full">
              <div className="text-xl font-bold text-black mb-2 break-words">ID: {review.id}</div>
              <div className="text-xl font-semibold text-black mb-2 break-words">Reviewer: {review.reviewerName}</div>
              <div className="mb-2 break-words">
                <strong>Rating:</strong> {review.rating}
              </div>
              <div className="mb-2 break-words">
                <strong>Comment:</strong> {review.comment}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={() => handleEditReview(review)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for Add/Edit Review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editingReview ? "Edit Review" : "Add New Review"}
            </h3>
            <input
              type="text"
              placeholder="Reviewer Name"
              className="border p-2 rounded w-full mb-2"
              value={newReview.reviewerName}
              onChange={(e) =>
                setNewReview({ ...newReview, reviewerName: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              className="border p-2 rounded w-full mb-2"
              value={newReview.rating}
              min="1"
              max="5"
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
            />
            <textarea
              placeholder="Comment"
              className="border p-2 rounded w-full mb-2"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-600 text-white px-3 py-1 rounded"
                onClick={handleSaveReview}
              >
                {editingReview ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
