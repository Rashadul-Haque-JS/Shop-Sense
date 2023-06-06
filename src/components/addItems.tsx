import React, { useEffect, useState } from "react";
import { notebookTable } from "@/database.config";
import Link from "next/link";
import { FiDownload, FiList, FiTrash } from "react-icons/fi";
import Image from "next/image";
import downloadNotebook from "@/utils/downloadNote";
import { useRouter } from "next/router";
import {toast} from "react-toastify";

interface NoteProps {
  [key: string]: any;
}

interface Notebook {
  notebook: NoteProps;
  setNotebook: (notebook: NoteProps) => void;
}

const AddItems = ({ notebook, setNotebook }: Notebook) => {
  const [itemName, setItemName] = useState("");
  const [itemWeight, setItemWeight] = useState<number | string>();
  const [unit, setUnit] = useState("kg");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemPrice, setItemPrice] = useState<number | string>();
  const [text, setText] = useState("");
  const [isMaximum, setIsMaximum] = useState(false);
  const router= useRouter();

  // Rest of your code...

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const confirmDeleteNotebook = async () => {
    closeDeleteConfirmation();
    await notebookTable.delete(notebook.id);
    setNotebook({});
    localStorage.removeItem("notebook");
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
    notebook?.items.forEach((item: NoteProps) => {
      totalWeight += item.weight;
    });
    return totalWeight;
  };


  const addItem = async () => {
    if (!itemName || !itemWeight || !itemPrice) {
        setText("Please fill out all fields");
        return;
    }

    const totalWeight= notebook?.maxWeight < (calculateTotalWeight() + Number(convertWeightToKg(itemWeight)));
    if(totalWeight){
        setIsMaximum(true)
        return
    }else{
        setIsMaximum(false)
    }

    const newItem = {
      name: itemName,
      weight: convertWeightToKg(itemWeight),
      price: itemPrice,
    };
    await notebookTable.update(notebook.id, {
      items: [...(notebook?.items ?? []), newItem],
    });
    console.log("updated");
    setItemName("");
    setItemWeight(0);
    setUnit("kg");
    setItemPrice(0);
  };

  const listRouter = ()=>{
    if(notebook?.items?.length){
      router.push("/my-purchase")
    }else{
      toast.info("Your shopping list is empty")
    }
  }

  return (
    <>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-80 rounded-lg shadow-lg p-6">
            <p className="text-xl mb-4">
              Are you sure you want to delete this notebook?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmDeleteNotebook}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, delete
              </button>
              <button
                onClick={closeDeleteConfirmation}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center gap-4 py-3 transform translate-y-[-20px]">
        <button
          onClick={()=>{downloadNotebook(notebook)}}
          className="flex items-center gap-2 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          <FiDownload /> Download
        </button>
        <button className="flex items-center gap-2 px-3 py-1 text-white bg-stone-950 rounded hover:bg-red-600" onClick={listRouter}
        >
          <FiList /> List
        </button>
        <button
          onClick={openDeleteConfirmation}
          className="flex items-center gap-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          <FiTrash /> Delete
        </button>
      </div>

      <div className="flex justify-center w-full mb-4">
        {!isMaximum && (
          <div className="grid grid-cols-1 gap-10">
            <h2 className="text-xl font-bold text-center uppercase my-10 xs:my-0 sm:my-0">
              Add Items
            </h2>
            <div className="flex flex-wrap justify-center xs:gap-0 sm:gap-0 gap-16 w-full">
              <div className="flex justify-evenly px-4 capitalize xs:w-full sm:full md:full">
                <div className="flex flex-col justify-between items-center shadow-md p-4">
                  <p className="text-center">
                    <span className="font-semibold"> Name</span>{" "}
                    <span className="block">{notebook?.name}</span>
                  </p>
                  <div className="flex justify-center items-center xs:hidden sm:hidden">
                    <Image
                      src="/images/travels-bag.png"
                      alt="bag"
                      width={80}
                      height={50}
                    />
                  </div>{" "}
                  <p className="text-center">
                    <span className="font-semibold">Allowed</span>
                    <span className="block">{notebook?.maxWeight} kg</span>
                  </p>
                </div>
                <div className="flex flex-col justify-between shadow-md p-4">
                  <p className="text-center">
                    <span className="font-semibold">Destination</span>
                    <span className="block">{notebook?.destination}</span>
                  </p>
                  <div className="flex justify-center items-center xs:hidden sm:hidden">
                    <Image
                      src="/images/travels-bag.png"
                      alt="bag"
                      width={80}
                      height={50}
                    />
                  </div>
                  <p className="text-center ">
                    <span className="font-semibold"> Purchased</span>
                    <span className="block">{calculateTotalWeight()} kg</span>
                  </p>
                </div>
                <div className="flex flex-col justify-between shadow-md p-4">
                  <p className="text-center">
                    <span className="font-semibold">Date</span>
                    <span className="block">{notebook?.date}</span>
                  </p>
                  <div className="flex justify-center items-center xs:hidden sm:hidden">
                    <Image
                      src="/images/travels-bag.png"
                      alt="bag"
                      width={80}
                      height={50}
                    />
                  </div>{" "}
                  <p className="text-center">
                    <span className="font-semibold"> Available</span>
                    <span className="block">
                      {notebook?.maxWeight - calculateTotalWeight()} kg
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col p-5 shadow-md xs:mt-8 sm:mt-8">
              {text && <small className="my-5 text-center w-64">* {text}</small>}
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
                  value={itemWeight || ''}
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
                <input
                  type="number"
                  placeholder="Item price"
                  value={itemPrice || ''}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="border border-gray-400 rounded-lg px-4 py-2 mb-2 w-80"
                />
                <button
                  onClick={addItem}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4 w-80 font-semibold"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}
        {isMaximum && (
          <div>
            <p className="text-red-500 text-center">
                <span className="text-xl font-bold " style={{textDecoration:'underline'}}>Notification</span>
                <span className="block text-black py-10">
                You can add {notebook?.maxWeight - calculateTotalWeight()} kg
                </span>
            </p>
            <div className="flex justify-center items-center gap-2">
              <Link
                className="text-center text-blue-500 py-5"
                href="/my-purchase"
              >
                Delete
              </Link>
              Individual Item
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddItems;
