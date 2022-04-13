<template>
  <v-card-text>
    <p class="text--primary">Doctor's ID: {{ doctor.id }}<br /></p>
    <div class="text--primary">
      <strong>{{ doctor.address.district }}</strong
      ><br />
      {{ doctor.address.line_1 }}<br />
      {{ doctor.address.line_2 }}
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: 'DoctorAddressDetails',
  props: ['doctor'],
};
</script>
