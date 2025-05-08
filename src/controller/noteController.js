const { get } = require("mongoose");
const noteModel = require("../models/notes");
const notes = require("../models/notes");


const createNote = async (req,res) => {
    
    const {title,description} = req.body;

    const newNote = new noteModel({
        title: title,
        description : description,
        userId : req.userId      //this id will come from middleware
    })

    try {

        await newNote.save();
        return res.status(201).json({
            message : "Note Created Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

const updateNote = async (req,res) => {

    const id = req.params.id;
    const {title, description} = req.body;

    const newUpdatedNote = {
        title : title,
        description : description,
        userId : req.userId
    }
    
    try {
       await noteModel.findByIdAndUpdate(id,newUpdatedNote,{new : true});
       return res.status(201).json({
        message : "Note Updated Successfully",
        note: newUpdatedNote
    })
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })  
    }
}

const deleteNote = async (req,res) => {
    const id = req.params.id;
    try {
        const note = await noteModel.findByIdAndDelete(id); 
        return res.status(202).json({
            message : "Note Deleted",
           
        })  
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })  
    }
}

const getNote = async (req,res) => {
    
    try {

        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json({
            message : "Fetched all the notes",
            notes : notes
        })
        
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
}


module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote
}