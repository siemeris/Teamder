import { set } from "date-fns";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: "",
      auth: false,
      message: null,
      activities: [],
      userActivities: [],
      postedActivities: [],
      markers: [],
      dates: [],
      datesUser: [],
      index: 0,
      users: [],
      currentUser: [],
      currentActivity: [],
      iconCode: "",
      urlIcon: "",
      iconsList: [],
      dateWeather: "",
      tempList: [],
      weather: [],
      temperatura: "",
      activador: false,
    },
    actions: {
      getWeather: async () => {
        await fetch(process.env.BACKEND_URL + "/api/getAllActivities")
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful");
              return resp.json();
            } else {
              console.log(
                "There was an error" + resp.status + " in the request"
              );
            }
          })
          .then((data) => {
            setStore({
              activities: data.result,
            });
            let { activities } = getStore();
            activities.map((value, index) => {
              const url =
                "https://api.openweathermap.org/data/2.5/forecast?appid=74b3467d2c3033271c21502ee8e7ca5e&q=" +
                value.city +
                "&units=metric";
              fetch(url)
                .then((resp) => {
                  if (resp.ok) {
                    console.log("The request was successful");
                    return resp.json();
                  } else {
                    console.log(
                      "There was an error" + resp.status + " in the request"
                    );
                  }
                })
                .then((data) => {
                  //here is were your code should start after the fetch finishes
                  setStore({ weather: data });
                  const { weather } = getStore();
                  // //TEMPERATURA
                  let { tempList } = getStore();
                  // //ICONOS
                  let { iconCode } = getStore();
                  let { iconsList } = getStore();
                  let { urlIcon } = getStore();
                  let { temperatura } = getStore();
                  let { dateWeather } = getStore();
                  dateWeather = value.date;
                  //modificando el date para que tenga formato de api 2022-12-01
                  let [day, month, year] = dateWeather.split("/");
                  dateWeather = year + "-" + month + "-" + day;
                  setStore(dateWeather);

                  for (let i = weather.list.length - 1; i > 0; i--) {
                    if (weather.list[i].dt_txt.includes(dateWeather)) {
                      iconCode = weather.list[i].weather[0].icon;
                      if (iconCode[2] == "n") {
                        iconCode = iconCode.replace("n", "d");
                        console.log(iconCode, "iconCode2");
                      }
                      urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`;
                      setStore(urlIcon);
                      temperatura =
                        Math.round(weather.list[i].main.temp) + "ºC";
                      setStore(temperatura);
                      break;
                    }
                    if (!weather.list[i].dt_txt.includes(dateWeather)) {
                      temperatura = "";
                      urlIcon = `http://openweathermap.org/img/wn/50d.png`;
                    }
                  }
                  tempList.push(temperatura);
                  setStore(tempList);
                  iconsList.push(urlIcon);
                  setStore(iconsList);
                })
                .catch((error) => {
                  //error handling
                  console.error("ERROR:", error);
                });
            });
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      getMarkers: () => {
        let { markers } = getStore();
        const { activities } = getStore();
        if (activities.length > markers.length) {
          activities.map((value, index) => {
            let latitude = parseFloat(value.latitude);
            let longitude = parseFloat(value.longitude);
            let categoria = value.category;
            let fecha = value.date;
            let place = value.location;
            let ide = value.id;
            let hora = value.time;
            let marker = {
              position: {
                lat: latitude,
                lng: longitude,
              },
              label: { color: "white", text: " " },
              draggable: true,
              texto: categoria,
              fecha: fecha,
              lugar: place,
              id: ide,
              time: hora,
            };
            markers.push(marker);
            setStore(markers);
          });
        }
      },
      getActivities: async () => {
        await fetch(process.env.BACKEND_URL + "/api/getAllActivities")
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful");
              return resp.json();
            } else {
              console.log(
                "There was an error " + resp.status + " in the request"
              );
            }
          })
          .then((data) => {
            setStore({
              activities: data.result,
            });
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      getUsers: async () => {
        await fetch(process.env.BACKEND_URL + "/api/getAllUsers")
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful");
              return resp.json();
            } else {
              console.log(
                "There was an error " + resp.status + " in the request"
              );
            }
          })
          .then((data) => {
            setStore({
              users: data.result,
            });
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      getCurrentUser: async () => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/getCurrentUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful");
              return resp.json();
            } else {
              console.log(
                "There was an error " + resp.status + " in the request"
              );
            }
          })
          .then((data) => {
            console.log(data);
            setStore({
              currentUser: data,
            });
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      editUser: async (infoUser) => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/editUser", {
          method: "PUT",
          body: JSON.stringify(infoUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        }).then((resp) => {
          if (resp.ok) {
            console.log("Registration OK");
          }
        });
      },
      login: (infouserpass) => {
        const response = fetch(process.env.BACKEND_URL + "/api/token", {
          //mode: 'no-cors',
          method: "POST",
          body: JSON.stringify(infouserpass),
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            if (!response.ok) {
              alert("Introduce los datos obligatorios");
              throw Error(response.statusText);
            } else {
              setStore({ auth: true });
              const { auth } = getStore();
              console.log("auth1", auth);
              alert("You have successfully logged in!");
            }
            return response.json();
            // Aquí es donde pones lo que quieres hacer con la respuesta.
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
          })
          .catch((error) => {
            alert("Please enter the required data.");
            console.error("ERROR:", error);
          });
      },
      logout: () => {
        const { auth } = getStore();
        localStorage.removeItem("token");
        setStore({ auth: false });
        console.log("auth3", auth);
        alert("You have successfully logged out.");
      },
      signup: async (infouserpassw) => {
        await fetch(process.env.BACKEND_URL + "/api/signup", {
          method: "POST",
          body: JSON.stringify(infouserpassw),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.ok) {
              console.log("Registration OK");
              alert("You have logged in correctly!");
            } else {
              alert("Something went wrong with the sign up,please try again");
              console.log("SignUp wrong");
            }
          })
          .catch((error) => {
            alert("Please enter the required data.");
            console.error("ERROR:", error);
          });
      },
      addActivity: async (infouserpassw) => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/addActivity", {
          method: "POST",
          body: JSON.stringify(infouserpassw),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        }).then((resp) => {
          if (resp.ok) {
            console.log("Registration OK");
            let { index } = getStore();
            index += 1;
            setStore(index);
          } else {
            console.log(resp.status);
          }
        });
      },
      editActivity: async (infoactivity) => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/editActivity", {
          method: "PUT",
          body: JSON.stringify(infoactivity),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        }).then((resp) => {
          if (resp.ok) {
            console.log("EDIT ACTIVITY OK");
          } else {
            console.log(resp.status, "EDIT ACTIVITY WRONG");
          }
        });
      },
      joinActivity: async (index) => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/joinActivity", {
          method: "POST",
          body: JSON.stringify(index),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        }).then((resp) => {
          if (resp.ok) {
            console.log("Registration OK");
            console.log(index, "index");
            alert("You are now logged in!");
          } else {
            console.log(index, "index");
            console.log(resp.status);
            alert("Please sign up or login to continue");
          }
        });
      },
      leaveActivity: async (index) => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/leaveActivity", {
          method: "DELETE",
          body: JSON.stringify(index),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        }).then((resp) => {
          if (resp.ok) {
            console.log("Registration OK");
            console.log(index, "index");
            alert("You are now unlinked:(");
          } else {
            console.log(index, "index");
            console.log(resp.status);
            alert("Something went wrong");
          }
        });
      },
      deleteActivity: async (index) => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/deleteActivity", {
          method: "DELETE",
          body: JSON.stringify(index),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        }).then((resp) => {
          if (resp.ok) {
            console.log("Registration OK");
            console.log(index, "index");
            alert("Activity deleted");
          } else {
            console.log(index, "index");
            console.log(resp.status);
            alert("Something went wrong");
          }
        });
      },
      private: async () => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/privated", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        }).then((res) => {
          if (res.status == 200) {
            console.log("Everything OK with the fetch in private");
            const { auth } = getStore();
            console.log("auth4", auth);
            setStore({ auth: true });
          } else {
            console.log(
              "Something went wrong with the token and require in the private fetch."
            );
          }
        });
      },
      getActivities: async () => {
        fetch(process.env.BACKEND_URL + "/api/getAllActivities")
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful");
              return resp.json();
            } else {
              console.log(
                "There was an error" + resp.status + "in the request"
              );
            }
          })
          .then((data) => {
            setStore({ activities: data.result });
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      getTargetActivities: async () => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/getTargetActivities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful");
              return resp.json();
            } else {
              console.log(
                "There was an error" + resp.status + "in the request"
              );
            }
          })
          .then((data) => {
            setStore({ userActivities: data.Target_Activities });
            let { datesUser } = getStore();
            const { userActivities } = getStore();
            userActivities.map((value, index) => {
              let fecha = value.date;
              const [day, month, year] = fecha.split("/");
              const newDate = new Date(+year, +month - 1, +day);
              // console.log(date, "date antes del push")
              datesUser.push(newDate);
            });
            setStore(datesUser);
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      getPostedActivities: async () => {
        let tok = localStorage.getItem("token");
        await fetch(process.env.BACKEND_URL + "/api/getPostedActivities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tok,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful");
              return resp.json();
            } else {
              console.log(
                "There was an error" + resp.status + "in the request"
              );
            }
          })
          .then((data) => {
            setStore({ postedActivities: data.Posted_Activities });
            let { dates } = getStore();
            const { postedActivities } = getStore();
            postedActivities.map((value, index) => {
              let fecha = value.date;
              const [day, month, year] = fecha.split("/");
              const newDate = new Date(+year, +month - 1, +day);
              // console.log(date, "date antes del push")
              dates.push(newDate);
              setStore(dates);
            });
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      getCurrentActivity: async (index) => {
        let tok = localStorage.getItem("token");
        // let { index } = getStore()
        await fetch(
          process.env.BACKEND_URL + "/api/getCurrentActivity/" + index,
          {
            method: "GET",
            // body: JSON.stringify(index),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tok,
            },
          }
        )
          .then((resp) => {
            if (resp.ok) {
              console.log("The request was successful GetCurrentActivity");
              return resp.json();
            } else {
              console.log(
                "There was an error" + resp.status + "in the request 5555"
              );
            }
          })
          .then((data) => {
            setStore({ currentActivity: data });
          })
          .catch((error) => {
            //error handling
            console.error("ERROR:", error);
          });
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({
            message: data.message,
          });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();
        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        //reset the global store
        setStore({
          demo: demo,
        });
      },
    },
  };
};

export default getState;
