import { 
    Box, Flex, Heading, 
    Button, Icon, Checkbox, 
    Text, Table, Thead, 
    Tr, Th, Tbody, 
    Td, useBreakpointValue, Spinner,
    Link 
} from "@chakra-ui/react";
import { useState } from "react";
import { useUsers } from "../../services/hooks/useUsers";
import { RiAddLine } from "react-icons/ri";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { getUsers } from '../../services/hooks/useUsers'

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";

import Head from 'next/head'
import NextLink from 'next/link'



export default function UserList() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isFetching, error } = useUsers(page 
        // { 
        //     initialData: users
        // }
    )


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })


    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data
        }, {
            staleTime: 1000 * 60
        })
    }


    return(
        <>
            <Head>
                <title>dashgo | Users</title>
            </Head>
            <Box>

                <Header />

                <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                    <Sidebar />

                    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                        <Flex mb="8" justify="space-between" align="center">
                            <Heading size="lg" fontWeight="normal">
                                Usuários
                                { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
                            </Heading>

                            <NextLink href="/users/create" passHref>
                                <Button 
                                    as="a" 
                                    size="sm" 
                                    fontSize="small" 
                                    colorScheme="pink"
                                    color="white.300"
                                    leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                                >
                                    Criar novo
                                </Button>
                            </NextLink>
                        </Flex>

                        
                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>  
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.users.map(user => (
                                         <Tr key={user.id}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                        <Text fontWeight="bold">{user.name}</Text>
                                                    </Link>
                                                    <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                </Box>
                                            </Td>
                                            {isWideVersion && <Td>{user.createdAt}</Td> }
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            <Pagination 
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}


                    </Box>
                </Flex>

            </Box>
        </>
    )
}

//exemplo de SSR com react query

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { users, totalCount } = await getUsers(1) 

//     return {
//         props: {
//             users,
//             totalCount
//         }
//     }
// }