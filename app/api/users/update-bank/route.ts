import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan path ini benar sesuai projekmu

export async function PATCH(req: Request) {
  try {
    const { idEmployee, bankAccount } = await req.json();

    if (!idEmployee || !bankAccount) {
      return NextResponse.json(
        { error: "idEmployee dan bankAccount wajib diisi." },
        { status: 400 }
      );
    }

    // Update bank account pengguna berdasarkan ID karyawan
    const updated = await prisma.users.update({
      where: { idEmployee },
      data: {
        Bank: {
          update: {
            bankAccount,
          },
        },
      },
    });

    return NextResponse.json({ message: "Berhasil diperbarui", user: updated });
  } catch (error) {
    console.error("Gagal update bank:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui rekening pengguna." },
      { status: 500 }
    );
  }
}
