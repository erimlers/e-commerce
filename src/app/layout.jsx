import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-calder-serif",
});

const sans = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-calder-sans",
});

export const metadata = {
  title: "CALDER",
  description: "Unisex deri objeler.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${serif.variable} ${sans.variable} bg-paper text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
