import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover } from "@headlessui/react";
import { format } from "date-fns";
import { useField } from "formik";

const DateInput = ({ label = "Select Date", ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [selectedDate, setSelectedDate] = useState(
    field.value ? new Date(field.value) : null,
  );

  // Sync Formik value with selectedDate
  useEffect(() => {
    if (!field.value) {
      setSelectedDate(null);
    } else {
      const date = new Date(field.value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
      }
    }
  }, [field.value]);

  // Handle date selection
  const handleDateSelect = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const formattedDate = date.toISOString(); // Ensure valid format (ISO 8601)

      setSelectedDate(date);
      helpers.setValue(formattedDate); // Pass the ISO 8601 formatted date to Formik
      helpers.setTouched(true); // Mark field as touched
    } else {
      helpers.setValue(null);
      setSelectedDate(null);
    }
  };

  const hasError = meta.touched && meta.error;

  return (
    <div className="relative">
      <Popover className="relative">
        {({ open }) => (
          <>
            {/* Input Field */}
            <Popover.Button
              type="button"
              className={`w-64 rounded-md border border-gray-300 px-4 py-4 text-left shadow-sm focus:outline-none focus:ring ${
                hasError ? "border-red-500" : ""
              }`}
            >
              {selectedDate
                ? format(selectedDate, "PPP") // Display the formatted date
                : label || "Select Event Date"}
            </Popover.Button>

            {/* Date Picker Popover */}
            <Popover.Panel className="absolute z-10 mt-2 rounded-md bg-white p-2 shadow-lg">
              <DayPicker
                selected={selectedDate}
                onDayClick={handleDateSelect}
                numberOfMonths={1}
              />
            </Popover.Panel>
          </>
        )}
      </Popover>

      {/* Error message */}
      {hasError && (
        <div className="mt-1 text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default DateInput;
