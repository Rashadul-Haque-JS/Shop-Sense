
import { NoteProps } from "@/types/types";
const downloadNotebook = (notebook:NoteProps) => {
    const notebookList = JSON.parse(JSON.stringify(notebook));;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
            .notebook-list {
              font-family: Arial, sans-serif;
              width: 500px;
              min-height: 800;
              margin-top: 20px;
              background-color: #gray;
            }
    
            .notebook-list h2 {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
            }
    
            .notebook-item {
              list-style-type: none;
              margin-bottom: 5px;
            }
    
            .item-name {
              font-weight: bold;
              margin-right: 10px;
            }
    
            .item-price {
              color: green;
            }
          </style>
        </head>
        <body>
          <div class="notebook-list">
            <h2>${notebookList?.name}</h2>
            <ul>
              ${notebookList?.items
                .map(
                  (item:NoteProps) => `
                    <li class="notebook-item">
                      <span class="item-name">${item.name}</span>
                      <span class="item-name">${item.weight}</span>
                      <span class="item-price">${Number(item.price).toFixed(2)}</span>
                    </li>
                  `
                )
                .join("")}
            </ul>
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