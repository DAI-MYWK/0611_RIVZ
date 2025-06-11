import type React from "react"
import type { Metadata } from "next"
import { M_PLUS_Rounded_1c } from "next/font/google"
import "./globals.css"

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-m-plus-rounded",
})

export const metadata: Metadata = {
  title: "合同会社RIVZ - 遺品整理×不動産相談×ブランド買取",
  description: "想いを整え、価値に変え、未来へつなぐ。大阪市北区の遺品整理・不動産相談・ブランド買取サービス。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${mPlusRounded.variable}`}>
      <body>{children}</body>
    </html>
  )
}
