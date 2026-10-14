import type { Metadata } from "next"

import { ProductPage } from "@/components/product-page"

export const metadata: Metadata = {
  title: "Product",
  description:
    "Six Honeycomb agents, each built on your floor with your team, trained on your data, and running inside the systems you already use.",
}

export default function Page() {
  return <ProductPage />
}
