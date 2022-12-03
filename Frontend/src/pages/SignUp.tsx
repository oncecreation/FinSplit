import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
// import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Logo from "../components/Logo";
import { authService, userService } from "services";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
type SignUpDataType = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [data, setData] = useState<SignUpDataType>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignUpDataType>({
    name: "",
    email: "",
    password: "",
  });

  const schema: any = {
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const doSubmit = async () => {
    try {
      const response = await userService.registerUser(data);
      authService.loginWithJwt(response.headers["authorization"]);
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrors({ ...errors, email: error.response.data });
      } else {
        setApiError(error.response.data);
      }
    }
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(data, options);
    if (!error) return null;
    const errors: any = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }: any) => {
    const obj = { [name]: value };
    const Joischema = { [name]: schema[name] };
    const { error } = Joi.object(Joischema).validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (errors) return;
    doSubmit();
  };

  const handleChange = ({ currentTarget: input }: any) => {
    setApiError(null);
    setErrors({
      name: "",
      email: "",
      password: "",
    });
    const errorMessage = validateProperty(input);
    // @ts-ignore
    if (errorMessage) errors[input.name] = errorMessage;
    // @ts-ignore
    else delete errors[input.name];

    setData({ ...data, [input.name]: input.value });
    setErrors(errors);
  };

  useEffect(() => {
    document.title = "SplitBill | SignUp";
  }, []);
  return (
    // <div className="h-full w-full flex justify-center items-center">
    //   <div className="flex flex-col justify-center items-center">
    //     <Logo />
    //     <div className="mt-8">
    //       <h1 className="font-bold text-3xl">Create your account</h1>

    //       <div className="mt-8">
    //         <FormInput
    //           label="Name"
    //           type="text"
    //           placeholder="Enter your name"
    //           name="name"
    //           error={errors ? errors.name : ""}
    //           onChange={handleChange}
    //         />
    //         <FormInput
    //           label="Email"
    //           type="text"
    //           placeholder="Enter your email"
    //           name="email"
    //           error={errors ? errors.email : ""}
    //           onChange={handleChange}
    //         />
    //         <FormInput
    //           label="Password"
    //           type="password"
    //           placeholder="Enter your password"
    //           name="password"
    //           error={errors ? errors.password : ""}
    //           onChange={handleChange}
    //         />

    //         <Button
    //           width="w-full"
    //           margin="mt-6"
    //           onClick={handleSubmit}
    //           disabled={validate() || apiError}
    //         >
    //           Create Account
    //         </Button>
    //       </div>
    //     </div>
    //     <Link to="/signin">
    //       <p className="mt-3 flex">
    //         Already have an account?{" "}
    //         <Button type="link" margin="ml-2">
    //           Sign in
    //         </Button>
    //       </p>
    //     </Link>
    //   </div>
    // </div>
  //   <section className="h-screen">
  //   <div className="px-6 h-full text-gray-800">
  //     <div
  //       className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
  //     >
  //       <div
  //         className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
  //       > <h1 className="font-bold text-center text-3xl">Create your account</h1>
  //         <img
  //           src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
  //           className="w-full"
  //           alt="Sample image"
  //         />
  //       </div>
  //       <div className="xl:ml-20 p-12 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
  //         <form> 
  //         <Logo />
  //           <div className="mb-6">
  //           <FormInput
              
  //             type="text"
  //             placeholder="Enter your name"
  //             name="name"
  //             error={errors ? errors.name : ""}
  //             onChange={handleChange}
  //           />
  //            </div>
  //            <div className="mb-6">
  //             <FormInput
  //               type="text"
              
  //               placeholder="Email address"
  //               name="email"
  //               error={errors ? errors.email : ""}
  //               onChange={handleChange}
  //             />
  
  //             </div>
           
  //           <div className="mb-6">
  //             <FormInput
  //                 name="password"
                  
  //                 type="password"
  //                 placeholder="Password"
  //                 error={errors ? errors.password : ""}
  //                 onChange={handleChange} 
  //             />
  //           </div>
  
  //           <div className="flex justify-between items-center mb-6">
  //             <div className="form-group form-check">
  //               <input
  //                 type="checkbox"
  //                 className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
  //                 id="exampleCheck2"
  //               />
  //               <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
  //                 >Remember me</label>
  //             </div>
  //             <a href="#!" className="text-gray-800">Forgot password?</a>
  //           </div>
  
  //           <div className="text-center lg:text-left">
  //           <Button
  //               width="w-full"
  //               margin="mt-6"
  //               onClick={handleSubmit}
  //               disabled={validate() || apiError}
  //             >
  //                Create Account
  //             </Button>
  //             <Link to="/signin">
  //           <p className="mt-3 flex ">
  //             Already have an account?{" "}
  //             <Button type="link" margin="ml-2">
  //               Login
  //             </Button>
  //           </p>
  //         </Link>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  <>
        <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" name="name" size="lg" onChange={handleChange} />
            <Input type="email" name="email" label="Email" size="lg" onChange={handleChange} />
            <Input type="password" name="password" label="Password" size="lg" onChange={handleChange} />
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth  onClick={handleSubmit}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/SignIn">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
  </>
  );
};

export default SignUp;
