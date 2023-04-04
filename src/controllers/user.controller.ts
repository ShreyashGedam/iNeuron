import { Request, Response, Router } from "express";
import User, { IUser } from "../models/user.model";

const Route = Router();

/**
 * @openapi
 * '/users':
 *  get:
 *     tags:
 *     - ADD
 *     summary: Get all users
 *     requestBody:
 *     responses:
 *      200:
 *        description: Get All users
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 */

Route.get("/users", async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @openapi
 * '/createUser':
 *  post:
 *     tags:
 *     - GET
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: User Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

Route.post(
  "/createUser",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const _user = await User.findOne({ name: req.body.name });
      const _email = await User.findOne({ email: req.body.email });
      if (_user || _email) {
        res
          .status(409)
          .send({ message: "email or password is already presnet" });
        return;
      }

      const user: IUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/**
 * @openapi
 * '/updateUser/:id':
 *  patch:
 *     tags:
 *     - UPDATE
 *     summary: Update a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: User Not found
 */

Route.patch(
  "/updateUser/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user: IUser | null = await User.findById(req.params.id);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      await user.save();
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/**
 * @openapi
 * '/deleteUser/:id':
 *  patch:
 *     tags:
 *     - DELETE
 *     summary: Delete a user
 *     requestBody:
 *     responses:
 *      200:
 *        description: User deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: User Not found
 */

Route.delete(
  "/deleteUser/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default Route;
