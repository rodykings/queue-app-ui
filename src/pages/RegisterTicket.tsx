import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Record } from "../types/record";
import Dashboard from "./Dashboard";

function RegisterTicket() {
  const { register, handleSubmit, reset, setFocus } = useForm<Record>();
  const [isLoading, setIsLoading] = useState(false);

  const registerTicketMutation = useMutation({
    mutationKey: ["registerTicket"],
    mutationFn: (data: Record) =>
      axios.post(`${import.meta.env.VITE_API_URL}/records`, data),
    onSuccess: () => {
      toast.success("Tickets registered successfully!");
      setFocus("adults");
      reset();
    },
    onError: () => {
      toast.error("Error in ticket register!");
    },
  });

  const onSubmit = async (data: Record) => {
    try {
      setIsLoading(true);
      await registerTicketMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dashboard />
      {isLoading ? (
        <p className="text-2xl">A carregar...</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4  max-w-[500px] mx-auto"
        >
          <h1 className="text-3xl font-bold">Regist Tickets</h1>
          <div className="mb-4">
            <label
              htmlFor="adults"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Adults*
            </label>
            <input
              autoFocus
              type="number"
              {...register("adults", { valueAsNumber: true })}
              id="adults"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-black focus:border-black block w-full p-2.5 "
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="children"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Children*
            </label>
            <input
              type="number"
              {...register("children", { valueAsNumber: true })}
              id="children"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-black focus:border-black block w-full p-2.5 "
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nationality
            </label>
            <input
              {...register("nationality")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-black focus:border-black block w-full p-2.5 "
            />
          </div>
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              {...register("priority")}
              className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-black "
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Priority
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              {...register("assistance")}
              className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-black "
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Assistance
            </label>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-black hover:bg-black/80 h-12 focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
          >
            Registar visitantes
          </button>
        </form>
      )}
    </>
  );
}

export default RegisterTicket;
