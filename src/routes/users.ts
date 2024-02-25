import {DataBase, RequestBody, RequestParams, RequestParamsBody, RequestQuery, usersType} from "../types/types";
import {usersFullNameModel, usersIdModel} from "../types/models/usersInputModel";
import express, {Response} from "express";
import {HTTP_STATUSES} from "../utils/utils";
import {usersRepository} from "../repositories/users-repository";

export const usersRoutes = (db: DataBase) => {
    const router = express.Router();

    router.get("/", (req: RequestQuery<usersFullNameModel>, res: Response<usersType[]>) => {
        let foundUsers = usersRepository.findUser(db.users, req.query.fullName)
        res.status(200).json(foundUsers);
    });
    router.get("/:id", (req: RequestParams<usersIdModel>, res: Response<usersType | string>) => {
        let usersFound = usersRepository.getUserById(+req.params.id, db.users);
        !usersFound ? res.sendStatus(HTTP_STATUSES.NOT_FOUND_404) : res.json(usersFound);
    });
    router.delete("/:id", (req: RequestParams<usersIdModel>, res: Response) => {
        let foundUsers = usersRepository.deleteUser(+req.params.id, db.users);
        !req.params.id && res.status(HTTP_STATUSES.BAD_REQUEST_400);
        foundUsers ? res.status(HTTP_STATUSES.NO_CONTENT_204).json(foundUsers) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    });
    router.put("/:id", (req: RequestParamsBody<usersIdModel, usersFullNameModel>, res: Response) => {
        let foundUser = usersRepository.editFullNameUser(db.users, +req.params.id, req.body.fullName);
        foundUser ? res.setHeader('Content-Type', 'application/json').json(foundUser)
            .sendStatus(HTTP_STATUSES.CREATED_201) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    });
    router.post("/", (req: RequestBody<usersFullNameModel>, res: Response) => {
        let createdUser = usersRepository.createUser(db.users, req.body.fullName)
        createdUser ? res.json(createdUser).sendStatus(HTTP_STATUSES.CREATED_201)
            : res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    });

    return router;
}