import {ActionIcon, Button, Divider, Group, Navbar, Stack, Title} from "@mantine/core";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faGauge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

interface Props {
    navbarWidth: number
}

const AppNavbar = ({navbarWidth}: Props) => {
    const navigationLinks = (
        <Stack spacing="xs">
            <Title order={6}>Navigation</Title>
            <Link href="/" passHref>
                <Button component='a' variant='subtle' color='dark' fullWidth
                        leftIcon={<FontAwesomeIcon icon={faGauge}/>}>
                    Dashboard
                </Button>
            </Link>
            <Link href="/expenses" passHref>
                <Button component='a' variant='subtle' color='dark' fullWidth
                        leftIcon={<FontAwesomeIcon icon={faRightFromBracket}/>}>
                    Expenses
                </Button>
            </Link>
        </Stack>
    );
    const createLinks = (
        <Stack spacing="xs">
            <Title order={6}>Create new stuff</Title>
            <Link href="/expenses/create" passHref>
                <Button component="a" variant="outline" fullWidth
                        leftIcon={<FontAwesomeIcon icon={faPlus}/>}>
                    New expense
                </Button>
            </Link>
        </Stack>
    );
    return (
        <Navbar p="xs" width={{ base: navbarWidth }} fixed position={{ top: 0, left: 0 }}>
            <Navbar.Section>
                <Stack spacing="xs">
                    <Group position="apart">
                        <Title order={2}>
                            <Link href="/">ExTrack</Link>
                        </Title>
                    </Group>
                    <Divider />
                    {navigationLinks}
                    <Divider />
                    {createLinks}
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
};

export default AppNavbar;