import axios from 'axios';

const apiKey = 'fd22fc78-ec08-4a23-81e2-01775df8e13a';
const config = { 'x-api-key': apiKey };

const makeBooking = async (jsonData) => {
  let response = null;
  await axios
    .post('https://fe-assignment-api.herokuapp.com/booking', jsonData, {
      headers: config,
    })
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      response = error;
    });
  return response;
};

const fetchDoctorsAndBookings = async () => {
  const data = {
    doctors: null,
    bookings: null,
  };

  let endpoints = ['https://fe-assignment-api.herokuapp.com/doctor', 'https://fe-assignment-api.herokuapp.com/booking'];
  await axios.all(endpoints.map((endpoint) => axios.get(endpoint, { headers: config }))).then(
    axios.spread(({ data: doctors }, { data: bookings }) => {
      data.doctors = doctors;
      data.bookings = bookings;
    }),
  );

  return data;
};

export { makeBooking, fetchDoctorsAndBookings };
