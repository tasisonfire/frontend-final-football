import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

type THandleChanges = {
  handleChanges: (
    pickDateStart: Date,
    pickDateEnd: Date,
    pickDate: String
  ) => void;
};

export function FiveDaysDynamic({ handleChanges }: THandleChanges) {
  const [pickDateStart, setPickDateStart] = useState<Date | null>(new Date());
  const [pickDateEnd, setPickDateEnd] = useState<Date | null>(new Date());
  const [pickDate, setPickDate] = useState<string>("");

  // handle picking date from date picker
  //   const handleDatePicker = (date: Date | null) => {

  const handleDatePicker: ReactDatePickerProps<Date, true>["onChange"] = (
    dates
  ) => {
    const [start, end]: any = dates as [Date, Date];

    setPickDateStart(start);
    setPickDateEnd(end);
  };

  useEffect(() => {
    handleChanges(pickDateStart, pickDateEnd, pickDate);
  }, [pickDateEnd, pickDate]);

  //   console.log("start date:", pickDateStart);
  //   console.log("extradate:", pickDate);
  //   console.log("end date:", pickDateEnd);

  const todayNow = new Date();
  const todayDateNum = todayNow.getDate();
  const todayDayName = todayNow.toLocaleString("en-US", { weekday: "short" });
  const todayMonthName = todayNow.toLocaleString("en-US", { month: "short" });

  function extraDay(day: Number, aos: String) {
    const extraDay = new Date(todayNow);
    if (aos === "+") {
      extraDay.setDate(todayNow.getDate() + Number(day));
    }
    if (aos === "-") {
      extraDay.setDate(todayNow.getDate() - Number(day));
    }

    const extraDateNum = extraDay.getDate();
    const extraDayName = extraDay.toLocaleString("en-US", {
      weekday: "short",
    });
    const extraMonthName = extraDay.toLocaleString("en-US", {
      month: "short",
    });

    return (
      <>
        <div
          className="date extra-date"
          onClick={() =>
            setPickDate(
              `${extraDay.getFullYear()}-${extraDay.getMonth() + 1}-${String(
                extraDay.getDate()
              ).padStart(2, "0")}`
            )
          }
        >
          <span>{extraDayName}</span>
          <span>
            {extraDateNum} {extraMonthName}
          </span>
        </div>
      </>
    );
  }

  const todayNewDate = new Date();

  return (
    <>
      <div className="date-container">
        {extraDay(2, "-")}
        {extraDay(1, "-")}

        <div
          className="date today-date"
          onClick={() =>
            setPickDate(
              `${todayNewDate.getFullYear()}-${
                todayNewDate.getMonth() + 1
              }-${String(todayNewDate.getDate()).padStart(2, "0")}`
            )
          }
        >
          <span>{todayDayName}</span>
          <span>
            {todayDateNum} {todayMonthName}
          </span>
        </div>
        {extraDay(1, "+")}
        {extraDay(2, "+")}

        <div className="date">
          <span>
            <DatePicker
              selected={pickDateStart}
              onChange={handleDatePicker}
              startDate={pickDateStart}
              endDate={pickDateEnd}
              selectsRange
            />
          </span>
          <span>calendar</span>
        </div>
      </div>
    </>
  );
}
