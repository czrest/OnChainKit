"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, AlertCircle, FileText, Lock, Info } from "lucide-react";
import Link from "next/link";

export default function RespondentTermsDialog({ open, onAccept, onCancel }) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onAccept();
      setAccepted(false);
    }
  };

  const handleCancel = () => {
    setAccepted(false);
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
            Survey Participant Terms & Conditions
          </DialogTitle>
          <DialogDescription>
            Please read and accept the terms before participating in this survey
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6 text-sm">
            {/* Participation Agreement */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-base">
                  1. Participation Agreement
                </h3>
              </div>
              <p className="text-gray-400 pl-7">
                By participating in this survey, you agree to provide honest and
                accurate responses to all questions. Your responses will be
                recorded on the blockchain and associated with your wallet
                address.
              </p>
            </div>

            {/* Data Collection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-base">
                  2. Data Collection & Usage
                </h3>
              </div>
              <p className="text-gray-400 pl-7">
                Your survey responses, wallet address, and participation
                timestamp will be stored on-chain. The survey creator will have
                access to view your responses once the survey is finalized. Your
                data may be used for research, analysis, or other purposes as
                specified by the survey creator.
              </p>
            </div>

            {/* Reward Distribution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <h3 className="font-semibold text-base">
                  3. Reward Distribution
                </h3>
              </div>
              <p className="text-gray-400 pl-7">
                You will receive your ETH reward only after the survey creator
                finalizes the survey. The reward amount is divided equally among
                all respondents. There is no guarantee of when the survey will
                be finalized, and rewards may be subject to blockchain
                transaction delays.
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-base">
                  4. Privacy & Anonymity
                </h3>
              </div>
              <p className="text-gray-400 pl-7">
                While your responses are associated with your wallet address, we
                do not collect personal identifying information unless you
                voluntarily provide it in your responses. All data is stored on
                the blockchain and is publicly viewable by the survey creator.
              </p>
            </div>

            {/* Response Finality */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <h3 className="font-semibold text-base">
                  5. Response Finality
                </h3>
              </div>
              <p className="text-gray-400 pl-7">
                Once you submit your survey responses, they cannot be edited or
                deleted. Please review your answers carefully before submission.
                Your participation is voluntary, and you may choose not to
                answer optional questions.
              </p>
            </div>

            {/* Blockchain Risks */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <h3 className="font-semibold text-base">
                  6. Blockchain & Smart Contract Risks
                </h3>
              </div>
              <p className="text-gray-400 pl-7">
                This survey operates on blockchain technology and involves smart
                contracts. You acknowledge and accept the risks associated with
                blockchain transactions, including but not limited to: network
                congestion, gas fees, smart contract vulnerabilities, and
                potential loss of funds.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-base">
                  7. Dispute Resolution
                </h3>
              </div>
              <p className="text-gray-400 pl-7">
                Any disputes arising from your participation in this survey
                should be resolved directly with the survey creator. We are not
                responsible for disputes between participants and creators
                regarding survey content, rewards, or data usage.
              </p>
            </div>

            {/* Legal Disclaimer */}
            <div className="space-y-2 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <h3 className="font-semibold text-base">
                  Important Legal Notice
                </h3>
              </div>
              <p className="text-gray-400 text-xs">
                By accepting these terms, you acknowledge that you have read,
                understood, and agree to be bound by all conditions outlined
                above. You also confirm that you are of legal age to participate
                and that your participation complies with all applicable laws in
                your jurisdiction.
              </p>
            </div>

            {/* Full Policies */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-400 text-xs">
                For complete details, please review our{" "}
                <Link
                  href="/terms"
                  className="text-emerald-400 hover:underline"
                  target="_blank"
                >
                  Terms of Service
                </Link>
                ,{" "}
                <Link
                  href="/privacy"
                  className="text-emerald-400 hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                , and{" "}
                <Link
                  href="/cookies"
                  className="text-emerald-400 hover:underline"
                  target="_blank"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Checkbox
              id="accept-respondent-terms"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(!!checked)}
            />
            <Label
              htmlFor="accept-respondent-terms"
              className="text-sm cursor-pointer leading-tight"
            >
              I have read and accept the terms and conditions
            </Label>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!accepted}
              className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
            >
              Accept & Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
