import { useEffect, useState } from "react";
import {} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import {
	Input,
	IconButton,
	Container,
	UnorderedList,
	ListItem,
	Progress,
	Text,
	InputGroup,
	InputRightElement,
	VStack,
	Button,
	Badge,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	Stack,
	Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Layout from "components/Layout";
import { buildImageUrl } from "utils/api";

function SearchBar() {
	const router = useRouter();
	const { terms } = router.query;
	const [text, setText] = useState("");

	// Update text input when route changes (ex when user goes back/forward)
	useEffect(() => {
		setText(terms || "");
	}, [terms]);

	// Update router history if a search was performed
	const handleSearch = (event) => {
		event.preventDefault();
		if (text !== terms) {
			router.push(`/search/?terms=${text}`, undefined, { shallow: true });
		}
	};

	return (
		<InputGroup as="form" onSubmit={handleSearch}>
			<Input
				placeholder="Search for a movie..."
				value={text}
				onChange={(event) => setText(event.target.value)}
			/>
			<InputRightElement>
				<IconButton
					aria-label="Search for a movie"
					icon={<SearchIcon />}
					type="submit"
				/>
			</InputRightElement>
		</InputGroup>
	);
}
function SearchResults() {
	const { terms } = useRouter().query;
	const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

	if (!terms) {
		return <Text>Type some terms and submit for a quick search</Text>;
	}
	if (error) {
		return (
			<Text color="red">
				Error fetching movies for {terms}: {JSON.stringify(error)}
			</Text>
		);
	}
	if (!data) {
		return <Progress size="xs" isIndeterminate />;
	}
	if (!data.results.length) {
		return <Text>No results</Text>;
	}
	return (
		<UnorderedList stylePosition="inside">
			{data.results.map((movie) => {
				if (movie.overview.length > 1) {
					return (
						<Card
							key={movie.id}
							direction={{ base: "column", sm: "row" }}
							overflow="hidden"
							variant="outline"
							m={"20px"}
						>
							<Image
								objectFit="cover"
								maxW={{ base: "100%", sm: "200px" }}
								src={
									movie.poster_path
										? buildImageUrl(movie.poster_path, "w200")
										: "fallback-img.png"
								}
								alt="Caffe Latte"
							/>

							<Stack>
								<CardBody>
									<Heading size="md">{movie.title}</Heading>

									<Text py="5">{movie.overview}</Text>
								</CardBody>

								<CardFooter>
									<Link
										href={`/movies/${movie.id}`}
										passHref
										legacyBehavior
										key={movie.id}
									>
										<Button variant="solid" colorScheme="blue">
											More info
										</Button>
									</Link>
								</CardFooter>
							</Stack>
						</Card>
					);
				}
			})}
		</UnorderedList>
	);
}

export default function Search() {
	return (
		<Layout title="Search">
			<Container>
				<VStack spacing={4} align="stretch">
					<SearchBar />
					<SearchResults />
				</VStack>
			</Container>
		</Layout>
	);
}
