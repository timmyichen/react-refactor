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

      {/* TODO replace the following block with the <Table /> component you create */}
      {/* <Center>
        <Box width="640px">
          <List>
            <ListItem>
              <Flex alignItems="center" color="gray.600" fontWeight={600}>
                <Box>
                  <Text
                    fontSize={12}
                    px={6}
                    py={3}
                    textTransform="uppercase"
                    width={100}
                  >
                    Image
                  </Text>
                </Box>
                <Box px={6} py={3} flexBasis="100px">
                  <Text fontSize={12} textTransform="uppercase">
                    Name
                  </Text>
                </Box>
                <Box px={6} py={3}>
                  <Text fontSize={12} textTransform="uppercase">
                    Email
                  </Text>
                </Box>
                <Spacer />
                <Box px={6} py={3}>
                  <Text fontSize={12} textTransform="uppercase">
                    Followers
                  </Text>
                </Box>
              </Flex>
            </ListItem>
            {users.map((user, index) => (
              <ListItem key={user.id}>
                <Flex
                  alignItems="center"
                  bg={index % 2 === 0 ? "gray.100" : "white"}
                >
                  <Box px={6} py={4}>
                    <Image src={user.avatarUrl} />
                  </Box>
                  <Box px={6} py={4} flexBasis="100px">
                    <Text fontSize={16} textTransform="capitalize">
                      {user.username}
                    </Text>
                  </Box>
                  <Box px={6} py={4}>
                    <Text fontSize={16}>
                      <Link href={`mailto:${user.email}`}>{user.email}</Link>
                    </Text>
                  </Box>
                  <Spacer />
                  <Box px={6} py={4}>
                    <Text fontSize={16}>{user.followers.length}</Text>
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </Center> */}
    </>
  );
}

export default Users;
