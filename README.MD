Deployment
==========

1. Change database credentials in Config file .
2. Upload the otrium.sql to the database.
3. Install dependencies: "npm install".
4. Migrate database columns : "NODE_ENV=dev npx sequelize-cli db:migrate"
5. Run the project: "nodemon bin/www"
6: If you want to change the localhost port, go to bin/www file and change the port.
7. Refer the postman collection
    https://documenter.getpostman.com/view/14116812/Tz5v2aLG