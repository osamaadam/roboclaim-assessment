# Roboclaim Assessment

This is made as part of roboclaim's fullstack engineer assessment. This project allows the user to upload CSV, PDF, or XLXS files and it's extract the text content of the files and display it in the browser.

To create a user, just write any email and password on the signin page. If the user doesn't exist, it will be created. If the user exists, it will be logged in (assuming the password is correct of course). This is done because I was too lazy to create a registration page.

## Installation

To run this project, either figure it out yourself or download Docker and run the following command:

```bash
docker-compose --profile prod up -d
```

## Usage

Go to `http://localhost:3000`, you'll be prompted to sign in. Just write any email and password and you'll be signed in. After that, you can upload files and see the text content of the files at `http://localhost:3000/files`.

To view insights about the uploaded files, go to `http://localhost:3000/insights` (didn't have time to add pretty graphs).

## Features

### Implemented Features

- Asynchronous file processing (using queues)
- User authentication
- User authorization (although not used)
- File upload
  - CSV
  - PDF
  - XLSX
- Docker setup

### Missing Features

- Tests
- Image file support
- Pretty graphs
- API documentation (Swagger)
