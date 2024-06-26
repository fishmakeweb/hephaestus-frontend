import React from "react";
import { JewelryDetail } from "@/dbutils/jewelryAPI/viewJewelryDetail";

interface Props {
  jewelry: JewelryDetail;
}

const JewelryDetails: React.FC<Props> = ({ jewelry }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <table className="min-w-full">
        <tbody>
          {jewelry.name && (
            <tr>
              <th>Name:</th>
              <td>{jewelry.name}</td>
            </tr>
          )}
          {jewelry.price && (
            <tr>
              <th>Price:</th>
              <td>${jewelry.price}</td>
            </tr>
          )}
          {jewelry.material && jewelry.material.materialName && (
            <tr>
              <th>Material:</th>
              <td>{jewelry.material.materialName}</td>
            </tr>
          )}
          {jewelry.category && jewelry.category.categoryName && (
            <tr>
              <th>Category:</th>
              <td>{jewelry.category.categoryName}</td>
            </tr>
          )}
          {jewelry.gemstone && jewelry.gemstone.gemstoneName && (
            <tr>
              <th>Gemstone:</th>
              <td>{jewelry.gemstone.gemstoneName}</td>
            </tr>
          )}
          {jewelry.size && jewelry.size.sizeNumber && jewelry.size.unit && (
            <tr>
              <th>Size:</th>
              <td>
                {jewelry.size.sizeNumber} ({jewelry.size.unit})
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JewelryDetails;
