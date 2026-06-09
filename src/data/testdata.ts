// export interface UserCredentials {
//     email: string;
//     password: string;
//     name: string;
// }


export const validUsers = {
    admin: {
        email: 'admin@gmail.com',
        password: '@12345678',
        name: 'Nkosi'
    },

    classUser:{
        email: 'playtest@gmail.com',
        password: '1234567!',
        name: 'Class User'
    },
    student: {
        email: 'kai8@gmail.com',
        password: '@12345678',
        name: 'Kai'
    }
};

export const invalidUsers = {
    invalidUserOne: {
        email: 'invalid@gmail.com',
        password: '@1234'
    }

};

export const enrollmentConfig = {
    courseName: 'My Dummy Course',
    groupName: 'course assignment'
};
