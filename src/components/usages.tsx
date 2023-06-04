import React from 'react';

const Usages = () => {
  return (
    <div className="container mx-auto py-8 mb-8">
      <h1 className="text-2xl font-bold mb-6 text-center">How to Use Shop Sense</h1>
      <div className="max-w-lg bg-white shadow-md rounded-md px-6 py-6 sm:px-5 xs:px-5">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Step 1: Create a Notebook</h2>
          <p>
            Start by accessing the <span className='italic'>Shop Sense</span> application. On the homepage, you will find an option to create a new notebook.
            Fill in all the required information for your notebook, such as the name, destination, and maximum weight allowance.
            Once you have entered all the information, click on the &quot;Create Notebook&quot; button. The page will redirect you to the &quot;Add Item&quot; view.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Step 2: Add Items to Your Notebook</h2>
          <p>
            In the &quot;Add Item&quot; view, you will see a form to input the details of the item you purchased.
            Fill in the necessary information, such as the item name, weight, and price.
            If the weight of the item exceeds the maximum weight allowance set for the notebook, you will receive an error message.
            Click on the &quot;Add Item&quot; button to add the item to your notebook. Repeat this process for every item you purchase.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Step 3: Manage Your Purchases</h2>
          <p>
            After adding items to your notebook, you can navigate to the &quot;List&quot; view to see the list of items you have added.
            In the &quot;My Purchases&quot; view, you will find the list of items with their details, including name, weight, and price.
            You have the option to remove any item from the list by clicking on the &quot;Remove&quot; button next to the item.
            If you want to delete the entire notebook, there will be a &quot;Delete Notebook&quot; button available.
            To download your item list, click on the &quot;Download&quot; button. The list will be downloaded in HTML format.
          </p>
        </div>
        <div className="text-sm font-semibold">
          <p>
            Important Note:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Ensure that the weight of the items you input does not exceed the maximum weight allowance set for your notebook. If it does, the app will notify you and prevent you from adding the item.</li>
            <li>You can always go back to the homepage or navigate to other views using the navigation menu available on the app.</li>
            <li><span className='italic'>Shop Sense</span> does not store or send any data outside of your device, ensuring the privacy and security of your information.</li>
            <li>The app can be used offline, allowing you to track your purchases even without an internet connection.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Usages;
