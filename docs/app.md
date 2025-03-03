# ConnectedIn - Chat Application

## Project Overview
ConnectedIn is a sample application demonstrating a chat system with dashboard and settings and user authentication.

## Libraries Used

- **Ant Design** - UI library for React components.
- **Redux** - State management library for managing application state.
- **Axios** - Promise-based HTTP client for making API requests.
- **Recharts** - Charting library for creating interactive charts.
- **React Router** - Routing library for React applications.

## File Structure

```
ConnectedIn/
│-- public/                   # Static files and mock data
│-- src/                      # Source files
│   |-- components/           # List of reusable components
│       |-- charts/           # Charts components for different metrics
│       |-- layout/           # Contains layout components for dashboard
│       |-- Loading/          # Loadind indicators for app and charts
│       |-- RouteProgress/    # Progress bar loading for routes change
│   |-- Context/              # contains AuthContext for user authenticated routes rendering
│   |-- pages/                # Contains all the pages for the app
│   |-- redux/                # Contains the redux store, actions, constants and reducers
│   |-- routes/               # Contains all the routes for the app and protected routes
│   |-- services/             # Contains logic for interacting with the API and returning data
│   |-- typings/              # Contains typescript interfaces
│   |-- utils/                # Contains utility functions
│   |-- App.js                # Main app component
│   |-- main.js               # Entry point for the app
```

## Mock API Routes

### User and Customer Data

- **GET /mock/account.json** - Contains one user account to authenticate with.
- **GET /mock/customers.json** - Contains a list of users, their details and messages.

### Report Data

- **GET /mock/active-users-daily.json** - Contains the data for daily active users in one month.
- **GET /mock/daily-messages.json** - Contains the data for daily messages sent.
- **GET /mock/hourly-active-users.json** - Contains the data for hourly active users in one day.
- **GET /mock/registration.json** - Contains the data for user registration in one month.
- **GET /mock/user-by-age.json** - Contains the data for users by age group.
- **GET /mock/user-by-gender.json** - Contains the data for users by gender.
- **GET /mock/user-by-message.json** - Contains the data for message sent by users.


## How is the Authentication Implemented?

When the user enters the credentials and clicks on the login button, it calls the `login` function in the `AuthContext`, which calls the `login` function in the `services/auth`, that function makes a request to the `/mock/account.json` endpoint to get the user account data. If the user account is found, it returns the user data, and the `login` function in the `AuthContext` sets the user data in the local storage and redux store and redirects the user to the dashboard page.

All the Protected routes like `/dashboard`, `/chats`, `/settings` are wrapped in the `ProtectedRoute` component, which checks if the user is authenticated or not. If the user is authenticated, it renders the component, otherwise, it redirects the user to the login page.

## How is the Dashboard Data is Fetched?

When the user logs in, the `Dashboard` component is rendered, which calls the `useEffect` hook to fetch the data for the dashboard. The `fetchDashboardData` function in the `services/dashboard` makes multiple requests to the mock API endpoints to get the data for the dashboard. Once the data is fetched, it sets the data in the redux store, and the dashboard components like `ActiveUsersChart`, `DailyMessagesChart`, `HourlyActiveUsersChart`, `RegistrationChart`, `UserByAgeChart`, `UserByGenderChart`, `UserByMessageChart` use the data from the redux store to render the charts.

## How Is Redux Setup

Redux is used in this app to maintain app state globally inside the app. Redux uses different things like actions and reducers to interact with the different app states.

- **Actions:** Is passed to dispatch() hook and update the state of the value.
- **Reducer:** The contains the logic of the operation to be performed with the value, either update or read.
- **Constants:** To uniquely identify the redux operation and the states, we use defined constants to avoid any typo errors while performing redux operation.
- **useSelector() hook:** This hook allows reading state of the variable from the redux.
- **ReduxProvider:** Usually the root component is wrapped inside the `ReduxProvider` component, that takes `redux store` as a prop. doing so will makw the redux states accessible inside all the child components using `useSelector()` to read and `useDisptch()` to update.

## App workflow

 - **Login:** User logs in to the system using correct credentials, the credentials are validated by simulating a api call to a server and checking given credentials. If the fiven credentials are correct, then it is saved inn local storage for future validation, and also to the `currentUser` redux state to use it inside any component.
- **Dashboard:** Shows various matrics and reports in suitable charts and graphs. All the data are saved and retrived from the redux state and use same data if available to prevent the unnecessary data fetching.
- **Chat:** Just like a real chat system. Uses redux same thing as dashboard.
- **Settings and Profile:** Demonstrates various input fields and dropdowns to update user profile and settings. The current user data is used as profile data and updated in the redux state.
- **Logout:** Clears the local storage and redux state and redirects to the login page.

## Video Demo

[Watch the videos](https://drive.google.com/drive/folders/1kn77iJpFMcnJuj8ZyDkcVZd497Sr8t8M?usp=sharing)