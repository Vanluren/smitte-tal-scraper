import moment from "moment";

export const currentDateTime = () => moment(Date.now()).format();
