import {Button, Center, Container, Stack, Text} from "@mantine/core";
import Link from "next/link";

interface Props {
    url: string
}

const NoDataAvailable = ({url}: Props) => {
    return (
        <Center style={{ width: '100%', height: 150 }}>
            <Stack align='center' spacing='xs'>
                <Text size='lg'>No Data Available</Text>
                <Link href={url} passHref>
                    <Button component='a' >Create a new expense</Button>
                </Link>
            </Stack>
        </Center>
    );
}

export default NoDataAvailable