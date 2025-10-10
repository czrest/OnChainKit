'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { PageTransition } from '@/components/page-transition';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Users, TrendingUp, Calendar } from 'lucide-react';
import { 
    getSurveyById, 
    acceptApplicant, 
    rejectApplicant, 
    openSurveyEarly 
} from '@/lib/survey-contract';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function SurveyManagementPage() {
    const params = useParams();
    const router = useRouter();
    const { address } = useAccount();
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(false);

    const surveyId = params?.id;

    useEffect(() => {
        const loadSurvey = () => {
            if (surveyId) {
                const loadedSurvey = getSurveyById(surveyId);
                if (loadedSurvey) {
                    setSurvey(loadedSurvey);
                }
            }
        };

        loadSurvey();
        const interval = setInterval(loadSurvey, 2000);
        return () => clearInterval(interval);
    }, [surveyId]);

    const handleAccept = async (applicantAddress) => {
        if (!address || !survey) return;

        setLoading(true);
        try {
            await acceptApplicant(survey.id, applicantAddress, address);
            toast.success('Applicant accepted!');
            const updatedSurvey = getSurveyById(survey.id);
            if (updatedSurvey) {
                setSurvey(updatedSurvey);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to accept applicant';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (applicantAddress) => {
        if (!address || !survey) return;

        setLoading(true);
        try {
            await rejectApplicant(survey.id, applicantAddress, address);
            toast.success('Applicant rejected');
            const updatedSurvey = getSurveyById(survey.id);
            if (updatedSurvey) {
                setSurvey(updatedSurvey);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to reject applicant';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenEarly = async () => {
        if (!address || !survey) return;

        setLoading(true);
        try {
            await openSurveyEarly(survey.id, address);
            toast.success('Survey opened early! Accepted respondents can now participate.');
            const updatedSurvey = getSurveyById(survey.id);
            if (updatedSurvey) {
                setSurvey(updatedSurvey);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to open survey';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!survey) {
        return (
            <>
                <Navbar />
                <PageTransition>
                    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
                        <div className="container mx-auto px-4 text-center">
                            <p className="text-muted-foreground">Survey not found</p>
                            <Button onClick={() => router.push('/dashboard')} className="mt-4">
                                Back to Dashboard
                            </Button>
                        </div>
                    </main>
                </PageTransition>
            </>
        );
    }

    if (!address || survey.creator.toLowerCase() !== address.toLowerCase()) {
        return (
            <>
                <Navbar />
                <PageTransition>
                    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
                        <div className="container mx-auto px-4 text-center">
                            <p className="text-muted-foreground">You don't have permission to manage this survey</p>
                            <Button onClick={() => router.push('/dashboard')} className="mt-4">
                                Back to Dashboard
                            </Button>
                        </div>
                    </main>
                </PageTransition>
            </>
        );
    }

    const pendingApplicants = survey.applicants.filter(a => a.status === 'pending');
    const acceptedApplicants = survey.applicants.filter(a => a.status === 'accepted');
    const rejectedApplicants = survey.applicants.filter(a => a.status === 'rejected');
    
    const completionRate = survey.numberOfRespondents 
        ? (survey.responses.length / survey.numberOfRespondents) * 100 
        : 0;

    const deadline = survey.screeningInfo?.deadline 
        ? new Date(survey.screeningInfo.deadline).getTime() 
        : 0;
    const now = Date.now();
    const isScreeningOpen = deadline > now;

    return (
        <>
            <Navbar />
            <PageTransition>
                <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => router.push('/dashboard')}
                                className="mb-6"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>

                            {/* Survey Header */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-3xl mb-2">{survey.title}</CardTitle>
                                            <CardDescription className="text-base">
                                                {survey.description}
                                            </CardDescription>
                                        </div>
                                        {survey.finalized ? (
                                            <Badge variant="secondary" className="text-base py-2 px-4">
                                                Finalized
                                            </Badge>
                                        ) : (
                                            <Badge variant="default" className="text-base py-2 px-4">
                                                Active
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                            </Card>

                            {/* Stats */}
                            <div className="grid md:grid-cols-4 gap-4 mb-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Applicants</p>
                                                <p className="text-3xl font-bold">{survey.applicants.length}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Accepted</p>
                                                <p className="text-3xl font-bold">
                                                    {acceptedApplicants.length}
                                                    {survey.numberOfRespondents && ` / ${survey.numberOfRespondents}`}
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Responses</p>
                                                <p className="text-3xl font-bold">{survey.responses.length}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <TrendingUp className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Completion</p>
                                                <p className="text-3xl font-bold">{completionRate.toFixed(0)}%</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Calendar className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Screening Status */}
                            {survey.respondentType === 'targeted' && (
                                <Card className="mb-6">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold mb-1">Screening Status</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {isScreeningOpen ? 'Accepting applications until ' : 'Application deadline: '}
                                                    {new Date(deadline).toLocaleString()}
                                                </p>
                                            </div>
                                            {!survey.openedEarly && acceptedApplicants.length > 0 && !survey.finalized && (
                                                <Button onClick={handleOpenEarly} disabled={loading}>
                                                    Open Survey Early
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Applicants Management */}
                            <Tabs defaultValue="pending" className="w-full">
                                <TabsList className="w-full md:w-auto">
                                    <TabsTrigger value="pending" className="flex-1 md:flex-none">
                                        Pending ({pendingApplicants.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="accepted" className="flex-1 md:flex-none">
                                        Accepted ({acceptedApplicants.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="rejected" className="flex-1 md:flex-none">
                                        Rejected ({rejectedApplicants.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="pending" className="mt-6">
                                    {pendingApplicants.length > 0 ? (
                                        <div className="space-y-4">
                                            {pendingApplicants.map((applicant, index) => (
                                                <motion.div
                                                    key={applicant.address}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Card>
                                                        <CardContent className="pt-6">
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <p className="font-mono text-sm mb-2">
                                                                        {applicant.address.slice(0, 6)}...{applicant.address.slice(-4)}
                                                                    </p>
                                                                    {applicant.message && (
                                                                        <p className="text-sm text-muted-foreground mb-2">
                                                                            {applicant.message}
                                                                        </p>
                                                                    )}
                                                                    {applicant.selectedSlot && (
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Preferred slot: {applicant.selectedSlot}
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xs text-muted-foreground mt-2">
                                                                        Applied: {new Date(applicant.appliedAt).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        onClick={() => handleAccept(applicant.address)}
                                                                        disabled={loading}
                                                                        size="sm"
                                                                        variant="default"
                                                                    >
                                                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                                                        Accept
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => handleReject(applicant.address)}
                                                                        disabled={loading}
                                                                        size="sm"
                                                                        variant="outline"
                                                                    >
                                                                        <XCircle className="h-4 w-4 mr-1" />
                                                                        Reject
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="pt-12 pb-12 text-center">
                                                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                                <p className="text-muted-foreground">No pending applications</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>

                                <TabsContent value="accepted" className="mt-6">
                                    {acceptedApplicants.length > 0 ? (
                                        <div className="space-y-4">
                                            {acceptedApplicants.map((applicant, index) => (
                                                <motion.div
                                                    key={applicant.address}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Card>
                                                        <CardContent className="pt-6">
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <p className="font-mono text-sm mb-2">
                                                                        {applicant.address.slice(0, 6)}...{applicant.address.slice(-4)}
                                                                    </p>
                                                                    {applicant.message && (
                                                                        <p className="text-sm text-muted-foreground mb-2">
                                                                            {applicant.message}
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xs text-muted-foreground mt-2">
                                                                        Accepted: {new Date(applicant.appliedAt).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                                <Badge variant="default" className="bg-green-500">
                                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                                    Accepted
                                                                </Badge>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="pt-12 pb-12 text-center">
                                                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                                <p className="text-muted-foreground">No accepted applicants yet</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>

                                <TabsContent value="rejected" className="mt-6">
                                    {rejectedApplicants.length > 0 ? (
                                        <div className="space-y-4">
                                            {rejectedApplicants.map((applicant, index) => (
                                                <motion.div
                                                    key={applicant.address}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Card>
                                                        <CardContent className="pt-6">
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <p className="font-mono text-sm mb-2">
                                                                        {applicant.address.slice(0, 6)}...{applicant.address.slice(-4)}
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground mt-2">
                                                                        Applied: {new Date(applicant.appliedAt).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                                <Badge variant="destructive">
                                                                    <XCircle className="h-3 w-3 mr-1" />
                                                                    Rejected
                                                                </Badge>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="pt-12 pb-12 text-center">
                                                <p className="text-muted-foreground">No rejected applicants</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </div>
                </main>
            </PageTransition>
        </>
    );
}
