/**
 * ============================================================================
 * SRU PRAGATHI - PAYMENT SERVICE PLACEHOLDER
 * ============================================================================
 * Empty service class holding payment gateway methods for college dev team.
 * ============================================================================
 */
export class PaymentPlaceholderService {
  /**
   * TODO: College Dev Team implement Razorpay / Paytm Order creation
   */
  static async createPaymentOrder(amount: number, currency: string = "INR") {
    // Return mock order object
    return {
      orderId: `ORDER_SRU_${Date.now()}`,
      amount: amount * 100, // in paise
      currency,
      status: "CREATED",
      gateway: "COLLEGE_MOCK_PAYMENT_GATEWAY",
    };
  }

  /**
   * TODO: College Dev Team implement Payment Verification Webhook Handler
   */
  static async handlePaymentWebhook(payload: any) {
    console.log("[PAYMENT_WEBHOOK_PLACEHOLDER] Received gateway payload:", payload);
    return { received: true, status: "PROCESSED" };
  }
}
