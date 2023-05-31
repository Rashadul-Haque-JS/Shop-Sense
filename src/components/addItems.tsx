import React, { useState } from "react";
import { notebookTable } from "@/database.config";
interface NoteProps {
  [key: string]: any;
}

interface Notebook {
  notebook: NoteProps;
  setNotebook: (notebook: NoteProps) => void;
}

const AddItems = ({ notebook, setNotebook }: Notebook) => {
  const [itemName, setItemName] = useState("");
  const [itemWeight, setItemWeight] = useState<number | string>(0);
  const [unit, setUnit] = useState("kg");

  const convertWeightToKg = (weight: number | string): number => {
    if (unit === "kg") {
      return Number(weight);
    } else if (unit === "g") {
      return Number(weight) / 1000;
    } else if (unit === "ml") {
      // Assuming water density of 1g/ml for simplicity
      return Number(weight) / 1000;
    }
    return 0;
  };

  const calculateTotalWeight = (): number => {
    let totalWeight = 0;
    notebook?.items.forEach((item: any) => {
      totalWeight += item.weight;
    });
    return totalWeight;
  };

  const maxWeight = 20; // Define maximum weight limit

  const addItem = async() => {
    const newItem = {
      name: itemName,
      weight: convertWeightToKg(itemWeight),
    };
    await notebookTable.update(notebook.id, {items: [...(notebook?.items ?? []), newItem]});
    console.log("updated");
    setItemName("");
    setItemWeight(0);
    setUnit("kg");  
    
  };

  return (
    <div className="flex justify-center w-full mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <h2 className="text-xl font-bold text-center uppercase">Add Items</h2>
        <div className="px-4 capitalize">
            <div className="flex justify-between mb-4">
            <p>
              <span className="font-semibold">Name:</span> {notebook?.name}
            </p>
            <p>
              <span className="font-semibold">Destination:</span>{" "}
              {notebook?.destination}
            </p>
          </div>
          <div className="flex justify-between">
            <p>
              <span className="font-semibold">Date:</span> {notebook?.date}
            </p>
            <p className="text-center font-semibold">
             <span>Total:</span> {calculateTotalWeight()} kg
            </p>
          </div>
        </div>
        <div className="flex flex-col p-5 shadow-md">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-80"
          />
          <input
            type="number"
            placeholder="Item Weight"
            value={itemWeight}
            onChange={(e) => setItemWeight(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-80"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-80"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4 w-80"
          >
            Add Item
          </button>
        </div>
      </div>
      {calculateTotalWeight() >= maxWeight && (
        <p className="text-red-500">
          Maximum weight limit reached. Cannot add more items.
        </p>
      )}
    </div>
  );
};

export default AddItems;
