"use client";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  "rob-laporan": string;
  "rob-kegiatan": string;
  pengisian: string;
}

export const Fuel: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const [isSubmitted, setIsSubmitted] = React.useState(false); // Track submission status

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("formDataFuel", JSON.stringify(data));
    setIsSubmitted(true); // Set submission status to true
  };

  return (
    <div className="bg-white p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Rob Laporan (Liter)*</span>
            <input
              {...register("rob-laporan", {
                required: "Please fill in this field.",
              })}
              aria-invalid={errors["rob-laporan"] ? "true" : "false"}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
              defaultValue="0"
            />
          </label>
          {errors["rob-laporan"] && (
            <p role="alert" className="text-red-500 text-xs italic">
              {errors["rob-laporan"]?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Rob Hari Kegiatan (Liter)*</span>
            <input
              {...register("rob-kegiatan", {
                required: true,
              })}
              aria-invalid={errors["rob-kegiatan"] ? "true" : "false"}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
              defaultValue="0"
            />
          </label>
          {errors["rob-kegiatan"] && (
            <p role="alert">{errors["rob-kegiatan"]?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Pengisian (Liter)</span>
            <input
              {...register("pengisian", {
                required: "Please fill in this field.",
              })}
              aria-invalid={errors["pengisian"] ? "true" : "false"}
              placeholder="Type Here..."
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
              defaultValue="0"
            />
          </label>
          {errors["pengisian"] && (
            <p role="alert" className="text-red-500 text-xs italic">
              {errors["pengisian"]?.message}
            </p>
          )}
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
                localStorage.removeItem("formDataFuel");
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
