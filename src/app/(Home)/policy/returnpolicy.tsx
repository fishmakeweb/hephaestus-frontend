import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="text-sm md:text-base text-gray-700 space-y-4 p-4 bg-white shadow rounded-lg">
      <strong>Các sản phẩm của Hephaestus được chia thành 5 nhóm:</strong>
      <ul className="list-disc pl-5">
        <li>
          <strong>Nhóm 1: </strong>
          Kim cương thiên nhiên.
        </li>
        <li>
          <strong>Nhóm 2: </strong>
          Trang sức kim cương thiên nhiên.
        </li>
        <li>
          <strong>Nhóm 3: </strong>
          Trang sức trơn.
        </li>
        <li>
          <strong>Nhóm 4: </strong>
          Trang sức kim cương đặt hàng.
        </li>
        <li>
          <strong>Nhóm 5: </strong>
          Trang sức trơn đặt hàng.
        </li>
      </ul>
      <div>
        <strong>Chính sách thu đổi:</strong>
        <ul className="list-disc pl-5">
          <li>
            Sản phẩm mua trên 1 năm: sẽ xem xét được thu đổi tùy thuộc vào tình trạng của sản phẩm. Ví dụ: mức độ hao mòn, hư hỏng.
          </li>
          <li>
            Sản phẩm mua dưới 1 năm: giá thu đổi dao động từ 60% - 80% giá trị lúc ban đầu tùy thuộc vào nhiều yếu tố như tình trạng sản phẩm, phụ kiện kèm theo, v.v.
          </li>
          <li>
            Sản phẩm tác chế:
            <ul className="list-disc pl-5">
              <li>
                Khi đã giao đến tay khách hàng:
                <ul className="list-disc pl-5">
                  <li>
                    Dưới 1 năm: giá thu đổi dao động từ 60% - 70% giá trị lúc ban đầu tùy thuộc vào nhiều yếu tố như tình trạng sản phẩm, phụ kiện kèm theo, v.v.
                  </li>
                  <li>
                    Trên 1 năm: sẽ xem xét được thu đổi tùy thuộc vào tình trạng của sản phẩm.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p>Quý khách vui lòng liên hệ bộ phận hỗ trợ khách hàng của Hephaestus để biết thêm chi tiết và quy trình thu đổi sản phẩm.</p>
      </div>
      <div>
        <strong>Chính sách hủy:</strong>
        <ul className="list-disc pl-5">
          <li>
            Sản phẩm sau khi thực hiện thanh toán thành công và đã nhận được hàng: Không thể hủy.
          </li>
          <li>
            Sản phẩm sau khi thực hiện thanh toán thành công và chưa nhận được hàng: Có thể liên hệ nhân viên Hephaestus để kiểm tra tình trạng hàng và khả năng hủy đơn hàng.
          </li>
          <li>
            Sản phẩm tác chế:
            <ul className="list-disc pl-5">
              <li>
                Khi đã thanh toán trước:
                <ul className="list-disc pl-5">
                  <li>
                    Trong vòng 3 ngày: Bạn có thể liên hệ nhân viên Hephaestus để yêu cầu hủy đơn hàng.
                  </li>
                  <li>
                    Sau 3 ngày: Không thể hủy.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p className="italic">Hephaestus chỉ chấp nhận thu đổi sản phẩm nếu khách hàng còn giữ đầy đủ giấy tờ như Giấy Kiểm định GIA (đối với viên chủ) và sản phẩm còn nguyên vẹn, không bị hư hỏng, sứt mẻ, bóp méo hay nứt gãy.</p>
        <p>Quý khách vui lòng liên hệ bộ phận hỗ trợ khách hàng của Hephaestus để biết thêm chi tiết và quy trình hủy đơn hàng.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
