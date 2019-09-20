# Tictac-App
Technology stack

React.Js + Node.js+ Prisma + Mongodb



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
You can also define the backend api host in the docker-compose file by setting enviornment variable 
[API_URL]
```
docker-compose up or docker-compose up -d
```

### 4.Deploy our data model to Mongodb
```
 cd ./api/src/prisma
```

### 6.Install Prisma locally
We need prisma to deploy the databmodel to the prisma and mongodb.
#### Note Prisma should be up and running at port :4466
```
npm install -g prisma
```


### 5.Run command
```
prisma deploy
```

### 6.Access website on you at port:8080
