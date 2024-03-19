const { Schema, model } = require("mongoose");
// joi перевіряє тіло запиту те що прийшло, а монгуст те що зберігаємо
const Joi = require("joi");
const { handleMongooseError } = require("../middlewares");

const mailRegexpe = /^\S+@\S+\.\S+$/;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: mailRegexpe,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
// якщо при створенні запису виявилась помилка, то виводим помилку міделварою зі статусом  400
contactSchema.post("save", handleMongooseError);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(mailRegexpe).required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = { joiSchema, favoriteJoiSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
