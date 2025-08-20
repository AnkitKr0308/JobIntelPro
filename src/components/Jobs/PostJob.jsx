import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../templates/Input";
import { CreateJob } from "../../store/jobSlice";

function PostJob() {
  const errorFromStore = useSelector((state) => state.auth.error);
  const [error, setError] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");

  const inputFields = [
    { id: "title", label: "Title", required: true, placeholder: "Enter Title" },
    {
      id: "description",
      label: "Job Description",
      required: true,
      placeholder: "Enter Job Description",
      type: "text-area",
    },
    { id: "country", label: "Country" },
    { id: "city", label: "City" },
    { id: "company", label: "Company" },
    { id: "workType", label: "Work Type" },
    { id: "experience", label: "Experience" },
    { id: "batch", label: "Batch" },
    { id: "degree", label: "Qualifications" },
    { id: "applyURL", label: "Application URL" },
    { id: "skills", label: "Skills Required", required: true },
    {
      id: "companyDescription",
      label: "Company Description",
      type: "text-area",
    },
    { id: "salary", label: "Salary" },
    { id: "responsibilities", label: "Responsibilities", type: "text-area" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const postJobFunction = async () => {
    const payload = { ...formData, isActive: true };

    const result = await dispatch(CreateJob(payload));

    if (result.payload?.success) {
      setFormData({});
      setError("");
      setSuccess(`Job "${result.payload.data.title}" posted successfully! ✅`);
      setTimeout(() => setSuccess(""), 6000);
    } else {
      setError(result.payload?.message || "Error posting job");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 border-t-4 border-purple-500">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
          Post a Job
        </h2>

        {(error || errorFromStore) && (
          <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-lg shadow-sm text-center">
            {error || errorFromStore}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 mb-6 rounded-lg shadow-sm text-center">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <Input
            fields={inputFields}
            onChange={handleChange}
            formData={formData}
          />

          <button
            type="button"
            disabled={loading}
            onClick={postJobFunction}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Posting Job..." : "Post Job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
