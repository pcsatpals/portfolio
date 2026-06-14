import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Preahvihear } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import CustomCursor from "@/components/animation/custom-cursor";
import SessionProvider from "@/providers/next-auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import Script from "next/script";

const preahvihearSans = Preahvihear({
    variable: "--font-preahvihear-sans",
    subsets: ["latin"],
    weight: ["400"]
});

const geistMono = Plus_Jakarta_Sans({
    variable: "--font-jakarta-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Satpal Singh - Software Developer",
    icons: {
        icon: "/favicon.ico"
    },
    description: "A showcase of my work as a software developer, focused on creating reliable, accessible, and impactful digital products.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${preahvihearSans.variable} ${geistMono.variable} antialiased no-scrollbar`}
            >
                <QueryProvider>
                    <CustomCursor />
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                    <ToastContainer theme="dark" position="bottom-right" />
                </QueryProvider>
                <Script id="tawk-to" strategy="afterInteractive">
                    {`
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                    s1.async=true;
                    s1.src='https://embed.tawk.to/6a2e48339e8aac1f4526f018/1jr2di3eq';
                    s1.charset='UTF-8';
                    s1.setAttribute('crossorigin','*');
                    s0.parentNode.insertBefore(s1,s0);
                    })();
                    `}
                </Script>
            </body>
        </html>
    );
}
