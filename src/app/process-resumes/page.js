"use client";

import { useState } from "react";
import {
  Bot,
  UploadCloud,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Star,
  TrendingUp,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function EnhancedProcessResumesPage() {
  const [jobDetails, setJobDetails] = useState({
    job_title: "",
    department: "",
    job_description: "",
    required_skills: "",
    preferred_skills: "",
    min_experience: "",
    min_match_threshold: 50,
  });
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();

    // 1. Construct and append job_details JSON
    const jobDetailsPayload = {
      ...jobDetails,
      required_skills: jobDetails.required_skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      preferred_skills: jobDetails.preferred_skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      min_experience: parseFloat(jobDetails.min_experience),
      min_match_threshold: parseInt(jobDetails.min_match_threshold, 10),
    };
    formData.append("job_details", JSON.stringify(jobDetailsPayload));

    // 2. Append files
    files.forEach((file) => {
      formData.append("files", file);
    });

    // 3. Send to API
    try {
      const response = await fetch("https://two1-hackathon-python-agent-langgraph.onrender.com/process-resumes", {
        method: "POST",
        body: formData,
      });

      const resultData = await response.json();

      if (!response.ok) {
        const errorDetail = resultData.detail
          ? typeof resultData.detail === "string"
            ? resultData.detail
            : JSON.stringify(resultData.detail)
          : "An unknown error occurred.";
        throw new Error(`API Error (${response.status}): ${errorDetail}`);
      }

      setResults(resultData.data);
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">
              TalentFlow Pro
            </span>
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <main>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                    1. Job Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <InputField
                      id="job_title"
                      label="Job Title"
                      value={jobDetails.job_title}
                      onChange={handleInputChange}
                      placeholder="e.g., Full-Stack Developer"
                      required
                    />
                    <InputField
                      id="department"
                      label="Department"
                      value={jobDetails.department}
                      onChange={handleInputChange}
                      placeholder="e.g., Engineering"
                    />
                    <div className="md:col-span-2">
                      <label
                        htmlFor="job_description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Description
                      </label>
                      <textarea
                        id="job_description"
                        rows="4"
                        value={jobDetails.job_description}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Describe the role and responsibilities..."
                      ></textarea>
                    </div>
                    <InputField
                      id="required_skills"
                      label="Required Skills (comma-separated)"
                      value={jobDetails.required_skills}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2"
                      placeholder="e.g., Python, Django, React, AWS"
                    />
                    <InputField
                      id="preferred_skills"
                      label="Preferred Skills (comma-separated)"
                      value={jobDetails.preferred_skills}
                      onChange={handleInputChange}
                      className="md:col-span-2"
                      placeholder="e.g., TypeScript, Kubernetes"
                    />
                    <InputField
                      id="min_experience"
                      label="Minimum Experience (Years)"
                      type="number"
                      step="0.1"
                      value={jobDetails.min_experience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 3.5"
                    />
                    <InputField
                      id="min_match_threshold"
                      label="Min Match Threshold (%)"
                      type="number"
                      step="1"
                      value={jobDetails.min_match_threshold}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                    2. Upload Resumes
                  </h2>
                  <div className="mt-4">
                    <label
                      htmlFor="files"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Files (.pdf, .docx, .zip)
                    </label>
                    <input
                      type="file"
                      id="files"
                      onChange={handleFileChange}
                      multiple
                      accept=".pdf,.docx,.zip"
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <div className="mt-2 text-sm text-gray-600">
                      {files.length > 0
                        ? `${files.length} file(s) selected.`
                        : "No files chosen."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  ) : (
                    <UploadCloud className="-ml-1 mr-3 h-5 w-5" />
                  )}
                  {isLoading ? "Processing..." : "Process & Rank Resumes"}
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="mt-10">
            {error && <ErrorMessage message={error} />}
            {results && <EnhancedResultsDisplay data={results} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper Components
const InputField = ({ id, label, className, ...props }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6"
    role="alert"
  >
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const EnhancedResultsDisplay = ({ data }) => {
  const summary = data.processing_summary || {};
  const candidateTiers = data.candidate_tiers || {};
  const rankedCandidates = data.all_candidates || [];
  const qualifiedCandidates = data.qualified_candidates || [];

  return (
    <div className="space-y-8">
      {/* Enhanced Summary Dashboard */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between border-b pb-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-indigo-600" />
            Processing Dashboard
          </h2>
          <div className="text-sm text-gray-500">Job: {data.job_title}</div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            value={`${summary.successful_processing || 0}/${
              summary.total_resumes_submitted || 0
            }`}
            label="Processed"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            value={summary.qualified_candidates || 0}
            label="Qualified"
            color="text-green-600"
            bgColor="bg-green-50"
            icon={<Target className="h-5 w-5" />}
          />
          <MetricCard
            value={`${summary.highest_score || 0}%`}
            label="Top Score"
            color="text-purple-600"
            bgColor="bg-purple-50"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            value={data.emails_sent || 0}
            label="Invites Sent"
            color="text-blue-600"
            bgColor="bg-blue-50"
            icon={<Trophy className="h-5 w-5" />}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <StatCard
            label="Qualification Rate"
            value={`${summary.qualification_rate || 0}%`}
            subtext="of processed candidates"
          />
          <StatCard
            label="Average Score"
            value={`${summary.average_match_score || 0}%`}
            subtext="across all candidates"
          />
          <StatCard
            label="Skill Coverage"
            value={`${summary.skill_coverage_percentage || 0}%`}
            subtext="of required skills covered"
          />
        </div>

        {/* Top Candidate Highlight */}
        {summary.top_candidate && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-yellow-600 mr-2" />
              <div>
                <h3 className="font-bold text-gray-800">Top Candidate</h3>
                <p className="text-sm text-gray-600">
                  <strong>{summary.top_candidate.name}</strong> -{" "}
                  {summary.top_candidate.score}% match (
                  {summary.top_candidate.tier})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recruiter Recommendations */}
        {summary.recruiter_recommendations &&
          summary.recruiter_recommendations.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">
                Recruiter Recommendations
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {summary.recruiter_recommendations.map(
                  (recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {recommendation}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
      </div>

      {/* Candidate Tiers */}
      {Object.keys(candidateTiers).length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
            Candidates by Tier
          </h2>
          <div className="space-y-4">
            {Object.entries(candidateTiers).map(([tier, candidates]) => (
              <TierSection key={tier} tier={tier} candidates={candidates} />
            ))}
          </div>
        </div>
      )}

      {/* Top Qualified Candidates */}
      {qualifiedCandidates.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between border-b pb-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Star className="h-6 w-6 mr-2 text-green-600" />
              Qualified Candidates ({qualifiedCandidates.length})
            </h2>
            <div className="text-sm text-gray-500">Sorted by match score</div>
          </div>
          <div className="space-y-4">
            {qualifiedCandidates.map((candidate, index) => (
              <RankedCandidateCard
                key={index}
                candidate={candidate}
                isQualified={true}
                showRank={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Candidates Ranking */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between border-b pb-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Award className="h-6 w-6 mr-2 text-indigo-600" />
            Complete Ranking ({rankedCandidates.length})
          </h2>
          <div className="text-sm text-gray-500">All processed candidates</div>
        </div>
        <div className="space-y-4">
          {rankedCandidates.map((candidate, index) => (
            <RankedCandidateCard
              key={index}
              candidate={candidate}
              isQualified={candidate.is_qualified}
              showRank={true}
              showPercentile={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({
  value,
  label,
  color = "text-indigo-600",
  bgColor = "bg-indigo-50",
  icon,
}) => (
  <div className={`p-4 ${bgColor} rounded-lg text-center`}>
    <div className={`flex justify-center items-center mb-2 ${color}`}>
      {icon}
    </div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const StatCard = ({ label, value, subtext }) => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <p className="text-lg font-bold text-gray-800">{value}</p>
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <p className="text-xs text-gray-500">{subtext}</p>
  </div>
);

const TierSection = ({ tier, candidates }) => {
  const getTierIcon = (tier) => {
    switch (tier) {
      case "Excellent Match":
        return <Trophy className="h-5 w-5 text-yellow-600" />;
      case "Very Good Match":
        return <Medal className="h-5 w-5 text-silver-600" />;
      case "Good Match":
        return <Award className="h-5 w-5 text-orange-600" />;
      case "Fair Match":
        return <Star className="h-5 w-5 text-blue-600" />;
      default:
        return <Users className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "Excellent Match":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "Very Good Match":
        return "bg-green-50 border-green-200 text-green-800";
      case "Good Match":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "Fair Match":
        return "bg-orange-50 border-orange-200 text-orange-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getTierColor(tier)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {getTierIcon(tier)}
          <h3 className="font-bold ml-2">{tier}</h3>
        </div>
        <span className="text-sm font-medium">
          {candidates.length} candidate{candidates.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid gap-2">
        {candidates.slice(0, 3).map((candidate, index) => (
          <div key={index} className="text-sm">
            <strong>{candidate.candidate_name}</strong> -{" "}
            {candidate.overall_match_score}%
            {candidate.rank_position && ` (Rank #${candidate.rank_position})`}
          </div>
        ))}
        {candidates.length > 3 && (
          <div className="text-sm italic">
            +{candidates.length - 3} more candidates...
          </div>
        )}
      </div>
    </div>
  );
};

const RankedCandidateCard = ({
  candidate,
  isQualified,
  showRank = false,
  showPercentile = false,
}) => {
  const qualificationClass = isQualified
    ? "border-green-500"
    : "border-gray-300";
  const qualificationBg = isQualified ? "bg-green-50" : "bg-gray-50";

  const getRankIcon = (position) => {
    if (position === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (position === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (position === 3) return <Award className="h-5 w-5 text-orange-500" />;
    return <span className="text-sm font-bold text-gray-600">#{position}</span>;
  };

  return (
    <div
      className={`${qualificationBg} p-4 rounded-lg border-l-4 ${qualificationClass}`}
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Left section - Candidate Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {showRank && candidate.rank_position && (
              <div className="flex items-center">
                {getRankIcon(candidate.rank_position)}
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                {candidate.candidate_name || "N/A"}
              </h3>
              <p className="text-sm text-gray-600">
                {candidate.candidate_email || "No email found"}
              </p>
              {candidate.candidate_role && (
                <p className="text-sm text-gray-500 font-medium">
                  {candidate.candidate_role}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right section - Scores and Status */}
        <div className="flex items-center gap-4">
          {/* Scores */}
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">
              {candidate.overall_match_score?.toFixed(1) || 0}%
            </p>
            <p className="text-xs text-gray-500">Overall Score</p>
          </div>

          {/* Tier Badge */}
          <div className="text-center">
            <TierBadge tier={candidate.ranking_tier} />
            {showPercentile && candidate.percentile_rank && (
              <p className="text-xs text-gray-500 mt-1">
                Top {candidate.percentile_rank}%
              </p>
            )}
          </div>

          {/* Qualification Status */}
          <div>
            {isQualified ? (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-200">
                Qualified
              </span>
            ) : (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-red-700 bg-red-200">
                Not Qualified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detailed breakdown */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Required Skills:</span>
              <span className="font-medium">
                {candidate.required_skill_score}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Preferred Skills:</span>
              <span className="font-medium">
                {candidate.preferred_skill_score}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-medium">
                {candidate.candidate_experience} years
                {candidate.meets_experience_requirement ? " ✅" : " ❌"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-600 mb-1">
            <strong>Matched Skills:</strong>
          </p>
          <div className="flex flex-wrap gap-1">
            {candidate.matched_required_skills?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
              >
                {skill}
              </span>
            ))}
            {candidate.matched_preferred_skills?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter Summary */}
      {candidate.recruiter_summary && (
        <div className="mt-4 p-3 bg-white border border-gray-200 rounded text-sm">
          <strong className="text-gray-700">AI Analysis:</strong>
          <p className="text-gray-600 mt-1">{candidate.recruiter_summary}</p>
        </div>
      )}
    </div>
  );
};

const TierBadge = ({ tier }) => {
  const getTierStyle = (tier) => {
    switch (tier) {
      case "Excellent Match":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Very Good Match":
        return "bg-green-100 text-green-800 border-green-300";
      case "Good Match":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Fair Match":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "Minimal Match":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold border rounded-full ${getTierStyle(
        tier
      )}`}
    >
      {tier}
    </span>
  );
};

