
function initService() {
  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions({ input: "pizza near Syd" }, displaySuggestions);
}
const displaySuggestions = function (predictions, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
    alert(status);
    return;
  }
  console.log(predictions)
  predictions.forEach((prediction) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(prediction.description));
    document.getElementById("results").appendChild(li);
  });
};

function onChange(event) {
  console.log('chnged', event[0].target.value);
  const service = new google.maps.places.AutocompleteService();
  // service.getPlacePredictions({input: value, location: new google.maps.LatLng(20,  78),radius: 100, types:["address"]}, displaySuggestions);
  service.getQueryPredictions({input: event[0].target.value, componentRestrictions: { country: ["IN"]}}, displaySuggestions);

}

// const debounce = (value) => {
//   console.log(value)
//   let timer;
//    return () => {
//     clearTimeout(timer);
//    timer = setTimeout(() => onChange(value), 1000);
//    }

// }
const debounce = (func, wait) => {
  let timeout;
  return (...params) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onChange(params)
    }, 1000)
  }
}