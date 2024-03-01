
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const mongoose= require('mongoose')
const { GridFSBucket, ObjectId } = require('mongoose').mongo;
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');
const uploadImage = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'fs' });
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    
    uploadStream.end(req.file.buffer); // Pass the file buffer to GridFS
    
    uploadStream
      .on('error', (error) => {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image');
      })
      .on('finish', () => {
        res.send('File uploaded to GridFS successfully');
      });
  });
};
const removeByName = async (req, res) => {
  if(!req.is_admin) return res.status(400).json({mesage:"non"})
  try {
    const filename = req.params.filename;

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'fs' });

    const file = await bucket.find({ filename }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const objectID = file[0]._id;
    await bucket.delete(new ObjectId(objectID));

    res.status(200).json({ message: `Deleted image with filename: ${filename}` });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
const getByName = async (req, res) => {
  try {
    const filename = req.params.filename; // Extract the filename from the request

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'fs' });

    // Find the file's metadata by filename
    const file = await bucket.find({ filename }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const objectID = file[0]._id;

    const downloadStream = bucket.openDownloadStream(new ObjectId(objectID));
    const chunks = [];

    downloadStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    downloadStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      res.writeHead(200, {
        'Content-Type': 'image/jpeg', // Adjust content type based on your file type
        'Content-Length': buffer.length,
      });
      res.end(buffer);
    });

    downloadStream.on('error', (error) => {
      console.error('Error getting image:', error);
      res.status(500).json({ error: 'Failed to get image' });
    });
  } catch (error) {
    console.error('Error getting image:', error);
    res.status(500).json({ error: 'Failed to get image' });
  }
};

const get = async (req, res) => {
  try {
    const objectID = req.params.objectID.toString();
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'fs' });

    const downloadStream = bucket.openDownloadStream(new ObjectId(objectID));
    const chunks = [];

    downloadStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    downloadStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      res.writeHead(200, {
        'Content-Type': 'image/jpeg', // Adjust content type based on your file type
        'Content-Length': buffer.length,
      });
      res.end(buffer);
    });

    downloadStream.on('error', (error) => {
      console.error('Error getting image:', error);
      res.status(500).json({ error: 'Failed to get image' });
    });
  } catch (error) {
    console.error('Error getting image:', error);
    res.status(500).json({ error: 'Failed to get image' });
  }
};

const remove = async (req, res) => {
  if(!req.is_admin) return res.status(400).json({mesage:"non"})
  try {
    // Extract the objectID from params and convert it to a string
    const objectID = req.params.objectID.toString();

    // Perform the deletion using the objectID
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'fs' });
    await bucket.delete(new ObjectId(objectID));
    
    // Respond with success message
    res.status(200).json({ message: `Deleted image with ObjectID: ${objectID}` });
  } catch (error) {
    // Handle errors
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
const getAll = async (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'fs' });

    const images = [];
    const filesCursor = bucket.find({});
    filesCursor.forEach(
      async (fileInfo) => {
        const downloadStream = bucket.openDownloadStream(fileInfo._id);
        const chunks = [];

        downloadStream.on('data', (chunk) => {
          chunks.push(chunk);
        });

        downloadStream.on('end', async () => {
          const buffer = Buffer.concat(chunks);
          images.push({
            _id: fileInfo._id,
            contentType: fileInfo.contentType,
            buffer: buffer.toString('base64'), // Convert buffer to base64
          });
        });

        downloadStream.on('error', (error) => {
          console.error('Error getting image:', error);
        });
      },
      () => {
        res.status(200).json({ images });
      }
    );
  } catch (error) {
    console.error('Error getting images:', error);
    res.status(500).json({ error: 'Failed to get images' });
  }
};

module.exports = { uploadImage, remove, get, getAll,getByName,removeByName };



