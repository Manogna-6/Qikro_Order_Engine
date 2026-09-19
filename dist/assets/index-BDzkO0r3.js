var N=Object.defineProperty;var L=(s,e,t)=>e in s?N(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var c=(s,e,t)=>L(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();class E{constructor(){c(this,"routes",[]);c(this,"currentPath","");window.addEventListener("hashchange",()=>this.handleHashChange())}register(e,t,i){const a=[],r=e.replace(/:([a-zA-Z0-9_]+)/g,(n,o)=>(a.push(o),"([^/]+)")),l=new RegExp(`^#?/${r}$|^#?${r}$`);this.routes.push({path:e,regex:l,paramNames:a,handler:i,requiresAuth:t})}navigate(e){const t=e.startsWith("#")?e:`#${e}`;window.location.hash!==t?window.location.hash=t:this.handleHashChange()}handleHashChange(){let e=window.location.hash.slice(1);(!e||e==="/"||e==="")&&(e="orders"),this.currentPath=e;for(const t of this.routes){const i=e.match(t.regex);if(i){const a={};t.paramNames.forEach((r,l)=>{a[r]=i[l+1]}),t.handler(a);return}}this.navigate("orders")}getCurrentPath(){return this.currentPath}}const x=new E;class U{constructor(){c(this,"state",{isAuthenticated:!1,currentUser:null,token:null,expiresAt:null});c(this,"listeners",new Set)}getSession(){return{...this.state}}getCurrentUser(){return this.state.currentUser}getToken(){return this.state.token}isAuthenticated(){if(!this.state.isAuthenticated||!this.state.token||!this.state.expiresAt)return!1;const e=new Date().getTime(),t=new Date(this.state.expiresAt).getTime();return e>=t?(this.clearSession(),!1):!0}setSession(e,t,i){this.state={isAuthenticated:!0,currentUser:e,token:t,expiresAt:i},this.notifyListeners()}clearSession(){this.state={isAuthenticated:!1,currentUser:null,token:null,expiresAt:null},this.notifyListeners()}subscribe(e){return this.listeners.add(e),e(this.getSession()),()=>{this.listeners.delete(e)}}notifyListeners(){const e=this.getSession();this.listeners.forEach(t=>{try{t(e)}catch(i){console.error("Error in session store listener:",i)}})}}const b=new U;function k(s){const e=b.isAuthenticated(),t=s==="login"||s==="#login";return!e&&!t?{allowed:!1,redirect:"login"}:e&&t?{allowed:!1,redirect:"orders"}:{allowed:!0}}const Z=[{id:"USR-001",phone:"+919999999999",name:"Aarav Sharma (Admin)",email:"admin@platform.com",role:"admin",avatarUrl:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",createdAt:"2025-01-01T00:00:00.000Z",updatedAt:"2025-01-01T00:00:00.000Z"},{id:"USR-002",phone:"+919876543210",name:"Rajesh Kumar (Merchant - Gourmet Bistro)",email:"rajesh@gourmetbistro.com",role:"business_owner",businessId:"BUS-101",avatarUrl:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",createdAt:"2025-01-10T08:30:00.000Z",updatedAt:"2025-01-10T08:30:00.000Z"},{id:"USR-003",phone:"+919812345678",name:"Anita Verma (Merchant - Fresh Organics)",email:"anita@freshorganics.com",role:"business_owner",businessId:"BUS-102",avatarUrl:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",createdAt:"2025-01-15T10:15:00.000Z",updatedAt:"2025-01-15T10:15:00.000Z"},{id:"USR-004",phone:"+919123456789",name:"Priya Mehta (Customer)",email:"priya.mehta@gmail.com",role:"customer",avatarUrl:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",createdAt:"2025-02-01T14:20:00.000Z",updatedAt:"2025-02-01T14:20:00.000Z"},{id:"USR-005",phone:"+919555443322",name:"Vikram Patel (Customer)",email:"vikram.patel@yahoo.com",role:"customer",avatarUrl:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",createdAt:"2025-02-05T11:45:00.000Z",updatedAt:"2025-02-05T11:45:00.000Z"}],F=[{id:"BUS-101",name:"Gourmet Kitchen & Bistro",ownerId:"USR-002",commissionRate:.15,address:{street:"45 Park Avenue, Block C",city:"Mumbai",state:"Maharashtra",postalCode:"400051",country:"India"},phone:"+919876543210",status:"active",settledBalance:14500,pendingBalance:3250,createdAt:"2025-01-10T08:30:00.000Z",updatedAt:"2025-02-28T12:00:00.000Z"},{id:"BUS-102",name:"Fresh Harvest Organics",ownerId:"USR-003",commissionRate:.1,address:{street:"12 Farmhouse Lane, Indiranagar",city:"Bengaluru",state:"Karnataka",postalCode:"560038",country:"India"},phone:"+919812345678",status:"active",settledBalance:8900,pendingBalance:1850,createdAt:"2025-01-15T10:15:00.000Z",updatedAt:"2025-02-28T14:30:00.000Z"}],j=[{id:"ORD-1001",customerId:"USR-004",customerName:"Priya Mehta",customerPhone:"+919123456789",businessId:"BUS-101",businessName:"Gourmet Kitchen & Bistro",items:[{productId:"PRD-101",productName:"Artisan Woodfired Truffle Pizza",unitPrice:650,quantity:2,totalPrice:1300},{productId:"PRD-103",productName:"Sparkling Hibiscus Kombucha (500ml)",unitPrice:180,quantity:1,totalPrice:180}],subtotal:1480,deliveryFee:60,totalAmount:1540,commissionRate:.15,commissionAmount:222,netPayoutAmount:1258,status:"placed",isSettled:!1,createdAt:"2025-02-28T09:15:00.000Z",updatedAt:"2025-02-28T09:15:00.000Z",paymentId:"PAY-9001",deliveryId:"DEL-7001",statusHistory:[{status:"placed",timestamp:"2025-02-28T09:15:00.000Z",updatedBy:"USR-004",note:"Order submitted by customer via mobile app."}]},{id:"ORD-1002",customerId:"USR-005",customerName:"Vikram Patel",customerPhone:"+919555443322",businessId:"BUS-101",businessName:"Gourmet Kitchen & Bistro",items:[{productId:"PRD-102",productName:"Smoked Salmon Risotto",unitPrice:820,quantity:1,totalPrice:820}],subtotal:820,deliveryFee:50,totalAmount:870,commissionRate:.15,commissionAmount:123,netPayoutAmount:697,status:"accepted",isSettled:!1,createdAt:"2025-02-28T08:45:00.000Z",updatedAt:"2025-02-28T08:50:00.000Z",paymentId:"PAY-9002",deliveryId:"DEL-7002",statusHistory:[{status:"placed",timestamp:"2025-02-28T08:45:00.000Z",updatedBy:"USR-005",note:"Order created."},{status:"accepted",timestamp:"2025-02-28T08:50:00.000Z",updatedBy:"USR-002",note:"Kitchen confirmed preparation availability."}]},{id:"ORD-1003",customerId:"USR-004",customerName:"Priya Mehta",customerPhone:"+919123456789",businessId:"BUS-102",businessName:"Fresh Harvest Organics",items:[{productId:"PRD-201",productName:"Hass Avocados Organic Pack (1kg)",unitPrice:490,quantity:2,totalPrice:980},{productId:"PRD-202",productName:"Raw Cold-Pressed Almond Milk (1L)",unitPrice:320,quantity:1,totalPrice:320}],subtotal:1300,deliveryFee:40,totalAmount:1340,commissionRate:.1,commissionAmount:130,netPayoutAmount:1170,status:"packing",isSettled:!1,createdAt:"2025-02-28T07:30:00.000Z",updatedAt:"2025-02-28T08:15:00.000Z",paymentId:"PAY-9003",deliveryId:"DEL-7003",statusHistory:[{status:"placed",timestamp:"2025-02-28T07:30:00.000Z",updatedBy:"USR-004"},{status:"accepted",timestamp:"2025-02-28T07:40:00.000Z",updatedBy:"USR-003"},{status:"packing",timestamp:"2025-02-28T08:15:00.000Z",updatedBy:"USR-003",note:"Packing cold-storage items into insulated crate."}]},{id:"ORD-1004",customerId:"USR-005",customerName:"Vikram Patel",customerPhone:"+919555443322",businessId:"BUS-102",businessName:"Fresh Harvest Organics",items:[{productId:"PRD-203",productName:"Organic Hydroponic Strawberries (250g)",unitPrice:250,quantity:3,totalPrice:750}],subtotal:750,deliveryFee:50,totalAmount:800,commissionRate:.1,commissionAmount:75,netPayoutAmount:675,status:"dispatched",isSettled:!1,createdAt:"2025-02-28T06:10:00.000Z",updatedAt:"2025-02-28T07:20:00.000Z",paymentId:"PAY-9004",deliveryId:"DEL-7004",statusHistory:[{status:"placed",timestamp:"2025-02-28T06:10:00.000Z",updatedBy:"USR-005"},{status:"accepted",timestamp:"2025-02-28T06:20:00.000Z",updatedBy:"USR-003"},{status:"packing",timestamp:"2025-02-28T06:50:00.000Z",updatedBy:"USR-003"},{status:"dispatched",timestamp:"2025-02-28T07:20:00.000Z",updatedBy:"system",note:"Handed over to SwiftExpress driver Sunil."}]},{id:"ORD-1005",customerId:"USR-004",customerName:"Priya Mehta",customerPhone:"+919123456789",businessId:"BUS-101",businessName:"Gourmet Kitchen & Bistro",items:[{productId:"PRD-101",productName:"Artisan Woodfired Truffle Pizza",unitPrice:650,quantity:1,totalPrice:650},{productId:"PRD-102",productName:"Smoked Salmon Risotto",unitPrice:820,quantity:1,totalPrice:820}],subtotal:1470,deliveryFee:60,totalAmount:1530,commissionRate:.15,commissionAmount:220.5,netPayoutAmount:1249.5,status:"delivered",isSettled:!0,settledAt:"2025-02-27T18:00:00.000Z",createdAt:"2025-02-27T11:00:00.000Z",updatedAt:"2025-02-27T12:30:00.000Z",paymentId:"PAY-9005",deliveryId:"DEL-7005",statusHistory:[{status:"placed",timestamp:"2025-02-27T11:00:00.000Z",updatedBy:"USR-004"},{status:"accepted",timestamp:"2025-02-27T11:10:00.000Z",updatedBy:"USR-002"},{status:"packing",timestamp:"2025-02-27T11:30:00.000Z",updatedBy:"USR-002"},{status:"dispatched",timestamp:"2025-02-27T11:50:00.000Z",updatedBy:"system"},{status:"delivered",timestamp:"2025-02-27T12:30:00.000Z",updatedBy:"system",note:"Customer signed delivery OTP verification."}]},{id:"ORD-1006",customerId:"USR-005",customerName:"Vikram Patel",customerPhone:"+919555443322",businessId:"BUS-101",businessName:"Gourmet Kitchen & Bistro",items:[{productId:"PRD-101",productName:"Artisan Woodfired Truffle Pizza",unitPrice:650,quantity:3,totalPrice:1950}],subtotal:1950,deliveryFee:70,totalAmount:2020,commissionRate:.15,commissionAmount:292.5,netPayoutAmount:1657.5,status:"delivered",isSettled:!1,createdAt:"2025-02-27T14:00:00.000Z",updatedAt:"2025-02-27T15:20:00.000Z",paymentId:"PAY-9006",deliveryId:"DEL-7006",statusHistory:[{status:"placed",timestamp:"2025-02-27T14:00:00.000Z",updatedBy:"USR-005"},{status:"accepted",timestamp:"2025-02-27T14:10:00.000Z",updatedBy:"USR-002"},{status:"packing",timestamp:"2025-02-27T14:30:00.000Z",updatedBy:"USR-002"},{status:"dispatched",timestamp:"2025-02-27T14:45:00.000Z",updatedBy:"system"},{status:"delivered",timestamp:"2025-02-27T15:20:00.000Z",updatedBy:"system"}]},{id:"ORD-1007",customerId:"USR-004",customerName:"Priya Mehta",customerPhone:"+919123456789",businessId:"BUS-102",businessName:"Fresh Harvest Organics",items:[{productId:"PRD-201",productName:"Hass Avocados Organic Pack (1kg)",unitPrice:490,quantity:1,totalPrice:490}],subtotal:490,deliveryFee:40,totalAmount:530,commissionRate:.1,commissionAmount:0,netPayoutAmount:0,status:"cancelled",isSettled:!1,createdAt:"2025-02-26T10:00:00.000Z",updatedAt:"2025-02-26T10:15:00.000Z",paymentId:"PAY-9007",deliveryId:"DEL-7007",statusHistory:[{status:"placed",timestamp:"2025-02-26T10:00:00.000Z",updatedBy:"USR-004"},{status:"cancelled",timestamp:"2025-02-26T10:15:00.000Z",updatedBy:"USR-004",note:"Customer requested cancellation prior to packing."}]},{id:"ORD-1008",customerId:"USR-005",customerName:"Vikram Patel",customerPhone:"+919555443322",businessId:"BUS-101",businessName:"Gourmet Kitchen & Bistro",items:[{productId:"PRD-102",productName:"Smoked Salmon Risotto",unitPrice:820,quantity:2,totalPrice:1640}],subtotal:1640,deliveryFee:60,totalAmount:1700,commissionRate:.15,commissionAmount:0,netPayoutAmount:0,status:"failed",isSettled:!1,createdAt:"2025-02-25T16:00:00.000Z",updatedAt:"2025-02-25T18:00:00.000Z",paymentId:"PAY-9008",deliveryId:"DEL-7008",statusHistory:[{status:"placed",timestamp:"2025-02-25T16:00:00.000Z",updatedBy:"USR-005"},{status:"accepted",timestamp:"2025-02-25T16:10:00.000Z",updatedBy:"USR-002"},{status:"packing",timestamp:"2025-02-25T16:30:00.000Z",updatedBy:"USR-002"},{status:"dispatched",timestamp:"2025-02-25T17:00:00.000Z",updatedBy:"system"},{status:"failed",timestamp:"2025-02-25T18:00:00.000Z",updatedBy:"system",note:"Customer unreachable after 3 delivery attempts."}]},{id:"ORD-1009",customerId:"USR-004",customerName:"Priya Mehta",customerPhone:"+919123456789",businessId:"BUS-101",businessName:"Gourmet Kitchen & Bistro",items:[{productId:"PRD-103",productName:"Sparkling Hibiscus Kombucha (500ml)",unitPrice:180,quantity:4,totalPrice:720}],subtotal:720,deliveryFee:50,totalAmount:770,commissionRate:.15,commissionAmount:0,netPayoutAmount:0,status:"returned",isSettled:!1,createdAt:"2025-02-24T12:00:00.000Z",updatedAt:"2025-02-24T15:30:00.000Z",paymentId:"PAY-9009",deliveryId:"DEL-7009",statusHistory:[{status:"placed",timestamp:"2025-02-24T12:00:00.000Z",updatedBy:"USR-004"},{status:"accepted",timestamp:"2025-02-24T12:15:00.000Z",updatedBy:"USR-002"},{status:"packing",timestamp:"2025-02-24T12:45:00.000Z",updatedBy:"USR-002"},{status:"dispatched",timestamp:"2025-02-24T13:15:00.000Z",updatedBy:"system"},{status:"delivered",timestamp:"2025-02-24T14:00:00.000Z",updatedBy:"system"},{status:"returned",timestamp:"2025-02-24T15:30:00.000Z",updatedBy:"USR-004",note:"Item seal broken on delivery. Package returned."}]}],I=[{id:"PAY-9001",orderId:"ORD-1001",amount:1540,status:"captured",provider:"upi",transactionRef:"UPI-REF-8899101",createdAt:"2025-02-28T09:15:00.000Z",completedAt:"2025-02-28T09:15:30.000Z"},{id:"PAY-9002",orderId:"ORD-1002",amount:870,status:"captured",provider:"card",transactionRef:"CARD-TXN-7733441",createdAt:"2025-02-28T08:45:00.000Z",completedAt:"2025-02-28T08:45:20.000Z"},{id:"PAY-9003",orderId:"ORD-1003",amount:1340,status:"captured",provider:"upi",transactionRef:"UPI-REF-6622119",createdAt:"2025-02-28T07:30:00.000Z",completedAt:"2025-02-28T07:30:15.000Z"},{id:"PAY-9004",orderId:"ORD-1004",amount:800,status:"captured",provider:"netbanking",transactionRef:"NB-TXN-5544332",createdAt:"2025-02-28T06:10:00.000Z",completedAt:"2025-02-28T06:10:45.000Z"},{id:"PAY-9005",orderId:"ORD-1005",amount:1530,status:"captured",provider:"card",transactionRef:"CARD-TXN-9988776",createdAt:"2025-02-27T11:00:00.000Z",completedAt:"2025-02-27T11:00:10.000Z"},{id:"PAY-9006",orderId:"ORD-1006",amount:2020,status:"captured",provider:"upi",transactionRef:"UPI-REF-3344556",createdAt:"2025-02-27T14:00:00.000Z",completedAt:"2025-02-27T14:00:25.000Z"},{id:"PAY-9007",orderId:"ORD-1007",amount:530,status:"refunded",provider:"upi",transactionRef:"UPI-REF-1122334",failureReason:"Order cancelled by customer before dispatch",createdAt:"2025-02-26T10:00:00.000Z",completedAt:"2025-02-26T10:20:00.000Z"},{id:"PAY-9008",orderId:"ORD-1008",amount:1700,status:"refunded",provider:"card",transactionRef:"CARD-TXN-4455667",failureReason:"Delivery failed - customer unreachable",createdAt:"2025-02-25T16:00:00.000Z",completedAt:"2025-02-25T18:30:00.000Z"},{id:"PAY-9009",orderId:"ORD-1009",amount:770,status:"refunded",provider:"upi",transactionRef:"UPI-REF-7788990",failureReason:"Customer return accepted",createdAt:"2025-02-24T12:00:00.000Z",completedAt:"2025-02-24T16:00:00.000Z"}],H=[{id:"DEL-7001",orderId:"ORD-1001",partnerName:"SwiftExpress Logistics",trackingNumber:"SE-990011-IN",status:"unassigned",estimatedDeliveryTime:"2025-02-28T11:00:00.000Z",deliveryAddress:{street:"Flat 402, Sunshine Apartments, Worli",city:"Mumbai",state:"Maharashtra",postalCode:"400018",landmark:"Near Worli Sea Link Toll"}},{id:"DEL-7002",orderId:"ORD-1002",partnerName:"SwiftExpress Logistics",trackingNumber:"SE-990012-IN",status:"assigned",estimatedDeliveryTime:"2025-02-28T10:30:00.000Z",agentName:"Ramesh Singh",agentPhone:"+919811223344",assignedAt:"2025-02-28T08:52:00.000Z",deliveryAddress:{street:"House #14, Green Valley Estate, Bandra West",city:"Mumbai",state:"Maharashtra",postalCode:"400050"}},{id:"DEL-7003",orderId:"ORD-1003",partnerName:"HyperLocal Courier",trackingNumber:"HL-881122-IN",status:"assigned",estimatedDeliveryTime:"2025-02-28T10:00:00.000Z",agentName:"Karan Nair",agentPhone:"+919744556677",assignedAt:"2025-02-28T08:20:00.000Z",deliveryAddress:{street:"Flat 402, Sunshine Apartments, Worli",city:"Mumbai",state:"Maharashtra",postalCode:"400018"}},{id:"DEL-7004",orderId:"ORD-1004",partnerName:"HyperLocal Courier",trackingNumber:"HL-881123-IN",status:"in_transit",estimatedDeliveryTime:"2025-02-28T08:30:00.000Z",agentName:"Sunil Rao",agentPhone:"+919633221100",assignedAt:"2025-02-28T06:55:00.000Z",dispatchedAt:"2025-02-28T07:20:00.000Z",deliveryAddress:{street:"House #14, Green Valley Estate, Bandra West",city:"Mumbai",state:"Maharashtra",postalCode:"400050"}},{id:"DEL-7005",orderId:"ORD-1005",partnerName:"SwiftExpress Logistics",trackingNumber:"SE-990005-IN",status:"delivered",estimatedDeliveryTime:"2025-02-27T12:30:00.000Z",agentName:"Ramesh Singh",agentPhone:"+919811223344",assignedAt:"2025-02-27T11:15:00.000Z",dispatchedAt:"2025-02-27T11:50:00.000Z",deliveredAt:"2025-02-27T12:30:00.000Z",deliveryAddress:{street:"Flat 402, Sunshine Apartments, Worli",city:"Mumbai",state:"Maharashtra",postalCode:"400018"}},{id:"DEL-7006",orderId:"ORD-1006",partnerName:"SwiftExpress Logistics",trackingNumber:"SE-990006-IN",status:"delivered",estimatedDeliveryTime:"2025-02-27T15:30:00.000Z",agentName:"Sunil Rao",agentPhone:"+919633221100",assignedAt:"2025-02-27T14:15:00.000Z",dispatchedAt:"2025-02-27T14:45:00.000Z",deliveredAt:"2025-02-27T15:20:00.000Z",deliveryAddress:{street:"House #14, Green Valley Estate, Bandra West",city:"Mumbai",state:"Maharashtra",postalCode:"400050"}},{id:"DEL-7007",orderId:"ORD-1007",partnerName:"HyperLocal Courier",trackingNumber:"HL-881107-IN",status:"unassigned",estimatedDeliveryTime:"2025-02-26T12:00:00.000Z",deliveryAddress:{street:"Flat 402, Sunshine Apartments, Worli",city:"Mumbai",state:"Maharashtra",postalCode:"400018"}},{id:"DEL-7008",orderId:"ORD-1008",partnerName:"SwiftExpress Logistics",trackingNumber:"SE-990008-IN",status:"returned_to_hub",estimatedDeliveryTime:"2025-02-25T17:30:00.000Z",agentName:"Ramesh Singh",agentPhone:"+919811223344",assignedAt:"2025-02-25T16:15:00.000Z",dispatchedAt:"2025-02-25T17:00:00.000Z",deliveryAddress:{street:"House #14, Green Valley Estate, Bandra West",city:"Mumbai",state:"Maharashtra",postalCode:"400050"}},{id:"DEL-7009",orderId:"ORD-1009",partnerName:"SwiftExpress Logistics",trackingNumber:"SE-990009-IN",status:"returned_to_hub",estimatedDeliveryTime:"2025-02-24T14:00:00.000Z",agentName:"Sunil Rao",agentPhone:"+919633221100",assignedAt:"2025-02-24T12:30:00.000Z",dispatchedAt:"2025-02-24T13:15:00.000Z",deliveredAt:"2025-02-24T14:00:00.000Z",deliveryAddress:{street:"Flat 402, Sunshine Apartments, Worli",city:"Mumbai",state:"Maharashtra",postalCode:"400018"}}],q=[{id:"INV-3001",productId:"PRD-101",productName:"Artisan Woodfired Truffle Pizza",businessId:"BUS-101",changeType:"order_placed",quantityDelta:-2,remainingStock:45,reason:"Stock deducted for order placement #ORD-1001",timestamp:"2025-02-28T09:15:00.000Z"},{id:"INV-3002",productId:"PRD-102",productName:"Smoked Salmon Risotto",businessId:"BUS-101",changeType:"order_placed",quantityDelta:-1,remainingStock:20,reason:"Stock deducted for order placement #ORD-1002",timestamp:"2025-02-28T08:45:00.000Z"},{id:"INV-3003",productId:"PRD-201",productName:"Hass Avocados Organic Pack (1kg)",businessId:"BUS-102",changeType:"restock",quantityDelta:50,remainingStock:60,reason:"Batch shipment restock from supplier #SHIP-881",timestamp:"2025-02-27T08:00:00.000Z"},{id:"INV-3004",productId:"PRD-201",productName:"Hass Avocados Organic Pack (1kg)",businessId:"BUS-102",changeType:"order_cancelled",quantityDelta:1,remainingStock:61,reason:"Stock returned due to order cancellation #ORD-1007",timestamp:"2025-02-26T10:15:00.000Z"}];class P extends Error{constructor(t,i="INTERNAL_ERROR",a=500){super(t);c(this,"code");c(this,"statusCode");this.name=this.constructor.name,this.code=i,this.statusCode=a,Object.setPrototypeOf(this,new.target.prototype)}}class T extends P{constructor(e,t){super(`${e} with ID '${t}' was not found.`,"NOT_FOUND",404)}}class _ extends P{constructor(e,t){super(`Invalid order state transition: Cannot transition from '${e}' to '${t}'.`,"INVALID_TRANSITION",400)}}class M extends P{constructor(e="Invalid 6-digit OTP code entered. Please try again."){super(e,"INVALID_OTP",400)}}class V extends P{constructor(e="OTP code has expired. Please request a new code."){super(e,"OTP_EXPIRED",400)}}class z extends P{constructor(e){super(e,"VALIDATION_ERROR",422)}}class G{constructor(){c(this,"activeOtpStore",new Map);c(this,"OTP_TTL_MS",120*1e3)}async simulateDelay(e=350){return new Promise(t=>setTimeout(t,e))}async requestOtp(e){await this.simulateDelay(400);const t=e.replace(/[^0-9+]/g,"");if(!t||t.length<10)throw new M("Please enter a valid phone number (at least 10 digits).");const i="123456";return this.activeOtpStore.set(t,{phone:t,otp:i,createdAt:Date.now()}),{success:!0,message:`OTP sent successfully to ${e}.`,mockOtp:i}}async verifyOtp(e,t){await this.simulateDelay(500);const i=e.replace(/[^0-9+]/g,""),a=this.activeOtpStore.get(i);if(a&&Date.now()-a.createdAt>this.OTP_TTL_MS)throw this.activeOtpStore.delete(i),new V("OTP code has expired after 2 minutes. Please request a new code.");if(t!=="123456"&&(!a||a.otp!==t))throw new M("Invalid 6-digit OTP code entered. Hint: Use demo OTP 123456.");let r=Z.find(h=>h.phone===i||h.phone.includes(i.slice(-10)));r||(r={id:`USR-${Math.floor(1e3+Math.random()*9e3)}`,phone:i,name:"Demo Merchant User",email:"demo.merchant@platform.com",role:"business_owner",businessId:"BUS-101",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});const l=btoa(JSON.stringify({alg:"HS256",typ:"JWT"})),n=btoa(JSON.stringify({sub:r.id,role:r.role,name:r.name,iat:Math.floor(Date.now()/1e3),exp:Math.floor((Date.now()+480*60*1e3)/1e3)})),d=`${l}.${n}.MockSignature_X99A_b722c1`,u=new Date(Date.now()+480*60*1e3).toISOString();return b.setSession(r,d,u),{user:r,token:d,expiresAt:u}}async logout(){await this.simulateDelay(200),b.clearSession()}async getCurrentUser(){return b.getCurrentUser()}}const K=new G,C={placed:["accepted","cancelled"],accepted:["packing","cancelled"],packing:["dispatched","cancelled"],dispatched:["delivered","failed"],delivered:["returned"],cancelled:[],failed:[],returned:[]};function W(){return["placed","accepted","packing","dispatched","delivered"]}function Y(s,e){return(C[s]||[]).includes(e)}function Q(s){return C[s]||[]}function X(s){return(C[s]||[]).length===0}function S(s){switch(s){case"placed":return{label:"Order Placed",bgClass:"bg-blue-50",textClass:"text-blue-700",borderClass:"border-blue-200",badgeStyle:"bg-blue-50 text-blue-700 border border-blue-200",description:"Customer has placed the order. Awaiting merchant confirmation."};case"accepted":return{label:"Accepted",bgClass:"bg-indigo-50",textClass:"text-indigo-700",borderClass:"border-indigo-200",badgeStyle:"bg-indigo-50 text-indigo-700 border border-indigo-200",description:"Merchant accepted the order and sent to kitchen/warehouse."};case"packing":return{label:"Packing",bgClass:"bg-amber-50",textClass:"text-amber-700",borderClass:"border-amber-200",badgeStyle:"bg-amber-50 text-amber-700 border border-amber-200",description:"Items are being packed and verified for dispatch."};case"dispatched":return{label:"Dispatched",bgClass:"bg-sky-50",textClass:"text-sky-700",borderClass:"border-sky-200",badgeStyle:"bg-sky-50 text-sky-700 border border-sky-200",description:"Order handed over to delivery partner and in transit."};case"delivered":return{label:"Delivered",bgClass:"bg-emerald-50",textClass:"text-emerald-700",borderClass:"border-emerald-200",badgeStyle:"bg-emerald-50 text-emerald-700 border border-emerald-200",description:"Order successfully delivered to customer address."};case"cancelled":return{label:"Cancelled",bgClass:"bg-red-50",textClass:"text-red-700",borderClass:"border-red-200",badgeStyle:"bg-red-50 text-red-700 border border-red-200",description:"Order was cancelled prior to dispatch. Refund initiated if applicable."};case"failed":return{label:"Delivery Failed",bgClass:"bg-rose-50",textClass:"text-rose-700",borderClass:"border-rose-200",badgeStyle:"bg-rose-50 text-rose-700 border border-rose-200",description:"Delivery attempt failed due to customer absence or address issue."};case"returned":return{label:"Returned",bgClass:"bg-purple-50",textClass:"text-purple-700",borderClass:"border-purple-200",badgeStyle:"bg-purple-50 text-purple-700 border border-purple-200",description:"Customer requested return post-delivery. Package returned to warehouse."}}}function J(s,e,t,i){if(!Y(s.status,e))throw new _(s.status,e);const a=new Date().toISOString(),r={status:e,timestamp:a,updatedBy:t,note:i||`Order status updated from '${s.status}' to '${e}'`};return{...s,status:e,updatedAt:a,statusHistory:[...s.statusHistory,r]}}function g(s){return Math.round((s+Number.EPSILON)*100)/100}function m(s){const e=g(s);return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}function ee(s,e){const t=e?e.status==="captured":!0,i=s.status!=="cancelled"&&s.status!=="failed",a=t&&i;let r;t?i||(r=`Order is in terminal exception state '${s.status}'`):r="Payment not captured or pending";const l=g(s.subtotal),n=s.commissionRate,o=a?g(l*n):0,d=a?g(l-o):0;return{orderId:s.id,businessId:s.businessId,customerName:s.customerName,orderStatus:s.status,paymentStatus:(e==null?void 0:e.status)||"captured",subtotal:l,deliveryFee:g(s.deliveryFee),totalOrderAmount:g(s.totalAmount),commissionRate:n,commissionAmount:o,netPayoutAmount:d,isEligibleForSettlement:a,isSettled:s.isSettled,settledAt:s.settledAt,ineligibilityReason:r}}function te(s,e,t){const i=new Map(t.map(p=>[p.orderId,p])),a=e.filter(p=>p.businessId===s.id),r=[];let l=0,n=0,o=0,d=0,u=0,h=0;for(const p of a){const w=i.get(p.id),f=ee(p,w);r.push(f),f.isEligibleForSettlement&&(l+=1,n+=f.subtotal,o+=f.commissionAmount,d+=f.netPayoutAmount,f.isSettled?u+=f.netPayoutAmount:h+=f.netPayoutAmount)}return{businessId:s.id,businessName:s.name,commissionRate:s.commissionRate,totalOrdersCount:a.length,eligibleOrdersCount:l,grossRevenue:g(n),totalCommissionCut:g(o),totalNetPayout:g(d),settledPayout:g(u),pendingPayout:g(h),orderBreakdown:r}}class se{constructor(){c(this,"orders",[...j]);c(this,"businesses",[...F])}async simulateDelay(e=300){return new Promise(t=>setTimeout(t,e))}async getOrders(e={page:1,limit:10}){await this.simulateDelay(300);let t=[...this.orders];if(e.statusFilter&&e.statusFilter!=="all"&&(t=t.filter(d=>d.status===e.statusFilter)),e.businessFilter&&(t=t.filter(d=>d.businessId===e.businessFilter)),e.search&&e.search.trim()!==""){const d=e.search.toLowerCase().trim();t=t.filter(u=>u.id.toLowerCase().includes(d)||u.customerName.toLowerCase().includes(d)||u.customerPhone.includes(d)||u.businessName.toLowerCase().includes(d))}t.sort((d,u)=>new Date(u.createdAt).getTime()-new Date(d.createdAt).getTime());const i=e.page||1,a=e.limit||10,r=t.length,l=Math.ceil(r/a)||1,n=(i-1)*a;return{items:t.slice(n,n+a),total:r,page:i,totalPages:l}}async getOrderById(e){await this.simulateDelay(250);const t=this.orders.find(i=>i.id.toUpperCase()===e.toUpperCase());if(!t)throw new T("Order",e);return{...t}}async transitionOrderState(e,t,i,a){await this.simulateDelay(400);const r=this.orders.findIndex(o=>o.id.toUpperCase()===e.toUpperCase());if(r===-1)throw new T("Order",e);const l=this.orders[r],n=J(l,t,i,a);return this.orders[r]=n,{...n}}async cancelOrder(e,t){if(!t||t.trim().length===0)throw new z("A cancellation reason must be provided.");return this.transitionOrderState(e,"cancelled","system",`Cancellation reason: ${t}`)}async getSettlementSummary(e){return await this.simulateDelay(350),(e?this.businesses.filter(i=>i.id===e):this.businesses).map(i=>te(i,this.orders,I))}async markSettled(e,t){await this.simulateDelay(500);const i=new Date().toISOString();let a=0,r=0;this.orders=this.orders.map(n=>{const o=n.businessId===e,d=!t||t.includes(n.id),u=n.status==="delivered";return o&&d&&u&&!n.isSettled?(a+=1,r+=n.netPayoutAmount,{...n,isSettled:!0,settledAt:i,updatedAt:i}):n});const l=this.businesses.findIndex(n=>n.id===e);if(l!==-1){const n=this.businesses[l];this.businesses[l]={...n,settledBalance:g(n.settledBalance+r),pendingBalance:g(Math.max(0,n.pendingBalance-r)),updatedAt:i}}return{settledCount:a,totalAmountSettled:g(r)}}async getAllBusinesses(){return await this.simulateDelay(200),[...this.businesses]}}const ae=new se;class ie{async simulateDelay(e=200){return new Promise(t=>setTimeout(t,e))}async getPaymentByOrderId(e){await this.simulateDelay(200);const t=I.find(i=>i.orderId.toUpperCase()===e.toUpperCase());if(!t)throw new T("Payment for Order",e);return{...t}}async getAllPayments(){return await this.simulateDelay(250),[...I]}}const re=new ie;class ne{async simulateDelay(e=200){return new Promise(t=>setTimeout(t,e))}async getDeliveryByOrderId(e){await this.simulateDelay(200);const t=H.find(i=>i.orderId.toUpperCase()===e.toUpperCase());if(!t)throw new T("Delivery for Order",e);return{...t}}}const oe=new ne;class le{constructor(){c(this,"events",[...q])}async simulateDelay(e=200){return new Promise(t=>setTimeout(t,e))}async getInventoryEventsByProduct(e){return await this.simulateDelay(200),this.events.filter(t=>t.productId===e)}async logInventoryEvent(e){await this.simulateDelay(300);const t={...e,id:`INV-${Math.floor(3e3+Math.random()*9e3)}`,timestamp:new Date().toISOString()};return this.events.push(t),t}}const de=new le,v={auth:K,orders:ae,payments:re,deliveries:oe,inventory:de};class ce{constructor(e){c(this,"container");c(this,"currentUser",null);c(this,"isMobileMenuOpen",!1);this.container=e,this.currentUser=b.getCurrentUser()}updateState(e){this.currentUser=b.getCurrentUser(),this.renderHeader()}render(e){var t,i,a,r,l,n,o,d,u,h,p;this.currentUser=b.getCurrentUser(),this.container.innerHTML=`
      <div class="min-h-screen bg-slate-50 flex flex-col">
        <!-- Persistent Navigation Header -->
        <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            <!-- Left: Brand Logo & Title -->
            <div class="flex items-center gap-6">
              <a href="#orders" class="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
                <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  ⚡
                </div>
                <div>
                  <span class="font-bold text-slate-900 text-base tracking-tight block">Qikro Engine</span>
                  <span class="text-[10px] text-indigo-600 font-mono font-semibold uppercase tracking-wider block -mt-1">Core Platform</span>
                </div>
              </a>

              <!-- Desktop Navigation Links -->
              <nav class="hidden md:flex items-center gap-1 ms-4" aria-label="Main Navigation">
                <a
                  href="#orders"
                  class="px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${this.isOrdersActive()?"bg-indigo-50 text-indigo-700 font-bold":"text-slate-600 hover:bg-slate-100 hover:text-slate-900"}"
                  ${this.isOrdersActive()?'aria-current="page"':""}
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z"/></svg>
                  Orders Engine
                </a>

                <a
                  href="#settlements"
                  class="px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${this.isSettlementsActive()?"bg-indigo-50 text-indigo-700 font-bold":"text-slate-600 hover:bg-slate-100 hover:text-slate-900"}"
                  ${this.isSettlementsActive()?'aria-current="page"':""}
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  Settlements & Payouts
                </a>
              </nav>
            </div>

            <!-- Right: Role Badge & User Profile & Logout -->
            <div class="hidden md:flex items-center gap-4">
              <!-- Role Badge -->
              <span class="px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${((t=this.currentUser)==null?void 0:t.role)==="admin"?"bg-purple-100 text-purple-800 border border-purple-200":((i=this.currentUser)==null?void 0:i.role)==="business_owner"?"bg-indigo-100 text-indigo-800 border border-indigo-200":"bg-emerald-100 text-emerald-800 border border-emerald-200"}">
                ${((a=this.currentUser)==null?void 0:a.role)==="admin"?"🛡️ Admin":((r=this.currentUser)==null?void 0:r.role)==="business_owner"?"🏪 Merchant":"👤 Customer"}
              </span>

              <!-- User Details -->
              <div class="flex items-center gap-2.5 border-s border-slate-200 ps-4">
                <img
                  src="${((l=this.currentUser)==null?void 0:l.avatarUrl)||"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}"
                  alt="${((n=this.currentUser)==null?void 0:n.name)||"User"}"
                  class="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div class="text-start">
                  <span class="text-xs font-semibold text-slate-900 block leading-tight">
                    ${((o=this.currentUser)==null?void 0:o.name)||"Authorized User"}
                  </span>
                  <span class="text-[10px] text-slate-500 font-mono block">
                    ${((d=this.currentUser)==null?void 0:d.phone)||""}
                  </span>
                </div>
              </div>

              <!-- Single Logout Point -->
              <button
                type="button"
                id="app-shell-logout-btn"
                class="ms-2 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors focus:ring-2 focus:ring-rose-500 focus:outline-none"
                aria-label="Logout of session"
              >
                Logout
              </button>
            </div>

            <!-- Mobile Hamburger Toggle -->
            <div class="md:hidden flex items-center gap-2">
              <button
                type="button"
                id="mobile-menu-toggle"
                class="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle navigation menu"
                aria-expanded="${this.isMobileMenuOpen}"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${this.isMobileMenuOpen?"M6 18L18 6M6 6l12 12":"M4 6h16M4 12h16M4 18h16"}"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Dropdown Navigation Menu -->
          ${this.isMobileMenuOpen?`
            <div class="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-4 space-y-3">
              <nav class="flex flex-col gap-1">
                <a
                  href="#orders"
                  class="px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${this.isOrdersActive()?"bg-indigo-50 text-indigo-700 font-bold":"text-slate-700"}"
                >
                  Orders Engine
                </a>
                <a
                  href="#settlements"
                  class="px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${this.isSettlementsActive()?"bg-indigo-50 text-indigo-700 font-bold":"text-slate-700"}"
                >
                  Settlements & Payouts
                </a>
              </nav>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img
                    src="${((u=this.currentUser)==null?void 0:u.avatarUrl)||""}"
                    alt=""
                    class="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <span class="text-xs font-semibold text-slate-900 block">${(h=this.currentUser)==null?void 0:h.name}</span>
                    <span class="text-[10px] text-slate-500 font-mono">${(p=this.currentUser)==null?void 0:p.phone}</span>
                  </div>
                </div>

                <button
                  type="button"
                  id="mobile-logout-btn"
                  class="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          `:""}
        </header>

        <!-- Main Content Body -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="app-main-content">
          ${e}
        </main>
      </div>
    `,this.attachEvents()}isOrdersActive(){const e=window.location.hash;return e===""||e==="#"||e.startsWith("#orders")}isSettlementsActive(){return window.location.hash.startsWith("#settlements")}renderHeader(){const e=this.container.querySelector("#app-main-content");if(e){const t=e.innerHTML;this.render(t)}}attachEvents(){const e=this.container.querySelector("#app-shell-logout-btn"),t=this.container.querySelector("#mobile-logout-btn"),i=this.container.querySelector("#mobile-menu-toggle"),a=async()=>{await v.auth.logout(),x.navigate("login")};e&&e.addEventListener("click",a),t&&t.addEventListener("click",a),i&&i.addEventListener("click",()=>{this.isMobileMenuOpen=!this.isMobileMenuOpen;const r=this.container.querySelector("#app-main-content");r&&this.render(r.innerHTML)})}}class ue{constructor(e,t){c(this,"container");c(this,"options");c(this,"inputs",[]);c(this,"resendTimer",60);c(this,"timerInterval",null);c(this,"isResendDisabled",!0);this.container=e,this.options=t,this.render(),this.startResendTimer()}render(){this.container.innerHTML=`
      <div class="space-y-4" aria-label="OTP verification form">
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">
          Enter 6-Digit Verification Code
        </label>
        
        <div class="flex items-center justify-center gap-2 sm:gap-3" id="otp-digit-container" role="group" aria-label="6-digit OTP fields">
          ${[0,1,2,3,4,5].map(e=>`
            <input
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              data-index="${e}"
              aria-label="Digit ${e+1} of 6"
              class="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white border border-slate-200 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 transition-all outline-none"
              ${this.options.disabled?"disabled":""}
            />
          `).join("")}
        </div>

        <div class="flex items-center justify-between text-xs pt-2 text-slate-600">
          <span id="otp-timer-label" class="flex items-center gap-1 font-medium">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Resend available in: <strong id="resend-timer-val" class="text-indigo-600">${this.resendTimer}s</strong>
          </span>

          <button
            type="button"
            id="otp-resend-btn"
            class="text-indigo-600 hover:text-indigo-700 font-semibold disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
            disabled
          >
            Resend Code
          </button>
        </div>
      </div>
    `,this.attachEventListeners()}attachEventListeners(){this.inputs=Array.from(this.container.querySelectorAll("input[data-index]"));const e=this.container.querySelector("#otp-resend-btn");e&&e.addEventListener("click",()=>{this.isResendDisabled||(this.options.onResend(),this.resetTimer())}),this.inputs.forEach((t,i)=>{t.addEventListener("input",a=>{const r=a.target.value.replace(/[^0-9]/g,"");a.target.value=r,r&&i<5&&this.inputs[i+1].focus(),this.checkCompletion()}),t.addEventListener("keydown",a=>{a.key==="Backspace"?!t.value&&i>0&&(this.inputs[i-1].focus(),this.inputs[i-1].value=""):a.key==="ArrowLeft"&&i>0?this.inputs[i-1].focus():a.key==="ArrowRight"&&i<5&&this.inputs[i+1].focus()}),t.addEventListener("paste",a=>{var l;a.preventDefault();const r=(((l=a.clipboardData)==null?void 0:l.getData("text"))||"").replace(/[^0-9]/g,"").slice(0,6);r&&(r.split("").forEach((n,o)=>{this.inputs[o]&&(this.inputs[o].value=n)}),r.length===6?this.inputs[5].focus():this.inputs[r.length]&&this.inputs[r.length].focus(),this.checkCompletion())})})}checkCompletion(){const e=this.inputs.map(t=>t.value).join("");e.length===6&&this.options.onComplete(e)}focusFirst(){this.inputs[0]&&this.inputs[0].focus()}clear(){this.inputs.forEach(e=>e.value=""),this.focusFirst()}startResendTimer(){this.resendTimer=60,this.isResendDisabled=!0,this.updateTimerUI(),this.timerInterval&&clearInterval(this.timerInterval),this.timerInterval=window.setInterval(()=>{this.resendTimer-=1,this.resendTimer<=0&&(this.timerInterval&&clearInterval(this.timerInterval),this.isResendDisabled=!1),this.updateTimerUI()},1e3)}resetTimer(){this.startResendTimer()}updateTimerUI(){const e=this.container.querySelector("#resend-timer-val"),t=this.container.querySelector("#otp-resend-btn");e&&(e.textContent=`${this.resendTimer}s`),t&&(t.disabled=this.isResendDisabled)}destroy(){this.timerInterval&&clearInterval(this.timerInterval)}}function A(s){return`
    <div 
      role="alert" 
      aria-live="assertive"
      class="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6 shadow-sm flex items-start justify-between gap-4 animate-fade-in"
    >
      <div class="flex items-start gap-3">
        <div class="text-rose-600 shrink-0 mt-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-rose-800">
            ${s.title||"Action Failed"}
          </h4>
          <p class="text-xs text-rose-700 mt-0.5">
            ${s.message}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        ${s.onRetry?`
          <button
            type="button"
            data-action="error-retry-btn"
            class="px-3 py-1.5 text-xs font-semibold text-rose-800 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors focus:ring-2 focus:ring-rose-500"
          >
            Retry
          </button>
        `:""}

        ${s.onDismiss?`
          <button
            type="button"
            data-action="error-dismiss-btn"
            class="text-rose-500 hover:text-rose-700 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label="Dismiss error"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        `:""}
      </div>
    </div>
  `}class me{constructor(e){c(this,"container");c(this,"currentStep","phone");c(this,"phone","");c(this,"isLoading",!1);c(this,"errorMessage",null);c(this,"mockOtpReceived",null);c(this,"otpInputInstance",null);this.container=e}render(){this.container.innerHTML=`
      <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-2xl shadow-lg mb-4">
            ⚡
          </div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            Qikro Order Platform
          </h1>
          <p class="text-xs text-slate-500 mt-1">
            Platform Authentication, Order Lifecycle & Settlement Engine
          </p>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10 relative overflow-hidden">
            
            ${this.errorMessage?A({title:"Authentication Error",message:this.errorMessage,onDismiss:()=>{this.errorMessage=null,this.render()}}):""}

            ${this.currentStep==="phone"?this.renderPhoneStep():this.renderOtpStep()}

            <!-- Demo Quick Test Shortcuts -->
            <div class="mt-8 pt-6 border-t border-slate-100">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block text-center mb-3">
                Quick Test Accounts (Click to Fill)
              </span>
              <div class="space-y-2">
                <button
                  type="button"
                  data-demo-phone="+919876543210"
                  class="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>🏪 Rajesh (Merchant - Gourmet Bistro)</span>
                  <span class="font-mono text-[11px] text-indigo-600">+919876543210</span>
                </button>

                <button
                  type="button"
                  data-demo-phone="+919999999999"
                  class="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>🛡️ Aarav (Super Admin)</span>
                  <span class="font-mono text-[11px] text-indigo-600">+919999999999</span>
                </button>

                <button
                  type="button"
                  data-demo-phone="+919123456789"
                  class="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>👤 Priya (Customer)</span>
                  <span class="font-mono text-[11px] text-indigo-600">+919123456789</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,this.attachEvents()}renderPhoneStep(){return`
      <form id="phone-form" class="space-y-5">
        <div>
          <label for="phone-input" class="block text-xs font-semibold text-slate-700 mb-2">
            Mobile Phone Number
          </label>
          <div class="relative rounded-lg shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-semibold text-xs border-r border-slate-200 pr-2">
              🇮🇳 +91
            </div>
            <input
              type="tel"
              id="phone-input"
              value="${this.phone.replace("+91","")}"
              placeholder="9876543210"
              required
              class="w-full pl-16 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition-all outline-none font-mono"
            />
          </div>
          <p class="text-[11px] text-slate-500 mt-1">
            Enter your 10-digit mobile number to receive a 6-digit verification code.
          </p>
        </div>

        <button
          type="submit"
          id="submit-phone-btn"
          ${this.isLoading?"disabled":""}
          class="w-full py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          ${this.isLoading?`
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Sending OTP Code...
          `:"Send 6-Digit OTP Code"}
        </button>
      </form>
    `}renderOtpStep(){return`
      <div class="space-y-6">
        <div class="text-center">
          <span class="text-xs text-slate-500 font-medium block">Verification code sent to</span>
          <strong class="text-sm font-mono text-slate-900">${this.phone}</strong>
          <button type="button" id="change-phone-btn" class="text-xs text-indigo-600 hover:underline ms-2 font-semibold">
            Change Number
          </button>
        </div>

        <!-- MOCK Helper Callout Note for Demo Testers -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center animate-fade-in">
          <span class="text-xs font-semibold text-indigo-900 block">
            🔑 Mock OTP Code for Testing:
          </span>
          <code class="text-base font-bold text-indigo-700 font-mono tracking-widest block mt-0.5">
            ${this.mockOtpReceived||"123456"}
          </code>
        </div>

        <!-- OTP Input Component Mount Container -->
        <div id="otp-input-mount"></div>

        ${this.isLoading?`
          <div class="text-center text-xs text-slate-500 flex items-center justify-center gap-2 py-2">
            <svg class="animate-spin h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Verifying code & establishing JWT session...
          </div>
        `:""}
      </div>
    `}attachEvents(){if(this.container.querySelectorAll("[data-demo-phone]").forEach(t=>{t.addEventListener("click",i=>{const a=i.currentTarget.getAttribute("data-demo-phone")||"";this.phone=a,this.requestOtpSubmit()})}),this.currentStep==="phone"){const t=this.container.querySelector("#phone-form");t&&t.addEventListener("submit",i=>{i.preventDefault();const a=this.container.querySelector("#phone-input");if(a){const r=a.value.trim();this.phone=r.startsWith("+91")?r:`+91${r}`,this.requestOtpSubmit()}})}else if(this.currentStep==="otp"){const t=this.container.querySelector("#change-phone-btn");t&&t.addEventListener("click",()=>{this.currentStep="phone",this.errorMessage=null,this.render()});const i=this.container.querySelector("#otp-input-mount");i&&(this.otpInputInstance=new ue(i,{onComplete:a=>this.verifyOtpSubmit(a),onResend:()=>this.requestOtpSubmit(),disabled:this.isLoading}),this.otpInputInstance.focusFirst())}}async requestOtpSubmit(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=await v.auth.requestOtp(this.phone);this.mockOtpReceived=e.mockOtp||"123456",this.currentStep="otp"}catch(e){this.errorMessage=e.message||"Failed to request OTP code."}finally{this.isLoading=!1,this.render()}}async verifyOtpSubmit(e){this.isLoading=!0,this.errorMessage=null,this.render();try{await v.auth.verifyOtp(this.phone,e),x.navigate("orders")}catch(t){this.errorMessage=t.message||"Verification failed.",this.isLoading=!1,this.render()}}}function pe(s){var l,n;const e=S(s.status),t=new Date(s.createdAt).toLocaleString("en-IN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),i=s.items.reduce((o,d)=>o+d.quantity,0),a=((l=s.items[0])==null?void 0:l.productName)||"Items",r=s.items.length>1?`${a} + ${s.items.length-1} more item(s)`:`${a} (x${((n=s.items[0])==null?void 0:n.quantity)||1})`;return`
    <article 
      class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
      aria-labelledby="order-title-${s.id}"
    >
      <div>
        <!-- Top header row -->
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span id="order-title-${s.id}" class="font-mono font-bold text-slate-900 text-sm tracking-tight">
              #${s.id}
            </span>
            <span class="text-xs text-slate-400 font-mono">• ${t}</span>
          </div>
          <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full border ${e.badgeStyle}">
            ${e.label}
          </span>
        </div>

        <!-- Business & Customer Info -->
        <div class="mb-4 space-y-1">
          <h3 class="font-semibold text-slate-900 text-base line-clamp-1">
            ${s.businessName}
          </h3>
          <p class="text-xs text-slate-600 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            ${s.customerName} (${s.customerPhone})
          </p>
        </div>

        <!-- Order Items Preview -->
        <div class="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4 text-xs text-slate-700">
          <div class="flex items-center justify-between text-slate-500 font-medium mb-1">
            <span>Items (${i})</span>
            <span>Subtotal</span>
          </div>
          <div class="flex items-center justify-between font-semibold text-slate-800">
            <span class="truncate max-w-[200px]">${r}</span>
            <span>${m(s.subtotal)}</span>
          </div>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Total Amount</span>
          <span class="text-base font-bold text-slate-900 font-mono">${m(s.totalAmount)}</span>
        </div>

        <a 
          href="#orders/${s.id}" 
          class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          aria-label="View details for order ${s.id}"
        >
          View Details
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `}function he(s=6){return`
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading orders">
      ${Array.from({length:s}).map(()=>`
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 animate-pulse-subtle">
          <div class="flex items-center justify-between">
            <div class="h-4 w-24 bg-slate-200 rounded"></div>
            <div class="h-5 w-20 bg-slate-200 rounded-full"></div>
          </div>
          <div class="space-y-2">
            <div class="h-5 w-3/4 bg-slate-200 rounded"></div>
            <div class="h-3 w-1/2 bg-slate-150 bg-slate-200 rounded"></div>
          </div>
          <div class="h-16 bg-slate-100 rounded-lg"></div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div class="h-6 w-20 bg-slate-200 rounded"></div>
            <div class="h-8 w-24 bg-indigo-100 rounded-lg"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `}function ge(){return`
    <div class="space-y-6 animate-pulse-subtle max-w-5xl mx-auto">
      <div class="h-6 w-48 bg-slate-200 rounded"></div>
      <div class="h-32 bg-white border border-slate-200 rounded-xl p-6"></div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="h-64 bg-white border border-slate-200 rounded-xl p-6"></div>
        </div>
        <div class="space-y-6">
          <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
          <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
        </div>
      </div>
    </div>
  `}function be(){return`
    <div class="space-y-6 animate-pulse-subtle max-w-5xl mx-auto">
      <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
      <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
    </div>
  `}function R(s){return`
    <div class="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-sm my-8">
      ${s.iconSvg||`
    <svg class="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
    </svg>
  `}
      <h3 class="text-base font-semibold text-slate-900 mb-1">
        ${s.title}
      </h3>
      <p class="text-xs text-slate-500 mb-6">
        ${s.description}
      </p>
      ${s.actionText?`
        <button
          type="button"
          data-action="empty-state-btn"
          class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500"
        >
          ${s.actionText}
        </button>
      `:""}
    </div>
  `}class xe{constructor(e){c(this,"container");c(this,"orders",[]);c(this,"isLoading",!0);c(this,"errorMessage",null);c(this,"selectedStatus","all");c(this,"searchQuery","");this.container=e}async loadData(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=b.getCurrentUser(),t=(e==null?void 0:e.role)==="business_owner"?e.businessId:void 0,i=this.selectedStatus==="exception"?void 0:this.selectedStatus;let r=(await v.orders.getOrders({page:1,limit:50,statusFilter:i,search:this.searchQuery,businessFilter:t})).items;this.selectedStatus==="exception"&&(r=r.filter(l=>["cancelled","failed","returned"].includes(l.status))),this.orders=r}catch(e){this.errorMessage=e.message||"Failed to fetch order list."}finally{this.isLoading=!1,this.render()}}render(){const e=b.getCurrentUser();this.container.innerHTML=`
      <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-xl font-bold text-slate-900 tracking-tight">
              Order Lifecycle Engine
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">
              ${(e==null?void 0:e.role)==="business_owner"?"Managing orders for your registered business.":"Real-time monitoring across all system order state transitions."}
            </p>
          </div>

          <button
            type="button"
            id="refresh-orders-btn"
            class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors self-start sm:self-auto"
          >
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refresh Feed
          </button>
        </div>

        <!-- Filter & Search Toolbar Bar -->
        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
          <!-- Status Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Order status filters">
            ${this.renderFilterPill("all","All Orders")}
            ${this.renderFilterPill("placed","Placed")}
            ${this.renderFilterPill("accepted","Accepted")}
            ${this.renderFilterPill("packing","Packing")}
            ${this.renderFilterPill("dispatched","Dispatched")}
            ${this.renderFilterPill("delivered","Delivered")}
            ${this.renderFilterPill("exception","⚠️ Exception States")}
          </div>

          <!-- Search Bar -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <input
              type="search"
              id="order-search-input"
              value="${this.searchQuery}"
              placeholder="Search by Order ID (e.g. #ORD-1001), Customer Name, or Phone Number..."
              class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition-all outline-none"
            />
          </div>
        </div>

        <!-- Error State Announcement -->
        ${this.errorMessage?A({title:"Order Feed Error",message:this.errorMessage,onRetry:()=>this.loadData()}):""}

        <!-- Loaded Content vs Loading Skeleton vs Empty State -->
        ${this.isLoading?he(6):this.renderOrderGrid()}
      </div>
    `,this.attachEvents()}renderFilterPill(e,t){const i=this.selectedStatus===e;return`
      <button
        type="button"
        data-filter-status="${e}"
        role="tab"
        aria-selected="${i}"
        class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${i?e==="exception"?"bg-rose-600 text-white shadow-xs":"bg-indigo-600 text-white shadow-xs":"bg-slate-100 hover:bg-slate-200 text-slate-600"}"
      >
        ${t}
      </button>
    `}renderOrderGrid(){return this.orders.length===0?R({title:"No Orders Found",description:this.searchQuery?`No order records matched your query "${this.searchQuery}". Try clearing filters.`:`There are currently no orders in status '${this.selectedStatus}'.`,actionText:"Reset Search Filters"}):`
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${this.orders.map(e=>pe(e)).join("")}
      </div>
    `}attachEvents(){this.container.querySelectorAll("[data-filter-status]").forEach(r=>{r.addEventListener("click",l=>{const n=l.currentTarget.getAttribute("data-filter-status");this.selectedStatus=n,this.loadData()})});const t=this.container.querySelector("#refresh-orders-btn");t&&t.addEventListener("click",()=>this.loadData());const i=this.container.querySelector("#order-search-input");if(i){let r;i.addEventListener("input",l=>{clearTimeout(r),this.searchQuery=l.target.value,r=setTimeout(()=>this.loadData(),300)})}const a=this.container.querySelector('[data-action="empty-state-btn"]');a&&a.addEventListener("click",()=>{this.selectedStatus="all",this.searchQuery="",this.loadData()})}}function fe(s){const e=s.status,t=["cancelled","failed","returned"].includes(e),i=W(),a=S(e),r=new Map;if(s.statusHistory.forEach(n=>r.set(n.status,n.timestamp)),t)return`
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h3 class="font-semibold text-slate-900 text-base">Order Progress Timeline</h3>
            <p class="text-xs text-slate-500">Tracking lifecycle for order #${s.id}</p>
          </div>
          <span class="px-3 py-1 text-xs font-semibold rounded-full border ${a.badgeStyle}">
            ${a.label}
          </span>
        </div>

        <div class="space-y-6">
          <!-- Prior happy path history items before exception -->
          <ol class="relative border-s border-slate-200 ms-3 space-y-6">
            ${s.statusHistory.map((n,o)=>{const d=S(n.status),u=o===s.statusHistory.length-1,h=["cancelled","failed","returned"].includes(n.status),p=new Date(n.timestamp).toLocaleString("en-IN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return`
                <li class="ms-6">
                  <span class="absolute -start-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white ${h?d.bgClass+" "+d.textClass+" border "+d.borderClass:"bg-indigo-600 text-white"}">
                    ${h?`
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                    `:`
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                      </svg>
                    `}
                  </span>
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 class="font-semibold text-slate-900 ${u?d.textClass:""}">
                      ${d.label}
                    </h4>
                    <time class="text-xs text-slate-400 font-mono">${p}</time>
                  </div>
                  <p class="text-xs text-slate-600 mt-1">${n.note||d.description}</p>
                </li>
              `}).join("")}
          </ol>

          <!-- Exception State Callout Banner -->
          <div class="p-4 rounded-lg border ${a.bgClass} ${a.borderClass} flex items-start gap-3 mt-4">
            <div class="${a.textClass} shrink-0 mt-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-sm ${a.textClass}">
                Order ${a.label}
              </h4>
              <p class="text-xs text-slate-700 mt-0.5">
                ${a.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;const l=i.indexOf(e);return`
    <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h3 class="font-semibold text-slate-900 text-base">Order Progress</h3>
          <p class="text-xs text-slate-500">Live order state machine tracking</p>
        </div>
        <span class="px-3 py-1 text-xs font-semibold rounded-full border ${a.badgeStyle}">
          ${a.label}
        </span>
      </div>

      <!-- Desktop Stepper (Horizontal) -->
      <div class="hidden md:block">
        <ol class="grid grid-cols-5 gap-2 relative">
          ${i.map((n,o)=>{const d=o<l,u=o===l,h=S(n),p=r.get(n),w=p?new Date(p).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}):"";return`
              <li class="flex flex-col items-center text-center relative group">
                <!-- Line connector -->
                ${o<4?`
                  <div class="absolute top-4 left-1/2 right-0 w-full h-0.5 -z-0 ${o<l?"bg-indigo-600":"bg-slate-200"}"></div>
                `:""}

                <!-- Step Circle Node -->
                <div class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all ${d?"bg-indigo-600 text-white shadow":u?"bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md":"bg-slate-100 text-slate-400 border border-slate-200"}">
                  ${d?`
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  `:`
                    <span class="text-xs font-bold">${o+1}</span>
                  `}
                </div>

                <!-- Step Label & Time -->
                <div class="mt-3">
                  <p class="text-xs font-semibold ${u?"text-indigo-600 font-bold":d?"text-slate-900":"text-slate-400"}">
                    ${h.label}
                  </p>
                  ${w?`
                    <span class="text-[10px] text-slate-400 font-mono block mt-0.5">${w}</span>
                  `:`
                    <span class="text-[10px] text-slate-300 block mt-0.5">Pending</span>
                  `}
                </div>
              </li>
            `}).join("")}
        </ol>
      </div>

      <!-- Mobile Timeline Stepper (Vertical) -->
      <div class="block md:hidden">
        <ol class="relative border-s border-indigo-200 ms-3 space-y-6">
          ${i.map((n,o)=>{const d=o<l,u=o===l,h=S(n),p=r.get(n),w=p?new Date(p).toLocaleString("en-IN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"";return`
              <li class="ms-6">
                <span class="absolute -start-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white ${d?"bg-indigo-600 text-white":u?"bg-indigo-600 text-white ring-indigo-100 ring-4":"bg-slate-100 text-slate-400 border border-slate-200"}">
                  ${d?`
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  `:`
                    <span class="text-[10px] font-bold">${o+1}</span>
                  `}
                </span>
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-xs ${u?"text-indigo-600 font-bold":d?"text-slate-900":"text-slate-400"}">
                    ${h.label}
                  </h4>
                  <time class="text-[10px] text-slate-400 font-mono">${w||"Pending"}</time>
                </div>
                <p class="text-[11px] text-slate-500 mt-0.5">${h.description}</p>
              </li>
            `}).join("")}
        </ol>
      </div>
    </div>
  `}class ve{constructor(e,t){c(this,"container");c(this,"orderId");c(this,"order",null);c(this,"payment",null);c(this,"delivery",null);c(this,"isLoading",!0);c(this,"isActionSubmitting",!1);c(this,"errorMessage",null);this.container=e,this.orderId=t}async loadData(){this.isLoading=!0,this.errorMessage=null,this.render();try{this.order=await v.orders.getOrderById(this.orderId);try{this.payment=await v.payments.getPaymentByOrderId(this.orderId)}catch{this.payment=null}try{this.delivery=await v.deliveries.getDeliveryByOrderId(this.orderId)}catch{this.delivery=null}}catch(e){this.errorMessage=e.message||`Failed to load order #${this.orderId}.`}finally{this.isLoading=!1,this.render()}}render(){var l,n,o,d,u,h,p,w,f,O,D;if(this.isLoading){this.container.innerHTML=ge();return}if(this.errorMessage||!this.order){this.container.innerHTML=`
        <div class="space-y-4">
          <a href="#orders" class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline">
            ← Back to Orders Engine
          </a>
          ${A({title:"Order Detail Error",message:this.errorMessage||`Order #${this.orderId} was not found.`,onRetry:()=>this.loadData()})}
          ${this.order?"":R({title:"Order Not Found",description:`The requested order ID #${this.orderId} does not exist in the domain engine.`,actionText:"Back to Orders List"})}
        </div>
      `,this.attachEvents();return}const e=this.order,t=S(e.status),i=Q(e.status),a=X(e.status),r=new Date(e.createdAt).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"});this.container.innerHTML=`
      <div class="space-y-6 max-w-5xl mx-auto">
        <!-- Breadcrumbs Navigation -->
        <nav class="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
          <a href="#orders" class="hover:text-indigo-600 transition-colors font-medium">Orders Engine</a>
          <span class="text-slate-300">/</span>
          <span class="font-mono text-slate-900 font-bold">#${e.id}</span>
        </nav>

        <!-- Header Title Bar -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                Order #${e.id}
              </h1>
              <span class="px-3 py-1 text-xs font-semibold rounded-full border ${t.badgeStyle}">
                ${t.label}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Created on <strong class="text-slate-700">${r}</strong> • Business: <strong class="text-slate-700">${e.businessName}</strong>
            </p>
          </div>

          <div class="text-start sm:text-end">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Order Amount</span>
            <span class="text-2xl font-bold text-slate-900 font-mono">${m(e.totalAmount)}</span>
          </div>
        </div>

        <!-- Action Error Banner -->
        ${this.errorMessage?A({title:"Transition Failed",message:this.errorMessage,onDismiss:()=>{this.errorMessage=null,this.render()}}):""}

        <!-- Order State Stepper -->
        ${fe(e)}

        <!-- Admin / Merchant State Machine Action Control Panel -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 class="font-semibold text-slate-900 text-sm">State Machine Control Panel</h3>
              <p class="text-xs text-slate-500">Allowed status transitions strictly dictated by business logic graph</p>
            </div>
            <span class="text-xs font-mono text-slate-400">Current State: [ ${e.status.toUpperCase()} ]</span>
          </div>

          ${a?`
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <span class="text-xs font-semibold text-slate-700 block">
                🔒 Order is in terminal state <strong class="uppercase text-slate-900">${e.status}</strong>.
              </span>
              <p class="text-[11px] text-slate-500 mt-0.5">
                No further state machine transitions are allowed for this lifecycle instance.
              </p>
            </div>
          `:`
            <div class="space-y-3">
              <span class="text-xs font-semibold text-slate-700 block">
                Available Next State Transitions:
              </span>
              <div class="flex flex-wrap gap-3">
                ${i.map(y=>{const $=S(y),B=y==="cancelled";return`
                    <button
                      type="button"
                      data-action="transition-btn"
                      data-target-status="${y}"
                      ${this.isActionSubmitting?"disabled":""}
                      class="px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-all focus:ring-2 disabled:opacity-50 flex items-center gap-1.5 ${B?"bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500":"bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"}"
                    >
                      ${this.isActionSubmitting?`
                        <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      `:""}
                      Transition to "${$.label}"
                    </button>
                  `}).join("")}
              </div>
            </div>
          `}
        </div>

        <!-- 2 Column Details Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Left 2 Cols: Order Items Table -->
          <div class="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 class="font-semibold text-slate-900 text-base mb-4">
              Itemized Order Summary (${e.items.reduce((y,$)=>y+$.quantity,0)} items)
            </h3>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-700">
                <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th class="px-4 py-3">Product Name</th>
                    <th class="px-4 py-3 text-right">Unit Price</th>
                    <th class="px-4 py-3 text-center">Qty</th>
                    <th class="px-4 py-3 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${e.items.map(y=>`
                    <tr>
                      <td class="px-4 py-3 font-semibold text-slate-900">${y.productName}</td>
                      <td class="px-4 py-3 text-right font-mono">${m(y.unitPrice)}</td>
                      <td class="px-4 py-3 text-center font-mono font-bold">${y.quantity}</td>
                      <td class="px-4 py-3 text-right font-mono font-bold text-slate-900">${m(y.totalPrice)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>

            <!-- Financial Breakdown Table -->
            <div class="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs max-w-xs ms-auto">
              <div class="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span class="font-mono font-semibold">${m(e.subtotal)}</span>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>Delivery Logistics Fee</span>
                <span class="font-mono font-semibold">${m(e.deliveryFee)}</span>
              </div>
              <div class="flex justify-between text-slate-500 text-[11px]">
                <span>Platform Commission (${Math.round(e.commissionRate*100)}%)</span>
                <span class="font-mono">-${m(e.commissionAmount)}</span>
              </div>
              <div class="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total Amount Paid</span>
                <span class="font-mono">${m(e.totalAmount)}</span>
              </div>
            </div>
          </div>

          <!-- Right Col: Payment & Logistics Cards -->
          <div class="space-y-6">
            <!-- Payment Card -->
            <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 class="font-semibold text-slate-900 text-sm">Payment Details</h3>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  ${((l=this.payment)==null?void 0:l.provider)||"UPI"}
                </span>
              </div>
              
              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-slate-400 block text-[11px]">Transaction Ref ID</span>
                  <span class="font-mono font-bold text-slate-900">${((n=this.payment)==null?void 0:n.transactionRef)||"N/A"}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Payment Status</span>
                  <span class="font-semibold capitalize text-emerald-600">${((o=this.payment)==null?void 0:o.status)||"captured"}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Amount Captured</span>
                  <span class="font-mono font-bold text-slate-900">${m(((d=this.payment)==null?void 0:d.amount)||e.totalAmount)}</span>
                </div>
              </div>
            </div>

            <!-- Delivery Logistics Card -->
            <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 class="font-semibold text-slate-900 text-sm">Delivery Partner</h3>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  ${((u=this.delivery)==null?void 0:u.partnerName)||"Logistics"}
                </span>
              </div>

              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-slate-400 block text-[11px]">Tracking Number</span>
                  <span class="font-mono font-bold text-indigo-600">${((h=this.delivery)==null?void 0:h.trackingNumber)||"SE-990011"}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Delivery Driver Agent</span>
                  <span class="font-semibold text-slate-800">${((p=this.delivery)==null?void 0:p.agentName)||"Assigned Driver"} (${((w=this.delivery)==null?void 0:w.agentPhone)||"+919811223344"})</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Destination Address</span>
                  <span class="text-slate-700 leading-snug block">
                    ${(f=this.delivery)==null?void 0:f.deliveryAddress.street}, ${(O=this.delivery)==null?void 0:O.deliveryAddress.city} - ${(D=this.delivery)==null?void 0:D.deliveryAddress.postalCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,this.attachEvents()}attachEvents(){this.container.querySelectorAll('[data-action="transition-btn"]').forEach(i=>{i.addEventListener("click",async a=>{const r=a.currentTarget.getAttribute("data-target-status");r&&await this.executeTransition(r)})});const t=this.container.querySelector('[data-action="empty-state-btn"]');t&&t.addEventListener("click",()=>{window.location.hash="#orders"})}async executeTransition(e){this.isActionSubmitting=!0,this.errorMessage=null,this.render();try{const t=b.getCurrentUser(),i=(t==null?void 0:t.id)||"system";let a;e==="cancelled"&&(a=prompt("Please enter a cancellation note (optional):")||"Cancelled by admin/merchant via control panel"),this.order=await v.orders.transitionOrderState(this.orderId,e,i,a)}catch(t){this.errorMessage=t.message||`Failed to transition order state to '${e}'.`}finally{this.isActionSubmitting=!1,this.render()}}}function ye(s,e=!1){const t=s.pendingPayout===0&&s.settledPayout>0,i=Math.round(s.commissionRate*100);return`
    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" id="settlement-card-${s.businessId}">
      <!-- Business Header & Summary Grid -->
      <div class="p-6 border-b border-slate-100">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-slate-900 text-lg">${s.businessName}</h3>
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ${i}% Commission Cut
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              ${s.eligibleOrdersCount} of ${s.totalOrdersCount} orders eligible for payout settlement
            </p>
          </div>

          <div class="flex items-center gap-3">
            ${t?`
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                Fully Settled
              </span>
            `:`
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Pending Release
              </span>
            `}

            ${s.pendingPayout>0?`
              <button
                type="button"
                data-action="mark-settled"
                data-business-id="${s.businessId}"
                class="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500"
              >
                Release Payout (${m(s.pendingPayout)})
              </button>
            `:""}
          </div>
        </div>

        <!-- 4 Stat Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Gross Product Sales -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Gross Product Revenue
            </span>
            <span class="text-xl font-bold text-slate-900 font-mono">
              ${m(s.grossRevenue)}
            </span>
            <span class="text-[11px] text-slate-400 block mt-1">Excludes delivery fees</span>
          </div>

          <!-- Platform Commission Cut (Slate Neutral - Non alarming) -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Platform Commission (${i}%)
            </span>
            <span class="text-xl font-bold text-slate-500 font-mono">
              -${m(s.totalCommissionCut)}
            </span>
            <span class="text-[11px] text-slate-400 block mt-1">Platform service fee</span>
          </div>

          <!-- Net Merchant Payout -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Net Payout
            </span>
            <span class="text-xl font-bold text-emerald-600 font-mono">
              ${m(s.totalNetPayout)}
            </span>
            <span class="text-[11px] text-emerald-700 block mt-1 font-medium">Merchant earnings</span>
          </div>

          <!-- Pending vs Settled Split -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Pending Payout
            </span>
            <span class="text-xl font-bold ${s.pendingPayout>0?"text-amber-600":"text-slate-400"} font-mono">
              ${m(s.pendingPayout)}
            </span>
            <span class="text-[11px] text-slate-500 block mt-1">
              Already settled: <strong class="text-slate-700 font-mono">${m(s.settledPayout)}</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Expandable Breakdown Bar -->
      <div class="bg-slate-50/70 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
        <button
          type="button"
          data-action="toggle-breakdown"
          data-business-id="${s.businessId}"
          class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 transition-colors focus:outline-none"
          aria-expanded="${e}"
        >
          <svg class="w-4 h-4 transition-transform duration-200 ${e?"rotate-180":""}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          ${e?"Hide Order Breakdown":`View Itemized Breakdown (${s.orderBreakdown.length} Orders)`}
        </button>

        <span class="text-[11px] text-slate-400 font-medium">
          Calculation Rule: Subtotal - Commission Cut = Net Payout
        </span>
      </div>

      <!-- Itemized Order Table (Collapsible) -->
      ${e?`
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-100 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th class="px-6 py-3">Order ID</th>
                <th class="px-6 py-3">Customer</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3 text-right">Items Subtotal</th>
                <th class="px-6 py-3 text-right">Delivery Fee</th>
                <th class="px-6 py-3 text-right">Commission Cut</th>
                <th class="px-6 py-3 text-right">Net Payout</th>
                <th class="px-6 py-3 text-center">Settlement Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 bg-white">
              ${s.orderBreakdown.map(a=>{const r=S(a.orderStatus);return`
                  <tr class="hover:bg-slate-50/80 transition-colors ${a.isEligibleForSettlement?"":"bg-slate-50/40 text-slate-400"}">
                    <td class="px-6 py-3 font-mono font-bold text-slate-900">
                      <a href="#orders/${a.orderId}" class="text-indigo-600 hover:underline">#${a.orderId}</a>
                    </td>
                    <td class="px-6 py-3 font-medium">${a.customerName}</td>
                    <td class="px-6 py-3">
                      <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full border ${r.badgeStyle}">
                        ${r.label}
                      </span>
                    </td>
                    <td class="px-6 py-3 text-right font-mono font-medium">${m(a.subtotal)}</td>
                    <td class="px-6 py-3 text-right font-mono text-slate-400">
                      ${m(a.deliveryFee)}
                      <span class="text-[9px] block text-slate-400">(Excluded)</span>
                    </td>
                    <td class="px-6 py-3 text-right font-mono text-slate-500">
                      -${m(a.commissionAmount)}
                    </td>
                    <td class="px-6 py-3 text-right font-mono font-bold ${a.isEligibleForSettlement?"text-emerald-600":"text-slate-400"}">
                      ${m(a.netPayoutAmount)}
                    </td>
                    <td class="px-6 py-3 text-center">
                      ${a.isSettled?`
                        <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Settled
                        </span>
                      `:a.isEligibleForSettlement?`
                        <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Pending
                        </span>
                      `:`
                        <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 text-slate-500 border border-slate-200" title="${a.ineligibilityReason}">
                          Ineligible
                        </span>
                      `}
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `:""}
    </div>
  `}class we{constructor(e){c(this,"container");c(this,"summaries",[]);c(this,"businesses",[]);c(this,"selectedBusinessId","all");c(this,"expandedMap",new Map);c(this,"isLoading",!0);c(this,"errorMessage",null);c(this,"successMessage",null);this.container=e}async loadData(){this.isLoading=!0,this.errorMessage=null,this.render();try{const e=b.getCurrentUser();this.businesses=await v.orders.getAllBusinesses();const t=(e==null?void 0:e.role)==="business_owner"?e.businessId:this.selectedBusinessId!=="all"?this.selectedBusinessId:void 0;this.summaries=await v.orders.getSettlementSummary(t)}catch(e){this.errorMessage=e.message||"Failed to fetch settlement calculation summaries."}finally{this.isLoading=!1,this.render()}}render(){if(this.isLoading){this.container.innerHTML=be();return}const e=b.getCurrentUser(),t=(e==null?void 0:e.role)==="admin",i=g(this.summaries.reduce((o,d)=>o+d.grossRevenue,0)),a=g(this.summaries.reduce((o,d)=>o+d.totalCommissionCut,0)),r=g(this.summaries.reduce((o,d)=>o+d.totalNetPayout,0)),l=g(this.summaries.reduce((o,d)=>o+d.pendingPayout,0)),n=g(this.summaries.reduce((o,d)=>o+d.settledPayout,0));this.container.innerHTML=`
      <div class="space-y-6 max-w-6xl mx-auto">
        <!-- Page Title & Role Selector Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-xl font-bold text-slate-900 tracking-tight">
              Settlements & Commission Engine
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">
              ${t?"Platform-wide settlement calculation and payout disbursement engine.":"Merchant financial settlements, platform fees, and pending payout ledger."}
            </p>
          </div>

          ${t?`
            <div class="flex items-center gap-2">
              <label for="business-select-filter" class="text-xs font-semibold text-slate-600">Filter Business:</label>
              <select
                id="business-select-filter"
                class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="all" ${this.selectedBusinessId==="all"?"selected":""}>All Merchant Businesses (${this.businesses.length})</option>
                ${this.businesses.map(o=>`
                  <option value="${o.id}" ${this.selectedBusinessId===o.id?"selected":""}>
                    ${o.name} (${Math.round(o.commissionRate*100)}% Fee)
                  </option>
                `).join("")}
              </select>
            </div>
          `:""}
        </div>

        <!-- Success Toast Notification -->
        ${this.successMessage?`
          <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold flex items-center justify-between animate-fade-in shadow-xs">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              ${this.successMessage}
            </span>
            <button type="button" id="dismiss-success-btn" class="text-emerald-600 hover:text-emerald-900">✕</button>
          </div>
        `:""}

        <!-- Error Notification -->
        ${this.errorMessage?A({title:"Settlement Service Error",message:this.errorMessage,onRetry:()=>this.loadData()}):""}

        <!-- Aggregate Financial Ledger Card -->
        <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-6 shadow-md">
          <div class="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
            <div>
              <span class="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-semibold block">
                Platform Aggregate Financial Ledger
              </span>
              <h2 class="text-lg font-bold text-white mt-0.5">
                ${t?"Combined Financial Overview":"Business Financial Statement"}
              </h2>
            </div>
            <span class="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
              ISO 4217 INR (₹)
            </span>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <span class="text-xs text-slate-400 block mb-1">Gross Sales Revenue</span>
              <span class="text-2xl font-bold font-mono text-white">${m(i)}</span>
              <span class="text-[10px] text-slate-400 block mt-1">Excludes delivery logistics</span>
            </div>

            <div>
              <span class="text-xs text-slate-400 block mb-1">Platform Commission Retained</span>
              <span class="text-2xl font-bold font-mono text-slate-300">-${m(a)}</span>
              <span class="text-[10px] text-slate-400 block mt-1">Platform service fees</span>
            </div>

            <div>
              <span class="text-xs text-indigo-300 block mb-1">Net Merchant Earnings</span>
              <span class="text-2xl font-bold font-mono text-emerald-400">${m(r)}</span>
              <span class="text-[10px] text-emerald-300/80 block mt-1">Net payable amount</span>
            </div>

            <div>
              <span class="text-xs text-amber-300 block mb-1">Pending Payout Release</span>
              <span class="text-2xl font-bold font-mono text-amber-400">${m(l)}</span>
              <span class="text-[10px] text-slate-400 block mt-1">
                Settled: <strong class="text-slate-200 font-mono">${m(n)}</strong>
              </span>
            </div>
          </div>
        </div>

        <!-- Per-Business Settlement Summaries List -->
        ${this.summaries.length===0?R({title:"No Settlement Records Found",description:"No active business orders or settlements match the current filter selection."}):`
          <div class="space-y-6">
            ${this.summaries.map(o=>ye(o,!!this.expandedMap.get(o.businessId))).join("")}
          </div>
        `}
      </div>
    `,this.attachEvents()}attachEvents(){const e=this.container.querySelector("#business-select-filter");e&&e.addEventListener("change",r=>{this.selectedBusinessId=r.target.value,this.loadData()});const t=this.container.querySelector("#dismiss-success-btn");t&&t.addEventListener("click",()=>{this.successMessage=null,this.render()}),this.container.querySelectorAll('[data-action="toggle-breakdown"]').forEach(r=>{r.addEventListener("click",l=>{const n=l.currentTarget.getAttribute("data-business-id");if(n){const o=!!this.expandedMap.get(n);this.expandedMap.set(n,!o),this.render()}})}),this.container.querySelectorAll('[data-action="mark-settled"]').forEach(r=>{r.addEventListener("click",async l=>{const n=l.currentTarget.getAttribute("data-business-id");n&&await this.executeMarkSettled(n)})})}async executeMarkSettled(e){this.isLoading=!0,this.errorMessage=null,this.render();try{const t=await v.orders.markSettled(e);this.successMessage=`Successfully settled ${t.settledCount} orders releasing ${m(t.totalAmountSettled)} to business payout account.`,await this.loadData()}catch(t){this.errorMessage=t.message||"Failed to process payout settlement release.",this.isLoading=!1,this.render()}}}class Se{constructor(){c(this,"appContainer");c(this,"shellComponent");const e=document.getElementById("app");if(!e)throw new Error("Root #app DOM container missing from index.html");this.appContainer=e,this.shellComponent=new ce(this.appContainer),this.initRoutes(),this.initSessionListener()}initRoutes(){x.register("login",!1,()=>{const e=k("login");if(!e.allowed&&e.redirect){x.navigate(e.redirect);return}new me(this.appContainer).render()}),x.register("orders",!0,()=>{const e=k("orders");if(!e.allowed&&e.redirect){x.navigate(e.redirect);return}this.shellComponent.render('<div id="screen-mount"></div>');const t=document.getElementById("screen-mount");t&&new xe(t).loadData()}),x.register("orders/:id",!0,e=>{const t=k("orders");if(!t.allowed&&t.redirect){x.navigate(t.redirect);return}const i=e.id;this.shellComponent.render('<div id="screen-mount"></div>');const a=document.getElementById("screen-mount");a&&new ve(a,i).loadData()}),x.register("settlements",!0,()=>{const e=k("settlements");if(!e.allowed&&e.redirect){x.navigate(e.redirect);return}this.shellComponent.render('<div id="screen-mount"></div>');const t=document.getElementById("screen-mount");t&&new we(t).loadData()})}initSessionListener(){b.subscribe(()=>{const e=window.location.hash.slice(1)||"orders",t=k(e);!t.allowed&&t.redirect&&x.navigate(t.redirect)})}start(){x.handleHashChange()}}document.addEventListener("DOMContentLoaded",()=>{new Se().start()});
