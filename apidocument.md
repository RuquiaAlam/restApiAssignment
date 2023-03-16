Page 1
---------
=> List the cities

http://localhost:9002/location
https://assignment-v.onrender.com/location




=>List the retaurants

http://localhost:9002/RestaurantData
https://assignment-v.onrender.com/RestaurantData

=>Restaurants on the basis of city 
http://localhost:9002/filter?address=Chandigarh
https://assignment-v.onrender.com/filter?address=Chandigarh

Page 2
---------
=>List of Restaurants based on state and meals

http://localhost:9002/RestaurantData?mealId=5&stateId=2
https://assignment-v.onrender.com/RestaurantData?mealId=2&stateId=1


=>Filter based on city
http://localhost:9002/filter?address=mumbai
https://assignment-v.onrender.com/filter?address=mumbai



=>Filter on the basis of cuisine
http://localhost:9002/cuisine/1?cuisineId=3

=>Filter on the basis of cost
http://localhost:9002/cuisine/1?cuisineId=3
https://assignment-v.onrender.com/cuisine/1?cuisineId=3


http://localhost:9002/cuisine/1?lcost=500&hcost=1000
https://assignment-v.onrender.com/cuisine/1?lcost=500&hcost=1000


http://localhost:9002/cuisine/2?lcost=500&hcost=2000&cuisineId=4&sort=-1
https://assignment-v.onrender.com/cuisine/2?lcost=500&hcost=2000&cuisineId=4&sort=-1
http://localhost:9002/cuisine/2?lcost=500&hcost=2000&cuisineId=4&sort=1
https://assignment-v.onrender.com/cuisine/2?lcost=500&hcost=2000&cuisineId=4&sort=1

Page 3
--------
=>Details of restaurants
http://localhost:9002/details/640b3f0480c81a7171507d57
(mongoObjectId)

http://localhost:9002/detailsrestaurantid/2
(restaurantid)


=>Menu of the restaurant
http://localhost:9002/RestaurantMenu/3 
(restaurants and their menus)
=>Meal Type 
http://localhost:9002/MealType

Page 4
---------
=>Menu details(selected items)


=>list of orders
http://localhost:9002/Orders

=>Place Order

Page 5
---------
=>List of orders placed



http://localhost:9002/placeOrder
=>List of orders placed on particular user

http://localhost:9002/Orders?email=alam@gmail.com
http://localhost:9002/Orders?email=rahul@gmail.com
https://assignment-v.onrender.com/Orders?email=kamie@gmail.com
{
   
    "name": "Jack",
    "email": "jack@gmail.com",
    "address": "Hno 23,Sector 1",
    "phone": 968768636,
    "cost": 1900,
    "menuItem": [
      2,
      22,
      23
    ]
  }

=>Update order status
localhost:9002/updateOrder/64121dbc3a69b4c94ef99c0a



Page 6
-------
Payment methods

