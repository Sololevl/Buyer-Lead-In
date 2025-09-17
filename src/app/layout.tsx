import type { Metadata } from "next";
import {AuthProvider} from "./providers/AuthProvider"



export const metadata: Metadata = {
  title: "Buyers Lead Intake App",
  description: "welcome to esahayak",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>    
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
