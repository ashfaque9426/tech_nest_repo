import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TechNest',
  description: 'In this website you will able to get all kind of electronic products of your choice such as PC, Laptop, Tablet, Mobile, Headphone, Keybord, Mouse, PC Parts from AMD, Intel, Nvidia and much more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
