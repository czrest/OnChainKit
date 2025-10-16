'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react'

export default function ApplicationsTab({ applications }) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">You haven&apos;t applied to any surveys yet</p>
        <Link href="/surveys">
          <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600">
            Browse Surveys
          </Button>
        </Link>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-emerald-500/30 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Accepted
          </span>
        )
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        )
      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        )
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {applications.map(({ survey, applicant }) => (
        <div
          key={`${survey.id}-${applicant.address}`}
          className="group p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {survey.description}
              </p>
            </div>
            {getStatusBadge(applicant.status)}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              Applied: {new Date(applicant.appliedAt).toLocaleDateString()}
            </div>
            {applicant.preferredSlot && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Preferred: {new Date(applicant.preferredSlot).toLocaleString()}
              </div>
            )}
          </div>

          {applicant.message && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400 italic">&quot;{applicant.message}&quot;</p>
            </div>
          )}

          <Link href={`/surveys/${survey.id}`}>
            <Button
              variant="outline"
              className="w-full border-white/10 hover:border-emerald-500/50"
            >
              View Survey
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
