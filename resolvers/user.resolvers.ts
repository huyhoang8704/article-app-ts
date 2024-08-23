import User from "../models/user.model";
import * as generate from "../helpers/generate";

export const userResolvers = {
    Mutation : {
        registerUser : async (_,args) => {
            const { user } = args;
            // console.log(user);
            const existEmail = await User.findOne({
                email : user.email,
                deleted : false
            })
            if(existEmail) {
                return {
                    code : 400,
                    message : "Email đã tồn tại!"
                }
            } else {
                user.token = generate.generateRandomString(30);
                const newUser = new User(user);
                const data = newUser.save();
                return {
                    code: 200,
                    message: "Đăng ký tài khoản thành công!",
                    fullName : newUser.fullName,
                    email : newUser.email,
                    token : newUser.token
                  };
            }
        }
    },
    
}


/**
 * register
 * mutation {
    registerUser(user : {
        fullname : "HuyHoang",
        email : "hoang@gmail.com",
        password : "123"
    }) , {
        id
        fullname
        email
        token
    }
}

 */