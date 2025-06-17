import React from "react";

interface ContactNoticeProps {
  email?: string | null;
  phone?: string | null;
}

const ContactNotice: React.FC<ContactNoticeProps> = ({ email, phone }) => {
  if (!email && !phone) {
    return (
      <p className="text-xs text-center italic px-5 text-red-500">
        Mohon lengkapi <span className="font-semibold">email</span> dan{" "}
        <span className="font-semibold">nomor telepon</span> WhatsApp kamu
        karena diperlukan untuk pengiriman slip gaji dan kelancaran komunikasi.
      </p>
    );
  }

  return (
    <>
      {!email && (
        <p className="text-xs text-center italic px-5 text-red-500">
          Mohon lengkapi <span className="font-semibold">email</span> kamu
          karena untuk mengirim slip gaji.
        </p>
      )}
      {!phone && (
        <p className="text-xs text-center italic px-5 text-red-500">
          Mohon lengkapi <span className="font-semibold">nomor telepon</span>{" "}
          WhatsApp untuk kelancaran komunikasi.
        </p>
      )}
    </>
  );
};

export default ContactNotice;
