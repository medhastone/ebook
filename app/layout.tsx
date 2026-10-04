import type {Metadata} from 'next';
import {Plus_Jakarta_Sans, DM_Serif_Display} from 'next/font/google';
import Script from 'next/script';
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
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4497135493888106');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-[#070D18] text-slate-100 selection:bg-[#E8871E]/30 selection:text-white" suppressHydrationWarning>
        {/* Meta Pixel Noscript Fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4497135493888106&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
