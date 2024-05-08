const File = require("../models/file");

const createFile = async (payload) => {
  try {
    const createdFile = await File.create(payload);
    return {
      ...createdFile.toObject(),
      id: createdFile._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateFile = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedFile = await File.findByIdAndUpdate(payload.id, payload, {
      new: true,
    });
    if (!updatedFile) throw new Error("File not found");

    return {
      ...updatedFile.toObject(),
      id: updatedFile._id,
    };
  } catch (err) {
    throw err;
  }
};
const getFilesByParams = async (params) => {
  try {
    const files = await File.find(params);
    return files.map((file) => ({
      ...file.toObject(),
      id: file._id,
    }));
  } catch (err) {
    throw err;
  }
};
const deleteFileById = async (id) => {
  try {
    const deletedFile = await File.findByIdAndDelete(id);
    if (!deletedFile) throw new Error("File not found");

    return {
      ...deletedFile.toObject(),
      id: deletedFile._id,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createFile,
  getFilesByParams,
  updateFile,
  deleteFileById,
};
