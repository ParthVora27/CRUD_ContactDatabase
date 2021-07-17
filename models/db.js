const mongoose = require ("mongoose");

mongoose.connect("mongodb://localhost:27017/ContactData" ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(() => {
    console.log(`connection successful`);
}).catch(() => {
    console.log(`no connection`);
});

//connect databse schema
require("./UserContact")