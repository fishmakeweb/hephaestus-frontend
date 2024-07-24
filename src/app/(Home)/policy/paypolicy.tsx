// Commitments.tsx
import React from "react";

const PayPolicy = () => {
  return (
    <div className="text-sm md:text-base text-gray-700 space-y-4 p-4 bg-white shadow rounded-lg">
        <p className="italic">
        Chúng tôi chấp nhận đa dạng các hình thức thanh toán bao gồm tiền mặt,
        chuyển khoản ngân hàng, QR code.
        </p>

      <ol className="list-decimal">
        <li>
          <p>
            <strong>Thanh toán tiền mặt :</strong>
          </p>
          <ul className="list-disc">
            <li>
              Theo quy định của nhà nước, chúng tôi chỉ chấp nhận thanh toán
              bằng Việt Nam Đồng.
            </li>
            <li>
              Chúng tôi có quyền từ chối nhận tiền nếu nghi ngờ bất kì tờ tiền
              nào không nguyên vẹn, có dấu hiệu bị làm giả hoặc có nguồn gốc
              không rõ ràng.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Thanh toán bằng Chuyển khoản Ngân hàng và QR Code :</strong>
          </p>
          <ul className="list-disc">
            <li>
              Việc thanh toán chỉ được xem là thành công khi ngân hàng xác nhận
              tài khoản của Hephaestus đã nhận được tiền. .
            </li>
            <li>
              Khách hàng chịu các loại phí liên quan đến việc chuyển tiền qua
              ngân hàng.
            </li>
          </ul>
        </li>
      </ol>
      <p className="italic">
        Ghi chú: Các hình thức thanh toán qua Thẻ, QR code (hiện tại là
        PayOS.vn). Vì vậy, các chính sách và mức phí thanh toán có thể thay đổi
        phụ thuộc vào chính sách của đơn vị đối tác
      </p>
    </div>
  );
};

export default PayPolicy;
