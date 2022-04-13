<template>
  <v-container class="container">
    <v-row v-if="!loading">
      <v-col v-for="doctor in doctors" v-bind:key="doctor.id">
        <v-card class="doctor-card">
          <v-img height="200" src="@/assets/doctor.jpg"></v-img>
          <div>
            <v-card-title>{{ doctor.name }}</v-card-title>
            <v-card-subtitle>
              {{ doctor.address.district }}
            </v-card-subtitle>
          </div>
          <BookAppointment :bookings="bookings" :doctor="doctor" />
        </v-card>
      </v-col>
    </v-row>

    <v-progress-circular v-else indeterminate color="orange"></v-progress-circular>
  </v-container>
</template>

<script>
import BookAppointment from '../components/BookAppointment.vue';
import { fetchDoctorsAndBookings } from '../api/api.js';

export default {
  name: 'DoctorsList',
  components: { BookAppointment },

  provide() {
    return {
      bookings: this.bookings,
      doctors: this.doctors,
    };
  },
  data() {
    return {
      doctors: null,
      bookings: null,
      loading: true,
    };
  },

  created: function () {
    fetchDoctorsAndBookings().then((data) => {
      this.doctors = data.doctors;
      this.bookings = data.bookings;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.container {
  height: calc(100% - 201px - 74px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.doctor-card {
  height: 350px;
  width: 300px;
}
</style>
