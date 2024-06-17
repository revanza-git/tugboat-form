"use client";
import * as React from "react";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import RefreshContext from "@/contexts/refreshContext";

interface IFormInput {
  "first-name": string;
  "tanggal-kegiatan": string;
  namaKapal: string;
  "kegiatan-kapal": string;
  posisi: string;
}

export const Main: React.FC = () => {
  const { setRefresh } = useContext(RefreshContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const [isSubmitted, setIsSubmitted] = React.useState(false); // Track submission status

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("formData", JSON.stringify(data));
    setIsSubmitted(true); // Set submission status to true
    setRefresh(true);
  };

  return (
    <div className="bg-white p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Tanggal Kegiatan</span>
            <input
              {...register("tanggal-kegiatan", {
                required: true,
              })}
              aria-invalid={errors["tanggal-kegiatan"] ? "true" : "false"}
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
            />
          </label>
          {errors["tanggal-kegiatan"] && (
            <p role="alert">{errors["tanggal-kegiatan"]?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Nama Kapal</span>

            <select
              {...register("namaKapal", {
                required: "Please select an item in the list.",
              })}
              aria-invalid={errors["namaKapal"] ? "true" : "false"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable select if form is submitted
              // Update selectedShip when an option is selected
            >
              <option value="4201">Patra Tunda 4201</option>
              <option value="4202">Patra Tunda 4202</option>
              <option value="aqua">Aqua Harbour</option>
            </select>

            {errors["namaKapal"] && (
              <p role="alert">{errors["namaKapal"]?.message}</p>
            )}
          </label>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Kegiatan Kapal</span>
            <input
              {...register("kegiatan-kapal", {
                required: "Please fill in this field.",
              })}
              aria-invalid={errors["kegiatan-kapal"] ? "true" : "false"}
              placeholder="Type Here..."
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
            />
          </label>
          {errors["kegiatan-kapal"] && (
            <p role="alert" className="text-red-500 text-xs italic">
              {errors["kegiatan-kapal"]?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Posisi</span>
            <select
              {...register("posisi", {
                required: "Please select an item in the list.",
              })}
              aria-invalid={errors["posisi"] ? "true" : "false"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable select if form is submitted
            >
              <option value="Nusantara Regas">Nusantara Regas</option>
            </select>
            {errors["posisi"] && (
              <p role="alert">{errors["posisi"]?.message}</p>
            )}
          </label>
        </div>

        <div className="flex justify-end">
          {" "}
          {/* Modified */}
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted} // Disable button if submitting or already submitted
            className={`text-white ${
              isSubmitted
                ? "bg-gray-500"
                : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
            } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
          {isSubmitted && (
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                localStorage.removeItem("formData");
                setRefresh(true);
              }}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
