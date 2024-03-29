import React, { useState, useEffect } from "react";
import { notebookTable } from "@/database.config";
import { NoteProps } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";

const MyPurchase = () => {
  const [notebook, setNotebook] = useState<NoteProps>({});
  const [notebookId, setNotebookId] = useState<string>("");
  const [totalWeight, setTotalWeight] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const storedItemId = localStorage.getItem("notebook");
    if (storedItemId) {
      const itemId = JSON.parse(storedItemId);
      setNotebookId(itemId);
    } else {
      return undefined;
    }

    const fetchNotebook = async () => {
      const notebook = await notebookTable.get(notebookId);
      setNotebook(notebook);
    };
    fetchNotebook();

    if (notebook?.items?.length === 0) {
      router.push("/notebooks/notebooks");
    }
    totalPrices(notebook?.items);
    totalWeights(notebook?.items);
  }, [notebookId, notebook?.items?.length]);

  const deleteItem = async (item: any) => {
    const updatedItems = notebook?.items.filter(
      (notebookItem: any) => notebookItem.name !== item.name
    );
    await notebookTable.update(notebook.id, { items: updatedItems });
    setNotebook({ ...notebook, items: updatedItems });
  };

  const totalWeights = (items: NoteProps[] | undefined) => {
    if (items && items.length > 0) {
      const total = items.reduce((sum, item) => sum + item.weight, 0);
      setTotalWeight(total);
    } else {
      setTotalWeight(0);
    }
  };

  const totalPrices = (items: NoteProps[] | undefined) => {
    if (items && items.length > 0) {
      const total = items.reduce((sum, item) => sum + Number(item.price), 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <Link
          href="/notebooks/notebooks"
          className="w-fit flex items-center px-3 py-1 text-4xl text-black bg-none rounded hover:bg-gray-400"
        >
          <FiPlus />
        </Link>
      </div>
      <h1 className="text-center font-semibold py-6 mb-6 uppercase">
        My Purchase
      </h1>
      <div className="flex justify-center overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Weight(kg)</th>
              <th className="py-2 px-4 border-b">Price (<small>{notebook?.currency}</small>)</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notebook?.items?.map((item: NoteProps, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center capitalize">{item.name}</td>
                <td className="py-2 px-4 border-b text-center">{item.weight}</td>
                <td className="py-2 px-4 border-b text-center">{item.price}</td>
                <td className="py-2 px-4 border-b text-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteItem(item)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4 border-b text-center">Total:</td>
              <td className="py-2 px-4 border-b text-center font-semibold">
                {totalWeight}
              </td>
              <td className="py-2 px-4 border-b text-center font-semibold">
                {totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPurchase;
