import { Host } from "@expo/ui";
import { Container } from "@/components/Container";

const Login = () => {
	return (
		<Container>
			<Host matchContents useViewportSizeMeasurement ignoreSafeArea="all"></Host>
		</Container>
	);
};

export default Login;
