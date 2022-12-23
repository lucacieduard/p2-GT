import {
	Box,
	Center,
	Flex,
	Heading,
	Image,
	Spacer,
	Stack,
} from "@chakra-ui/react";
import Layout from "components/Layout";

export default function Home() {
	return (
		<Layout title="Moviebase">
			<Flex
				alignItems="center"
				justifyContent="space-around"
				m="20px"
				p="0 5rem"
			>
				<Image
					src="./landing-img.png"
					alt="landing-img"
					boxSize="450px"
					objectFit="cover"
					borderRadius="100px"
				></Image>

				<Box maxWidth="500">
					<Heading as="h1">What is Lorem Ipsum?</Heading>
					<p style={{ marginTop: "50px" }}>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industrys standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.
					</p>
				</Box>
			</Flex>
		</Layout>
	);
}
