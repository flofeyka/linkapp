import { Request, Response, Router } from "express";
import { usersService } from "../domain/users/users-service";
import { jwtService } from "../application/jwt-service";
import { emailValidationMiddleware, inputValidationMiddleware, validationMiddleware } from "../middlewares/validationMiddlewares";
import { body } from "express-validator";



const authRoutes = () => {
    const router = Router({});

    router.post("/login", async (req: Request, res: Response) => {
        const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
        if (user) {
            const token = await jwtService.createJwt(user);
            res.status(201).json(token);
        } else {
            res.status(401)
        }
    })

    router.post("/register", validationMiddleware(body, "fullName"), validationMiddleware(body, "login"),
        emailValidationMiddleware(body, "email"), validationMiddleware(body, "password"),
        inputValidationMiddleware, async (req: Request, res: Response) => {
            const { fullName, login, email, password } = req.body;
            const result = await usersService.createUser(fullName, login, email, password);
            result && res.json(result)
        });

    return router;
}

export default authRoutes;
