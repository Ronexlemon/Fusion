function generateRandomId() {
    return Math.floor(Math.random() * 1000000000).toString();
  }
  
  export const Products = [
    {"product_id": "6563562652856285285", "Product_name":"Yales","amount":"100","product_description":"The great Yales","status":"available","product_image":"/logo.svg"},
    {"product_id": "6563562652856285286", "Product_name":"Locks","amount":"200","product_description":"Secure locks","status":"available","product_image":"/logo.svg"},
    {"product_id": "6563562652856285287", "Product_name":"Safes","amount":"150","product_description":"Sturdy safes","status":"out of stock","product_image":"/logo.svg"},
    {"product_id": "6563562652856285288", "Product_name":"Alarms","amount":"300","product_description":"Reliable alarms","status":"available","product_image":"/logo.svg"},
    {"product_id": "6563562652856285289", "Product_name":"Cameras","amount":"120","product_description":"High-resolution cameras","status":"available","product_image":"/logo.svg"},
    {"product_id": "6563562652856285284", "Product_name":"Sensors","amount":"180","product_description":"Motion sensors","status":"out of stock","product_image":"/logo.svg"},
    {"product_id": "6563562652856285283", "Product_name":"Doors","amount":"75","product_description":"Reinforced doors","status":"available","product_image":"/logo.svg"},
    {"product_id": "6563562652856285282", "Product_name":"Windows","amount":"90","product_description":"Shatterproof windows","status":"available","product_image":"/logo.svg"},
    {"product_id": "6563562652856285281", "Product_name":"Gates","amount":"110","product_description":"Automatic gates","status":"out of stock","product_image":"/logo.svg"},
    {"product_id": "6563562652856285280", "Product_name":"Keys","amount":"250","product_description":"Custom keys","status":"available","product_image":"/logo.svg"}
  ];
  
  export interface ProductInterface {
    product_id: string;
    Product_name: string;
    amount: string;
    product_description: string;
    status: string;
    product_image: string;
  }
  