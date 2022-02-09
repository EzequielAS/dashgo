import { Stack } from '@chakra-ui/react'
import { RiGitMergeLine, RiInputMethodLine, RiDashboardLine, RiContactsLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return(
        <Stack spacing="12" align="flex-start">

            <NavSection title="GERAL">
                <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
            </NavSection>

            <NavSection title="AUTOMAÇÃO">
                <NavLink icon={RiGitMergeLine} href="/forms">Formulários</NavLink>
                <NavLink icon={RiInputMethodLine} href="/automation">Automação</NavLink>
            </NavSection>

        </Stack>
    )
}