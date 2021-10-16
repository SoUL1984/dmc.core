import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { UserE } from "../../entity/userE";

const router = express.Router();

router.get('/api/user', async (req, res) => {
	const users = await createQueryBuilder(
		'users'
	)
		.select('users')
		.from(UserE, 'users')
		.getMany();

	return res.json(users);
});

export { router as fetchUserR };