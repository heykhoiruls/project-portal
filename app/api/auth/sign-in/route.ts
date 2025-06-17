import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { messages } from "@/lib/messages";

export async function POST(req: Request) {
  const { idEmployee, password } = await req.json();

  if (!idEmployee || !password) {
    return NextResponse.json(
      { success: false, message: messages.signIn.required },
      { status: 400 }
    );
  }

  const user = await prisma.users.findUnique({
    where: { idEmployee: String(idEmployee) },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: messages.signIn.userNotFound },
      { status: 404 }
    );
  }

  if (user.password !== password) {
    return NextResponse.json(
      { success: false, message: messages.signIn.passwordError },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true, user });
}
