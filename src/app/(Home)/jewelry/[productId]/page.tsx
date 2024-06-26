import React from "react";
import JewelryItem from "./jewelryItem";
import NavbarPage from "../../navbar/page"; // Adjust path as needed

const JewelryDetailPage: React.FC = () => {
  return (
    <div className="bg white">
      <NavbarPage />
      <JewelryItem />
    </div>
  );
};

export default JewelryDetailPage;
