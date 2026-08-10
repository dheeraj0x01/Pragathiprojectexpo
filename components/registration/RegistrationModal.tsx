'use client';

import React, { useState } from 'react';
import { X, Users, CheckCircle2, Ticket, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, CreditCard, Building2, Code, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventItem, User } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { PaymentGatewayModal } from './PaymentGatewayModal';

interface RegistrationModalProps {
  isOpen: boolean;
  event: EventItem | null;
  currentUser: User;
  onClose: () => void;
  onSuccess: (newRegistration: any) => void;
}

export function RegistrationModal({
  isOpen,
  event,
  currentUser,
  onClose,
  onSuccess,
}: RegistrationModalProps) {
  // Step state: 1: Personal, 2: Team, 3: Project, 4: Review & Payment, 5: Success
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields State
  const [personalDetails, setPersonalDetails] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    college: currentUser.college || 'SR University',
    department: currentUser.department || 'Computer Science & Engineering',
    rollNo: currentUser.rollNo || '2203A51000',
  });

  const [teamDetails, setTeamDetails] = useState({
    teamName: '',
    members: [{ name: '', email: '', rollNo: '' }],
  });

  const [projectDetails, setProjectDetails] = useState({
    projectTitle: '',
    category: event?.category || 'TECHNICAL',
    abstract: '',
    techStack: '',
    githubUrl: '',
    demoUrl: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'COLLEGE_TEAM' | 'ONLINE_GATEWAY'>('COLLEGE_TEAM');
  const [showPaymentGatewayModal, setShowPaymentGatewayModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<any | null>(null);

  if (!isOpen || !event) return null;

  const isTeamEvent = event.maxTeamSize > 1;

  const handleAddMember = () => {
    if (teamDetails.members.length < event.maxTeamSize - 1) {
      setTeamDetails({
        ...teamDetails,
        members: [...teamDetails.members, { name: '', email: '', rollNo: '' }],
      });
    }
  };

  const handleMemberChange = (idx: number, field: string, value: string) => {
    const updatedMembers = [...teamDetails.members];
    updatedMembers[idx] = { ...updatedMembers[idx], [field]: value };
    setTeamDetails({ ...teamDetails, members: updatedMembers });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!personalDetails.name || !personalDetails.email || !personalDetails.phone || !personalDetails.college) {
        alert('Please complete all required personal details.');
        return;
      }
    }
    if (currentStep === 2 && isTeamEvent) {
      if (!teamDetails.teamName) {
        alert('Please enter your Team Name.');
        return;
      }
    }
    if (currentStep === 3) {
      if (!projectDetails.projectTitle || !projectDetails.abstract) {
        alert('Please enter Project Title and Abstract.');
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = async (txnId?: string) => {
    setIsSubmitting(true);
    try {
      const payload = {
        eventId: event.id,
        userId: currentUser.id,
        user: personalDetails,
        teamName: isTeamEvent ? teamDetails.teamName : undefined,
        teamMembers: isTeamEvent ? [personalDetails.name, ...teamDetails.members.map(m => m.name).filter(Boolean)] : undefined,
        projectDetails,
        paymentStatus: paymentMethod === 'COLLEGE_TEAM' ? 'CONFIRMED' : 'MOCK_PAID',
        paymentTxnId: txnId || `SRU_TEAM_WAIVER_${Date.now()}`,
      };

      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setCreatedTicket(data.data);
        setCurrentStep(5); // Move to Success Pass Step
        onSuccess(data.data);
      }
    } catch (err) {
      console.error(err);
      alert('Registration processing failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
          
          {/* Header & Step Indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-sru-blue text-white uppercase">
                  Step {currentStep} of 5
                </span>
                <span className="text-xs font-semibold text-slate-500">{event.title}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Team Details & Members'}
                {currentStep === 3 && 'Project Abstract & Links'}
                {currentStep === 4 && 'Review & Payment Selection'}
                {currentStep === 5 && 'Registration Confirmed!'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-1.5 pb-2">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div
                key={stepNum}
                className={`h-1.5 rounded-full transition-all ${
                  stepNum <= currentStep ? 'bg-sru-blue' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* STEP 1: PERSONAL DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">College / Institution *</label>
                  <input
                    type="text"
                    required
                    value={personalDetails.college}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, college: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Department / Branch</label>
                  <input
                    type="text"
                    value={personalDetails.department}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Roll / Student ID Number</label>
                  <input
                    type="text"
                    value={personalDetails.rollNo}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, rollNo: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TEAM DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              {isTeamEvent ? (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Team Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SRU Innovations Lab"
                      value={teamDetails.teamName}
                      onChange={(e) => setTeamDetails({ ...teamDetails, teamName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-800 dark:text-slate-200">Additional Team Members</label>
                      <span className="text-[11px] font-semibold text-slate-500">Max {event.maxTeamSize} members</span>
                    </div>

                    {teamDetails.members.map((mem, idx) => (
                      <div key={idx} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-2">
                        <span className="font-bold text-[11px] text-sru-blue">Member {idx + 2}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={mem.name}
                            onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={mem.email}
                            onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="Roll No"
                            value={mem.rollNo}
                            onChange={(e) => handleMemberChange(idx, 'rollNo', e.target.value)}
                            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                          />
                        </div>
                      </div>
                    ))}

                    {teamDetails.members.length < event.maxTeamSize - 1 && (
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="text-xs font-bold text-sru-blue hover:underline"
                      >
                        + Add Another Team Member
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-slate-800 text-center space-y-2">
                  <Users className="w-8 h-8 text-sru-blue mx-auto" />
                  <h4 className="font-bold text-slate-900 dark:text-white">Individual Track Event</h4>
                  <p className="text-slate-500">This category is designed for individual student entries. No additional team members required.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PROJECT DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Project / Solution Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI-Powered Smart Irrigation for Telangana Farmers"
                  value={projectDetails.projectTitle}
                  onChange={(e) => setProjectDetails({ ...projectDetails, projectTitle: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Problem Statement & Abstract *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief description of the problem solved, proposed technology, and key innovation..."
                  value={projectDetails.abstract}
                  onChange={(e) => setProjectDetails({ ...projectDetails, abstract: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Tech Stack / Hardware Used</label>
                  <input
                    type="text"
                    placeholder="e.g. Python, TensorFlow, ESP32, React"
                    value={projectDetails.techStack}
                    onChange={(e) => setProjectDetails({ ...projectDetails, techStack: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">GitHub Repository URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/team/project"
                    value={projectDetails.githubUrl}
                    onChange={(e) => setProjectDetails({ ...projectDetails, githubUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PAYMENT METHOD */}
          {currentStep === 4 && (
            <div className="space-y-5 text-xs">
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{event.title}</span>
                  <span className="font-bold text-sru-blue">Fee: {event.registrationFee > 0 ? formatCurrency(event.registrationFee) : 'FREE'}</span>
                </div>
                <div className="text-slate-500 space-y-1">
                  <p><strong>Lead Participant:</strong> {personalDetails.name} ({personalDetails.email})</p>
                  <p><strong>College:</strong> {personalDetails.college}</p>
                  {isTeamEvent && <p><strong>Team:</strong> {teamDetails.teamName || 'N/A'}</p>}
                  <p><strong>Project:</strong> {projectDetails.projectTitle || 'N/A'}</p>
                </div>
              </div>

              {/* Payment Gateway Option */}
              <div className="space-y-3">
                <label className="font-bold text-slate-800 dark:text-slate-200">Select Registration Payment Option</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: SRU College Team Exemption */}
                  <div
                    onClick={() => setPaymentMethod('COLLEGE_TEAM')}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'COLLEGE_TEAM'
                        ? 'border-sru-blue bg-sru-sky dark:bg-slate-800 ring-2 ring-sru-blue'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-sru-blue" />
                      <div>
                        <span className="block font-bold text-slate-900 dark:text-white">College Team Exemption</span>
                        <span className="text-[11px] text-slate-500">SRU Sponsored / College Pass</span>
                      </div>
                    </div>
                  </div>

                  {/* Option B: Online Payment Gateway Placeholder */}
                  <div
                    onClick={() => setPaymentMethod('ONLINE_GATEWAY')}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'ONLINE_GATEWAY'
                        ? 'border-sru-blue bg-sru-sky dark:bg-slate-800 ring-2 ring-sru-blue'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-sru-blue" />
                      <div>
                        <span className="block font-bold text-slate-900 dark:text-white">UPI / Gateway Check</span>
                        <span className="text-[11px] text-slate-500">GPay, PhonePe, Card Test Gateway</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS & DIGITAL TICKET */}
          {currentStep === 5 && createdTicket && (
            <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Registration Confirmed!</h3>
                <p className="text-xs text-slate-500">Your entry ticket pass for PRAGATHI 2K26 has been issued.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-center space-y-1">
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest">TICKET CODE PASS</span>
                <span className="text-xl font-black text-sru-blue">{createdTicket.ticketCode || 'PRG-2026-SRU88'}</span>
              </div>
            </div>
          )}

          {/* Navigation Controls Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            {currentStep > 1 && currentStep < 5 ? (
              <Button type="button" variant="outline" onClick={handlePrevStep} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            ) : <div />}

            <div className="flex items-center gap-3">
              {currentStep < 4 && (
                <Button type="button" variant="primary" onClick={handleNextStep} className="gap-1.5">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {currentStep === 4 && (
                <Button
                  type="button"
                  variant="primary"
                  isLoading={isSubmitting}
                  onClick={() => {
                    if (paymentMethod === 'ONLINE_GATEWAY') {
                      setShowPaymentGatewayModal(true);
                    } else {
                      handleFinalSubmit();
                    }
                  }}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Registration</span>
                </Button>
              )}

              {currentStep === 5 && (
                <Button type="button" variant="primary" onClick={onClose}>
                  Done & View My Pass
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Online Gateway Integration Modal */}
      <PaymentGatewayModal
        isOpen={showPaymentGatewayModal}
        eventName={event.title}
        amount={event.registrationFee}
        userName={personalDetails.name}
        userEmail={personalDetails.email}
        onPaymentSuccess={(txnId) => {
          setShowPaymentGatewayModal(false);
          handleFinalSubmit(txnId);
        }}
        onCancel={() => setShowPaymentGatewayModal(false)}
      />
    </>
  );
}
