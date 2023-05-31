import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { notebookTable } from "../../src/database.config";
import { NoteProps } from "@/types/types";
import { currencies } from "@/utils/currency";
interface Notebook {
  setNotebook: (notebook: NoteProps) => void;
}

const CreateNote = ({ setNotebook }: Notebook) => {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [maxWeight, setMaxWeight] = useState<number | string>();
  const [currency, setCurrency] = useState<string>();
  const [text, setText] = useState("");

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
        <h2 className="text-xl font-bold text-center mb-4">Create Notebook</h2>
        {text && <small className="my-5 text-center w-64">* {text}</small>}
        <div className="flex flex-col justify-center items-center gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-64"
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-64"
            required
          />
          <div className="relative w-64">
            <DatePicker
              selected={date}
              onChange={(selectedDate: Date | null) => setDate(selectedDate)}
              placeholderText="Select Date"
              className="border border-gray-400 rounded-lg px-4 py-2 pl-10 pr-4 mb-2 w-full"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <FaCalendarAlt className="text-gray-500" />
            </div>
          </div>
        <input
          type="number"
          placeholder="maximun weight"
          value={maxWeight}
          onChange={(e) => setMaxWeight(e.target.value)}
          className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-64"
          required
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-64"
        >
          <option value="">Choose Currency</option>
          {currencies?.map((currency: string) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={createNotebook}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 w-64"
          >
            Create Notebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
