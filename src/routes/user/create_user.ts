import  express  from "express";
import { UserE } from "../../entity/userE";

const router = express.Router();

router.post('/api/user', async (req, res) => {
    const { 
        name,
        email,
        password
    } = req.body;

    
    const user = UserE.create({
        name,
        email,
        password
    });

    user.save();

    return res.json(user);
});

export {
    router as createUserR
}