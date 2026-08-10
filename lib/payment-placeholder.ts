/**
 * ============================================================================
 * SRU PRAGATHI FEST - PAYMENT GATEWAY INTEGRATION PLACEHOLDER
 * ============================================================================
 * Clean placeholder module for the SR University Tech Team to inject
 * production payment gateway credentials (Razorpay, Paytm, Cashfree, PhonePe).
 *
 * TODO for College Dev Team:
 * 1. Add your Payment Gateway API Keys to .env (e.g. RAZORPAY_KEY_ID)
 * 2. Replace `processMockPayment()` with actual Razorpay/Paytm SDK trigger
 * 3. Update verifyPaymentSignature() with HMAC signature validation
 * ============================================================================
 */

export interface PaymentInitParams {
  eventId: string;
  eventName: string;
  amount: number;
  userName: string;
  userEmail: string;
  userPhone?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  paymentMethod: string;
  message: string;
  timestamp: string;
}

export async function processMockPayment(params: PaymentInitParams): Promise<PaymentResult> {
  // Simulate network delay for real gateway redirect/popup experience
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const mockTxnId = `TXN_SRU_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    success: true,
    transactionId: mockTxnId,
    paymentMethod: "UPI / NetBanking (College Test Gateway)",
    message: `Payment of ₹${params.amount} completed successfully for ${params.eventName}.`,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Hook for College Dev Team to verify Webhook/Signature responses
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  // TODO: College Dev Team implement HMAC Verification algorithm here
  // crypto.createHmac('sha256', secret).update(orderId + '|' + paymentId).digest('hex') === signature
  return true;
}
