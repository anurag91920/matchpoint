
const profiles = [
  {
    name: "Priya",
    age: 23,
    city: "Delhi",
    college: "Delhi University",
    bio: "Love travelling, music and coffee.",
    interests: ["Travel", "Music", "Coffee"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    likedCurrentUser: true
  },
  {
    name: "Aarav",
    age: 24,
    city: "Noida",
    college: "Amity University",
    bio: "Developer by day, explorer by weekend.",
    interests: ["Coding", "Travel", "Movies"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    likedCurrentUser: false
  },
  {
    name: "Sneha",
    age: 22,
    city: "Lucknow",
    college: "Lucknow University",
    bio: "Books, sunsets and good conversations.",
    interests: ["Books", "Nature", "Art"],
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    likedCurrentUser: true
  },
  {
    name: "Rahul",
    age: 25,
    city: "Gurugram",
    college: "IIT Delhi",
    bio: "Fitness enthusiast and foodie.",
    interests: ["Fitness", "Food", "Sports"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    likedCurrentUser: false
  },
  {
    name: "Ananya",
    age: 23,
    city: "Noida",
    college: "Sharda University",
    bio: "Creative soul who loves photography.",
    interests: ["Photography", "Music", "Travel"],
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800",
    likedCurrentUser: true
  },
  {
    name: "Rohan",
    age: 24,
    city: "Delhi",
    college: "Delhi University",
    bio: "Coffee lover and tech enthusiast.",
    interests: ["Technology", "Coffee", "Gaming"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    likedCurrentUser: false
  },
  {
    name: "Ishita",
    age: 22,
    city: "Jaipur",
    college: "Rajasthan University",
    bio: "Art, colours and creative adventures.",
    interests: ["Art", "Fashion", "Travel"],
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    likedCurrentUser: false
  },
  {
    name: "Kabir",
    age: 26,
    city: "Mumbai",
    college: "Mumbai University",
    bio: "Music is my favourite language.",
    interests: ["Music", "Guitar", "Movies"],
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800",
    likedCurrentUser: true
  },
  {
    name: "Meera",
    age: 23,
    city: "Pune",
    college: "Pune University",
    bio: "Nature lover and weekend explorer.",
    interests: ["Nature", "Hiking", "Books"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    likedCurrentUser: false
  },
  {
    name: "Aditya",
    age: 24,
    city: "Bengaluru",
    college: "Christ University",
    bio: "Building apps and chasing dreams.",
    interests: ["Coding", "Startups", "Fitness"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800",
    likedCurrentUser: false
  },
  {
    name: "Kavya",
    age: 22,
    city: "Chandigarh",
    college: "Panjab University",
    bio: "Dancing through life.",
    interests: ["Dance", "Music", "Food"],
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800",
    likedCurrentUser: true
  },
  {
    name: "Arjun",
    age: 25,
    city: "Hyderabad",
    college: "Osmania University",
    bio: "Sports, fitness and good vibes.",
    interests: ["Cricket", "Fitness", "Travel"],
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800",
    likedCurrentUser: false
  },
  {
    name: "Riya",
    age: 23,
    city: "Kolkata",
    college: "Jadavpur University",
    bio: "A little poetry and a lot of coffee.",
    interests: ["Poetry", "Books", "Coffee"],
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800",
    likedCurrentUser: false
  },
  {
    name: "Dev",
    age: 24,
    city: "Indore",
    college: "IIT Indore",
    bio: "Tech geek with a love for travel.",
    interests: ["Technology", "Travel", "Movies"],
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800",
    likedCurrentUser: true
  },
  {
    name: "Simran",
    age: 22,
    city: "Amritsar",
    college: "GNDU",
    bio: "Foodie and photography enthusiast.",
    interests: ["Food", "Photography", "Art"],
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800",
    likedCurrentUser: false
  },
  {
    name: "Karan",
    age: 26,
    city: "Noida",
    college: "Amity University",
    bio: "Startup enthusiast and traveller.",
    interests: ["Startups", "Business", "Travel"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    likedCurrentUser: false
  },
  {
    name: "Nisha",
    age: 23,
    city: "Bhopal",
    college: "Barkatullah University",
    bio: "Books, coffee and quiet places.",
    interests: ["Books", "Coffee", "Nature"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    likedCurrentUser: true
  },
  {
    name: "Vikram",
    age: 25,
    city: "Chennai",
    college: "Anna University",
    bio: "Movie buff and fitness lover.",
    interests: ["Movies", "Fitness", "Gaming"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    likedCurrentUser: false
  },
  {
    name: "Tanya",
    age: 22,
    city: "Gurugram",
    college: "MDU",
    bio: "Fashion, art and new adventures.",
    interests: ["Fashion", "Art", "Travel"],
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    likedCurrentUser: false
  },
  {
    name: "Manav",
    age: 24,
    city: "Ahmedabad",
    college: "Gujarat University",
    bio: "Entrepreneurship and football.",
    interests: ["Business", "Football", "Music"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    likedCurrentUser: true
  },
  {
    name: "Pooja",
    age: 23,
    city: "Lucknow",
    college: "BBAU",
    bio: "Exploring new cafes and places.",
    interests: ["Food", "Travel", "Photography"],
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800",
    likedCurrentUser: false
  },
  {
    name: "Siddharth",
    age: 25,
    city: "Delhi",
    college: "DTU",
    bio: "Engineer who loves adventure.",
    interests: ["Coding", "Adventure", "Sports"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800",
    likedCurrentUser: false
  },
  {
    name: "Aisha",
    age: 22,
    city: "Mumbai",
    college: "Mumbai University",
    bio: "Dancing, travelling and dreaming.",
    interests: ["Dance", "Travel", "Music"],
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    likedCurrentUser: true
  },
  {
    name: "Yash",
    age: 24,
    city: "Jaipur",
    college: "JECRC University",
    bio: "Gaming and technology lover.",
    interests: ["Gaming", "Technology", "Movies"],
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800",
    likedCurrentUser: false
  },
  {
    name: "Diya",
    age: 23,
    city: "Pune",
    college: "Symbiosis",
    bio: "Artist who loves sunsets.",
    interests: ["Art", "Painting", "Nature"],
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800",
    likedCurrentUser: false
  },
  {
    name: "Aryan",
    age: 25,
    city: "Bengaluru",
    college: "RV College",
    bio: "Developer and football fan.",
    interests: ["Coding", "Football", "Coffee"],
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800",
    likedCurrentUser: true
  },
  {
    name: "Mahi",
    age: 22,
    city: "Varanasi",
    college: "BHU",
    bio: "Culture, books and travel.",
    interests: ["Culture", "Books", "Travel"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    likedCurrentUser: false
  },
  {
    name: "Rishabh",
    age: 24,
    city: "Noida",
    college: "Galgotias University",
    bio: "Fitness and photography.",
    interests: ["Fitness", "Photography", "Music"],
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800",
    likedCurrentUser: false
  },
  {
    name: "Sana",
    age: 23,
    city: "Hyderabad",
    college: "University of Hyderabad",
    bio: "Food, friends and fun.",
    interests: ["Food", "Movies", "Travel"],
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800",
    likedCurrentUser: true
  },
  {
    name: "Om",
    age: 25,
    city: "Nagpur",
    college: "VNIT",
    bio: "Science and technology enthusiast.",
    interests: ["Science", "Coding", "Reading"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    likedCurrentUser: false
  }
];

export default profiles;
