export const product = [
    {"Product_name":"Yales","amount":"100","product_description":"The great Yales","status":"available"},
    {"Product_name":"Locks","amount":"200","product_description":"Secure locks","status":"available"},
    {"Product_name":"Safes","amount":"150","product_description":"Sturdy safes","status":"out of stock"},
    {"Product_name":"Alarms","amount":"300","product_description":"Reliable alarms","status":"available"},
    {"Product_name":"Cameras","amount":"120","product_description":"High-resolution cameras","status":"available"},
    {"Product_name":"Sensors","amount":"180","product_description":"Motion sensors","status":"out of stock"},
    {"Product_name":"Doors","amount":"75","product_description":"Reinforced doors","status":"available"},
    {"Product_name":"Windows","amount":"90","product_description":"Shatterproof windows","status":"available"},
    {"Product_name":"Gates","amount":"110","product_description":"Automatic gates","status":"out of stock"},
    {"Product_name":"Keys","amount":"250","product_description":"Custom keys","status":"available"}
  ];
  
  export interface Product {
    Product_name: string;
    amount: string;
    product_description: string;
    status: string;
  }