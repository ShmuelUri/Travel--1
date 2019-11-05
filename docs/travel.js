console.log("travel app started")

    console.log("dastrnation")
   let dastenations = [
        {id:1,dastenation:"Holand",price:22.5} ,
        {id:28,dastenation:"Israel",price:35} ,
        {id:31,dastenation:"Paris",price:440} ,
        {id:22,dastenation:"London",price:255} ,
        {id:14,dastenation:"Polin",price:340} ,
        {id:15,dastenation:"Warsha",price:555} 
        ];
        
    const  dastenationTamplate =`<tr> <td> {{id}}</td><td> {{dastenation}}  </td><td> {{price}} </td></tr> ` 
    let destBody = document.querySelector("#dest-body-table")
    dastenations.forEach(element => {
        destBody.innerHTML += rendering_engine(dastenationTamplate,element)
    });

    
      

    class Booking{
        constructor(code,name,person_id,destination,numberOfPass,total){
            this.code = code;
            this.name = name;
            this.person_id = person_id;
            this.destination = destination;
            this.numberOfPass = numberOfPass;
            this.total = total
        }
    }
const BookingTamplate = `<tr><td>{{code}}</td><td> {{name}}  </td><td> {{person_id}} </td></td> </td><td> {{destination}}  
                            </td><td> {{numberOfPass}} </td><td> {{total}}</td></tr>`
let bookings = []

function submit() {
    
    try {
    let code = bookings.length +1;
    let name = document.querySelector("#name").value;
    let id =  document.querySelector("#id").value;
    let travel_dest = dastenations.find(e => { return e.id == document.querySelector("#code").value});
    let destination = travel_dest.dastenation;
    let numberOfPass = document.querySelector("#numberofPass").value
    let total = numberOfPass * travel_dest.price

    let booking = new Booking(code,name,id,destination,numberOfPass,total)
    console.log(booking)
    bookings.push(booking)
    document.getElementById("register-body-table").innerHTML +=  rendering_engine(BookingTamplate,booking)
    } catch (error) {
        alert("invalid travel code")
    }  
    clear_()                         
}

function clear_() {
    let inputs = document.querySelectorAll("input")
    inputs.forEach(element => {
        element.value = ""
    });
    
}

function serch() {
    document.getElementById("serch_solation").innerHTML  = "";
    if (document.getElementById("serch").value.length == 0) {
        document.getElementById("total").innerHTML = ""
        return;
    }
    let total = 0;
    let inputStr = document.getElementById("serch").value
    let serchedBookings = bookings.filter(element => {return inputStr == element.name.slice(0,inputStr.length)})

    serchedBookings.forEach(element => {
        document.getElementById("serch_solation").innerHTML += rendering_engine(BookingTamplate,element)
        total += element.total
    });
    document.getElementById("total").innerHTML = total;
    
}
let select = document.getElementById("select");
dastenations.forEach(e =>{

    select.innerHTML += `<option>` + e.dastenation + ` </option> `
})
function show_the_items() {
    document.getElementById("selectd-body-table").innerHTML = ""
    console.log("show_the_item started")
    let select_item = select.options[select.selectedIndex].text;
    console.log(select_item)
     let select_booking = bookings.filter(e=> {
          return  select_item == e.destination
    })
    select_booking.forEach(e =>{
        document.getElementById("selectd-body-table").innerHTML += rendering_engine(BookingTamplate,e)
    })
}
function rendering_engine(tamplate,data) {
    let arrayTamplate = tamplate.split("{{");
    console.log(arrayTamplate)
    for (let index = 1; index < arrayTamplate.length; index++) {
            let temp = arrayTamplate[index];
            console.log(temp)
            let tempArr = temp.split("}}")
            console.log(tempArr)
            arrayTamplate[index] = data[tempArr[0]] + tempArr[1] 
            console.log(arrayTamplate)
            console.log(arrayTamplate.join(""))
    }return arrayTamplate.join("");
}

