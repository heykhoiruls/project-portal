// app/api/user-profile/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { idEmployee } = await req.json();

    if (!idEmployee) {
      return NextResponse.json(
        { error: "idEmployee tidak dikirim" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { idEmployee },
      select: {
        name: true,
        idEmployee: true,
        Contact: { select: { email: true, phone: true } },
        Bank: { select: { bankAccount: true } },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("POST /user-profile", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { idEmployee, bankAccount, email, phone } = await req.json();

    if (!idEmployee || !bankAccount) {
      return NextResponse.json(
        { error: "idEmployee dan bankAccount wajib diisi" },
        { status: 400 }
      );
    }

    const bankExist = await prisma.bank.findUnique({
      where: { idEmployee },
    });
    
    const contactExist = await prisma.contact.findUnique({
      where: { idEmployee },
    });

    if (!bankExist) {
      await prisma.bank.create({
        data: {
          idEmployee,
          bankAccount,
        },
      });
    } else {
      await prisma.bank.update({
        where: { idEmployee },
        data: { bankAccount },
      });
    }
    if (!contactExist) {
      await prisma.contact.create({
        data: {
          idEmployee,
          email,
          phone,
        },
      });
    } else {
      await prisma.contact.update({
        where: { idEmployee },
        data: { email, phone },
      });
    }

    return NextResponse.json({ message: "Nomor rekening berhasil diperbarui" });
  } catch (error) {
    console.error("PATCH /user-profile", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data rekening" },
      { status: 500 }
    );
  }
}
