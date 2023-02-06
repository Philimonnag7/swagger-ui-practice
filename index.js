const express = require('express');
const app = express();
const YAML = require('yamljs');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const swaggerDocumment = YAML.load("./swagger.yaml");
//const swaggerJsdoc = require('swagger-jsdoc');
const PORT = 3000;
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumment));


let courses = [
    {
        id: "11",
        name: "learn Reactjs",
        price: 299
    },
    {
        id: "22",
        name: "learn Angular",
        price: 399
    },
    {
        id: "33",
        name: "learn Django",
        price: 499
    }
]


app.get("/", (req, res) => {
    res.send("Hello from Philimon Nag");
});

app.get("/api/v1/philimon", (req, res) => {
    res.send("Hello from Philimon Nag");
});

app.get("/api/v1/philimon-object", (req, res) => {
    res.send({
        id: "55",
        name: " Java",
        price: 777
        
    });
});
app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
});
app.get("/api/v1/course/:courseId", (req, res) => {
    const singlecourse = courses.find(course => course.id === req.params.courseId);
    res.send(singlecourse);
});

app.post("/api/v1/addCourse",(req, res) => {
    courses.push(req.body);
    res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
    let loction = req.query.location;
    let device = req.query.device;
    res.send({ loction, device });
    
});
app.post("api/v1/courseupload", (req, res) => {
    const file = req.files.file;
    let path = __dirname + "/images/" + Date.now() + ".jpg";
    file.mv(path, (err) => {
        res.send(err?false:true);
    });
})


app.listen(PORT, () => console.log(`God is with me in Port ${PORT}`));