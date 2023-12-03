import bcrypt from 'bcryptjs'

const users=[
    {
    name: 'Admin User',
    email:'admin@email.com',
    passwords: bcrypt.hashSync('123456',10),
    isAdmin: true,
},
{
name: 'Admin User',
email:'admin@email.com',
passwords: bcrypt.hashSync('123456',10),
isAdmin: true,
},
{
name: 'Admin User',
email:'admin@email.com',
passwords: bcrypt.hashSync('123456',10),
isAdmin: true,
},
]
   