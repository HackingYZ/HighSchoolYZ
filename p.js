const down=require("./j");

errk=[]
datak=[
    "G371323200802243138"
];


(async function(){
    for(var i=0;i<datak.length;i++){
        try{
            await down(datak[i].slice(1))
        }catch(err){
            errk.push(datak[i]);
            console.log([datak[i].slice(1),i,err])
        }
    }
    console.log(errk)
})();