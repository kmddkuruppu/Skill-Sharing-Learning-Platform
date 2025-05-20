import { useState } from "react";
import { X } from "lucide-react";

const SkillContentModal = ({ isOpen, onClose, skill }) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  if (!isOpen || !skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
              {skill.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{skill.title}</h2>
              <p className="text-gray-600">{skill.subtitle}</p>
            </div>
          </div>

          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 ${
                selectedTab === "overview"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 ${
                selectedTab === "examples"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("examples")}
            >
              Examples
            </button>
            <button
              className={`px-4 py-2 ${
                selectedTab === "usage"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("usage")}
            >
              Usage
            </button>
          </div>

          <div>
            {selectedTab === "overview" && (
              <div className="space-y-4">
                <p className="text-gray-800">{skill.description}</p>
                {skill.capabilities && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Capabilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {skill.capabilities.map((capability, index) => (
                        <li key={index} className="text-gray-800">
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {skill.limitations && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Limitations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {skill.limitations.map((limitation, index) => (
                        <li key={index} className="text-gray-800">
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {selectedTab === "examples" && (
              <div className="space-y-6">
                {skill.examples?.map((example, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">{example.title}</h3>
                    <div className="p-3 bg-gray-100 rounded mb-3 text-gray-800 whitespace-pre-wrap">
                      {example.prompt}
                    </div>
                    {example.response && (
                      <div className="p-3 bg-blue-50 rounded text-gray-800 whitespace-pre-wrap">
                        {example.response}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedTab === "usage" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-2">How to use</h3>
                <p className="text-gray-800">{skill.howToUse}</p>
                {skill.tips && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Tips</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {skill.tips.map((tip, index) => (
                        <li key={index} className="text-gray-800">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillContentModal;