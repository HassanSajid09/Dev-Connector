👨‍💻 Dev Connector

Dev Connector is a full-stack social media application for developers, built with React, TypeScript, Express, and MongoDB. It allows devs to connect, share experiences, create profiles, and interact through posts and comments — all secured with authentication and protected routes.

✨ Features

👤 User Profiles

Create and update your profile

Add education & work experiences

Delete entries whenever needed

📝 Posts & Comments

Create posts and share ideas with the community

Comment on posts to engage in discussions

Delete your own posts or comments

🔍 Community

Browse other developers’ profiles

View their education, experience, and posts

Connect through shared ideas

🔐 Authentication & Security

JWT-based login & signup

Fully protected routes for profile and post management

🛠️ Tech Stack

Frontend: React, TypeScript, Context API / React Query

Backend: Express.js, Node.js

Database: MongoDB (Mongoose ODM)

Auth: JSON Web Tokens (JWT), bcrypt

Other: REST APIs, Protected Routes

📷 Demo

<img width="1919" height="927" alt="image" src="https://github.com/user-attachments/assets/9403b68d-cdc4-484c-9ef1-32f954fa82ce" />
<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/c35c1adf-7c8b-4531-b399-3431bc9de825" />
<img width="1919" height="925" alt="image" src="https://github.com/user-attachments/assets/c0fcf44d-8d29-49e1-a354-b75c806cd63f" />
<img width="1919" height="931" alt="image" src="https://github.com/user-attachments/assets/b33f8ff9-1be0-41b1-96f6-7ba6fab2c91c" />
<img width="1919" height="925" alt="image" src="https://github.com/user-attachments/assets/5fbdec89-7431-4e47-ad54-bc9e8a549cea" />

⚙️ Installation

Clone the repository:

git clone https://github.com/your-username/dev-connector.git
cd dev-connector


Install dependencies for client & server:

cd client && npm install
cd ../server && npm install


Add a .env file inside server/ with:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key


Start the development servers:

# FrontEnd
cd FrontEnd && npm run dev

# BackEnd
cd BackEnd && npm run dev

🔮 Future Improvements

🖼️ Profile avatars and cover photos

🔔 Real-time notifications (WebSockets)

🤝 Contributing

Contributions, issues, and feature requests are welcome. Open a PR to suggest improvements.
