<template>
  <div>
    <v-card-actions class="book-btn">
      <v-btn color="deep-orange lighten-2 white--text" @click="dialog = true"> Book appointment </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title class="text-h5">{{ doctor.name }} - Book appointment</v-card-title>
        <DoctorAddressDetails v-bind:doctor="doctor" />
        <v-divider class="mt-0 mx-6 mb-4"></v-divider>
        <v-card-text> Kindly select a date and time slot: </v-card-text>

        <v-row class="mx-2">
          <v-col>
            <v-date-picker
              v-model="date"
              :allowed-dates="disablePastDates"
              color="deep-orange  lighten-2"
            ></v-date-picker>
          </v-col>

          <v-col>
            <v-card-text> Times available for {{ this.$dayjs(date).format('MMMM DD, YYYY') }}: </v-card-text>
            <v-chip-group v-model="selection" active-class="deep-orange lighten-2 white--text" column>
              <v-chip v-for="(time, index) in availableTimes" v-bind:key="index" @click="selectTime(time)">
                {{ time.format('hh:mm A') }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <v-row class="mx-2 mt-0">
          <v-col cols="12" sm="12" md="9">
            <v-text-field
              v-model="patientName"
              label="Please enter your name to complete the booking"
              solo
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="pb-6">
          <v-btn
            x-large
            color="deep-orange lighten-2 white--text"
            block
            :disabled="!selectedTime || !patientName"
            @click="handleBooking"
          >
            Book
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbarText="snackbarText" :openSnackbar="openSnackbar" />
  </div>
</template>
<script>
import DoctorAddressDetails from './DoctorAddressDetails.vue';
import Snackbar from './Snackbar.vue';

import { makeBooking } from '../api/api.js';

export default {
  name: 'BookAppointment',
  props: ['doctor', 'bookings'],
  components: { DoctorAddressDetails, Snackbar },
  data() {
    return {
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      availableTimes: [],
      selection: 1,
      selectedTime: undefined,
      patientName: '',
      snackbarText: '',
      openSnackbar: false,
    };
  },

  methods: {
    selectTime(time) {
      this.selectedTime = time;
    },
    disablePastDates(val) {
      return val >= new Date().toISOString().substr(0, 10);
    },
    handleBooking() {
      const jsonData = {
        name: this.patientName,
        date: this.selectedTime.format('YYYY-MM-DD'),
        doctorId: this.doctor.id,
        start: parseInt(this.selectedTime.format('H')),
        status: 'confirmed',
      };

      makeBooking(jsonData).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          this.dialog = false;
          this.snackbarText = `Successfully booked the appointment with ${this.doctor.name}!`;
          this.openSnackbar = true;
        } else {
          this.dialog = false;
          this.snackbarText = `Sorry, something went wrong, please try again or another date / time.`;
          this.openSnackbar = true;
        }
      });
    },
  },
  watch: {
    date: {
      handler() {
        this.availableTimes = [];
        this.selectedTime = undefined;
        this.selection = undefined;
        const getDayOfWeek = (dayIndex) => {
          switch (dayIndex) {
            case 0:
              return 'SUN';
            case 1:
              return 'MON';
            case 2:
              return 'TUE';
            case 3:
              return 'WED';
            case 4:
              return 'THU';
            case 5:
              return 'FRI';
            case 6:
              return 'SAT';
          }
        };
        if (this.doctor.opening_hours[0].isClosed) {
          return;
        }
        const dayOfWeekIndex = this.$dayjs(this.date).day();
        const openHoursForDay = this.doctor.opening_hours.find((item) => item.day === getDayOfWeek(dayOfWeekIndex));

        let startTime = this.$dayjs(this.date).add(openHoursForDay.start, 'hours');
        const endTime = this.$dayjs(this.date).add(openHoursForDay.end, 'hours');

        const currentSelectedDateIsToday = this.$dayjs().isSame(this.date, 'day');
        if (currentSelectedDateIsToday && this.$dayjs().diff(startTime) > 0) {
          const remainder = 30 - (this.$dayjs().minute() % 30);
          startTime = this.$dayjs().add(remainder, 'minutes');
        }

        while (endTime.diff(startTime) >= 0) {
          let conflictedTime = false;
          this.bookings.map((booking) => {
            if (booking.doctorId === this.doctor.id) {
              const bookingDateTime = this.$dayjs(booking.date).add(booking.start, 'hours');
              if (bookingDateTime.isSame(startTime)) {
                conflictedTime = true;
              }
            }
          });
          !conflictedTime && this.availableTimes.push(startTime);

          startTime = startTime.add(30, 'minutes');
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.datepicker {
  width: 100%;
}
</style>
