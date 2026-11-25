# Assignment 3 - Setup and Testing

## 1. Install dependencies

Open a terminal in the main `MyPortfolio` folder:

```bash
npm install
```

Then install the frontend packages:

```bash
cd client
npm install
cd ..
```

## 2. Configure MongoDB

Create a file named `.env` in the main `MyPortfolio` folder. Use `.env.example` as a guide:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_this_with_a_long_random_secret
```

Use your own MongoDB Atlas connection string. Do not upload `.env` to GitHub or include it in the submitted ZIP.

## 3. Create the Admin account

From the main project folder, run:

```bash
npm run seed:admin
```

Assignment Admin login:

- Email: `admin@portfolio.com`
- Password: `Admin123!`

This script creates the Admin account in MongoDB. If the account already exists, it sets that account's role to `admin`.

These are coursework credentials. Change the password before using this project outside the assignment.

## 4. Add the original portfolio records

Run:

```bash
npm run seed:portfolio
```

This adds the three existing project cards and two existing education entries if those collections are empty. It does not add duplicates when records already exist.

## 5. Start the application

From the main project folder:

```bash
npm run dev
```

Open the Vite address shown in the terminal, normally:

`http://localhost:5173`

The backend runs on port `5000`. Vite forwards `/api` and `/auth` requests to the backend.

## 6. Test the assignment features

1. Sign in with the Admin credentials.
2. Open Projects. Add, edit, and delete a project.
3. Open Education. Add, edit, and delete an education record.
4. Open Contact. Submit a message and confirm that it appears in the Admin contact messages.
5. Sign out.
6. Create a normal account using Signup.
7. Sign in as the normal user.
8. Confirm that Projects and Education can be viewed but the Admin forms and edit/delete controls are not shown.
9. Confirm that the normal user cannot perform Admin-only API operations.

## 7. Submission

Before creating the assignment ZIP:

- Keep source files, package files, public images, and the resume.
- Exclude `node_modules`, `.git`, and `.env`.
- Submit a ZIP file, not a RAR file.
- Include your GitHub repository link and the Word document with the screenshots required by the assignment.
