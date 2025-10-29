import { Text, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

const Home = () => {
	return (
		<Container>
			<View>
				<Button>
					<Text>Hello World</Text>
				</Button>
			</View>
		</Container>
	);
};

export default Home;
