const express = require("express");
const mongo = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
  
let db;

const MongoClient = mongo.MongoClient;
const app = express();
app.use(cors());



// console.log(process.env);
const MONGO_URL = process.env.MONGO_URL;
 //const MONGO_URL = "mongodb://localhost:27017";
//supporting libraries- middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT  = 9002;
const authkey ="9e9d7a08e048e9d604b79460b54969c3";
function auth(key){
  if(authkey == key)
{
  return true;

}
else{
  return false;

}
}
// const location = [
//   {
//       "_id": "1",
//       "name": "ShalimarBhagh, Delhi",
//       "city_id": "1",
//       "location_id": "1",
//       "country_name": "India"
//   },
//   {
//       "_id": "2",
//       "name": "Janpat, Delhi",
//       "city_id": "1",
//       "location_id": "2",
//       "country_name": "India"
//   },
//   {
//       "_id": "3",
//       "name": "MSP, Delhi",
//       "city_id": "1",
//       "location_id": "3",
//       "country_name": "India"
//   },
//   {
//       "_id": "4",
//       "name": "MSP, Pune",
//       "city_id": "2",
//       "location_id": "4",
//       "country_name": "India"
//   },
//   {
//       "_id": "5",
//       "name": "Anand Vihar, Delhi",
//       "city_id": "1",
//       "location_id": "5",
//       "country_name": "India"
//   },
//   {
//       "_id": "6",
//       "name": "Mahadevapura, Bangalore",
//       "city_id": "3",
//       "location_id": "5",
//       "country_name": "India"
//   },
//   {
//       "_id": "7",
//       "name": "Anna Nagar, Chennai",
//       "city_id": "4",
//       "location_id": "5",
//       "country_name": "India"
//   },
//   {
//       "_id": "8",
//       "name": "Thane, Mumbai",
//       "city_id": "5",
//       "location_id": "5",
//       "country_name": "India"
//   }
// ]
// const RestaurantData = [
//     {
//       "restaurant_id": 1,
//       "restaurant_name": "Domino's Pizza",
//       "location_id": 1,
//       "state_id": 1,
//       "address": "Ashok Vihar Phase 3, New Delhi",
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/chains/3/143/c77dfea619f2d7786a7d054afab5cd88_featured_v2.jpg",
//       "average_rating": 4.2,
//       "rating_text": "Very Good",
//       "cost": 666,
//       "contact_number": 9453524651,
//       "mealTypes": [
//         {
//           "mealtype_id": 1,
//           "mealtype_name": "Breakfast"
//         },
//         {
//           "mealtype_id": 2,
//           "mealtype_name": "Lunch"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 1,
//           "cuisine_name": "North Indian"
//         },
//         {
//           "cuisine_id": 4,
//           "cuisine_name": "Fast Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/chains/3/143/fbc2c4c9e55a3f011c493dda79c399f5.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/3/143/1adb116d088669540c89150836d668f9.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/3/143/2781ab2c532b711ecd401571cdd87eb9.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/3/143/c751805b5927046d340926f870a95f5e.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 2,
//       "restaurant_name": "Pandit Ji Paratha Hut",
//       "location_id": 2,
//       "state_id": 1,
//       "address": "Shop 44, Plot C,  Ashok Vihar Phase 2,Chincholi, Delhi-110006, Delhi",
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/6/307406/bc1a8c29f7ac21c07077a301ca4b4c00.jpg",
//       "average_rating": 3.5,
//       "rating_text": "Good",
//       "cost": 450,
//       "contact_number": "122345352465",
//       "mealTypes": [
//         {
//           "mealtype_id": 1,
//           "mealtype_name": "Breakfast"
//         },
//         {
//           "mealtype_id": 3,
//           "mealtype_name": "Dinner"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 1,
//           "cuisine_name": "North Indian"
//         },
//         {
//           "cuisine_id": 5,
//           "cuisine_name": "Street Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/reviews_photos/ec1/33873687c26d9719713d71f0712faec1_1532256472.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/bb2/460e82b7be8f808ef09655f5b7edbbb2_1516122671.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/ff4/8ea6f51aebe1cad803c293574f0afff4_1453703271.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/baa/30e9afd319d48c1122e7c19228287baa_1517462886.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 3,
//       "restaurant_name": "Food Adda",
//       "location_id": 12,
//       "state_id": 2,
//       "address": "Borivali West, Mumbai",
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/chains/1/18453961/af81c42413a2fbbacd66eaf72175eb01.jpg",
//       "average_rating": 5,
//       "rating_text": "Excellent",
//       "cost": 1020,
//       "contact_number": "467564",
//       "mealTypes": [
//         {
//           "mealtype_id": 2,
//           "mealtype_name": "Lunch"
//         },
//         {
//           "mealtype_id": 3,
//           "mealtype_name": "Dinner"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 3,
//           "cuisine_name": "Chinese"
//         },
//         {
//           "cuisine_id": 4,
//           "cuisine_name": "FastFood"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/reviews_photos/583/b9e413027d9bd6957e4d55362ef64583_1519082913.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/0a7/dd15e424e1cb78233c142193140e50a7_1519082904.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/9c2/95611b1fcc87c70eb5e4cf76bc38d9c2_1519082898.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 4,
//       "restaurant_name": "The Appetite Momos",
//       "location_id": 11,
//       "state_id": 2,
//       "address": "Kasarvadavli, Thane West, Thane, Mumbai",
//       "restaurnat_thumb": "https://b.zmtcdn.com/data/pictures/chains/7/48607/d37a3f6dcaa58dcd563400d084607875.jpg",
//       "average_rating": 4.5,
//       "rating_text": "Very Good",
//       "cost": 2100,
//       "contact_number": "3496508401",
//       "mealTypes": [
//         {
//           "mealtype_id": 4,
//           "mealtype_name": "Snacks"
//         },
//         {
//           "mealtype_id": 5,
//           "mealtype_name": "Drinks"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 1,
//           "cuisine_name": "North Indain"
//         },
//         {
//           "cuisine_id": 3,
//           "cuisine_name": "Chinese"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/9/18812749/6d8902db42fcf423f86d353efcfca597.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/2cb/64ffe4cd75031be1aa1cf792337d02cb_1589042698.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/aa0/68eaaf502c40123e316ab06881e9faa0_1550157457.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/f43/86a268598427ffe4f454644d75f58f43_1576856039.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 5,
//       "restaurant_name": "Empire Restaurant",
//       "location_id": 9,
//       "state_id": 3,
//       "address": "Rajajinagar, Bangalore-430006, Bangalore",
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/7/55397/fb83f44f6bbbdd08809b95f8fb6bdb98.jpg",
//       "average_rating": 4.5,
//       "rating_text": "Very Good",
//       "cost": 780,
//       "contact_number": "8731537554",
//       "mealTypes": [
//         {
//           "mealtype_id": 1,
//           "mealtype_name": "Breakfast"
//         },
//         {
//           "mealtype_id": 4,
//           "mealtype_name": "Snacks"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 2,
//           "cuisine_name": "South Indian"
//         },
//         {
//           "cuisine_id": 4,
//           "cuisine_name": "Fast Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/chains/1/50471/c9c94a1affb4a0be24a3fc91f285da6d.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/1/50471/3f7d0fcb37310b70701adc93fba7bb96.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/f9f/9c43149e2a9f08dff0f841f0feff8f9f_1545821012.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 6,
//       "restaurant_name": "Captain Sam's",
//       "location_id": 13,
//       "state_id": 4,
//       "address": "Sector 40, Chandigarh",
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/chains/6/120976/517f929243a8a987437661453a5b45e0_featured_v2.jpg",
//       "average_rating": 4,
//       "rating_text": "Very Good",
//       "cost": 810,
//       "contact_number": "1233766534",
//       "mealTypes": [
//         {
//           "mealtype_id": 5,
//           "mealtype_name": "Drinks"
//         },
//         {
//           "mealtype_id": 6,
//           "mealtype_name": "Nightlife"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 1,
//           "cuisine_name": "North Indian"
//         },
//         {
//           "cuisine_id": 4,
//           "cuisine_name": "Fast Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/chains/6/120976/988740e98ef37c3402ca776d15081e9c.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/565/c43191825167cb908aaf5a65c4bef565_1581854119.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/9f7/2c2681c51d5cf0d7f5df86ac321189f7_1584209412.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 7,
//       "restaurant_name": "AMA Cafe",
//       "location_id": 14,
//       "state_id": 1,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/4/307374/b2b03be3aba61b0f173aa23e1abdb42b.jpg",
//       "average_rating": 3.2,
//       "rating_text": "Average",
//       "cost": 450,
//       "contact_number": 9674573343,
//       "address": "House 6, New Colony, Majnu ka Tilla, New Delhi",
//       "mealTypes": [
//         {
//           "mealtype_id": 2,
//           "mealtype_name": "Lunch"
//         },
//         {
//           "mealtype_id": 6,
//           "mealtype_name": "Nightlife"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 1,
//           "cuisine_name": "North Indian"
//         },
//         {
//           "cuisine_id": 3,
//           "cuisine_name": "Chinese"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/reviews_photos/51b/7b7779a74b0ac806ac690da9cb55d51b_1560845012.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/4/307374/419ad47809c87816496b526cde26e780.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 8,
//       "restaurant_name": "Street Foods By Punjab Grill",
//       "location_id": 3,
//       "state_id": 1,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/3/18545893/37a4a121653b4c5e1b32000dc2357462.jpg",
//       "average_rating": 5,
//       "rating_text": "Excellent",
//       "cost": 200,
//       "address": "Pacific Mall, Tagore Garden, New Delhi",
//       "mealTypes": [
//         {
//           "mealtype_id": 3,
//           "mealtype_name": "Dinner"
//         },
//         {
//           "mealtype_id": 1,
//           "mealtype_name": "Breakfast"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 4,
//           "cuisine_name": "Fast Food"
//         },
//         {
//           "cuisine_id": 5,
//           "cuisine_name": "Street Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/chains/9/1599/416315188e74d979d79f83de8588389b.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/9/1599/52cfbe709b5ca95ba69fac0c5a178493.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/9/1599/ceb6b94c68950a317e14860a2b4aef7c.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/9/1599/5df463c1ce26b817ec3ee5133d7eaae9.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 9,
//       "restaurant_name": "A Little Heaven Plate",
//       "location_id": 4,
//       "state_id": 2,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/reviews_photos/f9a/af2c896312788d3b68818b536394ef9a_1630818055.jpg",
//       "average_rating": 5,
//       "rating_text": "Excellent",
//       "cost": 1500,
//       "address": "Bibvewadi, Pune",
//       "mealTypes": [
//         {
//           "mealtype_id": 3,
//           "mealtype_name": "Dinner"
//         },
//         {
//           "mealtype_id": 1,
//           "mealtype_name": "Breakfast"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 4,
//           "cuisine_name": "Fast Food"
//         },
//         {
//           "cuisine_id": 5,
//           "cuisine_name": "Street Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/reviews_photos/627/0c062e9fa65c3620333dae5e2ed29627_1630826184.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/fd6/fea78c402355144374d038ed9360bfd6_1630828942.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/f3b/935fbe053c91c2b56fcb986f9c0eff3b_1630828418.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 10,
//       "restaurant_name": "MEALFUL WRAPS - Meals In A Wrap",
//       "location_id": 5,
//       "state_id": 2,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/chains/7/19329357/036f487b679be2ad46f638784bda4913.jpg",
//       "average_rating": 3.7,
//       "rating_text": "Average",
//       "cost": 1200,
//       "address": "Hadapsar, Pune",
//       "mealTypes": [
//         {
//           "mealtype_id": 4,
//           "mealtype_name": "Snacks"
//         },
//         {
//           "mealtype_id": 5,
//           "mealtype_name": "Drinks"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 4,
//           "cuisine_name": "Fast Food"
//         },
//         {
//           "cuisine_id": 5,
//           "cuisine_name": "Street Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/chains/7/19329357/344ea028f1c2de3dccda32a5417e9699.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/7/19329357/84f473aafb1fe8a64ca29587c755aa4f.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/7/19329357/c4e4b127311d749231cd3c73d797098a.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 11,
//       "restaurant_name": "Burger King",
//       "location_id": 6,
//       "state_id": 2,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/8/6506108/e01ffc3a4d1f4a76e63b3250299f4793.jpg",
//       "average_rating": 3.9,
//       "rating_text": "Average",
//       "cost": 1360,
//       "address": "Kothrud, Pune",
//       "mealTypes": [
//         {
//           "mealtype_id": 3,
//           "mealtype_name": "Dinner"
//         },
//         {
//           "mealtype_id": 6,
//           "mealtype_name": "Nightlife"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 3,
//           "cuisine_name": "Chinese"
//         },
//         {
//           "cuisine_id": 5,
//           "cuisine_name": "Street Food"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/chains/8/6506108/87dfce2afb78e9adc22411c5984a43e9.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/8/6506108/ef170422fcdcf0a82ad66fc60c7e406e.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/8/6506108/919e57eb4598bed7e171cb42f9081747.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/8/6506108/ef170422fcdcf0a82ad66fc60c7e406e.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 12,
//       "restaurant_name": "Cafe Wink",
//       "location_id": 7,
//       "state_id": 1,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/chains/4/7224/aa0ac89fbd0b0172d713207dd62eb5a7_featured_v2.jpg",
//       "average_rating": 4.5,
//       "rating_text": "Very Good",
//       "cost": 920,
//       "address": "Anand Vihar, New Delhi",
//       "mealTypes": [
//         {
//           "mealtype_id": 2,
//           "mealtype_name": "Lunch"
//         },
//         {
//           "mealtype_id": 1,
//           "mealtype_name": "Breakfast"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 1,
//           "cuisine_name": "North Indian"
//         },
//         {
//           "cuisine_id": 2,
//           "cuisine_name": "South Indian"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/4/7224/5ce8222f6a0948793a29b7792237faf0.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/4/7224/6e76378a2fa110cd650a45b8048b74dd.jpg",
//         "https://b.zmtcdn.com/data/pictures/chains/4/7224/56e204ae5e00e13aece45a6e4639c06b.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/9d6/4ceee59351c723c066a096fa707109d6_1453799625.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/fcb/1bf71da0fc96a638d44c0f0039173fcb_1529350814.JPG"
//       ]
//     },
//     {
//       "restaurant_id": 13,
//       "restaurant_name": "Chandni Chowk 2 Bangalore",
//       "location_id": 8,
//       "state_id": 3,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/3/18682913/a34c29604492a3b5e584e1e291c28010.jpg",
//       "average_rating": 2.6,
//       "rating_text": "Poor",
//       "cost": 370,
//       "address": "Jeevan Bhima Nagar, Bangalore",
//       "mealTypes": [
//         {
//           "mealtype_id": 4,
//           "mealtype_name": "Snacks"
//         },
//         {
//           "mealtype_id": 2,
//           "mealtype_name": "Lunch"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 1,
//           "cuisine_name": "North Indian"
//         },
//         {
//           "cuisine_id": 2,
//           "cuisine_name": "South Indian"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/pictures/3/18682913/f5d7ea7e44b440363d617c658ef26675.jpg",
//         "https://b.zmtcdn.com/data/pictures/3/18682913/f5d7ea7e44b440363d617c658ef26675.jpg",
//         "https://b.zmtcdn.com/data/pictures/3/18682913/f5d7ea7e44b440363d617c658ef26675.jpg"
//       ]
//     },
//     {
//       "restaurant_id": 14,
//       "restaurant_name": "New Udupi Grand",
//       "location_id": 10,
//       "state_id": 3,
//       "restaurant_thumb": "https://b.zmtcdn.com/data/pictures/4/18649434/e80c1d631064acf97db05986a85cd8e2.jpg",
//       "average_rating": 5,
//       "rating_text": "Excellent",
//       "cost": 370,
//       "address": "HSR, Bangalore",
//       "mealTypes": [
//         {
//           "mealtype_id": 1,
//           "mealtype_name": "Breakfast"
//         },
//         {
//           "mealtype_id": 4,
//           "mealtype_name": "Drinks"
//         }
//       ],
//       "cuisines": [
//         {
//           "cuisine_id": 3,
//           "cuisine_name": "Chinese"
//         },
//         {
//           "cuisine_id": 2,
//           "cuisine_name": "South Indian"
//         }
//       ],
//       "image_gallery": [
//         "https://b.zmtcdn.com/data/reviews_photos/974/0ff7305d699abeb5790bd29e3a80b974_1556103404.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/d33/a6d441a8a6619b7c3e2a4261d35a6d33_1559392496.jpg",
//         "https://b.zmtcdn.com/data/reviews_photos/c9d/de04206704bc24bf7d4736c7b5dbbc9d_1559392496.jpg"
//       ]
//     }
//   ]
//   const RestaurantMenu = [
//     {
//         "menu_id":1,
//         "menu_name": "Garlic Breadsticks",
//         "description": "Baked to perfection. Your perfect pizza partner! Tastes best with dip",
//         "restaurant_id": 1,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/03b/787727453bd857cff70be6560bfb603b.png",
//         "menu_type": "vegetarian",
//         "menu_price": "99"
//     },
//     {
//         "menu_id":2,
//         "menu_name": "Farmhouse",
//         "description": "Delightful combination of onion, capsicum, tomato & grilled mushroom",
//         "restaurant_id": 1,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/a3d/7ca006ec8907c2ae13fd006cf0853a3d.png",
//         "menu_type": "vegetarian",
//         "menu_price": "229"
//     },
//     {
//         "menu_id":3,
//         "menu_name": "Indi Tandoori Paneer",
//         "description": "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum",
//         "restaurant_id": 1,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/665/febfde767bd3543e6b8d9094f2531665.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "249"
//     },
//     {
//         "menu_id":4,
//         "menu_name": "Chicken Pepperoni Stuffed Garlic Bread",
//         "description": "Freshly Baked Garlic Bread stuffed with Delectable Chicken Pepperoni, Cheese and sprinkled with Basil Parsley",
//         "restaurant_id": 1,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/17f/731e22c58e4b9571db474c7099b1817f.png",
//         "menu_type": "non-vegetarian",
//         "menu_price": "159"
//     },
//     {
//         "menu_id":5,
//         "menu_name": "Creamy Tomato Pasta Pizza - Non Veg",
//         "description": "Loaded with a delicious creamy tomato pasta topping, BBQ pepper chicken, green capsicum, crunchy red and yellow bell peppers.",
//         "restaurant_id": 1,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/b1f/b33c5c010ef9458bdf571b044553cb1f.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "229"
//     },
//     {
//         "menu_id":6,
//         "menu_name": "Aloo Pyaz Paratha",
//         "description": "Breakfast Special-with Amul Butter & Pickle [A combination that brings you a chatpata treat to satisfy your palette].",
//         "restaurant_id": 2,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/575/0239edbf30eabd638a98f99df1c8c575.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "75"
//     },
//     {
//         "menu_id":7,
//         "menu_name": "Rajma Chawal",
//         "description": "Breakfast Special-Indian style Rajma with Basmati rice served with salad,chutney & pickle.",
//         "restaurant_id": 2,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/818/a1c4c36eaaba50c706acd2c13b5df818.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "100"
//     },
//     {
//         "menu_id":8,
//         "menu_name": "Gobi Paratha",
//         "description": "Breakfast ",
//         "restaurant_id": 2,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/d8e/42bd4f8ec4bebec1c65ecc301e292d8e.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "80"
//     },
//     {
//         "menu_id":9,
//         "menu_name": "Special chai",
//         "description": "Breakfast with special Chai",
//         "restaurant_id": 2,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/4ab/633fe34500f0dd4f00f4685422cf84ab.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "20"
//     },
//     {
//         "menu_id":10,
//         "menu_name": "Kadhi Chawal",
//         "description": "Indian style Kadhi with Basmati rice served with salad,chutney & pickle.",
//         "restaurant_id": 2,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/21e/ce47c7d7c43d153d3e8d98f83279b21e.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "100"
//     },
//     {
//         "menu_id":11,
//         "menu_name": "Melting Cheese Pannini Sandwich",
//         "description": "Cheese Burst Loaded with Cheese and loads of veggies prepared with special love the speciality dish of Food Adda",
//         "restaurant_id": 3,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/0c3/3a7e030599f84cf5704f2f1ddc7d30c3.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "259"
//     },
//     {
//         "menu_id":12,
//         "menu_name": "Pinky Pink Pasta",
//         "description": "Penne Pasta tossed in Our fusion Pink sauce along with juicy capsicum babycorn & Corn",
//         "restaurant_id": 3,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/a75/283b5f16a275bcd4b74fb755ab71da75.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "259"
//     },
//     {
//         "menu_id":13,
//         "menu_name": "Big Burger Pizza",
//         "description": "Food Addas Most Famous Pizza giving you a treat of 7 sauces cheese Mix veggies burger patty nacho and loads of cheese",
//         "restaurant_id": 3,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/098/9f8dfb95efa7a7211dde74ecf65cc098.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "349"
//     },
//     {
//         "menu_id":14,
//         "menu_name": "Pahadi Tadka Grilled Sandwich",
//         "description": "Onion cabbage capsicum tomato mashed paneer and fusion of 3 pahadi flavour chutneys topped with cheese for perfect taste",
//         "restaurant_id": 3,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/e1d/c71459a34e72a938438f0467c841fe1d.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "169"
//     },
//     {
//         "menu_id":15,
//         "menu_name": "Open Cheese Chilly",
//         "description": "Open Bread baked with Chillies Capsicum Onion n Cheese",
//         "restaurant_id": 3,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/951/00379e553c8a9e7fd6b45a2d5c590951.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "99"
//     },
//     {
//         "menu_id":16,
//         "menu_name": "Steamed Simply Chicken",
//         "description": "Chicken stuffed in simply marination and steamed",
//         "restaurant_id": 4,
//         "menu_image": "https://b.zmtcdn.com/data/reviews_photos/2cb/64ffe4cd75031be1aa1cf792337d02cb_1589042698.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "95"
//     },
//     {
//         "menu_id":17,
//         "menu_name": "Crispy Fried Chilly Cheese Veg",
//         "description": "FULLY LOADED STUFFING OF CHEESE WITH SOME CHILLY FLAKES & CRISP FRIED. THE BEST SELLER",
//         "restaurant_id": 4,
//         "menu_image": "https://b.zmtcdn.com/data/pictures/chains/7/48607/717716760de9b0debbb6086129aa0ce0.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "100"
//     },
//     {
//         "menu_id":18,
//         "menu_name": "Crispy Fried Chilly Cheese Chicken",
//         "description": "MARINATED CHICKEN WITH FULLY LOADED CHEESE AND CHILLY FLAKES TO ADD SOME SPICY FLAVORS & DEEP FRIED  ",
//         "restaurant_id": 4,
//         "menu_image": "https://b.zmtcdn.com/data/reviews_photos/aa0/68eaaf502c40123e316ab06881e9faa0_1550157457.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "100"
//     },
//     {
//         "menu_id":19,
//         "menu_name": "Steamed Chicken Achari",
//         "description": "CHICKEN MARINATED IN SPICY & TANGY FLAVOR IN INDIAN ACHARI STYLE",
//         "restaurant_id": 4,
//         "menu_image": "https://b.zmtcdn.com/data/reviews_photos/e20/798789ca8c7537b4805a5c850c6dce20_1563567127.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "95"
//     },
//     {
//         "menu_id":20,
//         "menu_name": "Veg Fried Rice",
//         "description": "Indo chinese rice with cabbage,beans and carrot",
//         "restaurant_id": 5,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/d07/fc409c80b33c04359e2c478efaf0ad07.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "135"
//     },
//     {
//         "menu_id":21,
//         "menu_name": "Egg Fried Rice",
//         "description": "Indo chinese rice with egg",
//         "restaurant_id": 5,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/10b/ea861a6b68b2c1fd3acdf5d15dbc110b.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "145"
//     },
//     {
//         "menu_id":22,
//         "menu_name": "Chicken Fried Rice",
//         "description": "Indo chinese rice with chicken",
//         "restaurant_id": 5,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/709/cd30a018a31e9ab7ac6ff59d9a257709.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "155"
//     },
//     {
//         "menu_id":23,
//         "menu_name": "Empire Butter Parotta",
//         "description": "Traditional Porota with butter",
//         "restaurant_id": 5,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/1c2/ba3bd20a058c36dac83860b8796bd1c2.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "50"
//     },
//     {
//         "menu_id":24,
//         "menu_name": "Onion Parotta",
//         "description": "Onion Stuffed Paratha",
//         "restaurant_id": 5,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/bda/e1a923742c73790dce1f89a26c26dbda.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "55"
//     },
//     {
//         "menu_id":25,
//         "menu_name": "Egg Parotta",
//         "description": "Egg Layered with traditional Porota",
//         "restaurant_id": 5,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/ddc/67a195b1f94abb3c9b680989498f2ddc.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "89"
//     },
//     {
//         "menu_id":26,
//         "menu_name": "Hawaiian Ecstasy Pizza - Large (12')",
//         "description": "Paneer,Pineapple,Capsicum,Chilly and Cheese",
//         "restaurant_id": 6,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/341/f09436f4e12eeab19c748e69c385d341.png",
//         "menu_type": "vegetarian",
//         "menu_price": "169"
//     },
//     {
//         "menu_id":27,
//         "menu_name": "Large Classic Cheesy Pizza With Tandoori Paneer",
//         "description": "All time Favorite Large Pizza with assorted Toppings and Paneer Cubes",
//         "restaurant_id": 6,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/34d/7ab40b39dd655da9c68e52ed5388a34d.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "169"
//     },
//     {
//         "menu_id":28,
//         "menu_name": "Veggie Delight Pizza - Medium (9')",
//         "description": "Onion,Capsicum,Mushroom,Tomato,Olives and Cheese",
//         "restaurant_id": 6,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/447/1be98d6bbee331ae7827514f30686447.png",
//         "menu_type": "vegetarian",
//         "menu_price": "139"
//     },
//     {
//         "menu_id":29,
//         "menu_name": "Red Indian Pizza - Large (12')",
//         "description": "Hungarian Pepper,Onion,Capsicum,Paneer and Cheese",
//         "restaurant_id": 6,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/8ea/5298eb9874c44688c522714e701058ea.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "169"
//     },
//     {
//         "menu_id":30,
//         "menu_name": "Farm Fresh Pizza - Large (12')",
//         "description": "Spinach,Onion ,Tomato and Cheese",
//         "restaurant_id": 7,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/ab0/8dc8997a6acd169c117468954f1a4ab0.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "169"
//     },
//     {
//         "menu_id":31,
//         "menu_name": "Mushroom Alfredo(Non-Veg)",
//         "description": "Penne/Spaghetti Pasta in classic creamy cheese sauce with mushroom.",
//         "restaurant_id": 7,
//         "menu_image": "https://b.zmtcdn.com/data/reviews_photos/ab3/647ed88d8add7b74527a3ff81e962ab3_1536153670.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "319"
//     },
//     {
//         "menu_id":32,
//         "menu_name": "The Juicy Chicken Burger",
//         "description": "Served with fries",
//         "restaurant_id": 7,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/ecd/d0892dbbbe428d45bcc626c41badcecd.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "200"
//     },
//     {
//         "menu_id":33,
//         "menu_name": "Dharamkot's Cheesy Mushroom Zucchini Sandwich",
//         "description": "With cocktail dip and in toasted focaccia bread.",
//         "restaurant_id": 7,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/167/dcab664d62035f35153938c47b3d3167.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "240"
//     },
//     {
//         "menu_id":34,
//         "menu_name": "All American BBQ Chicken Sandwich",
//         "description": "With arizona dip and in toasted focaccia bread.",
//         "restaurant_id": 7,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/c6b/483977dd38433dfb3b28d50808765c6b.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "275"
//     },
//     {
//         "menu_id":35,
//         "menu_name": "Sikkim Hot Dalle Pasta(Veg)",
//         "description": "Penne/Spaghetti Pasta in a super spicy dalle khursani infused arrabbiata sauce. It's HOT! #AmaChallenge #AmaSignature",
//         "restaurant_id": 7,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/45c/06b67a0158694053fc1af61aa574545c.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "290"
//     },
//     {
//         "menu_id":36,
//         "menu_name": "Chole Bhature",
//         "description": "Punjabi style spicy chickpeas served with soft wheat flour bread Bhature",
//         "restaurant_id": 8,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/c3d/0f7c9242099d35bca990bcb08617cc3d.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "179"
//     },
//     {
//         "menu_id":37,
//         "menu_name": "Chicken Tandoori",
//         "description": "Tender chicken on the bone marinated with tandoori masala and ginger garlic paste",
//         "restaurant_id": 8,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/fef/fdd9d36b8edaf46e88db689ea30eafef.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "329"
//     },
//     {
//         "menu_id":38,
//         "menu_name": "Dum Chicken Biryani",
//         "description": "Traditional slow cooked, flavorsome chicken layered with long grain basmati rice, served with Raita",
//         "restaurant_id": 8,
//         "menu_image": "https://b.zmtcdn.com/data/pictures/chains/9/1599/a9da9f420de272365ae40824b677ba21.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "329"
//     },
//     {
//         "menu_id":39,
//         "menu_name": "Bhalla Papdi Chaat",
//         "description": "Street Style Chat Papdi served with soft and spongy Bhalla served with sweet curd and chutneys",
//         "restaurant_id": 8,
//         "menu_image": "https://b.zmtcdn.com/data/reviews_photos/f8a/9910402080383b1b1a8fdca1584daf8a_1549917335.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "139"
//     },
//     {
//         "menu_id":40,
//         "menu_name": "Sweet Lassi",
//         "description": "Curd gets wisk with sugar",
//         "restaurant_id": 8,
//         "menu_image": "https://b.zmtcdn.com/data/reviews_photos/921/36ad3e93784f97fda5908d7dd92a9921_1508677751.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "109"
//     },{
//         "menu_id":41,
//         "menu_name": "Banoffee [1 Cup]",
//         "description": "A classic British dessert with a biscuit crust, a toffee or dulce de leche filling, sliced bananas, and a top layer of whipped cream.",
//         "restaurant_id": 9,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/3b9/67ca74b43bb8d03adc9b4d5be1e183b9.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "75"
//     },
//     {
//         "menu_id":42,
//         "menu_name": "Chocolate Nutella Cupcake",
//         "description": "Fill the centers of the cupcakes with Nutella, then pipe the Nutella frosting onto the cupcakes.",
//         "restaurant_id": 9,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/258/a05068e6470f56141acf93e81b9d8258.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "85"
//     },
//     {
//         "menu_id":43,
//         "menu_name": "Roasted Almond Chocolate Pastry Cup",
//         "description": "roasted almond cookie cup with seriously dark Italian chocolate.",
//         "restaurant_id": 9,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/5a9/eea8202cc2646fc340d0395bbd0f65a9.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "145"
//     },
//     {
//         "menu_id":44,
//         "menu_name": "Opium Pastry Cup",
//         "description": "Classic genuine filled with chocolate cream",
//         "restaurant_id": 9,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/898/b3e5c9925636511285686e8080514898.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "140"
//     },
//     {
//         "menu_id":45,
//         "menu_name": "Red Velvet Cupcake",
//         "description": "Red velvet cupcakes will taste like cream cheese frosting with a slightly chocolatey cupcake base.",
//         "restaurant_id": 9,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/fc1/616261a54c12519fce698ff322974fc1.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "75"
//     },
//     {
//         "menu_id":46,
//         "menu_name": "American BBQ-Cheese Chicken",
//         "description": "Juicy pieces of barbeque chicken with exotic veggies. Oozing with a layer of cheese, this wrap is a must-have for every party.",
//         "restaurant_id": 10,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/812/168757b5fb61035fe4ea4dff935bb812.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "219"
//     },
//     {
//         "menu_id":47,
//         "menu_name": "Peri Peri Smoky Paneer Tikka",
//         "description": "Soft chunks of paneer infused with peri peri sauce, and grilled perfectly. This zingy starter is a pack of flavours!",
//         "restaurant_id": 10,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/9bd/a2b6f43a8d49a2e200a4df9b26cc89bd.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "169"
//     },
//     {
//         "menu_id":48,
//         "menu_name": "Italian Pizza-Cheese Chicken",
//         "description": "A wrap that will give you pizza feels! Roasted chicken, olives, jalapenos in a savoury pizza sauce & cheese. Your favourite pizza toppings, now in a wrap!",
//         "restaurant_id": 10,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/b09/cba7f00b9448462c983cfbeb5cfb8b09.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "199"
//     },
//     {
//         "menu_id":49,
//         "menu_name": "Bring-it-on BBQ Chicken",
//         "description": "Super soft chicken pieces with smokey barbeque sauce. This anytime-starter is an all-time fave!",
//         "restaurant_id": 10,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/e97/73430a48ff2c3eee2364d8f8b220ae97.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "189"
//     },
//     {
//         "menu_id":50,
//         "menu_name": "Choco Volcano",
//         "description": "Sinful blast of molten chocolate lava in every bite. The quintessential dessert that'll blow your mind.",
//         "restaurant_id": 10,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/cc7/55b553ec8a7e610e358d45dea0422cc7.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "79"
//     },
//     {
//         "menu_id":51,
//         "menu_name": "King Fries",
//         "description": "The perfect crispy partner.",
//         "restaurant_id": 11,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/2dc/7d31d7425ab6de31e2e92806561352dc.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "99"
//     },{
//         "menu_id":52,
//         "menu_name": "Cheese Melt Down Burger",
//         "description": "Cheese oozing spicy veg patty, veggies and creamy sauce. An indulgent treat from our King's Collection!",
//         "restaurant_id": 11,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/5a9/10759d3aaa3f99219c916c9efd9195a9.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "169"
//     },
//     {
//         "menu_id":53,
//         "menu_name": "Crispy Chicken Burger",
//         "description": "Our best-selling burger with crispy chicken patty, fresh onion and our signature sauce.",
//         "restaurant_id": 11,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/e6b/251f04208ee79ba396b192d87a7abe6b.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "80"
//     },
//     {
//         "menu_id":54,
//         "menu_name": "Crispy Veg Combo",
//         "description": "Our best-selling burger with crispy veg patty, fresh onion and our signature sauce. Comes with Fries + Exclusive Pepsi.",
//         "restaurant_id": 11,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/135/b2a0cc85a53134ba273cc30efdb00135.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "209.14"
//     },
//     {
//         "menu_id":55,
//         "menu_name": "Veg Crunchy Volcano",
//         "description": "Be ready for a crunchy, saucy, explosion. A crunchy volcano shell filled with beans & veg mix, chef's secret sauce, fresh onion & crisp lettuce.",
//         "restaurant_id": 11,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/af9/b871732b39c98fc8f26f9044c1afeaf9.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "60"
//     },
//     {
//         "menu_id":56,
//         "menu_name": "Cream Mushroom Pasta",
//         "description": "Served with herb garlic toast. Flavourful blend of Italian herbs and bechamel and Parmesan cheese in crunchy sauteed mushrooms.",
//         "restaurant_id": 12,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/bc6/7e32e9359a342ab0ff16144750689bc6.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "335"
//     },
//     {
//         "menu_id":57,
//         "menu_name": "Paneer Tikka Sandwich",
//         "description": "Served with potato chips. Fresh cottage cheese cubes with green capsicum and onions marinated in spicy tikka sauce.",
//         "restaurant_id": 12,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/b1f/a9bf008b440e754c981747a6752feb1f.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "235"
//     },
//     {
//         "menu_id":58,
//         "menu_name": "Coffee Frappe",
//         "description": "A smooth blend of coffee, milk and gelato.",
//         "restaurant_id": 12,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/5f7/6a7f76f41dda047eb30dbc003f4e95f7.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "185"
//     },
//     {
//         "menu_id":59,
//         "menu_name": "Cheese Omelette",
//         "description": "Omelette Filled with cheese",
//         "restaurant_id": 12,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/359/b5f48db2ce7c7f3672701bf6847e5359.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "265"
//     },
//     {
//         "menu_id":60,
//         "menu_name": "Spaghetti Bolognese Pasta",
//         "description": "Served with herb garlic toast. Minced chicken prepared in flavorful red wine sauce tossed with roasted garlic served with spaghetti.",
//         "restaurant_id": 12 ,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/dad/de9dd1744194f08d159f4734c56c1dad.jpg",
//         "menu_type": "non-vegetarian",
//         "menu_price": "425"
//     },
//     {
//         "menu_id":61,
//         "menu_name": "Grilled Malai Chaap",
//         "description": "Marinated soya chaap in fresh garlic cream, soft and juicy.",
//         "restaurant_id": 13,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/ee9/223949a94fb3cbeebd5db5cc0a7a4ee9.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "219"
//     },
//     {
//         "menu_id":62,
//         "menu_name": "Aloo Mutter Gravy Jeera Rice Bowl",
//         "description": "Delicious gravy served with jeera rice in a bowl.",
//         "restaurant_id": 13,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/1fe/952e528db42a04d6833c15dec4c0f1fe.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "209"
//     },
//     {
//         "menu_id":63,
//         "menu_name": "Jeera Rice",
//         "description": "Jeera rice or zeera rice is an Indian dish consisting of rice and cumin seeds. It is a popular dish in North India as an everyday rice dish.",
//         "restaurant_id": 13,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/38a/ce8b387cd48d5244358abf896dc3538a.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "114.45"
//     },
//     {
//         "menu_id":64,
//         "menu_name": "Poha",
//         "description": "Flattened rice fried with onions,chilli,potato etc.",
//         "restaurant_id": 13,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/f14/95e6d9bad9deceff67f14fcac24a1f14.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "72.45"
//     },
//     {
//         "menu_id":65,
//         "menu_name": "Grilled Aachari Chaap",
//         "description": "Marinated soya chaap with Indian aachari flavor.",
//         "restaurant_id": 13,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/2be/299a14e3129d374e74d6fb3a0100e2be.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "219"
//     },
//     {
//         "menu_id":66,
//         "menu_name": "Carrot Halwa",
//         "description": "grated carrots in a pot containing a specific amount of water, milk and sugar, cardamom and then cooking while stirring regularly.",
//         "restaurant_id": 14,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/2e8/c4494d10535a8c36007e32b018c1c2e8.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "50"
//     },
//     {
//         "menu_id":67,
//         "menu_name": "Onion Rava Masala Dosa",
//         "description": "made with semolina, cumin, ginger, coriander leaves and green chilies.",
//         "restaurant_id": 14,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/d12/b02c41f4e11d43bb345865a35f505d12.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "100"
//     },
//      {
//         "menu_id":68,
//         "menu_name": "Paper Plain Dosa",
//         "description": "made with semolina, cumin, ginger, coriander leaves and green chilies.",
//         "restaurant_id": 14,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/ce8/1d5acfa248f6244bcf518f1c89d2dce8.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "90"
//     },
//     {
//         "menu_id":69,
//         "menu_name": "Poori Sagu [3 Pieces]",
//         "description": "Serve Poori with Sagu",
//         "restaurant_id": 14,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/542/6ab4d40d01abbe154433155ef4c6b542.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "60"
//     },
//     {
//         "menu_id":70,
//         "menu_name": "Idli [2 Pieces]",
//         "description": "Idli serves with coconut chutney and sambhar in a bowl",
//         "restaurant_id": 14,
//         "menu_image": "https://b.zmtcdn.com/data/dish_photos/dcb/437e7ba47d0fe7c78971ac916b01cdcb.jpg",
//         "menu_type": "vegetarian",
//         "menu_price": "40"
//     }

// ]


MongoClient.connect( MONGO_URL, (err , client)  =>
{

  console.log("Mongo is connected");
 
  if (err)
   console.log("Error while connecting");

 
 db = client.db("Restaurant-app");

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});







app.get("/", (req, res) => {
    res.send("Hello everyone!!!!🥳🥳😉😉😉");
  });

//api restaurant details on Object id

app.get("/details/:id" ,(req,res)=>
  {
    let id =mongo.ObjectId(req.params.id);
 
  

  
    db.collection("RestaurantData").find({_id:id}).toArray((err,result) =>
    {
      if(err)
      throw err;
      res.send(result);

    });

  });

  
//api restaurant details on Restaurant id
app.get("/detailsrestaurantid/:restaurantid" ,(req,res)=>
{
  let restaurantid =Number(req.params.restaurantid);




  db.collection("RestaurantData").find({restaurant_id : restaurantid}).toArray((err,result) =>
  {
    if(err)
    throw err;
    res.send(result);

  });

});


    // location endpoint
//     app.get("/location/:location_id", (req, res)  => {
//       const { location_id } = req.params;
      
// console.log(req.params);

// db.collection("location").find((dt)=> dt.location_id == location_id).toArray((err,result)=>
//   {
//     res.send(result )
//   } );
// if(err)
// throw err;
// console.lod(err);
//     });
    
  //  restaurant endpoint
    app.get("/RestaurantData", (req, res)  => 
    {
     
      let query ={}
      let stateId = Number(req.query.stateId);
      let mealId =Number(req.query.mealId);
      if(stateId &&mealId )
{
  query = { state_id : stateId,"mealTypes.mealtype_id" : mealId };
}

else if(stateId)
{
  query = {state_id : stateId };
}
else if(mealId)
{
query ={"mealTypes.mealtype_id" : mealId }
}
else
{
  query ={}

}
  

db.collection("RestaurantData").find(query).toArray((err,result)=>
  {
    res.send(result )
  } );

    });
    
  
// mealtype endpoint

  // app.get("/MealType/:mealtype_id", (req, res)  => {
 
  //   let mealtype_id = (req.params.mealtype_id);
  //   console.log(mealtype_id);
  //   db.collection("MealType").find((dt)=>dt.mealtype_id == mealtype_id).toArray((err,result)=>
  //   {
  //     if(err) throw err;
  //     res.send(result);
  
  //   })
  // });
  
  // app.get("/MealType", (req, res)  => {
  //   db.collection("MealType").find().toArray((err,result)=>
  //   {
  //     if(err) throw err;
  //     res.send(result);
  
  //   })
  
  // });

// location endpoint

app.get("/location", (req, res)  => {
// let key =req.header('x-auth-key');
  // if(authkey==key)
  // {

  db.collection("location").find().toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);

  })
// }
// else{
//   res.send("Unauthorized user");
// }

});

//api end point for mealid and cuisine
app.get("/cuisine/:mealId",(req,res)=>
{
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId)
  let lcost = Number(req.query.lcost);
  let hcost =Number(req.query.hcost);
  let query ={}
  //sorting
  let sort = {cost :1};
  if(req.query.sort)
  {
    sort ={cost :req.query.sort};
  }
 if(lcost && hcost && cuisineId)
 {
query ={"mealTypes.mealtype_id" : mealId, $and: [{ cost : {$gt : lcost, $lt : hcost}}],
"cuisines.cuisine_id" : cuisineId }
 }

else if(lcost && hcost)
{
  query ={"mealTypes.mealtype_id" : mealId, $and: [{ cost : {$gt : lcost, $lt : hcost}}]}
}
  else if(cuisineId)
  {
query ={"mealTypes.mealtype_id" : mealId,
"cuisines.cuisine_id" : cuisineId }  
  }
  else{
    query = {"mealTypes.mealtype_id" : mealId}
  }
  db.collection("RestaurantData").find(query).sort(sort).toArray((err,result) =>
  {
    if(err)
    throw err;
    res.send(result)
  });
})



app.get("/MealType",(req,res)=>{



  db.collection("MealType").find().toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);
  
  });


})



//restaurant menu endpoint based on menuid

app.get("/RestaurantMenu/:menuid", (req, res)  => {

let menuid= Number(req.params.menuid);

if(menuid)
{
  db.collection("RestaurantMenu").find( {restaurant_id : menuid}).toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);

  })
  
}


});

app.get("/Menu", (req, res)  => {

  db.collection("RestaurantMenu").find( ).toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);

  })
  

});




app.get("/RestaurantData", (req, res)  => 
{

  

  db.collection("RestaurantData").find().toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);

  })


 
});



app.get("/filter", (req, res) =>{


  // const query = {};
  var { address } = req.query;

 

  // console.log(Address);
 console.log(address);
db.collection("RestaurantData").find( { address: { $regex: address, $options: "i" } }).toArray((err,result)=>
  {
    res.send(result )
  } )

});
 



app.get("/Orders", (req, res)  => 
{
let email =req.query.email;
let query={}
if(email)
{
  query ={email}
}

  

  db.collection("Orders").find(query).toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);

  })


 
});



app.delete("/deleteOrders/:id", (req, res)  => 
{

let oid = mongo.ObjectId(req.params.id);


  

  db.collection("Orders").deleteOne({ _id : oid }, (err,result) =>
  {
    if(err) throw err;
    res.send("Order deleted");
console.log(result);
  });


 
});
//Place Order
app.post("/placeOrder",(req,res)=>
{
  console.log(req.body);

  db.collection("Orders").insertOne(req.body,(err,result)=>
  {
    if(err) throw err;
    res.send("success")
  })
})
app.put("/updateOrder/:id",(req,res)=>
{

  let oid = mongo.ObjectId(req.params.id);
  console.log(req.body);

  db.collection("Orders").updateOne({ _id : oid },{$set:{
    status:req.body.status,
    bank_name:req.body.bank_name,
    date:req.body.date,
  }},(err,result)=>
  {
    if(err) throw err;
    res.send("Order Updated")
  })
})

//Menu details(selected items)
