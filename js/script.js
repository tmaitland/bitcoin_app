const rows = document.querySelectorAll('.rows')
const shtml = document.querySelectorAll('.row2 .cols')
const btn = document.querySelector('.getNewPrices')
const newPrice = document.querySelector('.newPrice')

const spots = [0,2,3,4,5,6]

class Bitcoin{
    constructor(spots){
        this.spots = spots
        this.getPrices()
    }

    getPrices(){
        $.ajax({
            url: "https://bitpay.com/api/rates",
            dataType: "json",
            success: data =>{
                this.prices = data
                this.setPrices(this.spots)
            },
            error: error=>{
                console.log("There was an error")
            }
        })
    }
    setPrices(nums){
        // console.log(this.prices)
        // num.forEach((num, index) =>{
        // if(index===0) {return}
        // shtml[index + 1].textContent = this.prices[num].rate.toFixed(2)

           for(let i = 0; i<nums.length; i++){
                // let index = this.prices.length
                shtml[i+1].textContent = this.prices[nums[i]].rate.toFixed(2)
            }
            
    }
    refresh(){
            this.getPrices()    
       
    }
}

const bit = new Bitcoin(spots)

btn.addEventListener("click", e=>{
    bit.refresh()
})

newPrice.addEventListener("click", e=>{
    console.log("clicked")
    const code = window.prompt("What country are you looking for?")
    bit.prices.forEach((price, index) =>{
        if(price.code === code.toUpperCase()){
            bit.spots.push(index)
            rows[0].innerHTML += `<div class="cols"> BTC/${code.toUpperCase()}</div>`
            rows[1].innerHTML += `<div class="cols"> ${price.rate.toFixed(2)}</div>`
            console.log("We have a match!")
        }
    })
})



