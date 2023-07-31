/* Global Variables */
let d = new Date();
let newDate = d.toDateString();

// URL to retrive weather information 

const baseURL ="https://api.openweathermap.org/data/2.5/weather?zip=";

const apiKey = "&appid=3cecc25ce2ab2519d9000c14b0acb4a5&units=metric";

const server = "http://127.0.0.1:8000";

//show error to user
const error = document.getElementById("error");

//generate data
//get data from user
//post data to server

const generateData = () => {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getweatherData(zip).then((data) => {
        if (data) {
            const {
                main : { temp },
                name: city,
                weather : [{ description}],
            } = data;

            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                description,
                feelings,

            };

            postData(server + "/add", info);

            retrieveData();
            document.getElementById('entry');
        }

    });

};

document.getElementById("generate").addEventListener("click", generateData);
//function GET

const getweatherData = async (zip) => {
    try {
        const res = await fetch(baseURL + zip + apiKey);
        const data = await res.json();
        
        if(data.cod != 200) {
            error.innerHTML = data.message;
            setTimeout(_=> error.innerHTML = '', 2000)
            throw `${data.message}`;
        }
        return data;
    } catch (error) {
        console.log(error);

    }
};

//function POST
const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const newData = await res.json();
        console.log(`you saved`, newData);
        return newData;
    } catch (error){
        console.log(error);
    }
};

//update UI  const updatingUI = async () => {
    const retrieveData = async () =>{
        const res= await fetch('/all');
        try {
        // Transform into JSON
        const allData = await res.json();
        console.log(allData);
    
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('date').innerHTML = allData.newDate;
        document.getElementById('content').innerHTML = allData.feelings;
        document.getElementById("description").innerHTML = allData.description;
        
        }
        catch(error) {
          console.log("error");
        }
    }




