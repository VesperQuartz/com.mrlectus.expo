import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
	children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff",
			}}
		>
			{children}
		</SafeAreaView>
	);
};
