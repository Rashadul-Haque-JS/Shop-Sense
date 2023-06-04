import { NoteProps } from "@/types/types";
const downloadNotebook = (notebook: NoteProps) => {
  const notebookList = JSON.parse(JSON.stringify(notebook));
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
      body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #04F8AF;
        padding: 20px;
      }
    
      body h1 {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
        font-weight: bold;
        margin-top: 32px;
        margin-bottom: 16px;
        text-align: center;
      }
    
      body p {
        text-align: center;
        width: fit-content;
      }
    
      .notebook-list {
        position: relative;
        width: 90%;
        max-width: 400px;
        min-height: 480px;
        margin-top: 20px;
        background-color: #ffffff;
        padding: 20px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
    
      .notebook-list h2 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
      }
    
      table {
        width: 100%;
        border-collapse: collapse;
      }
    
      th,
      td {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }
    
      .item-name {
        font-weight: bold;
        margin-right: 10px;
      }
    
      .item-price {
        color: green;
      }
    
      .dest-date {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        padding: 0.5em;
      }
    
      .dest-date .bullet {
        width: 10px;
        height: 10px;
        background-color: #000;
        margin: 0 10px;
      }

      .notebook-list small {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #666666;
      }

      .text-logo-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        margin:0;
      }
      .text-logo{
        font-family: "Montserrat", sans-serif;
        font-size:16px;
        font-weight:bold;
        padding:20px;
        margin-bottom:0;
        color: #fff;
        text-align: center;
        text-transform: uppercase;
      }
    </style>
    
      </head>
      <body>
         <div class="text-logo-wrapper">
          <h1 class="text-logo">Shop Sense</h1>
         </div>
          <h1>Travel Shopping Details</h1>
        <div class="notebook-list">
          <h2>${notebookList?.name}</h2>
          <div class ="dest-date">
          <p>${notebookList?.destination}</p>
          <p class="bullet"> </p>
          <p>${notebookList?.date}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${notebookList?.items
                .map(
                  (item: NoteProps) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.weight}</td>
                      <td>${Number(item.price).toFixed(2)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
          <small>${notebook?.id}</small>
        </div>
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${notebook?.name}.html`;
  link.href = url;
  link.click();
};

export default downloadNotebook;
