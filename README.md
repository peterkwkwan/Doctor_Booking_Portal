# necktie-appointment-portal

## Project setup

```
npm install
```

OR

```
yarn add
```

### Compiles and hot-reloads for development

```
npm run serve
```

OR

```
yarn serve
```

### Compiles and minifies for production

```
npm run build
```

OR

```
yarn build
```

### HOSTED SITE URL ON NETLIFY:

[Necktie-Doctor-Booking-Portal](https://necktie-doctor-booking-portal.netlify.app/)

###User requirements

- [ ] Users can see a doctor's profile
- [ ] Users can see a doctor's availability
- [ ] Doctors may have different opening days & hours (e.g. rest on Wednesday, opens from 9 am to 5 pm on other weekdays); inapplicable time slots will be rejected for booking

####Booking consists of the following elements:

- [ ] ID of the doctor to be visited
- [ ] a time slot (assuming one hour each)
- [ ] patient's name

####API requirements

- [ ] Users cannot book any time in the past.
- [ ] Users can only book time slots in line with doctor's opening hours.

###Packages used

- Axios
  - For easier handling of API requests
  - e.g. `axios.spread` for simultaneous response data handling
- Vuetify
  - Beautiful, ready-to-use components for faster development time when building from scratch
- Day.js / vue-dayjs
  - Lightweight DateTime management for Javascript
  - Better alternative for smaller projects as opposed to heavier libraries such as Luxon
- Vue
  - I have never used this framework before so I was curious to see how it compares to React & Angular :)

###Potential Improvements

- Testing
  - This will be critical if the app scales in size or new members join in to grow the project
  - Will help spot bugs ahead of time, such as broken APIs or outdated logic
- Create global color/font variables
  - Instead of hard-coding the colors and other CSS properties, we can look into creating global variables to be re-used across the app, reducing the number of human errors/typos
- DateTime response from API

  - It was quite frustrating working with the DateTime of the BE response due to the separated hours and date in the response object. Instead of having a `number` signifying the hour within the `start` property, we can attach the hour to the date.

  ```
  {
  . . .
  "start": 9,
  "date": "2022-04-13",
  }

  ```

  can become:

  ```
  {
  . . .
  "dateTime": "2022-04-13 09:00:00",
  }

  ```

This will make DateTime parsing easier for both BE and FE developers

- Assets/Images
  - We can minify assets further (especially icons) to reduce bundle size

###Production Considerations

- FeatureFlags
  - Once the app scales, we may hide certain features behind a feature flag depending on the environment (dev, uat, staging, etc.)
  - We need to make sure the appropriate features are turned off for production if not ready
- If deploying FE code, make sure BE side is successfully deployed first
  - If we deploy FE first before BE, and there are BE changes to API or response/request body, this will break the FE side as BE isn't ready!
- Always do post-deployment check
  - There maybe certain features or bugs that are only reproducable in certain environments, due to security differences, sloppy code, or various factors
- Always have a rollback plan
  - If there are any breaking changes, we can opt-out of deployment and rollback to a previous version/commit

###User Journey

1. User selects "Book appointment" with their preferred doctor
2. User selects date and time corresponding with the doctor's availability
3. User enters name and clicks "Book"
4. User will receive a prompt snackbar message indicator whether the booking was successful

[![](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-1.png)](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-1.png 'Step 1')

> Step 1

[![](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-2.png)](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-2.png 'Step 2')

> Step 2

[![](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-3.png)](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-3.png 'Step 3')

> Step 3

[![](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-4.png)](https://gitlab.com/peterkwkwan/necktie-doctor-booking-portal/-/raw/master/src/assets/readme/step-4.png 'Step 4')

> Step 4

```

```
