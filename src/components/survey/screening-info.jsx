"use client";

import { MapPin, Video, Calendar, Clock } from "lucide-react";

export default function ScreeningInfo({ survey }) {
  return (
    <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-lime-500/10 rounded-lg border border-emerald-500/20 mb-8">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
        Screening Information
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Process Description</h3>
          <p className="text-gray-400">{survey.screeningDescription}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Requirements</h3>
          <p className="text-gray-400">{survey.screeningRequirements}</p>
        </div>

        {survey.meetingLink && (
          <div className="flex items-start gap-3">
            <Video className="w-5 h-5 text-emerald-400 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Meeting Link</h3>
              <a
                href={survey.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-lime-400 underline"
              >
                {survey.meetingLink}
              </a>
            </div>
          </div>
        )}

        {survey.physicalLocation && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Physical Location</h3>
              <p className="text-gray-400">{survey.physicalLocation}</p>
            </div>
          </div>
        )}

        {survey.allowFlexibleScheduling && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-emerald-400 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
              <p className="text-gray-400">
                You can choose your preferred time slot when applying
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-emerald-400 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Application Deadline</h3>
            <p className="text-gray-400">
              {survey.screeningInfo?.applicationDeadline
                ? new Date(
                    survey.screeningInfo.applicationDeadline
                  ).toLocaleString()
                : "Not set"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
