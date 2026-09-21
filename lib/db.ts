import "server-only";
import { PrismaClient } from "@prisma/client";

// Una sola instancia por proceso (evita agotar conexiones en desarrollo con recarga en caliente).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
