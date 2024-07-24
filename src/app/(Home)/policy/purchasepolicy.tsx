"use client"
import { useState } from "react";
import React from "react";
import Commitments from "./commitment"; // Make sure the path is correct based on your project structure
import BuyPolicy from "./buypolicy";
import PayPolicy from "./paypolicy";
import ReturnPolicy from "./returnpolicy";
import WarrantyPolicy from "./warranty";
import SecurePolicy from "./securitypolicy";
import Guide from "./guide";
const PurchasePolicy = () => {
  const [showCommitments, setShowCommitments] = useState(false);
  const [showBuyPolicy, setShowBuyPolicy] = useState(false);
  const [showPayPolicy, setShowPayPolicy] = useState(false);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [showWaranty, setShowWaranty] = useState(false);
  const [showSecure, setShowSecure] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="bg-white p-4 md:p-8 lg:p-12">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        Chính Sách Và Điều Khoản Mua Hàng
      </h1>
      <p className="text-sm md:text-base text-gray-700 mb-2">
        Hephaestus chính thức thành lập vào tháng 05/2024 với mục tiêu mang đến
        cho khách hàng Việt Nam cơ hội sở hữu trang sức kim cương thiên nhiên
        chất lượng cao ở chi phí hợp lý.
      </p>
      <p className="text-sm md:text-base text-gray-700 mb-2">
        Trong bối cảnh “tranh tối tranh sáng” của thị trường Kim cương trong
        nước - nơi có sự tham gia của rất nhiều cá nhân & đơn vị lớn nhỏ với vô
        vàn tiêu chuẩn chất lượng và mức giá khác nhau, chúng tôi đã chứng kiến
        rất nhiều người tiêu dùng phải chịu thiệt thòi vì mua hàng chỉ dựa vào
        cảm tính, yếu tố truyền miệng hay lời mời chào của người bán.
      </p>
      <p className="text-sm md:text-base text-gray-700 mb-2">
        Vì lẽ đó, bên cạnh yếu tố quan trọng nhất là chất lượng sản phẩm,
        Hephaestus còn đặt ra sứ mệnh chia sẻ những thông tin trung thực, những
        kiến thức chính xác về Kim cương Thiên nhiên đến công chúng; qua đó giúp
        mỗi khách hàng có thể tự tin ra quyết định đúng đắn và đạt được lợi ích
        tối đa. Chúng tôi tin rằng, với những nỗ lực của mình, thị trường sẽ
        ngày càng trở nên chuẩn mực hơn, minh bạch hơn và việc sở hữu kim cương
        thiên nhiên sẽ ngày càng dễ dàng hơn.
      </p>
      <p className="text-sm md:text-base text-gray-700">
        Chúng tôi theo đuổi mô hình “Click & Brick” - kết hợp thế mạnh của các
        nền tảng online và cửa hàng vật lý nhằm mục tiêu biến trang sức kim
        cương và việc mua sắm trang sức kim cương thật sự trở thành niềm vui
        thích, một trải nghiệm đặc sắc cho những khách hàng thế hệ mới - hiện
        đại, cá tính và đòi hỏi rất cao.
      </p>
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowCommitments(!showCommitments)}
      >
        {showCommitments ? "Ẩn cam kết" : "Xem cam kết của Hephaestus"}
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showCommitments && <Commitments />}
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowBuyPolicy(!showBuyPolicy)}
      >
        {showBuyPolicy ? "Ẩn chính sách mua hàng" : "Xem chính sách mua hàng"}
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showBuyPolicy && <BuyPolicy />}
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowPayPolicy(!showPayPolicy)}
      >
        {showPayPolicy ? "Ẩn chính sách" : "Xem chính sách thanh toán"}
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showPayPolicy && <PayPolicy />}
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowReturnPolicy(!showReturnPolicy)}
      >
        {showReturnPolicy ? "Ẩn chính sách" : "Xem chính sách thu đổi"}
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showReturnPolicy && <ReturnPolicy />}
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowWaranty(!showWaranty)}
      >
        {showReturnPolicy ? "Ẩn chính sách" : "Xem chính sách bảo hành"}
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showWaranty && <WarrantyPolicy />}
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowSecure(!showSecure)}
      >
        {showSecure ? "Ẩn chính sách" : "Xem chính sách bảo mật thông tin"}
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showSecure && <SecurePolicy />}
      <button
        className="flex gap-5 hover:text-custom-brown justify-center px-0.5 py-3 mt-9 text-xl whitespace-nowrap border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full"
        onClick={() => setShowGuide(!showGuide)}
      >
        {showGuide ? "Ẩn hướng dẫn" : "Xem hướng dẫn sử dụng"}
        <img
          loading="lazy"
          alt=""
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e79619d6d6b36f08d933bffaf65933ca66414fb4b6e9b0f6c0ed83858787e4f?"
          className="shrink-0 w-6 aspect-square"
        />
      </button>
      {showGuide && <Guide />}
    </div>
  );
};

export default PurchasePolicy;
