import {
	Image,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} from "react-native";
import { withUniwind } from "uniwind";

withUniwind(View, { className: { fromClassName: "style" } });
withUniwind(Text, { className: { fromClassName: "style" } });
withUniwind(Pressable, { className: { fromClassName: "style" } });
withUniwind(ScrollView, {
	className: { fromClassName: "style" },
	contentContainerClassName: {
		fromClassName: "contentContainerStyle",
	},
});
withUniwind(TextInput, { className: { fromClassName: "style" } });
withUniwind(Image, { className: { fromClassName: "style" } });
withUniwind(TouchableHighlight, { className: { fromClassName: "style" } });
