"use client";
import { useState } from "react";
import { Sprout, AlertCircle } from "lucide-react";

const questionsData = {
  en: [
    { question: "What is your age?", type: "number" },
    { question: "What is your annual income (in INR)?", type: "number" },
    { question: "What is the size of your land (in acres)?", type: "number" },
    {
      question: "What crops do you grow?",
      type: "select",
      options: ["Rice", "Wheat", "Sugarcane", "Cotton", "Fruits", "General"],
    },
  ],
  ta: [
    { question: "உங்கள் வயது என்ன?", type: "number" },
    { question: "உங்கள் ஆண்டு வருமானம் (INR-இல்)?", type: "number" },
    { question: "உங்கள் நிலத்தின் அளவு (ஏக்கரில்)?", type: "number" },
    {
      question: "நீங்கள் எதை பயிரிடுகிறீர்கள்?",
      type: "select",
      options: [
        "அரிசி",
        "மகம்",
        "சர்க்கரை கம்பி",
        "பருத்தி",
        "பழங்கள்",
        "பொது",
      ],
    },
  ],
};

const schemes = [
  {
    name: "PM Kisan",
    description: "INR 6000 per year for small and marginal farmers.",
    minLand: 0,
    maxIncome: 150000,
    ageLimit: 60,
    link: "https://pmkisan.gov.in/",
  },
  {
    name: "NABARD Scheme",
    description: "Low-interest loans for farmers.",
    minLand: 1,
    maxIncome: 500000,
    ageLimit: 65,
    link: "https://www.nabard.org/",
  },
  {
    name: "Agricultural Infrastructure Fund",
    description: "Financial support for building agri-infrastructure.",
    minLand: 2,
    maxIncome: 1000000,
    ageLimit: 65,
    link: "https://agriinfra.dac.gov.in/",
  },
];

const fieldKeys = ["age", "income", "land", "crop"] as const;
type FieldKey = (typeof fieldKeys)[number];

type FormErrors = Partial<Record<FieldKey, string>>;

const getErrorMessages = (language: "en" | "ta") => ({
  required: language === "en" ? "This field is required" : "இந்த தகவல் தேவை",
  invalidAge:
    language === "en"
      ? "Age must be between 18 and 70"
      : "வயது 18 முதல் 70 வரை இருக்க வேண்டும்",
  invalidIncome:
    language === "en"
      ? "Income must be greater than 0"
      : "வருமானம் 0ஐ விட அதிகமாக இருக்க வேண்டும்",
  invalidLand:
    language === "en"
      ? "Land size must be greater than 0"
      : "நிலத்தின் அளவு 0ஐ விட அதிகமாக இருக்க வேண்டும்",
});

type FormData = {
  age: string;
  income: string;
  land: string;
  crop: string;
};

export default function Page() {
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [formData, setFormData] = useState<FormData>({
    age: "",
    income: "",
    land: "",
    crop: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [results, setResults] = useState<typeof schemes>([]);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const errorMessages = getErrorMessages(language);

    if (
      !formData.age ||
      Number(formData.age) < 18 ||
      Number(formData.age) > 70
    ) {
      newErrors.age = errorMessages.invalidAge;
    }
    if (!formData.income || Number(formData.income) <= 0) {
      newErrors.income = errorMessages.invalidIncome;
    }
    if (!formData.land || Number(formData.land) <= 0) {
      newErrors.land = errorMessages.invalidLand;
    }
    if (!formData.crop) {
      newErrors.crop = errorMessages.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const eligible = schemes.filter((s) => {
      const meetsAgeCriteria =
        Number(formData.age) <= s.ageLimit && Number(formData.age) >= 18;
      const meetsIncomeCriteria = Number(formData.income) <= s.maxIncome;
      const meetsLandCriteria = Number(formData.land) >= s.minLand;

      return meetsAgeCriteria && meetsIncomeCriteria && meetsLandCriteria;
    });

    setTimeout(() => {
      setResults(eligible);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ age: "", income: "", land: "", crop: "" });
    setErrors({});
    setResults([]);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-emerald-100 to-green-50">
      <div className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8">
              <h1 className="text-3xl font-bold text-white text-center">
                Farmer Loan Eligibility Checker
              </h1>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    language === "en"
                      ? "bg-white text-green-700"
                      : "bg-green-700/20 text-white"
                  }`}
                  onClick={() => setLanguage("en")}
                >
                  English
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    language === "ta"
                      ? "bg-white text-green-700"
                      : "bg-green-700/20 text-white"
                  }`}
                  onClick={() => setLanguage("ta")}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {questionsData[language].map((q, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {q.question}
                  </label>
                  {q.type === "number" ? (
                    <input
                      type="number"
                      value={formData[fieldKeys[i] as keyof FormData]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [fieldKeys[i]]: e.target.value,
                        })
                      }
                      className={`w-full p-3 border rounded-lg transition-colors ${
                        errors[fieldKeys[i]]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 focus:border-green-500"
                      }`}
                    />
                  ) : (
                    <select
                      value={formData.crop}
                      onChange={(e) =>
                        setFormData({ ...formData, crop: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500"
                    >
                      <option value="">-- Select --</option>
                      {q.options?.map((opt, j) => (
                        <option key={j} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors[fieldKeys[i]] && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors[fieldKeys[i]]}</span>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-colors"
                >
                  Check Eligibility
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>

            {loading && (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid mx-auto mb-4" />
                <p className="text-xl">Finding best schemes...</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-6 p-6">
                <h2 className="text-2xl font-bold text-center text-green-700">
                  Eligible Schemes
                </h2>
                {results.map((scheme, i) => (
                  <div
                    key={i}
                    className="p-4 bg-green-100 border-l-4 border-green-600 rounded-md shadow"
                  >
                    <h3 className="text-xl font-semibold">{scheme.name}</h3>
                    <p className="mb-2">{scheme.description}</p>
                    {scheme.link && (
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-800 underline"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                ))}
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Restart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-green-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">FarmLife</span>
          </div>
          <span className="text-sm text-green-700">
            © 2025 FarmLife. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
