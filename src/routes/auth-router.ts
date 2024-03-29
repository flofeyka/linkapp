import { Request, Response, Router } from "express";
import { usersItemType } from "../types/usersType";
import { usersService } from "../domain/users/users-service";


export const authRouter = Router({});

authRouter.post("/login", async (req: Request, res: Response) => {
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
    if (user) {
        const i = 1;
    } else {
        res.status(401)
    }
})