import { useForm } from "react-hook-form";
import Dashboard from "./Dashboard";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

function RegisterEntrance() {
  const { register, handleSubmit, reset, setFocus } = useForm<{
    ticketNumber: number;
  }>();
  const [isLoading, setIsLoading] = useState(false);

  const registerEntranceMutation = useMutation({
    mutationKey: ["registerTicket"],
    mutationFn: (ticketNumber: number) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/tickets/${ticketNumber}/entrance`
      ),
    onSuccess: () => {
      toast.success("Entrances registered successfully!");
      setFocus("ticketNumber");
      reset();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message);
      reset();
    },
  });

  const onSubmit = async ({ ticketNumber }: { ticketNumber: number }) => {
    try {
      setIsLoading(true);
      await registerEntranceMutation.mutateAsync(ticketNumber);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dashboard />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 max-w-[500px] mx-auto"
      >
        <h1 className="text-2xl font-bold">Registo de Entradas na Torre</h1>
        <div className="mb-4">
          <label
            htmlFor="adults"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Último número entrada*
          </label>
          <input
            type="number"
            {...register("ticketNumber", { valueAsNumber: true })}
            id="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-black focus:border-black block w-full p-2.5 "
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="text-white  bg-black hover:bg-black/80 h-12 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
        >
          Registar entradas
        </button>
      </form>
    </>
  );
}
export default RegisterEntrance;
