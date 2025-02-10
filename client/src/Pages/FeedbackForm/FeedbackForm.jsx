import { useContext, useState } from "react";
import { AuthContext } from "../../Components/context/AuthProvider";

const FeedbackForm = () => {
  const [category, setCategory] = useState("General");
  const [feedback, setFeedback] = useState("");
  const [file, setFile] = useState(null);
  const { authUser } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure user is authenticated
    if (!authUser || !authUser.id) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", authUser.id); // Send UserId from AuthContext
    formData.append("note", feedback);
    formData.append("remarks", category);
    if (file) {
      formData.append("file", file); // Include file if provided
    }

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback. Please try again.");
      }

      alert("Feedback submitted successfully!");
      // Reset form fields
      setFeedback("");
      setCategory("General");
      setFile(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback.");
    }
  };

  return (
    <div className="min-w-full min-h-screen w-full flex justify-center bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-xl font-bold text-center text-green-800 mb-4">
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="General">General</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* File Attachment */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Attachment</label>
            <input
              type="file"
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded cursor-pointer focus:outline-none"
              onChange={handleFileChange}
            />
            <p className="text-gray-500 text-sm mt-1">
              {file ? file.name : "No file chosen"}
            </p>
          </div>

          {/* Feedback Textarea */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              rows="4"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white font-medium py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
