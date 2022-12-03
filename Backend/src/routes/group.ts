import { Router } from "express";
import { authMiddleWare } from "../middleware";
import {  Group, User } from "../models";
import mongoose from "mongoose";

// Add Group | Create New Group
router.post("/", authMiddleWare, async (req, res) => {
    const group = new Group({
      name: req.body.name,
      description: req.body.description,
      members: req.body.members,
    });
    await group.save();

    res.send(group);
  });

// Delete group
router.delete("/:groupId", authMiddleWare, async (req, res) => {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).send("Group not found");
    }

    const result = await Group.deleteOne({ _id: groupId });

    return res.send("Group Deleted");
  });

  export default router;