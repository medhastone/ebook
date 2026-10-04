import type {Metadata} from 'next';
import {Plus_Jakarta_Sans, DM_Serif_Display} from 'next/font/google';
import './globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Where Did My Salary Go? | The Indian Salary Money Reset Ebook',
  description:
    'A 30-day practical system for Indian salaried professionals (₹15,000–₹1,00,000) to plug hidden money leaks, handle EMIs, and keep ₹8,000–₹25,000 extra every month without sacrificing life.',
  openGraph: {
    title: 'Where Did My Salary Go? | The Indian Salary Money Reset',
    description:
      'Stop wondering where your paycheck vanished by the 5th. Plug silent leaks, tame EMIs, and reset your salary in 30 days.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Did My Salary Go? | The Indian Salary Money Reset',
    description:
      'Stop wondering where your paycheck vanished by the 5th. 30-day practical money guide for Indian professionals.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable}`}>
      <body className="font-sans antialiased bg-[#070D18] text-slate-100 selection:bg-[#E8871E]/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

