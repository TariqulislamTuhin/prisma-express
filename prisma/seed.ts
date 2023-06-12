import { db } from '../src/utils/db.serve'

type User = {
    firstName: string;
    lastName: string;
    email: string;
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

async function seed(): Promise<void> {
    await Promise.all(
        getUsers().map((user: User) => {
            const { firstName, lastName, email } = user;
            return db.user.create({
                data: {
                    firstName,
                    lastName,
                    email
                }
            })
        })
    );
    const user = await db.user.findFirst({
        where: {
            firstName: "Tariqul Islam"
        }
    });

    await Promise.all(
        getBooks().map(book => {
            const { title, isFiction, datePublished } = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: user?.id
                }
            })
        })
    );
}

seed();


/**
 * The function returns an array of user objects with their first name, last name, and email.
 * @returns An array of User objects is being returned. Each User object has properties for firstName,
 * lastName, and email.
 */
function getUsers(): Array<User> {
    return [
        {
            firstName: "Tariqul Islam",
            lastName: "Tuhin",
            email: "tuhincse@mail.com",
        },
        {
            firstName: "REDQ",
            lastName: "Technologies",
            email: "redq@mail.com",
        },
        {
            firstName: "Super",
            lastName: "admin",
            email: "admin@mail.com",
        }
    ]
}

/**
 * The function returns an array of book objects with their title, fiction status, and date published.
 * @returns An array of Book objects with properties for title, isFiction, and datePublished.
 */
function getBooks(): Array<Book> {
    return [
        {
            title: "New Era",
            isFiction: true,
            datePublished: new Date()
        },
        {
            title: "Sapiens",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "Anatomy",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "Up In The Hill",
            isFiction: true,
            datePublished: new Date()
        }
    ];
}

