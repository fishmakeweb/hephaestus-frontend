import React from "react";

const WarrantyPolicy = () => {
  return (
    <div className="text-sm md:text-base text-gray-700 space-y-4 p-4 bg-white shadow rounded-lg">     
      <div>
        <strong>Chính sách bảo hành của Hephaestus:</strong>
        <ul className="list-disc pl-5">
          <li>
          Hephaestus khuyến khích khách hàng đến văn phòng Hephaestus để được bảo hành, kiểm tra sản phẩm mỗi 6 tháng một lần để đảm bảo sản phẩm luôn trong tình trạng tốt nhất, hạn chế các rủi ro hư hỏng nặng hoặc rơi viên chủ.
          </li>
          <li>
          Quý khách cần mang theo hóa đơn điện tử chúng tôi gửi trong email khi đến liên hệ để được kiểm tra và bảo hành sản phẩm.
          </li>
          <li>
          Đối với các hạng mục bảo hành có thể hoàn thành trong thời gian dưới 30 phút, chúng tôi sẽ ưu tiên để xử lý để khách hàng nhận ngay. Đối với các hạng mục cần nhiều thời gian, Hephaestus sẽ có giấy hẹn ngày nhận lại sản phẩm. Thông thường, thời gian bảo hành sản phẩm không quá 3 ngày làm việc, trừ các mùa cao điểm hoặc các dịp lễ Tết.
          </li>
          <li>
          Lưu ý: Khi nhận lại sản phẩm được bảo hành, chúng tôi khuyến khích khách hàng kiểm tra lại sản phẩm theo đúng “Quy định kiểm tra hàng hóa khi nhận hàng” ở mục 5 phần “Chính sách mua hàng”.
          </li>
        </ul>
        <p>Hephaestus có quyền từ chối bảo hành đối với các sản phẩm có dấu hiệu bị thay đổi, tác động, chỉnh sửa bởi bất kì đơn vị nào khác không trực thuộc Hephaestus.</p>
      </div>     
    </div>
  );
};

export default WarrantyPolicy;
