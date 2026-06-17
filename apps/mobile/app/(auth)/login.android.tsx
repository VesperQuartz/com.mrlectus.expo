import { BottomSheet,  Column, Host, Text } from "@expo/ui";
import { AlertDialog, Button, TextButton,  } from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import React from "react";
import { Container } from "@/components/Container";

const Login = () => {
	const [isPresented, setIsPresented] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	return (
		<Container>
			<Host matchContents ignoreSafeArea="all">
				<Column>
					<Button colors={{
						contentColor: "white",
						containerColor: "blue"
					}} onClick={() => setIsPresented(true)} modifiers={[
							fillMaxWidth()
					]}><Text >Open</Text></Button>
					<Button  onClick={() => setVisible(true)} modifiers={[
					]}><Text>Alert</Text></Button>
					<BottomSheet
						snapPoints={["half", "full"]}
						isPresented={isPresented}
						onDismiss={() => setIsPresented(false)}
					>
						<Text>Sheet content is now</Text>
					</BottomSheet>
				</Column>
				{visible && (
					<AlertDialog onDismissRequest={() => setVisible(false)}>
						<AlertDialog.Title>
							<Text>Confirm Action</Text>
						</AlertDialog.Title>
						<AlertDialog.Text>
							<Text>Are you sure you want to proceed?</Text>
						</AlertDialog.Text>
						<AlertDialog.ConfirmButton>
							<TextButton onClick={() => setVisible(false)}>
								<Text>Confirm</Text>
							</TextButton>
						</AlertDialog.ConfirmButton>
						<AlertDialog.DismissButton>
							<TextButton onClick={() => setVisible(false)}>
								<Text>Cancel</Text>
							</TextButton>
						</AlertDialog.DismissButton>
					</AlertDialog>
				)}
			</Host>
		</Container>
	);
};

export default Login;
