const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.joiSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.joiSchema),
  ctrl.updateById
);
// будемо оновлювати тыльки поле favorite
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.favoriteJoiSchem),
  ctrl.updateFavorite
);

module.exports = router;
