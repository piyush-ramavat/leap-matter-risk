# leap-matter-risk

A simple NodeJs and ReactJS project to use AI for risk assessment.

This project offers user to interact with AI via chat prompt and manage their results

## Getting Started

This is a mono repo containing code and scripts for both Backend and Frontend.

<b>Following are the pre-requisites to run the project locally </b>

- Postgres with database created for leap-matter-risk. (Required Schema and tables with seed data will be done by npm script)
- NodeJs `v20.10.0` or higher
- Npm `v10.2.3` or higher
- Duplicate `.env.sample` and rename it to `.env`
- Set the values for all ENV variables
- then run following commands

Install dependencies:

```bash
npm install:all
```

This will install all the dependencies required to run Backend as well as Frontend

Create database schema, tables and seed the data:

```bash
npm run db:setup
```

To run:

```bash
npm dev
```

This will start a tsc compiler and dev server.

For production build:

```bash
npm build
npm start
```

Please refer to respective `package.json` files for backend and frontend scripts and run commands.

### Check whether service and APIs are up and running

Open [http://localhost:3000/health-check](http://localhost:3000/health-check) with your browser to see the result. <br/>
