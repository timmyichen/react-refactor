import {
  Box,
  Center,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { User } from "./types/User";
import Table, { TableProps } from "./Table";

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      if (data) setUsers(data);
    }
    getUsers();
  }, []);

  const tableHeadings: TableProps['headings'] = [
    'Image',
    'Name',
    'Email',
    'Followers',
  ];

  const tableRows: TableProps['rows'] = users.map(user => {
    return {
      key: user.id,
      cells: [
        { type: 'image', src: user.avatarUrl },
        { type: 'text', text: user.username, style: { textTransform: 'capitalize'} },
        { type: 'text', text: user.email, href: `mailto:${user.email}` },
        { type: 'text', text: user.followers.length },
      ]
    }
  })

  return (
    <>
      <Center>
        <Box p={4} width="640px">
          <Heading>Users</Heading>
        </Box>
      </Center>

      <Center>
        <Box width="640px">
          <Table headings={tableHeadings} rows={tableRows} />
        </Box>
      </Center>
    </>
  );
}

export default Users;
