import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { parseArgs } from "node:util";

const prisma = new PrismaClient();

async function main() {
  const {
    values: { environment },
  } = parseArgs({
    options: {
      environment: { type: "string" },
    },
  });

  let email = "";
  let password = "";

  switch (environment) {
    case "development":
      email = process.env.ADMIN_EMAIL!;
      password = process.env.ADMIN_PASSWORD!;
      break;
    case "production":
      email = process.env.PROD_ADMIN_EMAIL!;
      password = process.env.PROD_ADMIN_PASSWORD!;
      break;
    default:
      break;
  }

  if (email && password) {
    const hashPass = await hash(password, 10);

    await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {},
      create: {
        email: email,
        password: hashPass,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
