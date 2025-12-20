import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "";

async function submitFeedback(payload) {
  const res = await fetch(`${API_BASE}/api/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `Request failed: ${res.status}`);
  }
  return res.json();
}

function PublicFeedback() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    text: "",
    rating: 5,
    customerName: "",
    customerEmail: "",
    product: "",
    channel: "web",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitFeedback({
        ...form,
        rating: Number(form.rating),
        status: "open",
        tags: [],
      });
      setSuccess(true);
      setTimeout(() => {
        setForm({
          text: "",
          rating: 5,
          customerName: "",
          customerEmail: "",
          product: "",
          channel: "web",
        });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Share Your Feedback
          </h1>
          <p className="text-slate-400">
            Help us improve by sharing your experience. Your feedback is automatically analyzed using
            advanced NLP technology.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-2xl">
          {success && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300">
              ✓ Thank you! Your feedback has been submitted and analyzed.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-rose-500/20 border border-rose-500/50 rounded-lg text-rose-300">
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Your Feedback <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="text"
                required
                rows="6"
                value={form.text}
                onChange={handleChange}
                placeholder="Tell us about your experience... (e.g., 'The app is great but sometimes crashes when I checkout')"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <p className="mt-1 text-xs text-slate-400">
                Our AI will automatically analyze sentiment, extract keywords, and detect topics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Rating (1-5) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  name="rating"
                  required
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Product/Service
                </label>
                <input
                  type="text"
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  placeholder="e.g., Mobile App, Website"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Your Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Your Email</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 px-6 font-semibold text-white shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Analyzing & Submitting..." : "Submit Feedback"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-indigo-500 hover:text-indigo-200 transition-colors"
              >
                Admin Login
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              Powered by Machine Learning & Natural Language Processing • Automatic sentiment
              analysis, topic detection, and keyword extraction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicFeedback;

