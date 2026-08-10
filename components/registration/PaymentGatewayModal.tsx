'use client';

import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { processMockPayment } from '@/lib/payment-placeholder';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  eventName: string;
  amount: number;
  userName: string;
  userEmail: string;
  onPaymentSuccess: (txnId: string) => void;
  onCancel: () => void;
}

export function PaymentGatewayModal({
  isOpen,
  eventName,
  amount,
  userName,
  userEmail,
  onPaymentSuccess,
  onCancel,
}: PaymentGatewayModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'NET_BANKING' | 'CARD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayNow = async () => {
    setIsProcessing(true);
    try {
      // Calls payment placeholder module (Ready for Razorpay / Paytm SDK)
      const res = await processMockPayment({
        eventId: 'evt_dynamic',
        eventName,
        amount,
        userName,
        userEmail,
      });

      if (res.success) {
        onPaymentSuccess(res.transactionId);
      }
    } catch (err) {
      console.error('Payment Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sru-blue/10 text-sru-blue flex items-center justify-center border border-sru-blue/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Secure Checkout</h3>
              <p className="text-xs text-slate-500">SRU Payment Gateway Slot</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-900">
            <Lock className="w-3 h-3" />
            <span>256-bit SSL</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Event Registration</span>
            <span className="font-semibold text-slate-900 dark:text-white">{eventName}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Participant Name</span>
            <span className="font-semibold text-slate-900 dark:text-white">{userName}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 dark:text-white">Total Amount</span>
            <span className="text-lg font-black text-sru-blue dark:text-blue-400">
              {amount > 0 ? formatCurrency(amount) : 'FREE'}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        {amount > 0 && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('UPI')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  selectedMethod === 'UPI'
                    ? 'border-sru-blue bg-sru-blue/10 text-sru-blue'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                GPay / PhonePe (UPI)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('CARD')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  selectedMethod === 'CARD'
                    ? 'border-sru-blue bg-sru-blue/10 text-sru-blue'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                Debit / Credit Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('NET_BANKING')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  selectedMethod === 'NET_BANKING'
                    ? 'border-sru-blue bg-sru-blue/10 text-sru-blue'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                NetBanking
              </button>
            </div>
          </div>
        )}

        {/* College Integration Notice */}
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-800 dark:text-blue-300 font-medium">
          💡 <strong>College Dev Integration Hook:</strong> This payment placeholder allows the SRU college team to attach Razorpay/Cashfree/Paytm API SDK keys in <code className="font-mono">/lib/payment-placeholder.ts</code> seamlessly.
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePayNow} isLoading={isProcessing} className="gap-2">
            <span>Pay & Confirm Pass</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
