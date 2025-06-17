
const enquiryModel=require('../../models/enquir.model')
let enquiryInsert = (req, res) => {
  const { name, email, phone, message } = req.body;
  const enquiry = new enquiryModel({ name, email, phone, message });

  enquiry.save()
    .then(() => {
      res.send({ status: 1, msg: "Data saved" });
    })
    .catch((err) => {
      console.error("Insert error:", err);
      res.status(500).send({
        status: 0,
        msg: "Insert failed",
        error: err.message
      });
    });
};


let enquiryList=async (req, res) => {
    try {
      const Elist = await enquiryModel.find();
      res.send({
        status: 1,
        msg: "Data fetched",
        data: Elist
      });
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      res.status(500).send({
        status: 0,
        msg: "Unable to fetch data"
      });
    }
}
let enquiryDelete=async(req,res)=>{
    let enquiryId=req.params.id
  
   try{
      let edelete=await enquiryModel.deleteOne({_id:enquiryId})
    res.send({
      status: 1,
          msg: "Data deleted",
          data: edelete
    })
  }catch(err){
      console.error("Error fetching enquiries:", err);
        res.status(500).send({
          status: 0,
          msg: "Unable to fetch data"
        });
  }
}  
let enquiryUpdate = async (req, res) => {
  const enquiryId = req.params.id;
  const { name, email, phone, message } = req.body;

  const updateObj = { name, email, phone, message };

  try {
    const updateRes = await enquiryModel.updateOne({ _id: enquiryId }, updateObj);
    res.send({
      status: 1,
      msg: "Data updated",
      data: updateRes
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send({
      status: 0,
      msg: "Unable to update data",
      error: err.message
    });
  }
};


module.exports = {
    enquiryInsert,
    enquiryList,
    enquiryDelete,
    enquiryUpdate
  };