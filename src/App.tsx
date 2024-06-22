import { useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TicketControl } from "./types/ticket-control";

function App() {
  const fetchTicketControl = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/ticket-control"
    );
    return response.data.data as TicketControl;
  };

  const { data: ticketControl } = useQuery({
    queryKey: ["ticket-control"],
    queryFn: () => fetchTicketControl(),
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("ticket-control", (data) => {
      queryClient.setQueryData(["ticket-control"], data);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div className="p-8 w-full h-full">
      <div className="grid grid-cols-3 gap-8">
        <Card
          data={ticketControl?.lastRegisterTicket}
          timestamp={ticketControl?.lastRegisterTicketTimestamp}
        />
        <Card data={ticketControl?.lastEntryTicket} />
        <Card />
      </div>
    </div>
  );
}

const Card = ({ data, timestamp }: { data?: number; timestamp?: Date }) => {
  return (
    <div className="w-full h-full flex flex-col gap-1 bg-slate-400 rounded-xl  text-white p-8">
      <h1 className="text-6xl font-bold">{data}</h1>
      <span className="text-xl">Registed Tickets</span>
      <span className="text-xl">{timestamp?.toLocaleString()}</span>
    </div>
  );
};

export default App;
