"use client";
import { Main } from "../pages/Form/main"; // Adjust the import path as necessary
import { Detail } from "../pages/Form/detail";
import { useEffect, useState } from "react";
import "../styles/styles.scss";

export default function Home() {
  const [formDetailData, setFormDetailData] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("formDetailData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormDetailData(parsedData);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-24">
      <div className="z-10 w-full max-w-5xl rounded-lg bg-white p-8 shadow-lg lg:flex-col lg:flex lg:items-center lg:justify-between lg:p-12">
        <div className="mb-6 lg:mb-0 lg:w-1/2">
          <div className="flex justify-center mb-4">
            <img
              src="/images/logo-nr.png"
              alt="PERTAMINA NUSANTARA REGAS Logo"
            />
          </div>
          <h2 className="text-center text-2xl font-bold mb-6">Daily Report</h2>

          <details className="question py-4 border-b border-grey-lighter">
            <summary className="flex items-center font-bold">
              Data Kapal
              <button className="ml-auto">
                <svg
                  className="fill-current opacity-75 w-4 h-4 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
              </button>
            </summary>
            <Main />
          </details>

          <details className="question py-4 border-b border-grey-lighter">
            <summary className="flex items-center font-bold">
              Data Kegiatan
              <button className="ml-auto">
                <svg
                  className="fill-current opacity-75 w-4 h-4 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
              </button>
            </summary>
            <Detail />
          </details>
        </div>
      </div>
    </main>
  );
}
