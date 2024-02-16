import { clientConnection } from "../helpers/databaseConnection.js";
// import { ObjectId } from "mongodb";
import { ObjectId } from "bson";
import { client } from "../helpers/redisConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const create = async (req, res) => {
  try {
    const result = await clientConnection().insertOne({
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      email: req.body.email,
      address: {
        correspondence: [
          { cHouse: req.body.cHouse },
          { cStreet: req.body.cStreet },
        ],
        permanent: [{ pHouse: req.body.pHouse }, { pStreet: req.body.pStreet }],
      },
      phone: {
        personalNumber: req.body.personalNumber,
        alternativeNumber: req.body.alternativeNumber,
      },
    });
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create controller",
      error,
    });
  }
};
export const read = async (req, res) => {
  try {
    const result = await clientConnection().find({}).toArray();
    console.log("Found documents =>", result);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in read controller",
      error,
    });
  }
};

export const readbyemail = async (req, res) => {
  try {
    const userEmail = req.params[process.env.CACHE_NAME];
    const result = await clientConnection()
      .find({
        email: req.params.email,
      })
      .toArray();

    console.log(result);

    await client.set(userEmail, JSON.stringify(result), "EX", 60 * 60 * 24);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in read by id controller",
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = await clientConnection().updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          "name.firstName": req.body.firstName,
          "name.lastName": req.body.lastName,
          email: req.body.email,
          "address.correspondence.0.cHouse": req.body.cHouse,
          "address.correspondence.1.cStreet": req.body.cStreet,
          "address.permanent.0.pHouse": req.body.pHouse,
          "address.permanent.1.pStreet": req.body.pStreet,
          "phone.personalNumber": req.body.personalNumber,
          "phone.alternativeNumber": req.body.alternativeNumber,
        },
      }
    );

    const updatedResult = await clientConnection()
      .find({
        _id: new ObjectId(req.params.id),
      })
      .toArray();

    const userEmail = updatedResult[0]?.email;

    await client.set(
      userEmail,
      JSON.stringify(updatedResult),
      "EX",
      60 * 60 * 24
    );

    console.log("updated documents =>", result);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update controller",
      error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    console.log(req.params.id, "test");
    const id = new ObjectId(req.params.id);
    const result = await clientConnection().deleteOne({
      _id: id,
    });
    console.log("Deleted document =>", result);
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "error in remove controller",
      error,
    });
  }
};

export const clearCache = async (req, res) => {
  try {
    const result = await client.flushDb();
    res.send({
      message: "cache cleared",
      result,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "error in clearcache controller",
      error,
    });
  }
};
