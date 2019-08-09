

// COLLECTIONS

export type Post = {
    uid: string,
    id: string,
    likes: string[],
    comments: number,
    timestamp: number,
    text: string,
    picture: Picture
};


// Users 


export type Picture = {
    uri: string,
    preview: string
};




export type User = {
   uid: string,
   email: string,
   password: string,
   id: string, 
   picture: Picture,
   personalInfomation:{
       firstName: string, 
       lastName: string, 
       gender: string, 
       birthday: Date,
       cityOfBirth: string,
       stateOfBirth: string,
       citizenship: string,
       familyStatus: string
   },
   adress:{
       streetName: string,
       streetNumber: number,
       zipCode: number,
       city: string
   },
   bankAccount:{
       IBAN: string,
       BIC: string
   }
};


export type Company = {
    cid: string, 
    companyName: string
    companyAdress: {
       streetName: string,
       streetNumber: number,
       zipCode: number,
       city: string
    }
    users: [User],

}




// 