import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  "waktu-mulai": string;
  "waktu-selesai": string;
  durasi: string;
  bbm: string;
  keterangan: string;
}

export const Detail: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const [formDataDetail, setFormDataDetail] = useState<IFormInput[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("formDataDetail");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormDataDetail(parsedData);
    }
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Get the existing data from localStorage
    const item = localStorage.getItem("formDataDetail");
    const existingData = item ? JSON.parse(item) : [];

    // Add the new data to the existing data
    const newData = [
      ...(Array.isArray(existingData) ? existingData : []),
      data,
    ];

    // Save the updated data to localStorage
    localStorage.setItem("formDataDetail", JSON.stringify(newData));

    // Update the formDataDetail state
    setFormDataDetail(newData);

    reset();
  };

  return (
    <div className="bg-white p-8">
      <div className="py-4">
        <h3 className="text-lg font-bold mb-2">Form Detail Data</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-1/4 text-left">Mulai</th>
                <th className="w-1/4 text-left">Selesai</th>
                <th className="w-1/4 text-left">BBM</th>
                <th className="w-1/4 text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {formDataDetail.map((data, index) => (
                <tr key={index}>
                  <td className="text-left">{data["waktu-mulai"]}</td>
                  <td className="text-left">{data["waktu-selesai"]}</td>
                  <td className="text-left">{data.bbm}</td>
                  <td className="text-left">{data.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Waktu Mulai Kegiatan (Jam)</span>
            <input
              {...register("waktu-mulai", {
                required: true,
              })}
              aria-invalid={errors["waktu-mulai"] ? "true" : "false"}
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={new Date().toLocaleTimeString().substring(0, 5)}
            />
          </label>
          {errors["waktu-mulai"] && (
            <p role="alert">{errors["waktu-mulai"]?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Waktu Selesai (Jam)</span>
            <input
              {...register("waktu-selesai", {
                required: true,
              })}
              aria-invalid={errors["waktu-selesai"] ? "true" : "false"}
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={new Date().toLocaleTimeString().substring(0, 5)}
            />
          </label>
          {errors["waktu-selesai"] && (
            <p role="alert">{errors["waktu-selesai"]?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Durasi (Jam)</span>
            <input
              {...register("durasi", {
                required: true,
              })}
              aria-invalid={errors["durasi"] ? "true" : "false"}
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue="01:00"
            />
          </label>
          {errors["durasi"] && <p role="alert">{errors["durasi"]?.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>* Konsumsi BBM (Liter)</span>
            <input
              {...register("bbm", {
                required: "Please fill in this field.",
              })}
              aria-invalid={errors["bbm"] ? "true" : "false"}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue="0"
            />
          </label>
          {errors["bbm"] && (
            <p role="alert" className="text-red-500 text-xs italic">
              {errors["bbm"]?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span>Keterangan</span>
            <select
              {...register("keterangan", {
                required: "Please select an item in the list.",
              })}
              aria-invalid={errors["keterangan"] ? "true" : "false"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="standby">Stand By</option>
              <option value="dorong">Dorong/Tarik</option>
              <option value="sailing">Sailing</option>
            </select>
            {errors["keterangan"] && (
              <p role="alert">{errors["keterangan"]?.message}</p>
            )}
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("formDataDetail");
              setFormDataDetail([]);
              reset();
            }}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detail;
