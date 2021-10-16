import { UserE } from '../src/entity/userE'
export const common = {
    port: 8080,
	hostname: process.env.SERVER_HOSTNAME || 'localhost'
}

export const mysql = {
		type: "mysql",
		host: "localhost",
		port: 3306,
		username: "root",
		password: "12345678",
		database: "dmcdb",
		entities:[UserE],
		synchronize: true,
}
