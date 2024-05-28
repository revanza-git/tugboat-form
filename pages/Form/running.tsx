"use client";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  me: string;
  ae1: string;
  ae2: string;
  ae3: string;
}

export const Running: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const [isSubmitted, setIsSubmitted] = React.useState(false); // Track submission status

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("formDataRunning", JSON.stringify(data));
    setIsSubmitted(true); // Set submission status to true
  };

  return (
    <div className="bg-white p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>M/E*</span>
            <input
              {...register("me", {
                required: "Please fill in this field.",
              })}
              aria-invalid={errors["me"] ? "true" : "false"}
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
              defaultValue="00:00"
            />
          </label>
          {errors["me"] && (
            <p role="alert" className="text-red-500 text-xs italic">
              {errors["me"]?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>A/E No.1*</span>
            <input
              {...register("ae1", {
                required: true,
              })}
              aria-invalid={errors["ae1"] ? "true" : "false"}
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
              defaultValue="00:00"
            />
          </label>
          {errors["ae1"] && <p role="alert">{errors["ae1"]?.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>A/E No.2*</span>
            <input
              {...register("ae2", {
                required: "Please fill in this field.",
              })}
              aria-invalid={errors["ae2"] ? "true" : "false"}
              placeholder=""
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
              defaultValue="00:00"
            />
          </label>
          {errors["ae2"] && (
            <p role="alert" className="text-red-500 text-xs italic">
              {errors["ae2"]?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>A/E No.3*</span>
            <input
              {...register("ae3", {
                required: "Please fill in this field.",
              })}
              aria-invalid={errors["ae3"] ? "true" : "false"}
              placeholder="Type Here..."
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={isSubmitted} // Disable input if form is submitted
              defaultValue="00:00"
            />
          </label>
          {errors["ae3"] && (
            <p role="alert" className="text-red-500 text-xs italic">
              {errors["ae3"]?.message}
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
                localStorage.removeItem("formDataRunning");
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
