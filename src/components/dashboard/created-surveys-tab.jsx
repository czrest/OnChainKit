'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Settings, Coins, Users } from 'lucide-react'
import StatusBadge from '../status-badge'

export default function CreatedSurveysTab({ surveys }) {
  if (surveys.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">You haven&apos;t created any surveys yet</p>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600">
            Create Your First Survey
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {surveys.map((survey) => (
        <div
          key={survey.id}
          className="group p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {survey.description}
              </p>
            </div>
            <StatusBadge survey={survey} />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">{survey.reward} ETH</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">
                {survey.responses.length}/{survey.numberOfRespondents}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/surveys/${survey.id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-white/10 hover:border-emerald-500/50"
              >
                View Survey
              </Button>
            </Link>
            <Link href={`/dashboard/surveys/${survey.id}`}>
              <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600">
                <Settings className="w-4 h-4 mr-2" />
                Manage Applicants
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
