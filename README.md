This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Pantry Tracker

Pantry Tracker is a NextJs-based web application that helps you keep track of your pantry items, their expiration dates, and the number of days until they expire. The application uses Firebase Firestore for data storage and retrieval, and Material-UI and Typescript for the user interface components.

## Features

- Add new pantry items with expiration dates.
- View a paginated list of pantry items.
- Search for pantry items by name.
- Delete pantry items.
- Pagination to navigate through the items.
- Displays the number of days until each item expires.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Firebase Firestore**: A NoSQL document database to store pantry items.
- **Material-UI**: A popular React UI framework for designing the user interface.
- **Formik**: A library for building and managing forms in React.
- **Yup**: A JavaScript schema builder for value parsing and validation.
- **Dayjs**: A lightweight JavaScript library for date manipulation.
- **Typescript**: A tool for better tooling at any scale.

## Getting Started

Follow these steps to set up and run the Pantry Tracker application locally.

### Prerequisites

- Node.js and npm installed on your machine.
- A Firebase project with Firestore enabled.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tanwardivya/pantry-tracker.git
   cd pantry-tracker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Firebase**:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project (or use an existing one).
   - Enable Firestore in your Firebase project.
   - Create a `firebaseConfig.js` file in the `src` directory with your Firebase configuration:

     ```javascript
     // src/firebaseConfig.js
     import { initializeApp } from "firebase/app";
     import { getFirestore } from "firebase/firestore";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };

     const app = initializeApp(firebaseConfig);
     const db = getFirestore(app);

     export { db };
     ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

### Adding a Pantry Item

1. Enter the name of the food item in the "Food Item" field.
2. Select the expiration date using the date picker.
3. Click the "Add" button to add the item to the pantry.

### Viewing Pantry Items

- The list of pantry items is displayed in a table.
- Each row shows the food item, expiration date, and the number of days until it expires.

### Searching Pantry Items

- Use the search field to search for pantry items by name.
- The table will update to show only the items that match the search query.

### Deleting a Pantry Item

- Click the delete icon next to a pantry item to remove it from the list.

### Pagination

- Use the pagination controls at the bottom of the table to navigate through the list of pantry items.

## Code Overview

### Components

- **Forms**: The main component that handles the form for adding pantry items, displays the list of items, and includes the search and pagination functionality.

### Functions

- **fetchData**: Fetches pantry items from Firestore and applies pagination.
- **applyPagination**: Applies pagination to the data.
- **calculateDaysToExpire**: Calculates the number of days until an item expires.
- **handleSubmit**: Handles form submission to add a new pantry item.
- **handleDelete**: Handles deletion of a pantry item.
- **handleSearch**: Handles searching for pantry items by name.
- **handlePageChange**: Handles pagination changes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any changes or improvements.

## License

This project is licensed under the MIT License.

