import { Router } from "express";
const router = Router();
import { userModel } from "../model/users.js";

// ----------- route for users Register ---------------

router.post("/register", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "send all field",
    });
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await userModel.create(newUser);
  return res.status(201).send(user);
});

// --------------- route for users login --------------------
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "send all fields ",
    });
  }

  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password)
        res.status(200).send({
          user,
          message: "success",
        });
      else {
        res.status(401).send({
          message: "failed",
        });
      }
    } else {
      res.status(400).send({
        message: "User not found",
      });
    }
  });
});

// ----------------- route to get the dnsrecord of a user ---------------------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    return res.status(200).send(user.dnsrecord);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// ---------------- route for the insert new dnsrecord -------------------

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    console.log(req.body);
    if (!req.body.dnstype || !req.body.dnsName || !req.body.dnsStatus) {
      return res.status(401).send({ message: "error updating message" });
    }
    user.dnsrecord.push(req.body);
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error adding DNS record to user:", error);
  }
});

export default router;
