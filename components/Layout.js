import Head from "next/head";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
	Box,
	Heading,
	Button,
	Container,
	useDisclosure,
	HStack,
	Stack,
	Spacer,
	VStack,
	Grid,
	ButtonGroup,
	IconButton,
	Text,
	Logo,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const MenuItem = ({ href, children, ...props }) => (
	<Link href={href} passHref legacyBehavior>
		<Button as="a" variant="link" {...props}>
			{children}
		</Button>
	</Link>
);

function Header() {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box bg="purple.500">
			<Container>
				<Stack
					as="nav"
					direction={["column", , "row"]}
					justify="space-between"
					wrap="wrap"
					py="1.5rem"
				>
					<HStack justify="space-between">
						<MenuItem href="/" mr={8}>
							<Heading size="lg">Moviebase</Heading>
						</MenuItem>

						<Box display={["block", , "none"]} onClick={onToggle}>
							<Button variant="outline">
								<HamburgerIcon />
							</Button>
						</Box>
					</HStack>

					<Stack
						direction={["column", , "row"]}
						justify="start"
						align={["start", , "center"]}
						display={[isOpen ? "flex" : "none", , "flex"]}
						spacing={4}
					>
						<MenuItem href="/search">Search</MenuItem>
						<MenuItem href="/" disabled>
							Watchlist
						</MenuItem>
						<MenuItem href="/" disabled>
							History
						</MenuItem>
					</Stack>

					<Spacer />

					<Box display={[isOpen ? "block" : "none", , "block"]}>
						<MenuItem href="/" variant="outline" disabled>
							What to watch
						</MenuItem>
					</Box>
				</Stack>
			</Container>
		</Box>
	);
}

function Footer() {
	return (
		<Box bg="#805AD5">
			<Container as="footer" role="contentinfo">
				<Stack
					direction={["column", , "row"]}
					justify="space-between"
					align="center"
					wrap="wrap"
					py="1.2rem"
				>
					<Text fontSize="sm" color="subtle">
						&copy; {new Date().getFullYear()} All rights reserved.
					</Text>
					<Stack justify="space-between" direction="row" align="center">
						<ButtonGroup variant="ghost">
							<IconButton
								as="a"
								href="https://www.linkedin.com/in/eduard-lucaci/"
								aria-label="LinkedIn"
								icon={<FaLinkedin fontSize="1.25rem" />}
							/>
							<IconButton
								as="a"
								href="https://github.com/lucacieduard"
								aria-label="GitHub"
								icon={<FaGithub fontSize="1.25rem" />}
							/>
						</ButtonGroup>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}

export default function Layout({ title, children }) {
	return (
		<>
			<Head>
				{title && <title>{title}</title>}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Grid minH="100vh">
				<VStack w="full" align="stretch" spacing={7}>
					<Header />
					<Box as="main" h="full">
						{children}
					</Box>
					<Footer />
				</VStack>
			</Grid>
		</>
	);
}
