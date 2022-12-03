import { UserGroupIcon, XIcon } from "@heroicons/react/outline";
import Joi from "joi";
import { Breadcrumb, SearchMember } from "components";
import Button from "components/Button";
import FormInput from "components/FormInput";
import { useContext, useState } from "react";
import { authService, groupService } from "services";
import ToastContext from "contexts/ToastContext";
import GroupContext from "contexts/GroupContext";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
 
export type MemberType = {
  name: string;
  email: string;
  id: string;
};

const schema: any = {
  name: Joi.string().required().min(1).max(50).label("Name"),
  description: Joi.string().allow("").label("Description"),
};

const AddGroup = () => {
  const navigate = useNavigate();
  const currentUser: any = authService.getCurrentUser();
  const { fetchGroups } = useContext(GroupContext);
  const [group, setGroup] = useState({
    name: "",
    description: "",
  });
  const [memberList, setMemberList] = useState<MemberType[]>([
    {
      name: currentUser.name,
      email: currentUser.email,
      id: currentUser.id,
    },
  ]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const { showToast } = useContext(ToastContext);

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(group, options);
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

  const doSubmit = async () => {
    try {
      await groupService.addGroup({
        ...group,
        members: memberList.map((member) => member.id),
      });
      showToast("Group added successfully", "success");
      fetchGroups();
      navigate("/groups");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrors({ ...errors });
      }
    }
  };

  const handleChange = ({ currentTarget: input }: any) => {
    setErrors({
      name: "",
      description: "",
    });
    const errorMessage = validateProperty(input);
    // @ts-ignore
    if (errorMessage) errors[input.name] = errorMessage;
    // @ts-ignore
    else delete errors[input.name];

    setGroup({ ...group, [input.name]: input.value });
    setErrors(errors);
  };

  const handleRemoveMember = (id: string) => {
    setMemberList(memberList.filter((member) => member.id !== id));
  };

  return (
    <div className="mt-4 flex h-[calc(100vh-180px)] flex-1 flex-col px-4  sm:px-6 lg:mx-auto lg:px-8 xl:max-w-6xl">
      {/* Page Header */}
      <div className="">
        <Breadcrumb
          paths={[
            { name: "Groups", to: "/groups" },
            { name: "Add Group", to: "/addgroup" },
          ]}
        />
        {/* <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Add Group
            </h2>
          </div>
        </div> */}
      </div>

      <div className="mt-8 flex flex-1 flex-col items-center justify-evenly lg:flex-row lg:justify-between">
        <div className="mt-4 mb-6 w-full max-w-md lg:mb-0 lg:w-3/4">
          {/* <FormInput
            label="Name*"
            name="name"
            type="text"
            placeholder="Enter Group Name"
            onChange={handleChange}
            error={errors ? errors.name : ""}
          /> */}
          <Card className="lg:w-96 w-100">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
        Add Group
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Enter Group Name*" name="name" required size="lg" onChange={handleChange} />
        <Input label="Enter Group Description (Optional)" name="description" onChange={handleChange} size="lg" />
      
      </CardBody>
      <CardFooter className="pt-0 flex flex-col justify-center">
        <Button disabled={validate()} onClick={handleSubmit} >
          Add Group
        </Button>
       
      </CardFooter>
    </Card>
          {/* <FormInput
            label="Description"
            name="description"
            type="text"
            placeholder="Enter Group Description (Optional)"
            onChange={handleChange}
            error={errors ? errors.description : ""}
          /> */}
        </div>
        <Card className="mt-2 bg-transparent p-4 w-full lg:mt-0 lg:w-2/4">
          <CardHeader variant="gradient" color="blue" className="text-xl p-4 text-center font-bold">Add Members</CardHeader>
          <div className="mt-2">
            <SearchMember
              handleAdd={null}
              memberList={memberList}
              setMemberList={setMemberList}
            />
          </div>
          {/* Member List */}
          {/* Empty State */}
          {memberList.length < 1 && (
            <div className="mt-2 rounded border-2 border-dashed p-2 text-center lg:mt-12">
              <div className="flex justify-center">
                <UserGroupIcon className="w-10 stroke-slate-600 stroke-1" />
              </div>
              <h3 className="text mt-2 font-medium text-gray-900">
                No members
              </h3>
              <p className="text mt-1 text-gray-500">
                Add users by searching for them in the search bar above.
              </p>
            </div>
          )}
          {/* END Empty State */}
          {memberList.length > 0 && (
            <h1 className="mt-4">
              <p className="mb-3 font-semibold uppercase text-gray-800">
                Member List
              </p>
              <div className="flex flex-col">
                {memberList.map((member) => (
                  
                  <div
                    key={member.id}
                    className="w-full flex-row justify-around border-b py-3"
                  >
                    <Card className="w-100 flex flex-row justify-between">
    
                      <CardBody className="">
                        <Typography variant="h5" className="mb-2">
                        {member.name}
                        </Typography>
                        <Typography>
                        {member.email}
                        </Typography>
                      </CardBody>
                    {/* <div className="flex-1">
                      <p className="text font-medium text-gray-900">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div> */}
                    <CardBody>
                    <Button
                      type="icon"
                      margin="mr-5"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <XIcon className="w-5 text-red-600" />
                    </Button>
                    </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </h1>
          )}
          {/* END Member List */}
        </Card>
      </div>
      {/* <div className="flex flex-1 items-end justify-center">
        <Button width="w-1/2" disabled={validate()} onClick={handleSubmit}>
          Add Group
        </Button>
      </div> */}
    </div>
  );
};

export default AddGroup;
