const item = require("./item.model");

const postAitem = async (req, res) => {
    try {
        const newitem = await item({...req.body});
        await newitem.save();
        res.status(200).send({message: "item posted successfully", item: newitem})
    } catch (error) {
        console.error("Error creating item", error);
        res.status(500).send({message: "Failed to create item"})
    }
}

// get all items

const getAllitems =  async (req, res) => {
    try {
        const items = await item.find();
        // const items = await item.find().sort({ createdAt: -1});
        res.status(200).send(items)
        
    } catch (error) {
        console.error("Error fetching items", error);
        res.status(500).send({message: "Failed to fetch items"})
    }
}

const getSingleitem = async (req, res) => {
    try {
        const {id} = req.params;
        const item =  await item.findById(id);
        if(!item){
            res.status(404).send({message: "item not Found!"})
        }
        res.status(200).send(item)
        
    } catch (error) {
        console.error("Error fetching item", error);
        res.status(500).send({message: "Failed to fetch item"})
    }

}

// update item data
const Updateitem = async (req, res) => {
    try {
        const {id} = req.params;
        const updateditem =  await item.findByIdAndUpdate(id, req.body, {new: true});
        if(!updateditem) {
            res.status(404).send({message: "item is not Found!"})
        }
        res.status(200).send({
            message: "item updated successfully",
            item: updateditem
        })
    } catch (error) {
        console.error("Error updating a item", error);
        res.status(500).send({message: "Failed to update a item"})
    }
}

const deleteAitem = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteditem =  await item.findByIdAndDelete(id);
        if(!deleteditem) {
            res.status(404).send({message: "item is not Found!"})
        }
        res.status(200).send({
            message: "item deleted successfully",
            item: deleteditem
        })
    } catch (error) {
        console.error("Error deleting a item", error);
        res.status(500).send({message: "Failed to delete a item"})
    }
};

module.exports = {
    postAitem,
    getAllitems,
    getSingleitem,
    Updateitem,
    deleteAitem
}