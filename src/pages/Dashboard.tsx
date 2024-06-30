import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "../utils/data-format";
import { cn } from "../utils/tailwind-clsx";
import { TicketControl } from "../types/ticket-control";

function Dashboard() {
  const socketRef = useRef(null);

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
    if (!socketRef.current) {
      const socket = io("http://localhost:8000");

      socket.on("ticket-control", (data) => {
        queryClient.setQueryData(["ticket-control"], data);
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, []);

  return (
    <div className="p-8 flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-content-center">
        <Card
          title={"Registed Tickets"}
          data={ticketControl?.lastRegisterTicket}
          timestamp={ticketControl?.lastRegisterTicketTimestamp}
          twColor={"bg-black"}
        />
        <Card
          title={"Entrance Tickets"}
          data={ticketControl?.lastEntryTicket}
          timestamp={ticketControl?.lastEntryTicketTimestamp}
          twColor={"bg-slate-400"}
        />
        <Card
          title={"Last Waiting Time"}
          data={
            ticketControl?.lastWaitingTimeMinutes
              ? ticketControl?.lastWaitingTimeMinutes + " min"
              : "--"
          }
          twColor={cn({
            "bg-green-400":
              ticketControl?.lastWaitingTimeMinutes &&
              ticketControl?.lastWaitingTimeMinutes < 30,
            "bg-yellow-400":
              ticketControl?.lastWaitingTimeMinutes &&
              ticketControl?.lastWaitingTimeMinutes >= 30 &&
              ticketControl?.lastWaitingTimeMinutes < 60,
            "bg-red-400":
              ticketControl?.lastWaitingTimeMinutes &&
              ticketControl?.lastWaitingTimeMinutes > 60,
            "bg-slate-300": !ticketControl?.lastWaitingTimeMinutes,
          })}
        />
        {/* <Card /> */}
      </div>
    </div>
  );
}

const Card = ({
  data,
  timestamp,
  twColor,
  title,
}: {
  title: string;
  data?: any;
  timestamp?: Date;
  twColor?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-1 rounded-xl text-white p-16",
        twColor
      )}
    >
      <h1 className="text-5xl xl:text-7xl font-bold text-center">
        {data ?? "--"}
      </h1>
      <span className="text-sm xl:text-xl">{title}</span>
      <span className="text-sm xl:text-xl">
        {timestamp ? formatDate(timestamp) : "--"}
      </span>
    </div>
  );
};

export default Dashboard;
