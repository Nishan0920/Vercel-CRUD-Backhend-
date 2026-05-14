import express, { Router, type Request, type Response } from "express";
import data from "../Models/User.js";
import { body, validationResult } from "express-validator";

const router: Router = express.Router();

interface CreateUser {
  title: string;
  description: string;
  id: string;
  note: string;
}
const noteValdiationResult = [
  body("title").isString().withMessage("Title must be string").trim(),
  body("description")
    .isString()
    .notEmpty()

    .withMessage("description cannot be short"),
];
router.post(
  "/createdata",
  noteValdiationResult,
  async (req: Request<{}, any, CreateUser>, res: Response): Promise<any> => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        res.status(400).json({
          success: false,
          errors: result.array(),
        });
      }
      const { title, description, id } = req.body;

      if (id) {
        const note = await data.findByIdAndUpdate(
          id,
          { title, description },
          { new: true },
        );
        res.status(200).json({
          success: true,
          message: "data updated",
          data: note,
        });
      } else {
        const newNote = await data.create({ title, description });
        res.status(200).json({
          success: true,
          message: "Data created",
          data: newNote,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },
);

router.get(
  "/getdata",

  async (req: Request, res: Response): Promise<any> => {
    try {
      const allNotes = await data.find({});

      res.status(200).json({
        success: true,
        message: "Data retrieved",
        data: allNotes,
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },
);

router.delete(
  "/deletenote", 
  async (req: Request, res: Response): Promise<any> => {
    try {

      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: "ID is required in body" });
      }

      const deletedNote = await data.findByIdAndDelete(id);

      if (!deletedNote) {
        return res.status(404).json({ success: false, message: "Note not found" });
      }

      res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

export default router;
