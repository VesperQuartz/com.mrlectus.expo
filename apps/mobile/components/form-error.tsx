import type { AnyFieldApi } from "@tanstack/react-form";
import { Text, View } from "react-native";

export const FieldError = ({ field }: { field: AnyFieldApi }) => {
	return (
		<View className="flex flex-col gap-1">
			{field.state.meta?.errors?.map((e, i) => {
				return (
					<View key={i.toString()} className="flex flex-row items-center">
						<Text className="text-start text-xs text-destructive">
							{e?.message}
						</Text>
					</View>
				);
			})}
		</View>
	);
};
