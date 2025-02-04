import { InputFile } from "node-appwrite/file";
import Event from "../models/eventModel.js";
import Group from "../models/groupModel.js";
import { Client, ID, Storage } from "node-appwrite";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6739d36c00223845ed29")
  .setSession(process.env.AppWrite_Api);

const storage = new Storage(client);

export const createEvent = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const technical = JSON.parse(body.technicalEvents);
    const nonTechnical = JSON.parse(body.nonTechnicalEvents);

    const r = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID || "",
      ID.unique(),
      InputFile.fromBuffer(req.file.buffer, req.file.originalname || "name")
    );
    const link = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${r.$id}/view?project=${process.env.ProjectId}`;
    const event = new Event({
      title: body.title,
      description: body.description,
      userId: body.user,
      imageUrl: link,
      fileId: r.$id,
      technical: technical,
      nonTechnical: nonTechnical,
      eventDate: body.eventDate,
      startTime: body.startTime,
      endTime: body.endTime,
      swags: body.swags,
      refreshments: body.refreshments,
      amount: body.amount,
      paid: body.paid,
    });
    const newEvent = await event.save();
    console.log(newEvent);
    const technicalGroups = technical.map((data) => {
      return {
        name: data,
        description: body.description,
        eventId: newEvent._id,
        admin: body.user,
        members: [req.user._id],
        isHead: false,
      };
    });
    const nonTechnicalGroups = nonTechnical.map((data) => {
      return {
        name: data,
        description: body.description,
        eventId: newEvent._id,
        admin: body.user,
        members: [req.user._id],
        isHead: false,
      };
    });
    const headGroup = {
      name: body.title,
      description: body.description,
      eventId: newEvent._id,
      admin: body.user,
      members: [req.user._id],
      isHead: true,
    };
    console.log("technicalGroups: ", technicalGroups);
    console.log("nonTechnicalGroups: ", nonTechnicalGroups);
    Promise.all([
      Group.insertMany(technicalGroups),
      Group.insertMany(nonTechnicalGroups),
      new Group(headGroup).save(),
    ]).catch((err) => {
      throw err;
    });

    res.status(201).json({ message: "event created", data: newEvent });
  } catch (error) {
    console.log("Create event controller error" + error);
    return res.status(400).json({ error: error.message });
  }
};
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (req.user._id.toString() !== event.userId.toString()) {
      return res.status(401).json({
        error: "unautorized you are not able to edit the event",
      });
    }
    if (req.file) {
      if (event.fileId) {
        const result = storage.deleteFile(
          process.env.APPWRITE_BUCKET_ID,
          event.fileId
        );
      }
      const r = await storage.createFile(
        process.env.APPWRITE_BUCKET_ID || "",
        ID.unique(),
        InputFile.fromBuffer(req.file.buffer, req.file.originalname || "name")
      );
      const link = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${r.$id}/view?project=${process.env.ProjectId}`;
      event.fileId = r.$id;
      event.imageUrl = link || event.imageUrl;
    }
    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.userId = req.user._id || event.user;
    event.technical = req.body.technical;
    event.nonTechnical = req.body.nonTechnical;
    event.startTime = req.body.startTime;
    event.endTime = req.body.endTime;
    event.swags = req.body.swags;
    event.refreshments = req.body.refreshments;
    const updatedevent = await event.save();
    res.status(200).json({
      updatedevent,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.log("update event controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.params.id);
    const event = await Event.findById(req.params.id).populate("userId");
    console.log(event);
    if (event == null) {
      return res.status(404).json({ message: "Event not found!" });
    }

    if (req.user._id.toString() !== event.userId._id.toString()) {
      return res.status(401).json({
        error: "Unauthorized! You are not able to delete the event",
      });
    }
    const result = storage
      .deleteFile(process.env.APPWRITE_BUCKET_ID, event.fileId)
      .then((data) => console.log(data));

    console.log(event._id);
    await Promise.all([
      event.deleteOne(),
      Group.deleteMany({ eventId: event._id }),
    ]);

    // const user = await User.findById(event.user._id);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("delete event controller error" + error);
    res.status(400).json({ error: error.message });
  }
};
export const getEvents = async (req, res) => {
  try {
    const { userId } = req.query;
    const event = await Event.find(userId ? { userId } : {}).populate(
      "userId",
      ["-password"]
    );

    if (event == null) {
      return res.status(200).json({ message: " No event Found" });
    }
    res.json({ events: event });
  } catch (error) {
    console.log("getEvents  controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
export const getEventById = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const event = await Event.findById(eventId).populate("userId", [
      "-password",
    ]);

    if (event == null) {
      return res.status(200).json({ message: " Event Not Found" });
    }

    res.json({ event: event });
  } catch (error) {
    console.log("getEventById  controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
