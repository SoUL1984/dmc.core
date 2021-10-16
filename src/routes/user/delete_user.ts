import express from 'express';
import { UserE } from "../../entity/userE";

const router = express.Router();

router.delete(
	'/api/user/:user_id',
	async (req, res) => {
		const { user_id } = req.params;

		const response = await UserE.delete(
			user_id
		);

		return res.json(response);
	}
);

export { router as deleteUserR };