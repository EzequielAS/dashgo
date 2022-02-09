import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return(
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Ezequiel Alves</Text>
                    <Text color="gray.300" fontSize="small">
                        junior_ljjg@hotmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name="Ezequiel Alves" src="https://github.com/EzequielAS.png"/>
        </Flex>
    )
}