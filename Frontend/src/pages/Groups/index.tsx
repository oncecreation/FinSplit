import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Loading } from "components";
import Button from "components/Button";
import GroupContext from "contexts/GroupContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
const authorsTableData = [
  {
    img: "/img/team-2.jpeg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: ["Manager", "Organization"],
    online: true,
    date: "23/04/18",
  },
  {
    img: "/img/team-1.jpeg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: ["Programator", "Developer"],
    online: false,
    date: "11/01/19",
  },
  {
    img: "/img/team-4.jpeg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: ["Executive", "Projects"],
    online: true,
    date: "19/09/17",
  },
  {
    img: "/img/team-3.jpeg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: ["Programator", "Developer"],
    online: true,
    date: "24/12/08",
  },
  {
    img: "/img/bruce-mars.jpeg",
    name: "Bruce Mars",
    email: "bruce@creative-tim.com",
    job: ["Manager", "Executive"],
    online: false,
    date: "04/10/21",
  },
  {
    img: "/img/team-2.jpeg",
    name: "Alexander",
    email: "alexander@creative-tim.com",
    job: ["Programator", "Developer"],
    online: false,
    date: "14/09/20",
  },
];




const Groups = () => {
  const { groupList } = useContext(GroupContext);

  return (
    <div>
      <div className="p-5 ml-10">
            <nav className="sm:hidden" aria-label="Back">
              <Link
                to="/"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <ChevronLeftIcon
                  className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Back
              </Link>
            </nav>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div className="flex">
                    <Link
                      to="/"
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Home
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Groups
                    </p>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
      <div className="relative  h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      
      {/* Page Heading */}
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
          Your Groups
          </Typography>
        </CardHeader>
        <div className="mt-4 absolute top-0 right-8 hidden rounded-xl flex-shrink-0 md:mt-0 md:ml-4 md:flex">
              <Link to="/addgroup">
                <Button type="danger" leftIcon={<PlusCircleIcon className="w-5" />}>
                  Add Group
                </Button>
              </Link>
            </div>
        <div className="mt-0 flex flex-1 flex-col justify-end px-4 sm:px-6 lg:mx-auto lg:px-8 xl:w-full">
          
          <div className="mt-2 flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
               
              </h2>
            </div>
           
            <div className="flex flex-shrink-0 md:mt-0 md:ml-4 md:hidden">
              <Link to="/addgroup">
                <Button>
                  <PlusCircleIcon className="w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full  table-auto">
              <thead>
                <tr>
                  {["Name", "Description", "Members", "Total Expenses", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              {groupList ? (
                groupList.length > 0 ? (
                  <tbody>
                    {groupList.map(
                      (group) => {
                        const className = `py-3 px-5`;

                        return (
                          <tr key={group.name}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {group.name}
                                    {console.log(group)}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {group.description}
                              </Typography>

                            </td>
                            <td className={className}>
                              <Chip
                                variant="gradient"
                                color={group.members ? "green" : "blue-gray"}
                                value={group.members ? group.members.length : 0}
                                className="py-0.5 px-2 text-[11px] font-medium"
                              />
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {group.totalExpenses}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600"
                              >
                                <Link to={`/group/detail/${group._id}`}>
                                  <Button
                                    type="link"
                                    rightIcon={
                                      <ChevronRightIcon className="w-5" />
                                    }
                                  >
                                    Open{" "}
                                  </Button>
                                </Link>
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                )
                  : (
                    <div className="mt-10 flex h-52 w-full flex-col items-center justify-center border-2 border-dashed">
                      <UserGroupIcon className="w-10 stroke-1" />
                      <p className="mt-1 w-full text-center text-xl font-semibold sm:text-3xl">
                        No Groups
                      </p>
                      <p className="text-md mt-2 text-gray-600 sm:text-lg">
                        Add group to split the bills
                      </p>
                    </div>
                  )
              )
                : (<Loading />)
              }

            </table>

          </CardBody>



{/* 
          {groupList ? (
            groupList.length > 0 ? (
              <div className="mt-12 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded border-b border-gray-200 shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                            >
                              Description
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                            >
                              Members
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                            >
                              Total Expenses
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {groupList.map((group) => (
                            <tr key={group._id}>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                {group.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {group.description}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {group.members?.length}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {group?.totalExpenses}
                              </td>

                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                <Link to={`/group/detail/${group._id}`}>
                                  <Button
                                    type="link"
                                    rightIcon={
                                      <ChevronRightIcon className="w-5" />
                                    }
                                  >
                                    Open{" "}
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-10 flex h-52 w-full flex-col items-center justify-center border-2 border-dashed">
                <UserGroupIcon className="w-10 stroke-1" />
                <p className="mt-1 w-full text-center text-xl font-semibold sm:text-3xl">
                  No Groups
                </p>
                <p className="text-md mt-2 text-gray-600 sm:text-lg">
                  Add group to split the bills
                </p>
              </div>
            )
          ) : (
            <Loading />
          )} */}
        </div>
      </Card>
    </div>
  );
};

export default Groups;
