import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { notebookTable } from "../../src/database.config";
import { NoteProps } from "@/types/types";
import currencies from "@/utils/currency";
import destinations from "@/utils/countries";
import Select from "react-select";
import { Option } from "@/types/types";
interface Notebook {
  setNotebook: (notebook: NoteProps) => void;
}

const CreateNote = ({ setNotebook }: Notebook) => {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState<string | undefined>("");
  const [date, setDate] = useState<Date | null>(null);
  const [maxWeight, setMaxWeight] = useState<number | string>();
  const [currency, setCurrency] = useState<string>();
  const [text, setText] = useState("");
  const [currenciesOptions, setCurrenciesOptions] = useState<Option[]>(
    currencies()
  );
  const [destinationOptions, setDestinationOptions] = useState<Option[]>(
    destinations()
  );

  const createNotebook = async () => {
    setText("");
    const newNotebook = {
      id: uuidv4(), // Generate a unique ID for the notebook
      name,
      destination,
      date: date?.toISOString().split("T")[0] || "",
      items: [],
      maxWeight,
      currency,
    };

    if (!name || !destination || !date || !maxWeight || !currency) {
      setText("Please fill out all fields");
    } else {
      const id = await notebookTable.add(newNotebook);
      localStorage.setItem("notebook", JSON.stringify(id));
      setNotebook(newNotebook);
      setName("");
      setDestination("");
      setDate(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-8">Create Trackbook</h2>
        {text && <small className="my-5 text-center w-80">* {text}</small>}
        <div className="flex flex-col justify-center items-center gap-3">
          <input
            type="text"
            placeholder="Your Nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-80"
            required
          />
          <Select
            options={destinationOptions}
            value={
              destination ? { value: destination, label: destination } : null
            }
            onChange={(selectedOption) => setDestination(selectedOption?.value)}
            placeholder="Select Destination"
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "0.5rem", 
                paddingTop: "0.1rem", 
                paddingBottom: "0.1rem", 
                marginBottom: "0.5rem",
              }),
              placeholder: (provided) => ({
                ...provided,
                paddingLeft: "8px",
              }),
            }}
            className="w-80"
          />
          <div className="relative w-80">
            <DatePicker
              selected={date}
              onChange={(selectedDate: Date | null) => setDate(selectedDate)}
              placeholderText="Select Travel Date"
              className="border border-gray-400 rounded-lg px-4 py-2  pr-4 mb-2 w-full"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <FaCalendarAlt className="text-gray-500" />
            </div>
          </div>
          <input
            type="number"
            placeholder="Set Maximum Weight (KG)"
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-80"
            required
          />
          <Select
            options={currenciesOptions}
            value={currency ? { value: currency, label: currency } : null}
            onChange={(selectedOption) => setCurrency(selectedOption?.value)}
            placeholder="Select Shopping Currency"
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "0.5rem", // Apply rounded corners
                paddingTop: "0.1rem", // Increase top padding
                paddingBottom: "0.1rem", // Increase bottom padding
              }),
              placeholder: (provided) => ({
                ...provided,
                paddingLeft: "8px",
              }),
            }}
            className="w-80"
          />
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={createNotebook}
            className="bg-blue-500 text-white px-4 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-600 w-80"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
