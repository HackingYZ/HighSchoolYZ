const down=require("./j");
const wpass=require("./crypto")

errk=[]
datak=["371323200808193143sBdup$deaZ",
"37112220071230063XnTnVp$vqgE",
"371323200807232817bmssp$maRf",
"371323200711034648nFVsp$dJRS",
"371323200802158427evQBp$SVjX",
"371323200807048112SYxPp$rbeV",
"371323200807043434Utnsp$dKmT",
"371323200805111720wEzsp$yGkk",
"371323200801261465HWujp$CXQq",
"371323200806278127Sybsp$qzgn",
"220625200804082222zCusp$kPpq",
"371323200802195228jmEcp$VUta",
"371323200712180014XKdmp$kQJY",
"140430200801120043MJssp$yRSp",
"231085200801102933qYdsp$drRZ",
"371323200710234656vztkp$qxkf"
];


(async function(){
    for(var i=0;i<datak.length;i++){
        try{
            await down(datak[i].slice(0,18),wpass(datak[i].slice(18)))
        }catch(err){
            errk.push(datak[i].slice(0,18));
            console.log([datak[i].slice(0,18),i,err])
        }
    }
    console.log(JSON.stringify(errk))
})();