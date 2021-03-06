import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SubmitHandler, useForm } from 'react-hook-form'
import { queryClient } from "../../services/queryClient";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

import Head from 'next/head'
import Link from 'next/link'

type CreateUserFormData = {
    name: string;
    email: string,
    password: string
    password_confirmation: string;
  }
  
const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas não coincidem')
})

export default function CreateUser() {
    const router = useRouter()

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date()
            }
        })

        return response.data.user
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    })

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })
    
    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
       await createUser.mutateAsync(values)

       router.push('/users')
    }

    return(
        <>
            <Head>
                <title>dashgo | Create-User</title>
            </Head>
            
            <Box>

                <Header />

                <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                    <Sidebar />

                    <Box 
                        as="form" 
                        flex="1" 
                        borderRadius={8} 
                        bg="gray.800" 
                        p={["6", "8"]}
                        onSubmit={handleSubmit(handleCreateUser)}
                    >
                        <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                        <Divider my="6" borderColor="gray.700" />

                        <VStack spacing="8">
                            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                                <Input 
                                    name="name" 
                                    type="name"
                                    label="Nome completo" 
                                    {...register('name')}
                                    error={formState.errors.name}
                                />
                                <Input 
                                    name="email" 
                                    type="email" 
                                    label="E-mail" 
                                    {...register('email')}
                                    error={formState.errors.email}
                                />
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                                <Input 
                                    name="password" 
                                    type="password" 
                                    label="Senha" 
                                    {...register('password')}
                                    error={formState.errors.password}
                                />
                                <Input 
                                    name="password_confirmation" 
                                    type="password" 
                                    label="Confirmação da senha" 
                                    {...register('password_confirmation')}
                                    error={formState.errors.password_confirmation}
                                />
                            </SimpleGrid>
                        </VStack>

                        <Flex mt="8" justify="flex-end">
                            <HStack spacing="4">
                                <Link href="/users" passHref>
                                    <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    colorScheme="pink"
                                    isLoading={formState.isSubmitting}
                                >
                                    Salvar
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>

                </Flex>

            </Box>
        </>
    )
}