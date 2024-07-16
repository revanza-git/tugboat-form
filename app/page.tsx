"use client";
import { Main } from "../pages/Form/main"; // Adjust the import path as necessary
import { Detail } from "../pages/Form/detail";
import "../styles/styles.scss";
import { Fuel } from "@/pages/Form/fuel";
import { Running } from "@/pages/Form/running";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Tank } from "@/pages/Form/tank";
import { RefreshProvider } from "@/contexts/refreshContext";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleKirimClick = () => {
    setIsSubmitting(true);
    const storedData = localStorage.getItem("formData");
    const storedDataDetail = localStorage.getItem("formDataDetail");
    const storedDataFuel = localStorage.getItem("formDataFuel");
    const storedDataRunning = localStorage.getItem("formDataRunning");
    const storedDataTankActivity = localStorage.getItem("formDataTankActivity");
    if (
      storedData &&
      storedDataDetail &&
      storedDataFuel &&
      storedDataRunning &&
      storedDataTankActivity
    ) {
      const parsedData = {
        formData: JSON.parse(storedData),
        formDataDetail: JSON.parse(storedDataDetail),
        formDataFuel: JSON.parse(storedDataFuel),
        formDataRunning: JSON.parse(storedDataRunning),
        formDataTankActivity: JSON.parse(storedDataTankActivity),
      };

      // Call the dummy API with parsedData as payload
      fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        })
        .then(() => {
          setModalMessage("Send succeeded");
          setModalIsOpen(true);
          setIsSubmitting(false);
          setTimeout(() => window.location.reload(), 2000); // Adjust the delay as needed
        })
        .catch(() => {
          setModalMessage("Send failed, try again");
          setModalIsOpen(true);
          setIsSubmitting(false);
        });
    } else {
      setModalMessage("Please fills all the form first");
      setModalIsOpen(true);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    localStorage.clear();
    Modal.setAppElement("body");
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const center = scrollHeight / 2 - windowHeight / 2;
    window.scrollTo({
      top: center,
      behavior: "smooth",
    });
  }, []);

  return (
    <RefreshProvider value={{ refresh, setRefresh }}>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-24">
        <div className="z-10 w-full max-w-5xl rounded-lg bg-white p-8 shadow-lg lg:flex-col lg:flex lg:items-center lg:justify-between lg:p-12">
          <div className="mb-6 lg:mb-0 lg:w-1/2">
            <div className="flex justify-center mb-4">
              <img
                src="/images/logo-nr.png"
                alt="PERTAMINA NUSANTARA REGAS Logo"
              />
            </div>
            <h2 className="text-center text-2xl font-bold mb-6">
              <p className="black-text">Daily Report</p>
            </h2>

            <details className="question py-4 border-b border-grey-lighter">
              <summary className="flex items-center font-bold">
                <p className="black-text">Data Kapal</p>
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
                <p className="black-text">Data Kegiatan</p>
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

            <details className="question py-4 border-b border-grey-lighter">
              <summary className="flex items-center font-bold">
                <p className="black-text">Bahan Bakar</p>
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
              <Fuel />
            </details>

            <details className="question py-4 border-b border-grey-lighter">
              <summary className="flex items-center font-bold">
                <p className="black-text">Running Hour</p>
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
              <Running />
            </details>

            <details className="question py-4 border-b border-grey-lighter">
              <summary className="flex items-center font-bold">
                <p className="black-text">Sounding Tanki & Kapasitas</p>
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
              <Tank />
            </details>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded"
              onClick={handleKirimClick}
            >
              {isSubmitting ? "Loading..." : "Kirim"}
            </button>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Message Modal"
          style={{
            overlay: {
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              transition: "opacity 0.2s ease-in-out", // Add transition effect
            },
            content: {
              width: "300px",
              height: "200px",
              margin: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "#fff",
              color: "#000",
              transition: "all 0.3s ease-in-out", // Add transition effect
            },
          }}
        >
          <h2>{modalMessage}</h2>
          <button
            onClick={() => setModalIsOpen(false)}
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </Modal>
      </main>
    </RefreshProvider>
  );
}
