import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-money-change',
  templateUrl: './money-change.component.html',
  styleUrls: ['./money-change.component.css']
})



export class MoneyChangeComponent implements OnInit {
  
  paymentHandler:any = null;
  myBalance:any = null

  constructor(private Http:HttpClient) { }

  ngOnInit() {
   
    this.loadStripe();
  }
  loadStripe() {
      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
}

  
 money(e:any){
  var money={balance:e}
  console.log("ùùùùùùùùùùùùùùùùùùùùùùù",money)
  this.Http.post<any>('http://localhost:5000/money',money).subscribe((myBalance)=>{
    console.log(myBalance);})

 }



  pay(amount:any) {    
   var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });
  
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
  
}
  
  

}
