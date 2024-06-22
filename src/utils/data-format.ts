import moment from "moment";

export function formatDate(date: Date) {
  return moment(date).format("HH:mm:ss");
}
