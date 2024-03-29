import express, { Request, Response } from "express";
import { HTTP_STATUSES } from "../utils/utils";
import { requestsResults } from "../utils/resultsRequests";
import { profileService } from "../domain/profile/profile-service";
import { inputValidationMiddleware, validationMiddleware } from "../middlewares/validationMiddlewares";
import { param } from "express-validator";

const profileRoutes = () => {
    const router = express.Router();

    router.get("/:domain", validationMiddleware(param, "domain"), inputValidationMiddleware,
        async (req: Request, res: Response) => {
            const ProfileFound = await profileService.getProfile(req.params.domain);

            ProfileFound ? res.json(ProfileFound).status(HTTP_STATUSES.OK200) :
                res.json(requestsResults.NOT_FOUND).status(HTTP_STATUSES.NOT_FOUND_404);
        });

    return router;
}

export default profileRoutes;