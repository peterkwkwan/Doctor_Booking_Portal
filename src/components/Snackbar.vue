<template>
  <v-snackbar v-model="open" :timeout="timeout" elevation="12">
    {{ snackbarText }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'DoctorAddressDetails',
  data() {
    return {
      open: false,
      timeout: 5000,
    };
  },
  props: ['snackbarText', 'openSnackbar'],
  watch: {
    openSnackbar: {
      handler() {
        this.open = this.openSnackbar;
      },
    },
  },
};
</script>
