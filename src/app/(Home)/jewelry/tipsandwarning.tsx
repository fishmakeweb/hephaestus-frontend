import React from "react";

const TipsAndWarnings = () => {
  const tips = [
    {
      title: "Hiểu Về 4Cs",
      content:
        "4Cs của chất lượng kim cương bao gồm Màu sắc (Color), Độ trong (Clarity), Giá tiềnc cắt (Cut), và Trọng lượng carat (Carat Weight). Mỗi yếu tố này ảnh hưởng đến vẻ ngoài và Giá tiền trị của kim cương. Hãy chắc chắn kiểm tra chứng nhận để biết chi tiết khi mua hàng.",
    },
    {
      title: "Chăm Sóc Và Xử Lý Đúng Cách",
      content:
        "Kim cương và trang sức cao cấp cần được xử lý cẩn thận. Nên làm sạch và kiểm tra định kỳ để duy trì độ sáng và đảm bảo độ chắc chắn của các thiết lập.",
    },
    {
      title: "Giải Pháp Lưu Trữ",
      content:
        "Lưu trữ trang sức của bạn trong hộp có lót hoặc túi mềm để tránh trầy xước. Giữ các món trang sức riêng biệt để tránh bị rối hoặc gây hư hỏng cho nhau.",
    },
    {
      title: "Đeo Nhẫn Vừa Vặn",
      content:
        "Hãy đảm bảo nhẫn vừa vặn bằng cách đo ngón tay của bạn tại cửa hàng trang sức. Kích thước ngón tay có thể thay đổi theo thời tiết và thời gian trong ngày. Nếu bạn đang giữa hai kích thước, hãy chọn kích thước lớn hơn để thoải mái.",
    },
    {
      title: "Chăm Sóc Trang Sức Tinh Tế",
      content:
        "Xử lý trang sức tinh tế một cách cẩn thận. Tránh đeo trang sức cao cấp khi thực hiện các hoạt động có thể gây mài mòn hoặc va đập. Luôn tháo trang sức trước khi bơi, làm sạch, hoặc thoa kem dưỡng và nước hoa để tránh hư hỏng hóa chất.",
    },
  ];

  return (
    <div className="flex flex-col">
      {tips.map((tip, index) => (
        <div key={index} className="p-4 m-2 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
          <p className="text-gray-600 mt-2">{tip.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TipsAndWarnings;
