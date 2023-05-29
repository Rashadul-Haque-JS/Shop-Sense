import React, { useState, useEffect } from "react";

const IndexPage = () => {
  const [notebook, setNotebook] = useState<any>();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemWeight, setItemWeight] = useState<number | string>(0);
  const [unit, setUnit] = useState("kg");

  useEffect(() => {
    const storedNotebook = localStorage.getItem("notebook");
    if (storedNotebook) {
      setNotebook(JSON.parse(storedNotebook));
    }
  }, []);

  const createNotebook = () => {
    const newNotebook = {
      name,
      destination,
      date,
      items: [],
    };
    setNotebook(newNotebook);
    localStorage.setItem("notebook", JSON.stringify(newNotebook));
  };

  const addItem = () => {
    const newItem = {
      name: itemName,
      weight: convertWeightToKg(itemWeight),
    };
    const updatedNotebook = {
      ...notebook,
      items: [...(notebook?.items ?? []), newItem],
    };
    setNotebook(updatedNotebook);
    localStorage.setItem("notebook", JSON.stringify(updatedNotebook));
    setItemName("");
    setItemWeight(0);
  };

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

  return (
    <>
      {notebook && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Notebook Details</h2>
          <p>Name: {notebook?.name}</p>
          <p>Destination: {notebook?.destination}</p>
          <p>Date: {notebook?.date}</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold">Add Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border border-gray-400 p-2 mb-2"
        />
        <input
          type="number"
          placeholder="Item Weight"
          value={itemWeight}
          onChange={(e) => setItemWeight(e.target.value)}
          className="border border-gray-400 p-2 mb-2"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border border-gray
-400 p-2 mb-2"
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
        </select>
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Total Weight</h2>
        <p>{calculateTotalWeight()} kg</p>
      </div>

      {calculateTotalWeight() >= maxWeight && (
        <p className="text-red-500">
          Maximum weight limit reached. Cannot add more items.
        </p>
      )}

      {!notebook && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Create Notebook</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-gray-400 p-2 mb-2"
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-400 p-2 mb-2"
          />
          <button
            onClick={createNotebook}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Notebook
          </button>
        </div>
      )}
    </>
  );
};

export default IndexPage;
