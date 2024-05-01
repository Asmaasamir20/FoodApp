import React from "react";
import NoDataa from "../../../../assets/images/no-data.png"
export default function DeleteData({deleteItem}) {
  return (
    <div className="text-center">
      <div className="NoDataaimg">
        <img src={NoDataa} alt="" className="w-100" />
      </div>

      <h4 className="py-3">Delete This {deleteItem}  ?!</h4>
      <p>
      are you sure you want to delete this item ? if you are sure just click on delete it
      </p>
    </div>
  );
}
