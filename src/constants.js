export const STATUS_FILTERS = [
  {
    text: "CONFIRMED",
    value: "CONFIRMED",
  },
  {
    text: "SEATED",
    value: "SEATED",
  },
  {
    text: "CHECKED OUT",
    value: "CHECKED OUT",
  },
  {
    text: "NOT CONFIRMED",
    value: "NOT CONFIRMED",
  },
];

export const SHIFT_FILTERS = [
  { value: "BREAKFAST", text: "BREAKFAST" },
  { value: "LUNCH", text: "LUNCH" },
  { value: "DINNER", text: "DINNER" },
];

export const AREA_FILTERS = [
  { value: "BAR", text: "BAR" },
  { value: "MAIN ROOM", text: "MAIN ROOM" },
];

export const TABLE_DATA_INDEX = {
  id: "ID",
  businessDate: "Date",
  status: "Status",
  firstName: "Customer First Name",
  lastName: "Customer Last Name",
  shift: "Shift",
  area: "Area",
  quantity: "Quantity",
  guestNotes: "Guest Notes",
};

export const statusTagMap = {
  CONFIRMED: "success",
  SEATED: "processing",
  "CHECKED OUT": "default",
  "NOT CONFIRMED": "error",
};
