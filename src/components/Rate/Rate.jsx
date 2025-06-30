import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RatingPage() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState("add");
  const [rating, setRating] = useState(0); // فاضي بالبداية
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // عرض مبدئي

  const getScoreLabel = (value) => {
    switch (value) {
      case 5:
        return "Excellent";
      case 4:
        return "Good";
      case 3:
        return "Fair";
      case 2:
        return "Bad";
      default:
        return "VeryBad";
    }
  };

  const getStarCount = (score) => {
    switch (score) {
      case "Excellent":
        return 5;
      case "Good":
        return 4;
      case "Fair":
        return 3;
      case "Bad":
        return 2;
      case "VeryBad":
        return 1;
      default:
        return 0;
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://hanshatabhalak.runasp.net/api/AppRating/get all rating ?language=${i18n.language}`
      );

      const data = res.data?.data?.$values || [];
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setComments(sorted);
    } catch (err) {
      console.error("❌ Error fetching rating:", err);
      toast.error(err.response?.data?.message || t("ratingPage.load_failed"));
    }
  };

  useEffect(() => {
    if (tab === "view") {
      fetchComments();
    }
  }, [tab, i18n.language]);

  const handleSubmit = async () => {
    if (rating === 0 || !feedback.trim()) {
      toast.error(t("ratingPage.error"));
      return;
    }

    try {
      setLoading(true);
      const payload = {
        score: getScoreLabel(rating),
        comment: feedback,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(
        `https://hanshatabhalak.runasp.net/api/AppRating/RateApp?language=${i18n.language}`,
        payload
      );

      toast.success(response.data.message);
      setFeedback("");
      setRating(0);
      setTab("view");
      fetchComments();
    } catch (error) {
      console.error("❌ Submit error:", error);
      toast.error(error.response?.data?.message || t("ratingPage.submit_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border border-gray-300 ${
        i18n.dir() === "rtl" ? "text-right" : "text-left"
      }`}
      dir={i18n.dir()}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={i18n.dir() === "rtl"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setTab("add")}
          className={`px-6 py-2 text-lg font-semibold border ${
            tab === "add"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700"
          } ${i18n.dir() === "rtl" ? "rounded-e-lg" : "rounded-s-lg"}`}
        >
          {t("ratingPage.add_title")}
        </button>
        <button
          onClick={() => setTab("view")}
          className={`px-6 py-2 text-lg font-semibold border ${
            tab === "view"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700"
          } ${i18n.dir() === "rtl" ? "rounded-s-lg" : "rounded-e-lg"}`}
        >
          {t("ratingPage.view_title")}
        </button>
      </div>

      {tab === "add" && (
        <div>
          <p className="text-center text-xl text-gray-700 mb-4">
            {rating > 0
              ? t(`ratingPage.${getScoreLabel(rating).toLowerCase()}`)
              : t("ratingPage.choose_stars")}
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 text-lg mb-4 focus:ring-2 focus:ring-teal-600 outline-none"
            placeholder={t("ratingPage.placeholder")}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600"
            }`}
          >
            {loading ? t("ratingPage.loading") : t("ratingPage.submit")}
          </button>
        </div>
      )}

      {tab === "view" && (
        <div>
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              {t("ratingPage.no_comments")}
            </p>
          ) : (
            <div className="space-y-4">
              {comments.slice(0, visibleCount).map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(getStarCount(item.score))].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{item.comment}"</p>
                  <p className="text-sm text-gray-400 text-end">
                    {new Date(item.createdAt).toLocaleDateString(i18n.language)}
                  </p>
                </div>
              ))}
              {visibleCount < comments.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm"
                  >
                    {t("ratingPage.load_more")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
