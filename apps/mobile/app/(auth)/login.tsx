import { Text, View } from "react-native";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";

const Login = () => {
	return (
		<Container>
			<View className="m-10 flex flex-col gap-3 rounded-xl border border-red-400 p-4">
				<Text className="bg-muted-foreground p-2 text-3xl text-red-700">
					Login
				</Text>
				<Button className="">
					<Text className="text-white">Click me</Text>
				</Button>
			</View>
		</Container>
	);
};

export default Login;
