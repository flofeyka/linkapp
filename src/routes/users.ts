import express, { Request, Response } from "express";
import { HTTP_STATUSES } from "../utils/utils";
import { usersService } from "../domain/users/users-service";
import { body, param } from "express-validator";
import { inputValidationMiddleware, validationMiddleware } from "../middlewares/validationMiddlewares";
import { requestsResults } from "../utils/resultsRequests";
import { jwtService } from "../application/jwt-service";


const usersRoutes = () => {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        const foundUsers = await usersService.findUser(req.query.fullName);

        !foundUsers && res.status(400);

        res.json({
            result: requestsResults.SUCCESS,
            totalCount: 0,
            Items: foundUsers
        }).status(HTTP_STATUSES.OK200)
    });

    router.get("/:domain", inputValidationMiddleware,
        async (req: Request, res: Response) => {
            const usersFound = await usersService.getUserByDomain(req.params.domain);

            !usersFound ? res.json(requestsResults.NOT_FOUND).status(HTTP_STATUSES.NOT_FOUND_404)
                : res.json(usersFound);
        });

    router.delete("/:domain", validationMiddleware(param, "domain"), inputValidationMiddleware,
        async (req: Request, res: Response) => {
            const foundUsers = await usersService.deleteUser(req.params.domain);

            !req.params.domain && res.status(HTTP_STATUSES.BAD_REQUEST_400);

            foundUsers ? res.json(requestsResults.SUCCESS).status(HTTP_STATUSES.NO_CONTENT_204) :
                res.json(requestsResults.NOT_FOUND).status(HTTP_STATUSES.NOT_FOUND_404);
        });

    router.put("/:domain", validationMiddleware(param, "domain"), validationMiddleware(body, "fullName"), inputValidationMiddleware,
        async (req: Request, res: Response) => {
            const editedUser = await usersService.editFullNameUser(req.params.domain, req.body.fullName);

            editedUser ? res.json({
                result: requestsResults.SUCCESS,
                editedUser
            }).status(HTTP_STATUSES.CREATED_201) : res.json({
                result: requestsResults.NOT_FOUND
            })

        });

    return router;
}

export default usersRoutes;