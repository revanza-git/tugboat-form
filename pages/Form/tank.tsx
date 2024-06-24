"use client";
import RefreshContext from "@/contexts/refreshContext";
import * as React from "react";
import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  TankService: string;
  "1p": string;
  "1s": string;
  "2c": string;
  "2p": string;
  "2s": string;
  "2dbp": string;
  "2dbs": string;
  "3p": string;
  "3s": string;
  "4p": string;
  "4s": string;
  TankServiceP: string;
  TankServiceS: string;
}

export const Tank: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const { refresh, setRefresh } = useContext(RefreshContext);

  const [isSubmitted, setIsSubmitted] = React.useState(false); // Track submission status
  let formData;
  if (typeof window !== "undefined") {
    formData = localStorage.getItem("formData");
  }
  const parsedFormData = formData ? JSON.parse(formData) : null;
  const namaKapal = parsedFormData ? parsedFormData.namaKapal : null;

  useEffect(() => {
    if (refresh) {
      // Reset the refresh state
      setRefresh(false);
    }
  }, [refresh, setRefresh]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Convert the data object to an array of objects
    const dataArray = Object.entries(data).map(([key, value]) => ({
      soundingTankCode: key,
      usage: value,
    }));

    // Store the array in localStorage
    localStorage.setItem("formDataTankActivity", JSON.stringify(dataArray));
    setIsSubmitted(true); // Set submission status to true
  };

  if (!namaKapal) {
    if (refresh) {
      return null;
    } else {
      return (
        <div className="bg-white p-8">
          <h1 className="text-center text-xl font-semibold text-red-600">
            Mohon Data Kapal diisi terlebih dahulu
          </h1>
        </div>
      );
    }
  } else if (namaKapal == "4201") {
    if (refresh) {
      return null;
    } else {
      return (
        <div className="bg-white p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank Services*</span>
                <input
                  {...register("TankService", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["TankService"] ? "true" : "false"}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["TankService"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["TankService"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 1P (Liter)*</span>
                <input
                  {...register("1p", {
                    required: true,
                  })}
                  aria-invalid={errors["1p"] ? "true" : "false"}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["1p"] && <p role="alert">{errors["1p"]?.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 1S (Liter)</span>
                <input
                  {...register("1s", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["1s"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["1s"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["1s"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 2C (Liter)</span>
                <input
                  {...register("2c", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["2c"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["2c"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["2c"]?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
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
    }
  } else if (namaKapal == "4202") {
    if (refresh) {
      return null;
    } else {
      return (
        <div className="bg-white p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 1P (Liter)</span>
                <input
                  {...register("1p", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["1p"] ? "true" : "false"}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["1p"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["1p"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 1S (Liter)</span>
                <input
                  {...register("1s", {
                    required: true,
                  })}
                  aria-invalid={errors["1s"] ? "true" : "false"}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["1s"] && <p role="alert">{errors["1s"]?.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 2P - 23 cm (Liter)</span>
                <input
                  {...register("2p", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["2p"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["2p"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["2p"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 2S - 20cm (Liter)</span>
                <input
                  {...register("2s", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["2s"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["2s"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["2s"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 2 DB P (Liter)</span>
                <input
                  {...register("2dbp", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["2dbp"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["2dbp"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["2dbp"]?.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 2 DB S - 84 cm (Liter)</span>
                <input
                  {...register("2dbs", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["2dbs"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["2dbs"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["2dbs"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 3P - 263,8 cm (Liter)</span>
                <input
                  {...register("3p", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["3p"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["3p"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["3p"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 3S - 264 cm (Liter)</span>
                <input
                  {...register("3s", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["3s"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["3s"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["3s"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 4P - 193 cm (Liter)</span>
                <input
                  {...register("4p", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["4p"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["4p"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["4p"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank 4S - 217 cm (Liter)</span>
                <input
                  {...register("4s", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["4s"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["4s"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["4s"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank Service P - 84 cm (Liter)</span>
                <input
                  {...register("TankServiceP", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["TankServiceP"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["TankServiceP"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["TankServiceP"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank Service S - 77,8 cm (Liter)</span>
                <input
                  {...register("TankServiceS", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["TankServiceS"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["TankServiceS"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["TankServiceS"]?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
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
    }
  } else {
    if (refresh) {
      return null;
    } else {
      return (
        <div className="bg-white p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>Tank Services (Liter)</span>
                <input
                  {...register("TankService", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["TankService"] ? "true" : "false"}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["TankService"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["TankService"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>1P - 82 cm (Liter)*</span>
                <input
                  {...register("1p", {
                    required: true,
                  })}
                  aria-invalid={errors["1p"] ? "true" : "false"}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["1p"] && <p role="alert">{errors["1p"]?.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>1S - 85cm (Liter)</span>
                <input
                  {...register("1s", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["1s"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["1s"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["1s"]?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                <span>2C - 92cm (Liter)</span>
                <input
                  {...register("2c", {
                    required: "Please fill in this field.",
                  })}
                  aria-invalid={errors["2c"] ? "true" : "false"}
                  placeholder="Type Here..."
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={isSubmitted} // Disable input if form is submitted
                  defaultValue="0"
                />
              </label>
              {errors["2c"] && (
                <p role="alert" className="text-red-500 text-xs italic">
                  {errors["2c"]?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
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
    }
  }
};

export default Tank;
