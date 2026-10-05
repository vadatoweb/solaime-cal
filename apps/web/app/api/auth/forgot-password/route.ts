import { passwordResetRequest } from "@calcom/features/auth/lib/passwordResetRequest";
import { checkRateLimitAndThrowError } from "@calcom/lib/checkRateLimitAndThrowError";
import { emailSchema } from "@calcom/lib/emailSchema";
import getIP from "@calcom/lib/getIP";
import { piiHasher } from "@calcom/lib/server/PiiHasher";
import prisma from "@calcom/prisma";
import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";
import { parseRequestData } from "app/api/parseRequestData";
import type { NextRequest } from "next/server";
import { after, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const body = await parseRequestData(req);
  const email = emailSchema.transform((val) => val.toLowerCase()).safeParse(body?.email);

  if (!email.success) {
    return NextResponse.json({ message: "email is required" }, { status: 400 });
  }

  const ip = getIP(req) ?? email.data;

  await checkRateLimitAndThrowError({
    rateLimitingType: "core",
    identifier: `forgotPassword:${piiHasher.hash(ip)}`,
  });

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.data },
      select: { name: true, email: true, locale: true },
    });
    // Don't leak info about whether the user exists
    //
    // Solaime, 5 octobre 2026. L'appel d'origine n'etait pas attendu : sur un
    // serveur qui dure, il finit apres la reponse. Sur Vercel, la fonction est
    // gelee des la reponse rendue, la demande n'est jamais ecrite en base et le
    // courriel ne part jamais, alors que l'interface affiche « email envoye ».
    // after() garde la fonction en vie jusqu'au bout du travail, sans rallonger
    // la reponse, donc sans trahir par sa duree l'existence d'un compte.
    if (user) after(() => passwordResetRequest(user).catch(console.error));
    return NextResponse.json({ message: "password_reset_email_sent" }, { status: 201 });
  } catch (reason) {
    console.error(reason);
    return NextResponse.json({ message: "Unable to create password reset request" }, { status: 500 });
  }
}

export const POST = defaultResponderForAppDir(handler);
