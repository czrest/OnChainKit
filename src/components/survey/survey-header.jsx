"use client";

import { Calendar, Coins, Users } from "lucide-react";
import StatusBadge from "../status-badge";

export default function SurveyHeader({ survey }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
          {survey.title}
        </h1>
        <StatusBadge survey={survey} />
      </div>

      <p className="text-gray-400 text-lg mb-6">{survey.description}</p>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-500/20 to-lime-500/20 rounded-lg border border-emerald-500/30">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-lg">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Reward Pool</div>
            <div className="font-semibold">{survey.reward} ETH</div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-500/20 to-lime-500/20 rounded-lg border border-emerald-500/30">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Target Respondents</div>
            <div className="font-semibold">
              {survey.responses.length} / {survey.numberOfRespondents}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-500/20 to-lime-500/20 rounded-lg border border-emerald-500/30">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Application Deadline</div>
            <div className="font-semibold">
              {survey.screeningInfo?.applicationDeadline
                ? new Date(
                    survey.screeningInfo.applicationDeadline
                  ).toLocaleDateString()
                : "Not set"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
