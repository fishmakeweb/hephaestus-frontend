import React, { useState } from "react";
import { JewelryDetail } from "@/dbutils/jewelryAPI/viewJewelryDetail";
import JewelryDetails from "./jewelryDetails";
interface Props {
  data: JewelryDetail;
}

const JewelryItemData: React.FC<Props> = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowDetails(!showDetails)}
      >
        XEM CHI TIẾT SẢN PHẨM
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showDetails && <JewelryDetails jewelry={data} />}
    </div>
  );
};

export default JewelryItemData;
