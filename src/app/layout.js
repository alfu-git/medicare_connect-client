import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/Footer";
import "animate.css";
import { Toaster } from "react-hot-toast";
import { getUserFromDB } from "@/lib/helpers/get-user";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink_sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediCare-Connect",
  description:
    "MediCare Connect is a modern healthcare management platform that connects patients with doctors and hospitals through a centralized online system. Patients can book appointments, manage medical records, make payments, and receive healthcare services efficiently.Doctors can manage schedules, appointments, and patient consultations, while administrators can oversee the entire healthcare ecosystem.",
};

export default async function RootLayout({ children }) {
  const userFromDB = await getUserFromDB();
  
  return (
    <html lang="en" className={`${rethinkSans.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Navbar userFromDB={userFromDB} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
