# Tictac-App
Technology stack
[Create React App](https://github.com/facebook/create-react-app).
Node.js
[Prisma.io](https://prisma.io).



To setup this project kindly do the following steps
### 1.Clone the Repo
```
 git clone https://github.com/asimashfaq/Tictac-App 
```

### 2.Build docker images
```
 docker-compose build
```

### 3.Run docker docker
You can also define the backend api host in the docker-compose file by setting enviornment variable API_URL
```
docker-compose up or docker-compose up -d
```

### 4.Deploy our data model to Mongodb
```
 cd ./api/src/prisma
```

### 5.Run command
```
prisma deploy
```

### 6.Access website on you at port:8080