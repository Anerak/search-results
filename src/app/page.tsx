
import React from "react";

import { getSailings } from "@/app/data/sailings";
import Sidebar from "@/app/ui/sidebar/Sidebar";
import SearchResults from "@/app/ui/results/SearchResults";
import { processFilters } from "@/app/utils/utils";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const baseSailings = await getSailings(process.env.SAILINGS_API || '');
  const params = await searchParams;
  const sailings = processFilters(baseSailings, params);

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <Sidebar />
      <SearchResults sailings={sailings} />
    </div>
  );
}
