import express from "express";
import { memoryStore } from "../app";

const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  memoryStore.all((err, session) => {
    console.log(session);
    res.render("dashboard", {
      user: req.user,
      session: session
    });
  });
});

router.post("/revoke", ensureAuthenticated, (req, res) => {
  console.log(req.body.id);
  memoryStore.destroy(req.body.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      memoryStore.all((err, session) => {
        console.log(session);
        res.render("dashboard", {
          user: req.user,
          session: session
        });
      });
    }
  })

});


export default router;
