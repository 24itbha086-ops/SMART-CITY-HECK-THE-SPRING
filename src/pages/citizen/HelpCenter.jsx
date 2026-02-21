import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ_ITEMS = [
  {
    question: "How do I report an issue?",
    answer:
      "Go to the 'Report Issue' page from your dashboard. Fill in the details about the issue including location, category, and description. You can also upload photos to help describe the problem.",
  },
  {
    question: "How long does it take to resolve an issue?",
    answer:
      "Resolution time varies depending on the complexity of the issue and the department responsible. Most issues are acknowledged within 24-48 hours, and resolved within 7-14 days.",
  },
  {
    question: "Can I track my reported issues?",
    answer:
      "Yes! Go to 'My Issues' to see all your reported issues and their current status. You'll also receive notifications when there are updates.",
  },
  {
    question: "What types of issues can I report?",
    answer:
      "You can report various civic issues including road repairs, street lights, waste management, water supply, public safety, and environmental concerns.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team via email at support@citytransparency.gov or call our helpline at 1800-CITY-HELP (Mon-Fri, 9 AM - 6 PM).",
  },
];

export default function HelpCenter() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Help Center</h1>
        <p className="mt-1 text-sm text-slate-600">
          Find answers to common questions and get support
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/citizen/report-issue"
          className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <span className="material-symbols-outlined text-blue-600">add_circle</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Report an Issue</h3>
            <p className="text-sm text-slate-600">Submit a new civic complaint</p>
          </div>
        </Link>
        <Link
          to="/citizen/my-issues"
          className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <span className="material-symbols-outlined text-green-600">list_alt</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Track Issues</h3>
            <p className="text-sm text-slate-600">View your reported issues</p>
          </div>
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border-b border-slate-100 last:border-b-0">
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="font-medium text-slate-900">{item.question}</span>
                <span className="material-symbols-outlined text-slate-400">
                  {expandedIndex === index ? "expand_less" : "expand_more"}
                </span>
              </button>
              {expandedIndex === index && (
                <div className="pb-4 text-sm text-slate-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Contact Support</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500">mail</span>
            <div>
              <p className="text-sm font-medium text-slate-900">Email Support</p>
              <a
                href="mailto:support@citytransparency.gov"
                className="text-sm text-blue-600 hover:underline"
              >
                support@citytransparency.gov
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500">phone</span>
            <div>
              <p className="text-sm font-medium text-slate-900">Phone Support</p>
              <p className="text-sm text-slate-600">1800-CITY-HELP (Mon-Fri, 9 AM - 6 PM)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500">location_on</span>
            <div>
              <p className="text-sm font-medium text-slate-900">Office Address</p>
              <p className="text-sm text-slate-600">
                City Hall, 123 Main Street, Downtown District
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
