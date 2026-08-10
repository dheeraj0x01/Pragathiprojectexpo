import QRCode from 'qrcode';

export async function generateQRCodeDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
      color: {
        dark: '#15549A', // SRU Royal Blue QR module color
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('Failed to generate QR Code:', err);
    return '';
  }
}

export function generateTicketCode(eventId: string, userId: string): string {
  const prefix = "SRU-PRG26";
  const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${eventId.substring(0, 4).toUpperCase()}-${randomHex}`;
}
