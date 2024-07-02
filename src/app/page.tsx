"use client";
import React from "react";
import Head from "next/head";
import SearchDropdown from "./components/searchDropdown";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="A simple weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center h-screen bg-white">
        <SearchDropdown />
      </div>
    </div>
  );
}
