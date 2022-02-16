# TechTorch Coding Test
TechTorch is based around organizations (companies) and each organization can have multiple users. Users within an organization can have one of the following roles: admin, editor, viewer. Only an organization admin can add new users to that organization, and the role should be selected on user creation.

You need to build an app that mimics the user administration panel for organization admins. These are the funcionalities that the app needs to have:

- Admin users can add new users
- Admin users can remove users
- Non-admin users trying to access the page should be redirected to another dummy page.
- Admin users can only access users within their company
- Users’ data should at least include: email, full name

Here’s a figma design (with some inconsistencies, but conveys the message):

[https://www.figma.com/file/I0axOGgg9HM0pXga06v2vi/Untitled?node-id=0%3A1](https://www.figma.com/file/I0axOGgg9HM0pXga06v2vi/Untitled?node-id=0%3A1)

You should try to copy it as close as possible.

Assumptions:

- No auth system needs to be built. You should identify the current user somehow, but it can be as simple as including the user identifier in the query string.
- Organizations need to exist in the database, but [should be seeded with a script](https://www.prisma.io/docs/guides/database/seed-database).

You are free to use any library and technology you want, but there’s a few constraints:

- Typescript as a language in back-end and front-end
- Prisma as ORM and PostgreSQL as DB. You can use the following project as a simple way to spin up a dockerized postgresql instance: https://github.com/Techtorch/prisma-docker
- React on the front end

We encourage you to use NextJS (because that’s what we use) and have everything in a single repo, but you can split that into API + Client if you’re more comfortable that way. Just make sure you give us an easy way to test it out.

You shouldn’t take more than 3~4 hours to do this exercise. Feel free to leave things out if there’s no time for it, but specify it properly. Use a git repository for this and include it with all commit history to the deliverable.

# Run
```
docker-compose run --rm node yarn install
docker-compose up -d
docker-compose run --rm node npx prisma migrate reset --force
```

Go to http://localhost:3000/user/1

# Debug
Debug mode with prisma studio:
```
docker-compose run --rm -p 5555:5555 node npx prisma studio
```

Go to http://localhost:5555

# Improvements
In order to speed up this development, the use of *sass* or *tailwind* could have been helpful.
