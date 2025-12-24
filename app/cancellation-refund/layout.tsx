import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Request - Niwas Nest',
  description: 'Submit a cancellation or refund request for your booking. Easy process with quick resolution within 2-3 business days.',
};

export default function CancellationRefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}