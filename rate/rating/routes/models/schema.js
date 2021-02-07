const mongoose =require("mongoose");

const companyShcema = new  mongoose.Schema({
    companyname:{
        type:String
        
    }, Review:{
        type:
            String
        },
    Rating:{
        type: Number
    
}
});

const  Comapny = new mongoose.model("Comapny",companyShcema);

module.exports= Comapny;
