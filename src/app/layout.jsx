import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import cn from '@/lib/clsx/cn';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TechNest',
  description: 'In this website you will able to get all kind of electronic products of your choice such as PC, Laptop, Tablet, Mobile, Headphone, Keybord, Mouse, PC Parts from AMD, Intel, Nvidia and much more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/Logos/techNestLogo.JPG" />
      </Head>
      <body className={cn(inter.className)}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
