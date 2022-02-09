import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react'
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext'
import { RiMenuLine } from 'react-icons/ri'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export function Header() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const { onOpen } = useSidebarDrawer()

    return(
        <Flex 
            as="header" 
            w="100%" 
            maxW={1480}
            h="20"
            mx="auto"
            mt="4"
            align="center"
            px={["1", "6"]}
        >
            {!isWideVersion && 
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                />
            }

            <Logo />

            {isWideVersion && <SearchBox />}

            <Flex align="center" ml="auto">
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>

        </Flex>
    )
}