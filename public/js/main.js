const cityname = document.getElementById("cityname");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp_real_val = document.getElementById("temp_real_val");
const dataHide = document.querySelector(".middle_layer");

const getCurrentDay = () => {
  var weekday = new Array(7);

  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thru";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  let currentTime = new Date();
  let days = weekday[currentTime.getDay()];
  let week_day = document.getElementById("day");

  week_day.innerText = days;
};

getCurrentDay();

const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();
  let today_date = document.getElementById("today_date");
  today_date.innerText = `${date} ${month}`;
};

getCurrentTime();

const getinfo = async (event) => {
  event.preventDefault();
  let cityval = cityname.value;
  if (cityval === "") {
    city_name.innerText = "Plz write the name before search";
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=b263738238216de15bf2a40ab09164f5`;

      const response = await fetch(url);
      const data = await response.json();
      const arrdata = [data];
      console.log(arrdata);
      city_name.innerText = `${arrdata[0].name},${arrdata[0].sys.country}`;

      temp_real_val.innerText = arrdata[0].main.temp;

      const tempmode = arrdata[0].weather[0].main;

      if (tempmode === "Clear") {
        temp_status.innerHTML =
          '<i class="fas fa-sun" style="color: #eccc68"></i>';
      } else if (tempmode === "Clouds") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud" style="color: #f1f2f6"></i>';
      } else if (tempmode === "Rain") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud-rain" style="color: #a4b0be"></i>';
      } else {
        temp_status.innerHTML =
          '<i class="fas fa-sun" style="color: #eccc68"></i>';
      }
      dataHide.classList.remove("data_hide");
    } catch (error) {
      city_name.innerText = "Plz enter the city name properly";
      dataHide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getinfo);
