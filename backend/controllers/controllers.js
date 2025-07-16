import DetailModel from "../models/user.js";

export async function addData(req, res) {
  try {
    console.log(req.body);

    const dataToAdd = new DetailModel(req.body);
    await dataToAdd.save();
    res.status(200).send("Data Added");
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an error", error.message);
  }
}
