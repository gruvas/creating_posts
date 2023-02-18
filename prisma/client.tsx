import { PrismaClient } from '@prisma/client'

declare global {
	namespace NodeJS {
		interface Global {}
	}
}

interface CustomNodeJsGlobal extends NodeJS.Global {
	prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'production') {
	globalThis.prisma = client
}

export default client
